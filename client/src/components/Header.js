import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
    // retrieve authUser from higher order component
    const authUser = context.authenticatedUser;

    return (
        <header>      
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
                <nav>
                    <ul className="header--signedout">
                        {authUser ?
                            // Show user name and sign out button if user already signed in
                            <ul className="header--signedin">
                                <Fragment>
                                        <li>Welcome {authUser.firstName} {authUser.lastName}</li>
                                        <li><Link to='/signout'>Sign Out</Link></li>
                                </Fragment>
                            </ul>
                            :
                            // Show sign up and sign in button if user has yet to sign in
                            <ul className="header--signedout">
                            <Fragment>
                                <li><Link to='/signup'>Sign Up</Link></li>
                                <li><Link to='/signin'>Sign In</Link></li>
                            </Fragment>
                            </ul>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
