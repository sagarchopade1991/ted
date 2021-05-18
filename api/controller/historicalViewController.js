// @route      GET /getHistoryResults
// @desc       Get Historical data
// @access     Public
const getHistoryResults = (req, res) => {
  try {
    var uploadData = {
      "origImg": "../../assets/img/maskImage/orig1.jpeg",
      "maskImg": "../../assets/img/maskImage/mask1.jpeg",
      "demoId": "123"
  
  }
  const historicalResult = [
    {
      id: req.query.demoId,
      resultImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg',
      origImg: "../../assets/img/maskImage/orig1.jpeg",
      maskImg: "../../assets/img/maskImage/mask1.jpeg",
    },

    {
      id: req.query.demoId,
      resultImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg',
      origImg: "../../assets/img/maskImage/04.jpeg",
      maskImg: "../../assets/img/maskImage/04-res.jpeg",
    }  ];
    // const historicalResult = [
    //   {
    //     id: req.query.demoId,
    //     origImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg',
    //     resultImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg'
    //   }
    // ];
    res.json(historicalResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getHistoryResults = getHistoryResults;
