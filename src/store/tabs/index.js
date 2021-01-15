import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Context = React.createContext()

const initialState = {
   tabs: [],
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_TITLE': {
         const { tabs } = state
         const index = tabs.findIndex(tab => tab.path === payload.path)
         tabs[index] = {
            ...tabs[index],
            title: payload.title,
         }
         return {
            ...state,
            tabs,
         }
      }
      case 'ADD_TAB': {
         const tabIndex = state.tabs.findIndex(tab => tab.path === payload.path)
         if (tabIndex === -1) {
            return {
               ...state,
               tabs: [
                  { title: payload.title, path: payload.path },
                  ...state.tabs,
               ],
            }
         }
         return state
      }
      // Delete Tab
      case 'DELETE_TAB': {
         return {
            ...state,
            tabs: state.tabs.filter((_, index) => index !== payload.index),
         }
      }
      default:
         return state
   }
}

export const TabProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducers, initialState)

   return (
      <Context.Provider value={{ state, dispatch }}>
         {children}
      </Context.Provider>
   )
}

export const useTabs = () => {
   const history = useHistory()
   const location = useLocation()

   const {
      state: { tabs },
      dispatch,
   } = React.useContext(Context)

   const tab = tabs.find(node => node.path === location.pathname)

   const setTabTitle = title => {
      dispatch({
         type: 'SET_TITLE',
         payload: {
            title,
            path: tab.path,
         },
      })
   }

   const addTab = (title, path) => {
      dispatch({
         type: 'ADD_TAB',
         payload: { title, path },
      })
      history.push(path)
   }

   const switchTab = path => history.push(path)

   const removeTab = (e, { node, index }) => {
      if (e) {
         e.stopPropagation()
      }
      dispatch({ type: 'DELETE_TAB', payload: { tab: node, index } })

      const tabsCount = tabs.length
      // closing last remaining tab
      if (index === 0 && tabsCount === 1) {
         history.push('/')
      }
      // closing first tab when there's more than one tab
      else if (index === 0 && tabsCount > 1) {
         history.push(tabs[index + 1].path)
      }
      // closing any tab when there's more than one tab
      else if (index > 0 && tabsCount > 1) {
         history.push(tabs[index - 1].path)
      }
   }

   return {
      tab,
      tabs,
      addTab,
      switchTab,
      removeTab,
      setTabTitle,
   }
}
