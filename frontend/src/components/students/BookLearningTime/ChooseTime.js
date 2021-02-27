import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import viLocale from 'date-fns/locale/vi'
import { useFormikContext } from 'formik'
import { getLessonById } from '../../../actions/lessons'
import { connect } from 'react-redux'
import { addMinutes } from 'date-fns'
import { useConfirm } from 'material-ui-confirm'
import Alert from '@material-ui/lab/Alert'

const ChooseTime = ({
  calendarEvents,
  getLessonById,
  lessons: { lesson, loading },
  onSubmit,
}) => {
  const [error, setError] = useState('')
  const { setFieldValue, values, submitForm } = useFormikContext()

  const handleEventMouseEnter = (mouseEnterInfo) => {
    const eventElement = mouseEnterInfo.el
    eventElement.style.cursor = 'pointer'
  }

  const confirm = useConfirm()

  const handleEventClick = (eventInfo) => {
    const adjacentDurationToCheck = addMinutes(eventInfo.event.start, 30)

    const startTimeArray = calendarEvents.map((event) => event.start)

    const isIncluded = startTimeArray.includes(
      adjacentDurationToCheck.toISOString()
    )

    const adjacentAvailableEvent = calendarEvents.find(
      (event) => event.start === adjacentDurationToCheck.toISOString()
    )

    const clickedAvailableEvent = calendarEvents.find(
      (event) => event.start === eventInfo.event.start.toISOString()
    )

    if (
      values.duration === 1800000 ||
      (isIncluded && values.duration === 2700000) ||
      (isIncluded && values.duration === 3600000)
    ) {
      confirm({
        description: 'Bạn có chắc không?',
        title: 'Xác nhận đặt lịch học',
      })
        .then(() => {
          if (values.duration === 2700000 || values.duration === 3600000) {
            setFieldValue('bookedTime', [
              clickedAvailableEvent,
              adjacentAvailableEvent,
            ])
            submitForm()
            setError('')
          } else {
            setFieldValue('bookedTime', clickedAvailableEvent)
            submitForm()
            setError('')
          }
        })
        .catch(() => {})
    } else {
      setError(
        'Thời gian có thể dạy của giáo viên không đủ cho thời lượng của bài học mà bạn đã chọn.'
      )
    }
  }

  const turnMillisToMinutes = (millis) => {
    return Math.floor(millis / 60000)
  }

  useEffect(() => {
    getLessonById(values.lesson)
  }, [getLessonById, values.lesson])

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
      <Grid item>
        <Typography variant="h5" style={{ textTransform: 'uppercase' }}>
          Chọn thời gian học
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: 'flex-start' }}>
        <Typography variant="body1">
          Bạn vui lòng chọn thời gian học cho bài học{' '}
          <strong>{lesson && lesson.lessonName}</strong> với thời lượng{' '}
          <strong>{turnMillisToMinutes(values.duration)} phút</strong>.
        </Typography>
      </Grid>

      <Grid item style={{ backgroundColor: '#fff', padding: '2em' }}>
        <FullCalendar
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek timeGridDay',
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            momentPlugin,
          ]}
          titleFormat="dddd, D MMMM, YYYY"
          events={calendarEvents}
          slotLabelInterval="00:30"
          allDaySlot={false}
          eventClick={handleEventClick}
          eventMouseEnter={handleEventMouseEnter}
          locale={viLocale}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  lessons: state.lesson,
})

export default connect(mapStateToProps, { getLessonById })(ChooseTime)
