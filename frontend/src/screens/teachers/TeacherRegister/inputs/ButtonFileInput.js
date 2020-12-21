import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useField } from 'formik'

const ButtonFileInput = ({ label, name, setLoadingTeacherAvatar }) => {
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

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
          onChange={(event) => {
            if (event.currentTarget.files) {
              setValue(event.currentTarget.files[0])
              setLoadingTeacherAvatar(true)
            }
          }}
        />
      </Button>
    </>
  )
}

export default ButtonFileInput
