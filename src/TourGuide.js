import React from 'react';
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride';
import {connect} from "react-redux";
import {toggleSideDrawer, toggleBottomDrawer} from './actions';

var tourGuide = false;

class TourGuide extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTourGuide = this.toggleTourGuide.bind(this);



    if (localStorage.getItem("TourGuide") != null && localStorage.getItem('TourGuide') == "true") {
      this.setState({ run: true });
    }

  this.state = {
    run: this.props.show,
    steps: [
      {
        target: '.search-hide',
        content: 'Voordat je met de applicatie kan beginnen, gaan we eerst kijken hoe alles werkt.',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
        showSkipButton: false,
      },
      {
        target: '.filterButton',
        content: 'Gebruik deze knop om markeringen te weergeven op het station.',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.categorie-Service',
        content: 'Vink een categorie aan om filters te weergeven.',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.filter-3',
        content: 'Klik nu op het plusje om een filter toe te voegen op de kaart.',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.zoekveld',
        content: 'Dit is het zoekveld waar je kunt zoeken naar stations. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.station-toevoegen',
        content: 'Met deze knop kun je een station toevoegen aan "Mijn stations" ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.zoekveld button',
        content: 'Als je op mij klikt open je het menu.',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.mijn-stations-link',
        content: 'Klik hier om jouw toegevoegde stations te weergeven. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.stations-meldingen-link',
        content: 'De meldingen van een station kun je hier vinden. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.close-sidedrawer',
        content: 'Klik hier om de navigatie te sluiten. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.locationButton',
        content: 'Als je op mij klikt kun je je positie weergeven op de kaart. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.menuItemFaciliteiten',
        content: 'Hier kun je de legenda vinden van een station. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.menuItemHistorie',
        content: 'Je geschiedenis staat hier opgeslagen. ',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
      },
      {
        target: '.search-hide',
        content: 'Veel plezier met het gebruiken van deze applicatie. 🖐',
        disableBeacon: true,
        disableOverlayClose: true,
        hideBackButton: true,
        showSkipButton: false,
      },
    ],
    stepIndex: 0, // a controlled tour
    };
  }

  onOpenFilterGuide = (bool) => {
    this.props.toggleBottomDrawer(bool);
  }

  onOpenMenuGuide = (bool) => {
    this.props.toggleSideDrawer(bool);
  }

  togglePopUp = () => {
    this.setState({ run: true });
  }

  toggleTourGuide = () => {
    this.setState({ run: true });
  }

  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if(this.state.stepIndex == 1){
        this.tourGuide = false;
        this.onOpenFilterGuide(true);
        setTimeout(function() { //Start the timer
          this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        }.bind(this), 500)
        this.setState({ run: true });
      }else if (this.state.stepIndex == 3){
        this.tourGuide = false;
        this.onOpenFilterGuide(false);
        setTimeout(function() { //Start the timer
          this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        }.bind(this), 500)
        this.setState({ run: true });
      }else if (this.state.stepIndex == 6){
        this.tourGuide = false;
        this.onOpenMenuGuide(true);
        setTimeout(function() { //Start the timer
          this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        }.bind(this), 500)
        this.setState({ run: true });
      }else if (this.state.stepIndex == 9){
        this.tourGuide = false;
        this.onOpenMenuGuide(false);
        setTimeout(function() { //Start the timer
          this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        }.bind(this), 500)
        this.setState({ run: true });
      }else{
      // Update state to advance the tour

        setTimeout(function() { //Start the timer
          this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        }.bind(this), 300)
      }
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
      // setter
      // this.simulateClick(this.onOpenMenuGuide.bind());
      localStorage.setItem('TourGuide', false);
    }

  };

  render () {
    const { run, stepIndex, steps } = this.state;
    const { classes } = this.props;

    return (
      <div className="app">

        <Joyride
          callback={this.handleJoyrideCallback}
          locale = {{
                    back: 'Terug', close: 'Stoppen', last: 'Afsluiten', next: 'Volgende', skip: 'Afsluiten',
          }}
          run={run}
          stepIndex={stepIndex}
          steps={steps}
          showSkipButton={true}
          disableOverlayClose={true}
          showProgress={true}
          continuous
          styles={{
            options: {
              primaryColor: '#6ab2a0',
              textColor: '#515853',
              width: 900,
              zIndex: 1000,
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {

}

export default connect(
  mapStateToProps,
  {
    toggleSideDrawer: toggleSideDrawer,
    toggleBottomDrawer: toggleBottomDrawer,
  }
)(TourGuide);
