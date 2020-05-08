import { gql } from 'apollo-boost'

export const INITIATE_SETUP = gql`
   mutation updateOrganizations(
      $instanceRequested: Boolean
      $email: String_comparison_exp
   ) {
      updateOrganizations(
         where: { organizationAdmins: { email: $email } }
         _set: { instanceRequested: $instanceRequested }
      ) {
         returning {
            id
         }
      }
   }
`
