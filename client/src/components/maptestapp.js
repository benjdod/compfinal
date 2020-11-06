/* global document */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';


const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFjaGVsdzAwIiwiYSI6ImNrZ29hdXJoODBhNGQyc3F5MG1rOTU4aW8ifQ.1v3yLXjR8-vD5RnaKkOJkw'; // Set your mapbox token here

class Root extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewport: {
          latitude: 36,
          longitude: -79.047554,
          zoom: 3,
          bearing: 0,
          pitch: 0
        }
      };
    }

  
    render() {
      return (
        <MapGL
          {...this.state.viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={viewport => this.setState({viewport})}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      );
    }
  }
  
  /*
  document.body.style.margin = 0;
  render(<Root />, document.body.appendChild(document.createElement('div')));
  */