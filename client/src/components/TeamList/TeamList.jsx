import React from "react"
import { Link } from 'react-router-dom';
import st from "./TeamList.module.css"

const TeamList = ({ array }) => <ul className={st.team_list}>{array.map((item) => <li key={item._id}><Link className={st.team_list_link} to={`/inner/${item._id}`}>{item.id} {item.name}</Link></li>)}</ul >

export default TeamList