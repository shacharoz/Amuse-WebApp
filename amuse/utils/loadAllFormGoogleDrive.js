const gsjson = require('google-spreadsheet-to-json');
const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');

const configurationDir = process.argv[2] || "/Users/ohad/Google Drive/Asulin Application/newconfig";

fs.readdir(configurationDir + "/therapists", (err, files) => {
  const therapists = _.omit(files, [0, 1]);
  _.forEach(therapists, therapist => {


    const newTherapist = {
      "fullname": therapist
      , "image_path": "images/app/patients/30.jpg"
      , "gender": "male"
      , "age": "34"
      , "address": "..."
      , "country": "england"
      , "history": "a long text of history"
    };

    axios.post('http://localhost:1337/therapist', newTherapist)
      .then(response => {
        console.log(`Added therapist: ${response.data.fullname}`);
        return response.data;
      })
      .then(therapist => {
        return fs.readdir(configurationDir + "/therapists/" + therapist.fullname, (err, files) => {
          const patients = _.omit(files, [0]);

          _.forEach(patients, (patientName) => {

            const newPatient = {
              "fullname": patientName
              , "image_path": "images/app/patients/30.jpg"
              , "gender": "male"
              , "age": "34"
              , "address": "..."
              , "country": "england"
              , "history": "a long text of history"
            };

            return axios.post('http://localhost:1337/patient', newPatient)
              .then(response => {
                console.log(`Added patient: ${response.data.fullname}`);
                return {patient: response.data, therapist: therapist};
              })
              .then(addedPatientData => {
                return Promise.all([addedPatientData, axios.get(`http://localhost:1337/therapist/associatePatient?id=${addedPatientData.therapist.id}&patientId=${addedPatientData.patient.id}`)]);

              })
              .then(associationData => {
                console.log(`Associated patient ${associationData[0].patient.fullname} with therapist ${associationData[0].therapist.fullname}`);
                return associationData;
              })
              .then(associationData => {
                fs.readdir(configurationDir + "/therapists/" + associationData[0].therapist.fullname + "/" + associationData[0].patient.fullname, (err, files,patient=associationData[0].patient) => {

                  const programs = _.omit(files, [0, 1]);
                  const programPaths = _.map(programs, filename => {
                    return {program:filename, path: configurationDir + "/therapists/" + associationData[0].therapist.fullname + "/" + associationData[0].patient.fullname + "/" + filename};
                  });

                  programPaths.forEach((programFile,patientData=patient) => {


                    const spreadsheetId = JSON.parse(fs.readFileSync(programFile.path).toString()).doc_id;

                    gsjson({
                      spreadsheetId: spreadsheetId,
                      // allWorksheets: true,
                      // hash:true,
                      credentials: require('./credentials/Amuse-2e01991f6d40.json'),
                      // other options...
                    })
                      .then(function (activities, program=programFile.program, patientData=patient) {

                        const newProgram = {};
                        const programTitle = _.replace(program,".gsheet","");
                        _.set(newProgram,'title',programTitle);
                        _.set(newProgram,'description',activities[0]['כותרת']);
                        _.set(newProgram,'main_image_path', '/images/app/' + activities[0]['תוכנה'] + '.png');
                        newProgram.steps = [];

                        activities.forEach((currentActivity,programTitle=programTitle) => {

                          programStep = {};
                          _.set(programStep,'title',programTitle);
                          _.set(programStep,'description',currentActivity['כותרת']);
                          _.set(programStep,'main_image_path', '/images/app/' + currentActivity['תוכנה'] + '.png');
                          _.set(programStep,'sensor_system_image', '/images/app/' + currentActivity['חיישן'] + '.png');
                          _.set(programStep,'activity', currentActivity['פעולה/תרגיל']);
                          _.set(programStep,'response', currentActivity['תגובתהתוכן']);
                          _.set(programStep,'values.physical_therapy', currentActivity['תרגולפיזיותרפיה']);
                          _.set(programStep,'values.occupational_therapy', currentActivity['ריפויבעיסוק']);
                          _.set(programStep,'values.speach_language_therapy', currentActivity['קלינאותתקשורת']);
                          _.set(programStep,'values.music_therapy', currentActivity['תרפיהבמוזיקה']);
                          _.set(programStep,'therapist_station_command', currentActivity['מחשבטרפיסט']);
                          _.set(programStep,'station_1_command', currentActivity['מחשבעמדה1']);
                          _.set(programStep,'station_2_command', currentActivity['מחשבעמדה2']);
                          _.set(programStep,'station_3_command', currentActivity['מחשבעמדה3']);
                          _.set(programStep,'station_4_command', currentActivity['מחשבעמדה4']);
                          _.set(programStep,'station_6_command', currentActivity['מחשבעמדה5']);
                          newProgram.steps.push(programStep);

                        });

                        axios.post('http://localhost:1337/program', newProgram)
                          .then((response,patientData=patient) => {
                            console.log(`Added program ${response.data.title}`);
                            const programId = response.data.id;

                            return Promise.all([patientData, axios.get(`http://localhost:1337/program/associatePatient?id=${programId}&patientId=${patientData.id}`)]);

                            // _.forEach(program.steps,(step) => {
                            //   axios.post('http://localhost:1337/therapy', _.set(step,'programId',programId))
                            //     .then((response2) => {
                            //       console.log(response2.data);
                            //     });
                            // });
                          })
                          .then(results=>{
                            console.log(`Associated patient ${results[0].fullname} with program ${results[1].data.title}`)
                            const a=1;
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                      })
                      .catch(function (err) {
                        console.log(err.message);
                        console.log(err.stack);
                      })




                    // const sheetRefData = require(programFile);
                  });
                });
              });

          });

          const a = 1;
        });
      })
      .catch(err => {
        console.log(err);
      });

  })

});

// Machines
gsjson({
  spreadsheetId: '1aFa0J8H0AOpPzIx-eaEuD4sKpvEpIz33m91kFNfxbkM',
  credentials: require('./credentials/Amuse-2e01991f6d40.json'),
  // other options...
})
  .then(function(result) {

    result.forEach((machine)=>{
      axios.post('http://localhost:1337/machine', machine)
        .then(result => {
          console.log("Inserted station \""+result.data.stationName + "\" into database");
        })
        .catch(err=>{
          console.log(err);
        })


    });
  })
  .catch(function(err) {
    console.log("Failed to load machine from google drive");
    console.log(err.message);
    console.log(err.stack);
  });

//
// const patientsSpreadsheets = [
//   "1lM1Owg37DD2iBDf_E9qZD5yThXnpFNyeorJ9i0YhDZE",
//   "1Exo8UCzQgtS0vamdxqD7ElbHJzX-IA2jN9q5zGigkz0",
//   "1QTg2SaFxN0XRzBvJQnD0QZdIeUxiQoFaTIyGeAQaneI",
//   "14cCYFtbraAMpYu0ZzaJut8bu2vdu1k84Zq8UTAsg2g8"
// ];
//
// patientsSpreadsheets.forEach(spreadsheetId => {
//   gsjson({
//     spreadsheetId: spreadsheetId,
//     allWorksheets: true,
//     // hash:true,
//     credentials: require('./credentials/Amuse-2e01991f6d40.json'),
//     // other options...
//   })
//     .then(function (result) {
//
//       result.forEach((machine) => {
//         axios.post('http://localhost:1337/machine', machine)
//           .then(result => {
//             console.log("Inserted station \"" + result.data.stationName + "\" into database");
//           })
//           .catch(err => {
//             console.log(err);
//           })
//
//
//       });
//     })
//     .catch(function (err) {
//       console.log("Failed to load machine from google drive");
//       console.log(err.message);
//       console.log(err.stack);
//     });
//
// });
