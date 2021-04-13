import express from 'express'
const router = express.Router()
import config from 'config'
import dateFormat from 'dateformat'
import sha256 from 'sha256'
import querystring from 'qs'

router.post('/create_payment_url', function (req, res, next) {
  var ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  var tmnCode = config.get('vnp_TmnCode')
  var secretKey = config.get('vnp_HashSecret')
  var vnpUrl = config.get('vnp_Url')
  var returnUrl = config.get('vnp_ReturnUrl')

  var date = new Date()

  var createDate = dateFormat(date, 'yyyymmddHHmmss')
  var orderId = dateFormat(date, 'HHmmss')
  var amount = req.body.amount
  var bankCode = req.body.bankCode

  var orderInfo = req.body.orderDescription
  var orderType = req.body.orderType
  var locale = req.body.language
  if (locale === null || locale === '') {
    locale = 'vn'
  }
  var currCode = 'VND'
  var vnp_Params = {}
  vnp_Params['vnp_Version'] = '2'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = tmnCode
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale
  vnp_Params['vnp_CurrCode'] = currCode
  vnp_Params['vnp_TxnRef'] = orderId
  vnp_Params['vnp_OrderInfo'] = orderInfo
  vnp_Params['vnp_OrderType'] = orderType
  vnp_Params['vnp_Amount'] = amount * 100
  vnp_Params['vnp_ReturnUrl'] = returnUrl
  vnp_Params['vnp_IpAddr'] = ipAddr
  vnp_Params['vnp_CreateDate'] = createDate
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode
  }

  vnp_Params = sortObject(vnp_Params)

  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false })

  var secureHash = sha256(signData)

  vnp_Params['vnp_SecureHashType'] = 'SHA256'
  vnp_Params['vnp_SecureHash'] = secureHash
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true })

  //Neu muon dung Redirect thi dong dong ben duoi
  res.status(200).json({ code: '00', data: vnpUrl })
  //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
  // res.redirect(vnpUrl)
})

router.get('/vnpay_return', function (req, res, next) {
  var vnp_Params = req.query

  var secureHash = vnp_Params['vnp_SecureHash']

  delete vnp_Params['vnp_SecureHash']
  delete vnp_Params['vnp_SecureHashType']

  vnp_Params = sortObject(vnp_Params)

  var tmnCode = config.get('vnp_TmnCode')
  var secretKey = config.get('vnp_HashSecret')

  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false })

  var checkSum = sha256(signData)

  if (secureHash === checkSum) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    // res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
  } else {
    // res.render('success', { code: '97' })
  }
})

function sortObject(o) {
  var sorted = {},
    key,
    a = []

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key)
    }
  }

  a.sort()

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]]
  }
  return sorted
}

export default router