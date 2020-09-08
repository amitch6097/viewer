import React from 'react';
import ReactDOM from 'react-dom';

import './styles.less';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { HashRouter } from 'react-router-dom'

import { Home } from './pages/Home/';
import { Create } from './pages/Create';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Business } from './pages/Business';
import { Discover } from './pages/Discover';
import { CreateReview } from './pages/CreateReview';

import SearchContextProvider from './context/SearchContext';

function App() {
    return (
        <HashRouter>
            <SearchContextProvider>
                <AppBar />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/business/:id" component={Business} />
                    <Route exact path="/business/:id/new-review" component={CreateReview} />
                    <Route path="/discover" component={Discover} />
                <Footer />
            </SearchContextProvider>
        </HashRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
