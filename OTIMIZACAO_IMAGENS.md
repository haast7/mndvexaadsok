# 🚀 Guia de Otimização de Imagens

## 📊 Tamanhos Ideais para Performance Web

### Metas por Tipo de Imagem:

1. **Background/Hero (BG.png)**
   - ✅ Meta: **150-300 KB**
   - 📐 Resolução: Máximo 1920px de largura
   - 🎨 Formato: WebP ou AVIF
   - ⚙️ Qualidade: 75-85%

2. **Imagens Principais (ESPECIALISTA.png)**
   - ✅ Meta: **100-200 KB**
   - 📐 Resolução: Máximo 1600px de largura
   - 🎨 Formato: WebP ou AVIF
   - ⚙️ Qualidade: 80-90%

3. **Imagens Secundárias (logos, banners)**
   - ✅ Meta: **50-150 KB**
   - 📐 Resolução: Máximo 1200px de largura
   - 🎨 Formato: WebP
   - ⚙️ Qualidade: 70-80%

## 🛠️ Ferramentas Recomendadas

### Online (Mais Fácil):
1. **Squoosh** (Google): https://squoosh.app/
   - Suporta WebP e AVIF
   - Interface visual
   - Comparação lado a lado

2. **TinyPNG**: https://tinypng.com/
   - Compressão inteligente
   - Mantém qualidade visual

3. **ImageOptim**: https://imageoptim.com/
   - Para Mac (também tem versão web)

### Desktop:
1. **Squoosh CLI**: `npm install -g @squoosh/cli`
2. **Sharp** (Node.js): Biblioteca poderosa
3. **GIMP** ou **Photoshop**: Com plugins WebP

## 📝 Passo a Passo para Converter

### Opção 1: Usando Squoosh.app (Recomendado)

1. Acesse: https://squoosh.app/
2. Arraste `BG.png` e `ESPECIALISTA.png`
3. Escolha formato:
   - **WebP**: Qualidade 80-85
   - **AVIF**: Qualidade 75-80 (melhor compressão)
4. Baixe as versões otimizadas
5. Renomeie para:
   - `BG.webp` / `BG.avif`
   - `ESPECIALISTA.webp` / `ESPECIALISTA.avif`
6. Coloque na pasta `/public/`

### Opção 2: Usando Squoosh CLI

```bash
# Instalar Squoosh CLI
npm install -g @squoosh/cli

# Converter BG.png para WebP (qualidade 80)
squoosh-cli --webp '{"quality":80}' -d ./public ./public/BG.png

# Converter ESPECIALISTA.png para WebP (qualidade 85)
squoosh-cli --webp '{"quality":85}' -d ./public ./public/ESPECIALISTA.png

# Converter para AVIF (melhor compressão)
squoosh-cli --avif '{"quality":75}' -d ./public ./public/BG.png
squoosh-cli --avif '{"quality":80}' -d ./public ./public/ESPECIALISTA.png
```

### Opção 3: Usando Sharp (Node.js)

Crie um script `optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const images = [
  { input: './public/BG.png', output: './public/BG.webp', quality: 80 },
  { input: './public/ESPECIALISTA.png', output: './public/ESPECIALISTA.webp', quality: 85 },
];

images.forEach(({ input, output, quality }) => {
  sharp(input)
    .webp({ quality })
    .toFile(output)
    .then(() => console.log(`✅ ${output} criado!`))
    .catch(err => console.error(`❌ Erro em ${output}:`, err));
});
```

## 🎯 Otimizações Aplicadas no Código

O código já está preparado para usar formatos modernos:

- ✅ **Picture element** com fallback automático
- ✅ **Loading eager** para imagens acima da dobra (hero)
- ✅ **Loading lazy** para imagens abaixo da dobra
- ✅ **fetchPriority="high"** para imagens críticas
- ✅ **decoding="async"** para não bloquear renderização

## 📦 Estrutura de Arquivos Esperada

```
/public/
  ├── BG.png          (fallback - manter original)
  ├── BG.webp         (formato moderno)
  ├── BG.avif         (formato mais moderno - opcional)
  ├── ESPECIALISTA.png (fallback - manter original)
  ├── ESPECIALISTA.webp (formato moderno)
  └── ESPECIALISTA.avif (formato mais moderno - opcional)
```

## ⚡ Resultados Esperados

Após a conversão, você deve ver:

- **BG.png**: 602 KB → **BG.webp**: ~150-250 KB (60-75% menor)
- **ESPECIALISTA.png**: 401 KB → **ESPECIALISTA.webp**: ~100-180 KB (55-70% menor)

Com AVIF (se suportado pelo navegador):
- Redução ainda maior: **70-85%** do tamanho original

## 🔍 Verificar Performance

1. Abra DevTools (F12)
2. Vá em **Network** → Filtre por **Img**
3. Recarregue a página
4. Verifique:
   - ✅ Tamanho dos arquivos baixados
   - ✅ Tempo de carregamento
   - ✅ Formato usado (WebP/AVIF)

## 💡 Dicas Extras

1. **Mantenha PNG original** como fallback
2. **Teste em diferentes navegadores** (Chrome, Firefox, Safari)
3. **Use AVIF quando possível** (melhor compressão)
4. **WebP como padrão** (suporte universal)
5. **Monitore Core Web Vitals** no Google Search Console

## 🎨 Outras Imagens para Otimizar

Não esqueça de otimizar também:
- `/public/kingpanda-logo.png.png` → Converter para WebP
- `/public/LP_02.png` → Converter para WebP
- `/public/man-t-shirt.jpg.jpeg` → Já é JPG, mas pode converter para WebP

---

**Próximos Passos:**
1. Converter `BG.png` e `ESPECIALISTA.png` usando Squoosh.app
2. Adicionar arquivos `.webp` e `.avif` na pasta `/public/`
3. Testar no navegador
4. Verificar redução de tamanho no DevTools












