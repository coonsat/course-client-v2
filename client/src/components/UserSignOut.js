
const UserSignOut = ( props ) => {
    // get context from the props and remove authenticated user
    const { context, history } = props;
    context.actions.signOut();

    // redirect user to courses page
    history.push('/');

    // the component expects something to be returned. 
    // Doesn't matter if this is null
    return(null);
}

export default UserSignOut;
