import React from 'react'

// State
import { useTabs } from '../../store/tabs'

// Styled
import {
   StyledSidebar,
   StyledList,
   StyledListItem,
   StyledHeading,
} from './styled'

const Sidebar = ({ visible, toggleSidebar }) => {
   const { addTab } = useTabs()
   return (
      <StyledSidebar visible={visible} onClick={() => toggleSidebar(false)}>
         <StyledHeading>Listings</StyledHeading>
         <StyledList>
            <StyledListItem onClick={() => addTab('Account', '/account')}>
               Account
            </StyledListItem>
            <StyledListItem onClick={() => addTab('Instance', '/dailyos')}>
               DailyOS
            </StyledListItem>
         </StyledList>
      </StyledSidebar>
   )
}

export default Sidebar
