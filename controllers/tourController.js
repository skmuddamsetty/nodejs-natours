const fs = require('fs');
const file = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`);
let tours;
if (file) {
  tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
}
// ROUTE HANDLERS START
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours ? tours.length : 0,
    data: {
      tours
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: 'Updated Tour Here' } });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(204).json({ status: 'success', data: null });
};
// ROUTE HANDLERS END
