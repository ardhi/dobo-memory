import getRecord from './get.js'

async function create ({ schema, body, options = {} }) {
  const { noResult } = options
  const exist = await getRecord.call(this, { schema, id: body.id, options: { thrownNotFound: false } })
  if (exist.data) throw this.error('Record \'%s@%s\' exists already!', body.id, schema.name)
  this.storage[schema.name].push(body)
  if (noResult) return
  return { data: body }
}

export default create
