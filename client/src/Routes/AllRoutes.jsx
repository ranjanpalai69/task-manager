import { Routes,Route } from 'react-router-dom'
import AllTasks from '../pages/AllTasks'
import PrivateRoute from './PrivateRoute'
import Register from '../pages/Register'
import Login from '../pages/Login'


const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<PrivateRoute><AllTasks/></PrivateRoute>}/>
      </Routes>
  )
}

export default AllRoutes