// dsh-paopaocat-skin — 泡泡猫皮肤（浏览器半边）
// 纯 CSS 主题覆盖，自绘素材

const SKIN_CSS = `
/* 泡泡猫皮肤 — 可爱猫咪主题 */
:root {
  --paopaocat-primary: #FF8FA3;
  --paopaocat-secondary: #FFB3C1;
  --paopaocat-bg: #FFF5F7;
  --paopaocat-text: #4A3728;
}

/* 侧边栏背景 */
.sidebar {
  background: linear-gradient(180deg, #FFF0F3 0%, #FFE4E8 100%) !important;
}

/* 输入框 */
textarea, .composer-input {
  border-color: var(--paopaocat-secondary) !important;
  border-radius: 12px !important;
}

/* 发送按钮 */
button[type="submit"], .send-button {
  background: var(--paopaocat-primary) !important;
  border-radius: 12px !important;
}
`

export default function createSkinPlugin() {
  return {
    name: 'dsh-paopaocat-skin/client',
    apply(ctx) {
      // 注入皮肤样式
      const styles = ctx.get('styles')
      if (styles !== undefined) {
        styles.insert(SKIN_CSS)
      }
    },
  }
}
