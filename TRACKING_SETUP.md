# Configuração do Tracking - IMPORTANTE

## ⚠️ AÇÃO NECESSÁRIA

Você precisa substituir `SEU_FUNNEL_ID` pelo ID real do seu funil no TrackPixel.

### Passo 1: Atualizar o FUNNEL_ID

Edite o arquivo `src/config/tracking.js` e substitua:

```javascript
export const FUNNEL_ID = 'SEU_FUNNEL_ID'; // ← SUBSTITUA AQUI
```

Pelo ID real do seu funil.

### Passo 2: Atualizar o script no index.html

No arquivo `index.html`, linha 15, substitua:

```html
s.src = 'https://dalhy.com/tracking.js?f=SEU_FUNNEL_ID';
```

Pelo ID real do seu funil:

```html
s.src = 'https://dalhy.com/tracking.js?f=SEU_FUNNEL_ID_REAL';
```

## ✅ O que já está configurado:

1. ✅ Meta Pixel instalado (ID: 1359109655309883)
2. ✅ Script TrackPixel no `<head>`
3. ✅ Script de tracking de cliques no `<body>`
4. ✅ Todos os links do Telegram usando links trackeados
5. ✅ Hook `useTrackingLink` para obter links dinamicamente
6. ✅ Função de tracking de cliques implementada

## 📊 Eventos sendo rastreados:

- **PageView**: Automático via Meta Pixel
- **Click**: Quando usuário clica em qualquer link do Telegram
- **EnterChannel**: Quando usuário entra no grupo (via bot do Telegram)
- **LeaveChannel**: Quando usuário sai do grupo (via bot do Telegram)

## 🔗 Links trackeados:

Todos os links do Telegram agora usam `window.TrackPixel.getTrackingLink()` que retorna o link com parâmetros de tracking.

## 📝 Próximos passos (opcional para melhorar qualidade):

Se você quiser coletar dados do usuário antes de enviá-lo para o grupo (para aumentar a qualidade do pixel), você pode:

1. Criar um formulário de captura
2. Usar `window.TrackPixel.setUserData()` para enviar os dados
3. Depois redirecionar usando `window.TrackPixel.getTrackingLink()`

Exemplo está nas instruções do arquivo "Instruções".

