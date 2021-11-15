import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import LandingPage from './components/LandingPage';
import MyBooks from './components/MyBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} exact />
        <Route path='/login' element={<LoginScreen />} exact />
        <Route path='/register' element={<RegisterScreen />} exact />
        <Route path='/mybooks' element={<MyBooks />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
