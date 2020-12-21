import React, { Component } from 'react'
import st from "./FindName.module.css"
import { notifier } from '../../helpers/notify'
import findMatch from '../../helpers/sliceEmail'
const stringSimilarity = require("string-similarity");
const axios = require('axios');


export default class FindName extends Component {
  state = {
    email: '',
  }

  onHandlerChande = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  findName = async () => {
    const { email } = this.state
    const { id, players } = this.props

    try {

      const response = await axios.get(`/santas/find/${id}/${email}`)
      notifier(response.data.message)

    } catch (error) {
      console.log(error)
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

  render() {
    return <div className={st.email_form}>
      <div className={st.email_form_input_descr}>Санта вже розіграний і щоб дізнатись для кого готувати подарунок введіть свою пошту</div>
      <input onChange={this.onHandlerChande} type="email" required name="email" className={st.email_form_small_input} placeholder="christmas@thief.ua" />
      <button onClick={this.findName} className={st.find_bnt}>Дізнатись</button>
    </div>
  }
}