import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AddCicleIcon from '@material-ui/icons/AddCircle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from "react-redux";
import {removeFilter, addFilter, toggleCategory, removeFromAll, addFilterToAll} from './actions';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 1.5,

  },
  chip: {
    margin: theme.spacing.unit / 3,
  },
});

class ChipsArray extends React.Component {
  toggleCategory = (data) => {
    this.props.toggleCategory(data);
  }

  addFilter = (data) => {
    this.props.addFilter(data);
    this.props.removeFromAll(data);
  }

  removeFilter = (data) => {
    this.props.removeFilter(data);
    this.props.addFilterToAll(data);
  }


  render() {
    const { classes } = this.props;

    const chipTitleActief = (
        <h4>Actieve Filters</h4>
    );

    const filterOpCategorie = (
        <h4>Filter op categorie</h4>
    );

    return (
      <div>
      {chipTitleActief}
      <Paper className={classes.root}
        elevation={0}>

        {this.props.filtersToShow.filtersToShow.map(data => (
          <Chip
            id={data.id}
            label={data.naam}
            onDelete={() => this.removeFilter(data)}
            className={[classes.chip, "bottom-drawer__filter-active"]}
          />
        ))}
        </Paper>

        {filterOpCategorie}
        <Paper className={classes.root}
          elevation={0}>
          {this.props.allCategories.allCategories
            .map(data => (
              <FormGroup>
                <FormControlLabel
                  className={`${"categorie-" + data.categorie}`}
                  control={
                    <Checkbox
                      onChange={() => this.toggleCategory(data)}
                      color="primary"
                      checked={data.checked}
                    />
                  }
                  label={data.categorie}
                />
              </FormGroup>
          ))}
        </Paper>

        <Paper className={classes.root}
        elevation={0}>
        {this.props.allFilters.allFilters
          .filter((filter) => {
            return this.props.categoriesToShow.categoriesToShow.includes(filter.categorie);
          })
          .map(data => (
              <Chip
              id={data.id}
              deleteIcon={<AddCicleIcon/>}
              label={data.naam}
              onDelete={() => this.addFilter(data)}
              className={`${classes.chip} ${"filter-" + data.id}`}
              />
          ))}
          </Paper>
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    filtersToShow: state.filtersToShow,
    allFilters: state.allFilters,
    allCategories: state.allCategories,
    categoriesToShow: state.categoriesToShow,
  }
}

export default connect(
  mapStateToProps,
  {
    addFilter: addFilter,
    addFilterToAll: addFilterToAll,
    removeFilter: removeFilter,
    removeFromAll: removeFromAll,
    toggleCategory: toggleCategory,
  }
)(withStyles(styles)(ChipsArray));
