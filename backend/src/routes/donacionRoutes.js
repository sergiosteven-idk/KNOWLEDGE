const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { crearDonacion } = require('../controllers/donacionController');

router.post('/', auth, crearDonacion);

module.exports = router;
