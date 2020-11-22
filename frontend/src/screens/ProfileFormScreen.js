import React, { useState, useEffect } from 'react'
import {
  Grid,
  Avatar,
  Button,
  LinearProgress,
  MenuItem,
  FormGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { getCurrentProfile, createOrUpdateProfile } from '../actions/profile'
import MyCheckBox from '../components/Formik/MyCheckBox'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'

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

const ProfileFormScreen = ({ history }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [imageAvatarState, setImageAvatarState] = useState('')
  const [addressState, setAddressState] = useState('')
  const [dateOfBirthState, setDateOfBirthState] = useState(null)
  const [genderState, setGenderState] = useState('')
  const [englishLevelState, setEnglishLevelState] = useState(0)
  const [communicationToolState, setCommunicationToolState] = useState([])
  const [introductionState, setIntroductionState] = useState('')

  const [uploading, setUploading] = useState(false)

  const profile = useSelector((state) => state.profile)
  const { loading, profile: profileUser } = profile

  const auth = useSelector((state) => state.auth)
  const { user } = auth

  const validationSchema = yup.object().shape({
    dateOfBirth: yup.date().nullable(),
  })

  useEffect(() => {
    if (!profileUser) {
      dispatch(getCurrentProfile())
    }
    if (!loading && profileUser) {
      setImageAvatarState(profileUser.imageAvatar)
      setAddressState(profileUser.address)
      setDateOfBirthState(profileUser.dateOfBirth)
      setGenderState(profileUser.gender)
      setEnglishLevelState(profileUser.englishLevel)
      setCommunicationToolState(profileUser.communicationTool)
      setIntroductionState(profileUser.introduction)
    }
  }, [profileUser, loading, dispatch])

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <div className={classes.toolbarMargin} />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Chỉnh sửa Profile
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Formik
          enableReinitialize
          initialValues={{
            imageAvatar: imageAvatarState,
            dateOfBirth: dateOfBirthState,
            gender: genderState,
            address: addressState,
            englishLevel: englishLevelState,
            communicationTool: communicationToolState,
            introduction: introductionState,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(
                createOrUpdateProfile(
                  values,
                  history,
                  profileUser ? true : false
                )
              )
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ values, errors, isSubmitting, isValidating, setFieldValue }) => (
            <Form>
              <Grid container direction="column">
                <Grid item style={{ margin: 'auto' }}>
                  <Avatar
                    src={imageAvatarState}
                    style={{ width: '4em', height: '4em' }}
                    alt="avatar-image"
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
                        const file = event.currentTarget.files[0]
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
                          setImageAvatarState(data)
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
                {/* <Grid item className={classes.formControl}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="name"
                          as={TextField}
                          label="Tên hiển thị"
                        />
                        <ErrorMessage name="name" />
                      </FormGroup>
                    </Grid> */}
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
                      onChange={(value) => setFieldValue('dateOfBirth', value)}
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
                      value="Skype"
                      label="Skype"
                      color="primary"
                    />
                    <MyCheckBox
                      name="communicationTool"
                      value="Google Hangouts"
                      label="Google Hangouts"
                      color="primary"
                    />
                    <MyCheckBox
                      name="communicationTool"
                      value="Viber"
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
                <Grid item>
                  <Grid container justify="center" alignItems="center">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting || isValidating}
                      style={{ color: 'white', fontWeight: 600 }}
                    >
                      Lưu lại
                      <span style={{ marginLeft: '1em' }}>
                        {loading && <CircularProgress color="secondary" />}
                      </span>
                    </Button>
                    <Button
                      component={Link}
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{
                        color: 'white',
                        fontWeight: 600,
                        marginLeft: '0.5em',
                      }}
                      to="/dashboard"
                    >
                      Quay lại
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.formControl}>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default ProfileFormScreen
