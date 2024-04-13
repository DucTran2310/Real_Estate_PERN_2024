import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from '@pages/public'
import path from '@utils/path'
import { Routes, Route } from 'react-router-dom'
import { Modal } from './components'
import { useAppStore } from '@store/useAppStore'

function App() {

  const {isShowModal, contentModal} = useAppStore()

  console.log('isShowModal, contentModal', isShowModal, contentModal)

  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUR_AGENTS} element={<OurAgents />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
