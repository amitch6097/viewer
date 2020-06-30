import React from 'react';
import ReactDOM from 'react-dom';

import './styles.less';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import { Home } from './pages/Home/';
import { Create } from './pages/Create';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

function App() {
    return (
        <Router>
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/" component={Home} />
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
