import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import User from './components/User';
import './App.css';
import Add from './components/Add';
import Read from './components/Read';
import Update from './components/Update';
import Selectdd from './components/up1';
import Read1 from './components/read1';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/read/:id" element={<Read/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/up1" element={<Selectdd/>}/>
        <Route path="/read1/:id" element={<Read1/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
