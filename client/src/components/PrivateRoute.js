import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../context/Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {context => (
                <Route
                {...rest}
                // Check and see whether there is an authenticated user
                render={props => context.authenticatedUser ? 
                // If user is authenticated then render component passed through
                ( <Component {...props} /> )
                : 
                // If user not authenticated then redirect to sign in page
                ( <Redirect to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }} />
                )} />
            )}
      </Consumer>
    );
}

export default PrivateRoute
