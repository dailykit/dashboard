import { gql } from '@apollo/client'

export const INSTANCE_STATUS = gql`
   subscription organization($id: Int!) {
      organization(id: $id) {
         instanceStatus
         instanceRequested
      }
   }
`
