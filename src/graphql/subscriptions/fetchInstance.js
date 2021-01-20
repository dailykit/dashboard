import { gql } from '@apollo/client'

export const FETCH_INSTANCE = gql`
   subscription instances($where: aws_instance_bool_exp) {
      instances(where: $where) {
         id
         active
         publicIp
         instanceUrl
         instanceType
         instanceSize {
            id
            ram
            processor
         }
         pgdatabases {
            id
            dbport
            dbname
            password
            username
            dbhostname
         }
      }
   }
`
