onst express = require('express');

const authenticate = require('./authenticate');

const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		message: 'Testing',
	});
});

router.use('/auth', authenticate);

module.exports = router;