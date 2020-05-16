import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { UserContext } from '../../../store/user'
import { useTabs } from '../../../store/tabs'

import { FETCH_INSTANCE } from '../../../graphql'

import { StyledSection } from './styled'
import { Wrapper } from '../styled'

import { Loader } from '../../../components'

export const Instance = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   const [status, setStatus] = React.useState('LOADING')
   const [instance, setInstance] = React.useState({})
   const { state: user } = React.useContext(UserContext)
   const { data: { instances = [] } = {}, loading } = useSubscription(
      FETCH_INSTANCE,
      {
         variables: {
            where: {
               organizationId: { _eq: user.organization.id },
            },
         },
      }
   )

   React.useEffect(() => {
      if ((!loading, Array.isArray(instances) && instances.length === 1)) {
         setStatus('SUCCESS')
         setInstance(instances[0])
      }
   }, [loading, instances])

   React.useEffect(() => {
      const tab = tabs.find(item => item.path === `/dailyos`) || {}
      if (!Object.prototype.hasOwnProperty.call(tab, 'path')) {
         history.push('/')
      }
   }, [history, tabs])

   if (status === 'LOADING')
      return (
         <Wrapper>
            <Loader />
         </Wrapper>
      )
   if (status === 'SUCCESS')
      return (
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
                     <span className="uppercase text-xs font-medium text-teal-800 rounded bg-teal-200 border border-teal-300 px-1">
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
      )
}
