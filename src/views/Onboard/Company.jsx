import React from 'react'
import moment from 'moment-timezone'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
} from '@reach/combobox'

import { Footer, Main, Field, Label, Form, Button, H2 } from './styled'

import Layout from './Layout'
import { useAuth } from '../../store/auth'
import { UPDATE_ORGANIZATION } from '../../graphql'
import { useTimezones, useCurrencies } from '../../utils'

export const Company = () => {
   const { user } = useAuth()
   const history = useHistory()
   const [tzSearch, setTzSearch] = React.useState('')
   const { timezones } = useTimezones(tzSearch)
   const [currencySearch, setCurrencySearch] = React.useState('')
   const { list: currencies } = useCurrencies(currencySearch)
   const [update] = useMutation(UPDATE_ORGANIZATION, {
      onCompleted: () => {
         history.push('/signup/about-yourself')
      },
      onError: error => {
         console.log(error)
      },
   })

   const [form, setForm] = React.useState({
      company: '',
      currency: '',
      timezone: '',
      employeesCount: '',
   })

   const handleChange = e => {
      const { name, value } = e.target
      setForm(form => ({
         ...form,
         [name]: value,
      }))
   }

   React.useEffect(() => {
      if (user.organization?.id) {
         setForm(form => ({
            ...form,
            currency: user.organization?.currency || '',
            company: user.organization?.organizationName || '',
            timezone: user.organization?.timeZone || moment.tz.guess(),
         }))
      }
   }, [user.organization])

   const save = () => {
      update({
         variables: {
            id: user.organization.id,
            _set: {
               timeZone: form.timezone,
               currency: form.currency,
               onboardStatus: 'ABOUT_YOURSELF',
               organizationName: form.company,
            },
         },
      })
   }

   return (
      <Layout>
         <Main>
            <section className="mt-8 mx-auto w-1/4">
               <H2>Tell us about your company</H2>
               <Form>
                  <Field>
                     <Label htmlFor="company">Company Name</Label>
                     <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={form.company}
                        autoComplete="off"
                        placeholder="Enter your companie's name"
                        onChange={e => handleChange(e)}
                     />
                  </Field>
                  <Field>
                     <Label htmlFor="currency">Currency</Label>
                     <Combobox
                        aria-label="Currencies"
                        onSelect={item =>
                           handleChange({
                              target: { name: 'currency', value: item },
                           })
                        }
                     >
                        <StyledComboboxInput
                           value={form.currency}
                           placeholder="Select Currency"
                           onChange={e => {
                              setCurrencySearch(e.target.value)
                              handleChange({
                                 target: {
                                    name: 'currency',
                                    value: e.target.value,
                                 },
                              })
                           }}
                        />
                        {currencies.length > 0 && (
                           <StyledComboboxPopover portal={false}>
                              {currencies.length > 0 ? (
                                 <ComboboxList>
                                    {currencies.map(node => {
                                       return (
                                          <ComboboxOption
                                             key={node.title}
                                             value={node.value}
                                             placeholder="Select a currency"
                                          />
                                       )
                                    })}
                                 </ComboboxList>
                              ) : (
                                 <span
                                    style={{
                                       display: 'block',
                                       margin: 8,
                                    }}
                                 >
                                    No results found
                                 </span>
                              )}
                           </StyledComboboxPopover>
                        )}
                     </Combobox>
                  </Field>
                  <Field>
                     <Label htmlFor="timezone">Time Zone</Label>
                     <Combobox
                        aria-label="Timezones"
                        onSelect={item =>
                           handleChange({
                              target: { name: 'timezone', value: item },
                           })
                        }
                     >
                        <StyledComboboxInput
                           value={form.timezone}
                           placeholder="Select Timezone"
                           onChange={e =>
                              setTzSearch(e.target.value) ||
                              handleChange({
                                 target: {
                                    name: 'timezone',
                                    value: e.target.value,
                                 },
                              })
                           }
                        />
                        {timezones.length > 0 && (
                           <StyledComboboxPopover portal={false}>
                              {timezones.length > 0 ? (
                                 <ComboboxList>
                                    {timezones.map(timezone => {
                                       return (
                                          <ComboboxOption
                                             key={timezone.title}
                                             value={timezone.title}
                                             placeholder="Select a timezone"
                                          />
                                       )
                                    })}
                                 </ComboboxList>
                              ) : (
                                 <span
                                    style={{
                                       display: 'block',
                                       margin: 8,
                                    }}
                                 >
                                    No results found
                                 </span>
                              )}
                           </StyledComboboxPopover>
                        )}
                     </Combobox>
                  </Field>
                  <Field>
                     <Label htmlFor="employeesCount">No. of Employees</Label>
                     <select
                        name="employeesCount"
                        id="employeesCount"
                        value={form.employeesCount}
                        onChange={e => handleChange(e)}
                     >
                        <option value="5">5-10</option>
                        <option value="10">10-20</option>
                        <option value="20">20-50</option>
                        <option value="50">50-100</option>
                        <option value="100">100-500</option>
                        <option value="500">500+</option>
                     </select>
                  </Field>
               </Form>
            </section>
         </Main>
         <Footer>
            <span />
            <Button onClick={save}>Next</Button>
         </Footer>
      </Layout>
   )
}

const StyledComboboxPopover = styled(ComboboxPopover)`
   padding: 4px 0;
   position: absolute;
   margin-top: -10px;
   background: #fff;
   z-index: 100;
   width: 320px;
   overflow-y: auto;
   max-height: 340px;
   border: 1px solid rgba(0, 0, 0, 0.2);
   [data-reach-combobox-option] {
      padding: 4px 8px;
      list-style: none;
      :hover {
         background: rgba(0, 0, 0, 0.1);
      }
   }
   [data-user-value] {
   }
   [data-suggested-value] {
      color: #ada9a9;
   }
`

const StyledComboboxInput = styled(ComboboxInput)`
   width: 320px;
   height: 40px;
   border: none;
   color: #686d7b;
   border-bottom: 2px solid #e1e1e1;
   &::placeholder {
      color: #969696;
   }
   &:focus {
      outline: transparent;
      border-bottom: 2px solid #04a777;
   }
`
