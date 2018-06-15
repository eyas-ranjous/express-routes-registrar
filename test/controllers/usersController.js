class UsersController {
  getAll(req, res) {
    res.end('/users GET');
  }

  get(req, res) {
    res.end('/users/:id GET');
  }

  add(req, res) {
    res.end('/users POST');
  }

  update(req, res) {
    res.end('/users/:id PUT');
  }

  remove(req, res) {
    res.end('/users/:id DELETE');
  }
}

module.exports = UsersController;
