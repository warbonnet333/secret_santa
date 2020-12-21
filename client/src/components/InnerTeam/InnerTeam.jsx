import React, { Component } from 'react';
import PlayersList from '../PlayersList/PlayersList'
import InnerInfo from '../InnerInfo/InnerInfo'
import AddPlayer from '../AddPlayer/AddPlayer'
import PlayGame from '../PlayGame/PlayGame'
import FindName from '../FindName/FindName'
import st from './InnerTeam.module.css'
import { notifier } from '../../helpers/notify'
const axios = require('axios');

export default class InnerTeam extends Component {
  state = {
    players: [],
    isPlayed: false,
    name: '',
    limit: '',
    admin: '',
    id: ''
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchTeam(id)
  }


  fetchTeam = async (id) => {
    try {
      const response = await axios.get(`/santas/${id}`)

      const { isPlayed, limit, name, players, _id, admin } = response.data.neededTeam
      this.setState({ isPlayed, limit, name, players, id: _id, admin })

    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  shoudUpdate = () => {
    const { id } = this.props.match.params;
    this.fetchTeam(id)
  }

  onDelete = async (idToDelete) => {
    const { id, isPlayed } = this.state
    if (isPlayed) {
      return
    }
    try {
      const response = await axios.put(`/santas/delete/${id}`, { idToDelete })

      const { players } = response.data.team
      this.setState({ players })
    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  playSnata = async () => {
    const { id } = this.state
    try {
      const response = await axios.put(`/santas/playgame/${id}`)
      console.log(response.data)
      notifier(response.data.message)
      this.setState({ isPlayed: true })
    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  render() {
    const { players, name, limit, admin, isPlayed } = this.state
    const { id } = this.props.match.params;
    return (
      <div className={st.container}>
        <InnerInfo name={name} limit={limit} mount={players.length} />
        {isPlayed && <FindName id={id} players={players} />}
        {!isPlayed && <div className={st.ready_text}>Вже готові зіграти:</div>}
        <PlayersList array={players} admin={admin} onDelete={this.onDelete} />
        {!isPlayed && <AddPlayer shoudUpdate={this.shoudUpdate} id={id} players={players} />}

        {players.length > 2 && !isPlayed && <PlayGame admin={admin} playSnata={this.playSnata} />}
      </div>
    )
  }
}