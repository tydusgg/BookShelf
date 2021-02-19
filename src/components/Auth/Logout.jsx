import React, {Fragment} from 'react';
import {LogoutUser} from '../../actions/auth';
import {useHistory, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Logout = ({LogoutUser, auth: {isAuth}}) => {
    console.log(isAuth)
    const history = useHistory();

    const onLogout = e => {
        e.preventDefault();
        LogoutUser(history);
    }
    return (
        <Fragment>
            {isAuth && 
                <div>
                    <div>Are you sure you want to logout?</div>
                    <button onClick={e => onLogout(e)} >Yes</button>
                    <button onClick={e => console.log('back')} >Go back</button>
                </div>
            }
            {!isAuth && 
                <Redirect to='/' />
            }

        </Fragment>

    )
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {LogoutUser})(Logout)
