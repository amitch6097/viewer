import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { BusinessContextProvider } from './context/BusinessContext';
import SearchContextProvider from './context/SearchContext';
import { Business } from './pages/Business';
import { Create } from './pages/Create';
import { CreateReview } from './pages/CreateReview';
import { Discover } from './pages/Discover';
import { Home } from './pages/Home/';
import { Login } from './pages/Login';
import { MyBusinesses } from './pages/MyBusinesses';
import { MyFavorites } from './pages/MyFavorites';
import { SignUp } from './pages/SignUp';
import { UpdateBusiness } from './pages/UpdateBusiness';
import { MyReviews } from './pages/MyReviews';
import { ClaimBusiness } from './pages/ClaimBusiness';
import './styles.less';
import { CreateBusinessFlag } from './pages/CreateBusinessFlag';
import { BusinessFlags } from './pages/BusinessFlags';

function App() {
    return (
        <HashRouter>
            <SearchContextProvider>
                <BusinessContextProvider>
                    <AppBar />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/business/:id" component={Business} />
                    <Route
                        exact
                        path="/business/:businessId/edit"
                        component={UpdateBusiness}
                    />
                    <Route
                        exact
                        path="/business/:businessId/claim"
                        component={ClaimBusiness}
                    />
                    <Route
                        exact
                        path="/business/:id/flags"
                        component={BusinessFlags}
                    />
                    <Route
                        exact
                        path="/business/:id/new-review"
                        component={CreateReview}
                    />
                    <Route
                        exact
                        path="/business/:id/new-flag"
                        component={CreateBusinessFlag}
                    />
                    <Route path="/discover" component={Discover} />
                    <Route
                        exact
                        path="/my-favorites/:favoriteGroupId"
                        component={MyFavorites}
                    />
                    <Route exact path="/my-favorites" component={MyFavorites} />
                    <Route
                        exact
                        path="/my-businesses"
                        component={MyBusinesses}
                    />
                    <Route exact path="/my-reviews" component={MyReviews} />
                    <Footer />
                </BusinessContextProvider>
            </SearchContextProvider>
        </HashRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
