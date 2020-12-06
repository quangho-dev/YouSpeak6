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
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import React, { useState } from 'react'
import { mixed, number, object, string } from 'yup'
import FormikStep from './FormikStep'
import FormikStepper from './FormikStepper'
import * as Yup from 'yup'

const FormRegisterTeacher = () => {
  return (
    <div style={{ backgroundColor: '#888', minHeight: '100vh  ' }}>
      <Card>
        <CardContent>
          <FormikStepper
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              degreeImages: [],
              expImages: [],
            }}
            onSubmit={async (values) => {}}
          >
            <FormikStep
              label="Đăng ký tài khoản"
              validationSchema={object({
                name: string().required('Bạn cần điền tên hiển thị'),
                email: string()
                  .email('Định dạng của email không đúng')
                  .required('Bạn cần điền email'),
                password: string()
                  .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
                  .required('Bạn cần điền mật khẩu'),
                confirmPassword: string()
                  .oneOf(
                    [Yup.ref('password'), null],
                    'Mật khẩu không trùng khớp'
                  )
                  .required('Bạn cần điền xác nhận mật khẩu'),
              })}
            >
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="name"
                  component={TextField}
                  label="Tên hiển thị"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="email"
                  component={TextField}
                  label="Email"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="password"
                  type="password"
                  component={TextField}
                  label="Mật khẩu"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  component={TextField}
                  label="Xác nhận mật khẩu"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormRegisterTeacher
