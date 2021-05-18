// @route      GET /getLocation
// @desc       Get macine location
// @access     Public
const getLocation = (req, res) => {
  try {
    const location = [
      {
        lattitude: 18.553349278029742,
        longitude: 73.79711263499385,
        mach_id: ['machine1', 'machine3'],
        city: 'Pune'
      },
      {
        lattitude: 19.076,
        longitude: 72.8777,
        mach_id: ['machine2'],
        city: 'Mumbai'
      }
    ];
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getLocation = getLocation;
