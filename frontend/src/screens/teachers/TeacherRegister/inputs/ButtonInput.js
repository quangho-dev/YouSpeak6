import React from 'react'
import { useFormikContext } from 'formik'
import { Button } from '@material-ui/core'

const ButtonInput = ({ value, nextPage }) => {
  const { setFieldValue } = useFormikContext()

  return (
    <Button
      style={{ color: 'white' }}
      variant="contained"
      color="primary"
      onClick={() => {
        setFieldValue('typeOfTeacher', value)
        nextPage()
      }}
    >
      Chọn
    </Button>
  )
}

export default ButtonInput
