/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const { generateSlug } = require('../utils/slug');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/env');

const posts = [
  {
    title: 'Como Criar um Site Profissional em 2026: Guia Completo',
    excerpt: 'Descubra os passos essenciais para desenvolver um site moderno, responsivo e otimizado que converta visitantes em clientes.',
    content: `# Como Criar um Site Profissional em 2026

Criar um site profissional vai muito além de apenas ter uma presença online. É necessário pensar em design, performance, SEO e experiência do usuário.

## Planejamento Inicial

Antes de começar, defina:

- **Objetivo**: O que você quer alcançar com o site?
- **Público-alvo**: Quem são seus visitantes?
- **Conteúdo**: Que informações são essenciais?
- **Orçamento**: Quanto pode investir?

## Tecnologias Modernas

Em 2026, as melhores práticas incluem:

- **Next.js** para sites React com SSR
- **WordPress** para gestão de conteúdo
- **Headless CMS** para máxima flexibilidade
- **PWA** para experiência mobile

## Design Responsivo

Seu site deve funcionar perfeitamente em:

- Desktop
- Tablet
- Smartphone

## Performance é Fundamental

- Otimize imagens
- Use CDN
- Minimize JavaScript
- Implemente cache

## Conclusão

Um site profissional é investimento, não custo. Ele é sua vitrine 24/7 e pode ser a diferença entre ganhar ou perder um cliente.`,
    category: 'Engenharia',
    tags: ['web', 'desenvolvimento', 'nextjs', 'react'],
    coverImage: 'blog_cover_1.jpg',
    status: 'published',
    publishedAt: new Date('2026-01-15'),
  },
  {
    title: 'Lojas Virtuais: Como Escolher a Plataforma Ideal',
    excerpt: 'Comparativo das principais plataformas de e-commerce e dicas para escolher a melhor opção para seu negócio.',
    content: `# Lojas Virtuais: Como Escolher a Plataforma Ideal

Escolher a plataforma certa é crucial para o sucesso do seu e-commerce.

## Principais Plataformas

### Shopify
- Ideal para iniciantes
- Facilidade de uso
- Muitos apps disponíveis

### WooCommerce
- Flexibilidade total
- Integração com WordPress
- Custo inicial baixo

### Vtex / Magento
- Para grandes volumes
- Recursos avançados
- Requer mais conhecimento técnico

## O Que Considerar

1. **Volume de vendas esperado**
2. **Orçamento disponível**
3. **Necessidades específicas**
4. **Suporte técnico**

## Integrações Essenciais

- Gateway de pagamento
- Sistema de frete
- ERP
- Marketing automation

## Conclusão

Não existe plataforma perfeita, apenas a mais adequada para seu caso específico.`,
    category: 'E-commerce',
    tags: ['ecommerce', 'shopify', 'woocommerce', 'loja-virtual'],
    coverImage: 'blog_cover_2.jpg',
    status: 'published',
    publishedAt: new Date('2026-01-18'),
  },
  {
    title: 'React Native: Desenvolvendo Apps Nativos com JavaScript',
    excerpt: 'Entenda como o React Native permite criar aplicativos para iOS e Android usando uma única base de código.',
    content: `# React Native: Desenvolvendo Apps Nativos com JavaScript

React Native revolucionou o desenvolvimento mobile ao permitir criar apps nativos usando JavaScript.

## Vantagens do React Native

- **Código único** para iOS e Android
- **Performance nativa**
- **Hot reload** para desenvolvimento rápido
- **Grande comunidade**

## Quando Usar

React Native é ideal para:

- Apps que precisam de performance
- Projetos com orçamento limitado
- Equipes que já conhecem React
- Apps que precisam de recursos nativos

## Desafios Comuns

- Integração com APIs nativas
- Debugging mais complexo
- Atualizações de dependências

## Boas Práticas

- Use TypeScript
- Organize bem a estrutura
- Teste em dispositivos reais
- Otimize imagens e assets

## Conclusão

React Native é uma excelente escolha para a maioria dos projetos mobile modernos.`,
    category: 'Apps',
    tags: ['react-native', 'mobile', 'javascript', 'apps'],
    coverImage: 'blog_cover_3.jpg',
    status: 'published',
    publishedAt: new Date('2026-01-20'),
  },
  {
    title: 'SEO Técnico: Otimizações Essenciais para Seu Site',
    excerpt: 'Aprenda as técnicas de SEO técnico que realmente importam para melhorar o ranking do seu site no Google.',
    content: `# SEO Técnico: Otimizações Essenciais

SEO técnico é a base para qualquer estratégia de marketing digital bem-sucedida.

## Elementos Fundamentais

### 1. Velocidade de Carregamento
- Google prioriza sites rápidos
- Use PageSpeed Insights
- Otimize imagens e código

### 2. Mobile-First
- Design responsivo obrigatório
- Teste em dispositivos móveis
- Evite pop-ups intrusivos

### 3. HTTPS
- Certificado SSL obrigatório
- Google marca sites HTTP como inseguros

### 4. Estrutura de URLs
- URLs limpas e descritivas
- Use hreflang se necessário
- Sitemap XML atualizado

## Schema Markup

Implemente structured data para:

- Artigos
- Produtos
- Avaliações
- Eventos

## Core Web Vitals

Monitore:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## Conclusão

SEO técnico não é opcional. É a fundação que permite outras estratégias funcionarem.`,
    category: 'SEO',
    tags: ['seo', 'google', 'otimizacao', 'performance'],
    coverImage: 'blog_cover_4.jpg',
    status: 'published',
    publishedAt: new Date('2026-01-22'),
  },
  {
    title: 'Performance Web: Técnicas Avançadas de Otimização',
    excerpt: 'Descubra como reduzir o tempo de carregamento do seu site usando técnicas modernas de otimização.',
    content: `# Performance Web: Técnicas Avançadas

Performance é um dos fatores mais importantes para a experiência do usuário e SEO.

## Otimização de Imagens

- Use formatos modernos (WebP, AVIF)
- Implemente lazy loading
- Redimensione antes de fazer upload
- Use CDN para delivery

## Code Splitting

- Divida JavaScript em chunks
- Carregue apenas o necessário
- Use dynamic imports

## Caching Estratégico

- Cache de navegador
- Service Workers
- CDN caching
- Cache de API

## Minificação e Compressão

- Minifique CSS, JS e HTML
- Use Gzip ou Brotli
- Remova código não utilizado

## Monitoramento

Ferramentas essenciais:

- Lighthouse
- WebPageTest
- Chrome DevTools
- Real User Monitoring

## Conclusão

Performance não é um "nice to have", é essencial para conversão e SEO.`,
    category: 'Performance',
    tags: ['performance', 'otimizacao', 'web-vitals', 'lighthouse'],
    coverImage: 'blog_cover_5.jpg',
    status: 'published',
    publishedAt: new Date('2026-01-25'),
  },
  {
    title: 'UX/UI Design: Criando Interfaces que Convertem',
    excerpt: 'Princípios fundamentais de design de interface para criar experiências que encantam e convertem usuários.',
    content: `# UX/UI Design: Criando Interfaces que Convertem

Bom design não é apenas estético, é funcional e estratégico.

## Princípios de UX

### 1. Clareza
- Hierarquia visual clara
- CTA bem definidos
- Navegação intuitiva

### 2. Consistência
- Padrões de design
- Componentes reutilizáveis
- Guia de estilo

### 3. Feedback
- Estados de loading
- Mensagens de erro claras
- Confirmações de ações

## Elementos de UI Modernos

- **Microinterações**: Pequenos detalhes que fazem diferença
- **Espaçamento adequado**: Respiração visual
- **Tipografia legível**: Escolha fontes apropriadas
- **Cores com propósito**: Não apenas estética

## Mobile First

- Design para mobile primeiro
- Touch targets adequados
- Gestos intuitivos

## Acessibilidade

- Contraste adequado
- Navegação por teclado
- Screen readers
- WCAG guidelines

## Conclusão

Design é sobre resolver problemas, não apenas criar coisas bonitas.`,
    category: 'Design',
    tags: ['ux', 'ui', 'design', 'conversao'],
    coverImage: 'blog_cover_6.jpg',
    status: 'published',
    publishedAt: new Date('2026-01-28'),
  },
  {
    title: 'Integração de Pagamentos em E-commerce: Guia Completo',
    excerpt: 'Como integrar gateways de pagamento de forma segura e eficiente na sua loja virtual.',
    content: `# Integração de Pagamentos em E-commerce

A integração de pagamentos é crítica para o sucesso de qualquer loja virtual.

## Principais Gateways

### Mercado Pago
- Popular no Brasil
- Múltiplas formas de pagamento
- Boleto e PIX

### Stripe
- Internacional
- API moderna
- Boa documentação

### PagSeguro
- Confiança do consumidor
- Integração simples
- Suporte local

## Segurança

- **PCI Compliance**: Não armazene dados de cartão
- **HTTPS obrigatório**: Certificado SSL válido
- **Webhooks**: Para confirmação de pagamentos
- **Logs**: Rastreabilidade de transações

## Experiência do Usuário

- Processo de checkout simplificado
- Múltiplas opções de pagamento
- Feedback claro em cada etapa
- Página de confirmação

## Tratamento de Erros

- Mensagens claras
- Retry automático quando possível
- Suporte ao cliente acessível

## Conclusão

Uma boa integração de pagamentos aumenta conversão e reduz abandono de carrinho.`,
    category: 'E-commerce',
    tags: ['pagamento', 'ecommerce', 'integracao', 'seguranca'],
    coverImage: 'blog_cover_7.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-01'),
  },
  {
    title: 'Segurança Web: Boas Práticas Essenciais',
    excerpt: 'Proteja seu site e dados dos usuários implementando medidas de segurança fundamentais.',
    content: `# Segurança Web: Boas Práticas Essenciais

Segurança não é opcional, é obrigatória para qualquer aplicação web.

## Headers de Segurança

Implemente headers HTTP:

- **Content-Security-Policy**: Previne XSS
- **X-Frame-Options**: Previne clickjacking
- **Strict-Transport-Security**: Força HTTPS
- **X-Content-Type-Options**: Previne MIME sniffing

## Autenticação Segura

- Use JWT com expiração curta
- Hash de senhas com bcrypt
- Rate limiting em login
- 2FA quando possível

## Validação de Dados

- Valide no frontend E backend
- Sanitize inputs
- Use prepared statements
- Valide tipos e formatos

## Dependências

- Mantenha atualizadas
- Use ferramentas de scan
- Remova não utilizadas

## Backup e Recuperação

- Backups automáticos
- Teste restauração
- Plano de contingência

## Conclusão

Segurança é um processo contínuo, não um estado final.`,
    category: 'Segurança',
    tags: ['seguranca', 'web', 'headers', 'autenticacao'],
    coverImage: 'blog_cover_8.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-05'),
  },
  {
    title: 'Headless CMS: O Futuro da Gestão de Conteúdo',
    excerpt: 'Entenda como headless CMS oferece flexibilidade e performance superiores para projetos modernos.',
    content: `# Headless CMS: O Futuro da Gestão de Conteúdo

Headless CMS separa gestão de conteúdo da apresentação, oferecendo máxima flexibilidade.

## O Que É Headless CMS

Diferente de CMS tradicional, headless CMS:

- Fornece conteúdo via API
- Permite qualquer frontend
- Escalável e performático
- Desacoplado da apresentação

## Principais Plataformas

- **Strapi**: Open source, auto-hospedado
- **Contentful**: SaaS, fácil de usar
- **Sanity**: Developer-friendly
- **Ghost**: Focado em blogs

## Vantagens

- **Flexibilidade**: Use qualquer tecnologia frontend
- **Performance**: CDN e cache otimizados
- **Escalabilidade**: Backend independente
- **Multi-channel**: Mesmo conteúdo, múltiplos canais

## Quando Usar

Ideal para:

- Sites com múltiplos frontends
- Aplicações JAMstack
- Projetos que precisam de performance
- Equipes com desenvolvedores

## Conclusão

Headless CMS é a evolução natural para projetos que precisam de flexibilidade e performance.`,
    category: 'Engenharia',
    tags: ['cms', 'headless', 'api', 'jamstack'],
    coverImage: 'blog_cover_9.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-08'),
  },
  {
    title: 'Como Criar um Briefing Eficiente para Seu Site',
    excerpt: 'Aprenda a estruturar um briefing completo que facilite o desenvolvimento do seu projeto web.',
    content: `# Como Criar um Briefing Eficiente

Um bom briefing é fundamental para o sucesso de qualquer projeto web.

## Informações Essenciais

### Sobre a Empresa
- História e valores
- Público-alvo
- Diferenciais competitivos

### Objetivos do Site
- O que você quer alcançar?
- KPIs principais
- Conversões esperadas

### Funcionalidades
- Lista detalhada de recursos
- Integrações necessárias
- Formulários e CTAs

## Referências

- Sites que você admira
- Estilo visual desejado
- Funcionalidades de referência

## Conteúdo

- Textos prontos ou rascunhos
- Imagens disponíveis
- Logos e identidade visual
- Vídeos ou outros materiais

## Prazos e Orçamento

- Timeline esperada
- Orçamento disponível
- Prioridades

## Conclusão

Quanto mais detalhado o briefing, melhor será o resultado final.`,
    category: 'Negócios',
    tags: ['briefing', 'planejamento', 'projeto', 'dicas'],
    coverImage: 'blog_cover_10.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-12'),
  },
  {
    title: 'PWA: Transformando Sites em Apps',
    excerpt: 'Saiba como Progressive Web Apps oferecem experiência de app nativo através do navegador.',
    content: `# PWA: Transformando Sites em Apps

Progressive Web Apps combinam o melhor da web e dos apps nativos.

## O Que São PWAs

PWAs são sites que:

- Funcionam offline
- Podem ser instalados
- Enviam notificações push
- Têm ícone na tela inicial

## Benefícios

- **Sem app stores**: Distribuição direta
- **Atualizações instantâneas**: Sem aprovação
- **Menor tamanho**: Comparado a apps nativos
- **Cross-platform**: Uma base de código

## Componentes Essenciais

### Service Worker
- Cache de recursos
- Funcionalidade offline
- Background sync

### Web App Manifest
- Nome e ícones
- Cores do tema
- Modo de exibição

## Casos de Uso

- E-commerce
- Blogs e mídia
- Ferramentas produtividade
- Dashboards

## Conclusão

PWAs são uma excelente opção para muitos projetos que precisam de funcionalidade de app sem a complexidade de desenvolvimento nativo.`,
    category: 'Apps',
    tags: ['pwa', 'progressive-web-app', 'offline', 'service-worker'],
    coverImage: 'blog_cover_11.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-15'),
  },
  {
    title: 'Monitoramento e Manutenção de Sites: Guia Prático',
    excerpt: 'Aprenda a manter seu site sempre funcionando, seguro e atualizado com práticas de monitoramento eficazes.',
    content: `# Monitoramento e Manutenção de Sites

Manutenção preventiva evita problemas maiores no futuro.

## Monitoramento Essencial

### Uptime
- Verifique disponibilidade 24/7
- Alertas de downtime
- Histórico de incidentes

### Performance
- Tempo de resposta
- Core Web Vitals
- Alertas de degradação

### Segurança
- Scan de vulnerabilidades
- Monitoramento de logs
- Alertas de tentativas de invasão

## Manutenção Regular

### Atualizações
- CMS e plugins
- Dependências
- Certificados SSL

### Backups
- Automáticos diários
- Teste de restauração
- Armazenamento seguro

### Conteúdo
- Revisão periódica
- Links quebrados
- Imagens otimizadas

## Ferramentas Recomendadas

- UptimeRobot
- Google Analytics
- Google Search Console
- Lighthouse CI

## Conclusão

Manutenção contínua é investimento que evita custos maiores no futuro.`,
    category: 'Manutenção',
    tags: ['monitoramento', 'manutencao', 'uptime', 'backup'],
    coverImage: 'blog_cover_12.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-18'),
  },
  {
    title: 'Landing Pages: Como Criar Páginas que Convertem',
    excerpt: 'Estratégias comprovadas para criar landing pages que transformam visitantes em leads e clientes.',
    content: `# Landing Pages: Como Criar Páginas que Convertem

Uma landing page bem feita pode ser a diferença entre sucesso e fracasso de uma campanha.

## Elementos Essenciais

### Headline Impactante
- Claro e direto
- Foco no benefício
- Crie urgência

### CTA Visível
- Botão destacado
- Texto de ação claro
- Posicionamento estratégico

### Prova Social
- Depoimentos
- Números e estatísticas
- Logos de clientes

## Design

- Layout limpo
- Hierarquia visual
- Mobile-first
- Carregamento rápido

## Copywriting

- Foco no benefício
- Linguagem do cliente
- Remova fricção
- Crie urgência

## Testes

- A/B testing constante
- Teste diferentes CTAs
- Experimente layouts
- Meça tudo

## Conclusão

Landing pages são máquinas de conversão quando bem construídas e testadas.`,
    category: 'Negócios',
    tags: ['landing-page', 'conversao', 'marketing', 'cta'],
    coverImage: 'blog_cover_13.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-22'),
  },
  {
    title: 'TypeScript: Por Que Usar em Projetos Web Modernos',
    excerpt: 'Descubra os benefícios do TypeScript para desenvolvimento web mais seguro e produtivo.',
    content: `# TypeScript: Por Que Usar

TypeScript adiciona tipagem estática ao JavaScript, melhorando qualidade e produtividade.

## Benefícios

### Detecção de Erros
- Erros em tempo de desenvolvimento
- Autocomplete melhorado
- Refatoração segura

### Documentação
- Tipos servem como documentação
- IntelliSense melhorado
- Menos bugs em produção

### Escalabilidade
- Projetos grandes se beneficiam
- Manutenção mais fácil
- Onboarding mais rápido

## Adoção Gradual

- Comece com arquivos .ts
- Migre gradualmente
- Use tipos básicos primeiro
- Aproveite tipos do ecossistema

## Boas Práticas

- Evite \`any\`
- Use interfaces
- Aproveite tipos utilitários
- Configure strict mode

## Conclusão

TypeScript é investimento que paga dividendos em qualidade e produtividade.`,
    category: 'Engenharia',
    tags: ['typescript', 'javascript', 'desenvolvimento', 'qualidade'],
    coverImage: 'blog_cover_14.jpg',
    status: 'published',
    publishedAt: new Date('2026-02-25'),
  },
  {
    title: 'Hospedagem Web: Escolhendo o Servidor Ideal',
    excerpt: 'Guia completo para escolher a melhor opção de hospedagem para seu projeto web.',
    content: `# Hospedagem Web: Escolhendo o Servidor Ideal

A escolha de hospedagem impacta performance, segurança e custos.

## Tipos de Hospedagem

### Compartilhada
- Custo baixo
- Ideal para sites pequenos
- Recursos limitados

### VPS
- Mais controle
- Recursos dedicados
- Requer conhecimento técnico

### Cloud
- Escalável
- Paga pelo uso
- Alta disponibilidade

### Serverless
- Sem gerenciamento de servidor
- Escala automática
- Ideal para APIs

## O Que Considerar

- Tráfego esperado
- Tipo de aplicação
- Orçamento
- Suporte necessário

## Recursos Importantes

- SSL gratuito
- Backups automáticos
- CDN incluído
- Suporte 24/7

## Conclusão

Escolha baseada nas necessidades reais do projeto, não apenas no preço.`,
    category: 'Manutenção',
    tags: ['hospedagem', 'servidor', 'cloud', 'infraestrutura'],
    coverImage: 'blog_cover_15.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-01'),
  },
  {
    title: 'Next.js 14: Novidades e Melhores Práticas',
    excerpt: 'Explore as principais features do Next.js 14 e como aproveitá-las em seus projetos.',
    content: `# Next.js 14: Novidades e Melhores Práticas

Next.js continua evoluindo com features que melhoram performance e DX.

## Principais Features

### App Router
- Nova estrutura de roteamento
- Server Components por padrão
- Layouts aninhados

### Server Actions
- Mutations sem API routes
- Type-safe por padrão
- Integração com forms

### Turbopack
- Build mais rápido
- HMR melhorado
- Substitui Webpack

## Boas Práticas

- Use Server Components quando possível
- Implemente Streaming
- Aproveite Image Optimization
- Use Route Handlers para APIs

## Migração

- Migre gradualmente
- Use App Router em novos projetos
- Mantenha Pages Router se necessário

## Conclusão

Next.js 14 oferece ferramentas poderosas para criar aplicações web modernas e performáticas.`,
    category: 'Engenharia',
    tags: ['nextjs', 'react', 'ssr', 'framework'],
    coverImage: 'blog_cover_16.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-05'),
  },
  {
    title: 'E-commerce: Estratégias para Reduzir Abandono de Carrinho',
    excerpt: 'Técnicas comprovadas para diminuir a taxa de abandono e aumentar conversões na sua loja virtual.',
    content: `# Reduzindo Abandono de Carrinho

Abandono de carrinho é um dos maiores desafios do e-commerce.

## Principais Causas

- Custo de frete inesperado
- Processo de checkout longo
- Falta de opções de pagamento
- Preocupações com segurança

## Estratégias

### Transparência
- Mostre custos totais cedo
- Calcule frete antes do checkout
- Sem taxas escondidas

### Simplificação
- Menos campos no formulário
- Checkout em uma página
- Autocomplete de endereço

### Confiança
- Selos de segurança
- Política de devolução clara
- Suporte visível

### Recuperação
- Email de abandono
- Retargeting
- Cupons de desconto

## Ferramentas

- Google Analytics Enhanced Ecommerce
- Hotjar para heatmaps
- A/B testing de checkout

## Conclusão

Reduzir abandono requer entender o usuário e remover fricções do processo.`,
    category: 'E-commerce',
    tags: ['ecommerce', 'conversao', 'checkout', 'vendas'],
    coverImage: 'blog_cover_17.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-08'),
  },
  {
    title: 'API REST: Boas Práticas de Design',
    excerpt: 'Aprenda a criar APIs RESTful bem estruturadas, documentadas e fáceis de consumir.',
    content: `# API REST: Boas Práticas

APIs bem projetadas facilitam integração e manutenção.

## Princípios REST

- **Recursos**: URLs representam recursos
- **Verbos HTTP**: GET, POST, PUT, DELETE
- **Stateless**: Cada request é independente
- **JSON**: Formato padrão de dados

## Estrutura de URLs

\`\`\`
GET    /posts          # Lista
GET    /posts/:id      # Detalhe
POST   /posts          # Criar
PUT    /posts/:id      # Atualizar
DELETE /posts/:id      # Deletar
\`\`\`

## Códigos HTTP Corretos

- 200: Sucesso
- 201: Criado
- 400: Bad Request
- 401: Não autorizado
- 404: Não encontrado
- 500: Erro servidor

## Versionamento

- Use /v1/, /v2/ nas URLs
- Mantenha compatibilidade
- Documente mudanças

## Documentação

- Swagger/OpenAPI
- Exemplos de requests
- Códigos de erro

## Conclusão

APIs bem projetadas são investimento em escalabilidade e manutenibilidade.`,
    category: 'Engenharia',
    tags: ['api', 'rest', 'backend', 'arquitetura'],
    coverImage: 'blog_cover_18.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-12'),
  },
  {
    title: 'Design System: Criando Componentes Reutilizáveis',
    excerpt: 'Como criar e manter um design system que acelera desenvolvimento e garante consistência.',
    content: `# Design System: Componentes Reutilizáveis

Design systems garantem consistência e aceleram desenvolvimento.

## Benefícios

- **Consistência**: Visual e funcional
- **Velocidade**: Desenvolvimento mais rápido
- **Manutenção**: Mudanças centralizadas
- **Escalabilidade**: Cresce com o projeto

## Componentes Base

- Botões
- Inputs
- Cards
- Modais
- Navegação

## Documentação

- Storybook para componentes
- Guia de uso
- Exemplos práticos
- Acessibilidade

## Versionamento

- Semver para releases
- Changelog claro
- Breaking changes documentados

## Manutenção

- Revisão periódica
- Feedback da equipe
- Atualizações regulares

## Conclusão

Design system é investimento que paga dividendos em qualidade e velocidade.`,
    category: 'Design',
    tags: ['design-system', 'componentes', 'ui', 'reutilizacao'],
    coverImage: 'blog_cover_19.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-15'),
  },
  {
    title: 'Cálculo de Frete: Integrações e Melhores Práticas',
    excerpt: 'Como integrar cálculo de frete de forma eficiente na sua loja virtual.',
    content: `# Cálculo de Frete: Integrações

Cálculo de frete preciso é essencial para e-commerce.

## Principais Integrações

### Correios
- API oficial
- Cálculo preciso
- Rastreamento incluído

### Melhor Envio
- Múltiplas transportadoras
- Interface unificada
- Facilita comparação

### Frete Rápido
- API simples
- Boa documentação
- Suporte local

## Implementação

- Cache de cotações
- Fallback para valores fixos
- Timeout adequado
- Tratamento de erros

## Experiência do Usuário

- Calcule durante navegação
- Mostre opções claras
- Prazos de entrega visíveis
- Frete grátis quando aplicável

## Otimizações

- Cache de CEPs comuns
- Validação de CEP
- Retry automático
- Logs para debug

## Conclusão

Boa integração de frete melhora conversão e reduz abandono.`,
    category: 'E-commerce',
    tags: ['frete', 'correios', 'integracao', 'ecommerce'],
    coverImage: 'blog_cover_20.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-18'),
  },
  {
    title: 'Acessibilidade Web: WCAG na Prática',
    excerpt: 'Implemente acessibilidade seguindo diretrizes WCAG para tornar seu site acessível a todos.',
    content: `# Acessibilidade Web: WCAG na Prática

Acessibilidade não é opcional, é direito e boa prática.

## Princípios WCAG

### Perceptível
- Texto alternativo em imagens
- Contraste adequado
- Legenda em vídeos

### Operável
- Navegação por teclado
- Sem timeouts curtos
- Sem conteúdo que causa convulsões

### Compreensível
- Linguagem clara
- Navegação consistente
- Mensagens de erro úteis

### Robusto
- HTML válido
- Compatibilidade com tecnologias assistivas

## Ferramentas

- WAVE
- axe DevTools
- Lighthouse
- Screen readers

## Checklist Básico

- [ ] Contraste mínimo 4.5:1
- [ ] Navegação por teclado
- [ ] Alt text em imagens
- [ ] Labels em formulários
- [ ] Headings hierárquicos

## Conclusão

Acessibilidade beneficia todos e é requisito legal em muitos lugares.`,
    category: 'Design',
    tags: ['acessibilidade', 'wcag', 'inclusao', 'ux'],
    coverImage: 'blog_cover_21.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-22'),
  },
  {
    title: 'GraphQL vs REST: Quando Usar Cada Abordagem',
    excerpt: 'Comparativo entre GraphQL e REST para ajudar na escolha da melhor arquitetura de API.',
    content: `# GraphQL vs REST

Ambas são válidas, cada uma com seus casos de uso.

## REST

### Vantagens
- Simples e direto
- Cache HTTP nativo
- Ferramentas maduras
- Fácil de entender

### Desvantagens
- Over-fetching comum
- Múltiplas requisições
- Versionamento necessário

## GraphQL

### Vantagens
- Busca exata do necessário
- Uma requisição para tudo
- Schema tipado
- Introspection

### Desvantagens
- Curva de aprendizado
- Cache mais complexo
- Over-querying possível

## Quando Usar REST

- APIs públicas simples
- Cache é crítico
- Equipe pequena
- Projeto tradicional

## Quando Usar GraphQL

- Múltiplos clientes
- Mobile com dados limitados
- Relações complexas
- Equipe experiente

## Conclusão

Escolha baseada nas necessidades específicas do projeto.`,
    category: 'Engenharia',
    tags: ['graphql', 'rest', 'api', 'arquitetura'],
    coverImage: 'blog_cover_22.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-25'),
  },
  {
    title: 'Content Marketing: Criando Conteúdo que Engaja',
    excerpt: 'Estratégias para criar conteúdo relevante que atrai e engaja seu público-alvo.',
    content: `# Content Marketing: Conteúdo que Engaja

Bom conteúdo é base de qualquer estratégia digital bem-sucedida.

## Planejamento

- Defina persona
- Pesquise keywords
- Calendário editorial
- Formatos variados

## Tipos de Conteúdo

- Artigos de blog
- Vídeos
- Infográficos
- E-books
- Webinars

## SEO de Conteúdo

- Keywords naturais
- Estrutura clara
- Links internos
- Meta descriptions

## Distribuição

- Blog próprio
- Redes sociais
- Email marketing
- Parcerias

## Medição

- Views e tempo na página
- Compartilhamentos
- Leads gerados
- Conversões

## Conclusão

Conteúdo de qualidade é investimento de longo prazo que constrói autoridade.`,
    category: 'Negócios',
    tags: ['content-marketing', 'seo', 'marketing', 'conteudo'],
    coverImage: 'blog_cover_23.jpg',
    status: 'published',
    publishedAt: new Date('2026-03-28'),
  },
  {
    title: 'Docker: Containerizando Aplicações Web',
    excerpt: 'Aprenda a usar Docker para criar ambientes de desenvolvimento consistentes e facilitar deploy.',
    content: `# Docker: Containerizando Aplicações

Docker simplifica desenvolvimento e deploy de aplicações.

## Benefícios

- **Consistência**: Mesmo ambiente em qualquer lugar
- **Isolamento**: Aplicações independentes
- **Escalabilidade**: Fácil replicação
- **Portabilidade**: Funciona em qualquer OS

## Conceitos Básicos

### Imagem
- Template read-only
- Base para containers

### Container
- Instância de uma imagem
- Isolado e efêmero

### Dockerfile
- Receita da imagem
- Comandos de build

## Exemplo Básico

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Docker Compose

- Orquestra múltiplos containers
- Define serviços e redes
- Facilita desenvolvimento

## Conclusão

Docker é ferramenta essencial para desenvolvimento moderno.`,
    category: 'Engenharia',
    tags: ['docker', 'containers', 'devops', 'deploy'],
    coverImage: 'blog_cover_24.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-01'),
  },
  {
    title: 'Testes Automatizados: Estratégias para Web',
    excerpt: 'Como implementar testes automatizados que garantem qualidade e confiança no código.',
    content: `# Testes Automatizados: Estratégias

Testes automatizados são essenciais para qualidade de software.

## Tipos de Testes

### Unitários
- Testam funções isoladas
- Rápidos e focados
- Base da pirâmide

### Integração
- Testam interações
- APIs e banco de dados
- Mais lentos

### E2E
- Testam fluxos completos
- Simulam usuário real
- Mais lentos e frágeis

## Ferramentas

- **Jest**: Framework JavaScript
- **Cypress**: E2E testing
- **Supertest**: API testing
- **React Testing Library**: Componentes

## Boas Práticas

- Escreva testes primeiro (TDD)
- Mantenha testes simples
- Nomeie claramente
- Execute frequentemente

## Cobertura

- Aime 80%+ de cobertura
- Foque em código crítico
- Não obceque com 100%

## Conclusão

Testes são investimento que economiza tempo e reduz bugs em produção.`,
    category: 'Engenharia',
    tags: ['testes', 'qualidade', 'jest', 'cypress'],
    coverImage: 'blog_cover_25.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-05'),
  },
  {
    title: 'JAMstack: Arquitetura Moderna para Web',
    excerpt: 'Entenda como JAMstack oferece performance, segurança e escalabilidade superiores.',
    content: `# JAMstack: Arquitetura Moderna

JAMstack representa JavaScript, APIs e Markup.

## Conceito

- **JavaScript**: Lógica no cliente
- **APIs**: Serviços externos
- **Markup**: HTML pré-renderizado

## Benefícios

- **Performance**: Sites estáticos são rápidos
- **Segurança**: Menos superfície de ataque
- **Escalabilidade**: CDN global
- **Custo**: Hosting barato

## Quando Usar

- Sites estáticos
- Blogs e documentação
- Landing pages
- Portfolios

## Ferramentas

- **Next.js**: Framework React
- **Gatsby**: Static site generator
- **Netlify/Vercel**: Hosting e CI/CD
- **Headless CMS**: Gestão de conteúdo

## Desafios

- Conteúdo dinâmico limitado
- Build time em projetos grandes
- Aprendizado de novas ferramentas

## Conclusão

JAMstack é excelente escolha para muitos projetos web modernos.`,
    category: 'Engenharia',
    tags: ['jamstack', 'arquitetura', 'static', 'performance'],
    coverImage: 'blog_cover_26.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-08'),
  },
  {
    title: 'Microinterações: Detalhes que Fazem Diferença',
    excerpt: 'Como pequenas animações e feedbacks melhoram significativamente a experiência do usuário.',
    content: `# Microinterações: Detalhes que Fazem Diferença

Microinterações são pequenos detalhes que melhoram experiência.

## O Que São

- Feedback visual de ações
- Animações sutis
- Transições suaves
- Estados de loading

## Benefícios

- **Feedback imediato**: Usuário sabe que ação foi registrada
- **Engajamento**: Interface mais interessante
- **Profissionalismo**: Atenção aos detalhes
- **Usabilidade**: Guia o usuário

## Exemplos

- Hover em botões
- Loading states
- Confirmação de ações
- Scroll animations
- Form validation

## Princípios

- **Sutileza**: Não distrair
- **Rapidez**: Máximo 300ms
- **Propósito**: Cada animação tem razão
- **Consistência**: Padrões claros

## Ferramentas

- CSS transitions
- Framer Motion
- GSAP
- Lottie

## Conclusão

Microinterações transformam interfaces funcionais em experiências memoráveis.`,
    category: 'Design',
    tags: ['microinteracoes', 'animacao', 'ux', 'design'],
    coverImage: 'blog_cover_27.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-12'),
  },
  {
    title: 'CI/CD: Automatizando Deploy de Aplicações',
    excerpt: 'Configure pipelines de CI/CD para automatizar testes e deploy, aumentando confiança e velocidade.',
    content: `# CI/CD: Automatizando Deploy

CI/CD automatiza testes e deploy, reduzindo erros e acelerando releases.

## CI - Continuous Integration

- Testes automáticos
- Build automático
- Validação de código
- Feedback rápido

## CD - Continuous Deployment

- Deploy automático
- Rollback fácil
- Ambientes múltiplos
- Zero downtime

## Benefícios

- **Velocidade**: Deploy mais rápido
- **Qualidade**: Menos bugs
- **Confiança**: Testes antes de produção
- **Produtividade**: Menos trabalho manual

## Ferramentas

- **GitHub Actions**: Integrado ao GitHub
- **GitLab CI**: Solução completa
- **Jenkins**: Self-hosted
- **CircleCI**: Cloud-based

## Pipeline Básico

1. Lint e formatação
2. Testes unitários
3. Build
4. Testes de integração
5. Deploy em staging
6. Deploy em produção

## Conclusão

CI/CD é essencial para desenvolvimento moderno e ágil.`,
    category: 'Engenharia',
    tags: ['cicd', 'deploy', 'devops', 'automatizacao'],
    coverImage: 'blog_cover_28.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-15'),
  },
  {
    title: 'Dark Mode: Implementando Tema Escuro',
    excerpt: 'Como adicionar suporte a dark mode de forma acessível e com boa experiência de usuário.',
    content: `# Dark Mode: Tema Escuro

Dark mode se tornou padrão esperado pelos usuários.

## Benefícios

- **Conforto visual**: Menos cansaço
- **Economia de bateria**: Em telas OLED
- **Preferência do usuário**: Opção popular
- **Acessibilidade**: Para alguns usuários

## Implementação

### CSS Variables
\`\`\`css
:root {
  --bg-color: #fff;
  --text-color: #000;
}

[data-theme="dark"] {
  --bg-color: #000;
  --text-color: #fff;
}
\`\`\`

### Preferência do Sistema
- Detecte prefers-color-scheme
- Salve preferência do usuário
- Aplique tema automaticamente

## Considerações

- **Contraste**: Mantenha acessibilidade
- **Cores**: Ajuste paleta para dark
- **Imagens**: Considere versões diferentes
- **Transição**: Suave entre temas

## Persistência

- LocalStorage
- Cookies
- User preferences

## Conclusão

Dark mode é feature esperada que melhora experiência do usuário.`,
    category: 'Design',
    tags: ['dark-mode', 'tema', 'css', 'ux'],
    coverImage: 'blog_cover_29.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-18'),
  },
  {
    title: 'WebSockets: Comunicação em Tempo Real',
    excerpt: 'Implemente funcionalidades em tempo real usando WebSockets para chats, notificações e mais.',
    content: `# WebSockets: Comunicação em Tempo Real

WebSockets permitem comunicação bidirecional em tempo real.

## Quando Usar

- Chats e mensagens
- Notificações em tempo real
- Dashboards ao vivo
- Colaboração em tempo real
- Jogos multiplayer

## Como Funciona

- Conexão persistente
- Baixa latência
- Bidirecional
- Protocolo ws:// ou wss://

## Implementação

### Cliente
\`\`\`javascript
const ws = new WebSocket('wss://api.example.com');
ws.onmessage = (event) => {
  console.log(event.data);
};
\`\`\`

### Servidor
- Socket.io (Node.js)
- ws (Node.js)
- Django Channels (Python)

## Alternativas

- **Server-Sent Events**: Apenas servidor → cliente
- **Polling**: Requisições periódicas
- **Long Polling**: Polling otimizado

## Conclusão

WebSockets são essenciais para aplicações que precisam de tempo real.`,
    category: 'Engenharia',
    tags: ['websockets', 'tempo-real', 'socketio', 'real-time'],
    coverImage: 'blog_cover_30.jpg',
    status: 'published',
    publishedAt: new Date('2026-04-22'),
  },
];

const seedBlog = async () => {
  try {
    console.log('🌱 Iniciando seed...');

    // Criar admin se não existir
    const adminExists = await User.findOne({ email: ADMIN_EMAIL });
    if (!adminExists) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await User.create({
        email: ADMIN_EMAIL,
        passwordHash,
        role: 'admin',
      });
      console.log('✅ Admin criado:', ADMIN_EMAIL);
    } else {
      console.log('ℹ️  Admin já existe');
    }

    // Limpar posts existentes (opcional - comente se quiser manter)
    // await Post.deleteMany({});

    // Criar posts
    let created = 0;
    let skipped = 0;

    for (const postData of posts) {
      const slug = generateSlug(postData.title);
      const existing = await Post.findOne({ slug });

      if (!existing) {
        await Post.create({
          ...postData,
          slug,
        });
        created++;
      } else {
        skipped++;
      }
    }

    console.log(`✅ Seed concluído!`);
    console.log(`   - Posts criados: ${created}`);
    console.log(`   - Posts já existentes: ${skipped}`);
    console.log(`   - Total de posts: ${posts.length}`);
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  }
};

module.exports = { seedBlog };
