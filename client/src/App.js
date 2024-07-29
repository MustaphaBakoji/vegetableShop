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
import UpBotton from './COMPONENTS/HOME/UpBotton';

import Cart from './COMPONENTS/HOME/CART/CartBody';
import { useSelector } from 'react-redux';

function App() {
  let { showCart } = useSelector(state => state.cartReducer)
  return (
    <AnimatePresence>  <div className="App">

      <UpBotton></UpBotton>
      <Header />
      {showCart && <Cart />}
      <AdminItem />
      <AdminItem />
      <AdminItem />
      <AdminItem /> <AdminItem />
      <AdminItem />
      <AdminAdd />
      <Signup />
      <Login />
      <Body />
    </div></AnimatePresence>
  );
}

export default App;
