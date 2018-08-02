const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');
const pp = require('papaparse');

const isMac = process.platform === "darwin";
const configurationDir = process.argv[2] || `${__dirname}/dataToFeed`;

function parseCamelCased(csvData) {
  return _.map(pp.parse(csvData, {header: true, dynamicTyping: true}).data, (machine) => {
    return _.reduce(machine, (newMachine, val, key) => {
      newMachine[_.camelCase(key)] = val;
      return newMachine;
    }, {});

  });
}

function loadMachines() {
  const machinesFileName = `${configurationDir}/machines.csv`;
  const machinesFile = fs.readFileSync(machinesFileName, 'UTF8');

  const machines = parseCamelCased(machinesFile);

  _.forEach(machines, (machine) => {

    axios.post('http://localhost:1337/machine', machine)
      .then(result => {
        console.log("Inserted station \"" + result.data.stationName + "\" into database");
      })
      .catch(err => {
        console.log(err);
      })

  });
}

/////////////////////////////////////////////////////


function removeHidden(list) {
  return _.reduce(list, (newList, item) => {
    if (item !== '.DS_Store' && item !== 'Icon?') {
      newList.push(item)
    };
    return newList;
  }, []);
}

function loadTherapists() {
  const therapistsDir = `${configurationDir}/therapists`;
  const therapists = isMac ? _.omit(fs.readdirSync(therapistsDir), [0]) : fs.readdirSync(therapistsDir);

  _.forEach(therapists, (therapist) => {

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
          const patients =removeHidden(files);

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
                fs.readdir(configurationDir + "/therapists/" + associationData[0].therapist.fullname + "/" + associationData[0].patient.fullname, (err, files, patient = associationData[0].patient) => {

                  const programs = files;
                  const programPaths = _.map(programs, filename => {
                    return {
                      program: filename.split(".").shift(),
                      path: configurationDir + "/therapists/" + associationData[0].therapist.fullname + "/" + associationData[0].patient.fullname + "/" + filename
                    };
                  });

                  programPaths.forEach((programFile, patientData = patient) => {

                    const programCsv = fs.readFileSync(programFile.path, 'UTF8');
                    const activities = parseCamelCased(programCsv);

                    const newProgram = {};
                    const programTitle = programFile.program;
                    _.set(newProgram, 'title', programTitle);
                    _.set(newProgram, 'description', activities[0]['כותרת']);
                    _.set(newProgram, 'main_image_path', '/images/app/' + activities[0]['תוכנה'] + '.png');
                    newProgram.steps = [];

                    activities.forEach((currentActivity, programTitle = programTitle) => {

                      programStep = {};
                      _.set(programStep, 'title', programTitle);
                      _.set(programStep, 'description', currentActivity['כותרת']);
                      _.set(programStep, 'main_image_path', '/images/app/' + currentActivity['תוכנה'] + '.png');
                      _.set(programStep, 'sensor_system_image', '/images/app/' + currentActivity['חיישן'] + '.png');
                      _.set(programStep, 'activity', currentActivity['פעולהתרגיל']);
                      _.set(programStep, 'response', currentActivity['תגובתהתוכן']);
                      _.set(programStep, 'values.physical_therapy', currentActivity['תרגולפיזיותרפיה']);
                      _.set(programStep, 'values.occupational_therapy', currentActivity['ריפויבעיסוק']);
                      _.set(programStep, 'values.speach_language_therapy', currentActivity['קלינאותתקשורת']);
                      _.set(programStep, 'values.music_therapy', currentActivity['תרפיהבמוזיקה']);
                      _.set(programStep, 'therapist_station_command', currentActivity['מחשבטרפיסט']);
                      _.set(programStep, 'station_1_command', currentActivity['מחשבעמדה1']);
                      _.set(programStep, 'station_2_command', currentActivity['מחשבעמדה2']);
                      _.set(programStep, 'station_3_command', currentActivity['מחשבעמדה3']);
                      _.set(programStep, 'station_4_command', currentActivity['מחשבעמדה4']);
                      _.set(programStep, 'station_6_command', currentActivity['מחשבעמדה5']);
                      newProgram.steps.push(programStep);

                    });

                    axios.post('http://localhost:1337/program', newProgram)
                      .then((response, patientData = patient) => {
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
                      .then(results => {
                        console.log(`Associated patient ${results[0].fullname} with program ${results[1].data.title}`)
                        const a = 1;
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                    // const sheetRefData = require(programFile);
                  });
                });
              });

          });

          const a = 1;
        });
      })
      .catch(function (err) {
        console.log(err.message);
        console.log(err.stack);
      });

    const therapistDir = `${therapistsDir}/${therapist}`;
    const patients = isMac ? _.omit(fs.readdirSync(therapistDir), [0]) : fs.readdirSync(therapistDir);

    _.forEach(patients, (patient) => {

      const currPatientJson = parseCamelCased(`${therapistDir}/${patient}`);


    });
  });

  // const machinesFile = fs.readFileSync(machinesFileName, 'UTF8');

  // const machines = _.map(pp.parse(machinesFile, {header: true, dynamicTyping: true}).data, (machine) => {
  //   return _.reduce(machine, (newMachine, val, key) => {
  //     newMachine[_.camelCase(key)] = val;
  //     return newMachine;
  //   }, {});
  //
  // });
}

loadTherapists();


loadMachines();

