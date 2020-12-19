import React from 'react'
import st from './Notify.module.css'
import { closeNotifier } from "../../helpers/notify"

const Notify = () => <div onClick={() => closeNotifier()} id="notify_cont" className={st.container}>
  <div id="notify_text" className={st.inner}></div>
</div>

export default Notify