async function exists ({ schema, options = {} }) {
  this.storage[schema.name].splice(0)
}

export default exists
