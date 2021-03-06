import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        rest.loggedIn
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

const mapStateToProps = (store: any) => {
    return {
        loggedIn: store.login.loggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute)