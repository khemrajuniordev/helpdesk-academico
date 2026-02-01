# HelpDesk — Sistema de Gerenciamento de Chamados

Sistema de Helpdesk desenvolvido como **projeto acadêmico e de portfólio**, com o objetivo de simular um ambiente real de suporte técnico utilizado por empresas de médio porte.

O projeto foi pensado para aplicar, na prática, conceitos de **desenvolvimento full stack**, **organização de chamados**, **persistência de dados** e **geração de relatórios**, além de trabalho colaborativo em equipe.

---

## Visão Geral

O HelpDesk permite que usuários abram chamados de suporte, acompanhem o status das solicitações e que a equipe técnica gerencie esses atendimentos de forma organizada e eficiente.

Este projeto representa a transição do aprendizado teórico para a prática, simulando desafios reais enfrentados no dia a dia de um time de tecnologia.

---

## Funcionalidades

### Usuários
- Cadastro e autenticação básica
- Abertura de chamados
- Acompanhamento do status do chamado

### Chamados
- Criação, edição e exclusão (CRUD)
- Controle de status:
  - 🟢 Aberto  
  - 🟡 Em andamento  
  - 🔴 Fechado
- Associação de chamados a usuários

### Relatórios
- Geração de relatórios estatísticos
- Processamento auxiliar desenvolvido em **C**
- Análise de volume e status dos chamados

---

## Problema Resolvido

Empresas que lidam com múltiplas solicitações de suporte precisam de uma forma clara e organizada de gerenciar atendimentos sem perder informações importantes.

Este sistema resolve:
- Falta de organização nos atendimentos
- Dificuldade em acompanhar o andamento dos chamados
- Ausência de dados estatísticos para tomada de decisão

---

## Tecnologias Utilizadas

### Frontend
- HTML5  
- CSS3  
- JavaScript  

### Backend
- PHP  

### Banco de Dados
- MySQL  

### Processamento Auxiliar
- Linguagem C (relatórios estatísticos)

---

## Arquitetura e Organização

O projeto segue uma separação clara de responsabilidades entre frontend, backend e processamento auxiliar, facilitando manutenção e escalabilidade.


/
├── frontend/
│   ├── pages/
│   ├── css/
│   └── js/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── services/
├── database/
│   └── script.sql
├── reports/
│   └── relatorios.c
└── README.md


Alunos Envolvidos e Papéis

Devido ao contexto acadêmico e ao tamanho reduzido da equipe, os integrantes assumiram múltiplos papéis estratégicos e operacionais, prática comum em times ágeis, startups e projetos educacionais.

👤 Khemraj Junior

Product Manager (PM) e Frontend Developer

- Definição da visão do produto
- Priorização do backlog
- Decisão do escopo do MVP
- Alinhamento entre necessidades do usuário e viabilidade técnica
- UX/UI Designer
- Pesquisa com usuários
- Criação de fluxos e jornadas
- Prototipação no Figma
- Definição do design system
- Frontend Developer
- Implementação das interfaces do sistema
- Garantia de fidelidade entre design e código
- Integração com o backend

Quality Assurance (QA)
- Planejamento de testes
- Testes funcionais
- Testes de usabilidade
- Validação das funcionalidades antes das entregas

👤 Bryan

Frontend Developer

- Desenvolvimento das interfaces
- Apoio na responsividade
- Integração com APIs
- Revisão e melhorias no código frontend

👤 Wesley

Backend Developer

- Modelagem do banco de dados
- Implementação das regras de negócio
- Desenvolvimento de APIs e autenticação
- Segurança e persistência dos dados

Justificativa Acadêmica

Projeto desenvolvido por uma equipe reduzida, exigindo o acúmulo de papéis estratégicos e operacionais, permitindo uma visão completa do ciclo de vida do produto — do planejamento à entrega.

Licença

Projeto desenvolvido para fins educacionais e de portfólio. Início FEV/2026