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

const UserProfileScreen = () => {
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
    },}))
    const classes = useStyles()

    const [openEditProfile, setOpenEditProfile] = useState(false)
const [userAvatar, setUserAvatar] = useState('')

    const onOpenEditProfile = () => {
      setOpenEditProfile(true)
    }
const onCloseEditProfile = () => {
  setOpenEditProfile(false)
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
        style={{ zIndex: 1302}}
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
  <input
  id='userAvatar'
    type="file"
    // style={{ display: "none" }}
  />
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
