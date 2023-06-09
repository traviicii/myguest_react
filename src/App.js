import React, { useContext } from 'react'
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import Home from './Views/Home';
import LogIn from './Views/LogIn';
import SignUp from './Views/SignUp';
import Clients from './Views/Clients';
import UserProfile from './Views/UserProfile';
import About from './Views/About';
import SingleClient from './Views/SingleClient';
import Formulas from './Views/Formulas';
import ClientColorChart from './Views/ClientColorChart';
import NewFormulaEntry from './Views/NewFormulaEntry';
import EditFormula from './Views/EditFormula';
import Message from './Components/Message';
import { GlobalContext } from './Context/GlobalContext';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_KEY = process.env.REACT_APP_API_KEY

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "client-keeper-a2e91.firebaseapp.com",
  projectId: "client-keeper-a2e91",
  storageBucket: "client-keeper-a2e91.appspot.com",
  messagingSenderId: "579985018341",
  appId: "1:579985018341:web:e7f40aec7416651e20330c",
  measurementId: "G-V0C2V1ZHLD",
  databaseURL: 'https://client-keeper-a2e91-default-rtdb.firebaseio.com/',
  storageBucket: 'gs://client-keeper-a2e91.appspot.com'
};

// Initialize Firebase
initializeApp(firebaseConfig);
getStorage(initializeApp(firebaseConfig))
// const analytics = getAnalytics(app);

export default function App() {

  const { messages, showMessages } = useContext(GlobalContext)

  // const showMessages = () => {
  //   return messages.map(({text, color}, index) => <Message key={index} text={text} color={color} index={index}/>)
  // }

  return (
      <div>
        <Navbar />
        { showMessages() }
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/clients' element={<Clients />}/>
          <Route path='/userprofile' element={<UserProfile />}/>
          <Route path='/settings' element={<About />}/>
          <Route path='/client/:client_id' element={<SingleClient />}/>
          <Route path='/client/:client_id/formulas' element={<Formulas />}/>
          <Route path='/client/:client_id/colorchart' element={<ClientColorChart />}/>
          <Route path='/client/:client_id/newformula' element={<NewFormulaEntry />} />
          <Route path='/client/:client_id/formula/:formula_id/editformula' element={<EditFormula />}/>
        </Routes>
        

      </div>
  )
}
