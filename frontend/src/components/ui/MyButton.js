import React from 'react'
import { Button } from '@material-ui/core'

<<<<<<< HEAD
const MyButton = ({ children, ...rest }) => {
=======
const MyButton = ({ text, children }) => {
>>>>>>> 19dec1a83e77e736dab7f1011246a4959f7c24cd
  return (
    <Button
      variant="contained"
      color="primary"
<<<<<<< HEAD
      style={{ color: 'white' }}
      disableRipple
      {...rest}
=======
      style={{ color: 'white', textTransform: 'none' }}
>>>>>>> 19dec1a83e77e736dab7f1011246a4959f7c24cd
    >
      {children}
    </Button>
  )
}

export default MyButton
