const express = require('express');
const router = express.Router();
const buffetController = require('../controllers/buffetController');

// Define GET route for fetching buffet requests
router.get('/', buffetController.getBuffetRequests);
router.delete('/:name', buffetController.deleteBuffetByName);
// Define POST route for submitting buffet request
router.post('/', buffetController.submitBuffetRequest);
// Define GET route for fetching buffet stats
router.get('/stats', buffetController.getBuffetStats);

module.exports = router;
