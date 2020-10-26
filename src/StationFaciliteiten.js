import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {getFacilitations, resetFacilitations} from "./actions";

const styles = {
  root: {
    width: '100%',
    maxWidth: 1420,
    backgroundColor: '#fff',
  },
};

class StationFaciliteiten extends React.Component {

  componentDidMount(){
    var URL;
    for(let i = 0; i < this.props.stations.length; i++){
      if(this.props.stations[i].naam.toLowerCase() === this.props.currentStation.toLowerCase()){
        URL = encodeURI('https://api.jordyhouwaart.nl/api/filters/' + this.props.currentStation);
      }
    }
    axios.get(URL).then(res => {
      var searcher = res.data.filters;
      this.props.resetFacilitations(searcher);
      Object.keys(searcher).map(faciliteiten => {
        var faciliteitenArray = searcher[faciliteiten];
        faciliteitenArray.forEach((faciliteit) => {
          this.props.getFacilitations(faciliteit);
        });
      });
    });
   }

    render() {
      const { classes } = this.props;
    return(
    <List className={classes.root}>
        {this.props.showFacilitations.showFacilitations.map(filter =>{
        return(
          <ListItem>
          <ListItemAvatar>
            <Avatar className="avatarFaciliteiten" src={filter.imageUrl}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={filter.naam} secondary={filter.categorie} />
          </ListItem>
        )
        })}
        {this.props.showFacilitations.showFacilitations.length === 0 &&
        <p className="faciliteiten-lijst__empty">Er zijn geen faciliteiten voor {this.props.currentStation}</p>
        }
        </List>
      );
    }
}

const mapStateToProps = state => {
  return {
    showFacilitations: state.showFacilitations,
    currentStation: state.currentStation,
    stations: state.stations,
  }
}

export default connect(
  mapStateToProps,
  {
    getFacilitations: getFacilitations,
    resetFacilitations: resetFacilitations
  })(withStyles(styles)(StationFaciliteiten));
