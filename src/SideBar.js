import React, { Component } from 'react';
import App from "./App";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom"
// import $ from "jquery";

import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/datepicker3.css'
import './assets/css/styles.css';
import HomeContent from './HomeContent';
import Footer from './Footer';
import MenuSidebar from "./MenuSidebar"


// import './assets/js/jquery-1.11.1.min.js'
// import './assets/js/bootstrap.min.js'
// import './assets/js/s/custom.js'
let queries = [{
    query: 'justifyContent: center'
}]


const routes = [
    {
        path: '/',
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () =>
            <HomeContent />
    },
    {
        path: '/bubblegum',
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>,
    },
    {
        path: '/app',
        main: () => <App menu="kabar dunia" />,
    },
]

class SideBar extends Component {
    render() {
        return (
            <Router>

                <MenuSidebar />
                <div id="sidebar-collapse" className="col-sm-6 col-lg-2 sidebar">
                    <div class="profile-sidebar" style={{ width: '300px' }}>
                        <div class="profile-userpic" style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
                            <img
                                src=""
                                class="img-responsive"
                                alt=""
                                width="400px"
                                height="auto"
                            />
                        </div>
                        <div className="profile-usertitle">
                            <div class="profile-usertitle-name">youtube : serealkoding</div>
                            <div class="profile-usertitle-name">follow ig : @ am.are.is3</div>
                            <div class="profile-usertitle-status"><span class="indicator label-success"></span>Online</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="divider"></div>
                    <form role="search">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search" />
                        </div>
                    </form>
                    <ul className="nav menu" style={{ position: 'relative' }} >
                        <li >< Link to='/'><em className="fa fa-dashboard">&nbsp;</em> Beranda</Link></li>
                        <li><Link to='/app'><em className="fa fa-calendar">&nbsp;</em>Kabar Korona</Link></li>
                        <li><Link to='bubblegum'><em className="fa fa-bar-chart">&nbsp;</em>Grafik Perkembangan</Link></li>
                        <li ><Link to='/app'><em className="fa fa-comments">&emsp;</em>Sampaikan Pesan  anda ke pemerintah</Link></li>
                        <span></span>
                        {/* <li > <a href="login.html" ><em class="fa fa-power-off">&nbsp;</em> Logout</a>
                        </li> */}
                    </ul>
                </div >

                <div className="panel panel-container " >
                    <div className="row col-sm-12" >
                        <div className="col-md-10 " style={{ marginLeft: '17%' }}>
                            <div class="panel panel-default " >
                                <div class="panel-heading" style={{ margin: 'auto' }}>
                                    {routes.map((route) => (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.main}
                                        />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router >
        )
    }
}

export default SideBar;