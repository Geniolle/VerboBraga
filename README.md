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
- `DATABASE_URL`

### Como funciona

- Login na navbar com Google ou Email/Senha via Firebase.
- Sessao salva em cookie `httpOnly` (`session`) no backend.
- Rotas protegidas por proxy + validacao server-side real.
- Formulario do Centro de Cura so abre para usuario logado.
- Envio do formulario so aceita request autenticada no servidor.
- Admin so entra se `uid` tiver `role='admin'` no Postgres.

### SQL para tornar um usuario admin

Rode no Postgres do Railway (troque o UID):

```sql
UPDATE app_users
SET role = 'admin'
WHERE uid = 'UID_DO_FIREBASE';
```
