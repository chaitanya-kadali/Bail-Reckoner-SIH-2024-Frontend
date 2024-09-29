import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from "./components/Login.jsx";
import Doctorsignup from './components/Doctorsignup.jsx';
import Home from './components/Home.jsx';
import Startupsignup from './components/Startupsignup.jsx';
import Farmersignup from './components/Farmersignup.jsx';
import Hometwo from './components/Hometwo.jsx';
import Startupdashboard from './components/Dashboard comps/Startupdashboard.jsx';
import Authoritydash from './components/Dashboard comps/Authoritydash.jsx';
import Doctordash from './components/Dashboard comps/Doctordash.jsx';
import Farmerdash from './components/Dashboard comps/Farmerdash.jsx';
import AiChatBot from './components/AiChatBot.jsx';
import Authoritysignup from './components/Authoritysignup.jsx'
import Druginsignup from './components/Druginsignup.jsx';
import Drugindash from './components/Dashboard comps/Drugindash.jsx';
function App() {
    return (
     <>
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/hometwo' element={<Hometwo/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signupstartup' element={<Startupsignup/>}/>
    <Route path='/signupauthority' element={<Authoritysignup/>}/>
    <Route path='/signupdrug' element={<Druginsignup/>}/>
    <Route path='/signupdoctor' element={<Doctorsignup/>}/>
    <Route path='/signupfarmer' element={<Farmersignup/>}/>
    <Route path='/startupdash' element={<Startupdashboard/>}/>
    <Route path='/authoritydash' element={<Authoritydash/>}/>
    <Route path='/druginspectordash' element={<Drugindash/>}/>
    <Route path='/doctordash' element={<Doctordash/>}/>
    <Route path='/farmerdash' element={<Farmerdash/>}/>
    <Route path='/chatbot' element={<AiChatBot/>}/>
   </Routes>

   </BrowserRouter>  

</>
    );
}

export default App;