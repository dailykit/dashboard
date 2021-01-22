import styled, { css } from 'styled-components'

export const Footer = styled.footer`
   display: flex;
   height: 103px;
   justify-content: space-between;
   align-items: center;
   button {
      height: 40px;
      line-height: 42px;
      text-transform: uppercase;
      background: #04a777;
      border-radius: 48px;
      padding: 0 16px;
      border: none;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      font-weight: 500;
   }
`

export const Main = styled.main`
   background: #fff;
   height: calc(100% - 103px);
   border: 1px solid #ececec;
   padding-top: 80px;
   > div {
      margin: 0 auto;
      width: 320px;
   }
`

export const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   h2 {
      font-size: 20px;
      font-weight: 400;
      color: #555b6e;
      margin-bottom: 24px;
   }
   h4 {
      font-size: 16px;
      font-weight: 400;
      color: #555b6e;
      margin-bottom: 24px;
   }
`

export const Form = styled.form`
   width: 320px;
   #terms__label {
      font-size: 14px;
      color: #555b6e;
      margin-left: 8px;
      a {
         text-decoration: none;
         color: #555b6e;
         font-weight: 500;
         &:hover {
            color: #6e7382;
         }
      }
   }
`

export const Field = styled.div`
   margin-top: 8px;
   margin-bottom: 24px;
   input {
      font-size: 16px;
      color: #686d7b;
   }
   label {
      margin-bottom: 4px;
   }
   input,
   select {
      width: 320px;
      height: 40px;
      border: none;
      border-bottom: 2px solid #e1e1e1;
      &:focus {
         outline: transparent;
         border-bottom: 2px solid #04a777;
      }
      &:focus,
      &:valid {
         border-bottom: 2px solid #04a777;
         & + label {
            color: #04a777;
            font-size: 12px;
         }
      }
   }
`

export const RadioWrapper = styled.div(
   ({ variant }) => css`
      display: flex;
      padding-left: 4px;
      margin-bottom: 48px;
      background: #fafafa;
      align-items: center;
      border: 1px solid #ececec;
      height: ${variant === 'rectangle' ? `64px` : `48px`};
      width: ${variant === 'rectangle' ? `150px` : `294px`};
      border-radius: ${variant === 'rectangle' ? `8px` : `48px`};
   `
)

export const Label = styled.label(
   ({ variant }) => css`
      &:first-child {
         margin-right: 4px;
      }
      span {
         width: 140px;
         display: block;
         color: #888d9d;
         cursor: pointer;
         text-align: center;
         transition: 0.3s ease-in-out;
         height: ${variant === 'rectangle' ? '56px' : '40px'};
         line-height: ${variant === 'rectangle' ? '56px' : '40px'};
         border-radius: ${variant === 'rectangle' ? '8px' : '40px'};
      }
      input {
         position: absolute;
         visibility: hidden;
      }
      input:checked ~ span {
         background: #00a7e1;
         color: #fff;
      }
   `
)
