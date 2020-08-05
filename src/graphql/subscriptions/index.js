import gql from 'graphql-tag'

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
         cnameRecords
      }
   }
`
