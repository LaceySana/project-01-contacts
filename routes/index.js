const router = require('express').Router();

// eslint-disable-next-line no-unused-vars
router.use('/api-docs', (req, res) => {
    // #swagger.ignore = true
    return require('./swagger');
});
router.use('/contacts', require('./contacts'));

module.exports = router;
