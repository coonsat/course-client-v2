import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';

// A higher order component that subscribes a component to the context 
import withContext from './context/Context';

// Private route for automatic directs 
import PrivateRoute from './components/PrivateRoute';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseUpdateWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut)

export default () => {

  return (
    <BrowserRouter>
          <HeaderWithContext />
          <Switch>
            {/* Private routes accessible only for authenticated users */}
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={CourseUpdateWithContext} />

            <Route exact path="/" component={CoursesWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <Route exact path="/signin" component={UserSignInWithContext} />
            <Route exact path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/error" component={UnhandledError} />
            <Route exact path="/notfound" component={NotFound} />
            <Route component={NotFound} />

          </Switch>
    </BrowserRouter>

  );
};
