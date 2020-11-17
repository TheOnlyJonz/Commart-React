import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/addComp";
import Tutorial from "./components/tutorialComp";
import TutorialsList from "./components/tutuorialList";

import Sidebar from "react-sidebar";
// const mql = window.matchMedia(`(min-width: 800px)`);


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // sidebarDocked: mql.matches,
            sidebarOpen: false
        };

        // this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    // componentWillMount() {
    //     mql.addListener(this.mediaQueryChanged);
    // }
    //
    // componentWillUnmount() {
    //     this.state.mql.removeListener(this.mediaQueryChanged);
    // }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    // mediaQueryChanged() {
    //     this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    // }

    render() {
        return (


            <div>
                <Sidebar
                    sidebar={<b>Sidebar content</b>}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                >
                    <b>Main content</b>
                </Sidebar>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <button onClick={() => this.onSetSidebarOpen(true)}>
                        Open sidebar
                    </button>
                    <a href="/list" className="navbar-brand">
                        Commart
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/list"} className="nav-link">
                                Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add Post
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/list"]} component={TutorialsList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;