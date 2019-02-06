import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.css';
import 'toastr/build/toastr.css';
import 'draft-js/dist/Draft.css';
import './app.css';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../user/pages/Login';
// import Register from '../user/pages/Register';
// import ProfileContainer from '../user/containers/ProfileContainer';
import ItemList from '../item/containers/ItemListContainer';
import ItemDetail from '../item/containers/ItemDetailsContainer';
import ItemAddPage from '../item/pages/ItemAddPage';
import ItemEditPage from '../item/pages/ItemEditPage';
import ItemImagePage from '../item/pages/ItemImagePage';
import Dashboard from '../user/containers/DashboardContainer';
import CategoryListContainer from '../category/containers/CategoryListContainer';
import { loadProfile } from '../user/auth.actions';

import NoMatch from '../components/NoMatch';


const mapDispatchToProps = (dispatch) => {
    return {
        loadProfile: () => dispatch(loadProfile())
    };
};

class App extends React.Component {
    componentDidMount() {
        this.props.loadProfile();
    }

    render() {
        return (
            <Switch>
                <PublicRoute path="/login" component={Login}/>
                {/* <PublicRoute path="/register" component={Register}/> */}

                <PrivateRoute exact path="/" component={Dashboard} />
                {/* <PrivateRoute exact path="/profile" component={ProfileContainer}/> */}
                <PrivateRoute exact path="/items" component={ItemList}/>
                <PrivateRoute exact path="/items/add" component={ItemAddPage}/>
                <PrivateRoute exact path="/items/:id" component={ItemDetail}/>
                <PrivateRoute exact path="/items/:id/edit" component={ItemEditPage}/>
                <PrivateRoute exact path="/items/:id/images" component={ItemImagePage}/>

                <PrivateRoute exact path="/categories" component={CategoryListContainer}/>
                {/* <PrivateRoute exact path="/categories/add" component={CategoryAddPage}/>
                <PrivateRoute exact path="/categories/:id/edit" component={CategoryEditPage}/>

                <PrivateRoute exact path="/brands" component={BrandListPage}/>
                <PrivateRoute exact path="/brands/add" component={BrandAddPage}/>
                <PrivateRoute exact path="/brands/:id/edit" component={BrandEditPage}/> */}

                <Route component={NoMatch} />
            </Switch>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
