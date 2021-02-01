import tw from 'tailwind.macro'
import styled from 'styled-components'

export const Styles = {
   Header: styled.header`
      background: #04a777;
      ${tw`flex items-center`}
   `,
   Auth: styled.button`
      ${tw`h-8 px-3 rounded`}
      &.ghost {
         ${tw`text-white hover:bg-green-700`}
      }
      &.solid {
         ${tw`bg-green-700 text-white hover:bg-green-800`}
      }
   `,
   Menu: styled.button`
      width: 40px;
      height: 40px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      :hover,
      :focus {
         background: #048e65;
      }
   `,
   Nav: styled.div`
      display: flex;
      border-left: 1px solid #048e65;
   `,
   Button: styled.button`
      background: transparent;
      ${tw`h-10 w-10 cursor-pointer flex items-center justify-center`};
      :hover,
      :focus {
         background: #048e65;
      }
      svg {
         display: unset;
      }
   `,
}
