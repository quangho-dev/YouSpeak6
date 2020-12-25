import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'

const ButtonFileInput = ({
  label,
  name,
  setLoadingTeacherAvatar,
  setSelectedTeacherAvatar,
}) => {
  const [field, meta, helpers] = useField(name)
  const { setFieldValue, values } = useFormikContext()

  const onChangeHandler = (e) => {
    let file = e.currentTarget.files[0]
    setFieldValue('teacherAvatar', file)
    let reader = new FileReader()
    reader.onloadend = () => {
      setSelectedTeacherAvatar(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <Button
        variant="contained"
        component="label"
        color="primary"
        style={{ color: 'white', fontWeight: '500', margin: 'auto' }}
      >
        {label}
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={onChangeHandler}
        />
      </Button>
    </>
  )
}

export default ButtonFileInput
