module.exports = function() {

    function index(req, res) {
        res.end('homeController index');
    }

    function about(req, res) {
        res.end('homeController about');
    }

    return {
        index: index,
        about: about
    };

};