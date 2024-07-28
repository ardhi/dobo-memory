async function clear ({ schema, options = {} }) {
  this.storage[schema.name].splice(0)
  return true
}

export default clear
