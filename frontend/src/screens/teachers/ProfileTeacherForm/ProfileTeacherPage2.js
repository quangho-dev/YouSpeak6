import React, { useState, useEffect } from 'react'
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
  CardMedia,
} from '@material-ui/core'
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  ErrorMessage,
  useField,
  useFormikContext,
} from 'formik'
import { makeStyles } from '@material-ui/styles'
import ButtonFileInput from './inputs/ButtonFileInput'
import MuiDatePicker from './inputs/MuiDatePicker'
import FlagSelector from './inputs/FlagSelector'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import Dropzone from 'react-dropzone'
import AddIcon from '@material-ui/icons/Add'
import VideoDropzone from './inputs/VideoDropzone'
import axios from 'axios'
import Moment from 'react-moment'

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
  rowContainer: {
    padding: '0 4em',
  },
  degreeImageCard: {
    maxWidth: 300,
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  expImageCard: {
    maxWidth: 300,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const ProfileTeacherPage2 = () => {
  const [videoDurationState, setVideoDurationState] = useState(0)
  const [previewTeacherAvatar, setPreviewTeacherAvatar] = useState(null)
  const [uploadingTeacherAvatar, setUploadingTeacherAvatar] = useState(false)

  const [uploadVideoPercentage, setUploadVideoPercentage] = useState(0)

  const [previewDegreeImages, setPreviewDegreeImages] = useState([])
  const [uploadingDegreeImages, setUploadingDegreeImages] = useState(false)

  const [previewExpImages, setPreviewExpImages] = useState([])
  const [uploadingExpImages, setUploadingExpImages] = useState(false)

  const classes = useStyles()

  const { setFieldValue, values } = useFormikContext()

  const onDrop = (files) => {
    if (files) {
      let formData = new FormData()
      const config = {
        header: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          let percent = Math.floor((loaded * 100) / total)

          if (percent < 100) {
            setUploadVideoPercentage(percent)
          }
        },
      }
      formData.append('video', files[0])

      axios.post('/api/uploadVideo', formData, config).then((response) => {
        if (response.data.success) {
          let variable = {
            url: response.data.url,
            fileName: response.data.fileName,
          }

          setUploadVideoPercentage(100)
          setTimeout(() => {
            setUploadVideoPercentage(0)
          }, 1000)

          setFieldValue('video', response.data.url)

          //gerenate thumbnail with this filepath !

          axios
            .post('/api/uploadVideo/thumbnail', variable)
            .then((response) => {
              if (response.data.success) {
                setVideoDurationState(response.data.fileDuration)
                setFieldValue('thumbnail', response.data.url)
              } else {
                alert('Failed to make the thumbnails')
              }
            })
        } else {
          alert('failed to save the video in server')
        }
      })
    }
  }

  const handleDegreeImagesUpload = async (event) => {
    if (event.target.files) {
      console.log('day la event.target.files:', event.target.files)
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      )

      setPreviewDegreeImages((prevImages) => prevImages.concat(filesArray))
      Array.from(event.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      )

      const files = event.target.files
      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        formData.append('degreeImages', files[i])
      }

      setUploadingDegreeImages(true)
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }

        const { data } = await axios.post(
          '/api/uploadDegreeImages',
          formData,
          config
        )

        const prevDegreeImages = values.degreeImages
        setFieldValue('degreeImages', prevDegreeImages.concat(data))

        setUploadingDegreeImages(false)
      } catch (error) {
        console.error(error)
        setUploadingDegreeImages(false)
      }
    }
  }

  const handleExpImagesUpload = async (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      )

      setPreviewExpImages((prevImages) => prevImages.concat(filesArray))
      Array.from(event.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      )

      const formData = new FormData()

      for (let i = 0; i < event.target.files.length; i++) {
        formData.append('expImages', event.target.files[i])
      }

      setUploadingExpImages(true)
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }

        const { data } = await axios.post(
          '/api/uploadExpImages',
          formData,
          config
        )

        const prevExpImages = values.expImages
        setFieldValue('expImages', prevExpImages.concat(data))
        setUploadingExpImages(false)
      } catch (error) {
        console.error(error)
        setUploadingExpImages(false)
      }
    }
  }

  const deleteDegreeImages = (e) => {
    const s = previewDegreeImages.filter((item, index) => index !== e)
    const sa = values.degreeImages.filter((item, index) => index !== e)
    setPreviewDegreeImages(s)
    setFieldValue('degreeImages', sa)
  }

  const deleteExpImages = (e) => {
    const s = previewExpImages.filter((item, index) => index !== e)
    const sa = values.expImages.filter((item, index) => index !== e)
    setPreviewExpImages(s)
    setFieldValue('expImages', sa)
  }

  const renderDegreeImages = (source) => {
    return source.map((photo, index) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <Card>
            <img src={photo} className={classes.expImage} />
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => deleteDegreeImages(index)}
              >
                Bỏ chọn
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })
  }

  const renderExpImages = (source) => {
    return source.map((photo, index) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <Card>
            <img src={photo} className={classes.expImage} />
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => deleteExpImages(index)}
              >
                Bỏ chọn
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })
  }

  return (
    <Grid
      container
      justify="center"
      direction="column"
      className={classes.rowContainer}
    >
      <Grid item>
        <Typography
          variant="h5"
          component="h3"
          align="center"
          className={classes.formControl}
        >
          {values.typeOfTeacher === 'professional'
            ? 'Điền thông tin giáo viên chuyên nghiệp'
            : 'Điền thông tin giáo viên cộng đồng'}
        </Typography>
      </Grid>
      <Grid item className={classes.formControl}>
        <Grid container direction="column" justify="center">
          <Grid item>
            <Avatar
              src={previewTeacherAvatar || values.teacherAvatar}
              style={{ width: '4em', height: '4em' }}
              alt="teacher-avatar"
            />
          </Grid>
          <Grid item>
            <p>
              Đổi ảnh profile ( * )
              <br />
              Tối đa 2MB
            </p>
          </Grid>
          <Grid item className={classes.formControl}>
            <ButtonFileInput
              name="teacherAvatar"
              label="Tải hình ảnh giáo viên"
              setUploadingTeacherAvatar={setUploadingTeacherAvatar}
              setPreviewTeacherAvatar={setPreviewTeacherAvatar}
            />
            {uploadingTeacherAvatar && <LinearProgress color="secondary" />}
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.formControl}>
        <label htmlfor="date-of-birth">
          Ngày tháng năm sinh (ví dụ 12/11/1990):
        </label>
        <br />
        <MuiDatePicker name="dateOfBirth" id="date-of-birth" />
      </Grid>

      <Grid item className={classes.formControl} style={{ marginTop: '1em' }}>
        <div>
          <label htmlFor={'abc'} style={{ fontWeight: '400' }}>
            Chọn Quốc tịch của bạn: ( * )
          </label>
          <br />
          <FlagSelector name="hometown" />
        </div>
      </Grid>

      <Grid item className={classes.formControl}>
        <label>Chọn phần mềm video call bạn dùng để dạy: ( * )</label>
        <br />
        <Grid container alignItems="center" className={classes.formControl}>
          <Field
            color="primary"
            component={CheckboxWithLabel}
            type="checkbox"
            name="communicationTool.skype"
            Label={{ label: 'Skype' }}
          />
          <Field
            color="primary"
            component={CheckboxWithLabel}
            type="checkbox"
            name="communicationTool.googleHangouts"
            Label={{ label: 'Google Hangouts' }}
          />
          <Field
            color="primary"
            component={CheckboxWithLabel}
            type="checkbox"
            name="communicationTool.viper"
            Label={{ label: 'Viper' }}
          />
          <Field
            color="primary"
            component={CheckboxWithLabel}
            type="checkbox"
            name="communicationTool.facetime"
            Label={{ label: 'Facetime' }}
          />
        </Grid>
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="introduction"
          type="text"
          component={TextField}
          label="Hãy viết một đoạn văn để người học có thể hiểu rõ hơn về bạn: ( * )"
          multiline
          rows={5}
          style={{ width: '20em' }}
        />
      </Grid>

      <Grid item style={{ margin: 'auto' }} className={classes.formControl}>
        <p>
          Tải video giới thiệu ( * )
          <br />
          Độ dài từ 1 - 3 phút
        </p>
      </Grid>
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={3}
          className={classes.formControl}
        >
          <Grid item>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
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
          </Grid>
          <Grid item>
            {values.thumbnail && (
              <div>
                <img
                  src={`http://localhost:5000/${values.thumbnail}`}
                  alt="video-thumbnail"
                />
              </div>
            )}
          </Grid>
          <Grid item>
            {values.thumbnail && (
              <Typography variant="body1">
                Độ dài: <Moment format="hh:mm:ss">{videoDurationState}</Moment>
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item className={classes.formControl}>
          <div style={{ width: '100%' }}>
            {uploadVideoPercentage > 0 && (
              <LinearProgress
                variant="determinate"
                value={uploadVideoPercentage}
              />
            )}
          </div>
        </Grid>
      </Grid>

      {values.typeOfTeacher === 'professional' && (
        <>
          <Grid item className={classes.formControl}>
            <label htmlFor="degree-upload">
              Tải hình ảnh bằng cấp của bạn: ( * )
            </label>
            <br />
            <Button
              variant="contained"
              component="label"
              color="primary"
              style={{ color: 'white', fontWeight: '500' }}
            >
              Tải file ảnh
              <input
                id="degree-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleDegreeImagesUpload}
              />
            </Button>
            {uploadingDegreeImages && <LinearProgress color="secondary" />}
          </Grid>

          <Grid item>
            <Grid container justify="center" alignItems="center" spacing={3}>
              {previewDegreeImages
                ? renderDegreeImages(previewDegreeImages)
                : values.degreeImages
                ? renderDegreeImages(values.degreeImages)
                : null}
            </Grid>
          </Grid>
          <Grid item className={classes.formControl}>
            <label htmlFor="exp-upload">
              Tải hình kinh nghiệm của bạn: ( * )
            </label>
            <br />
            <Button
              variant="contained"
              component="label"
              color="primary"
              style={{ color: 'white', fontWeight: '500' }}
            >
              Tải file ảnh
              <input
                id="exp-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleExpImagesUpload}
              />
            </Button>
            {uploadingExpImages && <LinearProgress color="secondary" />}
          </Grid>
          <Grid item>
            <Grid container justify="center" alignItems="center" spacing={3}>
              {renderExpImages(previewExpImages)}
            </Grid>
          </Grid>
        </>
      )}
      <Grid item>
        <Typography variant="body2">( * ) Không được để trống</Typography>
      </Grid>
    </Grid>
  )
}

export default ProfileTeacherPage2
