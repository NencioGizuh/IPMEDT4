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
import ChipsArray from './FilterChipsBottom';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import FilterIcon from '@material-ui/icons/FilterList';
import {connect} from "react-redux";
import {toggleBottomDrawer} from './actions';

var drawerPos = "100";

const styles = {
  list: {
    width: 250,

  },
  fullList: {
    width: 'auto',
  },

  paper: {
    height: "100vh",
    zIndex: "100 !important",
    transform: "translateY( " + `${drawerPos}` + " vh) translateY(0px)",
  },

};

class BottomDrawerNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  toggleBottomDrawer = (data) => {
    this.props.toggleBottomDrawer(data);
  }


  setDrawerPos(pos){
    drawerPos = pos;
  }

  render() {
    const { classes } = this.props;

    const fullList = (
        <div className={classes.fullList} >
        <div>
          <span className="icon-drawer-handle bottom-drawer__handle"></span>
        </div>
        <div className="bottom-nav-sluiten">
        <Button onClick={() => this.toggleBottomDrawer(false)}>Sluiten</Button>
        </div>
        <h1> Filters </h1>
          <ChipsArray />
        </div>
    );

    //In deze return return ik de bottom drawer en het knopje om deze actief te maken
    return (
      <div>
        <Fab variant="extended" aria-label="Filters" className="filterButton" onClick={() => this.toggleBottomDrawer(true)} component="button"
        >
        <FilterIcon className="filterButton__icon" />
        Filters
      </Fab>
       <div className="swipeable-drawer-container">

         <SwipeableDrawer
             classes={{
             paper: classes.paper, // class name, e.g. `classes-nesting-root-x`
           }}
           className={`${"bottom-drawer-parent"}`}
           anchor="bottom"
           onClose={() => this.toggleBottomDrawer(false)}
           onOpen={() => this.toggleBottomDrawer(true)}
           swipeAreaWidth={60}
           open={this.props.bottom}
           disableSwipeToOpen={true}
           hideBackdrop={true}
           ModalProps = {{
             keepMounted: true,
           }}
          >
            <div className="bottom-drawer"
              tabIndex={0}
              role="button"
              onKeyDown={() => this.toggleBottomDrawer(false)}
            >
              {fullList}
            </div>

          </SwipeableDrawer>

        </div>
        </div>
      );
  }
}

BottomDrawerNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    bottom: state.toggleBottomDrawer,
  }
}

export default connect(
  mapStateToProps,
  {
    toggleBottomDrawer: toggleBottomDrawer,
  }
)(withStyles(styles)(BottomDrawerNavigation));
