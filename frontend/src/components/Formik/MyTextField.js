import React from "react"
import {
  Field,
  useField,
} from "formik"
import TextField from '@material-ui/core/TextField'

const MyTextField = ({placeholder, ...props}) => {
const [field, meta] = useField(props)
const errorText = meta.error && meta.touched ? meta.error : ''
return (
  <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
)
}

export default MyTextField