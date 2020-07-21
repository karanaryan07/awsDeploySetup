import React from 'react'
// import {hot} from 'react-hot-loader/root'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100vh',
  };

class Maps extends React.Component
{
    constructor(props) {
        super(props);
    
        this.state = {
          stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
                  {latitude: 47.359423, longitude: -122.021071},
                  {latitude: 47.2052192687988, longitude: -121.988426208496},
                  {latitude: 47.6307081, longitude: -122.1434325},
                  {latitude: 47.3084488, longitude: -122.2140121},
                  {latitude: 47.5524695, longitude: -122.0425407}]
        }
      }
    
      displayMarkers = () => {
        return this.props.data.map((store, index) => {return store._host_coordinates !== {} ?
            <Marker 
            key={index} 
            id={index}
            title={store._host_city}
            position={{
           lat: store._host_coordinates.latitude,
           lng: store._host_coordinates.longitude}}
         onClick={() => console.log("You clicked me!")} /> : null
        })
      }

      
    render()
    {
        return(
            <Map
          google={this.props.google}
          zoom={3}
          style={mapStyles}
          initialCenter={{ lat: 36.0594821, lng: -95.9228215}}
        >
          {this.displayMarkers()}
        </Map>
        )
    }
}

// export default hot(Maps)
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB2CGT9BBNPrD7_o5BZQaV1aAU5LLwVgRY'
  })(Maps);