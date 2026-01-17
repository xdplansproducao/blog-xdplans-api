const rateLimit = require('express-rate-limit');

module.exports = (opts) => rateLimit({
  windowMs: opts.windowMs || 15 * 60 * 1000,
  max: opts.max || 5,
  message: { success: false, data: null, message: 'Muitas tentativas, tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false
});
