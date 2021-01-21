import { gql } from '@apollo/client'

export const USER = gql`
   subscription organizationAdmins(
      $where: organization_organizationAdmin_bool_exp
   ) {
      organizationAdmins(where: $where) {
         id
         email
         firstName
         lastName
         printNodePassword
         organization {
            id
            datahubUrl
            stripeAccountId
            organizationUrl
            organizationName
            instanceStatus
            printNodeKey
            adminSecret
         }
      }
   }
`
