import React, { useState } from "react"
import st from "./CreateSanta.module.css"
import { withRouter } from "react-router";
const axios = require('axios');

const CreateSanta = (props) => {
  const initialState = {
    name: '',
    limit: '',
    adminName: '',
    adminEmail: '',
  }

  const [state, setState] = useState(initialState)

  const onHandlerChande = e => {
    setState(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const { name, limit, adminName, adminEmail } = state;

    const newTeam = { name, limit, admin: adminEmail }

    try {
      const response = await axios.post(`/santas`, newTeam)

      const { id } = response.data.team

      const responseAdmin = await axios.put(`/santas/${id}`, { name: adminName, email: adminEmail })

      const idToGo = responseAdmin.data.team.id

      props.history.push(`/inner/${idToGo}`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
  <form className={st.create_form} onSubmit={onSubmitForm}>
    <label htmlFor="santa_name">Назва команди</label>
    <input required onChange={onHandlerChande} value={state.name} type="text" name="name" id="santa_name" placeholder="Месники" />
    <label htmlFor="santa_limit">Грошовий ліміт подарунків</label>
    <input required onChange={onHandlerChande} value={state.limit} type="text" name="limit" id="santa_limit" placeholder="200 000 песо" />
    <label htmlFor="santa_adminName">Ваше ім'я</label>
    <input required onChange={onHandlerChande} value={state.adminName} type="text" name="adminName" id="santa_adminName" placeholder="Ваше ім'я" />
    <label htmlFor="santa_adminEmail">Ваша пошта</label>
    <input required onChange={onHandlerChande} value={state.adminEmail} type="text" name="adminEmail" id="santa_adminEmail" placeholder="Ваша пошта" />
    <div className={st.start_descr}>Тільки ви зможете розіграти Санту</div>
    <button type='submit' className={st.submit_btn}>Продовжити</button>
  </form >
  )
}

export default withRouter(CreateSanta)