import Router from '@koa/router'
import * as ListControllers from '#components/list/list-controllers.js'

const lists = new Router()

lists.get('/', ListControllers.index)
lists.get('/:id', ListControllers.id)
lists.post('/', ListControllers.create)
lists.put('/:id', ListControllers.update)
lists.del('/:id', ListControllers.del)

export default lists