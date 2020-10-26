import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {


  const [open, setOpen] = React.useState(props.show);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    localStorage.setItem('WarningNetworkUsage', false);
  }

  return (
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Locatiegebruik"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Door deze applicatie te gebruiken gaat u akkoord met het gebruiken van uw locatie.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ik ga akkoord.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
