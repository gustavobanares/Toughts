const express = require('express')
const router = express.Router()
const ToughController = require('../controllers/ToughController')

// controller

router.get('/', ToughController.showToughts)

module.exports = router 