import gql from 'graphql-tag'

export * from './initiateSetup'
export * from './updateDeliveryPartnership'

export const CREATE_AWS_SES = gql`
   mutation insert_aws_ses_one($object: aws_ses_insert_input!) {
      insert_aws_ses_one(object: $object) {
         id
      }
   }
`
