import React, { Component } from 'react';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: []
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div class="form--centered">
                <h2>Sign Up</h2>
                
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign Up"
                  elements={() => (
                      <React.Fragment>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={this.change}
                                placeholder="First name" />
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={this.change}
                                placeholder="Last name" />
                          <input
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                value={emailAddress}
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
                >
                    <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </Form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        );
    }

    change = ( event ) => {
        const name = event.target.id;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            }
        })
    };

    submit = () => {
        const { context } = this.props;
        const { firstName, lastName, emailAddress, password } = this.state;
        context.actions.signUp( {firstName, lastName, emailAddress, password} )
            .then(res => {
                if ( res !== null ) {
                    this.setState(() => {
                        return { errors : res };
                    });
                } else {
                    console.log(`SUCCESS! ${emailAddress} was successfully signed up`);
                    context.actions.signIn(emailAddress, password);
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.log(`There was an error: ${err}`);
            });
    }

    cancel = () => {
        this.props.history.push('/');
    };

}

