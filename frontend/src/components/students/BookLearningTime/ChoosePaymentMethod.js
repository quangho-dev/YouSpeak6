import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Paypal from './PaymentMethods/Paypal'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useFormikContext } from 'formik'
import api from '../../../utils/api'

const ChoosePaymentMethod = () => {
  const { values } = useFormikContext()

  const handleVnpayClick = async () => {
    const data = { amount: values.price }

    try {
      const res = await api.post('/vnpay/create_payment_url', data)

      console.log('res', res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item style={{ marginBottom: '1em' }}>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
        >
          Chọn phương thức thanh toán
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction="column"
        style={{ width: '30%', marginBottom: '1em' }}
      >
        <Grid item>
          <Typography variant="h6">Vnpay:</Typography>
        </Grid>
        <Grid item>
          <MyButton onClick={handleVnpayClick}>Thanh toán bằng VNPAY</MyButton>
        </Grid>
      </Grid>

      <Grid item container direction="column" style={{ width: '30%' }}>
        <Grid item>
          <Typography variant="h6">Paypal:</Typography>
        </Grid>
        <Grid item>
          <Paypal />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChoosePaymentMethod
