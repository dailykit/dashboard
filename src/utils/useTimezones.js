import React from 'react'
import { useLazyQuery } from '@apollo/client'

import { TIMEZONES } from '../graphql'

import { useDebounce } from './useDebounce'

export const useTimezones = keyword => {
   const [timezones, setTimezones] = React.useState([])
   const debouncedTerm = useDebounce(keyword, 500)

   const [request, { loading }] = useLazyQuery(TIMEZONES, {
      onCompleted: ({ timezones: list }) => {
         setTimezones(list)
      },
   })

   React.useEffect(() => {
      if (debouncedTerm) {
         request({
            variables: {
               title: `%${debouncedTerm}%`,
            },
         })
      }
   }, [debouncedTerm, request])

   return { loading, timezones }
}
