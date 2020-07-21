import React from "react";
// import {hot} from 'react-hot-loader/root'
import Calendar from "./Calender.js";
import './Calender.css'



class CalenderApp extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              WordCamp <b>Calendar</b>
            </span>
          </div>
        </header>
        <main>
          {this.props.data  && <Calendar data = {this.props.data}/>}
        </main>
      </div>
    );
  }
}

export default CalenderApp;