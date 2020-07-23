import React from "react";
import * as dateFns from 'date-fns';
// import {hot} from 'react-hot-loader/root'
import './Calender.css'
import PopupModal from './Popup.js'

// function stringDate(props_date)
// {
// let time =  new Date(props_date);
// return time;
// }

class Calendar extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            currentDate : new Date(),
            showPopup : false
        }
        this.onDateClick = this.onDateClick.bind(this)
        this.togglePopupDisplay = this.togglePopupDisplay.bind(this)
        this.stringDate = this.stringDate.bind(this)
    }

    stringDate(date)
    {
    let time =  new Date(date);
    return time;
    }

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "E";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate , currentDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            
            onClick={() => {this.onDateClick(dateFns.toDate(cloneDay)); this.togglePopupDisplay()}}
          >
            
            <span className={`${dateFns.isSameDay(day , currentDate) ? "current" : "number"}`}>{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {this.props.data[day] ? 
              <span className = {`${!dateFns.isSameMonth(day, monthStart) ? "text-disabled" : "text"}`}
              >{this.props.data[day].title.rendered}</span> : null}
           
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick(day){
    this.setState({
      selectedDate: day,
    }, () => {this.props.data[this.state.selectedDate] && this.setState({showPopup : true})});
    
  };

  togglePopupDisplay()
  {
    this.setState({showPopup : false})
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.props.data[this.state.selectedDate] && this.state.showPopup ? 
                              <PopupModal 
                              display = {this.togglePopupDisplay}
                              date = {this.stringDate(this.props.data[this.state.selectedDate].modified_gmt)} 
                              data = {this.props.data[this.state.selectedDate]}/> : null}
      </div>
    );
  }
}

export default Calendar;