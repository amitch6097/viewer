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
import { Discover } from './pages/Discover';

function App() {
    return (
        <Router>
            <AppBar />
            <div className="bb-page">
                <Route exact path="/create" component={Create} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/" component={Discover} />
                <Route path="/business/:id" component={Business} />
                <Route path="/discover" component={Discover} />
            </div>
            <Footer title={'Title'} description={'description'} />
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
