import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilValue, useRecoilState} from 'recoil'
import { notifications, totalNotificationSelector } from './atoms'
import axios from 'axios'
import './App.css'

function App() {

  

  return (
    <RecoilRoot>
      <MainApp />

    </RecoilRoot>
  )
}

function MainApp() {

  const [networkCount, setNetworkCount] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector)

  return (
    <>
      <button>Home</button>

      <button>My Network({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs({networkCount.jobs})</button>
      <button>Mesaging({networkCount.messaging})</button>
      <button>Notifications({networkCount.notifications})</button>

      <button>Me({totalNotificationCount})</button>
    </>
  )




}


export default App
