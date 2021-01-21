import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import copy from 'copy-to-clipboard'
import styled, { css } from 'styled-components'
import { useSubscription, useMutation } from '@apollo/client'

import { Wrapper } from '../styled'
import { useTabs } from '../../../store/tabs'
import { CreateDomainModal } from './CreateDomainModal'
import { EMAILS, CREATE_AWS_SES } from '../../../graphql'
import { CaretDown, CaretUp } from '../../../assets/icons'
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   Layout,
} from '../../../components'
import { useAuth } from '../../../store/auth'

export const EmailIntegrations = () => {
   const { tab, addTab } = useTabs()
   const { user, authenicated } = useAuth()
   const [domain, setDomain] = React.useState('')
   const [panel, togglePanel] = React.useState(null)
   const [modal, toggleModal] = React.useState(false)
   const [verifyStatus, setVerifyStatus] = React.useState(null)
   const [createAWSSes] = useMutation(CREATE_AWS_SES, {
      onCompleted: () => {
         toggleModal(false)
         setDomain('')
      },
   })
   const { loading, data: { aws_ses = [] } = {} } = useSubscription(EMAILS, {
      skip: !authenicated,
      variables: {
         organizationId: {
            _eq: state.organization.id,
         },
      },
   })

   React.useEffect(() => {
      if (!tab) {
         addTab('Email Integrations', '/email-integrations')
      }
   }, [tab, addTab])

   const handleSubmit = () => {
      createAWSSes({
         variables: {
            object: { domain, organizationId: user.organization.id },
         },
      })
   }

   const verifyDomain = async () => {
      const non_verified = aws_ses.filter(node => !node.isVerified)
      setVerifyStatus('VERIFYING')
      await Promise.all(
         non_verified.map(async node => {
            const URL = `${process.env.REACT_APP_PLATFORM_URL}/webhooks/instance/checksesdomainstatus`
            await axios.post(URL, {
               id: node.id,
               domain: node.domain,
               keySelector: node.keySelector,
            })
         })
      )
      setVerifyStatus(null)
   }

   const copyText = text => copy(text)

   if (loading)
      return (
         <Layout>
            <Wrapper>
               <header className="flex justify-between  border-b pb-3 mb-4">
                  <h1 className="text-xl text-teal-700">Email Integrations</h1>
                  <StyledButton onClick={() => toggleModal(true)}>
                     Add Email Domain
                  </StyledButton>
               </header>
               <ul className="space-y-2">
                  <li className="h-16 border rounded px-3 flex items-center">
                     <section>
                        <span className="block h-6 w-48 bg-gray-300" />
                     </section>
                  </li>
                  <li className="h-16 border rounded px-3 flex items-center">
                     <section>
                        <span className="block h-6 w-40 bg-gray-200" />
                     </section>
                  </li>
                  <li className="h-16 border rounded px-3 flex items-center">
                     <section>
                        <span className="block h-6 w-56 bg-gray-300" />
                     </section>
                  </li>
               </ul>
            </Wrapper>
         </Layout>
      )
   if (aws_ses.length === 0)
      return (
         <Layout>
            <Wrapper>
               <header className="flex justify-between border-b pb-3 mb-4">
                  <h1 className="text-xl text-green-700">Email Integrations</h1>
                  <StyledButton onClick={() => toggleModal(true)}>
                     Add Email Domain
                  </StyledButton>
               </header>
               <span>No email integrations setup yet!</span>
               {modal && (
                  <CreateDomainModal
                     domain={domain}
                     setDomain={setDomain}
                     toggleModal={toggleModal}
                     handleSubmit={handleSubmit}
                  />
               )}
            </Wrapper>
         </Layout>
      )
   return (
      <Layout>
         <Wrapper>
            <header className="flex justify-between  border-b pb-3 mb-4">
               <h1 className="text-xl text-teal-700">Email Integrations</h1>
               <StyledButton onClick={() => toggleModal(true)}>
                  Add Email Domain
               </StyledButton>
            </header>
            {aws_ses.some(node => !node.isVerified) && (
               <section className="flex justify-end mb-4 w-full">
                  <button
                     type="button"
                     onClick={() => verifyDomain()}
                     className="rounded bg-yellow-500 shadow-lg text-white px-3 py-1 hover:shadow-md"
                  >
                     {verifyStatus === 'VERIFYING' ? 'Verifying...' : 'Verify'}
                  </button>
               </section>
            )}
            <ul className="space-y-2">
               {aws_ses.map(node => (
                  <li
                     key={node.id}
                     className="h-auto border rounded px-3 flex flex-col cursor-pointer"
                  >
                     <section
                        onClick={() =>
                           togglePanel(panel =>
                              panel !== node.id ? node.id : null
                           )
                        }
                        className={`h-16 flex items-center justify-between ${
                           panel === node.id
                              ? 'border-b'
                              : 'border-b border-transparent'
                        }`}
                     >
                        <h2 className="flex items-center">
                           {node.domain}
                           {node.isVerified ? (
                              <Badge type="success">Verified</Badge>
                           ) : (
                              <Badge type="danger">Not Verified</Badge>
                           )}
                        </h2>
                        <TogglePanel>
                           View DNS Records
                           {panel === node.id ? (
                              <CaretUp
                                 size={20}
                                 className="ml-2 stroke-current text-gray-600"
                              />
                           ) : (
                              <CaretDown
                                 size={20}
                                 className="ml-2 stroke-current text-gray-600"
                              />
                           )}
                        </TogglePanel>
                     </section>
                     {panel === node.id && (
                        <Content className="py-3">
                           <span className="text-gray-600 text-sm">
                              *Please log in to your DNS provider and enter the
                              below values in DNS zone.
                           </span>
                           <Table className="table-fixed">
                              <TableHead>
                                 <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell style={{ width: 100 }}>
                                       Type
                                    </TableCell>
                                    <TableCell>Value</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {node.dkimRecord && (
                                    <TableRow>
                                       <TableCell
                                          title="Click to copy"
                                          onClick={() =>
                                             copyText(node?.dkimRecord?.name)
                                          }
                                       >
                                          <span>{node?.dkimRecord?.name}</span>
                                       </TableCell>
                                       <TableCell
                                          title="Click to copy"
                                          onClick={() =>
                                             copyText(node?.dkimRecord?.type)
                                          }
                                       >
                                          <span>{node?.dkimRecord?.type}</span>
                                       </TableCell>
                                       <TableCell
                                          title="Click to copy"
                                          onClick={() =>
                                             copyText(node?.dkimRecord?.name)
                                          }
                                       >
                                          <span>{node?.dkimRecord?.value}</span>
                                       </TableCell>
                                    </TableRow>
                                 )}
                                 {node.txtRecord && (
                                    <TableRow>
                                       <TableCell
                                          title="Click to copy"
                                          onClick={() =>
                                             copyText(node?.txtRecord?.name)
                                          }
                                       >
                                          <span>{node?.txtRecord?.name}</span>
                                       </TableCell>
                                       <TableCell
                                          title="Click to copy"
                                          onClick={() =>
                                             copyText(node?.txtRecord?.type)
                                          }
                                       >
                                          <span>{node?.txtRecord?.type}</span>
                                       </TableCell>
                                       <TableCell
                                          title="Click to copy"
                                          onClick={() =>
                                             copyText(node?.txtRecord?.name)
                                          }
                                       >
                                          <span>{node?.txtRecord?.value}</span>
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                           </Table>
                        </Content>
                     )}
                  </li>
               ))}
            </ul>
            {modal && (
               <CreateDomainModal
                  domain={domain}
                  setDomain={setDomain}
                  toggleModal={toggleModal}
                  handleSubmit={handleSubmit}
               />
            )}
         </Wrapper>
      </Layout>
   )
}

const StyledButton = styled.button(
   () => css`
      ${tw`
         rounded 
         px-3 h-10
         flex items-center 
         border border-green-300 
         hover:border-green-500 hover:bg-green-500 hover:text-white 
      `}
   `
)

const Content = styled.section`
   tr {
      cursor: default;
   }
   tr:hover {
      background: transparent;
   }
   td {
      span {
         cursor: copy;
         word-break: break-all;
         ${tw`block rounded px-1 my-1 hover:bg-gray-200`}
      }
   }
`

const Badge = styled.span(
   ({ type }) => css`
      ${tw`
      ml-2 
      rounded 
      px-2 h-6 
      inline-flex items-center 
      uppercase text-xs tracking-wider
   `}
      ${type === 'success' &&
      tw`
      bg-green-300 text-green-800 `}
   ${type === 'danger' &&
      tw`
      bg-red-300 text-red-800 `}
   `
)

const TogglePanel = styled.button`
   ${tw`
      px-2 
      rounded 
      h-8 w-auto 
      hover:bg-gray-200 
      text-gray-600 text-sm 
      flex items-center justify-center`}
`
