import React, { useMemo, useState } from 'react';
import PlayersList from '../PlayersList/PlayersList'
import InnerInfo from '../InnerInfo/InnerInfo'
import AddPlayer from '../AddPlayer/AddPlayer'
import PlayGame from '../PlayGame/PlayGame'
import FindName from '../FindName/FindName'
import st from './InnerTeam.module.css'
import { notifier } from '../../helpers/notify'
const axios = require('axios');

const InnerTeam = (props) => {
  const initialState = {
    players: [],
    isPlayed: false,
    name: '',
    limit: '',
    admin: '',
    id: ''
  }

  const [state, setState] = useState(initialState)

  const fetchTeam = async (id) => {
    try {
      const response = await axios.get(`/santas/${id}`)
      const { isPlayed, limit, name, players, _id, admin } = response.data.neededTeam
      setState((prev) => { return { ...prev, isPlayed, limit, name, players, id: _id, admin } })

    } catch (error) {
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  const newId = props.match.params.id;
  useMemo(() => {
    fetchTeam(newId)
  }, [newId])

  const shoudUpdate = () => {
    fetchTeam(newId)
  }


  const onDelete = async (idToDelete) => {
    const { id, isPlayed } = state
    if (isPlayed) {
      return
    }
    try {
      const response = await axios.put(`/santas/delete/${id}`, { idToDelete })

      const { players } = response.data.team
      setState((prev) => { return { ...prev, players } })
    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  const playSnata = async () => {
    const { id } = state
    try {
      const response = await axios.put(`/santas/playgame/${id}`)
      notifier(response.data.message)
      setState(prev => { return { ...prev, isPlayed: true } })
    } catch (error) {
      console.log(error)
      notifier('Щось пішло не так, перевірте дані та спробуйте ще раз')
    }
  }

  const { players, name, limit, admin, isPlayed } = state
  return (
    <div className={st.container}>
      <InnerInfo name={name} limit={limit} mount={players.length} />
      {isPlayed && <FindName id={newId} players={players} />}
      {!isPlayed && <div className={st.ready_text}>Вже готові зіграти:</div>}
      <PlayersList array={players} admin={admin} onDelete={onDelete} />
      {!isPlayed && <AddPlayer shoudUpdate={shoudUpdate} id={newId} players={players} />}

      {players.length > 2 && !isPlayed && <PlayGame admin={admin} playSnata={playSnata} />}
    </div>
  )
}

export default InnerTeam