import { gql } from 'apollo-boost'

export const FETCH_USER = gql`
   query MyQuery($where: organization_organizationAdmin_bool_exp) {
      organizationAdmins(where: $where) {
         id
         email
         firstName
         lastName
         organization {
            organizationName
            instanceStatus
         }
      }
   }
`
