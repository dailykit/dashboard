import React from 'react'
import styled, { css } from 'styled-components'

import { useAuth } from '../../store/auth'

const Layout = ({ children }) => {
   const { onboard } = useAuth()
   const evalHeightFirst = step => {
      if (step === 1) {
         return 38
      } else if (step === 2) {
         return 74
      } else if (step > 2) {
         return 1
      }
   }
   const evalHeightSecond = step => {
      if (step === 4) {
         return 22
      } else if (step === 5) {
         return 41
      } else if (step === 6) {
         return 62
      } else if (step === 7) {
         return 83
      }
   }

   const evalTotal = () => {
      const { type: hostingType, plan: hostingPlan } = state.user_data.hosting
      const {
         required: customRequired,
         plan: customPlan,
      } = state.user_data.custom

      let hosting = hostingType === 'cloud' ? hostingPlan : 0
      let onboard = state.user_data.onboard ? 1000 : 0
      let custom = customRequired
         ? customPlan === 135
            ? 135 * 50
            : customPlan === 150
            ? 150 * 10
            : 100 * 100
         : 0

      switch (onboard.step) {
         case 4:
            return hosting
         case 5:
            return hosting + onboard
         case 6:
            return hosting + onboard + custom
         default:
            return hosting + onboard + custom
      }
   }

   const isStepActive = start => {
      const steps = Array.from(new Array(8 - start).keys(), i => i + start)
      return steps.includes(onboard.step) ? 'active' : ''
   }

   return (
      <Step>
         <Header>
            <span>
               <img src="/logo.png" alt="DailyKit" />
            </span>
            <h1>Basic Information</h1>
         </Header>
         <Main step={onboard.step}>{children}</Main>
         <Aside>
            <Stage height1={evalHeightFirst(onboard.step)}>
               Basic Information
               {onboard.step <= 2 && (
                  <>
                     <li className={isStepActive(1)}>
                        Tell us about your company
                     </li>
                     <li className={isStepActive(2)}>Tell us about yourself</li>
                  </>
               )}
            </Stage>
            {/*
				<Stage height2={evalHeightSecond(state.step)}>
					Setup your Account
					{state.step > 3 && (
						<>
							<li className={isStepActive(4)}>
								<span>
									Hosting({state.user_data.hosting.type})
								</span>
								<span className="price">
									$
									{state.user_data.hosting.type === 'cloud'
										? state.user_data.hosting.plan
										: 0}
								</span>
							</li>
							<li className={isStepActive(5)}>
								<span>Onboarding Support</span>
								{state.step > 4 && (
									<span className="price">
										${state.user_data.onboard ? 1000 : 0}
									</span>
								)}
							</li>
							<li className={isStepActive(6)}>
								<span>
									Custom Support
									{state.step > 5 &&
										(state.user_data.custom.plan === 135
											? '(x50hrs)'
											: state.user_data.custom.plan ===
											  150
											? '(x10hrs)'
											: '(x100hrs)')}
								</span>
								{state.step > 5 && (
									<span className="price">
										$
										{state.user_data.custom.required
											? state.user_data.custom.plan
											: 0}
									</span>
								)}
							</li>
							<li className={isStepActive(7)}>
								Billing Information
							</li>
						</>
					)}
            </Stage>
				{state.step > 3 && (
               <Cart>
						<div>
							<span>Payable Now</span>
							<span>${evalTotal()}</span>
						</div>
					</Cart>
				)}
             */}
         </Aside>
      </Step>
   )
}

export default Layout

export const Step = styled.div`
   background: #fafafa;
   height: 100vh;
   padding: 0 96px;
   display: grid;
   grid-template-rows: 96px 1fr;
   grid-template-columns: 2fr 1fr 1fr;
   grid-template-areas:
      'head head head'
      'main main aside';
`

export const Header = styled.header`
   grid-area: head;
   display: flex;
   align-items: center;
   span {
      display: flex;
      display: block;
      margin-right: 16px;
      padding-right: 16px;
      align-items: center;
      border-right: 1px solid rgba(0, 0, 0, 0.3);
   }
   h1 {
      font-size: 24px;
      font-weight: 400;
      color: #555b6e;
   }
`

export const Main = styled.main`
   grid-area: main;
   position: relative;
   ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: ${props => `${(100 / 2) * props.step}%`};
      height: 4px;
      background: #04a777;
   }
`
export const Aside = styled.aside`
   grid-area: aside;
   display: flex;
   flex-direction: column;
   height: calc(100vh - 200px);
   padding: 32px 0 0 80px;
`

export const Stage = styled.ul(
   ({ height1, height2 }) => css`
      font-size: 24px;
      line-height: 16px;
      color: #555b6e;
      margin-bottom: 48px;
      position: relative;
      &::before {
         content: '';
         position: absolute;
         top: 16px;
         left: -32px;
         width: 2px;
         z-index: 100;
         background: #04a777;
      }
      &::after {
         content: '';
         position: absolute;
         top: -2px;
         left: -40px;
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
            border: ${height1 > 0 ? `2px solid #04A777` : `2px solid #C3C6CE`};
         }
      }
      &:nth-child(2) {
         &::before {
            height: ${height2}%;
         }
         &::after {
            border: ${height2 > 0 ? `2px solid #04A777` : `2px solid #C3C6CE`};
         }
      }
      li {
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
            left: -35px;
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
            left: -32px;
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
      }
   `
)

export const Cart = styled.div`
   width: 100%;
   color: #fff;
   height: auto;
   font-weight: 300;
   padding: 16px;
   padding-bottom: 0;
   background: #555b6e;
   border-radius: 4px;
   div {
      height: 32px;
      display: flex;
      justify-content: space-between;
      span {
         font-size: 14px;
         :last-child {
            font-weight: 400;
         }
      }
   }
`
