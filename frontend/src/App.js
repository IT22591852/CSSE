// import logo from './logo.svg';
import React from 'react';
import {Route,Routes} from 'react-router-dom';
import QuestHome from './Components/Quest/GuestHome/GuestHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<QuestHome/>}/>
         
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
