import React from 'react'
import ReactFlagsSelect from 'react-flags-select'
import 'react-flags-select/css/react-flags-select.css'
import { useField, useFormikContext } from 'formik'

const FlagSelector = ({ ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props)
  return (
    <ReactFlagsSelect
      {...field}
      {...props}
      searchable={true}
      searchPlaceholder="Hãy chọn Quốc Gia"
      defaultCountry="VN"
      onSelect={(val) => {
        setFieldValue(field.name, val)
      }}
    />
  )
}

export default FlagSelector
