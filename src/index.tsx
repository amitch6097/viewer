import React from 'react';
import ReactDOM from 'react-dom';

import './styles.less';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home/';
import { Create } from './pages/Create';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Business } from './pages/Business';

function App() {
    return (
        <Router>
            <AppBar />
            <div className="bb-page">
                <Route exact path="/create" component={Create} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/" component={Home} />
                <Route path="/business/:id" component={Business} />
            </div>
            <Footer title={'Title'} description={'description'} />
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
