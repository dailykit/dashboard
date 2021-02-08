import { gql } from '@apollo/client'

export const UPDATE_DELIVERY_PARTNERSHIPS = gql`
   mutation update_partnerships_deliveryPartnership_by_pk(
      $id: Int!
      $_set: partnerships_deliveryPartnership_set_input!
   ) {
      update_partnerships_deliveryPartnership_by_pk(
         _set: $_set
         pk_columns: { id: $id }
      ) {
         id
      }
   }
`
