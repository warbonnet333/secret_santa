import React, { Component } from "react"
import st from "./CreateSanta.module.css"
import { withRouter } from "react-router";
const axios = require('axios');

class CreateSanta extends Component {
  state = {
    name: '',
    limit: '',
    players: [],
    adminName: '',
    adminEmail: '',
  }

  componentDidMount() {
    console.log(this.props)
  }

  onHandlerChande = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    const { name, limit, adminName, adminEmail } = this.state;

    const newTeam = { name, limit, admin: adminEmail }
    try {
      const response = await axios.post(`/santas`, newTeam)

      console.log(response.data.team)
      const { id } = response.data.team

      const responseAdmin = await axios.put(`/santas/${id}`, { name: adminName, email: adminEmail })

      const idToGo = responseAdmin.data.team.id

      this.props.history.push(`/inner/${idToGo}`)

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { name, limit, adminName, adminEmail } = this.state
    return (
      <form onSubmit={this.onSubmitForm} className={st.create_form}>
        <label htmlFor="santa_name">Назва санти</label>
        <input required onChange={this.onHandlerChande} value={name} type="text" name="name" id="santa_name" placeholder="Месники" />
        <label htmlFor="santa_limit">Грошовий ліміт подарунків</label>
        <input required onChange={this.onHandlerChande} value={limit} type="text" name="limit" id="santa_limit" placeholder="200 000 песо" />
        <label htmlFor="santa_adminName">Грошовий ліміт подарунків</label>
        <input required onChange={this.onHandlerChande} value={adminName} type="text" name="adminName" id="santa_adminName" placeholder="Ваше ім'я" />
        <label htmlFor="santa_adminEmail">Грошовий ліміт подарунків</label>
        <input required onChange={this.onHandlerChande} value={adminEmail} type="text" name="adminEmail" id="santa_adminEmail" placeholder="Ваша пошта" />
        <div className={st.start_descr}>Тільки ви зможете розіграти Санту</div>
        <input className={st.submit_btn} type="submit" value="Продовжити" />
      </form>
    )
  }
}

export default withRouter(CreateSanta)