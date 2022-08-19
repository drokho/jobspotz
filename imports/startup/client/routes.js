import React from 'react';
import { BrowserRouter as Router, Routes, Route, browserHistory } from 'react-router-dom';

import { App } from '/imports/ui/App';
import { Hello } from '/imports/ui/Hello.jsx';
import { Register } from '/imports/ui/Register.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Routes>
        <Route exact path="/" element={ <App />} />
        <Route path="hello" element={<Hello />} />
        <Route path="register" element={<Register />} />
    </Routes>
  </Router> 
);