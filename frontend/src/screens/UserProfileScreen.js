import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import LinearProgress from '@material-ui/core/LinearProgress'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import MyTextField from '../components/Formik/MyTextField'
import MenuItem from '@material-ui/core/MenuItem'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import * as yup from 'yup'
import MyCheckBox from '../components/Formik/MyCheckBox'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../actions/userActions'

const validationSchema = yup.object().shape({
  dateOfBirth: yup.date().nullable()
  })

const UserProfileScreen = () => {
const dispatch = useDispatch()

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
    closeButton: {
      position: 'absolute',
      right: '1em',
      top: '1em',
    },
    zIndex1: {
      zIndex: 1500,
    },
  formControl: {
marginBottom: '1.5em'
  },}))
    const classes = useStyles()

    const [openEditProfile, setOpenEditProfile] = useState(false)
const [imageAvatar, setImageAvatar] = useState('')
const [uploading, setUploading] = useState(false)

    const onOpenEditProfile = () => {
      setOpenEditProfile(true)
    }
const onCloseEditProfile = () => {
  setOpenEditProfile(false)
}
const uploadFileHandler = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('avatar', file)
  setUploading(true)

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/api/upload', formData, config)

    setImageAvatar(data)
    console.log(data)
    setUploading(false)
  } catch (error) {
    console.error(error)
    setUploading(false)
  }
} 

  return (
    <>
    <div style={{backgroundColor: '#f7f7f7'}} >
      <div className={classes.toolbarMargin} />
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item xs={4}>
        <Card>
<CardContent>
  <Avatar src='https://source.unsplash.com/random/100x100' style={{margin: 'auto'}} />
  <Typography variant='body1' gutterBottom>
Name
  </Typography>
  <Typography variant='body1' gutterBottom >Address
    </Typography>
</CardContent>
</Card>
        </Grid>
        <Grid item xs={6}>
<Button variant='contained' color='primary' onClick={onOpenEditProfile}>Chỉnh sửa profile</Button>
        </Grid>
      </Grid>
    </div>
    <Dialog
        open={openEditProfile}
        style={{ zIndex: 1300, marginTop: '3em'}}
        onClose={onCloseEditProfile}
     
      >
        <DialogContent >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Grid container justify='space-between' alignItems='center'>
              <Grid item>
              <Typography variant='h4'  gutterBottom>
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
              <Grid container justify='space-between'
            alignItems='center'>
 <Grid item>
                <Avatar src='https://source.unsplash.com/random/100x100' style={{width: '4em', height: '4em'}} />
              </Grid>
              <Grid item>
                <Grid container direction='column'>
                <Grid item> <p>Đổi ảnh profile
                  <br />
                  Tối đa 2MB
                </p>
                </Grid>
                <Grid item>     
  {/* <input
  id='userAvatar'
    type="file"
    // style={{ display: "none" }}
    onChange={uploadFileHandler}
  /> */}
  <Formik initialValues={{name: '', dateOfBirth: null, gender: '', address: '', englishLevel: 0, communicationTool: [], introduction: 'Thông tin khác về bạn...'}} validationSchema={validationSchema}
  onSubmit={(values, { setSubmitting}) => { setTimeout(() => {
const user = { ...values, avatar: imageAvatar}
    dispatch(updateUserProfile(user))
    setSubmitting(false)
  }, 400)}}>
{({values, errors, isSubmitting, isValidating, setFieldValue}) => (
<Form>
  <Grid container direction='column'>
    <Grid item className={classes.formControl}>
    <Button
  variant="contained"
  component="label"
  color='primary'
>
  Upload File
  <input
    type="file"
    style={{ display: "none" }}
    onChange={uploadFileHandler}
  />
</Button>
{uploading && <LinearProgress color='secondary' />}
    </Grid>
    <Grid item className={classes.formControl}>
    <MyTextField placeholder='Tên hiển thị' name='name' />
    </Grid>
    <Grid item className={classes.formControl}>
    {/* <Field component={MyDatePicker} name="dateOfBirth" /> */}
    {/* <Field component={MyDatePicker} name="dateOfBirth" margin="normal"
      id="date-picker-dialog"
      label="Ngày tháng năm sinh"
      format="dd/MM/yyyy" /> */}
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <KeyboardDatePicker
                  id="date-picker-dialog"
                  label="Ngày tháng năm sinh"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  clearable
                  value={values.dateOfBirth}
                  onChange={value => setFieldValue("dateOfBirth", value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
       </MuiPickersUtilsProvider>
    </Grid>
    <Grid item className={classes.formControl}>
      <FormGroup >
      <Field className={classes.zIndex1} name='gender' select label='Giới tính' as={TextField}>
        <MenuItem value='male'>Nam</MenuItem>
        <MenuItem value='female'>Nữ</MenuItem>
        </Field>
      </FormGroup>
    </Grid>
    <Grid item className={classes.formControl}>
      <FormGroup>
        <Field name='address' as={TextField} label='Địa chỉ' />
        <ErrorMessage name='address' />
      </FormGroup>
    </Grid>
    <Grid item className={classes.formControl}>
      <FormGroup >
      <Field className={classes.zIndex1} name='englishLevel' select label='Trình độ tiếng Anh' as={TextField}>
        <MenuItem value='0'>Chưa biết</MenuItem>
        <MenuItem value='1'>{`1 / 5`}</MenuItem>
        <MenuItem value='2'>{`2 / 5`}</MenuItem>
        <MenuItem value='3'>{`3 / 5`}</MenuItem>
        <MenuItem value='4'>{`4 / 5`}</MenuItem>
        <MenuItem value='5'>{`5 / 5`}</MenuItem>
        </Field>
      </FormGroup>
    </Grid>
    <Grid item className={classes.formControl}>
      <label>Chọn phần mềm video mà bạn dùng để học:</label>
      <FormGroup>
      <MyCheckBox name='communicationTool' value='skype' label='Skype' color='primary' />
      <MyCheckBox name='communicationTool' value='google hangouts' label='Google Hangouts' color='primary' />
      <MyCheckBox name='communicationTool' value='viber' label='Viber' color='primary' />
      </FormGroup>
    </Grid>
    <Grid item className={classes.formControl}>
    <FormGroup>
        <Field name='introduction' as={TextField} label='Thông tin thêm' multiline rows={4} />
        <ErrorMessage name='introduction' />
      </FormGroup>    
    </Grid>
  </Grid>

  <Button fullWidth variant='contained' color='primary' type="submit" disabled={isSubmitting || isValidating} style={{color: 'white', fontWeight: 600}}>Lưu lại</Button>

  <Grid item className={classes.formControl}>

    <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
    </Grid>
  </Form>
  )}
  </Formik>
              </Grid>
                </Grid>
            </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
   
</>
  )
  }
export default UserProfileScreen
