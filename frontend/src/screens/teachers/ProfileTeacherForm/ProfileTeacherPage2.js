import React, { useState } from 'react'
import {
  FormGroup,
  Button,
  Card,
  Grid,
  Typography,
  CardActions,
  LinearProgress,
  Avatar,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { Field, useFormikContext } from 'formik'
import { makeStyles } from '@material-ui/styles'
import ButtonFileInput from './inputs/ButtonFileInput'
import { TextField } from 'formik-material-ui'
import Dropzone from 'react-dropzone'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AlertMessage from '../../../components/layout/AlertMessage'
import MuiDatePicker from './inputs/MuiDatePicker'
import ProfileCountrySelector from './inputs/ProfileCountrySelector'
import MyButton from '../../../components/ui/MyButton'
import EditIcon from '@material-ui/icons/Edit'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { RMIUploader } from 'react-multiple-image-uploader'

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
    padding: '0 7em',
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
  const [uploadingTeacherAvatar, setUploadingTeacherAvatar] = useState(false)

  const [uploadVideoPercentage, setUploadVideoPercentage] = useState(0)

  const [previewAvatar, setPreviewAvatar] = useState(null)

  const [previewDegreeImages, setPreviewDegreeImages] = useState([])
  const [uploadingDegreeImages, setUploadingDegreeImages] = useState([])

  const [previewExpImages, setPreviewExpImages] = useState([])
  const [uploadingExpImages, setUploadingExpImages] = useState(false)

  const { setFieldValue, values } = useFormikContext()

  const classes = useStyles()

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

  const handleDegreeImagesUpload = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files)

      const currentDegreeImages = values.degreeImages
      setFieldValue('degreeImages', currentDegreeImages.concat(filesArray))

      const degreeImagesFilesArrayToPreview = Array.from(
        event.target.files
      ).map((file) => URL.createObjectURL(file))

      setPreviewDegreeImages((prevImages) =>
        prevImages.concat(degreeImagesFilesArrayToPreview)
      )
      Array.from(event.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      )
    }
  }

  const handleExpImagesUpload = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files)
      const currentExpImagesFilesArray = values.expImages
      setFieldValue('expImages', currentExpImagesFilesArray.concat(filesArray))

      const expImagesFilesArrayToPreview = Array.from(
        event.target.files
      ).map((file) => URL.createObjectURL(file))

      setPreviewExpImages((prevImages) =>
        prevImages.concat(expImagesFilesArrayToPreview)
      )
      Array.from(event.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      )
    }
  }

  const deleteDegreeImages = (imageIndex) => {
    const filteredPreviewImages = previewDegreeImages.filter(
      (item, index) => index !== imageIndex
    )
    const filteredDegreeImages = values.degreeImages.filter(
      (item, index) => index !== imageIndex
    )
    setPreviewDegreeImages(filteredPreviewImages)
    setFieldValue('degreeImages', filteredDegreeImages)
  }

  const deleteExpImages = (imageIndex) => {
    const filteredPreviewExpImages = previewExpImages.filter(
      (item, index) => index !== imageIndex
    )
    const filteredExpImages = values.expImages.filter(
      (item, index) => index !== imageIndex
    )
    setPreviewExpImages(filteredPreviewExpImages)
    setFieldValue('expImages', filteredExpImages)
  }

  const renderDegreeImages = (source) => {
    return source.map((photo, imageIndex) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <Card>
            <img src={photo} className={classes.expImage} alt="degree-images" />
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => deleteDegreeImages(imageIndex)}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })
  }

  const renderExpImages = (source) => {
    return source.map((photo, imageIndex) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <Card>
            <img src={photo} className={classes.expImage} alt="experience" />
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => deleteExpImages(imageIndex)}
              >
                Remove
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
        <AlertMessage />
      </Grid>
      <Grid item>
        <Typography
          variant="h4"
          align="center"
          className={classes.formControl}
          style={{ textTransform: 'uppercase', fontSize: '600' }}
        >
          Edit profile
        </Typography>
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <Avatar
            src={values.teacherAvatar}
            style={{ width: '4em', height: '4em' }}
            alt="teacher-avatar"
          />
        </Grid>

        <Grid item>
          <p>
            Change avatar image ( * )
            <br />
            Maximum size: 2MB
          </p>
        </Grid>
        <Grid item className={classes.formControl}>
          <ButtonFileInput
            name="teacherAvatar"
            label="Change avatar"
            setUploadingTeacherAvatar={setUploadingTeacherAvatar}
          />
          {uploadingTeacherAvatar && <LinearProgress color="secondary" />}
        </Grid>
      </Grid>

      <Grid item className={classes.formControl}>
        <MuiDatePicker />
      </Grid>

      <Grid
        item
        className={classes.formControl}
        style={{ marginTop: '1em', maxWidth: '20em' }}
      >
        <div>
          <label htmlFor={'abc'} style={{ fontWeight: '400' }}>
            Choose your nationality: ( * )
          </label>
          <br />
          <ProfileCountrySelector />
        </div>
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="skypeId"
          type="text"
          component={TextField}
          label="Skype ID: ( * )"
        />
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="introduction"
          type="text"
          component={TextField}
          label="Let's write a short paragraph for students to know more about you: ( * )"
          multiline
          rows={5}
          style={{ width: '50em' }}
        />
      </Grid>

      <Grid item style={{ margin: 'auto' }} className={classes.formControl}>
        <p>
          Upload introduction video ( * )
          <br />
          about 1 - 3 minutes of length
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
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <label
                  htmlFor="degree-upload"
                  style={{ fontSize: '1.5rem', fontWeight: '400' }}
                >
                  Upload your images of teaching certificates: ( * )
                </label>
                <br />
                <MyButton component="label">
                  <CloudUploadIcon />
                  &nbsp;Upload images
                  <input
                    id="degree-upload"
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleDegreeImagesUpload}
                  />
                </MyButton>
              </Grid>

              <Grid item container spacing={2}>
                {renderDegreeImages(previewDegreeImages)}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            className={classes.formControl}
            style={{ marginTop: '2em' }}
          >
            <label
              htmlFor="exp-upload"
              style={{ fontSize: '1.5rem', fontWeight: '400' }}
            >
              Upload your images of teaching experiences: ( * )
            </label>
            <br />
            <Button
              variant="contained"
              component="label"
              color="primary"
              style={{ color: 'white', fontWeight: '500' }}
            >
              <CloudUploadIcon />
              &nbsp;Upload images
              <input
                id="exp-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleExpImagesUpload}
              />
            </Button>
          </Grid>

          <Grid item>
            <Grid container justify="center" alignItems="center" spacing={2}>
              {renderExpImages(previewExpImages)}
            </Grid>
          </Grid>
        </>
      )}
      <Grid item>
        <Typography variant="body2">( * ) Required input</Typography>
      </Grid>
      <Grid item style={{ maxWidth: '20em' }}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Grid>
    </Grid>
  )
}

export default ProfileTeacherPage2
