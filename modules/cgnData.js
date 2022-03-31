const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/19Pw8bkQBliB997SbT1BvDZiKay_H-_2jH8HNHbDEpLw/values/Data!A1:Z1000?key='+ GOOGLE_API_KEY
const GDRIVE_CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL
// const GDRIVE_PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY
// @see https://github.com/auth0/node-jsonwebtoken/issues/642#issuecomment-585173594
const GDRIVE_PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/gm, '\n')
const axios = require('axios')
const _ = require('lodash')
const { join, resolve } = require('path')
const { promisify } = require('util')
const { writeFileSync } = require('fs')

const { google } = require('googleapis');
const scopes = [
  'https://www.googleapis.com/auth/drive'
];
// const credentials = require('./credentials.json');

module.exports = async function (moduleOptions) {
  this.nuxt.hook('generate:before', async () => {

    // Push to array if key exist.
    function pushImageToArray(arr, name, key, val) {
      const found = arr.some(el => el.Nom === name);
      const legend = key.substring(key.indexOf('-0')).replace(/-|_/g,' ');
      if (!found) {
        arr.push({
          Nom: name,
          images: {
            [key]: {
              legend: legend,
              url: val
            }
          }
         })
      } else {
        const index = arr.findIndex(el => el.Nom === name);
        arr[index].images[key] = {
          legend: legend,
          url: val
        };
      }
    }

    //
    // Get Google Sheet data.
    //
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

    // const map1 = articles.map(x => x * 2);
    // const map1 = articles.map((x) => {
    //   console.log(x);
    // });

    // const aReversed = articles.reverse();
    // const data = JSON.stringify(articles)

    // const distGeneratePath = resolve(this.options.rootDir, join(this.options.generate.dir, '/cgnData.json'))

    // const distGeneratePath = resolve(this.options.rootDir, join(this.options.alias.static, '/cgnData.json'))
    // try { writeFileSync(distGeneratePath, data, 'utf-8'); }
    // catch(e) { console.log('Failed to save cgnData.json'); }

    //
    // Get Google Drive data.
    //
    // const auth = new google.auth.JWT(
    //   credentials.client_email, null,
    //   credentials.private_key, scopes
    // );
    const auth = new google.auth.JWT(
      GDRIVE_CLIENT_EMAIL, null,
      GDRIVE_PRIVATE_KEY, scopes
    );

    const drive = google.drive({ version: "v3", auth });

    let images = []

    // List files.
    drive.files.list({}, (err, res) => {
      if (err) throw err;
      const files = res.data.files;

      if (files.length) {
        const map1 = files.forEach((file) => {
          if (file.mimeType === 'image/jpeg') {
            const sourceUrl = "https://drive.google.com/uc?id=" + file.id;
            const name = file.name;

            // Format the image name.
            // Remove what comes after "-", replace "_" by " ".
            if (name.includes("-thumb")) {
              const newName = name.substring(0, name.indexOf('-thumb')).replace("_", " ");
              pushImageToArray(images, newName, "thumb", sourceUrl);
            } else {
              const newName = name.substring(0, name.indexOf('-')).replace("_", " ");
              const id = name.substring(name.indexOf('-0') + 1).replace(".jpg", "")
              pushImageToArray(images, newName, id, sourceUrl);
            }
          }
        });
      } else {
        console.log('No files found');
      }

      // var unmatched = [],
      //   matched = [];
      // images.every(x=> test.map(e=> e.name).includes(x.name) ? matched.push(x) : unmatched.push(x))
      // matched = matched.map(x=> Object.assign(x, test.find(e=> e.name ===x.name )))
      let unmatched = [],
        matched = [];
      articles.every(x => images.map(e => e.Nom).includes(x.Nom) ? matched.push(x) : unmatched.push(x))
      matched = matched.map(x => Object.assign(x, images.find(e => e.Nom === x.Nom )))

      const mergeResult = [...matched, ...unmatched];

      // Sort alphabetically.
      // @see https://stackoverflow.com/a/6712080
      mergeResult.sort(function(a, b){
        if(a.Nom < b.Nom) { return -1; }
        if(a.Nom > b.Nom) { return 1; }
        return 0;
      })

      // Generate JSON.
      const data = JSON.stringify(mergeResult)

      const distGeneratePath = resolve(this.options.rootDir, join(this.options.alias.static, '/cgnData.json'))
      try { writeFileSync(distGeneratePath, data, 'utf-8'); }
      catch(e) { console.log('Failed to save cgnData.json'); }

    });


  })
}
