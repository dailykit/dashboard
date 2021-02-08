import React from 'react'

import currencies from '../currencies.json'
import { useDebounce } from './useDebounce'

export const useCurrencies = keyword => {
   const [list, setList] = React.useState([])
   const debouncedTerm = useDebounce(keyword, 500)

   React.useEffect(() => {
      if (debouncedTerm) {
         const matches = currencies.filter(node =>
            node.value.toLowerCase().includes(debouncedTerm.toLowerCase())
         )
         setList(matches)
      }
   }, [debouncedTerm])

   return { list }
}
