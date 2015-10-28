module.exports = (req, res) => {
  res.json({
    options: ['GET'],
    links: {
      'current': '/auth/current',
      'google': '/auth/google',
    },
  });

  res.end();
};
