import styled from 'styled-components'

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

export const Label = styled.label`
   display: block;
   font-size: 14px;
   color: #969696;
   transition: 0.3s ease-in-out;
   transform: translateY(-px);
`

export const Field = styled.div`
   height: 56px;
   margin-top: 8px;
   margin-bottom: 24px;
   input {
      font-size: 16px;
      color: #686d7b;
   }
   input,
   select {
      width: 320px;
      height: 56px;
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
            transform: translateY(-64px);
         }
      }
   }
   select {
      margin-top: 16px;
   }
   select + label {
      transform: translateY(-64px) !important;
   }
`
