import './App.css'
import Home from './components/Home'
import Login from './components/Login';
import Signin from './components/Signin'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import NoteState from './context/token/TokenState';
import UserState from './context/user/UserState';
import Username from './components/Username';
import AccountSetting from './components/AccountSetting';
function App() {
  return (
    <>

      <NoteState>
        <UserState>
          <Router>
            <div className={`bg-[#1B202D]  h-screen w-full`}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Signin" element={<Signin />} />
                <Route exact path="/username" element={<Username />} />
                <Route exact path="/accountsetting" element={<AccountSetting />} />
              </Routes>
            </div>
          </Router>
        </UserState>
      </NoteState>
    </>
  )
}

export default App
