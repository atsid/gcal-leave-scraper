const selected = 10;
const filters = [
  {
    id: 10,
    label: 'Leave/OOO',
    value: 'ooo,leave,vacation,holiday,off',
    edit: true,
  },
];

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function fetchFilters(req, res) {
  res.json({items: filters, selected: selected});
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchFilters(req, res);
  }
};
