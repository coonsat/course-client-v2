import * as apiBaseURL from '../config/address';

export default class apiHeler {
    /* Parameters for api method
        1. path (STRING)
        2. Method (STRING)
        3. Body (OBJECT)
        4. requiresAuth (BOOLEAN)
        5. credentials (OBJECT - User)    
    */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = apiBaseURL.BASEURL + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser( emailAddress, password ) {

        const response = await this.api(`/users`, `GET`, null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    // Create a user via the sign up page
    async createUser(user) {
        const response = await this.api('/users', 'POST', user, false, null);
        if (response.status === 201) {
            return null;
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            });
        } else {
            throw new Error();
        }
    }

    // Fetches all courses from database 
    async getCourses() {
        const response = await this.api('/courses', `GET`, null, false, null);
        if (response.status === 200) {
            return response.json(data => data);
        } else if (response.state === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // Fetches specific course according to course id
    async getCourse( id ) {
        const response = await this.api(`/courses/${id}`, 'GET', null, false, null);
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.state === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
    };

    async createCourse( newCourse, user ) {
        const response = await this.api('/courses', 'POST', newCourse, true, user);
        if (response.status === 201) {
            // set location on response header 
            // -> allows for redirect to new course detail page rather than back to the home page
            response.Location = response.headers.get('Location');
            return response;
        } else if (response.status === 400) {
            console.log('There was an error');
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw Error();
        }
    };

    async updateCourse( updatedCourse, user ) {
        const response = await this.api(`/courses/${updatedCourse.courseId}`, 'PUT', updatedCourse, true, user);
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw Error();
        }
    }

    async deleteCourse( courseId, user ) {
        const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, user);
        if (response.status === 204) {
            return [];
        } else if (response.status === 403) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw Error();
        }
    }

};

