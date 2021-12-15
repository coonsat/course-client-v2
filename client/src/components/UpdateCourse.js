import React, { Component } from 'react';
import Form from './Form';

// Set the course Id in state from the match object
export default class UpdateCourse extends Component {
    state = {
        courseId: this.props.match.params.id,
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        author: '',
        errors: []
    };

    // Get the authenticated user currently signed in
    // This is a private component so it will only avialble to those that subscribe to it
    componentDidMount() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        context.actions.getCourse(this.state.courseId)
            .then(course => {
                if (course) {
                    if (course.User.id === authUser.id) {
                        this.setState({
                            title: course.title,
                            description: course.description,
                            estimatedTime: course.estimatedTime,
                            materialsNeeded: course.materialsNeeded,
                            author: course.User.firstName + ' ' + course.User.lastName
                        });
                    } else {
                        // Forward user to fobidden page if they don't own the course
                        this.props.history.push('/forbidden');
                    }
                } else {
                    // Forward the user to the not found if the search course cannot be found
                    this.props.history.push('/notfound');
                }
            })
            .catch(err => {
                this.props.history.push('/error');
            });
    }

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
                <h2>Update Course</h2>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Update Course"
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
        );
    };

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

        // destructure the state of this component to get access to the authenticated user
        const { courseId, title, description, estimatedTime, materialsNeeded } = this.state;
        const authUser = context.authenticatedUser;
        const updatedCourse = { courseId, title, description, estimatedTime, materialsNeeded, userId: authUser.id };

        // Pass over the course details and the authenticated user as parameters
        context.actions.updateCourse( updatedCourse, authUser )
            .then(errorList => {
                if (errorList.length) {
                    // Get 400 errors and display them
                    this.setState({
                        errors: errorList
                    })
                } else {
                    // If update successful then redirect back to course detail page
                    console.log(`${title} successfully updated`);
                    this.props.history.push(`/courses/${courseId}`);
                }
            })
            .catch(err => {
                this.setState({
                    errors: err
                });
            });
    };

    // Upon cancelling of edit mode, redirect user to course detail page
    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }
}
