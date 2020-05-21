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
            <StyledListItem
               onClick={() =>
                  addTab('Delivery Partnerships', '/partnerships/delivery')
               }
            >
               Delivery Partnerships
            </StyledListItem>
            <StyledListItem onClick={() => addTab('Payment', '/payment')}>
               Payment
            </StyledListItem>
         </StyledList>
      </StyledSidebar>
   )
}

export default Sidebar
