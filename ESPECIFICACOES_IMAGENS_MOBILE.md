# 📐 Especificações de Imagens - LP Metodox Mobile

## 🎯 Objetivo: Performance 100% Mobile

Meta: **LCP < 2.5s** e **Performance Score 95-100**

---

## 🖼️ IMAGEM 1: Background (BG) - Versão Mobile

### **Especificações Técnicas:**

| Propriedade | Valor |
|------------|-------|
| **Largura** | **800px** (fixo) |
| **Altura** | **Proporcional** (mantém aspect ratio original) |
| **Formato** | **WebP** (obrigatório) |
| **Qualidade WebP** | **75-80%** |
| **Tamanho máximo** | **< 100 KB** (ideal: 50-80 KB) |
| **Orientação** | Horizontal (landscape) |
| **Aspect Ratio** | ~16:9 ou 4:3 (mantém proporção original) |

### **Como a imagem é usada:**

- **Cobre toda a tela** (`object-cover`, `w-full h-full`)
- **Breakpoint mobile:** até 767px de largura
- **Overlay escuro:** Tem um gradiente escuro por cima (não precisa se preocupar com isso na imagem)
- **Foco visual:** A parte importante fica à esquerda (onde fica o texto)

### **Dicas de Otimização:**

1. **Corte inteligente:** Se a imagem original for muito grande, você pode cortar um pouco das bordas direita/inferior, já que o texto fica à esquerda
2. **Compressão:** Use qualidade 75-80% no WebP - a diferença visual é mínima mas o tamanho reduz muito
3. **Foco:** Mantenha a parte esquerda da imagem com boa qualidade (onde fica o texto)

### **Nome do arquivo:**
```
BG-mobile.webp
```

---

## 👤 IMAGEM 2: Especialista - Versão Mobile

### **Especificações Técnicas:**

| Propriedade | Valor |
|------------|-------|
| **Largura** | **600px** (fixo) |
| **Altura** | **Proporcional** (mantém aspect ratio original) |
| **Formato** | **WebP** (obrigatório) |
| **Qualidade WebP** | **80-85%** |
| **Tamanho máximo** | **< 80 KB** (ideal: 40-60 KB) |
| **Orientação** | Vertical (portrait) |
| **Aspect Ratio** | ~2:3 ou 3:4 (pessoa em pé) |

### **Como a imagem é usada:**

- **Posição:** Aparece abaixo do texto "Acesso imediato"
- **Tamanho máximo:** `max-h-[60vh]` (60% da altura da tela)
- **Largura:** `w-full` (ocupa toda largura disponível)
- **Alinhamento:** Centralizado, alinhado na base (`object-bottom`)
- **Padding:** Tem padding lateral (`px-4 sm:px-6`)

### **Dicas de Otimização:**

1. **Foco no personagem:** A imagem mostra o especialista, então mantenha boa qualidade no rosto e roupa
2. **Fundo:** Se tiver fundo, pode ser mais desfocado/comprimido
3. **Altura:** Como tem `max-h-[60vh]`, não precisa ser muito alta - 600px de largura já é suficiente
4. **Compressão:** Use qualidade 80-85% - precisa de mais qualidade que o background porque é o elemento principal

### **Nome do arquivo:**
```
ESPECIALISTA-mobile.webp
```

---

## 📋 Checklist de Entrega

### **Background (BG-mobile.webp):**
- [ ] Largura: **800px**
- [ ] Formato: **WebP**
- [ ] Qualidade: **75-80%**
- [ ] Tamanho: **< 100 KB** (ideal < 80 KB)
- [ ] Orientação: Horizontal
- [ ] Nome: `BG-mobile.webp`

### **Especialista (ESPECIALISTA-mobile.webp):**
- [ ] Largura: **600px**
- [ ] Formato: **WebP**
- [ ] Qualidade: **80-85%**
- [ ] Tamanho: **< 80 KB** (ideal < 60 KB)
- [ ] Orientação: Vertical
- [ ] Nome: `ESPECIALISTA-mobile.webp`

---

## 🛠️ Como Preparar as Imagens

### **Opção 1: Squoosh.app (Recomendado - Mais Fácil)**

1. Acesse: **https://squoosh.app/**
2. Faça upload da imagem original
3. No lado direito, escolha **WebP**
4. Configure:
   - **Resize:** Defina largura (800px para BG, 600px para Especialista)
   - **Quality:** Ajuste slider (75-80% para BG, 80-85% para Especialista)
5. Veja o tamanho do arquivo no canto inferior direito
6. Clique em **Download**
7. Renomeie para `BG-mobile.webp` ou `ESPECIALISTA-mobile.webp`

### **Opção 2: Photoshop/GIMP**

1. Abra a imagem original
2. **Image → Image Size** (ou Ctrl+Alt+I)
3. Defina largura (800px ou 600px)
4. Mantenha "Constrain Proportions" ativado
5. Exporte como WebP:
   - **File → Export → Export As → WebP**
   - Ajuste qualidade (75-85%)
   - Salve

### **Opção 3: Online (TinyPNG + Conversor)**

1. Comprima primeiro em: **https://tinypng.com/**
2. Depois converta para WebP em: **https://cloudconvert.com/png-to-webp**
3. Redimensione se necessário

---

## 📊 Comparação: Antes vs Depois

### **Antes (Situação Atual):**
- Mesma imagem para mobile e desktop
- Background: ~200-400 KB
- Especialista: ~150-300 KB
- **LCP Mobile:** 5.0s ❌

### **Depois (Com Versões Mobile):**
- Imagens otimizadas para mobile
- Background mobile: ~50-80 KB (redução de 70-80%)
- Especialista mobile: ~40-60 KB (redução de 70-75%)
- **LCP Mobile esperado:** < 2.5s ✅

---

## 🎯 Metas de Performance

| Métrica | Antes | Meta | Como Atingir |
|---------|-------|------|--------------|
| **LCP Mobile** | 5.0s | < 2.5s | Imagens mobile otimizadas |
| **FCP Mobile** | 2.6s | < 1.8s | Preload + imagens menores |
| **Speed Index** | 4.5s | < 3.0s | Carregamento prioritário |
| **Performance Score** | 75 | 95-100 | Todas otimizações acima |
| **Tamanho Total** | ~500 KB | < 150 KB | Versões mobile otimizadas |

---

## 📁 Onde Colocar os Arquivos

Depois de preparar as imagens, coloque-as em:

```
public/metodox/
  ├── BG-mobile.webp          ← NOVO (versão mobile)
  ├── BG-_1__11zon.webp       ← Existente (desktop)
  ├── ESPECIALISTA-mobile.webp ← NOVO (versão mobile)
  └── ESPECIALISTA-_1_.webp   ← Existente (desktop)
```

---

## ✅ Próximos Passos Após Entregar as Imagens

1. ✅ Você entrega: `BG-mobile.webp` e `ESPECIALISTA-mobile.webp`
2. ✅ Eu atualizo o código para usar essas versões no mobile
3. ✅ Testamos performance no Lighthouse
4. ✅ Ajustamos se necessário

---

## 💡 Dicas Finais

1. **Não precisa ser perfeito:** Se ficar 90 KB ao invés de 80 KB, está ótimo!
2. **Teste visual:** Abra a imagem no navegador e veja se a qualidade está boa
3. **Foco no LCP:** O background é mais crítico que o especialista (carrega primeiro)
4. **Mantenha originais:** Guarde as versões desktop originais também

---

**Pronto para começar?** 🚀

Envie as duas imagens quando estiverem prontas:
- `BG-mobile.webp` (800px, < 100 KB)
- `ESPECIALISTA-mobile.webp` (600px, < 80 KB)





