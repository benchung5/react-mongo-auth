import React from 'react';
import Sidebar from './sidebar'

export default () => {

        return (
                <div>
                        <Sidebar/>
                        <div className="col-md-10">
                        <h3 className="margin-bottom">Dashboard</h3>
                        This is the protected access area to your site.
                        If you're seeing this, you must have logged in or created an account!
                        </div>
                </div>
        );
}


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

// class Feature extends Component {
//   componentWillMount() {
//     this.props.fetchMessage();
//   }

//   render() {
//     return (
//       <div>{this.props.message}</div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return { message: state.auth.message };
// }

// export default connect(mapStateToProps, actions)(Feature);
