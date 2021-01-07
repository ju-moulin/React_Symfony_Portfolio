import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import Users from './Users';
import Posts from './Posts';
import {Navbar} from "react-bootstrap";

class Home extends Component {

    render() {
        return (
            <div>
                <nav className="navbar noselect navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className={"navbar-brand"} to={"/"}> Julien MOULIN </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className={"nav-link active"} to={"/"}> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/posts"}> Posts </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Redirect exact from="/" to="/users" />
                    <Route path="/users" component={Users} />
                    <Route path="/posts" component={Posts} />
                </Switch>
            </div>
        )
    }
}

export default Home;