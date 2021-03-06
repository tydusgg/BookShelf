import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
    return(
        <div>
            <div>Oops... Something wen`t wrong! Go back?</div>
            <button></button>
        </div>

    )
}
  
  

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);