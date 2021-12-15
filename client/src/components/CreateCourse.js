import React, { Component } from 'react';
import Form from './Form';

// When creating a course, instantiate the state so that userId and author
// are taken from the current user
export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: this.props.context.authenticatedUser.id,
        author: `${this.props.context.authenticatedUser.firstName} ${this.props.context.authenticatedUser.lastName}`,
        errors: []
    };

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return (
            <div className="wrap">
                <h2>Create Course</h2>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                      <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="title" name="courseTitle" type="text" value={title} onChange={this.change} placeholder='Title' />

                                <p>By {this.state.author}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="description" name="courseDescription" value={description} onChange={this.change} placeholder='Description'></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={this.change} placeholder='Estimated Time'/>

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={this.change} placeholder="Materials needed"></textarea>
                            </div>
                        </div>
                      </React.Fragment>
                  )}
                  >
                </Form>
            </div>
        )
    }

    // Listen to form elements and update state accordingly
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
        // Get context and destructure the component's state
        const { context} = this.props;
        const { title, description, estimatedTime, materialsNeeded, userId, author} = this.state;
        const newCourse = {title, description, estimatedTime, materialsNeeded, userId, author};

        // Create course and get the id assigned to it
        // This route returns a location url. We can use this 
        // to redirect the user to the detail page as opposed to have to 
        // making another API call to match the specific course
        context.actions.createCourse( newCourse, context.authenticatedUser )
            .then(response => {
                if (response.Location) {
                    console.log(`Course ${title} created successfully`);
                    this.props.history.push(response.Location);
                } else {
                    this.setState({
                        errors: response
                    })
                }
             })
            .catch(err => {
                console.log(`There was an error: ${err}`);
            });
    };

    cancel = () => {
        this.props.history.push('/');
    }
}
