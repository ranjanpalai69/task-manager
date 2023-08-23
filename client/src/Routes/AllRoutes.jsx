import { Routes,Route } from 'react-router-dom'
import Auth from '../pages/Auth'
import AllTasks from '../pages/AllTasks'
import PrivateRoute from './PrivateRoute'


const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/' element={<PrivateRoute><AllTasks/></PrivateRoute>}/>
      </Routes>
  )
}

export default AllRoutes