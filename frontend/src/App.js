// import logo from './logo.svg';
import React from 'react';
import {Route,Routes} from 'react-router-dom';
import QuestNav from './Components/Quest/QuestNAv/QuestNav';
import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<QuestNav/>}/>
         
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
