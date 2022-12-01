import Router from '@koa/router'
import exempleRoutes from '#components/exemple/exemple-routes.js'
import taskRoutes from '#components/task/task-routes.js'
import listRoutes from '#components/list/list-routes.js'

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.use('/exemples', exempleRoutes.routes(), exempleRoutes.allowedMethods())
API_V1_ROUTER.use('/tasks', taskRoutes.routes(), taskRoutes.allowedMethods())
API_V1_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())

export { API_V1_ROUTER }