import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    state = {
        loading: true,
        course: null
    };

    // Obtain data from database by destructuring context and match from props
    // Get the authenticated user - this determines the conditional visibility 
    // of the two buttons according to the courses user id.
    componentDidMount() {
        const { context, match } = this.props;
        const id = match.params.id;
        context.actions.getCourse(id)
            .then(courseInfo => {
                if ( courseInfo ) {
                    this.setState({
                        loading: false,
                        course: courseInfo
                    });
                } else {
                    // Forward user to not found page if the course number doesn't exist
                    this.props.history.push('/notfound');
                }

            })
            .catch(err => {
                console.log(`An error occured: ${err}`);
                this.props.history.push('/error');
            })
    }

    render() {
        const { context } = this.props;

        return (
            <main>
                {this.state.loading ? 
                    <h3>Loading...</h3> : 
                    <>
                        <div className="actions--bar">
                            { context.authenticatedUser && 
                                context.authenticatedUser.id === this.state.course.User.id ?
                                    <React.Fragment>
                                        <Link className="button" to={`/courses/${this.state.course.id}/update`} >Update Course</Link>
                                        <Link className="button" to='' onClick={this.delete}>Delete Course</Link>
                                    </React.Fragment>
                                :
                                null
                            }
                                    <Link className="button button-secondary" to={'/'}>Return to List</Link>
                        </div>

                        
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{this.state.course.title}</h4>
                                    <p>{this.state.course.User.firstName} {this.state.course.User.lastName}</p>
                                    <ReactMarkdown>{this.state.course.description}</ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{this.state.course.estimatedTime}</p>
        
                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <ReactMarkdown>{this.state.course.materialsNeeded}</ReactMarkdown>
                                    </ul>
                                </div>
                            </div>
                    </form>
                    </>
                } 

            </main>
        )
    }

    // Delete course by sending the authenticated user object and course Id
    // Redirect user to home page
    delete = () => {
        const { context } = this.props; 
        context.actions.deleteCourse(this.state.course.id, context.authenticatedUser)
            .then( errorList => {
                if (errorList.length) {
                    console.log(`Deleting course ${this.state.course.id} was unsuccessful: ${errorList}`);
                    this.props.history.push('/error');
                } else {
                    console.log(`Course ${this.state.course.id} successfully deleted`);
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                this.props.history.push('/error');
            })
    };
}
