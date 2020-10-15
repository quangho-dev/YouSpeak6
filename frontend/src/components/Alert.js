import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../actions/alertActions'

const Alert = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert)
  const { openAlert, colorAlert, msg } = alert
return (
<Snackbar
    open={openAlert}
    ContentProps={{
      style: {
        backgroundColor: `${colorAlert}`
      },
    }}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    message={msg}
    autoHideDuration={4000}
    onClose={() => dispatch(closeAlert())}
  />
);
  
}

export default Alert;
