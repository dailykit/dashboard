import React from 'react'

// State
import { useTabs } from '../../store/tabs'
import { useAuth } from '../../store/auth'

// Styled
import {
   StyledSidebar,
   StyledList,
   StyledListItem,
   StyledHeading,
} from './styled'

const Sidebar = ({ visible, toggleSidebar }) => {
   const { addTab } = useTabs()
   const { logout } = useAuth()
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
            <StyledListItem onClick={() => addTab('Device Hub', '/device')}>
               Device Hub
            </StyledListItem>
         </StyledList>
         <button
            type="button"
            onClick={() => logout()}
            className="m-3 h-10 bg-red-500 text-white rounded"
         >
            Sign Out
         </button>
      </StyledSidebar>
   )
}

export default Sidebar
