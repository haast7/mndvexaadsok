# 🎯 Configuração Meta Conversions API - 10/10 PageView

## 📋 Visão Geral

Este documento explica como configurar o Meta Pixel + Conversions API para atingir **10/10 na marcação de PageView** através de deduplicação perfeita.

## ✅ O que foi implementado

### 1. **Conversions API Route** (`api/meta-conversions.js`)
- Endpoint server-side para enviar eventos ao Meta
- Suporta deduplicação via `event_id`
- Coleta automaticamente `fbp`, `fbc`, `user_agent`, `ip`

### 2. **Serviço de Tracking Unificado** (`src/services/metaTracking.js`)
- Gerencia Pixel (browser) + Conversions API (server)
- Gera `event_id` único para cada evento
- Envia o mesmo `event_id` para ambos os canais
- Coleta automaticamente dados de deduplicação

### 3. **Hook React** (`src/hooks/useMetaTracking.js`)
- Facilita uso do tracking em componentes React
- Track automático de PageView

### 4. **Integração Automática**
- PageView trackeado automaticamente em todas as rotas
- Suporte a navegação SPA (Single Page Application)

## 🔧 Configuração Necessária

### Passo 1: Obter Access Token do Meta

1. Acesse o [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Selecione seu Pixel (ID: `1359109655309883`)
3. Vá em **Settings** → **Conversions API**
4. Clique em **Set up manually** ou **Set up with a partner**
5. Escolha **Set up manually**
6. Copie o **Access Token** gerado

### Passo 2: Configurar Variáveis de Ambiente na Vercel

1. Acesse seu projeto na [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

```
META_CONVERSIONS_API_ACCESS_TOKEN=seu_access_token_aqui
VITE_META_PIXEL_ID=1359109655309883 (opcional, já está no código)
```

**⚠️ IMPORTANTE:**
- Marque como **Production**, **Preview** e **Development**
- O Access Token deve ser mantido **SECRETO** (não commitar no Git)

### Passo 3: Deploy

Após configurar as variáveis de ambiente:

```bash
git add .
git commit -m "feat: Implementa Meta Conversions API para deduplicação"
git push
```

A Vercel fará o deploy automaticamente.

## 📊 Como Funciona a Deduplicação

### Condições para Deduplicação (Meta)

Para que o Meta deduplique eventos corretamente, ambos (Pixel + Conversions API) devem ter:

1. **Mesmo `event_name`** (ex: `PageView`)
2. **Mesmo `event_id`** (único por evento)

**OU**

1. **Mesmo `event_name`**
2. **Mesmo `external_id`** ou `fbp` (Facebook Browser ID)

### Como Nossa Implementação Garante Isso

```javascript
// 1. Gera event_id único
const eventId = generateEventId(); // Ex: "1703123456789_abc123"

// 2. Envia via Pixel com event_id
fbq('track', 'PageView', { eventID: eventId });

// 3. Envia via Conversions API com o MESMO event_id
sendServerEvent('PageView', eventId, customData, userData);
```

O Meta reconhece que são o mesmo evento e conta apenas **1 vez** ✅

## 🎯 Parâmetros de Deduplicação Enviados

Nossa implementação envia automaticamente:

| Parâmetro | Fonte | Uso |
|-----------|-------|-----|
| `event_id` | Gerado | **Principal** - Identifica evento único |
| `fbp` | Cookie `_fbp` | Backup - Browser ID do Facebook |
| `fbc` | Cookie `_fbc` ou `fbclid` | Backup - Click ID do Facebook |
| `client_ip_address` | Request headers | Matching adicional |
| `client_user_agent` | Navigator | Matching adicional |
| `source_url` | `window.location.href` | Contexto do evento |

## 📈 Melhorias de Qualidade (Opcional)

Para aumentar ainda mais a qualidade de matching (atualmente 6.1/10 → meta 10/10):

### 1. Enviar Email e Telefone (Hash SHA-256)

Se você coletar email/telefone do usuário:

```javascript
import { trackPageView } from '../services/metaTracking';

// Após coletar dados do formulário
trackPageView({
  em: 'usuario@email.com',  // Será hasheado automaticamente
  ph: '5511999999999'       // Será hasheado automaticamente
});
```

**Impacto esperado:** +44% em conversões adicionais relatadas (conforme Meta)

### 2. Enviar External ID

Se você tem um ID único do usuário no seu sistema:

```javascript
trackPageView({
  external_id: 'user_12345' // ID único do seu sistema
});
```

### 3. Melhorar Cobertura de fbp

O Meta recomenda que pelo menos **75% dos eventos** tenham `fbp`.

**Problema atual:** 60.59% de cobertura de fbp

**Solução:** Garantir que o Pixel carregue antes de trackear eventos:

```javascript
// Já implementado em metaTracking.js
// Aguarda Pixel carregar antes de trackear
```

## 🧪 Testando a Implementação

### 1. Verificar se a API está funcionando

Abra o console do navegador e verifique:

```javascript
// Deve aparecer logs de tracking
// Verifique Network tab → filtro "meta-conversions"
```

### 2. Usar Meta Events Manager Test Events

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Selecione seu Pixel
3. Vá em **Test Events**
4. Navegue pelo site
5. Você deve ver eventos aparecendo em tempo real

### 3. Verificar Deduplicação

No **Test Events**, você verá:
- Eventos do **Browser** (Pixel)
- Eventos do **Server** (Conversions API)
- Status de **Deduplication**

Se estiver funcionando, você verá eventos sendo deduplicados corretamente.

## 📊 Monitoramento

### Métricas Importantes no Events Manager

1. **Cobertura de Eventos**
   - Meta: **≥ 75%**
   - Atual: **45%** (vai melhorar após implementação)

2. **Qualidade de Correspondência**
   - Meta: **10/10**
   - Atual: **6.1/10**

3. **Desduplicação de Eventos**
   - Meta: **Atende às melhores práticas**
   - Atual: **Não atende** (será corrigido)

### Como Verificar

1. Acesse **Events Manager** → Seu Pixel
2. Vá em **Diagnostics** → **Event Coverage**
3. Verifique:
   - ✅ Taxa de cobertura ≥ 75%
   - ✅ Qualidade de matching melhorando
   - ✅ Deduplicação funcionando

## 🔍 Troubleshooting

### Problema: API retorna erro 500

**Causa:** Access Token não configurado ou inválido

**Solução:**
1. Verifique se `META_CONVERSIONS_API_ACCESS_TOKEN` está configurado na Vercel
2. Verifique se o token está correto no Events Manager
3. Faça novo deploy após configurar

### Problema: Eventos não aparecem no Test Events

**Causa:** Pixel não está carregando ou API não está sendo chamada

**Solução:**
1. Verifique console do navegador para erros
2. Verifique Network tab → filtro "meta-conversions"
3. Verifique se o Pixel está carregando (verifique `window.fbq`)

### Problema: Deduplicação não está funcionando

**Causa:** `event_id` diferente entre Pixel e Conversions API

**Solução:**
1. Verifique se `metaTracking.js` está gerando o mesmo `event_id`
2. Verifique logs no console
3. Use Test Events para verificar se ambos eventos têm o mesmo `event_id`

### Problema: Cobertura ainda baixa (< 75%)

**Causa:** Falta de dados de deduplicação (fbp, fbc, etc)

**Solução:**
1. Garantir que Pixel carrega antes de trackear
2. Coletar email/telefone quando possível
3. Enviar `external_id` se disponível

## 📚 Referências

- [Meta Deduplication Guide](https://www.facebook.com/business/help/823677331451951)
- [Meta Conversions API Docs](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Meta Pixel Events](https://developers.facebook.com/docs/meta-pixel/reference)

## ✅ Checklist Final

- [x] API route criada (`api/meta-conversions.js`)
- [x] Serviço de tracking implementado (`src/services/metaTracking.js`)
- [x] Hook React criado (`src/hooks/useMetaTracking.js`)
- [x] Integração automática no Router
- [x] Pixel atualizado para não duplicar PageView
- [ ] **Configurar `META_CONVERSIONS_API_ACCESS_TOKEN` na Vercel** ← FAZER AGORA
- [ ] **Fazer deploy**
- [ ] **Testar no Events Manager**
- [ ] **Verificar deduplicação funcionando**
- [ ] **Monitorar métricas por 24-48h**

---

**Última atualização:** Implementação completa ✅  
**Próximo passo:** Configurar Access Token na Vercel 🎯

