import './App.css';
import Navbar from './components/navbar';
import SignupPage from './components/signup_page';
import HomePage from "./components/home_page"
import LoginPage from './components/login_page';
import {Route, Routes,BrowserRouter as  Router} from "react-router-dom"

function App() {


  return (
  <Router>
      <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/login_page" element={<LoginPage />}></Route>
        <Route path="/signup_page" element={<SignupPage />}></Route>
      </Routes>
      </>
    </Router>
  


  );
}

export default App;
