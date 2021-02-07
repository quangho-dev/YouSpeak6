import React from 'react'
import { Button } from '@material-ui/core'
import { useFormikContext } from 'formik'
import axios from 'axios'

const ButtonFileInput = ({ label, setUploadingTeacherAvatar }) => {
  const { setFieldValue } = useFormikContext()

  const onChangeHandler = async (e) => {
    if (e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0]
      const formData = new FormData()
      formData.append('teacherAvatar', file)
      setUploadingTeacherAvatar(true)
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }

        const { data } = await axios.post(
          '/api/upload-teacher-avatar',
          formData,
          config
        )

        setFieldValue('teacherAvatar', data)

        setUploadingTeacherAvatar(false)
      } catch (error) {
        console.error(error)
        setUploadingTeacherAvatar(false)
      }
    }
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
