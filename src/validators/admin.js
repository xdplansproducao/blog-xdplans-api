const { z } = require('zod');

exports.adminClientCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  document: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  temporaryPassword: z.string().min(6).optional()
});

exports.adminClientUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  document: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional()
});

exports.adminQuoteCreateSchema = z.object({
  clientId: z.string(),
  title: z.string().min(2),
  scope: z.string().optional(),
  priceCents: z.number().int().min(0),
  status: z.enum(['pending', 'approved', 'rejected', 'paid']),
  validUntil: z.string().optional(),
  tags: z.array(z.string()).optional()
});

exports.adminQuoteStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'paid'])
});

exports.adminProjectUpdateSchema = z.object({
  status: z.enum(['active', 'paused', 'completed', 'cancelled']).optional(),
  phase: z.string().optional(),
  notes: z.string().optional(),
  dueAt: z.string().optional()
});

exports.adminTicketStatusSchema = z.object({
  status: z.enum(['open', 'closed', 'pending'])
});

exports.adminTicketMessageSchema = z.object({
  message: z.string().min(1)
});
