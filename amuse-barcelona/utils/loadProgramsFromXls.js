const XLSX = require('xlsx');
const _ = require('lodash');
const axios = require('axios');


const workbook = XLSX.readFile('./dataToFeed/Appdata.xlsx');
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

const formattedData = [];

_.forEach(allData, (sheet, sheetName) => {

    const newProgram = {};
    _.set(newProgram,'title',sheetName);
    _.set(newProgram,'description',sheet[0]['כותרת']);
    _.set(newProgram,'main_image_path', '/images/app/' + sheet[0]['תוכנה'] + '.png');

    newProgram.steps = [];

    _.forEach(sheet, (currentRow) => {
        if (currentRow !== undefined) {

    programStep = {};
    _.set(programStep,'title',sheetName);
    _.set(programStep,'description',currentRow['כותרת']);
    _.set(programStep,'main_image_path', '/images/app/' + currentRow['תוכנה'] + '.png');
    _.set(programStep,'sensor_system_image', '/images/app/' + currentRow['חיישן'] + '.png');
    _.set(programStep,'activity', currentRow['פעולה/ תרגיל']);
    _.set(programStep,'response', currentRow['תגובת התוכן']);
    _.set(programStep,'values.physical_therapy', currentRow['תרגול - פיזיותרפיה']);
    _.set(programStep,'values.occupational_therapy', currentRow['ריפוי בעיסוק']);
    _.set(programStep,'values.speach_language_therapy', currentRow['קלינאות תקשורת']);
    _.set(programStep,'values.music_therapy', currentRow['תרפיה במוזיקה ']);
    _.set(programStep,'music_command', currentRow['מחשב מוסיקה']);
    _.set(programStep,'video_command', currentRow['מחשב וידאו']);
    newProgram.steps.push(programStep);
}
    });

    formattedData.push(newProgram);
});


_.forEach(formattedData,(program) => {
  axios.post('http://localhost:1337/program', _.omit(program,'steps'))
    .then((response) => {
      console.log(response.data);
      const programId = response.data.id;
      _.forEach(program.steps,(step) => {
        axios.post('http://localhost:1337/therapy', _.set(step,'programId',programId))
          .then((response2) => {
            console.log(response2.data);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    })

});

//console.log(formattedData);
