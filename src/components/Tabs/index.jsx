import React from 'react'
import { useLocation } from 'react-router-dom'

// State
import { useTabs } from '../../store/tabs'

// Styled
import { StyledTabs, StyledTab } from './styled'

// Icons
import { CloseIcon } from '../../assets/icons'

const Tabs = () => {
   const location = useLocation()
   const { tabs, switchTab, removeTab } = useTabs()
   return (
      <StyledTabs>
         {tabs.map((tab, index) => (
            <StyledTab
               key={tab.title}
               onClick={() => switchTab(tab.path)}
               active={tab.path === location.pathname}
            >
               <span title={tab.title}>{tab.title}</span>
               <button
                  type="button"
                  title="Close Tab"
                  onClick={e => removeTab(e, { tab, index })}
               >
                  <CloseIcon color="#fff" size="20" />
               </button>
            </StyledTab>
         ))}
      </StyledTabs>
   )
}

export default Tabs
