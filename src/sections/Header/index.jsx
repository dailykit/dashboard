import React from 'react'
import { useHistory } from 'react-router-dom'

// Components
import { Tabs } from '../../components'

// Styled
import { StyledHeader, StyledMenu, StyledNav } from './styled'

// Icons
import { MenuIcon, LeftIcon, RightIcon, HomeIcon } from '../../assets/icons'

const Header = ({ toggleSidebar }) => {
   const history = useHistory()
   return (
      <StyledHeader>
         <StyledMenu
            title="Menu"
            tabIndex="0"
            role="button"
            onClick={() => toggleSidebar(visible => !visible)}
            onKeyPress={e =>
               e.charCode === 32 && toggleSidebar(visible => !visible)
            }
         >
            <MenuIcon color="#fff" size="24" />
         </StyledMenu>
         <StyledNav>
            <button
               type="button"
               title="Home"
               onClick={() => history.push('/')}
            >
               <HomeIcon size="20" className="stroke-current text-white" />
            </button>
         </StyledNav>
         <Tabs />
      </StyledHeader>
   )
}

export default Header
