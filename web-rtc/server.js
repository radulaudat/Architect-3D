const { PeerServer } = require('peer');
const ps = PeerServer({port: 9000, path: '/peer', key: 'architect'});
