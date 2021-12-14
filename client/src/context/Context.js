import React, { Component } from 'react';
import Cookies from 'js-cookie';
import ApiHelper from '../helper/apiHelper';

const Context = React.createContext();

export class Provider extends Component {

    // retrieve cookies if user still has a valid sessions
    // import apiHelper to carry out the API heavy lifting
    constructor() {
        super();
        this.cookie = Cookies.get('authenticatedUser');
        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
        };
        this.apiHelper = new ApiHelper()
    }

    state = {
        authenticatedUser: null
    }

    render() {
        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            apiHelper: this.apiHelper,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                signUp: this.signUp,
                getCourses: this.getCourses,
                getCourse: this.getCourse,
                createCourse: this.createCourse,
                updateCourse: this.updateCourse,
                deleteCourse: this.deleteCourse
            }
        }
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async (email, password) => {
        const user = await this.apiHelper.getUser(email, password);
        if (user !== null) {
            user.password = password;
            this.setState( () => {
                return {
                    authenticatedUser: user,
                };
            });
            // Set cookies and set the expiry for 1 day
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires : 1 });
        }
        return user;
    };

    signOut = () => {
        this.setState( () => {
            return {
                authenticatedUser: null
            }
        });
        Cookies.remove('authenticatedUser');
        return null;
    };

    signUp = async ( user ) => {
        return await this.apiHelper.createUser( user );
    };

    getCourses = async () => {
        return await this.apiHelper.getCourses();
    };

    getCourse = async ( id ) => {
        return await this.apiHelper.getCourse(id);
    };

    createCourse = async ( newCourse, user ) => {
        return await this.apiHelper.createCourse(newCourse, user);
    };

    updateCourse = async ( updatedCourse, user ) => {
        return await this.apiHelper.updateCourse(updatedCourse, user);
    };

    deleteCourse = async ( courseId, user ) => {
        return await this.apiHelper.deleteCourse(courseId, user);
    }

};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
// Documentation taken from Treehouse example (I couldn't come up with a better way to succinctly describe it)

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    };
};