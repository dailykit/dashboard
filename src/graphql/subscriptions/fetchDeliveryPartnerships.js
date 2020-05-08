import gql from 'graphql-tag'

export const FETCH_DELIVERY_PARTNERSHIPS = gql`
   subscription partnerships_deliveryPartnership(
      $where: partnerships_deliveryPartnership_bool_exp
   ) {
      partnerships_deliveryPartnership(where: $where) {
         id
         keys
         isActive
         isApproved
         webhookUrl
         deliveryCompany {
            id
            name
            assets
            website
            description
            established
         }
      }
   }
`
