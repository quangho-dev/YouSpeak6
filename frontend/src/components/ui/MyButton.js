import React from 'react'
import { Button } from '@material-ui/core'

const MyButton = ({ text, children }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ color: 'white', textTransform: 'none' }}
    >
      {children}
    </Button>
  )
}

export default MyButton
