const selected = 0;
const groups = [
  {
    id: 0,
    label: 'All',
    edit: false,
  },
];

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function fetchGroups(req, res) {
  res.json({items: groups, selected: selected});
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchGroups(req, res);
  }
};
