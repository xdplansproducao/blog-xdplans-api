/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const Client = require('../models/Client');
const Quote = require('../models/Quote');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const TicketMessage = require('../models/TicketMessage');
const bcrypt = require('bcrypt');

const seedClients = async () => {
  try {
    console.log('🌱 Iniciando seed de clientes...\n');

    // Limpar dados existentes (comentar se quiser preservar)
    // await Client.deleteMany({});
    // await Quote.deleteMany({});
    // await Project.deleteMany({});
    // await Ticket.deleteMany({});
    // await TicketMessage.deleteMany({});

    const clients = [
      // 1. CLIENTE PREMIUM - Ativo com múltiplos projetos, quotes e tickets
      {
        name: 'João Silva',
        email: 'joao.silva@techcorp.com.br',
        phone: '(11) 99999-0001',
        company: 'TechCorp Solutions',
        document: '12.345.678/0001-90',
        status: 'active',
        password: 'senha123'
      },
      // 2. CLIENTE STARTUP - Ativo, mais simples, com um projeto em desenvolvimento
      {
        name: 'Maria Santos',
        email: 'maria@startupai.com.br',
        phone: '(21) 99999-0002',
        company: 'StartupAI',
        document: '98.765.432/0001-10',
        status: 'active',
        password: 'senha123'
      },
      // 3. CLIENTE INATIVO - Antiga empresa, sem atividade recente
      {
        name: 'Carlos Mendes',
        email: 'carlos@oldcompany.com.br',
        phone: '(31) 99999-0003',
        company: 'OldCompany Ltda',
        document: '55.555.555/0001-55',
        status: 'inactive',
        password: 'senha123'
      },
      // 4. CLIENTE COM MUITOS TICKETS - Suporte intensivo
      {
        name: 'Amanda Costa',
        email: 'amanda.costa@ecommerce.com.br',
        phone: '(85) 99999-0004',
        company: 'E-commerce Brasil',
        document: '77.777.777/0001-77',
        status: 'active',
        password: 'senha123'
      },
      // 5. CLIENTE FREELANCER - Pessoa física, projeto simples
      {
        name: 'Rafael Oliveira',
        email: 'rafael.freelancer@email.com.br',
        phone: '(41) 99999-0005',
        company: 'Rafael Freelancer',
        document: '123.456.789-00',
        status: 'active',
        password: 'senha123'
      },
      // 6. CLIENTE CORPORATIVO - Grande empresa, múltiplas quotes pendentes
      {
        name: 'Patricia Gomes',
        email: 'pgomes@bigcorp.com.br',
        phone: '(11) 99999-0006',
        company: 'Big Corporation Brasil',
        document: '11.222.333/0001-44',
        status: 'active',
        password: 'senha123'
      },
    ];

    const createdClients = [];
    
    for (const clientData of clients) {
      const existing = await Client.findOne({ email: clientData.email });
      
      if (!existing) {
        const passwordHash = await bcrypt.hash(clientData.password, 10);
        const newClient = await Client.create({
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          company: clientData.company,
          document: clientData.document,
          status: clientData.status,
          passwordHash,
        });
        createdClients.push(newClient);
        console.log(`✅ Cliente criado: ${clientData.name} (${clientData.email})`);
      } else {
        console.log(`ℹ️  Cliente já existe: ${clientData.email}`);
        createdClients.push(existing);
      }
    }

    // ============================================
    // QUOTES E PROJETOS POR CLIENTE
    // ============================================

    // CLIENTE 1: João Silva - Cliente Premium
    if (createdClients[0]) {
      const client = createdClients[0];
      
      // Quote 1: Aprovada (pago)
      const quote1 = await Quote.findOne({ 
        clientId: client._id, 
        title: 'Redesign Completo do Site' 
      }).catch(() => null);
      
      if (!quote1) {
        const newQuote1 = await Quote.create({
          clientId: client._id,
          title: 'Redesign Completo do Site',
          scope: 'Redesign de todas as páginas, nova estrutura de navegação, otimização mobile e SEO',
          priceCents: 1500000, // R$ 15.000
          status: 'paid',
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          tags: ['design', 'desenvolvimento', 'seo'],
        });

        // Projeto ativo associado à quote
        const project1 = await Project.create({
          clientId: client._id,
          quoteId: newQuote1._id,
          status: 'active',
          phase: 'Desenvolvimento Frontend',
          notes: 'Utilizando Next.js 14 e Tailwind CSS. Em progresso: Componentes de landing page',
          dueAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        // Ticket aberto para este projeto
        const ticket1 = await Ticket.create({
          clientId: client._id,
          projectId: project1._id,
          subject: 'Implementar animações na seção hero',
          priority: 'medium',
          status: 'open',
        });

        // Mensagens no ticket
        await TicketMessage.create({
          ticketId: ticket1._id,
          authorType: 'client',
          authorId: client._id,
          message: 'Precisamos de animações mais fluidas na seção hero. Algo com Framer Motion seria ideal.',
        });

        await TicketMessage.create({
          ticketId: ticket1._id,
          authorType: 'admin',
          authorId: '000000000000000000000000',
          message: 'Entendido! Vou implementar com Framer Motion. Será feito até amanhã.',
        });

        console.log('   └─ 1 Quote, 1 Projeto Ativo, 1 Ticket com 2 mensagens');
      }

      // Quote 2: Pendente (não aprovada)
      const quote2 = await Quote.findOne({
        clientId: client._id,
        title: 'Integração de E-commerce'
      }).catch(() => null);

      if (!quote2) {
        await Quote.create({
          clientId: client._id,
          title: 'Integração de E-commerce',
          scope: 'Implementar plataforma de vendas com carrinho, pagamento e gestão de pedidos',
          priceCents: 2500000, // R$ 25.000
          status: 'pending',
          validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          tags: ['ecommerce', 'pagamento', 'integracao'],
        });
        console.log('   └─ 1 Quote Pendente adicional');
      }
    }

    // CLIENTE 2: Maria Santos - StartupAI
    if (createdClients[1]) {
      const client = createdClients[1];
      
      const existingQuote = await Quote.findOne({
        clientId: client._id,
        title: 'Desenvolvimento do MVP'
      }).catch(() => null);

      if (!existingQuote) {
        const quote = await Quote.create({
          clientId: client._id,
          title: 'Desenvolvimento do MVP',
          scope: 'Plataforma de IA para análise de sentimentos. Frontend React + Backend Node.js',
          priceCents: 3000000, // R$ 30.000
          status: 'approved',
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          tags: ['ia', 'machine-learning', 'saas'],
        });

        const project = await Project.create({
          clientId: client._id,
          quoteId: quote._id,
          status: 'active',
          phase: 'Integração de APIs',
          notes: 'API de IA do OpenAI integrada. Falta integração com banco de dados e testes',
          dueAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        });

        // Ticket sem mensagens (simples)
        await Ticket.create({
          clientId: client._id,
          projectId: project._id,
          subject: 'Documentar endpoints da API',
          priority: 'high',
          status: 'open',
        });

        console.log('   └─ 1 Quote Aprovado, 1 Projeto, 1 Ticket');
      }
    }

    // CLIENTE 3: Carlos Mendes - Inativo
    if (createdClients[2]) {
      const client = createdClients[2];
      
      const existingQuote = await Quote.findOne({
        clientId: client._id,
        title: 'Site Corporativo 2024'
      }).catch(() => null);

      if (!existingQuote) {
        const quote = await Quote.create({
          clientId: client._id,
          title: 'Site Corporativo 2024',
          scope: 'Site simples com páginas estáticas',
          priceCents: 500000, // R$ 5.000
          status: 'rejected',
          validUntil: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Expirado
          tags: ['site', 'corporativo'],
        });

        console.log('   └─ 1 Quote Rejeitada e Expirada (cliente inativo)');
      }
    }

    // CLIENTE 4: Amanda Costa - E-commerce com muitos tickets
    if (createdClients[3]) {
      const client = createdClients[3];
      
      const existingQuote = await Quote.findOne({
        clientId: client._id,
        title: 'Loja Virtual Completa'
      }).catch(() => null);

      if (!existingQuote) {
        const quote = await Quote.create({
          clientId: client._id,
          title: 'Loja Virtual Completa',
          scope: 'Plataforma de e-commerce em WooCommerce com integração de pagamentos e logística',
          priceCents: 800000, // R$ 8.000
          status: 'paid',
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          tags: ['ecommerce', 'woocommerce', 'integracao'],
        });

        const project = await Project.create({
          clientId: client._id,
          quoteId: quote._id,
          status: 'active',
          phase: 'Testes e Ajustes',
          notes: 'Loja em produção. Ajustes finais e testes de performance',
          dueAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        });

        // Múltiplos tickets (suporte intensivo)
        const ticketSubjects = [
          { subject: 'Produtos não aparecem corretamente no mobile', priority: 'high', status: 'open' },
          { subject: 'Plugin de frete não calcula correto', priority: 'high', status: 'open' },
          { subject: 'Cupom de desconto não está funcionando', priority: 'medium', status: 'pending' },
          { subject: 'Página de checkout muito lenta', priority: 'high', status: 'open' },
          { subject: 'Integração com Mercado Pago com erro', priority: 'high', status: 'open' },
          { subject: 'Email de confirmação não é enviado', priority: 'medium', status: 'closed' },
        ];

        for (const ticketData of ticketSubjects) {
          const existingTicket = await Ticket.findOne({
            clientId: client._id,
            subject: ticketData.subject
          }).catch(() => null);

          if (!existingTicket) {
            const ticket = await Ticket.create({
              clientId: client._id,
              projectId: project._id,
              subject: ticketData.subject,
              priority: ticketData.priority,
              status: ticketData.status,
            });

            // Adicionar mensagem ao primeiro ticket para variedade
            if (ticketData.priority === 'high' && ticketData.status === 'open') {
              await TicketMessage.create({
                ticketId: ticket._id,
                authorType: 'client',
                authorId: client._id,
                message: 'Isso está afetando nossas vendas! Precisa ser urgente!',
              });
            }
          }
        }

        console.log('   └─ 1 Quote Pago, 1 Projeto, 6 Tickets com vários status');
      }
    }

    // CLIENTE 5: Rafael Oliveira - Freelancer simples
    if (createdClients[4]) {
      const client = createdClients[4];
      
      const existingQuote = await Quote.findOne({
        clientId: client._id,
        title: 'Portfólio Online'
      }).catch(() => null);

      if (!existingQuote) {
        const quote = await Quote.create({
          clientId: client._id,
          title: 'Portfólio Online',
          scope: 'Site com portfólio de projetos, integração com redes sociais e formulário de contato',
          priceCents: 300000, // R$ 3.000
          status: 'pending',
          validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          tags: ['portifolio', 'freelancer', 'simples'],
        });

        console.log('   └─ 1 Quote Pendente (cliente freelancer)');
      }
    }

    // CLIENTE 6: Patricia Gomes - Corporativa com várias quotes
    if (createdClients[5]) {
      const client = createdClients[5];
      
      const existingQuotes = await Quote.find({
        clientId: client._id,
      }).catch(() => []);

      if (existingQuotes.length === 0) {
        // Quote 1
        const quote1 = await Quote.create({
          clientId: client._id,
          title: 'Plataforma de Gestão Interna',
          scope: 'Aplicação web para gestão de RH, folha de ponto, férias e benefícios',
          priceCents: 5000000, // R$ 50.000
          status: 'pending',
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          tags: ['rh', 'gestao', 'saas', 'corporativo'],
        });

        // Quote 2
        const quote2 = await Quote.create({
          clientId: client._id,
          title: 'Reforma do Site Corporativo',
          scope: 'Novo design, otimização de performance, migração para Headless CMS',
          priceCents: 2000000, // R$ 20.000
          status: 'pending',
          validUntil: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
          tags: ['design', 'seo', 'cms', 'performance'],
        });

        // Quote 3 - Aprovada
        const quote3 = await Quote.create({
          clientId: client._id,
          title: 'Integração Zapier',
          scope: 'Integrar sistemas internos com ferramentas de automação Zapier',
          priceCents: 800000, // R$ 8.000
          status: 'approved',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          tags: ['integracao', 'zapier', 'automacao'],
        });

        const project = await Project.create({
          clientId: client._id,
          quoteId: quote3._id,
          status: 'active',
          phase: 'Desenvolvimento',
          notes: 'Criando webhooks e triggers customizados para fluxos de negócio',
          dueAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });

        const ticket = await Ticket.create({
          clientId: client._id,
          projectId: project._id,
          subject: 'Definir estrutura dos webhooks',
          priority: 'high',
          status: 'open',
        });

        await TicketMessage.create({
          ticketId: ticket._id,
          authorType: 'client',
          authorId: client._id,
          message: 'Preciso que os webhooks sigam o padrão de eventos que enviamos.',
        });

        await TicketMessage.create({
          ticketId: ticket._id,
          authorType: 'admin',
          authorId: '000000000000000000000000',
          message: 'Perfeito! Já estou analisando o schema dos seus eventos. Envio a proposta até amanhã.',
        });

        console.log('   └─ 3 Quotes (2 Pendentes, 1 Aprovada), 1 Projeto, 1 Ticket com 2 mensagens');
      }
    }

    console.log('\n✅ Seed de clientes concluído com sucesso!\n');
    console.log('📊 Resumo:');
    console.log(`   - ${createdClients.length} clientes criados/existentes`);
    console.log('   - Variação: Ativos, Inativos, Freelancer, Startup, PME, Corporativa');
    console.log('   - Múltiplos projetos, quotes com diferentes status');
    console.log('   - Tickets com diferentes prioridades e status');
    console.log('   - Mensagens nos tickets para simular interação real');
    console.log('\n💡 Senhas dos clientes: "senha123" para todos\n');
    
  } catch (error) {
    console.error('❌ Erro no seed de clientes:', error);
    throw error;
  }
};

module.exports = { seedClients };
