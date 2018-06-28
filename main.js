/* jshint -W097 */
/* jshint -W030 */
/* jshint strict: false */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

// you have to require the utils module and call adapter function
const utils   = require(__dirname + '/lib/utils'); // Get common adapter utils

const adapter = new utils.Adapter('homee');
const Homee = require('homee-api');
let homee;

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', callback => {
    try {
        adapter.log.info('cleaned everything up...');
        // TODO!
        callback();
    } catch (e) {
        callback();
    }
});

//process.on('SIGINT', () => homebridgeHandler.end());

//process.on('SIGTERM', () => homebridgeHandler.end());

process.on('uncaughtException', err => {
    if (adapter && adapter.log) {
        adapter.log.warn('Exception: ' + err);
    }
    //TODO
});

// is called if a subscribed state changes
adapter.on('stateChange', (id, state) => {
    // Warning, state can be null if it was deleted
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

    id = id.substr(adapter.namespace.length+1);
    adapter.log.debug('lookup id: ' + id);
    // you can use the ack flag to detect if it is status (true) or command (false)
    if (state && !state.ack) {
        adapter.log.debug('ack is not set!');
        //TODO
    }
});

function updateDev(dev_id, dev_name, dev_type, dev_uuid) {
    adapter.log.info('updateDev ' + dev_id + ': name = ' + dev_name + ' /type= ' + dev_type);
    // create dev
    adapter.getObject(dev_id, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(dev_id, {
                type: 'device',
                common: {name: dev_name},
                native: {
                    UUID: dev_uuid,
                    displayName: dev_name,
                    category: dev_type
                }
            });
        }
        else {
            adapter.setObject(dev_id, {
                type: 'device',
                common: {name: dev_name},
                native: {
                    UUID: dev_uuid,
                    displayName: dev_name,
                    category: dev_type
                }
            }, {});
        }
    });
}

function updateChannel(dev_id, ch_id, name, ch_uuid) {
    const id = dev_id + '.' + ch_id;
    // create channel for dev
    adapter.log.info('updateChannel ' + id + ': name = ' + name);
    adapter.getObject(id, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(id, {
                type: 'channel',
                common: {name: name},
                native: {
                    UUID: ch_uuid,
                    displayName: name
                }
            });
        }
        else {
            adapter.setObject(id, {
                type: 'channel',
                common: {name: name},
                native: {
                    UUID: ch_uuid,
                    displayName: name
                }
            }, {});
        }
    });
}

function updateState(dev_id, ch_id, st_id, name, value, common, st_uuid, callback) {
    const id = dev_id + '.' + ch_id + '.'+ st_id;
    if (!common) common = {};
    if (common.name === undefined) common.name = name;
    if (common.role === undefined) common.role = 'state';
    if (common.read === undefined && common.write === undefined) common.read = true;
    if (common.type === undefined) common.type = 'string';
    if (common.unit === undefined) common.unit = '';

    adapter.log.info('updateState ' + id + ': value = ' + value + ' /common= ' + JSON.stringify(common));

    adapter.getObject(id, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(id, {
                type: 'state',
                common: common,
                native: {
                    UUID: st_uuid,
                    displayName: name
                }
            }, callback);
        }
        else {
            adapter.setObject(id, {
                type: 'state',
                common: common,
                native: {
                    UUID: st_uuid,
                    displayName: name
                }
            }, callback);
        }
    });
}

function setState(dev_id, ch_id, st_id, value) {
    const id = dev_id + '.' + ch_id + '.' + st_id;
    adapter.setState(id, value, true);
}

// is called when databases are connected and adapter received configuration.
// start here!
adapter.on('ready', main);

function loadExistingAccessories(callback) {
    adapter.getDevices((err, res) => {
        if (err) {
            adapter.log.error('Can not get all existing devices: ' + err);
            return;
        }
        for (let i = 0; i < res.length; i++) {
            if (res[i].native) {
                adapter.log.debug('Remember existing Device ' + JSON.stringify(res[i].native));
            }
        }

        if (callback) callback();
    });
}

function main() {

    loadExistingAccessories(() => {
        const options = {
            device: 'ioBroker',
            reconnect:  true,
            reconnectInterval: 5000,
            maxRetries: Infinity
        };
        homee = new Homee(adapter.config.host, adapter.config.user, adapter.config.password, options);

        homee.connect().then(() => {

            // available events
            homee.on('message', (message) => {
                adapter.log.debug('MESSAGE: ' + JSON.stringify(message));
            });
            homee.on('change', (attribute) => {
                adapter.log.debug('CHANGE: ' + JSON.stringify(attribute));
            });
            homee.on('disconnect', (code) => {
                adapter.log.debug('DISCONNECT: ' + JSON.stringify(code));
            });
            homee.on('error', (err) => {
                adapter.log.debug('ERROR: ' + JSON.stringify(err));
            });
            homee.on('reconnect', (retries) => {
                adapter.log.debug('RECONNECT: ' + JSON.stringify(retries));
            });

            // special events
            homee.on('user', (user) => {
                adapter.log.debug('USER: ' + JSON.stringify(user));
            });
            homee.on('attribtue', (attribute) => {
                adapter.log.debug('ATTRIBUTE: ' + JSON.stringify(attribtue));
            });
            homee.on('node', (node) => {
                adapter.log.debug('NODE: ' + JSON.stringify(node));
            });
            // ...tbc

            adapter.subscribeStates('*');

        }).catch((error) => {
            adapter.log.error(error);
        });
    });
}
