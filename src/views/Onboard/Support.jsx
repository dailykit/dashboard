import React from 'react'
import { useHistory } from 'react-router-dom'

import {
   Footer,
   Wrapper,
   ExtMain,
   CheckBoxWrapper,
   Info,
   Tip,
   Card,
} from './styled'
import Layout from './Layout'
import { BulbEmoji } from '../../assets/icons'

export const Support = () => {
   const history = useHistory()
   const [support, setSupport] = React.useState(false)

   const nextPage = () => history.push('/signup/installation')
   const prevPage = () => history.push('/signup/hosting')

   return (
      <Layout>
         <Wrapper>
            <ExtMain>
               <div>
                  <h2>Installation and Onboarding Support</h2>
                  <CheckBoxWrapper>
                     <input
                        type="checkbox"
                        id="support"
                        checked={support}
                        onChange={() => setSupport(!support)}
                     />
                     <label htmlFor="support">
                        I want installation and onboard support
                     </label>
                  </CheckBoxWrapper>
                  <Info>
                     <div>
                        <Tip>
                           <span>
                              <BulbEmoji />
                           </span>
                           <p>
                              Dailykit is here to help! With simplified
                              intallation and onboarding support, we will
                           </p>
                        </Tip>
                        <ul>
                           <li>Setup your software</li>
                           <li>Import your data</li>
                           <li>Train your staff</li>
                           <li>Provide 3 months of 24x7 world class support</li>
                        </ul>
                     </div>
                     <Card>
                        <h4>We have a plan for you</h4>
                        <span id="strike">$3000</span>
                        <span id="discount">100% off (limited)</span>
                        <span id="price">Free</span>
                     </Card>
                  </Info>
               </div>
            </ExtMain>
            <Footer>
               <button onClick={() => prevPage()}>Back</button>
               <button
                  onClick={() => nextPage()}
                  style={{
                     background: '#04a777',
                  }}
               >
                  Next
               </button>
            </Footer>
         </Wrapper>
      </Layout>
   )
}
