import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Card,
  Grid,
  Typography,
  CardActions,
  LinearProgress,
  CardContent,
} from '@material-ui/core'
import { useFormikContext } from 'formik'
import { makeStyles } from '@material-ui/styles'
import MyButton from '../../../components/ui/MyButton'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useDropzone } from 'react-dropzone'

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
    maxWidth: 200,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const DegreeImagesUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [dataToPreview, setDataToPreview] = useState([])
  const [loadedDegreeImagesProgress, setLoadedDegreeImagesProgress] = useState(
    0
  )

  const classes = useStyles()

  const { setFieldValue, values } = useFormikContext()

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setLoadedDegreeImagesProgress(0)
      setDataToPreview((prevState) =>
        prevState.concat(acceptedFiles.map((file) => URL.createObjectURL(file)))
      )

      setSelectedFiles((prevState) => prevState.concat(acceptedFiles))
    },
    noClick: true,
    noKeyboard: true,
  })

  const handleSubmitDegree = async () => {
    const formData = new FormData()

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('degreeImages', selectedFiles[i])
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setLoadedDegreeImagesProgress(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          )
        },
      }

      await axios
        .post('/api/uploadDegreeImages', formData, config)
        .then((res) => {
          toast.success('upload success')
          setFieldValue('degreeImages', res.data)
        })
        .catch((err) => {
          toast.error('upload fail')
        })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteDegreeImages = (imageIndex) => {
    setLoadedDegreeImagesProgress(0)
    const filteredDataToPreview = dataToPreview.filter(
      (item, index) => index !== imageIndex
    )
    const filteredDegreeImages = selectedFiles.filter(
      (item, index) => index !== imageIndex
    )
    setDataToPreview(filteredDataToPreview)
    setSelectedFiles(filteredDegreeImages)
  }

  const renderDegreeImages = (source) => {
    return source.map((photo, imageIndex) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <img src={photo} className={classes.expImage} alt="degree-images" />
        </Grid>
      )
    })
  }

  const renderPreviewDegreeImages = (source) => {
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

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      dataToPreview.forEach((data) => URL.revokeObjectURL(data))
    },
    [dataToPreview]
  )

  return (
    <>
      <Grid item className={classes.formControl}>
        <Card style={{ backgroundColor: '#ecebeb' }}>
          <CardContent>
            <Grid container alignItems="center" direction="column" spacing={2}>
              <Grid item>
                <label
                  htmlFor="degree-upload"
                  style={{ fontSize: '1.5rem', fontWeight: '450' }}
                >
                  Upload your images of teaching certificates: ( * )
                </label>
              </Grid>

              <Grid item>
                <Typography variant="h6">Your current files:</Typography>
              </Grid>

              <Grid
                item
                container
                justify="center"
                alignItems="center"
                spacing={2}
              >
                {renderDegreeImages(values.degreeImages)}
              </Grid>

              <Grid item>
                <section className="container">
                  <div
                    style={{
                      width: '100%',
                      height: '240px',
                      border: '1px dashed lightgray',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1em',
                    }}
                    {...getRootProps({ className: 'dropzone' })}
                  >
                    <input {...getInputProps()} />

                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <AddAPhotoIcon style={{ fontSize: '2rem' }} />
                      </Grid>

                      <Grid item>
                        <Typography variant="body2">
                          Drag 'n' drop some files here, or click to select
                          files
                        </Typography>
                      </Grid>

                      <Grid item>
                        <MyButton onClick={open}>Select your files</MyButton>
                      </Grid>
                    </Grid>
                  </div>
                </section>
              </Grid>

              <Grid
                item
                container
                justify="center"
                alignItems="center"
                spacing={2}
              >
                {renderPreviewDegreeImages(dataToPreview)}
              </Grid>

              {loadedDegreeImagesProgress > 0 && (
                <Grid
                  item
                  container
                  spacing={1}
                  justify="center"
                  alignItems="center"
                  style={{ margin: 'auto' }}
                >
                  <Grid item style={{ width: '90%' }}>
                    <LinearProgress
                      variant="determinate"
                      value={loadedDegreeImagesProgress}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{`${Math.round(
                      loadedDegreeImagesProgress
                    )}%`}</Typography>
                  </Grid>
                </Grid>
              )}

              <Grid item>
                <MyButton onClick={handleSubmitDegree}>
                  <CloudUploadIcon />
                  &nbsp;Upload
                </MyButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default DegreeImagesUploader
