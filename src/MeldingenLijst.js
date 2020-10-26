import React from 'react';
import axios from 'axios';
import Melding from './Melding';
import {connect} from "react-redux";
import {fetchMeldingen} from './actions';

class MeldingenLijst extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var URL;
    for(let i = 0; i < this.props.stations.length; i++){
      if(this.props.stations[i].naam.toLowerCase() === this.props.currentStation.toLowerCase()){
        URL = this.props.stations[i].meldingen;
      }
    }
    axios.get(URL).then(res => {
      this.props.fetchMeldingen(res.data.meldingen);
    });
  }

  render(){
    return(
      <div className="meldingen-lijst">
      {this.props.meldingen.length === 1 &&
        <p className="meldingen-lijst__info">Er is momenteel {this.props.meldingen.length} melding op {this.props.currentStation}</p>
      }
      {this.props.meldingen.length > 1 &&
        <p className="meldingen-lijst__info">Er zijn momenteel {this.props.meldingen.length} meldingen op {this.props.currentStation}</p>
      }
      {this.props.meldingen.map(item => (
        <Melding key={item.id} info={item}/>
      ))}
      {this.props.meldingen.length === 0 &&
        <p className="meldingen-lijst__empty">Er zijn geen meldingen voor {this.props.currentStation}</p>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations,
    meldingen: state.meldingen,
    currentStation: state.currentStation
  }
}

export default connect(
  mapStateToProps,
  {
    fetchMeldingen: fetchMeldingen
  },
)(MeldingenLijst);
