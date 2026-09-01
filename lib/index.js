// dsh-paopaocat-suite — 合集元包（宿主半边）
// 此包本身不提供业务逻辑，仅通过 cordis.patch.yml 统一挂载全部成员插件。

const name = 'dsh-paopaocat-suite'

export default function createPlugin() {
  return {
    name,
    apply(ctx) {
      // 合集元包不需要额外的 host 逻辑
      // 所有功能由成员插件各自的 host 半边提供
    },
  }
}
