import logo from './logo.svg';
import './App.css';
import ImageCard from './COMPONENTS/HOME/ImageCard';
import Header from './COMPONENTS/HOME/Header';
import Body from './COMPONENTS/HOME/Body';
import Login from './COMPONENTS/USER/Login';
import Signup from './COMPONENTS/USER/SignUp';

function App() {
  return (
    <div className="App">
      <Header />
      <Signup />
      <Login />
      <Body />
    </div>
  );
}

export default App;
