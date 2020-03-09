const { check } = require('express-validator');

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Need to be a valid email address'),
    check('password').isLength({min: 6}).withMessage('Password has a minimum length of 6 characters')
];


exports.userSigninValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Need to be a valid email address'),
    check('password').isLength({min: 6}).withMessage('Password has a minimum length of 6 characters')
];