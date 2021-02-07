import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
} from '@material-ui/core'
import Rating from '../../components/ui/Rating'
import { makeStyles } from '@material-ui/core/styles'
import ShowMoreText from 'react-show-more-text'
import ReactPlayer from 'react-player'
import formatMoney from '../../utils/formatMoney'

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: '0.5em',
  },
  subHeader: {
    fontSize: '15px',
  },
  teacherAvatar: {
    width: '70px',
    height: '70px',
  },
}))

const TeacherInfo = ({ teacher }) => {
  const {
    teacherAvatar,
    rating,
    lesson,
    typeOfTeacher,
    hourlyRateFrom,
    trial,
    video,
    thumbnail,
    introduction,
    user,
  } = teacher

  const classes = useStyles()

  const executeOnClick = (isExpanded) => {}

  return (
    <Card>
      <CardContent>
        <Grid container justify="center" alignItems="center">
          <Grid item container spacing={1} xs={7}>
            <Grid item container direction="column" alignItems="center" xs={4}>
              <Grid item className={classes.marginBottom}>
                <Avatar
                  alt="teacher-avatar"
                  src={teacherAvatar}
                  className={classes.teacherAvatar}
                />
              </Grid>

              <Grid item className={classes.marginBottom}>
                <Rating rating={rating} />
              </Grid>

              <Grid item className={classes.marginBottom}>
                <Typography variant="body2">
                  Đã dạy {lesson} bài học.
                </Typography>
              </Grid>

              <Grid item className={classes.marginBottom}>
                <Button
                  variant="contained"
                  disableRipple
                  color="primary"
                  style={{ color: 'white', textTransform: 'none' }}
                >
                  Đặt lịch học
                </Button>
              </Grid>
            </Grid>

            <Grid item container direction="column" justify="center" xs={8}>
              <Grid item>
                {user && user.name && (
                  <Typography variant="h5" style={{ fontSize: '26px' }}>
                    {user.name}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {typeOfTeacher === 'professional'
                    ? 'Giáo viên chuyên nghiệp'
                    : 'Giáo viên cộng đồng'}
                </Typography>
              </Grid>
              <Grid item style={{ width: '3em' }}>
                <Box borderBottom={1} borderColor="primary" />
              </Grid>

              <Grid item style={{ margin: '1em 0 0 ' }}>
                <Typography variant="h6" className={classes.subHeader}>
                  Giới thiệu về giáo viên:
                </Typography>
              </Grid>

              <Grid item style={{ paddingRight: '1em' }}>
                <ShowMoreText
                  lines={3}
                  more="Xem thêm"
                  less="Thu lại"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={executeOnClick}
                  expanded={false}
                  width={280}
                >
                  {introduction}
                </ShowMoreText>
              </Grid>
              <Grid
                item
                container
                justify="space-between"
                style={{ padding: '0 2em', marginTop: '2em' }}
              >
                <Grid item>
                  {hourlyRateFrom && (
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h6" className={classes.subHeader}>
                          Học phí từ:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{`${formatMoney(
                          hourlyRateFrom
                        )} VNĐ`}</Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <Grid item>
                  {trial && (
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h6" className={classes.subHeader}>
                          Phí học thử:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{`${formatMoney(
                          trial
                        )} VNĐ`}</Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <ReactPlayer
              style={{}}
              url={`/${video}`}
              controls
              playing
              light={`/${thumbnail}`}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TeacherInfo
