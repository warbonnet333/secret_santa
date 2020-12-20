import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import st from "./Header.module.css"
import back_arr from "../../images/back_arr.svg"

class Header extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }
  render() {
    const { pathname } = this.props.location
    return <header>
      {pathname !== '/' && <Link to="/" className={st.back_link}><img src={back_arr} alt="Назад" /></Link>}
      <Link to="/" className={st.logo}>Secret Santa</Link>
      <button className={st.ask_btn}>?</button>
    </header>
  }
}

export default withRouter(Header)