import React from 'react';
import {Link} from 'react-router-dom';

export default () => {

        return (
                <div className="col-md-2">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/articles-list">View Articles</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/article-add">Add Articles</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/users-list">View Users</Link>
                        </li>
                    </ul>
                </div>
        );
}