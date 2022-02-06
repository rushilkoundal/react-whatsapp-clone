import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './component/Chat';
import Login from './component/Login';
import Sidebar from './component/Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>) : (
        <div className="app-body">
          <Router>
            <Sidebar />
            <Routes>
              <Route exact path="/room/:roomId" element={<Chat />}></Route>
              {/* <Route exact path='/' element={<Chat />}></Route> */}
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
