import React, { useState } from 'react'
import { Grid, TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import { useFormikContext } from 'formik'

const LessonPeriodForm = ({ field, label, value, fieldPrice, valuePrice }) => {
  const { setFieldValue, values } = useFormikContext()

  const handleChange = (e) => {
    setFieldValue(field, !value)
  }

  const handleChangePrice = (e) => {
    setFieldValue(fieldPrice, e.target.value)
  }

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={value} onChange={handleChange} />}
            label={label}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            type="number"
            label="Giá tiền (VNĐ):"
            value={valuePrice}
            onChange={handleChangePrice}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LessonPeriodForm
