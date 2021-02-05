import React from 'react'
import styled, { css } from 'styled-components'

import Header from './Header'
import { useAuth } from '../../store/auth'

const Layout = ({ children }) => {
   const { user, onboard } = useAuth()
   const evalHeightFirst = step => {
      if (step === 1) {
         return 28
      } else if (step === 2) {
         return 55
      } else if (step >= 3) {
         return 78
      }
   }
   const evalHeightSecond = step => {
      if (step === 4) {
         return 21
      } else if (step === 5) {
         return 42
      } else if (step === 6) {
         return 63
      } else if (step === 7) {
         return 83
      }
   }

   const isStepActive = start => {
      const steps = Array.from(new Array(8 - start).keys(), i => i + start)
      return steps.includes(onboard.step) ? 'active' : ''
   }

   return (
      <Styles.Wrapper>
         <Header />
         <Styles.Main>{children}</Styles.Main>
         <Styles.Aside>
            <Styles.Stage height1={evalHeightFirst(onboard.step)}>
               Basic Information
               <>
                  <Styles.Step className={isStepActive(1)}>
                     Register
                  </Styles.Step>
                  <Styles.Step className={isStepActive(2)}>
                     Tell us about your company
                  </Styles.Step>
                  <Styles.Step className={isStepActive(3)}>
                     Tell us about yourself
                  </Styles.Step>
               </>
            </Styles.Stage>
            <Styles.Stage height2={evalHeightSecond(onboard.step)}>
               Setup your Account
               <>
                  <Styles.Step className={isStepActive(4)}>
                     <span>Hosting ({user.organization?.hosting?.type})</span>
                     <span className="price">
                        {user.organization?.hosting?.cost === 0
                           ? 'Free'
                           : user.organization?.hosting?.cost}
                     </span>
                  </Styles.Step>
                  <Styles.Step className={isStepActive(5)}>
                     <span>Onboarding Support</span>
                  </Styles.Step>
                  <Styles.Step className={isStepActive(6)}>
                     <span>Installation</span>
                  </Styles.Step>
                  <Styles.Step className={isStepActive(7)}>
                     <span>Finish Setup</span>
                  </Styles.Step>
               </>
            </Styles.Stage>
         </Styles.Aside>
      </Styles.Wrapper>
   )
}

export default Layout

const Styles = {
   Wrapper: styled.div`
      background: #fafafa;
      height: 100vh;
      display: grid;
      grid-gap: 16px 0;
      grid-template-rows: 40px 1fr;
      grid-template-columns: 1fr 320px;
      grid-template-areas:
         'head head'
         'main aside';
   `,
   Main: styled.main`
      grid-area: main;
      padding: 0 16px;
   `,
   Aside: styled.aside`
      grid-area: aside;
      display: flex;
      flex-direction: column;
      padding-top: 16px;
   `,
   Stage: styled.ul(
      ({ height1, height2 }) => css`
         font-size: 24px;
         line-height: 16px;
         color: #555b6e;
         margin-bottom: 48px;
         padding: 0 16px 0 24px;
         position: relative;
         &::before {
            content: '';
            position: absolute;
            top: 16px;
            left: 4px;
            width: 2px;
            z-index: 100;
            background: #04a777;
         }
         &::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -5px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #fafafa;
         }
         &:first-child {
            &::before {
               height: ${height1}%;
            }
            &::after {
               border: ${height1 > 0
                  ? `2px solid #04A777`
                  : `2px solid #C3C6CE`};
            }
         }
         &:nth-child(2) {
            &::before {
               height: ${height2}%;
            }
            &::after {
               border: ${height2 > 0
                  ? `2px solid #04A777`
                  : `2px solid #C3C6CE`};
            }
         }
      `
   ),
   Step: styled.li`
      font-size: 14px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      &:first-child {
         margin-top: 24px;
      }
      position: relative;
      &::after {
         content: '';
         position: absolute;
         top: calc(100% - 26px);
         left: -23px;
         width: 8px;
         height: 8px;
         border-radius: 50%;
         background: #e1e1e1;
         z-index: 10;
      }
      &::before {
         content: '';
         position: absolute;
         top: -24px;
         left: -20px;
         width: 2px;
         height: 48px;
         background: #e1e1e1;
      }
      &.active {
         &::after {
            background: #04a777;
         }
      }
      span.price {
         font-weight: 500;
      }
   `,
}
