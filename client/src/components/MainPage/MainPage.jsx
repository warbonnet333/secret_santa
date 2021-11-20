import React, { useEffect, useState } from 'react';
import st from "./MainPage.module.css";
import TeamList from '../TeamList/TeamList'
import CreateSanta from '../CreateSanta/CreateSanta'
import getParameterByName from "../../helpers/getQuery"
const axios = require('axios');

const InnerTeam = () => {

  const [teamList, teamState] = useState([]);
  const [email, emailState] = useState('');
  const [isEmpty, isEmptyState] = useState(false);
  const [showCreator, showCreatorState] = useState(false);

  useEffect(() => {
    const teamId = getParameterByName("teamId")
    if (teamId) {
      this.props.history.push(`/inner/${teamId}`)
    }
  }, [])

  const onHandlerChande = (e) => {
    emailState(e.target.value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`/santas/teams/${email}`)

      const { teamWithLink } = response.data
      if (teamWithLink.length === 0) {
        teamState([])
        isEmptyState(true)
      } else {
        teamState([...teamWithLink])
        isEmptyState(false)
      }

    } catch (error) {
      console.log(error)
    }

    emailState('')
  }

  return (
    <div className={st.teams_list_wr}>
      {isEmpty && <div className={st.empty_warn}>Таких команд немає, спробуйте іншу пошту, або створіть свого Санту</div>}
      {showCreator && <CreateSanta />}
      {!!teamList.length && <TeamList array={teamList} adminEmail={email} />}

      <form className={st.email_form}>
        <div className={st.email_form_input}>
          <div className={st.email_form_input_descr}>Введіть Вашу пошту, щоб знайти своїх друзів</div>
          <input className={st.email_form_small_input} required id="email_input" type="email" placeholder="christmas@thief.ua" value={email} onChange={onHandlerChande} />
          <label htmlFor="email_input" className={st.email_form_input_label}>Бажано Gmail</label>
        </div>
        <div onClick={onFormSubmit} className={st.find_bnt}>Знайти</div>
      </form>


      <div className={st.footer}>
        <button onClick={() => showCreatorState(prev => !prev)} className={st.start_btn}>Створити Санту</button>
      </div>
    </div>
  )
}

export default InnerTeam
