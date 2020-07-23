import React from 'react'
// import {hot} from 'react-hot-loader/root'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'


class NavBar extends React.Component
{

    render()
    {
        return(
                 <nav className = "nav">
                        <div className = "logo">
                                <h4 className = "logo-title">WORDCAMP SCHEDULE VIEWER</h4>
                        </div>
                        <ul className="nav-links">
                            <li className="nav-item active media-nav">
                                <a className="nav-link" href="https://central.wordcamp.org/" target="_blank" rel="noopener noreferrer">WordCamp</a>
                            </li>
                            <li className="nav-item">
                                <span className="route nav-link" onClick = {this.props.calenderDisplay}>Calender</span>
                            </li>
                            <li className="nav-item">
                                <span className="route nav-link" onClick = {this.props.mapsDisplay}>Maps</span>
                            </li>
                        </ul>
                        <div className = "repo media-nav">   
                        <a href="https://github.com/karanaryan07/WordCamp-Schedule-viewer-with-React" target="_blank" rel="noopener noreferrer" class="btn btn-primary" role="button">Source Code</a>    
                        </div>
                    </nav>
        )
    }
}

export default NavBar