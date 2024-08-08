import logo from './logo.svg';
import './App.css';
import ImageCard from './COMPONENTS/HOME/ImageCard';
import Header from './COMPONENTS/HOME/Header';
import Body from './COMPONENTS/HOME/Body';
import Login from './COMPONENTS/USER/Login';
import Signup from './COMPONENTS/USER/SignUp';
import AdminAdd from './COMPONENTS/ADMIN/AdminAddItems';
import AdminItem from './COMPONENTS/ADMIN/AdminItem';
import { AnimatePresence, motion } from 'framer-motion';



import Cart from './COMPONENTS/HOME/CART/CartBody';
import { useSelector } from 'react-redux';
import { GiThreeLeaves } from 'react-icons/gi';
import Loading from './COMPONENTS/Utils/Loading';
import { Route, Routes } from 'react-router';

function App() {
  let { showCart } = useSelector(state => state.cartReducer)
  return (
    <div className="App">
      <AnimatePresence>

      //  <AdminAdd />

        <Header />

        {showCart && <Cart />}
        <Routes>
          <Route path='/' element={<Body />} />
          <Route path='login' element={<Login />} />
          <Route path='/signUp' element={<Signup />} />


        </Routes>
      </AnimatePresence></div>
  );
}

export default App;
