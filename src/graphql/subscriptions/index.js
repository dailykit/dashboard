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
   subscription admins($where: organization_organizationAdmin_bool_exp) {
      admins: organizationAdmins(where: $where) {
         id
         email
         lastName
         firstName
         keycloakId
         designation
         phoneNumber
         printNodePassword
         keycloak: keycloakUser {
            email_verified
         }
         organization {
            id
            hosting
            timeZone
            currency
            datahubUrl
            adminSecret
            printNodeKey
            onboardStatus
            instanceStatus
            stripeAccountId
            instanceRequested
            url: organizationUrl
            name: organizationName
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
      companies: marketPlaceHub_marketPlaceCompany(
         where: { parseHubProjectId: { _is_null: false } }
      ) {
         title
      }
   }
`
