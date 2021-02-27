import React, { useState } from 'react'
import { Grid, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import { useFormikContext } from 'formik'

const IntervalCheckbox = ({ interval, fieldName }) => {
  const { setFieldValue } = useFormikContext()

  const handleChange = () => {
    const prevState = interval.isSelected

    setFieldValue(fieldName, !prevState)
  }

  return (
    <>
      <FormControlLabel
        labelPlacement="top"
        control={
          <Checkbox
            checked={interval.isSelected}
            onChange={handleChange}
            value={interval.startInterval}
          />
        }
        label={interval.intervalLabel}
      />
    </>
  )
}

export default IntervalCheckbox
