/**
 * TherapyController
 *
 * @description :: Server-side logic for managing therapies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var udp = require('dgram');
var Buffer = require('buffer');


var client = udp.createSocket('udp4');
module.exports = {
  activate: function (req, res) {
    Machine.findOne({id: {'!':0}}).then((machine) => {

      Therapy.findOne({id:req.query.therapyId}).then((therapy) =>{

        client.send(therapy.video_command + '|1',machine.videoPort,machine.videoIp);
        client.send(therapy.music_command + '|1',machine.audioPort,machine.audioIp);
        return res.send('Started therapy ' + therapy.id  );
      });

    });
    // return res.send(req.query.therapyId);
  },
  deactivate: function (req, res) {
    Machine.findOne({id: {'!':0}}).then((machine) => {

      Therapy.findOne({id:req.query.therapyId}).then((therapy) =>{

        client.send(therapy.video_command + '|0',machine.videoPort,machine.videoIp);
        client.send(therapy.music_command + '|0',machine.audioPort,machine.audioIp);
        return res.send('Stopped therapy ' + therapy.id  );
      });

    });
    // return res.send(req.query.therapyId);
  },

};

