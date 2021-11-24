import React, { useState } from 'react'
import st from "./PlayGame.module.css"
import { notifier } from '../../helpers/notify'

const PlayGame = ({ admin, playSnata }) => {

  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState('');

  const openEmailFunc = () => {
    console.log('openEmailFunc');
    setOpenEmail(true)
  };

  const submitSanta = () => {
    console.log(admin);
    console.log(email);
    if (email === admin) {
      playSnata()
    } else {
      notifier("Розіграти санту може тільки той, хто створив команду", true)
    }
  }

  const onHandlerChande = (e) => {
    setEmail(e.target.value);
  }

  return <div className={st.container}>
    {!openEmail && <button className={st.playGame} onClick={openEmailFunc}>Розіграти Санту</button>}
    {openEmail && <form className={st.container}>
      <div className={st.email_form_input_descr}>Введіть Вашу пошту, розіграти Санту</div>
      <input className={st.email_form_small_input} onChange={(e) => onHandlerChande(e)} required id="email_play" name="email" type="email" placeholder="Ваша пошта" value={email} />
    </form>}
    {openEmail && <button className={st.playGame} onClick={submitSanta}>Продовжити</button>}
  </div>
}

export default PlayGame
