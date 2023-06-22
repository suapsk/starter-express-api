const express = require('express');
const fs = require("fs");
const crypto = require('crypto');
const Jimp = require('jimp');
const { createCanvas, loadImage } = require("canvas");



const app = express()
const PORT = 3000

app.use(express.json())







function randomHex() {
  return crypto.randomBytes(16).toString('hex');
}


function getIrTime() {
  try {
    const date = new Date();
    date.setUTCHours(date.getUTCHours(), date.getUTCMinutes());
    var time = date.getTime();
    date.setUTCFullYear(date.getUTCFullYear(), 2, 22);
    var dstStart = date.getTime();
    date.setUTCFullYear(date.getUTCFullYear(), 8, 22);
    var dstEnd = date.getTime();
    if (time > dstStart && time < dstEnd) hourOffset = 4;
    date.setUTCHours(date.getUTCHours() + hourOffset, date.getUTCMinutes() + 30);
    return `${date.getUTCHours(), date.getUTCMinutes()}`;
  } catch (err) {
    console.error(err);
  }
}

function validateApiToken(api_token) {
  try {
    return true;
    fs.access(`./lib/token/${api_token}.json`, fs.constants.F_OK, (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    })
  } catch (err) {
    console.error(err);
  }
}


function validateParams(api_token, from_card, to_card, to_name, amount, type) {
  try {
    if (typeof (api_token) != 'undefined' && api_token != null && api_token != '' && api_token != ' ' && typeof (from_card) != 'undefined' && from_card != null && from_card != '' && from_card != ' ' && typeof (to_card) != 'undefined' && to_card != null && to_card != '' && to_card != ' ' && typeof (to_name) != 'undefined' && to_name != null && to_name != '' && to_name != ' ' && typeof (amount) != 'undefined' && amount != null && amount != '' && amount != ' ' && typeof (type) != 'undefined' && type != null && type != '' && type != ' ') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}


function checkType(type) {
  try {
    if (type === 'bank_meli' || type === 'bank_melat' || type === 'bank_maskan' || type === 'bank_sepah' || type === 'bank_postbank' || type === 'bank_eqtesad' || type === 'app' || type === 'hamrahcard' || type === 'digipay' || type === 'eva') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

function releaseFile(hexId) {
  try {
    res.send({
      success: true,
      fileURI: `${hexId}`
    });
  } catch (err) {
    console.error(err);
  }
}


function mkFakeCredit(api_token, from_card, to_card, to_name, amount, type) {
  try {
    if (type === 'app') {
      const hex = randomHex();
      const fileName = './assets/images/app.jpg';
      const output = `./lib/tmp/${hex}.jpg`
      //const loadedImage;
      Jimp.read(fileName)
        .then(function(image) {
          loadedImage = image;
          return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        })
        .then(function(font) {
          loadedImage.print(font, 40, 277, `${getIrTime()}`)
          loadedImage.print(font, 85, 327, `${amount}`)
          loadedImage.print(font, 40, 380, `${from_card}`)
          loadedImage.print(font, 40, 425, `${to_card}`)
          loadedImage.print(font, 25, 523, '7133483452')
            .write(output);
        })
        .then(function() {
          return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        })
        .then(function(font) {
          loadedImage.print(font, 230, 580, '7874338558')
          loadedImage.print(font, 180, 615, '7874338558')
            .write(output);
          releaseFile(hex);
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}


app.get("/api/residsaz", (req, res) => {
  try {
    const api_token = req.query.apitoken;
    const from_card = req.query.from;
    const to_card = req.query.to;
    const to_name = req.query.name;
    const amount = req.query.amount;
    const type = req.query.type;
    if (validateParams(api_token, from_card, to_card, to_name, amount, type) === true) {
      if (checkType(type) === true) {
        if (validateApiToken(api_token) === true) {
          //mkFakeCredit(api_token, from_card, to_card, to_name, amount, type)
          // ---- . . . .
          try {
            if (type === 'app') {
              const hex = randomHex();
              const fileName = './assets/images/app.jpg';
              const output = `./lib/tmp/${hex}.jpg`
              //const loadedImage;
              Jimp.read(fileName)
                .then(function(image) {
                  loadedImage = image;
                  return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
                })
                .then(function(font) {
                  loadedImage.print(font, 40, 277, `${getIrTime()}`)
                  loadedImage.print(font, 85, 327, `${amount}`)
                  loadedImage.print(font, 40, 380, `${from_card}`)
                  loadedImage.print(font, 40, 425, `${to_card}`)
                  loadedImage.print(font, 25, 523, '7133483452')
                    .write(output);
                })
                .then(function() {
                  return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
                })
                .then(function(font) {
                  loadedImage.print(font, 230, 580, '7874338558')
                  loadedImage.print(font, 180, 615, '7874338558')
                    .write(output);
                  return output;
                })
                .then(function(output) {
                  // ..
                  const
                    sFile = output,   // source image
                    sSave = output,  // "save as"
                    sText = `${to_name}`, // text to write
                    sX = 30, sY = 503;    // text position
                  // (C) LOAD IMAGE + DRAW TEXT
                  loadImage(sFile).then(img => {
                    // (C1) CREATE CANVAS
                    const canvas = createCanvas(img.width, img.height),
                      ctx = canvas.getContext("2d");

                    // (C2) DRAW IMAGE ONTO CANVAS
                    ctx.drawImage(img, 0, 0);

                    ctx.font = 'bold 32px "Vazirmatn", Arial, sans-serif';

                    // (C3) WRITE TEXT ONTO IMAGE
                    ctx.fillText(sText, sX, sY);

                    // (C4) SAVE
                    const out = fs.createWriteStream(sSave),
                      stream = canvas.createPNGStream();
                    stream.pipe(out);
                    out.on("finish", () => {
                      res.send({
                        success: true,
                        fileURI: `${hex}`
                      });
                    });
                  })
                  // ..
                })
                .catch(function(err) {
                  console.error(err);
                });
            }
          } catch (err) {
            console.error(err);
            return false;
          }
          // ---- . . . .
        } else {
          // invalid api token
          res.send({
            success: false,
            error: 'invalid api token'
          });
        }
      } else {
        // wrong type
        res.send({
          success: false,
          error: 'wrong type'
        });
      }
    } else {
      // wrong params
      res.send({
        success: false,
        error: 'wrong parameters'
      });
    }
  } catch (err) {
    console.error(err);
  }
});

/*
app.post("/api/items", (req, res) => {
  // Handle POST request to create a new item
});

app.put("/api/items/:id", (req, res) => {
  // Handle PUT request to update an existing item with ID
});

app.delete("/api/items/:id", (req, res) => {
  // Handle DELETE request to delete an existing item with ID
});
*/


/*
app.get('/les/:3id', (req, res) => {
  const { param } = req.params;
  
  res.status(200).send({
    name: 'mmd',
    age: `${param}`
  })
})
*/
/*
app.post('/les', (req, res) => {
  res.send({
    ts: 'lole'
  })
})
*/

app.listen(
  PORT,
  () => console.log('API service started')
)
