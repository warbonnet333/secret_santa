import React from "react"
import st from "./InnerInfo.module.css"
import dance from "../../images/tenor.gif"

const InnerInfo = ({ name, limit, mount }) => <div className={st.inner_info}>
  <div className={st.info_item}>
    {/* <div className={st.info_descr}>Назва команди</div> */}
    <div className={st.info_title}>{name}</div>
  </div>
  <div className={st.info_item}>
    <div className={st.info_descr}>Грошовий ліміт подарунків:</div>
    <div className={st.info_text}>{limit}</div>
  </div>
  <div className={st.info_item}>
    <div className={st.info_descr}>Кількість гравців:</div>
    <div className={st.info_text}>{mount}</div>
  </div>
  <img className={st.dance} src={dance} alt=""/>
</div>
export default InnerInfo