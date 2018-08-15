import { connect } from 'react-redux';
import Authorization from './authorization';
import { CreateUserRequest, LoginUserRequest } from './actions';

const mapStateToProps = state => ({
  success: state.AuthorizationReducer.success,
});
const mapDispatchToProps = dispatch => ({
  Login: (email, password) => dispatch(LoginUserRequest(email, password)),
  Create: (username, email, password) => dispatch(CreateUserRequest(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);