/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const specRouter = {
  path: '/spec',
  component: Layout,
  redirect: '/spec/nav',
  name: 'SPEC',
  meta: {
    title: '信息管理',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'nav',
      component: () => import('@/views/spec/nav'),
      name: 'Nav',
      meta: { title: '导航管理' }
    },
    {
      path: 'test',
      component: () => import('@/views/spec/test'),
      name: 'Test',
      meta: { title: '测试' }
    },
    {
      path: 'uploadimages',
      component: () => import('@/views/spec/uploadimage'),
      name: 'UploadImages',
      meta: { title: '头像上传' }
    }
  ]
}
export default specRouter
