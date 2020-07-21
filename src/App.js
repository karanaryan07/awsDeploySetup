
import React from "react";
// import { hot } from 'react-hot-loader/root';
// import Navbar from 'react-bootstrap/Navbar'
// import Button from '@material-ui/core/Button';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './TopBar/Nav.js'
import CalenderApp from './Calender/CalenderMain.js'
import Maps from './Maps/Maps.js'

function setHourstoZero(api_time)
{
    let time = new Date(api_time);
    time.setHours(0,0,0,0);
    return time;
}

class App extends React.Component {

  constructor(props)
  {
      super(props)
      this.state = {
          data : null,
          mapsData : null,
          showCalender : true,
          showMaps : false,
      }
      this.updateCalenderDisplay =  this.updateCalenderDisplay.bind(this)
      this.updateMapsDisplay = this.updateMapsDisplay.bind(this)
  }

  updateCalenderDisplay()
  {
    this.setState({showCalender : true , showMaps : false})
  }

  updateMapsDisplay()
  {
    this.setState({showCalender : false , showMaps : true})
  }

componentDidMount() 
{
      
      let storage = []
      console.log("hey" , this.state.data , this.state.mapsData)
      if(this.state.data == null && this.state.mapsData == null)
      { 
      console.log("hey hey" , this.state.data , this.state.mapsData)
      fetch('https://central.wordcamp.org/wp-json/wp/v2/wordcamps')
      .then(res =>res.json())
      .then(datas => { 
        datas.map((data , key) => {
        return storage[setHourstoZero(data.modified_gmt)] = data;    
      });
      this.setState({mapsData : datas});
      })

      storage !== [] && this.setState({data : storage})
    }
  
  }

  render() {
    console.log("api data" , this.state.data)
    console.log("a" , this.state.data != null , this.state.showCalender)
    console.log("b" , this.state.mapsData != null , this.state.showMaps)
    return (
      <>
      <NavBar calenderDisplay = {this.updateCalenderDisplay} mapsDisplay = {this.updateMapsDisplay}/>
      {(this.state.data != null && this.state.showCalender) ? <CalenderApp data = {this.state.data}/> : null}
      {(this.state.mapsData != null && this.state.showMaps) && <Maps data = {this.state.mapsData}/>}
      </>
    );
  }
}

export default App;
