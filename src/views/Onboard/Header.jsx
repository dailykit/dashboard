import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { HomeIcon } from '../../assets/icons'

const Header = () => {
   const history = useHistory()
   return (
      <StyledHeader>
         <StyledNav>
            <button
               type="button"
               title="Home"
               onClick={() => history.push('/')}
            >
               <HomeIcon size="20" className="stroke-current text-white" />
            </button>
         </StyledNav>
      </StyledHeader>
   )
}

export default Header

const StyledHeader = styled.header`
   display: flex;
   grid-area: head;
   background: #04a777;
`

const StyledNav = styled.div`
   display: flex;
   border-left: 1px solid #048e65;
   button {
      width: 40px;
      height: 40px;
      border: none;
      cursor: pointer;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      :hover,
      :focus {
         background: #048e65;
      }
      svg {
         display: unset;
      }
   }
`
