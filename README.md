# Sistema de Helpdesk

Sistema de Helpdesk acadêmico desenvolvido por estudantes de Análise e Desenvolvimento de Sistemas (ADS).

## Objetivo
Criar uma aplicação web para gerenciamento de chamados de suporte, aplicando conceitos de frontend, backend, banco de dados e integração com módulo em C para geração de relatórios.

## Equipe
- Frontend: Bryan e Khemraj Junior
- Backend: Wesley
- Documentação e Organização: Khemraj Junior

## Tecnologias
- HTML5, CSS3, JavaScript
- PHP
- MySQL


## Funcionalidades
- CRUD de usuários
- CRUD de chamados
- Autenticação básica
- Status de chamados (aberto, em andamento, fechado)
- Relatórios estatísticos

## Estrutura do Projeto

helpdesk-system/
│
├── README.md
├── docs/
│   ├── requisitos.md
│   ├── regras-de-negocio.md
│   └── backlog.md
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── chamados.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
│
├── backend/
│   ├── config/
│   │   └── db.php
│   ├── controllers/
│   ├── models/
│   └── routes/
│
├── database/
│   └── schema.sql
│
├── c-reports/
│   ├── relatorio.c
│   └── README.md
│
└── .gitignore
