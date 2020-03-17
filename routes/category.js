const express = require('express')
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/category')

// validators
const { runValidation } = require('../validators');
const { categoryValidator } = require('../validators/category');

router.post('/category', categoryValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', remove)

module.exports = router;