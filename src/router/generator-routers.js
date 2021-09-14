
// import asyncRouterMap from './asyncRouterMap'

// vite动态导入组件
const modules = import.meta.glob('../views/**/*.vue')
const modulesLayouts = import.meta.glob('../layouts/*.vue')
// 前端路由表
const constantRouterComponents = {
  MainLayout: modulesLayouts['../layouts/MainLayout.vue'],
  PageView: modulesLayouts['../layouts/PageView.vue'],
  'home3': modules['../views/from/input.vue'],
  'home2': modules['../views/home.vue'],
  'form-input':  modules['../views/from/input.vue'],
  'form-select': modules['../views/from/select.vue'],
}

// 顶级的id
const rootParentsId= '0000000000'

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  url: '',
  target: 'MainLayout',
  redirectUrl: '/',
  menuName: '首页',
  children: []
}
// 前端未找到页面路由（固定不用改）
const notFoundRouter = { 
  path: '/:w+',
  redirect: '/404'
}


export function generatorDynamicRouter(menuList){
  return new Promise((resolve,reject) => {
    const menuNav = []
    const childrenNav = []
    listToTree(menuList, childrenNav, rootParentsId)
    rootRouter.children = childrenNav.sort((a, b) => a.seq - b.seq)
    menuNav.push(rootRouter)
    const routers = generator(menuNav)
    routers.push(notFoundRouter)
    console.log(routers,'routersroutersroutersroutersroutersroutersrouters')
    resolve({
      routers: routers
    })
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
 const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      child.children = child.children.sort((a, b) => a.seq - b.seq)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
 export const generator = (routerMap, parent) => {
  // console.log('generator function', routerMap, parent)
  return routerMap.map(item => {
    const { title, isShow, hideChildrenInMenu, keepAlive } = item
    // 获取icon
    const icon = item.icon
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /performance/ResultQuery
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.target || '',
      // 是否设置隐藏子菜单
      hideChildrenInMenu,
      // 该路由对应页面的 组件  (动态加载)
      component: (constantRouterComponents[item.target]) || (modules[`../views/${item.target}`]),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon,
        keepAlive
      }
    }
    // 是否设置了隐藏菜单
    if (isShow === '0') {
      currentRouter.hidden = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}