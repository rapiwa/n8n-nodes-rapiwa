const { Rapiwa } = require('./dist/nodes/Rapiwa/Rapiwa.node');
const { RapiwaTrigger } = require('./dist/nodes/Rapiwa/RapiwaTrigger.node');

module.exports = {
  nodes: [
    Rapiwa,
    RapiwaTrigger,
  ],
};
