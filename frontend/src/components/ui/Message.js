import React from 'react'
import Alert from '@material-ui/lab/Alert'

const Message = ({ severity, children }) => {
  return <Alert style={{marginBottom: '1em'}} severity={severity}>{children}</Alert>
}

Message.defaultProps = {
  severity: 'info',
}

export default Message