import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import "fomantic-ui-css/semantic.css";
import "izitoast/dist/css/izitoast.css";
import "draft-js/dist/Draft.css";
import "./app.css";

import NoMatch from "./NoMatch";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../user/components/Login";
import Register from "../user/components/Register";
import Profile from "../user/components/Profile";
import Dashboard from "../user/components/Dashboard";
import ItemAddPage from "../item/pages/ItemAddPage";
import ItemEditPage from "../item/pages/ItemEditPage";
import ItemList from "../item/containers/ItemListContainer";
import ItemDetailContainer from "../item/containers/ItemDetailContainer";
import CategoryAddPage from "../category/pages/CategoryAddPage";
import CategoryEditPage from "../category/pages/CategoryEditPage";
import CategoryListContainer from "../category/containers/CategoryListContainer";
import BrandAddPage from "../brand/pages/BrandAddPage";
import BrandEditPage from "../brand/pages/BrandEditPage";
import BrandListContainer from "../brand/containers/BrandListContainer";

import { getProfile } from "../user/user.actions";

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(getProfile())
    };
};

class App extends React.Component {
    constructor(props) {
        super();
        props.getProfile();
    }

    render() {
        return (
            <Switch>
                <PublicRoute path="/login" component={Login}/>
                <PublicRoute path="/register" component={Register}/>

                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile}/>
                <PrivateRoute exact path="/items" component={ItemList}/>
                <PrivateRoute exact path="/items/add" component={ItemAddPage}/>
                <PrivateRoute exact path="/items/:id" component={ItemDetailContainer}/>
                <PrivateRoute exact path="/items/:id/edit" component={ItemEditPage}/>

                <PrivateRoute exact path="/categories" component={CategoryListContainer}/>
                <PrivateRoute exact path="/categories/add" component={CategoryAddPage}/>
                <PrivateRoute exact path="/categories/:id/edit" component={CategoryEditPage}/>

                <PrivateRoute exact path="/brands" component={BrandListContainer}/>
                <PrivateRoute exact path="/brands/add" component={BrandAddPage}/>
                <PrivateRoute exact path="/brands/:id/edit" component={BrandEditPage}/>

                <Route component={NoMatch} />
            </Switch>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
