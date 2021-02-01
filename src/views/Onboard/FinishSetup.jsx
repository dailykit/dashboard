import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

import Layout from './Layout'
import { Radio } from '../../components'
import { Label, Button } from './styled'
import { useAuth } from '../../store/auth'
import {
   MARKETPLACE_COMPANIES,
   INSERT_COMPANY_MENU_IMPORT,
} from '../../graphql'

const gif_ids = {
   launch: [
      'tXLpxypfSXvUc',
      'cEYFeE4wJ6jdDVBiiIM',
      'NRWFU8lq7hCXS',
      'kjjRGpezebjaw',
      '26DMXCypYxHVNydMc',
      '3oEhn501TH1S2NZATS',
      'dVnzGW7UehcEpwLxBm',
   ],
   popcorn: [
      'hVTouq08miyVo1a21m',
      'NipFetnQOuKhW',
      'tyqcJoNjNv0Fq',
      '11vsrRFqhjOcKI',
      'nWg4h2IK6jYRO',
      'uWzS6ZLs0AaVOJlgRd',
      'Bzebpz5rnyBb2',
   ],
   loading: [
      'l3nWhI38IWDofyDrW',
      'RgzryV9nRCMHPVVXPV',
      '3y0oCOkdKKRi0',
      'RHEqKwRZDwFKE',
      'wnYB3vx9t6PXiq1ubB',
      '3ohs7TrCSp7c8ZrxBe',
      'NGOoVtuqkfl0A',
   ],
   cooking: [
      'CNocEFcF9IBegtgW3q',
      'N23cG6apipMmQ',
      '3oEjHC7al4GfnudR7y',
      'xTk9ZAbN1rHWoMiANy',
      '5hrj42zCA1RoA',
      'H1NDopejHQjB5CQ8Yf',
      'rkgX9MTBXJa1O',
   ],
   excitement: [
      'q4sdF9tchap6E',
      '5GoVLqeAOo6PK',
      'nSkIv4g54tFni',
      'l3vR1AaADYcE7C8vu',
      'nnFwGHgE4Mk5W',
      '3o85xozRUKxoFSxODe',
      'WUq1cg9K7uzHa',
   ],
   congrats: [
      'g9582DNuQppxC',
      '5nmNO4kFHvgqF1wnPg',
      'l2Sqir5ZxfoS27EvS',
      'l2YWCPLrCIaNc9QT6',
      'mPIA4KZVXv0ty',
      'bKBM7H63PIykM',
      'l0MYCn3DDRBBqk6nS',
   ],
}

export const FinishSetup = () => {
   const { user } = useAuth()
   const [url, setUrl] = React.useState('')
   const [error, setError] = React.useState('')
   const [title, setTitle] = React.useState('')
   const [option, setOption] = React.useState('source')
   const [create, { loading }] = useMutation(INSERT_COMPANY_MENU_IMPORT, {
      onError: () => {
         setError('Something went wrong, please try again!')
      },
   })
   const { data: { companies = [] } = {} } = useQuery(MARKETPLACE_COMPANIES, {
      onCompleted: ({ companies = [] }) => {
         if (companies.length > 0) {
            const [company] = companies
            setTitle(company.title)
         }
      },
   })

   const onSubmit = () => {
      setError('')
      if (!url.trim()) return setError('Menu URL is required.')
      if (
         !new RegExp(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
         ).test(url)
      )
         return setError('Menu URL must be valid!')
      if (!title.trim()) return setError('Company is required.')
      if (url.trim() && title) {
         create({
            variables: {
               object: {
                  exportUrl: url,
                  marketPlaceCompanyTitle: title,
                  organizationId: user?.organization?.id,
               },
            },
         })
      }
   }

   return (
      <Layout>
         <Main>
            <Top>
               <GifCycle />
            </Top>
            <section className="p-3">
               <h2 className="text-xl text-gray-700 mb-3">Import Data</h2>
               <section>
                  <Radio>
                     <Radio.Option
                        id="source"
                        name="import"
                        value={option}
                        onClick={() => setOption('source')}
                     >
                        Marketplace
                     </Radio.Option>
                     <Radio.Option
                        id="demo"
                        name="import"
                        value={option}
                        onClick={() => setOption('demo')}
                     >
                        Dummy Content
                     </Radio.Option>
                     <Radio.Option
                        id="empty"
                        name="import"
                        value={option}
                        onClick={() => setOption('empty')}
                     >
                        Start Empty
                     </Radio.Option>
                  </Radio>
               </section>
               {option === 'source' && (
                  <section className="mt-3 space-y-3">
                     <fieldset className="flex flex-col">
                        <Label htmlFor="marketPlaceCompany">
                           Select Company
                        </Label>
                        <select
                           value={title}
                           id="marketPlaceCompany"
                           name="marketPlaceCompany"
                           onChange={e => setTitle(e.target.value)}
                           className="h-10 border rounded pl-2 w-64"
                        >
                           {companies.map(company => (
                              <option key={company.title} value={company.title}>
                                 {company.title}
                              </option>
                           ))}
                        </select>
                     </fieldset>
                     <fieldset className=" flex flex-col">
                        <Label htmlFor="menuUrl">Menu URL</Label>
                        <input
                           id="menuUrl"
                           value={url}
                           name="menuUrl"
                           placeholder="Enter menu url"
                           onChange={e => setUrl(e.target.value)}
                           className="h-10 border rounded pl-2 w-full"
                        />
                     </fieldset>
                     <Button
                        type="button"
                        onClick={onSubmit}
                        disabled={!url || loading}
                     >
                        {loading ? 'Saving' : 'Save'}
                     </Button>
                     {error && (
                        <span className="self-start block text-red-500 mt-2">
                           {error}
                        </span>
                     )}
                  </section>
               )}
               {option === 'demo' && <section className="mt-3">demo</section>}
               {option === 'empty' && <section className="mt-3">empty</section>}
            </section>
         </Main>
      </Layout>
   )
}

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)
const sleep = ms => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

const GifCycle = () => {
   const { user } = useAuth()
   const [gifs, setGifs] = React.useState([])

   const get = async id => await (await giphy.gif(id)).data

   React.useEffect(() => {
      ;(async () => {
         // launch
         const launchGifs = await Promise.all(gif_ids.launch.map(get))
         setGifs(launchGifs)
         await sleep(240000)
         // popcorn
         const popcornGifs = await Promise.all(gif_ids.popcorn.map(get))
         setGifs(popcornGifs)
         await sleep(240000)
         // loading
         const loadingGifs = await Promise.all(gif_ids.loading.map(get))
         setGifs(loadingGifs)
         await sleep(240000)
         // cooking
         const cookingGifs = await Promise.all(gif_ids.cooking.map(get))
         setGifs(cookingGifs)
         await sleep(240000)
         // excitement
         const excitementGifs = await Promise.all(gif_ids.excitement.map(get))
         setGifs(excitementGifs)
         await sleep(240000)
         // congrats
         const congratsGifs = await Promise.all(gif_ids.congrats.map(get))
         setGifs(congratsGifs)
      })()
   }, [])
   return (
      <>
         {user.organization?.instanceStatus === 'SETUP_COMPLETED' ? (
            <header className="text-left p-3 absolute z-10 inset-0 h-full">
               <h1 className="mb-3 text-2xl font-medium text-white ">
                  You're DailyOS is ready to use.
               </h1>
               {user.organization.organizationUrl && (
                  <a
                     target="__blank"
                     rel="noopener noreferrer"
                     href={`https://${user.organization.organizationUrl}/desktop`}
                     className="bg-green-500 text-white rounded inline-flex items-center px-3 h-10"
                  >
                     Go to DailyOS
                  </a>
               )}
            </header>
         ) : (
            <header className="text-left p-3 absolute z-10 inset-0 h-full">
               <h1 className="text-2xl font-medium text-white ">
                  Setting up your instance!
               </h1>
               <p className="mt-1 text-white leading-5">
                  This could take a while. In the meantime, enjoy this GIF
                  sequence we've curated for you.
               </p>
            </header>
         )}
         <section className="bg-gray-100">
            {gifs.length > 0 && <RenderGif gifs={gifs} />}
         </section>
      </>
   )
}

const RenderGif = ({ gifs }) => {
   const [gif, setGif] = React.useState(null)
   React.useEffect(() => {
      ;(async () => {
         setGif(gifs[0])
         await sleep(34286)
         setGif(gifs[1])
         await sleep(34286)
         setGif(gifs[2])
         await sleep(34286)
         setGif(gifs[3])
         await sleep(34286)
         setGif(gifs[4])
         await sleep(34286)
         setGif(gifs[5])
         await sleep(34286)
         setGif(gifs[6])
      })()
   }, [gifs])
   return gif && <Gif gif={gif} width={window.innerWidth - 354} />
}

const Main = styled.div`
   overflow-y: auto;
   height: calc(100vh - 72px);
   border: 1px solid #ececec;
   ${tw`bg-white`};
`

const Top = styled.section`
   height: 50%;
   overflow: hidden;
   position: relative;
   > header {
      &:before {
         content: '';
         z-index: -1;
         ${tw`absolute inset-0`}
         background: rgb(255,255,255);
         background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0) 22%,
            rgba(0, 0, 0, 0.45) 51%,
            rgba(0, 0, 0, 0.8) 100%
         );
      }
   }
`
