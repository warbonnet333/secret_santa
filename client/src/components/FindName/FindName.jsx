import React, { useState } from 'react'
import st from "./FindName.module.css"
import { notifier } from '../../helpers/notify'
const stringSimilarity = require("string-similarity");
const axios = require('axios');


const FindName = (props) => {
  const [email, setEmail] = useState('');

  const onHandlerChande = (e) => {
    setEmail(e.target.value)
  }

  const findName = async () => {
    const { id, players } = props

    try {
      const response = await axios.get(`/santas/find/${id}/${email}`)
      notifier(response.data.message)

    } catch (error) {
      const newArr = players.reduce(function (acc, item) {
        acc.push(item.email)
        return acc
      }, [])

      const { bestMatch } = stringSimilarity.findBestMatch(email, newArr)
      if (bestMatch.rating > 0.91) {
        notifier(`Щось пішло не так, найбільш схожий емейл - ${bestMatch.target}`)
      } else {
        notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
      }
    }
  }

  return <div className={st.email_form}>
    <div className={st.email_form_input_descr}>Санта вже розіграний і щоб дізнатись для кого готувати подарунок введіть свою пошту</div>
    <input onChange={onHandlerChande} type="email" required name="email" className={st.email_form_small_input} placeholder="christmas@thief.ua" />
    <button onClick={findName} className={st.find_bnt}>Дізнатись</button>
  </div>
}

export default FindName