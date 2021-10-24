import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} /> {/* exact matching */}
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cart" component={Cart} />
                <Route component={NotFound} /> {/* default routing to 404 */}
            </Switch>
        </BrowserRouter>
    )
}

export default Router;