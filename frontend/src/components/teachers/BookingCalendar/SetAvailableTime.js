import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import MyButton from '../../ui/MyButton'
import { Formik, Field, Form } from 'formik'
import DatePicker from './DatePicker'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import {
  format,
  add,
  subDays,
  setHours,
  setMinutes,
  setSeconds,
  getHours,
  getMinutes,
} from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  setAvailableTime,
  getCurrentAvailableTime,
} from '../../../actions/bookingCalendar'
import { useDispatch, useSelector } from 'react-redux'
import { CheckboxWithLabel } from 'formik-material-ui'
import Spinner from '../../ui/Spinner'

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '0 3em',
  },
}))

const SetAvailableTime = () => {
  const [formValues, setFormValues] = useState(null)

  const classes = useStyles()

  const dispatch = useDispatch()

  const bookingCalendar = useSelector((state) => state.bookingCalendar)

  const { loading, availableTime } = bookingCalendar

  const handleSubmit = async (values) => {
    const { selectedDate, availableTime } = values

    const trueIntervals = availableTime.filter((interval) => {
      return interval.isSelected === true
    })

    const startIntervalArray = trueIntervals.map(
      (interval) => interval.startInterval
    )

    const availableTimeArray = startIntervalArray.map((interval) => {
      const setSecondsDate = setSeconds(selectedDate, 0)
      const setHoursDate = setHours(setSecondsDate, interval.h)
      const setMinutesAndHoursDate = setMinutes(setHoursDate, interval.m)

      const addedMinutesDate = add(setMinutesAndHoursDate, { minutes: 30 })
      return {
        startTimeInterval: setMinutesAndHoursDate,
        endTimeInterval: addedMinutesDate,
      }
    })

    dispatch(setAvailableTime(availableTimeArray))
  }

  const initialValues = {
    selectedDate: new Date(),
    availableTime: [
      {
        isSelected: false,
        startInterval: { h: 0, m: 0 },
        intervalLabel: '0h - 0h30',
      },
      {
        isSelected: false,
        startInterval: { h: 0, m: 30 },
        intervalLabel: '0h30 - 1h',
      },
      {
        isSelected: false,
        startInterval: { h: 1, m: 0 },
        intervalLabel: '1h - 1h30',
      },
      {
        isSelected: false,
        startInterval: { h: 1, m: 30 },
        intervalLabel: '1h30 - 2h',
      },
      {
        isSelected: false,
        startInterval: { h: 2, m: 0 },
        intervalLabel: '2h - 2h30',
      },
      {
        isSelected: false,
        startInterval: { h: 2, m: 30 },
        intervalLabel: '2h30 - 3h',
      },
      {
        isSelected: false,
        startInterval: { h: 3, m: 0 },
        intervalLabel: '3h - 3h30',
      },
      {
        isSelected: false,
        startInterval: { h: 3, m: 30 },
        intervalLabel: '3h30 - 4h',
      },
      {
        isSelected: false,
        startInterval: { h: 4, m: 0 },
        intervalLabel: '4h - 4h30',
      },
      {
        isSelected: false,
        startInterval: { h: 4, m: 30 },
        intervalLabel: '4h30 - 5h',
      },
      {
        isSelected: false,
        startInterval: { h: 5, m: 0 },
        intervalLabel: '5h - 5h30',
      },
      {
        isSelected: false,
        startInterval: { h: 5, m: 30 },
        intervalLabel: '5h30 - 6h',
      },
      {
        isSelected: false,
        startInterval: { h: 6, m: 0 },
        intervalLabel: '6h - 6h30',
      },
      {
        isSelected: false,
        startInterval: { h: 6, m: 30 },
        intervalLabel: '6h30 - 7h',
      },
      {
        isSelected: false,
        startInterval: { h: 7, m: 0 },
        intervalLabel: '7h - 7h30',
      },
      {
        isSelected: false,
        startInterval: { h: 7, m: 30 },
        intervalLabel: '7h30 - 8h',
      },
      {
        isSelected: false,
        startInterval: { h: 8, m: 0 },
        intervalLabel: '8h - 8h30',
      },
      {
        isSelected: false,
        startInterval: { h: 8, m: 30 },
        intervalLabel: '8h30 - 9h',
      },
      {
        isSelected: false,
        startInterval: { h: 9, m: 0 },
        intervalLabel: '9h - 9h30',
      },
      {
        isSelected: false,
        startInterval: { h: 9, m: 30 },
        intervalLabel: '9h30 - 10h',
      },
      {
        isSelected: false,
        startInterval: { h: 10, m: 0 },
        intervalLabel: '10h - 10h30',
      },
      {
        isSelected: false,
        startInterval: { h: 10, m: 30 },
        intervalLabel: '10h30 - 11h',
      },
      {
        isSelected: false,
        startInterval: { h: 11, m: 0 },
        intervalLabel: '11h - 11h30',
      },
      {
        isSelected: false,
        startInterval: { h: 11, m: 30 },
        intervalLabel: '11h30 - 12h',
      },
      {
        isSelected: false,
        startInterval: { h: 12, m: 0 },
        intervalLabel: '12h - 12h30',
      },
      {
        isSelected: false,
        startInterval: { h: 12, m: 30 },
        intervalLabel: '12h30 - 13h',
      },
      {
        isSelected: false,
        startInterval: { h: 13, m: 0 },
        intervalLabel: '13h - 13h30',
      },
      {
        isSelected: false,
        startInterval: { h: 13, m: 30 },
        intervalLabel: '13h30 - 14h',
      },
      {
        isSelected: false,
        startInterval: { h: 14, m: 0 },
        intervalLabel: '14h - 14h30',
      },
      {
        isSelected: false,
        startInterval: { h: 14, m: 30 },
        intervalLabel: '14h30 - 15h',
      },
      {
        isSelected: false,
        startInterval: { h: 15, m: 0 },
        intervalLabel: '15h - 15h30',
      },
      {
        isSelected: false,
        startInterval: { h: 15, m: 30 },
        intervalLabel: '15h30 - 16h',
      },
      {
        isSelected: false,
        startInterval: { h: 16, m: 0 },
        intervalLabel: '16h - 16h30',
      },
      {
        isSelected: false,
        startInterval: { h: 16, m: 30 },
        intervalLabel: '16h30 - 17h',
      },
      {
        isSelected: false,
        startInterval: { h: 17, m: 0 },
        intervalLabel: '17h - 17h30',
      },
      {
        isSelected: false,
        startInterval: { h: 17, m: 30 },
        intervalLabel: '17h30 - 18h',
      },
      {
        isSelected: false,
        startInterval: { h: 18, m: 0 },
        intervalLabel: '18h - 18h30',
      },
      {
        isSelected: false,
        startInterval: { h: 18, m: 30 },
        intervalLabel: '18h30 - 19h',
      },
      {
        isSelected: false,
        startInterval: { h: 19, m: 0 },
        intervalLabel: '19h - 19h30',
      },
      {
        isSelected: false,
        startInterval: { h: 19, m: 30 },
        intervalLabel: '19h30 - 20h',
      },
      {
        isSelected: false,
        startInterval: { h: 20, m: 0 },
        intervalLabel: '20h - 20h30',
      },
      {
        isSelected: false,
        startInterval: { h: 20, m: 30 },
        intervalLabel: '20h30 - 21h',
      },
      {
        isSelected: false,
        startInterval: { h: 21, m: 0 },
        intervalLabel: '21h - 21h30',
      },
      {
        isSelected: false,
        startInterval: { h: 21, m: 30 },
        intervalLabel: '21h30 - 22h',
      },
      {
        isSelected: false,
        startInterval: { h: 22, m: 0 },
        intervalLabel: '22h - 22h30',
      },
      {
        isSelected: false,
        startInterval: { h: 22, m: 30 },
        intervalLabel: '22h30 - 23h',
      },
      {
        isSelected: false,
        startInterval: { h: 23, m: 0 },
        intervalLabel: '23h - 23h30',
      },
      {
        isSelected: false,
        startInterval: { h: 23, m: 30 },
        intervalLabel: '23h30 - 24h',
      },
    ],
  }

  if (!loading && availableTime !== []) {
    const startTimeIntervalArray = availableTime.map((item) => {
      return {
        startInterval: item.startTimeInterval,
      }
    })

    const test = startTimeIntervalArray.map((item) => {
      return {
        startInterval: {
          h: getHours(new Date(item.startInterval)),
          m: getMinutes(new Date(item.startInterval)),
        },
      }
    })

    const cloneValues = [...initialValues.availableTime]

    const newCloneValues = cloneValues.map((item) => {
      return {
        startInterval: item.startInterval,
      }
    })

    test.forEach(function (item) {
      console.log(item, 'is at position', newCloneValues.indexOf(item))
    })
    // for (var i = 0, len = cloneValues.availableTime.length; i < len; i++) {
    //   if (cloneValues.availableTime[i].startInterval === )
    // }

    console.log('new array', test)
  }

  useEffect(() => {
    dispatch(getCurrentAvailableTime())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue }) => (
        <Form>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ backgroundColor: '#e6e6e6', padding: '2em 3em' }}
          >
            <Grid item>
              <Typography variant="h4" style={{ textTransform: 'uppercase' }}>
                Đặt thời gian dạy
              </Typography>
            </Grid>
            <Grid item container directon="column">
              <Grid item>
                <Typography variant="body1">Chú thích:</Typography>
              </Grid>
              <Grid
                item
                container
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <CheckBoxOutlineBlankIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        Thời gian trong ngày
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <CheckBoxOutlineBlankIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        Thời gian có thể dạy
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  * Click vào ô để mở thời gian bạn có thể dạy.
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Field component={DatePicker} name="selectedDate" />
              </Grid>

              <Grid item>
                <Card>
                  <CardContent style={{ padding: 0 }}>
                    <Grid container alignItems="center" direction="column">
                      <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        style={{
                          padding: '0.5em 1em 0.5em',
                          backgroundColor: '#f4de39',
                        }}
                      >
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              const result = subDays(values.selectedDate, 1)
                              setFieldValue('selectedDate', result)
                            }}
                          >
                            <ArrowBackIcon fontSize="large" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          {format(values.selectedDate, 'EEEE, dd/MM/yyyy', {
                            locale: vi,
                          })}
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              const result = add(values.selectedDate, {
                                days: 1,
                              })
                              setFieldValue('selectedDate', result)
                            }}
                          >
                            <ArrowForwardIcon fontSize="large" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        justify="flex-start"
                        alignItems="center"
                        style={{ maxWidth: '50em' }}
                        spacing={1}
                      >
                        {values.availableTime.map((interval, index) => (
                          <Grid item key={index} style={{ marginTop: '1em' }}>
                            <Field
                              type="checkbox"
                              name={`availableTime[${index}].isSelected`}
                              component={CheckboxWithLabel}
                              Label={{
                                label: interval.intervalLabel,
                                labelPlacement: 'top',
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={2}
              style={{ marginTop: '1em' }}
            >
              <Grid item>
                <MyButton component={Link} to="/teachers/dashboard">
                  Trở về
                </MyButton>
              </Grid>

              <Grid item>
                <MyButton type="submit">Xác nhận</MyButton>
              </Grid>
            </Grid>
            <Grid item>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default SetAvailableTime
