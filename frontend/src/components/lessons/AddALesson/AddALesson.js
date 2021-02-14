import React, { useState } from 'react'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { useDispatch } from 'react-redux'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from 'formik-material-ui'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import EditLessonDocuments from './EditLessonDocuments'
import LessonPeriodForm from './LessonPeriodForm'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import { createALesson } from '../../../actions/lessons'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  bottomGutterFormControl: {
    marginBottom: '1.5em',
  },
  controlFormHeader: {
    fontWeight: '500',
    fontSize: '18px',
  },
}))

const AddALesson = (props) => {
  const [openModelEditDoc, setOpenModelEditDoc] = useState(false)

  const classes = useStyles()

  const dispatch = useDispatch()

  const initialValues = {
    lessonName: '',
    content: '',
    documents: [],
    periods: [
      {
        thirtyMinutes: { isChosen: false, price: 0 },
        fortyFiveMinutes: { isChosen: false, price: 0 },
        oneHour: { isChosen: false, price: 0 },
      },
    ],
  }

  const validationSchema = yup.object().shape({
    lessonName: yup.string().required('Vui lòng điền tên bài học.'),
    content: yup.string().required('Vui lòng điền nội dung của bài học.'),
    documents: yup.array(),
    periods: yup.array(),
  })

  const handleSubmit = async (values, { resetForm }) => {
    const { lessonName, content, documents, periods } = values

    const docFilesArray = documents.map((doc) => doc.fileDocument)
    const formData = new FormData()

    for (let i = 0; i < docFilesArray.length; i++) {
      formData.append('lessonDocuments', docFilesArray[i])
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      axios
        .post('/api/upload-lesson-documents', formData, config)
        .then((res) => {
          const newData = documents.map((doc, index) => {
            return {
              documentName: doc.documentName,
              fileDocument: res.data[index],
            }
          })

          const lessonData = {
            lessonName,
            content,
            documents: newData,
            periods,
          }

          dispatch(createALesson(lessonData))

          props.history.push('/teachers/lessons')
        })

      resetForm({
        lessonName: '',
        content: '',
        documents: [],
        periods: [
          { thirtyMinutes: { isChosen: false, price: 0 } },
          { fortyFiveMinutes: { isChosen: false, price: 0 } },
          { oneHour: { isChosen: false, price: 0 } },
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickOpen = () => {
    setOpenModelEditDoc(true)
  }

  const handleClose = () => {
    setOpenModelEditDoc(false)
  }

  const deleteDoc = (indexDoc, values, setFieldValue) => {
    const filteredDocuments = values.documents.filter(
      (doc, index) => index !== indexDoc
    )
    setFieldValue('documents', filteredDocuments)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, values, errors, setFieldValue, dirty }) => (
        <Form>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography
                variant="h4"
                style={{ margin: '1em 0', textTransform: 'uppercase' }}
              >
                Thêm bài học
              </Typography>
            </Grid>

            <Grid item container justify="center" spacing={5}>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Grid item className={classes.bottomGutterFormControl}>
                    <Field
                      fullWidth
                      name="lessonName"
                      component={TextField}
                      label="Tên bài học"
                    />
                  </Grid>
                  <Grid item className={classes.bottomGutterFormControl}>
                    <Field
                      fullWidth
                      name="content"
                      component={TextField}
                      multiline
                      rows={4}
                      label="Nội dung của bài học"
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    style={{ maxWidth: '500px' }}
                    className={classes.bottomGutterFormControl}
                  >
                    <Grid item>
                      <Typography
                        variant="h6"
                        className={classes.controlFormHeader}
                      >
                        Tài liệu dạy học:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <MyButton onClick={handleClickOpen}>
                        Chỉnh sửa tài liệu
                      </MyButton>
                    </Grid>
                    <Grid item>
                      <EditLessonDocuments
                        open={openModelEditDoc}
                        onClose={handleClose}
                        documents={values.documents}
                      />
                    </Grid>
                    <Grid item>
                      <List>
                        {values.documents &&
                          values.documents.map((document, indexDoc) => (
                            <ListItem key={indexDoc}>
                              <ListItemAvatar>
                                <Avatar>
                                  <FolderIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={document.documentName}
                                secondary={
                                  <a
                                    href={document.fileDocument}
                                    download="proposed_file_name"
                                  >
                                    Download
                                  </a>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={function () {
                                    deleteDoc(indexDoc, values, setFieldValue)
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.controlFormHeader}
                    >
                      Thời lượng:
                    </Typography>
                  </Grid>
                  <Grid item container spacing={1}>
                    <LessonPeriodForm
                      fieldCheckbox="periods[0].thirtyMinutes.isChosen"
                      labelCheckbox="30 phút"
                      valueCheckbox={values.periods[0].thirtyMinutes.isChosen}
                      fieldPrice="periods[0].thirtyMinutes.price"
                      valuePrice={values.periods[0].thirtyMinutes.price}
                    />

                    <LessonPeriodForm
                      fieldCheckbox="periods[0].fortyFiveMinutes.isChosen"
                      labelCheckbox="45 phút"
                      valueCheckbox={
                        values.periods[0].fortyFiveMinutes.isChosen
                      }
                      fieldPrice="periods[0].fortyFiveMinutes.price"
                      valuePrice={values.periods[0].fortyFiveMinutes.price}
                    />

                    <LessonPeriodForm
                      fieldCheckbox="periods[0].oneHour.isChosen"
                      labelCheckbox="1 giờ"
                      valueCheckbox={values.periods[0].oneHour.isChosen}
                      fieldPrice="periods[0].oneHour.price"
                      valuePrice={values.periods[0].oneHour.price}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify="center"
              spacing={1}
              style={{ margin: '1em 0' }}
            >
              <Grid item>
                <MyButton component={Link} to="/teachers/lessons">
                  <ArrowBackIcon />
                  &nbsp;Trở về
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton type="submit" disabled={!(isValid && dirty)}>
                  <AddIcon />
                  &nbsp;Thêm bài học
                </MyButton>
              </Grid>
            </Grid>
          </Grid>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  )
}

export default AddALesson
