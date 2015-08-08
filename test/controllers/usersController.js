module.exports = function() {

    function index(req, res) {
        res.end('usersController index');
    }

    function get(req, res) {
        res.end('usersController get');
    }

    return {
        index: index,
        get: get
    };

};