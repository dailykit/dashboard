import styled, { css } from 'styled-components'
import tw from 'tailwind.macro'

export const StyledBadge = styled.span(
   ({ isActive }) => css`
      ${tw`uppercase text-xs font-medium rounded border px-1`}
      ${isActive
         ? tw`text-green-800 bg-green-200 border-green-300`
         : tw`text-teal-800 bg-teal-200 border-teal-300`}
   `
)
