import List from '#components/list/list-model.js'
import Joi from 'joi'

export async function index (ctx) {
  try {
    const lists = await List.find({})
    ctx.ok(lists)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(ctx.params.id.length <= 0) return ctx.notFound({ message: 'Id missing, list ressource not found' })
    const list = await List.findById(ctx.params.id)
    ctx.ok(list)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required()
    })
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const list = await List.create(value)
    ctx.ok(list)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required(),
      favorite: Joi.boolean()
    })
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    
    const list = await List.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true })
    ctx.ok(list)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function del (ctx) {
  try {
    await List.findByIdAndDelete(ctx.params.id)
    ctx.ok()
  } catch (error) {
    ctx.badRequest({ message: e.message })
  }
}