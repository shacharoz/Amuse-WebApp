const udp = require('dgram');
const Buffer = require('buffer');
const _ = require('lodash');

var client = udp.createSocket('udp4');
module.exports = {
  activate: function (req, res) {
    Program.findOne({id: req.query.programId}).then((program,step=req.query.stepId) => {

      Machine.find({})
        .then((machines,stepID=step)=>{
          machines.forEach((machine,stepData=req.query.stepId)=>{


            const currentCommandKey = (_.snakeCase(machine.stationName) + "_command");
            const currentMachineCommand = program.steps[parseInt(req.query.stepId)][currentCommandKey];
            if(!_.isUndefined(currentMachineCommand)) {
              client.send(currentMachineCommand+ '|1', machine.stationPort, machine.stationIp);
            }
          });

          return res.send('Started program ' + program.title);

        });
    });



    // return res.send(req.query.therapyId);
  },
  deactivate: function (req, res) {
    Program.findOne({id: req.query.programId}).then((program,step=req.query.stepId) => {

      Machine.find({})
        .then((machines,stepID=step)=>{
          machines.forEach((machine,stepData=req.query.stepId)=>{


            const currentCommandKey = (_.snakeCase(machine.stationName) + "_command");
            const currentMachineCommand = program.steps[parseInt(req.query.stepId)][currentCommandKey];
            if(!_.isUndefined(currentMachineCommand)) {
              client.send(currentMachineCommand+ '|0', machine.stationPort, machine.stationIp);
            }
          });

          return res.send('Stopped program ' + program.title);

        });
    });
  },

  associatePatient: async function (inputs, exits) {

    console.log(`received association message ${JSON.stringify(inputs.allParams())} `);

    await Program.addToCollection(inputs.allParams().id, 'patients', inputs.allParams().patientId);

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    var program = await Program.findOne({id: inputs.allParams().id});

    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    if (!program) {
      return exits.notFound();
    }

    // Display the welcome view.
    return exits.status(200).send(program);
  },

};
