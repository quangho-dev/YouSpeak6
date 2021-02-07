import React from 'react'
import { Button } from '@material-ui/core'

<<<<<<< HEAD
const MyButton = ({ text, children }) => {
=======
const MyButton = ({ children, ...rest }) => {
>>>>>>> applyFireBaseAuth
  return (
    <Button
      variant="contained"
      color="primary"
<<<<<<< HEAD
      style={{ color: 'white', textTransform: 'none' }}
=======
      style={{ color: 'white' }}
      disableRipple
      {...rest}
>>>>>>> applyFireBaseAuth
    >
      {children}
    </Button>
  )
}

export default MyButton
