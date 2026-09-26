import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import ViewCase from './ViewCase'
import CreateCase from './CreateCase'
import UpdateCaseStatus from './UpdateCaseStatus'
import ViewCaseDetails from './ViewCaseDetails'
import 'bootstrap/dist/css/bootstrap.css' 
function App() {
  
return(

  <BrowserRouter>
  
  <Routes>
    <Route path='/' element={<ViewCase/>}></Route>
    <Route path='/create' element={<CreateCase/>}></Route>
    <Route path='/update/:id' element={<UpdateCaseStatus/>}></Route>
    <Route path='/detail/:id' element={<ViewCaseDetails/>}></Route>

  </Routes>
  </BrowserRouter>
)
 
}

export default App
