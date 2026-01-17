# 🔑 Configurar Access Token na Vercel - PASSO A PASSO

## ✅ Token Recebido

Seu Access Token do Meta Conversions API foi recebido e está pronto para configuração.

## 🚀 Como Configurar na Vercel

### Opção 1: Via Dashboard da Vercel (Recomendado)

1. **Acesse o Dashboard da Vercel:**
   - Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
   - Selecione seu projeto **LP06**

2. **Acesse Environment Variables:**
   - Clique em **Settings** (no menu superior)
   - Clique em **Environment Variables** (no menu lateral)

3. **Adicione a Variável:**
   - Clique em **Add New**
   - **Key:** `META_CONVERSIONS_API_ACCESS_TOKEN`
   - **Value:** Cole o token abaixo:
     ```
     EAALSG7z03XoBQHfY7JCwgZCGTtM6M9ZBlUXOHEZAt1WJTDZCzc85jNkPR2K9oKZAY6zuFFZBVpOHkBA5Kdbn87OLrLmXZBXseZA2tXFnXZCwwnqx5nCX1C10D5JKC45C0i84XeXBFnZCn5opZCP3iqkDMbZBenxMJfZAsfgVFeE4gMZCUBWtn8DC1h3ZBok4e6se1mvFQZDZD
     ```
   - **Environments:** Marque TODAS as opções:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

4. **Salve:**
   - Clique em **Save**
   - Aguarde a confirmação

5. **Redeploy (Importante!):**
   - Após adicionar a variável, você precisa fazer um novo deploy
   - Vá em **Deployments**
   - Clique nos 3 pontos (...) do último deployment
   - Clique em **Redeploy**
   - Ou simplesmente faça um novo commit e push

### Opção 2: Via Vercel CLI

Se você tem Vercel CLI instalado:

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Login
vercel login

# Adicionar variável de ambiente
vercel env add META_CONVERSIONS_API_ACCESS_TOKEN

# Quando solicitado, cole o token:
# EAALSG7z03XoBQHfY7JCwgZCGTtM6M9ZBlUXOHEZAt1WJTDZCzc85jNkPR2K9oKZAY6zuFFZBVpOHkBA5Kdbn87OLrLmXZBXseZA2tXFnXZCwwnqx5nCX1C10D5JKC45C0i84XeXBFnZCn5opZCP3iqkDMbZBenxMJfZAsfgVFeE4gMZCUBWtn8DC1h3ZBok4e6se1mvFQZDZD

# Escolha os ambientes: Production, Preview, Development
```

## ✅ Verificar se Está Funcionando

### 1. Verificar no Dashboard da Vercel

1. Vá em **Settings** → **Environment Variables**
2. Verifique se `META_CONVERSIONS_API_ACCESS_TOKEN` está listado
3. Verifique se está marcado para Production, Preview e Development

### 2. Testar Localmente (Opcional)

Se quiser testar localmente antes do deploy:

1. Crie um arquivo `.env.local` na raiz do projeto:
   ```bash
   META_CONVERSIONS_API_ACCESS_TOKEN=EAALSG7z03XoBQHfY7JCwgZCGTtM6M9ZBlUXOHEZAt1WJTDZCzc85jNkPR2K9oKZAY6zuFFZBVpOHkBA5Kdbn87OLrLmXZBXseZA2tXFnXZCwwnqx5nCX1C10D5JKC45C0i84XeXBFnZCn5opZCP3iqkDMbZBenxMJfZAsfgVFeE4gMZCUBWtn8DC1h3ZBok4e6se1mvFQZDZD
   ```

2. **⚠️ IMPORTANTE:** Adicione `.env.local` ao `.gitignore` para não commitar o token!

3. Teste localmente:
   ```bash
   npm run dev
   ```

### 3. Testar Após Deploy

Após fazer o deploy na Vercel:

1. **Acesse seu site em produção**
2. **Abra o Console do Navegador** (F12)
3. **Verifique Network Tab:**
   - Filtre por "meta-conversions"
   - Deve aparecer requisições POST para `/api/meta-conversions`
   - Status deve ser 200 (sucesso)

4. **Verifique no Meta Events Manager:**
   - Acesse [Meta Events Manager](https://business.facebook.com/events_manager2)
   - Selecione seu Pixel (ID: 1359109655309883)
   - Vá em **Test Events**
   - Navegue pelo site
   - Você deve ver eventos aparecendo em tempo real
   - Verifique se há eventos do **Server** (Conversions API)

## 🐛 Troubleshooting

### Problema: API retorna erro 500

**Causa:** Token não configurado ou inválido

**Solução:**
1. Verifique se a variável está configurada na Vercel
2. Verifique se fez redeploy após adicionar a variável
3. Verifique se o token está correto (sem espaços extras)

### Problema: Eventos não aparecem no Test Events

**Causa:** API não está sendo chamada ou token inválido

**Solução:**
1. Verifique Console do navegador para erros
2. Verifique Network tab → filtro "meta-conversions"
3. Verifique se o token está correto no Events Manager

### Problema: Token expirado

**Causa:** Tokens do Meta podem expirar

**Solução:**
1. Acesse Meta Events Manager
2. Settings → Conversions API
3. Gere um novo token
4. Atualize na Vercel

## 📊 Próximos Passos

Após configurar o token e fazer deploy:

1. ✅ **Aguardar 20-30 minutos** para eventos aparecerem no Events Manager
2. ✅ **Verificar Diagnostics:**
   - Event Coverage → Deve estar ≥ 75%
   - Event Match Quality → Deve melhorar para 10/10
   - Event Deduplication → Deve estar "Atende às melhores práticas"
3. ✅ **Monitorar por 24-48h** para ver melhorias consistentes

## 🔒 Segurança

⚠️ **IMPORTANTE:**
- ✅ Token está configurado apenas na Vercel (seguro)
- ✅ Token NÃO está no código (seguro)
- ✅ `.env.local` está no `.gitignore` (seguro)
- ❌ **NÃO commitar** o token no Git
- ❌ **NÃO compartilhar** o token publicamente

---

**Status:** ✅ Token recebido e pronto para configuração  
**Próximo passo:** Adicionar na Vercel e fazer deploy 🚀





