// dsh-paopaocat-welcome — 新手引导中心（宿主半边）

const name = 'dsh-paopaocat-welcome'
const VERSION = '0.1.0'

export default function createPlugin() {
  return {
    name,
    apply(ctx) {
      harness.handle('paopaocat-welcome:version', () => {
        return { version: VERSION }
      })
    },
  }
}
