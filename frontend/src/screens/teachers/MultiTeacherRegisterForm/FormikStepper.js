import React, { useState } from 'react'
import { Formik, Form } from 'formik'
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
} from '@material-ui/core'

const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  const [completed, setCompleted] = useState(false)

  const isLastStep = () => step === childrenArray.length - 1

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(true)
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
    >
      {({ isSubmitting, values, errors }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? 'Đang gửi'
                  : isLastStep()
                  ? 'Gửi đăng ký'
                  : 'Tiếp tục'}
              </Button>
            </Grid>
          </Grid>
          <div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormikStepper