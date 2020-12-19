import React, { Component } from 'react'
import st from "./PlayGame.module.css"

export default class PlayGame extends Component {
  state = {
    email: '',
    openEmail: false
  }

  openEmail = () => {
    this.setState({ openEmail: true })
  }

  submitSanta = () => {
    const stateEmail = this.state.email
    const { admin, playSnata } = this.props
    if (stateEmail === admin) {
      console.log('run')
      playSnata()
    } else {

    }
  }

  onHandlerChande = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, openEmail } = this.state;
    return <div className={st.container}>
      {!openEmail && <button className={st.playGame} onClick={this.openEmail}>Розіграти Санту</button>}
      {openEmail && <form className={st.container}>
        <div className={st.email_form_input_descr}>Введіть Вашу пошту, розіграти Санту</div>
        <input className={st.email_form_small_input} onChange={this.onHandlerChande} required id="email_play" name="email" type="email" placeholder="Ваша пошта" value={email} />
      </form>}
      {openEmail && <button className={st.playGame} onClick={this.submitSanta}>Продовжити</button>}
    </div>
  }
}
