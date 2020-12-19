import React, { Component } from 'react'
import st from './AddPlayer.module.css'
import { notifier } from '../../helpers/notify'
const axios = require('axios');

export default class AddPlayer extends Component {
  state = {
    name: '',
    email: ''
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
    const { name, email } = this.state;
    return (
      <form className={st.email_form} onSubmit={this.onSubmitForm}>
        <div className={st.email_form_input_descr}>Додайте друга самі або надішліть запрошення</div>
        <div className={st.email_form_input}>
          <label className={st.label} htmlFor="add_name">Ім'я</label>
          <input className={st.email_form_small_input} required id="add_name" type="text" name="name" placeholder="Грінч" value={name} onChange={this.onHandlerChande} />
        </div>
        <div className={st.email_form_input}>
          <label className={st.label} htmlFor="add_name">Email</label>
          <input className={st.email_form_small_input} required id="add_email" type="email" name="email" placeholder="christmas@thief.ua" value={email} onChange={this.onHandlerChande} />
        </div>
        <input className={st.find_bnt} type="submit" value="Додати" />
      </form>
    )
  }

}


