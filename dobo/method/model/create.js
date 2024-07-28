async function exists ({ schema, options = {} }) {
  this.storage[schema.name] = []
}

export default exists
