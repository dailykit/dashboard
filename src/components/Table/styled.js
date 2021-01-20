import styled, { css } from 'styled-components'

const Styles = {
   Table: styled.table`
      width: 100%;
      display: table;
      border-spacing: 0;
      border-collapse: collapse;
   `,
   Head: styled.thead`
      width: 100%;
      display: table-header-group;
      td {
         height: 32px;
         color: #888d9d;
         font-size: 14px;
      }
   `,
   Body: styled.tbody`
      display: table-row-group;
      tr {
         :hover {
            background: ${props => props.noHoverEffect ? 'none' : '#f3f3f3'};
         }
      }
      td {
         height: 48px;
         color: #555b6e;
         font-size: 16px;
      }
   `,
   Row: styled.tr`
      display: table-row;
   `,
   Cell: styled.td(
      ({ align }) => css`
         padding: 0 12px;
         display: table-cell;
         border-bottom: 1px solid #d8d8d8;
         text-align: ${align === 'right' ? align : 'left'};
         > div {
            float: ${align === 'right' ? align : 'left'};
         }
      `
   )

}


export default Styles