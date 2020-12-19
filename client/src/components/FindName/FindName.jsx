import React, { Component } from 'react'
import st from "./FindName.module.css"
import { notifier } from '../../helpers/notify'
const axios = require('axios');

export default class FindName extends Component {
  state = {
    email: '',
  }

  onHandlerChande = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  findName = async () => {
    try {
      const { email } = this.state
      const { id } = this.props

      const response = await axios.get(`/santas/find/${id}/${email}`)
      notifier(response.data.message)

    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  render() {
    return <div className={st.email_form}>
      <div className={st.email_form_input_descr}>Санта вже розіграний і щоб дізнатись для кого готувати подарунок введіть свою пошту</div>
      <input onChange={this.onHandlerChande} type="email" required name="email" className={st.email_form_small_input} placeholder="christmas@thief.ua" />
      <button onClick={this.findName} className={st.find_bnt}>Дізнатись</button>
    </div>
  }
}