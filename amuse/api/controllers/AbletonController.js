/**
 * AbletonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

function getTherapistMachine() {
  return Machine.findOne({stationName: "Therapist Station"});
}

module.exports = {



  find: async function (req, res) {
    const machine = await getTherapistMachine();
    const summary = await axios.get(`http://${machine.stationIp}:8080/api/summary`);
    return res.status(200).send(summary.data);
  },
  volume: async function (req, res) {
    const machine = await getTherapistMachine();
    const response = await axios.get(`http://${machine.stationIp}:8080/api/volume?volume=${req.query.volume}`);
    const a=1;
    return res.status(200).send(req.query.volume);
  },
  play: async function (req, res) {
    const machine = await getTherapistMachine();
    const response = await axios.get(`http://${machine.stationIp}:8080/api/play`);
    return res.status(200).send(req.query.volume);
  },
  stop: async function (req, res) {
    const machine = await getTherapistMachine();
    const response = await axios.get(`http://${machine.stationIp}:8080/api/stop`);
    return res.status(200).send(req.query.volume);
  },
  pause: async function (req, res) {
    const machine = await getTherapistMachine();
    const response = await axios.get(`http://${machine.stationIp}:8080/api/pause`);
    return res.status(200).send(req.query.volume);
  },
  volume_track: async function (req, res) {
    const machine = await getTherapistMachine();
    const response = await axios.get(`http://${machine.stationIp}:8080/api/volume_track?track=${req.query.track}&volume=${req.query.volume}`);
    return res.status(200).send(req.query.volume);
  },
};

