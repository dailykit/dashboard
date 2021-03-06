import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import copy from 'copy-to-clipboard'
import styled, { css } from 'styled-components'

import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'

import { Layout } from '../../../components'
import { useAuth } from '../../../store/auth'

export const DeviceHub = () => {
   const { tab, addTab } = useTabs()
   const [status, setStatus] = React.useState('IDLE')
   const { user } = useAuth()

   React.useEffect(() => {
      if (!tab) {
         addTab('Device Hub', '/device')
      }
   }, [tab])

   const initiateAccountSetup = async () => {
      try {
         setStatus('LOADING')
         const url = `${process.env.REACT_APP_PLATFORM_URL}/webhooks/device`
         await axios.post(url, {
            email: user.email,
         })
         setStatus('SUCCESS')
      } catch (error) {
         setStatus('ERROR')
      }
   }

   const copyText = text => copy(text)

   return (
      <Layout>
         <Wrapper>
            <header className="flex justify-between  border-b pb-3 mb-4">
               <h1 className="text-xl text-teal-700">Device Hub</h1>
               {!user.organization.printNodeKey && (
                  <StyledButton onClick={() => initiateAccountSetup()}>
                     {status === 'LOADING' ? 'Loading...' : 'Setup Account'}
                  </StyledButton>
               )}
            </header>
            {user.organization.printNodeKey && (
               <main>
                  <Section className="flex flex-col items-start">
                     <h1 className="text-xl text-teal-800">
                        Print Node Credentials
                     </h1>
                     <button
                        type="button"
                        title="Click to copy"
                        onClick={() => copyText(user.email)}
                        className="text-gray-500 hover:bg-gray-100"
                     >
                        Email: {user.email}
                     </button>
                     <button
                        type="button"
                        title="Click to copy"
                        onClick={() =>
                           copyText(user.printNodePassword.slice(0, 8))
                        }
                        className="text-gray-500 hover:bg-gray-100"
                     >
                        Password: {user.printNodePassword.slice(0, 8)}
                     </button>
                  </Section>
                  <Section>
                     <h1 className="text-xl text-teal-800">Print Node Links</h1>
                     <LinkItem
                        target="__blank"
                        rel="noopener noreferrer"
                        href="https://www.printnode.com/en/download"
                     >
                        Download Print Node
                     </LinkItem>
                     <LinkItem
                        target="__blank"
                        rel="noopener noreferrer"
                        href="https://www.printnode.com/en/docs/installation"
                     >
                        Installing Print Node
                     </LinkItem>
                     <LinkItem
                        target="__blank"
                        rel="noopener noreferrer"
                        href="https://www.printnode.com/en/docs/supported-printers"
                     >
                        View supported printers
                     </LinkItem>
                     <LinkItem
                        target="__blank"
                        rel="noopener noreferrer"
                        href="https://www.printnode.com/en/docs/supported-scales"
                     >
                        View supported scales
                     </LinkItem>
                  </Section>
               </main>
            )}
         </Wrapper>
      </Layout>
   )
}

const StyledButton = styled.button(
   () => css`
      ${tw`border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10`}
   `
)

const Section = styled.section`
   ${tw`border border-l-4 rounded p-3`}
   + section {
      margin-top: 16px;
   }
`

const LinkItem = styled.a`
   color: #376ae5;
   text-decoration: underline;
   + a {
      margin-left: 16px;
   }
`
