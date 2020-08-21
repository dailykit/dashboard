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

export const StyledIllo = styled.div(
   () => css`
      height: 480px;
      overflow-y: auto;
      position: relative;
      ${tw`bg-gray-100 rounded`}
   `
)

export const StyledButton = styled.button(
   () => css`
      background: #04a777;
      ${tw`mt-3 px-6 h-10 rounded-full text-sm uppercase font-medium text-white`}
   `
)
