async function get ({ schema, id, options = {} }) {
  const { thrownNotFound = true } = options
  const { find } = this.app.bajo.lib._
  const result = find(this.storage[schema.name], { id })
  if (!result && thrownNotFound) throw this.error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
  return { data: result }
}

export default get
