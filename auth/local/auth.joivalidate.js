const Joi = require('joi');

const registerSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
    password: Joi.string().alphanum().min(6).required(),
})

const registerValidate = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    next();
}

module.exports = {
    registerValidate
}
