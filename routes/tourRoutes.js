const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.param('id', tourController.checkID); // middleware to check if the id is valid
// ROUTES START
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
// ROUTES END
module.exports = router;
