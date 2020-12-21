import React, { useState } from 'react'
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
  Dialog,
} from '@material-ui/core'
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  ErrorMessage,
  useFormik,
} from 'formik'
import { makeStyles } from '@material-ui/styles'
import MuiRadioGroup from '../inputs/MuiRadioGroup'

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

const Page2 = ({ setFieldValue, nextPage }) => {
  const classes = useStyles()

  const handleSelectProType = () => {
    setFieldValue('isPro', true)
    setFieldValue('isCommutor', false)
    nextPage()
  }

  const handleSelectCommutorType = () => {
    setFieldValue('isCommutor', true)
    setFieldValue('isPro', false)
    nextPage()
  }

  return (
    <>
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
      <Grid
        container
        justify="center"
        spacing={3}
        alignItems="stretch"
        style={{ padding: '0 3em' }}
      >
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
                Được hiển thị là kiểu giáo viên chuyên nghiệp, tăng mức độ uy
                tín.
              </li>
              <li>Tự định giá bài học của bạn.</li>
            </ul>
            <h4>* Yêu cầu:</h4>
            <ul>
              <li>Cung cấp hình ảnh của các văn bằng về dạy tiếng Anh</li>
              <li>Video giới thiệu dài từ 1 - 3 phút</li>
            </ul>
          </CardContent>
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
        </Grid>
      </Grid>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '1em' }}>
        <MuiRadioGroup name="typeOfTeacher" label="Chọn kiểu giáo viên" />
      </div>
    </>
  )
}

export default Page2
