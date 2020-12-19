import React from 'react';
import st from './PlayersList.module.css'
import delete_btn from "../../images/delete.svg"


const PlayersList = ({ array, admin, onDelete }) => <ul className={st.team_list}>{array.map((item) =>
  <li key={`${item._id}`}>{item.name}
    {item.email !== admin && <button className={st.delete_btn} onClick={() => onDelete(item._id)}>
      <img src={delete_btn} alt="Видалити" />
    </button>}
  </li>)}
</ul>

export default PlayersList