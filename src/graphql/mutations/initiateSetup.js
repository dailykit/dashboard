import { gql } from '@apollo/client'

export const INITIATE_SETUP = gql`
   mutation updateOrganization(
      $id: Int!
      $_set: organization_organization_set_input!
   ) {
      updateOrganization(pk_columns: { id: $id }, _set: $_set) {
         id
         instanceRequested
      }
   }
`
