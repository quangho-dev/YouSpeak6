import React, { useState } from 'react'
import { Button, TextField, Grid } from '@material-ui/core'
import { Field, useFormikContext } from 'formik'
import axios from 'axios'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'

const AddDocumentButton = ({ label }) => {
  const [documentName, setDocumentName] = useState('')
  const [fileName, setfileName] = useState('')

  const [uploadingDocuments, setUploadingDocuments] = useState(false)

  const { setFieldValue, values } = useFormikContext()

  const onChangeHandler = async (e) => {
    const file = e.target.files[0]
    setFieldValue('documents', file)
    // const formData = new FormData()
    // formData.append('teacherAvatar', file)
    // setUploadingTeacherAvatar(true)
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }

    //   const { data } = await axios.post(
    //     '/api/upload-lesson-documents',
    //     formData,
    //     config
    //   )

    //   setFieldValue('teacherAvatar', data)

    //   setUploadingTeacherAvatar(false)
    // } catch (error) {
    //   console.error(error)
    //   setUploadingTeacherAvatar(false)
    // }
  }

  const handleFileChange = (e) => {}

  return (
    <>
      <Grid container justify="center" alignItems="center" spacing={1}>
        {/* <Grid item>
          <TextField
            id="standard-name"
            label="Name"
            value={documentName}
            onChange={handleLessonNameChange}
          />
        </Grid> */}
        <Grid item>
          {/* <Button
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
      </Button> */}
          <MyButton component={Link} to="/teachers/lessons/edit-documents">
            Chinh sua tai lieu
          </MyButton>
        </Grid>
      </Grid>
    </>
  )
}

export default AddDocumentButton
