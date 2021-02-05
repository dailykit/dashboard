import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import styled from 'styled-components'

import { useAuth } from '../../store/auth'
import { VerifyEmailIcon } from '../../assets/icons'

const VerfiyEmailBanner = () => {
   const { user } = useAuth()

   const resend = async () => {
      try {
         const data = { id: user?.keycloakId }
         const url = `${process.env.REACT_APP_PLATFORM_URL}/api/dailykit/verify/email`
         await axios.post(url, data)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <Styles.Banner>
         <Styles.Aside>
            <VerifyEmailIcon />
         </Styles.Aside>
         <Styles.Main>
            <section>
               <h3>Verification mail sent!</h3>
               <p>
                  We need to verify your email address. Please check your inbox
                  for a message from us. You’ll find the confirmation link
                  inside.
               </p>
            </section>
            <section>
               <button onClick={resend}>Resend</button>
            </section>
         </Styles.Main>
      </Styles.Banner>
   )
}

export default VerfiyEmailBanner

const Styles = {
   Banner: styled.div`
      display: grid;
      background: #555b6e;
      ${tw`h-24 text-white`}
      grid-template-columns: 96px 1fr;
   `,
   Aside: styled.aside`
      ${tw`flex items-center justify-center`}
   `,
   Main: styled.main`
      display: grid;
      padding-right: 16px;
      grid-template-columns: 1fr auto;
      ${tw`items-center`}
      h3 {
         ${tw`text-2xl`}
      }
      p {
         ${tw`text-sm`}
      }
      button {
         background: #00a7e1;
         ${tw`rounded-full px-6 py-2`}
      }
   `,
}
