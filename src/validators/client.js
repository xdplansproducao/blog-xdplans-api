const { z } = require('zod');

exports.clientLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
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
