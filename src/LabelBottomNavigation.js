import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
//Iconen zijn heel gemakkelijk om te importeren
//Kijk op Material.io/icons voor de namen
import StoreIcon from "@material-ui/icons/Store";
import HistoryIcon from "@material-ui/icons/History";
import { Link } from 'react-router-dom';


//In deze const geven we de CSS properties voor de bottom navigatie
const styles = {
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    zIndex: 2,
    boxShadow: "0px 18px 2px -13px rgba(0,0,0,0.2), 0px 9px 16px 1px rgba(0,0,0,0.14), 0px 3px 3px 5px rgba(0,0,0,0.04)",
  },
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        className={`${classes.root} ${"search-hide"}`}
        >

        <BottomNavigationAction
          component={Link}
          to="/stationfaciliteiten/"
          label="Faciliteiten"
          value="faciliteiten"
          icon={<StoreIcon />}
          className={` ${"menuItemFaciliteiten"}`}
          classes={{ root: 'MenuItem', selected: 'selected'}}
         />

        <BottomNavigationAction
        component={Link}
        to="/faciliteitenhistorie/"
        label="Historie"
        value="Historie"
        icon={<HistoryIcon />}
        className={` ${"menuItemHistorie"}`}
        classes={{ root: 'MenuItem', selected: 'selected'}}
        />

      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
