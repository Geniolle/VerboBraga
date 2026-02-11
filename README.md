# VerboBraga
Crição do site para a igreja Verbo da Vida Braga

## Auth + Admin (Firebase + Railway Postgres)

### Variaveis de ambiente

Configure no Railway:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `INTERNAL_API_URL`
- `INTERNAL_API_SHARED_SECRET`

Configure na API Node (`/API/.env`):

- `DATABASE_URL`
- `INTERNAL_API_SHARED_SECRET`
- `ALLOWED_ORIGINS`

### Como funciona

- Login na navbar com Google ou Email/Senha via Firebase.
- Sessao salva em cookie `httpOnly` (`session`) no backend.
- Rotas protegidas por proxy + validacao server-side real.
- Formulario do Centro de Cura so abre para usuario logado.
- Envio do formulario so aceita request autenticada no servidor.
- O site Next.js nao acessa mais o Postgres diretamente.
- Fluxo seguro: `Site -> API Node (assinada com HMAC) -> Postgres`.
- Admin so entra se `uid` tiver `role='admin'` no Postgres.
- Area `Igreja` aparece no menu de perfil para quem tem permissoes de colaborador/membresia.

## Rodando em desenvolvimento

1. Suba a API:

```bash
cd ../API
npm install
npm run dev
```

2. No Next, configure:

- `INTERNAL_API_URL=http://localhost:4000`
- `INTERNAL_API_SHARED_SECRET=<mesmo segredo da API>`

### SQL para tornar um usuario admin

Rode no Postgres do Railway (troque o UID):

```sql
UPDATE app_users
SET role = 'admin'
WHERE uid = 'UID_DO_FIREBASE';
```

## Transicao AppSheet/CSV para Postgres

Os CSV em `appantigo/xls` podem ser importados para o Postgres com:

```bash
npm run db:import-igreja
```

O script cria/atualiza:

- Tabelas `igreja_*` (uma por CSV)
- `igreja_import_meta` (status da importacao)
- `igreja_access_index` (emails com acesso a area Igreja)

Depois da importacao, o login resolve automaticamente:

- `is_colaborador`
- `is_membresia`

e a pagina `/igreja` fica disponivel para esses perfis.
