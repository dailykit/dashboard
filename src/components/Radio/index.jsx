import React from 'react'
import styled from 'styled-components'

export const Radio = ({ children }) => {
   return <Styles.Radio>{children}</Styles.Radio>
}

Radio.Option = ({ id, name, value, onClick, children, ...props }) => {
   return (
      <Styles.Option {...props}>
         <input
            name={name}
            type="radio"
            onChange={onClick}
            checked={id === value}
         />
         <span>{children}</span>
      </Styles.Option>
   )
}

const Styles = {
   Radio: styled.section`
      padding: 4px;
      border-radius: 40px;
      background: #fafafa;
      display: inline-flex;
      border: 1px solid #ececec;
   `,
   Option: styled.label`
      input {
         position: absolute;
         visibility: hidden;
      }
      span {
         color: #888d9d;
         height: 40px;
         border-radius: 40px;
         display: flex;
         align-items: center;
         padding: 0 12px;
         user-select: none;
         cursor: ${({ isDisabled }) =>
            isDisabled ? 'not-allowed' : 'pointer'};
      }
      input:checked ~ span {
         background: #00a7e1;
         color: #fff;
      }
   `,
}
