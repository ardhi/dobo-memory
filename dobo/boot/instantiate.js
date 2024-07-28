async function instantiate ({ connection, schemas, noRebuild }) {
  const { getPluginDataDir } = this.app.bajo
  const { fs } = this.app.bajo.lib
  const { pick } = this.app.bajo.lib._
  this.storage = this.storage ?? {}
  const instance = pick(connection, ['name', 'type'])
  this.instances = this.instances ?? []
  this.instances.push(instance)
  // if (noRebuild) return
  for (const schema of schemas) {
    this.storage[schema.name] = this.storage[schema.name] ?? [] // init empty model
  }
  if (this.config.persistence.models.length > 0) {
    const dir = `${getPluginDataDir('doboMemory')}/data`
    fs.ensureDirSync(dir)
    // load
    for (const key of this.config.persistence.models) {
      if (!this.storage[key]) this.fatal('Invalid model for persistence: %s', key)
      const file = `${dir}/${key}.json`
      if (!fs.existsSync(file)) continue
      try {
        const data = fs.readFileSync(file, 'utf8')
        this.storage[key] = JSON.parse(data)
      } catch (err) {
        this.fatal('Can\'t load %s: %s', key, err.message)
      }
    }
    // persist periodically
    setInterval(() => {
      for (const key of this.config.persistence.models) {
        const data = this.storage[key]
        fs.writeFileSync(`${dir}/${key}.json`, JSON.stringify(data), 'utf8')
      }
    }, this.config.persistence.period * 1000)
  }
}

export default instantiate
