import React, { useState } from 'react'
import { Grid, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import { useFormikContext } from 'formik'

const IntervalCheckbox = ({ interval, fieldName }) => {
  const { setFieldValue } = useFormikContext()

  const [state, setState] = React.useState({
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    h7: false,
    h8: false,
    h9: false,
    h10: false,
    h11: false,
    h12: false,
    h13: false,
    h14: false,
    h15: false,
    h16: false,
    h17: false,
    h18: false,
    h19: false,
    h20: false,
    h21: false,
    h22: false,
    h23: false,
    h24: false,
  })

  const intervalArray = [
    { startInterval: '0h', endInterval: '0h30' },
    { startInterval: '1h', endInterval: '1h30' },
    { startInterval: '2h', endInterval: '2h30' },
    { startInterval: '3h', endInterval: '3h30' },
    { startInterval: '4h', endInterval: '4h30' },
    { startInterval: '5h', endInterval: '5h30' },
    { startInterval: '6h', endInterval: '6h30' },
    { startInterval: '7h', endInterval: '7h30' },
    { startInterval: '8h', endInterval: '8h30' },
    { startInterval: '9h', endInterval: '9h30' },
    { startInterval: '10h', endInterval: '10h30' },
    { startInterval: '11h', endInterval: '11h30' },
    { startInterval: '12h', endInterval: '12h30' },
    { startInterval: '13h', endInterval: '13h30' },
    { startInterval: '14h', endInterval: '14h30' },
    { startInterval: '15h', endInterval: '15h30' },
    { startInterval: '16h', endInterval: '16h30' },
    { startInterval: '17h', endInterval: '17h30' },
    { startInterval: '18h', endInterval: '18h30' },
    { startInterval: '19h', endInterval: '19h30' },
    { startInterval: '20h', endInterval: '20h30' },
    { startInterval: '21h', endInterval: '21h30' },
    { startInterval: '22h', endInterval: '22h30' },
    { startInterval: '23h', endInterval: '23h30' },
    { startInterval: '24h', endInterval: '0h' },
  ]

  const handleChange = () => {
    setFieldValue(fieldName, !interval.isSelected)
  }

  return (
    <>
      <FormControlLabel
        labelPlacement="top"
        control={
          <Checkbox checked={interval.isSelected} onChange={handleChange} />
        }
        label={interval.intervalLabel}
      />
    </>
  )
}

export default IntervalCheckbox
