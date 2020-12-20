import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import st from "./MainPage.module.css";
import TeamList from '../TeamList/TeamList'
import CreateSanta from '../CreateSanta/CreateSanta'
const axios = require('axios');

export default class InnerTeam extends Component {
  state = {
    teamList: [],
    email: '',
    isEmpty: false,
    showCreator: false
  }

  componentDidMount() {

  }

  onHandlerChande = (e) => {
    const email = e.target.value;
    this.setState({ email })
  }

  onFormSubmit = async (e) => {
    e.preventDefault()
    const { email } = this.state
    try {
      const response = await axios.get(`/santas/teams/${email}`)

      const { teamWithLink } = response.data

      console.log(response.data)

      if (!teamWithLink && teamWithLink.length === 0) {
        this.setState({ teamList: [], isEmpty: true })
      } else {
        this.setState({ teamList: [...teamWithLink], isEmpty: false })
      }


    } catch (error) {
      console.log(error)
    }

    this.setState({ email: '' })
  }

  showCreator = () => {
    this.setState({ showCreator: true })
  }

  createGame = (e) => {
    e.preventDefault()
  }
  render() {
    const { email, teamList, isEmpty, showCreator } = this.state
    return (
      <div className={st.teams_list_wr}>
        {isEmpty && <div className={st.empty_warn}>Таких команд немає, спробуйте іншу пошту, або створіть свого Санту</div>}
        {showCreator && <CreateSanta />}
        {teamList && <TeamList array={teamList} adminEmail={email} />}

        <form className={st.email_form} onSubmit={this.onFormSubmit}>

          <div className={st.email_form_input}>
            <div className={st.email_form_input_descr}>Введіть Вашу пошту, щоб знайти своїх друзів</div>
            <input className={st.email_form_small_input} required id="email_input" type="email" placeholder="christmas@thief.ua" value={email} onChange={this.onHandlerChande} />
            <label htmlFor="email_input" className={st.email_form_input_label}>Бажано Gmail</label>
          </div>
          <input className={st.find_bnt} type="submit" value="Знайти" />
        </form>


        <div className={st.footer}>
          <button onClick={this.showCreator} className={st.start_btn}>Створити Санту</button>
        </div>
      </div>
    )
  }

}
