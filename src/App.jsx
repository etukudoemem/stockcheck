import { Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Layout } from './pages/Layout'
import { WatchList } from './pages/WatchList'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { StockDetails } from './pages/StockDetails'
import { AuthLayout } from './pages/AuthLayout'


function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Home />}/>
              <Route path='watchlist/stockdetails/:symbol' element={<StockDetails />}/>
              <Route path='watchlist' element={<WatchList />}/>
          </Route>
          <Route path='login' element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path='signup' element={<Signup />}/>
          </Route>
          
      </Routes>    
    </>
  )
}

export default App
