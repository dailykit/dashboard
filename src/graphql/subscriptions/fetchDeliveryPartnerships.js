import { gql } from '@apollo/client'

export const FETCH_DELIVERY_PARTNERSHIPS = gql`
   subscription deliveryPartnerships(
      $where: partnerships_deliveryPartnership_bool_exp
   ) {
      deliveryPartnerships: partnerships_deliveryPartnership(where: $where) {
         id
         keys
         isActive
         isApproved
         webhookUrl
         company: deliveryCompany {
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
