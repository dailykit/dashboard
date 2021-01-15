import styled, { css } from 'styled-components'

export const StyledTabs = styled.ul`
   display: flex;
   border-left: 1px solid #048e65;
`

export const StyledTab = styled.li(
   ({ active }) => css`
      color: #fff;
      width: 220px;
      height: 40px;
      display: grid;
      cursor: pointer;
      font-size: 14px;
      align-items: center;
      grid-template-columns: 1fr 40px;
      background: ${active ? '#048e65' : 'transparent'};
      border-right: 1px solid #048e65;
      span {
         line-height: 40px;
         padding-left: 12px;
      }
      button {
         height: 40px;
         display: flex;
         align-items: center;
         justify-content: center;
         :hover {
            background: #037b58;
         }
      }
   `
)
