import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import st from "./App.module.css"
import Header from "./components/Header/Header"
import MainPage from "./components/MainPage/MainPage"
import InnerTeam from "./components/InnerTeam/InnerTeam"
import Notify from "./components/Notify/Notify"

// const Header = lazy(() => import('./components/Header/Header' /* webpackChunkName: "home" */))
// const TeamList = lazy(() => import('./components/TeamList/TeamList' /* webpackChunkName: "home" */))

const App = () =>
  <div className={st.container}>
    <Header />
    <Notify />
    {/* <Suspense fallback={<p>Loading...</p>}> */}
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/team/:id" component={InnerTeam} />
      <Redirect to="/" />
    </Switch>
    {/* </Suspense> */}
  </div>


export default App;
