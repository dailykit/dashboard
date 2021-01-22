import { gql } from '@apollo/client'

export * from './initiateSetup'
export * from './updateDeliveryPartnership'

export const CREATE_AWS_SES = gql`
   mutation insert_aws_ses_one($object: aws_ses_insert_input!) {
      insert_aws_ses_one(object: $object) {
         id
      }
   }
`

export const UPDATE_ORGANIZATION = gql`
   mutation updateOrganization(
      $id: Int!
      $_set: organization_organization_set_input!
   ) {
      updateOrganization(pk_columns: { id: $id }, _set: $_set) {
         id
      }
   }
`

export const UPDATE_USER = gql`
   mutation updateUser(
      $id: Int!
      $_set: organization_organizationAdmin_set_input!
   ) {
      updateUser: update_organization_organizationAdmin_by_pk(
         pk_columns: { id: $id }
         _set: $_set
      ) {
         id
      }
   }
`
