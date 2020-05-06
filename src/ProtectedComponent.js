import {
 
	Route,
	Redirect
  } from "react-router-dom";
import React from 'react';
import {isAuthenticated} from './AuthenticationService' ;

export  const  ProtectedComponent = ({ component: Component, ...rest })=>(
    <Route {...rest}             render={(props) => {
        const currentUser = isAuthenticated();
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
  
   