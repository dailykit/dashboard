import gql from 'graphql-tag'

export const FETCH_USER = gql`
   query organizationAdmins($where: organization_organizationAdmin_bool_exp) {
      organizationAdmins(where: $where) {
         id
         email
         firstName
         lastName
         organization {
            id
            stripeAccountId
            organizationUrl
            organizationName
            instanceStatus
         }
      }
   }
`
