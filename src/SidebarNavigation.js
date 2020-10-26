import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from "react-redux";
import {toggleSideDrawer} from './actions';

// past de breedte van de sidebalk aan
const styles = {
  list: {
    width: 250,
  },
  button: {
    float: 'right'
  }
};

class SidebarNavigation extends React.Component {
  toggleSideDrawer = (data) => {
    this.props.toggleSideDrawer(data);
  }

  render() {
    const { classes } = this.props;

    //inhoud van de Sidelist
    const sideList = (
      <div className={classes.list}>
        <List>
        <Button className={`${classes.button} ${"close-sidedrawer"}`} onClick={() => this.toggleSideDrawer(false)}>
          <SvgIcon>
            <path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none"/>
            <path xmlns="http://www.w3.org/2000/svg" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </SvgIcon>
        </Button>
            <ListItem button component={Link} to="/" onClick={() => this.toggleSideDrawer(false)}>
              <ListItemIcon>
              <i className="material-icons">layers</i>
              </ListItemIcon>
              <ListItemText primary="Kaart"   />
            </ListItem>
            <ListItem button className="mijn-stations-link" component={Link} to="/mijn-stations/" onClick={() => this.toggleSideDrawer(false)}>
              <ListItemIcon>
              <i className="material-icons">train</i>
              </ListItemIcon>
              <ListItemText primary="Mijn Stations"  />
            </ListItem>
            <ListItem button className="stations-meldingen-link" component={Link} to="/meldingen/" onClick={() => this.toggleSideDrawer(false)}>
              <ListItemIcon>
              <i className="material-icons">notification_important</i>
              </ListItemIcon>
              <ListItemText primary="Meldingen" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="Instellingen" />
          </ListItem>
          <ListItem button>
              <ListItemText primary="Informatie" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Feedback geven" />
          </ListItem>
        </List>
      </div>
    );

    return (
      //wanneer er op de menuknop word geklikt opend het sidemenu
      <div>
        <Button onClick={() => this.toggleSideDrawer(true)}>
          <SvgIcon>
            <path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none"/>
            <path xmlns="http://www.w3.org/2000/svg" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={this.props.iconColor}/>
          </SvgIcon>
        </Button>

        <SwipeableDrawer
        //als er op de menu knop word geklikt krijgt de sidebalk een nieuwe waarde mee
          open={this.props.left}
          onClose={() => this.toggleSideDrawer(false)}
          onOpen={() => this.toggleSideDrawer(true)}
          hideBackdrop={true}
          ModalProps = {{
            keepMounted: true,
          }}
          className={"side-drawer-navigation"}
        >
          <div className = "side-menu"
            tabIndex={0}
            role="button"
            onKeyDown={() => this.toggleSideDrawer(false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>

      </div>
    );
  }
}


SidebarNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    left: state.toggleSideDrawer,
  }
}

export default connect(
  mapStateToProps,
  {
    toggleSideDrawer: toggleSideDrawer,
  }
)(withStyles(styles)(SidebarNavigation));
