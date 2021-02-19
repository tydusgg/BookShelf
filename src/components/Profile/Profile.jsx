import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {GetCurrentUser, DeleteProfile} from '../../actions/profile';
import {useHistory, Redirect} from 'react-router-dom';
import {GetBooks} from '../../actions/books';

const Profile = ({GetCurrentUser, DeleteProfile,  auth: {id, isAuth}}) => {
    const history = useHistory();

    useEffect(() => {
        GetCurrentUser();
    }, [])

    const onDelete = e => {
        e.preventDefault();
        if(id) {
            DeleteProfile(id, history);
        }

    }
    
    return (
        <Fragment>
            {isAuth && (
            <div>
                <div>
                    <img src='' />
                    <div>Nikolay Borzunov</div>
                </div>
                <div>
                    <button>Edit</button>
                    <button onClick={e=> onDelete(e)}>Delete</button>
                </div>
                <div>
                    <h2>Stats</h2>
                    <div>
                        <div><span>3</span> Reading now</div>
                        <div><span>4</span> Red during all time</div>
                        <div><span>5</span> Incoming</div>
                    </div>
                    <div>
                        <div>You are better than 93% users!</div>
                    </div>
                </div>
            </div>
            )}
            {!isAuth && (
            <Redirect to='/login'></Redirect>
            )}
        </Fragment>
        
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {GetCurrentUser, DeleteProfile})(Profile)
