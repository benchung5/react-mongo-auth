import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import * as actions from '../../actions/users';

class UsersIndex extends Component {

	componentWillMount() {
		this.props.fetchUsers();
	}

	onDeleteUserClick(event) {
		let email = event.target.getAttribute("data-email");
		this.props.deleteUser({ email })
	}

	renderUsers() {
		return this.props.users.map((user) => {
			return (
				<li className="list-group-item" key={user.email}>
					<span>{user.email}</span>
					<a href="#" data-email={user.email} onClick={this.onDeleteUserClick.bind(this)}>Delete</a>
				</li>
			)
		});
	}

	render() {
			return (
				<div className="row">
					<Sidebar/>
					<div className="col-md-10">
						<h3>Users</h3>
						<ul className="list-group item-list">
							{this.renderUsers()}
						</ul>
					</div>
				</div>
			);
	}

}

function mapStateToProps(state) {
	return {
		users: state.users.all,
        //you may not need the below, but there for now
        userDeleted: state.user.userDeleted
	};
}

export default connect(mapStateToProps, actions)(UsersIndex);