import React from 'react'
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from 'formik'
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core'

const MuiRadioGroup = ({ label, ...props }) => {
  const [field] = useField(props)
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label="type-of-teacher" {...field} {...props}>
        <FormControlLabel
          value="professional"
          control={<Radio />}
          label="Giáo viên chuyên nghiệp"
        />
        <FormControlLabel
          value="commutor"
          control={<Radio />}
          label="Giáo viên cộng đồng"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default MuiRadioGroup
