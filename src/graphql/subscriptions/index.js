import { gql } from '@apollo/client'

export * from './instanceStatus'
export * from './fetchInstance'
export * from './fetchDeliveryPartnerships'

export const EMAILS = gql`
   subscription aws_ses($organizationId: Int_comparison_exp!) {
      aws_ses(
         order_by: { created_at: desc }
         where: { organizationId: $organizationId }
      ) {
         id
         domain
         txtRecord
         isVerified
         dkimRecord
         keySelector
      }
   }
`

export const ADMIN_EXISTS = gql`
   query admins($where: organization_organizationAdmin_bool_exp!) {
      admins: organizationAdmins(where: $where) {
         id
      }
   }
`

export const USER = gql`
   subscription organizationAdmins(
      $where: organization_organizationAdmin_bool_exp
   ) {
      organizationAdmins(where: $where) {
         id
         email
         firstName
         lastName
         designation
         phoneNumber
         printNodePassword
         organization {
            id
            hosting
            timeZone
            currency
            datahubUrl
            adminSecret
            printNodeKey
            instanceStatus
            stripeAccountId
            organizationUrl
            organizationName
            instanceRequested
         }
      }
   }
`

export const TIMEZONES = gql`
   query timezones($title: String!) {
      timezones: master_timezone(where: { title: { _ilike: $title } }) {
         title
         value
      }
   }
`

export const MARKETPLACE_COMPANIES = gql`
   query companies {
      companies: marketPlaceHub_marketPlaceCompany {
         title
      }
   }
`
