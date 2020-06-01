import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'

import { UserContext } from '../../../store/user'

export const DeviceHub = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   const [status, setStatus] = React.useState('IDLE')
   const { state } = React.useContext(UserContext)

   React.useEffect(() => {
      const tab = tabs.find(item => item.path === `/device`) || {}
      if (!Object.prototype.hasOwnProperty.call(tab, 'path')) {
         history.push('/')
      }
   }, [history, tabs])

   const initiateAccountSetup = async () => {
      try {
         setStatus('LOADING')
         const url = `${process.env.REACT_APP_PLATFORM_URL}/webhooks/device`
         await axios.post(url, {
            email: state.email,
         })
         setStatus('SUCCESS')
      } catch (error) {
         setStatus('ERROR')
         console.log(error.message)
      }
   }

   return (
      <Wrapper>
         <header className="flex justify-between  border-b pb-3 mb-4">
            <h1 className="text-xl text-teal-700">Device Hub</h1>
            {!state.organization.printNodeKey && (
               <StyledButton onClick={() => initiateAccountSetup()}>
                  {status === 'LOADING' ? 'Loading...' : 'Setup Account'}
               </StyledButton>
            )}
         </header>
      </Wrapper>
   )
}

const StyledButton = styled.button(
   () => css`
      ${tw`border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10`}
   `
)
