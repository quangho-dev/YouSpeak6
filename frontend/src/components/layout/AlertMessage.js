import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2.25em',
    },
  },
}))

const AlertMessage = () => {
  const classes = useStyles()
  const alerts = useSelector((state) => state.alert)

  return (
    <>
      <div className={classes.toolbarMargin}></div>
      {alerts.map((alert) => (
        <Alert severity={alert.severity} key={alert.id}>
          {alert.msg}
        </Alert>
      ))}
    </>
  )
}

export default AlertMessage
