import styled from 'styled-components'

export const StyledHeader = styled.header`
   background: #04a777;
   display: flex;
`

export const StyledMenu = styled.div`
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
`

export const StyledNav = styled.div`
   display: flex;
   border-left: 1px solid #048e65;
   button {
      width: 40px;
      height: 40px;
      border: none;
      cursor: pointer;
      background: transparent;
      :hover,
      :focus {
         background: #048e65;
      }
      svg {
         display: unset;
      }
   }
`
