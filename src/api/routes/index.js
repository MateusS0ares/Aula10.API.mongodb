const express = require('express')
const router = express.Router()
const mangas = require('./mangas')
const album = require('./album')

router.use(express.json())
router.use('/mangas', mangas)
router.use('/album', album)


module.exports = router