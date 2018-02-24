const XLSX = require('xlsx');
const _ = require('lodash');
const axios = require('axios');


const workbook = XLSX.readFile('./dataToFeed/Machine.xlsx');
const sheet_name_list = workbook.SheetNames;
const allData = {};

sheet_name_list.forEach(function(y) {
  const worksheet = workbook.Sheets[y];
  const headers = {};
  const data = [];
  for(z in worksheet) {
    if(z[0] === '!') continue;
    //parse out the column, row, and value
    let tt = 0;
    for (let i = 0; i < z.length; i++) {
      if (!isNaN(z[i])) {
        tt = i;
        break;
      }
    };
    const col = z.substring(0,tt);
    const row = parseInt(z.substring(tt));
    const value = worksheet[z].v;

    //store header names
    if(row == 1 && value) {
      headers[col] = value;
      continue;
    }

    if(!data[row]) data[row]={};
    data[row][headers[col]] = value;
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();
  allData[y] = data;

});

const formattedData = {};

_.set(formattedData,'videoIp',allData.Sheet1[0].video_ip);
_.set(formattedData,'videoPort',allData.Sheet1[0].video_port);
_.set(formattedData,'audioIp',allData.Sheet1[0].audio_ip);
_.set(formattedData,'audioPort',allData.Sheet1[0].audio_port);

axios.post('http://localhost:1337/machine',formattedData)
  .then((response2) => {
    console.log(response2.data);
  });
