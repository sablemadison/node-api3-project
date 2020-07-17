

function logger(req, res) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next()
}

module.exports = logger;