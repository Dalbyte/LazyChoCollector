const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const http = require('http'),
https = require('https');
const download = require('download');

/*
**************************
* Functions
**************************
*/

// Help form https://stackoverflow.com/a/64038999
function httpGet(url) {
    return new Promise((resolve, reject) => {
    //const http = require('http'),
    //https = require('https');
  
      let client = http;
  
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
  
      client.get(url, (resp) => {
        let chunks = [];
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          chunks.push(chunk);
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
  
      }).on("error", (err) => {
        reject(err);
      });
    });
  }
  

/*
**************************
* Run
**************************
*/

// Help form https://stackoverflow.com/a/61079571

const Kalender = 'https://love.peters-schokowelt.de/audio/';
const KalenderNr = 'CC3';
// https://love.peters-schokowelt.de/audio/CC3/hb/Die_Stollenaffaere_Kapitel_1.mp3

for (i = 1; i <= 24; i++) {
    //i = 1;
    let urll = Kalender+KalenderNr+'/'+KalenderNr+'-'+i+'.html';
    // console.log(urll);

    (async(url) => {
        var buf = await httpGet(url);
        //console.log(buf.toString('utf-8'));
        const dom = new JSDOM(buf.toString('utf-8'));
        let AudioLink = dom.window.document.body.querySelector("audio").firstElementChild.src;
        let SplitLink = AudioLink.split("/");
        let Audio = SplitLink[SplitLink.length-1];
        console.log(Audio);
        let AudioDownload = Kalender+KalenderNr+'/'+AudioLink;
        await download(AudioDownload,"hoerbuch");
    })(urll);
}