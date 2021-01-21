import { gql } from '@apollo/client'

export * from './fetchUser'

export const ADMIN_EXISTS = gql`
   query admins($where: organization_organizationAdmin_bool_exp!) {
      admins: organizationAdmins(where: $where) {
         id
      }
   }
`
