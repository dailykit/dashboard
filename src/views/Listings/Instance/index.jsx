import React from 'react'
import { useSubscription } from '@apollo/client'

import { useTabs } from '../../../store/tabs'

import { FETCH_INSTANCE } from '../../../graphql'

import { StyledSection } from './styled'
import { Wrapper } from '../styled'

import { Loader, Layout } from '../../../components'
import { useAuth } from '../../../store/auth'

export const Instance = () => {
   const { tab, addTab } = useTabs()
   const [status, setStatus] = React.useState('LOADING')
   const [instance, setInstance] = React.useState({})
   const { user, authenticated } = useAuth()
   const { data: { instances = [] } = {}, loading } = useSubscription(
      FETCH_INSTANCE,
      {
         skip: !authenticated,
         variables: {
            where: {
               organizationId: { _eq: user.organization.id },
            },
         },
      }
   )

   React.useEffect(() => {
      if (!tab) {
         addTab('Instance', '/dailyos')
      }
   }, [tab, addTab])

   React.useEffect(() => {
      if ((!loading, Array.isArray(instances) && instances.length === 1)) {
         setStatus('SUCCESS')
         setInstance(instances[0])
      }
   }, [loading, instances])

   if (status === 'LOADING')
      return (
         <Layout>
            <Wrapper>
               <Loader />
            </Wrapper>
         </Layout>
      )
   if (status === 'SUCCESS')
      return (
         <Layout>
            <Wrapper>
               <h1 className="text-xl text-teal-700 border-b pb-3 mb-4">
                  DailyOS Details
               </h1>
               <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                  Instance Details
               </h2>
               {Object.keys(instance).length > 0 ? (
                  <div className="border border-l-4 rounded p-3">
                     {instance.active && (
                        <span className="uppercase text-xs font-medium text-green-800 rounded bg-green-200 border border-green-300 px-1">
                           Running
                        </span>
                     )}
                     <StyledSection>
                        <h3>Type:</h3>
                        <span>&nbsp;{instance.instanceType}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>IP:</h3>
                        <span>&nbsp;{instance.publicIp}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>URL:</h3>
                        <span>&nbsp;{instance.instanceUrl}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>RAM:</h3>
                        <span>&nbsp;{instance.instanceSize.ram}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>Processor:</h3>
                        <span>&nbsp;{instance.instanceSize.processor}</span>
                     </StyledSection>
                  </div>
               ) : (
                  <div className="border border-l-4 rounded p-3">
                     Instance not setup yet!
                  </div>
               )}
               <h2 className="mt-4 text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                  Database Details
               </h2>
               {instance.pgdatabases.length > 0 ? (
                  <div className="border border-l-4 rounded p-3">
                     <StyledSection>
                        <h3>URL:</h3>
                        <span>&nbsp;{instance.pgdatabases[0].dbhostname}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>Name:</h3>
                        <span>&nbsp;{instance.pgdatabases[0].dbname}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>Port:</h3>
                        <span>&nbsp;{instance.pgdatabases[0].dbport}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>Username:</h3>
                        <span>&nbsp;{instance.pgdatabases[0].username}</span>
                     </StyledSection>
                     <StyledSection>
                        <h3>Password:</h3>
                        <span>&nbsp;{instance.pgdatabases[0].password}</span>
                     </StyledSection>
                  </div>
               ) : (
                  <div className="border border-l-4 rounded p-3">
                     Database not setup yet!
                  </div>
               )}
            </Wrapper>
         </Layout>
      )
}
