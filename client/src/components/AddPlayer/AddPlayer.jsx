import React, { useState } from 'react'
import st from './AddPlayer.module.css'
import { notifier } from '../../helpers/notify'
import { withRouter } from "react-router";
const axios = require('axios');

const AddPlayer = (props) => {
  const initialState = {
    name: '',
    email: '',
  }
  const text = 'Уху! Вас запросили зіграти в Таємного Санту приєднуйтесь і додавайте себе до списку учасників'

  const [state, setState] = useState(initialState)

  const onHandlerChande = (e) => {
    setState(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const { name, email } = state;
    const { id, players } = props

    const sameName = players.find((item) => item.name.toLowerCase() === name.toLowerCase())
    const sameEmail = players.find((item) => item.email === email)

    if (sameName || sameEmail) {
      notifier('Гравець з таким іменем чи поштою вже є')
      return
    }

    try {
      await axios.put(`/santas/${id}`, { name, email })
      props.shoudUpdate()
      notifier('Додано!', true)
      setState(initialState)

    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  const { name, email } = state;
  const { id } = props;
  return (
    <form className={st.email_form} >
      <div className={st.email_form_input_descr}>Додайте друга самі</div>
      <div className={st.email_form_input}>
        <label className={st.label} htmlFor="add_name">Ім'я</label>
        <input className={st.email_form_small_input} required id="add_name" type="text" name="name" placeholder="Грінч" value={name} onChange={onHandlerChande} />
      </div>
      <div className={st.email_form_input}>
        <label className={st.label} htmlFor="add_name">Email</label>
        <input className={st.email_form_small_input} required id="add_email" type="email" name="email" placeholder="christmas@thief.ua" value={email} onChange={onHandlerChande} />
      </div>
      <div className={st.find_bnt} onClick={onSubmitForm}>Додати</div>
      <div className={st.email_form_input_descr}>або надішліть запрошення в Telegram</div>
      <a rel="noopener noreferrer" target="_blank" href={`https://t.me/share/url?url=https://secretisanta.herokuapp.com/?teamId=${id}&text=${text}`} className={st.share_teleg}>Запросити</a>
    </form >
  )
}


export default withRouter(AddPlayer)


