import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import {toggleMarkerInfo} from './actions';

const styles = {
  card: {
    width: '100%',
    position: 'absolute',
    bottom: 56,
    zIndex: 1
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class MarkerInfo extends React.Component{

  componentWillUnmount(){
    this.toggleMarkerInfo();
  }

  toggleMarkerInfo = () => {
    this.props.toggleMarkerInfo(false);
  }

  render(){
    const { classes } = this.props
    return (
      <div>
        <Slide direction='up' in={this.props.showMarkerInfo} mountOnEnter unmountOnExit>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar className="marker-info-avatar">
                  <img src={this.props.selectedMarker.imageUrl}></img>
                </Avatar>
              }
              action={
                <IconButton aria-label="Settings">
                  <SvgIcon onClick={this.toggleMarkerInfo}>
                    <path xmlns="http://www.w3.org/2000/svg" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none"/>
                  </SvgIcon>
                </IconButton>
              }
              title={this.props.selectedMarker.naam}
              subheader={this.props.selectedMarker.tijden}
            />
          </Card>
        </Slide>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMarkerInfo: state.showMarkerInfo,
    selectedMarker: state.selectedMarker
  }
}

export default connect(
  mapStateToProps,
  {
    toggleMarkerInfo: toggleMarkerInfo
  },
)(withStyles(styles)(MarkerInfo));
