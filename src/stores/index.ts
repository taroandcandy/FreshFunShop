import { createPinia } from "pinia";
import persist from 'pinia-plugin-persistedstate'
// 创建pinia实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)
// 默认导出给main.ts使用
export default pinia
export * from './modules/member'