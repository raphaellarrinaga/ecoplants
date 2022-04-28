const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL
const SHEET_DATA_SOURCE_URL = GOOGLE_SHEET_URL + GOOGLE_API_KEY
const GDRIVE_CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL
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

    //
    // Push to array if a key exist.
    //
    function pushImageToArray(arr, name, val, key) {
      const found = arr.some(el => el.Nom === name);
      const title = key.substring(key.indexOf('-0')).replace(/-|_/g,' ');

      // Ex: "Achillea ptarmica" does not exist, create all subtree.
      if (!found) {
        arr.push({
          Nom: name,
          images: {
            0: {
              title: title,
              url: val
            }
          }
        })
      } else {
        // Ex: "Achillea ptarmica" exist.
        const keyName = arr.findIndex(el => el.Nom === name);

        // Images does exist.
        if (arr[keyName]["images"]) {
          const elem = {"title": title, "url": val};

          // Kind of dirty way to use integers as keys to push images.
          // @todo see best best practice.
          const lastKey = Object.keys(arr[keyName]["images"]).pop();
          const newKey = parseInt(lastKey) + 1;

          arr[keyName].images[newKey] = {
            title: title,
            url: val
          };

        // Images does NOT exist.
        } else {
          arr[keyName]["images"] = {
            0: {
              title: title,
              url: val
            }
          };
        }
      }
    }

    function pushThumbToArray(arr, name, val) {
      const found = arr.some(el => el.Nom === name);

      if (!found) {
        arr.push({
          Nom: name,
          thumb: val
        })
      } else {
        const index = arr.findIndex(el => el.Nom === name);
        arr[index]["thumb"] = val;
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

    //
    // Get Google Drive data.
    //
    const auth = new google.auth.JWT(
      GDRIVE_CLIENT_EMAIL, null,
      GDRIVE_PRIVATE_KEY, scopes
    );

    const drive = google.drive({ version: "v3", auth });
    let images = []

    //
    // List files.
    //
    drive.files.list({pageSize: 1000}, (err, res) => {
      if (err) throw err;
      const files = res.data.files;

      // There is a limit for the amount of images loaded from drive.
      // 1000 is the limit and currently enough but the problem could
      // come back if we upload more than 1000 (one day).
      //
      // pageSize -> The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached. Acceptable values are 1 to 1000, inclusive. (Default: 100)
      //
      // @see https://stackoverflow.com/questions/66208433/google-drive-api-files-list-size-100-when-specify-fields-parameter

      if (files.length) {
        // console.log(files);

        const map1 = files.forEach((file) => {
          if (file.mimeType === 'image/jpeg') {
            const sourceUrl = "https://drive.google.com/uc?id=" + file.id;
            const name = file.name;

            // Format the image name.
            // Remove what comes after "-", replace "_" by " ".
            if (name.includes("-thumb")) {
              const newName = name.substring(0, name.indexOf('-thumb')).replace("_", " ");
              pushThumbToArray(images, newName, sourceUrl);
            } else {
              const newName = name.substring(0, name.indexOf('-')).replace("_", " ");
              const id = name.substring(name.indexOf('-0') + 1).replace(".jpg", "")
              pushImageToArray(images, newName, sourceUrl, id);
            }
          }
        });
      } else {
        console.log('No files found');
      }

      //
      // Map images with sheet Object.
      //
      let unmatched = [],
        matched = [];
      articles.every(x => images.map(e => e.Nom).includes(x.Nom) ? matched.push(x) : unmatched.push(x))
      matched = matched.map(x => Object.assign(x, images.find(e => e.Nom === x.Nom )))

      const mergeResult = [...matched, ...unmatched];

      //
      // Sort alphabetically.
      //
      // @see https://stackoverflow.com/a/6712080
      //
      mergeResult.sort(function(a, b){
        if(a.Nom < b.Nom) { return -1; }
        if(a.Nom > b.Nom) { return 1; }
        return 0;
      })

      //
      // Generate JSON.
      //
      const data = JSON.stringify(mergeResult)
      const distGeneratePath = resolve(this.options.rootDir, join(this.options.alias.static, '/cgnData.json'))
      try { writeFileSync(distGeneratePath, data, 'utf-8'); }
      catch(e) { console.log('Failed to save cgnData.json'); }

    });


  })
}
