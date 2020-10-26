import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

const styles = {
  root: {
    width: '100%',
    maxWidth: 1420,
    backgroundColor: '#fff',
  },
};

class History extends React.Component {

  render() {
  const { classes } = this.props;
  return (
    <List className={classes.root}>
      {this.props.myFacilitation.map(history =>{
      return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={history.imageUrl}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={history.naam} secondary={history.categorie} />
      </ListItem>
      )
      })}
      {this.props.myFacilitation.length === 0 &&
        <p className="historie-lijst__empty">Er is nog geen historie voor {this.props.currentStation}</p>
        }
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    myFacilitation: state.myFacilitation,
    currentStation: state.currentStation
  }
}

export default connect(mapStateToProps)(withStyles(styles)(History));