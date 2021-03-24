import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from 'formik-material-ui'
import FolderIcon from '@material-ui/icons/Folder'
import Spinner from '../../ui/Spinner'
import EditLessonDocuments from './EditLessonDocuments'
import LessonPeriodForm from './LessonPeriodForm'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import { getLessonById, createOrUpdateALesson } from '../../../actions/lessons'
import axios from 'axios'
import useFileDownloader from '../../../hooks/useFileDownloader'

const useStyles = makeStyles((theme) => ({
  bottomGutterFormControl: {
    marginBottom: '1.5em',
  },
  controlFormHeader: {
    fontWeight: '500',
    fontSize: '18px',
  },
  paddingContainer: {
    padding: '0 2em',
  },
}))

const EditALesson = (props) => {
  const [openModelEditDoc, setOpenModelEditDoc] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const [downloadFile, downloaderComponentUI] = useFileDownloader()

  const download = (file) => {
    downloadFile(file)
  }

  const lessonId = props.match.params.id

  const classes = useStyles()

  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)
  const { lesson: singleLesson, loading } = lesson

  const validationSchema = yup.object().shape({
    lessonName: yup.string().required('Vui lòng điền tên bài học.'),
    content: yup.string().required('Vui lòng điền nội dung của bài học.'),
    documents: yup.array(),
    periods: yup.array(),
  })

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
        .then(function (res) {
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

          dispatch(createOrUpdateALesson(lessonId, lessonData))
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setOpenModelEditDoc(false)
  }

  useEffect(() => {
    if (!singleLesson || singleLesson._id !== lessonId) {
      dispatch(getLessonById(lessonId))
    } else if (!loading || singleLesson) {
      setFormValues(singleLesson)
    }
  }, [dispatch, lessonId, singleLesson, loading])

  if (loading) {
    return <Spinner />
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, values, errors, setFieldValue, dirty }) => (
        <Form>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.paddingContainer}
          >
            <Grid item>
              <Typography
                variant="h4"
                style={{
                  margin: '1em 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Edit type of lesson
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
                      label="Lesson's name"
                      style={{ width: '30em' }}
                    />
                  </Grid>
                  <Grid item className={classes.bottomGutterFormControl}>
                    <Field
                      fullWidth
                      name="content"
                      component={TextField}
                      multiline
                      rows={4}
                      label="Content"
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
                        Lesson's documents:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <MyButton
                        component={Link}
                        to={`/teachers/lessons/re-upload-documents/${lessonId}`}
                      >
                        Edit list of documents
                      </MyButton>
                    </Grid>
                    <Grid item>
                      <EditLessonDocuments
                        open={openModelEditDoc}
                        onClose={handleClose}
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
                                  <span
                                    onClick={() => download(document)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    download
                                  </span>
                                }
                              />
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
                      Lesson's duration:
                    </Typography>
                  </Grid>
                  <Grid item container spacing={1}>
                    {values.periods && (
                      <LessonPeriodForm
                        fieldCheckbox="periods[0].thirtyMinutes.isChosen"
                        label="30 minutes"
                        valueCheckbox={values.periods[0].thirtyMinutes.isChosen}
                        fieldPrice="periods[0].thirtyMinutes.price"
                        valuePrice={values.periods[0].thirtyMinutes.price}
                      />
                    )}
                    {values.periods && (
                      <LessonPeriodForm
                        fieldCheckbox="periods[0].fortyFiveMinutes.isChosen"
                        label="45 minutes"
                        valueCheckbox={
                          values.periods[0].fortyFiveMinutes.isChosen
                        }
                        fieldPrice="periods[0].fortyFiveMinutes.price"
                        valuePrice={values.periods[0].fortyFiveMinutes.price}
                      />
                    )}

                    {values.periods && (
                      <LessonPeriodForm
                        fieldCheckbox="periods[0].oneHour.isChosen"
                        label="1 hour"
                        valueCheckbox={values.periods[0].oneHour.isChosen}
                        fieldPrice="periods[0].oneHour.price"
                        valuePrice={values.periods[0].oneHour.price}
                      />
                    )}
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
                  &nbsp;Back
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton type="submit">
                  <AddIcon />
                  &nbsp;Confirm
                </MyButton>
              </Grid>
            </Grid>
          </Grid>
          {downloaderComponentUI}
        </Form>
      )}
    </Formik>
  )
}

export default EditALesson
