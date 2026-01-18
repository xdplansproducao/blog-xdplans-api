const { z } = require('zod');

exports.clientLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

exports.clientRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  phone: z.string().optional(),
  company: z.string().optional(),
  document: z.string().optional()
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'As senhas n\u00e3o conferem'
    });
  }
});

exports.clientUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  document: z.string().optional()
});

exports.clientChangePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});

exports.ticketCreateSchema = z.object({
  subject: z.string().min(3),
  message: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high'])
});

exports.ticketMessageSchema = z.object({
  message: z.string().min(1)
});

exports.clientQuoteCreateSchema = z.object({
  title: z.string().min(3).max(200),
  scope: z.string().min(10).optional(),
  priceCents: z.number().int().positive(),
  validUntil: z.string().datetime().optional(),
  tags: z.array(z.string()).optional()
});
