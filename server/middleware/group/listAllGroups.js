const selected = 10;
const groups = [
  {
    id: 0,
    label: 'All',
    edit: false,
  },
  {
    id: 10,
    label: 'Corporate',
    edit: true,
  },
  {
    id: 20,
    label: 'Systems',
    edit: true,
  },
  {
    id: 30,
    label: 'MSG',
    edit: true,
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
