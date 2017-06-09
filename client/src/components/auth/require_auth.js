import React, {Component} from 'react';
import {connect} from 'react-redux';
// import PropTypes from "prop-types";

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it
export default function (ComposedComponent) {
    class Authentication extends Component {
        //react blocks access to this.context by decault so we have to 
        //expost this static object telling react we want to use the router
        //object. (second value React.ProtoTypes.object is the type - 
        //boilerplate) 
        // static contextTypes = {
        //     router: PropTypes.object
        // }
        //if not authenticated at start, push to the home page
        componentWillMount() {
            if (!this.props.authenticated) {
                //this.context.router.push('/protected');
                this.props.history.push('/protected');
            }
        } 
        //this one fires when component is updated
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                //this.context.router.push('/protected');
                this.props.history.push('/protected');
            }
        }
        
        render() {
            //the this.props is for passing up new props from the combined component *instance to 
            //existing props on the original composed component below
            return <ComposedComponent {...this.props} />
        }
    }
    
    function mapStateToProps(state) {
        return {authenticated: state.auth.authenticated};
    }
    
    return connect(mapStateToProps)(Authentication);
}

////example usage of this HOC
// import Authenticatoin // this is the HOC
// import Resources // this is the component to wraps
// const ComposedComponent = Authentication(Resources);
//// in some render method...
// <ComposedComponent resources={resourceList}>
