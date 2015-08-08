module.exports = function() {

    function getAll(req, res) {
        res.end('testsController getAll');
    }

    function get(req, res) {
        res.end('testsController get');
    }

    function add(req, res) {
        res.end('testsController add');
    }

    function update(req, res) {
        res.end('testsController update');
    }

    function remove(req, res) {
        res.end('testsController remove');
    }

    return {
        getAll: getAll,
        get: get,
        add: add,
        update: update,
        remove: remove
    };

};