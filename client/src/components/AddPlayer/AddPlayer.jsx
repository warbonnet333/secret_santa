import React, { useState } from 'react'
import st from './AddPlayer.module.css'
import { notifier } from '../../helpers/notify'
import { withRouter } from "react-router";
const axios = require('axios');

const AddPlayer = (props) => {
  const initialState = {
    name: '',
    email: '',
    descr: '',
  }
  const text = 'Уху! Вас запросили зіграти в Таємного Санту, приєднуйтесь і додавайте себе до списку учасників'

  const [state, setState] = useState(initialState)

  const onHandlerChange = (e) => {
    setState(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const { name, email, descr } = state;
    const { id, players } = props

    const sameName = players.find((item) => item.name.toLowerCase() === name.toLowerCase())
    const sameEmail = players.find((item) => item.email === email)

    if (sameName || sameEmail) {
      notifier('Гравець з таким іменем чи поштою вже є')
      return;
    }

    try {
      await axios.put(`/santas/${id}`, { name, email, descr });
      props.shoudUpdate()
      notifier('Додано!', true);
      setState(initialState);

    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  const { name, email, descr } = state;
  const { id } = props;
  return (
    <form className={st.email_form} onSubmit={onSubmitForm}>
      <div className={st.email_form_input_descr}>Додайте нового гравця</div>
      <div className={st.email_form_input}>
        <label className={st.label} htmlFor="add_name">Ім'я</label>
        <input className={st.email_form_small_input} required id="add_name" type="text" name="name" placeholder="Грінч" value={name} onChange={onHandlerChange} />
      </div>
      <div className={st.email_form_input}>
        <label className={st.label} htmlFor="add_name">Email</label>
        <input className={st.email_form_small_input} required id="add_email" type="email" name="email" placeholder="christmas@thief.ua" value={email} onChange={onHandlerChange} />
      </div>
      <div className={st.email_form_input}>
        <label className={st.label} htmlFor="add_descr">Підказка для Санти</label>
        <textarea className={st.email_form_small_input} required id="add_descr" name="descr" placeholder="На Новий Рік під ялинку хочу отримати ..." value={descr} onChange={onHandlerChange} />
      </div>
      <button type="submit" className={st.find_bnt} >Додати</button>
      <div className={st.email_form_input_descr}>або надішліть запрошення в Telegram</div>
      <a rel="noopener noreferrer" target="_blank" href={`https://t.me/share/url?url=https://secretisanta.herokuapp.com/?teamId=${id}&text=${text}`} className={st.share_teleg}>Запросити</a>
    </form >
  )
}


export default withRouter(AddPlayer)


