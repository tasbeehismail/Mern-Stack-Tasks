import Joi from 'joi';

const signUp = Joi.object({
  firstName: Joi.string().min(3).max(50).trim().required().messages({
    'any.required': 'First name is required.',
    'string.empty': 'First name cannot be empty.',
    'string.min': 'First name must be at least {#limit} characters long.',
    'string.max': 'First name cannot exceed {#limit} characters.',
  }),
  lastName: Joi.string().min(3).max(50).trim().required().messages({
    'any.required': 'Last name is required.',
    'string.empty': 'Last name cannot be empty.',
    'string.min': 'Last name must be at least {#limit} characters long.',
    'string.max': 'Last name cannot exceed {#limit} characters.',
  }),
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(6).max(128).pattern(/^[a-zA-Z0-9]{3,30}$/).required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
    'string.min': 'Password must be at least {#limit} characters long.',
    'string.max': 'Password cannot exceed {#limit} characters.',
    'string.pattern.base': 'Password must only contain letters and numbers and be between 3 to 30 characters long.',
  }),
});

const logIn = Joi.object({
  loginField: Joi.alternatives().try(
    Joi.string().email().required().trim().messages({
      'any.required': 'Email is required for login.',
      'string.empty': 'Email cannot be empty for login.',
      'string.email': 'Please provide a valid email address for login.',
    }),
    Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
      'any.required': 'Mobile number is required for login.',
      'string.empty': 'Mobile number cannot be empty for login.',
      'string.pattern.base': 'Please provide a valid 10-digit mobile number for login.',
    }),
    Joi.string().email().required().messages({
      'any.required': 'Recovery email is required for login.',
      'string.empty': 'Recovery email cannot be empty for login.',
      'string.email': 'Please provide a valid recovery email address for login.',
    })
  ).required().messages({
    'any.required': 'Login field is required.',
    'alternatives.match': 'Login field must be one of: email, mobile number, recovery email.',
  }),
  password: Joi.string().min(6).max(128).pattern(/^[a-zA-Z0-9]{3,30}$/).required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
    'string.min': 'Password must be at least {#limit} characters long.',
    'string.max': 'Password cannot exceed {#limit} characters.',
  }),
})

const verifyEmail = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email should be a type of text',
    'string.empty': 'Email cannot be an empty field',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is a required field',
  }),
  otp: Joi.string().length(4).required().messages({
    'string.base': 'OTP should be a type of text',
    'string.empty': 'OTP cannot be an empty field',
    'string.length': 'OTP should be exactly 4 characters long',
    'any.required': 'OTP is a required field',
  }),
});

export {
  signUp,
  logIn,
  verifyEmail
};