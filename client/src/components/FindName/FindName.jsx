import React, { useState } from 'react'
import st from "./FindName.module.css"
import { notifier } from '../../helpers/notify'
const axios = require('axios');


const FindName = ({ id }) => {
  const [email, setEmail] = useState('');

  const onHandlerChande = (e) => {
    setEmail(e.target.value)
  }

  const findName = async () => {
    try {
      const response = await axios.get(`/santas/find/${id}/${email}`)
      notifier(response.data.message)

    } catch (error) {
        notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  return <div className={st.email_form}>
    <div className={st.email_form_input_descr}>Санта вже розіграний і щоб дізнатись для кого готувати подарунок введіть свою пошту</div>
    <input onChange={onHandlerChande} type="email" required name="email" className={st.email_form_small_input} placeholder="christmas@thief.ua" />
    <button onClick={findName} className={st.find_bnt}>Дізнатись</button>
  </div>
}

export default FindName