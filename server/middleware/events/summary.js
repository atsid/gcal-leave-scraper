module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    res.json({
      myStart: startDate,
      myEnd: endDate,
    });

    res.end();
  }
};
