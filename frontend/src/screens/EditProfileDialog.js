import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Grid,
  Avatar,
  Button,
  DialogContent,
  IconButton,
  LinearProgress,
  MenuItem,
  FormGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { updateUserProfile, getUserDetails } from '../actions/userActions'
import MyCheckBox from '../components/Formik/MyCheckBox'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Message from '../components/ui/Message'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2.25em',
    },
  },
  // closeButton: {
  //   position: 'absolute',
  //   right: '1em',
  //   top: '1em',
  // },
  formControl: {
    marginBottom: '1.5em',
  },
}))

const EditProfileDialog = ({
  openEditProfile,
  onCloseEditProfile,
  history,
}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [imageAvatar, setImageAvatar] = useState('')
  const [address, setAddress] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [gender, setGender] = useState('')
  const [englishLevel, setEnglishLevel] = useState(0)
  const [communicationTool, setCommunicationTool] = useState([])
  const [introduction, setIntroduction] = useState('')

  const [uploading, setUploading] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile

  const validationSchema = yup.object().shape({
    dateOfBirth: yup.date().nullable(),
  })

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
    }
    if (!user.name) {
      dispatch(getUserDetails('profile'))
    } else {
      setName(user.name)
      setImageAvatar(user.imageAvatar)
      setAddress(user.address)
      setDateOfBirth(user.dateOfBirth)
      setGender(user.gender)
      setEnglishLevel(user.englishLevel)
      setCommunicationTool(user.communicationTool)
      setIntroduction(user.introduction)
    }
  }, [dispatch, user._id, successUpdate, user])

  return (
    <Dialog
      open={openEditProfile}
      style={{ zIndex: 1300, marginTop: '3em' }}
      onClose={onCloseEditProfile}
    >
      <DialogContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  Chỉnh sửa Profile
                </Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="close" onClick={onCloseEditProfile}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{
                imageAvatar,
                name,
                dateOfBirth,
                gender,
                address,
                englishLevel,
                communicationTool,
                introduction,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  dispatch(updateUserProfile(values))
                  setSubmitting(false)
                }, 400)
              }}
            >
              {({
                values,
                errors,
                isSubmitting,
                isValidating,
                setFieldValue,
              }) => (
                <Form>
                  <Grid container direction="column">
                    {loadingUpdate && <CircularProgress />}
                    {errorUpdate && (
                      <Message severity="error">{errorUpdate}</Message>
                    )}
                    {loading && <CircularProgress />}
                    {error && <Message severity="error">{error}</Message>}
                    <Grid item style={{ margin: 'auto' }}>
                      <Avatar
                        src="https://source.unsplash.com/random/100x100"
                        style={{ width: '4em', height: '4em' }}
                      />
                    </Grid>
                    <Grid item style={{ margin: 'auto' }}>
                      <p>
                        Đổi ảnh profile
                        <br />
                        Tối đa 2MB
                      </p>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        style={{ color: 'white', fontWeight: '500' }}
                      >
                        Tải file ảnh
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          onChange={async (event) => {
                            const file = event.target.files[0]
                            const formData = new FormData()
                            formData.append('imageAvatar', file)
                            setUploading(true)
                            try {
                              const config = {
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                },
                              }

                              const { data } = await axios.post(
                                '/api/upload',
                                formData,
                                config
                              )

                              setFieldValue('imageAvatar', data)
                              setUploading(false)
                            } catch (error) {
                              console.error(error)
                              setUploading(false)
                            }
                          }}
                        />
                      </Button>
                      {uploading && <LinearProgress color="secondary" />}
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="name"
                          as={TextField}
                          label="Tên hiển thị"
                        />
                        <ErrorMessage name="name" />
                      </FormGroup>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoComplete="off"
                          id="date-picker-dialog"
                          label="Ngày tháng năm sinh"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          clearable
                          value={values.dateOfBirth}
                          onChange={(value) =>
                            setFieldValue('dateOfBirth', value)
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="gender"
                          select
                          label="Giới tính"
                          as={TextField}
                        >
                          <MenuItem value="male">Nam</MenuItem>
                          <MenuItem value="female">Nữ</MenuItem>
                        </Field>
                      </FormGroup>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="address"
                          as={TextField}
                          label="Địa chỉ"
                        />
                        <ErrorMessage name="address" />
                      </FormGroup>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="englishLevel"
                          select
                          label="Trình độ tiếng Anh"
                          as={TextField}
                        >
                          <MenuItem value="0">Chưa biết</MenuItem>
                          <MenuItem value="1">{`1 / 5`}</MenuItem>
                          <MenuItem value="2">{`2 / 5`}</MenuItem>
                          <MenuItem value="3">{`3 / 5`}</MenuItem>
                          <MenuItem value="4">{`4 / 5`}</MenuItem>
                          <MenuItem value="5">{`5 / 5`}</MenuItem>
                        </Field>
                      </FormGroup>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <label>Chọn phần mềm video mà bạn dùng để học:</label>
                      <FormGroup>
                        <MyCheckBox
                          name="communicationTool"
                          value="skype"
                          label="Skype"
                          color="primary"
                        />
                        <MyCheckBox
                          name="communicationTool"
                          value="google hangouts"
                          label="Google Hangouts"
                          color="primary"
                        />
                        <MyCheckBox
                          name="communicationTool"
                          value="viber"
                          label="Viber"
                          color="primary"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="introduction"
                          as={TextField}
                          label="Thông tin thêm"
                          multiline
                          rows={4}
                        />
                        <ErrorMessage name="introduction" />
                      </FormGroup>
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || isValidating}
                    style={{ color: 'white', fontWeight: 600 }}
                  >
                    Lưu lại
                  </Button>

                  <Grid item className={classes.formControl}>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog