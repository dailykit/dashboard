import React from 'react'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import { useAuth } from '../../store/auth'
import { Footer, Main, Wrapper, RadioWrapper, Label } from './styled'

export const Hosting = () => {
   const history = useHistory()
   const { user } = useAuth()

   const nextPage = () => history.push('/signup/support')
   const prevPage = () => history.push('/signup/about-yourself')

   return (
      <Layout>
         <Wrapper>
            <Main>
               <div>
                  <h2>Hosting</h2>
                  <RadioWrapper>
                     <Label>
                        <input
                           id="cloud"
                           type="radio"
                           name="hosting"
                           checked={true}
                           onChange={() => {}}
                        />
                        <span htmlFor="cloud">Cloud Hosting</span>
                     </Label>
                     <Label>
                        <input
                           id="self"
                           type="radio"
                           name="hosting"
                           checked={false}
                           onChange={() => {}}
                        />
                        <span htmlFor="self">Self Hosting</span>
                     </Label>
                  </RadioWrapper>
                  {user.organization?.hosting?.type === 'cloud' && (
                     <>
                        <h4>Choose your Plan</h4>
                        <RadioWrapper variant="rectangle">
                           <Label variant="rectangle">
                              <input
                                 id="free"
                                 name="plan"
                                 type="radio"
                                 checked={true}
                                 onChange={() => {}}
                              />
                              <span htmlFor="free">Free</span>
                           </Label>
                        </RadioWrapper>
                     </>
                  )}
               </div>
            </Main>
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
