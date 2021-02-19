import React from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const DatePicker = ({
  name,
  form: { setFieldValue },
  field: { value },
  ...rest
}) => {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          label="Chọn ngày:"
          format="dd/MM/yyyy"
          value={value}
          onChange={(value) => {
            setFieldValue('selectedDate', value)
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  )
}

export default DatePicker
