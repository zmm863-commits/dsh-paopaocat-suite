// dsh-paopaocat-welcome — 新手引导中心（浏览器半边）
// 首次打开欢迎卡、功能导航中心、反馈入口

const WELCOME_SEEN_KEY = 'paopaocat_welcome_seen'
const VERSION = '0.1.0'

const FEATURES = [
  { icon: '🎲', name: '骰子大作战', desc: '经典骰子游戏合集', action: 'dice-game' },
  { icon: '📎', name: '文件上传', desc: '一键上传文件到输入框', action: 'paperclip' },
  { icon: '🎨', name: '泡泡猫皮肤', desc: '可爱的猫咪主题', action: 'paopaocat-skin' },
]

function createWelcomeCard(onClose) {
  const card = document.createElement('div')
  card.className = 'paopaocat-welcome-card'
  card.innerHTML = `
    <div style="max-width:480px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,sans-serif;">
      <div style="text-align:center;margin-bottom:20px;">
        <div style="font-size:48px;margin-bottom:8px;">🐱</div>
        <h2 style="margin:0 0 4px;color:#333;font-size:20px;">欢迎使用泡泡猫插件合集</h2>
        <p style="margin:0;color:#888;font-size:13px;">v${VERSION} · Paopaocat DSH Suite</p>
      </div>
      <div style="background:#f8f9fa;border-radius:12px;padding:16px;margin-bottom:16px;">
        <p style="margin:0 0 12px;color:#555;font-size:14px;">🎉 合集已安装以下功能：</p>
        ${FEATURES.map(f => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eee;">
            <span style="font-size:24px;">${f.icon}</span>
            <div>
              <div style="font-weight:600;color:#333;font-size:14px;">${f.name}</div>
              <div style="color:#888;font-size:12px;">${f.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="text-align:center;margin-bottom:12px;">
        <p style="color:#888;font-size:12px;">💡 从左侧边栏可以找到各个功能入口</p>
      </div>
      <div style="text-align:center;">
        <button class="paopaocat-welcome-close" style="
          background:#4A90D9;color:white;border:none;border-radius:8px;
          padding:10px 32px;font-size:14px;cursor:pointer;font-weight:600;
        ">开始使用</button>
      </div>
      <div style="text-align:center;margin-top:12px;">
        <a href="mailto:25894126@qq.com?subject=泡泡猫插件合集反馈&body=版本: v${VERSION}%0A%0A问题描述:" 
           style="color:#aaa;font-size:11px;text-decoration:none;">
          反馈问题 · 25894126@qq.com
        </a>
      </div>
    </div>
  `
  card.querySelector('.paopaocat-welcome-close').addEventListener('click', () => {
    localStorage.setItem(WELCOME_SEEN_KEY, VERSION)
    onClose()
  })
  return card
}

export default function createClientPlugin() {
  return {
    name: 'dsh-paopaocat-welcome/client',
    apply(ctx) {
      const slots = ctx.get('slots')
      if (slots === undefined) return

      // 注册到工具栏视图区域
      slots.inject('tool.view.cordis', () => slots.register(
        { name: 'tool.view.cordis', key: 'paopaocat-welcome' },
        (props) => {
          // 只在首次打开时显示欢迎卡
          const seen = localStorage.getItem(WELCOME_SEEN_KEY)
          if (seen === VERSION) return null

          const el = document.createElement('div')
          const root = createWelcomeCard(() => {
            el.remove()
          })
          el.appendChild(root)
          return React.createElement('div', null, el)
        },
      ))
    },
  }
}
