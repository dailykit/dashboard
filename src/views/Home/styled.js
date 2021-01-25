import styled, { css } from 'styled-components'
import tw from 'tailwind.macro'

export const StyledSection = styled.section(
   () => css`
      width: 980px;
      ${tw`mx-auto mt-3`}
      h2 {
         ${tw`text-xl font-medium text-teal-800`}
      }
      span {
         ${tw`mt-2 text-gray-500`}
      }
   `
)
