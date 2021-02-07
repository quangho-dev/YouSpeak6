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
import * as Yup from 'yup'
import { object, string } from 'yup'
import { Formik, Field, Form } from 'formik'
import { useDispatch } from 'react-redux'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from 'formik-material-ui'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import AddDocumentButton from './AddDocumentButton'
import EditLessonDocuments from './EditLessonDocuments'
import PeriodCheckbox from './LessonPeriodForm'
import LessonPeriodForm from './LessonPeriodForm'

const AddALesson = () => {
  const [openModelEditDoc, setOpenModelEditDoc] = useState(false)

  const dispatch = useDispatch()

  const initialValues = {
    lessonName: '',
    content: '',
    documents: [],
    periods: [
      { thirtyMinutes: { isChosen: false, price: 0 } },
      { fortyFiveMinutes: { isChosen: false, price: 0 } },
      { oneHour: { isChosen: false, price: 0 } },
    ],
  }

  const handleSubmit = async (values, { setSubmiting, resetForm }) => {
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
    setSubmiting(false)
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, isValid, values, errors, setFieldValue }) => (
        <Form>
          {console.log('values.documents:', values.documents)}
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography
                variant="h4"
                style={{ margin: '1em 0', textTransform: 'uppercase' }}
              >
                Thêm bài học
              </Typography>
            </Grid>

            <Grid item container justify="center" spacing={4}>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Field
                      fullWidth
                      name="lessonName"
                      component={TextField}
                      label="Tên bài học"
                    />
                  </Grid>
                  <Grid item>
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
                  >
                    <Grid item>
                      <Typography variant="h6">Tài liệu dạy học:</Typography>
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
                      />
                    </Grid>
                    <Grid item>
                      <List>
                        {values.documents &&
                          values.documents.map((document, indexDoc) => (
                            <ListItem key={document.documentName}>
                              <ListItemAvatar>
                                <Avatar>
                                  <FolderIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={document.documentName}
                                secondary={document.fileDocument.name}
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
                    <Typography variant="h6">Thời lượng:</Typography>
                  </Grid>
                  <Grid item container spacing={1}>
                    <LessonPeriodForm
                      field="periods[0].thirtyMinutes.isChosen"
                      label="30 phút"
                      value={values.periods[0].thirtyMinutes.isChosen}
                      fieldPrice="periods[0].thirtyMinutes.price"
                      valuePrice={values.periods[0].thirtyMinutes.price}
                    />

                    <LessonPeriodForm
                      field="periods[1].fortyFiveMinutes.isChosen"
                      label="45 phút"
                      value={values.periods[1].fortyFiveMinutes.isChosen}
                      fieldPrice="periods[1].fortyFiveMinutes.price"
                      valuePrice={values.periods[1].fortyFiveMinutes.price}
                    />

                    <LessonPeriodForm
                      field="periods[2].oneHour.isChosen"
                      label="1 giờ"
                      value={values.periods[2].oneHour.isChosen}
                      fieldPrice="periods[2].oneHour.price"
                      valuePrice={values.periods[2].oneHour.price}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container justify="center" spacing={1}>
              <Grid item>
                <MyButton component={Link} to="/teachers/lessons">
                  <ArrowBackIcon />
                  &nbsp;Trở về
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton type="submit" disabled={!isValid || isSubmitting}>
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
