const groups = [
  {
    id: 0,
    label: 'All',
    edit: false,
  },
  {
    id: 10,
    label: 'Developers',
    edit: true,
  },
  {
    id: 20,
    label: 'Management',
    edit: true,
  },
  {
    id: 30,
    label: 'Front End Devs',
    edit: true,
  },
  {
    id: 40,
    label: 'Back End Devs',
    edit: true,
  },
];

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function fetchGroups(req, res) {
  res.json(groups);
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchGroups(req, res);
  }
};
