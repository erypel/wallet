import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../redux/store/LoginStore';


const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        isLoggedIn()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute