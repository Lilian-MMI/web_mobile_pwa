import Router from '@koa/router'
import * as exempleControllers from '#components/exemple/exemple-controllers.js'

const exemples = new Router()

exemples.get('/', exempleControllers.index)
exemples.get('/:id', exempleControllers.id)
exemples.post('/', exempleControllers.create)

export default exemples