import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from  "react-router-dom"
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Signup2 from './components/Signup2';
import Final from './components/Final';
import Main from './components/Main';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup2" element={<Signup2/>}/>
        <Route path="/signup3" element={<Final/>}/>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
