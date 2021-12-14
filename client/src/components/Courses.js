import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
    state = {
        loading: true,
        courses: []
    };

    // Load course data when component first mounts
    componentDidMount() {
        const { context } = this.props;
        context.actions.getCourses()
            .then(courses => {
                this.setState({
                    loading: false,
                    courses
                });
            }).catch(err => {
                console.log(`The data could not be fetched: ${err}`);
                this.props.history.push('/error');
            });
    };

    render() {

        // Show loading message if promise is still being processed
        // Dynamically create the course objects
        // Forward user to createCourse component to create new component
        return (
            <div className="wrap main--grid">
                { this.state.loading ? 
                    <h3>Loading...</h3> 
                    :
                    this.state.courses.map(course =>                         
                        <Link className="course--module course--link" to={`/courses/${course.id}`} key={`${course.id.toString()}`}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    )
                }

                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        );
    }
}
