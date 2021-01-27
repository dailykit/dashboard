import tw from 'tailwind.macro'
import styled, { css } from 'styled-components'

export const Button = styled.button`
   ${tw`bg-green-600 uppercase font-medium text-sm text-white border-none px-4 h-10 rounded-full`}
   &:disabled {
      ${tw`cursor-not-allowed bg-gray-300 text-gray-500`}
   }
`

export const Footer = styled.footer`
   height: 103px;
   grid-area: footer;
   ${tw`flex items-center justify-between`}
`

export const Main = styled.main`
   height: calc(100% - 103px);
   border: 1px solid #ececec;
   ${tw`pt-20 bg-white`};
   > div {
      width: 320px;
      ${tw`mx-auto`}
   }
`

export const Wrapper = styled.div`
   ${tw`flex flex-col h-full w-full`}
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
      color: #555b6e;
      ${tw`ml-2 text-sm`}
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
   ${tw`mb-6 mt-2`}
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

export const ExtMain = styled(Main)`
   > div {
      width: 640px;
   }
`

export const CheckBoxWrapper = styled.div`
   margin-top: 32px;
   label {
      font-size: 16px;
      color: #888d9d;
      margin-left: 8px;
   }
`

export const Info = styled.div`
   display: flex;
   border-top: 1px solid rgba(0, 0, 0, 0.1);
   margin-top: 32px;
   padding-top: 32px;
   ul {
      padding-left: 32px;
      margin-top: 24px;
      li {
         font-size: 14px;
         color: #555b6e;
         line-height: 24px;
      }
   }
`

export const Tip = styled.div`
   display: flex;
   span {
      margin-right: 16px;
   }
   p {
      font-size: 14px;
      color: #555b6e;
      opacity: 0.7;
      font-style: italic;
   }
`

export const Card = styled.div`
   width: 260px;
   height: 180px;
   display: flex;
   padding: 16px;
   border-radius: 4px;
   text-align: center;
   flex-direction: column;
   border: 1px solid rgba(0, 0, 0, 0.1);
   h4 {
      font-size: 14px;
      margin: 0;
      font-weight: 400;
      color: #888d9d;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
   }
   #strike {
      font-size: 12px;
      text-decoration-line: line-through;
      color: #888d9d;
      margin-top: 16px;
   }
   #discount {
      font-size: 12px;
      font-feature-settings: 'cpsp' on;
      color: #ff8484;
      margin: 8px 0 24px 0;
   }
   #price {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #555b6e;
   }
`
