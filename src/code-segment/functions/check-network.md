# 网络检查

```typescript
import * as ping from 'ping'

const domains = [
  'tmall.com',
  'baidu.com',
  'qq.com',
  'taobao.com'
]

const pingHost = (host, config) => ping.promise.probe(host, config || {})

const pingDomains = async (hosts: string[]) => {
  const result = []
  if (!Array.isArray(hosts) || !hosts.length) return result
  for (var i = 0; i<hosts.length; i++) {
    try {
      const r = await pingHost(hosts[i], {})
      result.push({
        host: r.host,
        alive: r.alive,
        time: r.time
      })
    } catch (error) {
      console.error(error)
    }
  }

  return result
}

/**
 * 检查是否在线
 * @param strictMode 严格模式
 * @param hosts 检测用的Hosts
 * @returns {Promise<Boolean>}
 */
export const isOnline = async (strictMode: Boolean, hosts: string[] = domains): Promise<Boolean> => {
  const pingResult = await pingDomains(hosts)
  if (!pingResult || pingResult.length !== hosts.length) throw new Error('【isOnline】: Ping domain failed.')
  const result = strictMode ? pingResult.every(el => el.alive) : pingResult.some(el => el.alive)
  return result
}
```