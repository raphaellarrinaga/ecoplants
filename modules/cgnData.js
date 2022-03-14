const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/19Pw8bkQBliB997SbT1BvDZiKay_H-_2jH8HNHbDEpLw/values/Data!A1:Z1000?key='+ GOOGLE_API_KEY
const axios = require('axios')
const _ = require('lodash')
const { join, resolve } = require('path')
const { promisify } = require('util')
const { writeFileSync } = require('fs')

module.exports = async function (moduleOptions) {
  this.nuxt.hook('generate:before', async () => {
    const response = await axios.get(SHEET_DATA_SOURCE_URL)
    const rows = response.data.values
    const properties = rows.shift()
    const articles = []

    for (const i in rows) {
      // Remove empty rows (= nested arrays).
      if (Array.isArray(rows[i]) && rows[i].length) {
        articles.push(_.zipObject(properties, rows[i]))
      }
    }

    // Sort alphabetically.
    // @see https://stackoverflow.com/a/6712080
    articles.sort(function(a, b){
      if(a.Nom < b.Nom) { return -1; }
      if(a.Nom > b.Nom) { return 1; }
      return 0;
    })

    // const aReversed = articles.reverse();
    const data = JSON.stringify(articles)

    // const distGeneratePath = resolve(this.options.rootDir, join(this.options.generate.dir, '/cgnData.json'))
    const distGeneratePath = resolve(this.options.rootDir, join(this.options.alias.static, '/cgnData.json'))
    try { writeFileSync(distGeneratePath, data, 'utf-8'); }
    catch(e) { console.log('Failed to save cgnData.json'); }
  })
}
