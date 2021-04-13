import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Formik, Form } from 'formik'

const VnpayForm = () => {
  const initialValues = {}
  const onSubmit = () => {}

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => <Form autoComplete="off"></Form>}
    </Formik>
  )
}

export default VnpayForm
