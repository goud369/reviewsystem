import React from 'react';
import {Redirect,Route} from 'react-router-dom';

export const AuthenticateRoute = ({component:Component,...rest}) => (
    <Route {...rest}
        render={props=>
            sessionStorage.getItem('isAuthenticated')?
            (<Component {...props}/>):
            (<Redirect to={{pathname:'/', state:{from:props.location}}}/>)
                }/>
            );