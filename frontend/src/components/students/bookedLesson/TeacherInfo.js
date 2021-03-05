import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const TeacherInfo = ({ profileTeacher }) => {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h6"
              style={{ textTransform: 'uppercase', fontWeight: '600' }}
            >
              Thông tin giáo viên
            </Typography>
          </Grid>

          <Grid item container direction="column" style={{ marginTop: '1em' }}>
            <Grid item>
              <Typography variant="body1">
                <strong>Tên giáo viên:</strong>&nbsp;
                {profileTeacher.user.name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Email:</strong>&nbsp;
                {profileTeacher.user.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TeacherInfo
