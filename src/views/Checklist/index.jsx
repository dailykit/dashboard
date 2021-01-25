import React from 'react'
import tw from 'tailwind.macro'
import { Grid } from '@giphy/react-components'
import styled, { css } from 'styled-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

import { useAuth } from '../../store/auth'

export const Checklist = () => {
   return (
      <div className="w-screen h-screen overflow-hidden grid grid-cols-2">
         <section className="h-full text-center">
            <GifCycle />
         </section>
         <section>right</section>
      </div>
   )
}

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)
const sleep = ms => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

const GifCycle = () => {
   const { user } = useAuth()
   const [keyword, setKeyword] = React.useState('launch')

   React.useEffect(() => {
      ;(async () => {
         await sleep(120000)
         setKeyword('popcorn')
         await sleep(120000)
         setKeyword('loading')
         await sleep(180000)
         setKeyword('cooking')
         await sleep(180000)
         setKeyword('excitement')
      })()
   }, [])

   if (user.organization?.instanceStatus === 'SETUP_COMPLETED')
      return (
         <div className="h-full text-center">
            <h1>You're DailyOS is ready to use.</h1>
            <a
               target="__blank"
               rel="noopener noreferrer"
               href={`http://${user.organization.url}/desktop`}
               className="border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10"
            >
               Go to DailyOS
            </a>
         </div>
      )
   return (
      <div className="relative h-full">
         <header className="h-auto text-left p-3 mb-2">
            <h1 className="text-2xl text-green-600">
               Setting up your instance!
            </h1>
            <p className="mt-1 text-gray-500 leading-5 w-1/2">
               This could take a while. In the meantime, enjoy this GIF sequence
               we've curated for you.
            </p>
         </header>
         <section
            style={{ height: 'calc(100vh - 108px)' }}
            className="relative overflow-y-auto bg-gray-100 rounded"
         >
            {keyword === 'button' && <RenderGifs keyword="button" />}
            {keyword === 'launch' && <RenderGifs keyword="launch" />}
            {keyword === 'popcorn' && <RenderGifs keyword="popcorn" />}
            {keyword === 'loading' && <RenderGifs keyword="loading" />}
            {keyword === 'cooking' && <RenderGifs keyword="cooking" />}
            {keyword === 'excitement' && <RenderGifs keyword="excitement" />}
            {user.organization?.instanceStatus === 'SETUP_COMPLETED' && (
               <RenderGifs keyword="celebrate" />
            )}
         </section>
      </div>
   )
}

const RenderGifs = ({ keyword }) => {
   return (
      <Grid
         columns={3}
         width={window.innerWidth / 2 - 18}
         fetchGifs={() => giphy.search(keyword)}
         className="h-full"
      />
   )
}

export const StyledButton = styled.button(
   () => css`
      background: #04a777;
      ${tw`mt-3 px-6 h-10 rounded-full text-sm uppercase font-medium text-white`}
   `
)
