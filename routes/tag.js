const express = require('express')
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tag')

// validators
const { runValidation } = require('../validators');
const { tagValidator } = require('../validators/tag');

router.post('/tag', tagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', remove)

module.exports = router;