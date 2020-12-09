import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/videos')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /mp4/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Chỉ tải file video mp4!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('video'), (req, res) => {
  res.send(`/${req.file.path}`)
})

router.post('/thumbnail', (req, res) => {
  let thumbsFilePath = ''
  let fileDuration = ''

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata)
    console.log(metadata.format.duration)

    fileDuration = metadata.format.duration
  })

  ffmpeg(req.body.filePath)
    .on('filenames', function (filenames) {
      console.log('Will generate ' + filenames.join(', '))
      thumbsFilePath = 'uploads/thumbnails/' + filenames[0]
    })
    .on('end', function () {
      console.log('Screenshots taken')
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      })
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      // %b input basename ( filename w/o extension )
      filename: 'thumbnail-%b.png',
    })
})

export default router
