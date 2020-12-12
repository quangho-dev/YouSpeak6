import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CardActions,
  LinearProgress,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  ErrorMessage,
} from 'formik'
import { CheckboxWithLabel, TextField, Select } from 'formik-material-ui'
import React, { useState } from 'react'
import { mixed, number, object, string } from 'yup'
import FormikStep from './FormikStep'
import FormikStepper from './FormikStepper'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import axios from 'axios'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { DatePicker, DateTimePicker } from 'formik-material-ui-pickers'
import ReactFlagsSelect from 'react-flags-select'
import 'react-flags-select/css/react-flags-select.css'
import {
  Autocomplete,
  ToggleButtonGroup,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab'
import MuiTextField from '@material-ui/core/TextField'
import Dropzone from 'react-dropzone'
import AddIcon from '@material-ui/icons/Add'

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
  card: {
    // Provide some spacing between cards
    margin: 16,

    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    display: 'flex',
    flexDirection: 'column',

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    justifyContent: 'space-between',
  },
  paddingContainer: {
    padding: '0 4em',
  },
  linkText: {
    textTransform: 'uppercase',
    '&:hover, &:visited, &:active': {
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
  formControl: {
    marginBottom: '1em',
  },
}))

const FormRegisterTeacher = () => {
  const [isPro, setIsPro] = useState(false)
  const [isCommutor, setIsCommutor] = useState(false)
  const [step, setStep] = useState(0)
  const [teacherAvatarState, setTeacherAvatarState] = useState('')
  const [uploadingTeacherAvatar, setUploadingTeacherAvatar] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [homeTownState, setHomeTownState] = useState('VN')
  const [videoState, setVideoState] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [duration, setDuration] = useState('')
  const [videoFilePath, setVideoFilePath] = useState('')

  const classes = useStyles()

  const handleSelectProType = () => {
    setIsPro(true)
    setIsCommutor(false)
    setStep((s) => s + 1)
    console.log('isPro', isPro)
  }

  const handleSelectCommutorType = () => {
    setIsCommutor(true)
    setIsPro(false)
    setStep((s) => s + 1)
    console.log('isCommutor', isCommutor)
  }

  const onSelectFlag = (countryCode) => {
    setHomeTownState(countryCode)
  }

  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    }
    console.log(files)
    formData.append('video', files[0])

    axios.post('/api/uploadVideo', formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        }
        setVideoFilePath(response.data.url)

        //gerenate thumbnail with this filepath !

        axios.post('/api/uploadVideo/thumbnail', variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration)
            setThumbnail(response.data.url)
          } else {
            alert('Failed to make the thumbnails')
          }
        })
      } else {
        alert('failed to save the video in server')
      }
    })
  }
  return (
    <div style={{ backgroundColor: '#888', minHeight: '100vh ' }}>
      <div className={classes.toolbarMargin}></div>
      <Card>
        <CardContent>
          <FormikStepper
            enableReinitialize
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              degreeImages: [],
              expImages: [],
              teacherAvatar: teacherAvatarState,
              dateOfBirth: null,
              homeTown: homeTownState,
              communicationTool: [],
              introduction: '',
              video: videoState,
            }}
            onSubmit={async (values) => {
              console.log('values', { isPro, isCommutor, ...values })
            }}
            isPro={isPro}
            step={step}
            setStep={setStep}
          >
            {/* <FormikStep
              label="Đăng ký tài khoản"
              validationSchema={object({
                name: string().required('Bạn cần điền tên hiển thị'),
                email: string()
                  .email('Định dạng của email không đúng')
                  .required('Bạn cần điền email'),
                password: string()
                  .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
                  .required('Bạn cần điền mật khẩu'),
                confirmPassword: string()
                  .oneOf(
                    [Yup.ref('password'), null],
                    'Mật khẩu chưa trùng khớp'
                  )
                  .required('Bạn cần điền xác nhận mật khẩu'),
              })}
            >
              <Grid
                item
                container
                alignItems="center"
                className={classes.paddingContainer}
              >
                <Grid item>
                  <Link to="/for-teacher">
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </Link>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    component={Link}
                    to="/for-teacher"
                    variant="text"
                    style={{
                      fontWeight: '600',
                      marginLeft: '0.5em',
                      textDecoration: 'none',
                    }}
                    className={classes.linkText}
                  >
                    Trở về
                  </Typography>
                </Grid>
              </Grid>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="name"
                  component={TextField}
                  label="Tên hiển thị"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="email"
                  component={TextField}
                  label="Email"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="password"
                  type="password"
                  component={TextField}
                  label="Mật khẩu"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  component={TextField}
                  label="Xác nhận mật khẩu"
                />
              </Box>
            </FormikStep>
            <FormikStep
              label="Chọn kiểu giáo viên"
              step={step}
              setStep={setStep}
            >
              <div style={{ textAlign: 'center' }}>
                <Typography
                  gutterBottom
                  style={{ textTransform: 'uppercase', fontWeight: '600' }}
                  variant="h4"
                  component="h2"
                >
                  Chọn kiểu giáo viên
                </Typography>
              </div>
              <Grid container justify="center" spacing={3} alignItems="stretch">
                <Grid
                  item
                  component={Card}
                  xs
                  style={{ backgroundColor: '#e5e5e5' }}
                  className={classes.card}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}
                    >
                      Giáo viên chuyên nghiệp
                    </Typography>
                    <h4>* Quyền lợi:</h4>
                    <ul>
                      <li>
                        Được hiển thị là kiểu giáo viên chuyên nghiệp, tăng mức
                        độ uy tín.
                      </li>
                      <li>Tự định giá bài học của bạn.</li>
                    </ul>
                    <h4>* Yêu cầu:</h4>
                    <ul>
                      <li>
                        Cung cấp hình ảnh của các văn bằng về dạy tiếng Anh
                      </li>
                      <li>Video giới thiệu dài từ 1 - 3 phút</li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disableRipple
                      style={{ color: 'white' }}
                      onClick={handleSelectProType}
                    >
                      Chọn
                    </Button>
                  </CardActions>
                </Grid>
                <Grid
                  item
                  component={Card}
                  xs
                  style={{ backgroundColor: '#e5e5e5' }}
                  className={classes.card}
                >
                  <CardContent>
                    <div style={{ textAlign: 'center' }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ textTransform: 'uppercase' }}
                      >
                        Giáo viên cộng đồng
                      </Typography>
                    </div>
                    <h4>* Quyền lợi:</h4>
                    <ul>
                      <li>Tự định giá bài học của bạn.</li>
                    </ul>
                    <h4>* Yêu cầu:</h4>
                    <ul>
                      <li>Video giới thiệu dài từ 1 - 3 phút</li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disableRipple
                      style={{ color: 'white' }}
                      onClick={handleSelectCommutorType}
                    >
                      Chọn
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </FormikStep> */}
            <FormikStep label="Điền thông tin giáo viên">
              <Card>
                <CardContent>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item>
                      <Typography
                        variant="h5"
                        component="h3"
                        align="center"
                        className={classes.formControl}
                      >
                        Điền thông tin giáo viên
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{ margin: 'auto' }}
                      className={classes.formControl}
                    >
                      <Avatar
                        src={teacherAvatarState}
                        style={{ width: '4em', height: '4em' }}
                        alt="teacher-avatar"
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ margin: 'auto' }}
                      className={classes.formControl}
                    >
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
                              setTeacherAvatarState(data)
                              setUploadingTeacherAvatar(false)
                            } catch (error) {
                              console.error(error)
                              setUploadingTeacherAvatar(false)
                            }
                          }}
                        />
                      </Button>
                      {uploadingTeacherAvatar && (
                        <LinearProgress color="secondary" />
                      )}
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          component={DatePicker}
                          name="dateOfBirth"
                          label="Ngày tháng năm sinh"
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <div>
                        <label htmlFor={'abc'} style={{ fontWeight: '400' }}>
                          Chọn Quốc tịch của bạn:
                        </label>
                        <br />
                        <ReactFlagsSelect
                          id="abc"
                          searchable={true}
                          searchPlaceholder="Hãy chọn Quốc Gia"
                          defaultCountry="VN"
                          onSelect={onSelectFlag}
                        />
                      </div>
                    </Grid>
                    {/* <Grid item className={classes.formControl}>
                      <Field
                        name="communicationTool"
                        multiple
                        component={Autocomplete}
                        options={videoCallSoftwares}
                        getOptionLabel={(option: any) => option.software}
                        style={{ width: 300 }}
                        renderInput={(
                          params: AutocompleteRenderInputParams
                        ) => (
                          <MuiTextField
                            {...params}
                            error={
                              touched['communicationTool'] &&
                              !!errors['communicationTool']
                            }
                            helperText={
                              touched['communicationTool'] &&
                              errors['communicationTool']
                            }
                            label="Các phần mềm video call bạn dùng để dạy:"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid> */}
                    <Grid item>
                      <FormControl>
                        <label htmlFor="communicationTool">
                          Phần mềm video call bạn dùng để dạy:
                        </label>
                        <Field
                          component={Select}
                          type="text"
                          name="communicationTool"
                          multiple={true}
                          inputProps={{
                            name: 'communicationTool',
                            id: 'communicationTool',
                          }}
                        >
                          <MenuItem value="skype">Skype</MenuItem>
                          <MenuItem value="google hangouts">
                            Google Hangouts
                          </MenuItem>
                          <MenuItem value="viper">Viper</MenuItem>
                          <MenuItem value="facetime">Facetime</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Field
                        fullWidth
                        name="introduction"
                        type="text"
                        component={TextField}
                        label="Thông tin thêm:"
                        multiline
                        rows={5}
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ margin: 'auto' }}
                      className={classes.formControl}
                    >
                      <p>
                        Đổi ảnh profile
                        <br />
                        Tối đa 2MB
                      </p>
                    </Grid>
                    {/* <Grid item className={classes.formControl}>
                      <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        style={{ color: 'white', fontWeight: '500' }}
                      >
                        Tải file video giới thiệu
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          onChange={async (event) => {
                            const file = event.currentTarget.files[0]
                            const formData = new FormData()
                            formData.append('video', file)
                            setUploadingVideo(true)
                            try {
                              const config = {
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                },
                              }

                              const { data } = await axios.post(
                                '/api/uploadVideo',
                                formData,
                                config
                              )
                              setVideoState(data)
                              setUploadingVideo(false)
                            } catch (error) {
                              console.error(error)
                              setUploadingVideo(false)
                            }
                          }}
                        />
                      </Button>
                      {uploadingVideo && <LinearProgress color="secondary" />}
                    </Grid> */}
                    <Grid item>
                      <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            style={{
                              width: '300px',
                              height: '240px',
                              border: '1px solid lightgray',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <AddIcon style={{ fontSize: '3rem' }} />
                          </div>
                        )}
                      </Dropzone>

                      {thumbnail !== '' && (
                        <div>
                          <img
                            src={`http://localhost:5000/${thumbnail}`}
                            alt="video-thumbnail"
                          />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  {isPro && <p>I am a professional teacher!</p>}
                </CardContent>
              </Card>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormRegisterTeacher
