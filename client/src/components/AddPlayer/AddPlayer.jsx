import React, { Component } from 'react'
import st from './AddPlayer.module.css'
import { notifier } from '../../helpers/notify'
import { withRouter } from "react-router";
const axios = require('axios');

class AddPlayer extends Component {
  state = {
    name: '',
    email: '',
    text: 'Уху! Вас запросили зіграти в Таємного Санту приєднуйтесь і додавайте себе до списку учасників'
  }

  initialState = () => {
    this.setState({ name: '', email: '' })
  }

  onHandlerChande = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    const { name, email } = this.state;
    const { id, players } = this.props

    const sameName = players.find((item) => item.name.toLowerCase() === name.toLowerCase())
    const sameEmail = players.find((item) => item.email === email)

    if (sameName || sameEmail) {
      notifier('Гравець з таким іменем чи поштою вже є')
      return
    }

    try {
      await axios.put(`/santas/${id}`, { name, email })
      const { shoudUpdate } = this.props
      shoudUpdate()
      notifier('Додано!', true)
      this.initialState()

    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  render() {
    const { name, email, text } = this.state;
    const { id } = this.props;
    return (
      <form className={st.email_form} >
        <div className={st.email_form_input_descr}>Додайте друга самі</div>
        <div className={st.email_form_input}>
          <label className={st.label} htmlFor="add_name">Ім'я</label>
          <input className={st.email_form_small_input} required id="add_name" type="text" name="name" placeholder="Грінч" value={name} onChange={this.onHandlerChande} />
        </div>
        <div className={st.email_form_input}>
          <label className={st.label} htmlFor="add_name">Email</label>
          <input className={st.email_form_small_input} required id="add_email" type="email" name="email" placeholder="christmas@thief.ua" value={email} onChange={this.onHandlerChande} />
        </div>
        <div className={st.find_bnt} onClick={this.onSubmitForm}>Додати</div>
        <div className={st.email_form_input_descr}>або надішліть запрошення в Telegram</div>
        <a rel="noopener noreferrer" target="_blank" href={`https://t.me/share/url?url=https://secretisanta.herokuapp.com/?teamId=${id}&text=${text}`} className={st.share_teleg}>Запросити</a>
      </form >
    )
  }

}


export default withRouter(AddPlayer)


