import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        email: '',
        password: '',
        errors: []
    };

    render() {
        const {
            email,
            password,
            errors 
        } = this.state;

        return (
            <div className="form--centered">
                <h2>Sign in</h2>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign In"
                  elements={() => (
                      <React.Fragment>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={this.change}
                            placeholder="Email" />
                          <input 
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.change}
                            placeholder="Password" />
                      </React.Fragment>
                  )}
                />
                <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                </p>

            </div>

        );
    }

    // Listen to changes made to form
    change = ( event ) => {
        const name = event.target.id;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    };


    submit = () => {
        const { context } = this.props;
        const { email, password } = this.state;

        // The previous location will be called if the user is 
        // attempted to access a protected link without having logged in 
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        context.actions.signIn( email, password )
            .then(user => {
                if ( user === null ) {
                    this.setState(() => {
                        return { errors : [ 'Sign-in was unsuccessful' ]};
                    });
                } else {
                    this.props.history.push(from.pathname);
                    console.log(`SUCCESS! ${email} is now signed in`);
                }
            }).catch(err => {
                console.log(`There was an error: ${err}`);
                this.props.history.push('/error');
            });
    }

    // Redirect user to home page if the sign in is cancelled
    cancel = () => {
        this.props.history.push('/');
    };
}
