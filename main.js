/* jshint -W097 */
/* jshint -W030 */
/* jshint strict: false */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

// you have to require the utils module and call adapter function
const utils = require('@iobroker/adapter-core'); // Get common adapter utils
const Aggregate  = require(__dirname + '/lib/aggregate.js');

const adapter = new utils.Adapter('homee');
const Homee = require('homee-api');
let homee;
let mapper;

let initDone = false;
let stopIt = false;
const forbiddenCharacters = /[\]\[*,;'"`<>\\\s?]/g;
const attributeMap = {};
const historyQueue = {};

function decrypt(key, value) {
    let result = '';
    for (let i = 0; i < value.length; ++i) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

adapter.on('unload', callback => {
    try {
        adapter.log.info('cleaned everything up...');
        if (!stopIt) {
            stopIt = true;
            homee.disconnect();
        }
        callback();
    } catch (e) {
        callback();
    }
});

process.on('SIGINT', () => {
    if (!stopIt) {
        stopIt = true;
        homee.disconnect();
    }
});

process.on('SIGTERM', () => {
    if (!stopIt) {
        stopIt = true;
        homee.disconnect();
    }
});

process.on('uncaughtException', err => {
    if (adapter && adapter.log) {
        adapter.log.warn('Exception: ' + err);
    }
    if (!stopIt) {
        stopIt = true;
        homee.disconnect();
    }
});

adapter.on('message', function (msg) {
    processMessage(msg);
});

function numberColorToHex(i) {
    var rrggbb =  ("000000" + i.toString(16)).slice(-6);
    rrggbb = rrggbb.substr(0, 2) + rrggbb.substr(2, 2) + rrggbb.substr(4, 2);
    return rrggbb;
}

function hexToNumberColor(rrggbb) {
    rrggbb = rrggbb.substr(0, 2) + rrggbb.substr(2, 2) + rrggbb.substr(4, 2);
    return parseInt(rrggbb, 16);
}

adapter.on('stateChange', (id, state) => {
    if (!state || state.ack) return;

    id = id.substr(adapter.namespace.length + 1);
    const idParts = id.split('.');

    if (idParts[0] === 'Homee-0' && idParts[1] === 'Homeegrams') {
        if (idParts[3] === 'play') {
            adapter.log.debug('stateChange ' + id + ' --> ' + idParts[2] + ' play :' + JSON.stringify(state));
            //homee.send('PUT:homeegrams/' + idParts[2] + '?play=1');
            homee.play(idParts[2]);
        }
        else if (idParts[3] === 'active') {
            adapter.log.debug('stateChange ' + id + ' --> ' + idParts[2] + ' active:' + JSON.stringify(state));
            //homee.send('PUT:homeegrams/' + idParts[2] + '?active=' + (state.val ? 1 : 0));
            if (state.val) {
                homee.activateHomeegram(idParts[2]);
            }
            else {
                homee.deactivateHomeegram(idParts[2]);
            }
        }
        return;
    }
	
	//if (idParts[0] === 'Homee-0' && idParts[1] === 'HomeeMode-1') {
	//	adapter.log.debug('stateChange ' + id + ' --> ' + idParts[1] + ':' + JSON.stringify(state));
	//	homee.setValue(-1, 1, state.val);
	//	return;
	//}

    let nodeId = parseInt(idParts[0].split('-')[1], 10);
    if (nodeId === 0) nodeId = -1;
    const attributeId = parseInt(idParts[1].split('-')[1], 10);
    const lookupId = nodeId + '.' + attributeId;
    adapter.log.debug('stateChange ' + id + ' --> ' + lookupId + ':' + JSON.stringify(state));

    let value = state.val;
    if (attributeMap[lookupId].type === 'boolean') {
        value = value ? 1 : 0;
    }
    else if (attributeMap[lookupId].type === 'string' && attributeMap[lookupId].unit === 'RGB' && typeof state.val === 'string') {
        var val = state.val;
        if (val.substr(0,1) === '#') val = val.substr(1);
        value = hexToNumberColor(val);
    }
    else if (attributeMap[lookupId] === 'string') {
        adapter.log.warn('Tell this to the Developer!! Type string not supported to set data: ' + id + ', data=' + value);
        return;
    }
    homee.setValue(nodeId, attributeId, value);
});

function updateDev(node) {
    const nodeId = mapper.getNodeName(node);
    const node_name = decodeURIComponent(node.name);
    adapter.log.debug('updateDev ' + node.id + ': name = ' + node_name + ' /profile= ' + node.profile + ' as ' + nodeId);
    // create dev
    adapter.getObject(nodeId, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(nodeId, {
                type: 'device',
                common: {name: node_name},
                native: {
                    id: node.id,
                    name: node_name,
                    profile: node.profile
                }
            }, () => {
                if (nodeId === 'Homee-0') createHomeegram(nodeId);
            });
        }
        else {
            adapter.setObject(nodeId, {
                type: 'device',
                common: {name: node_name},
                native: {
                    id: node.id,
                    name: node_name,
                    profile: node.profile
                }
            }, () => {
                if (nodeId === 'Homee-0') createHomeegram(nodeId);
            });
        }
    });
    return nodeId;
}

function createHomeegram(homeeId) {
    const nodeId = 'Homee-0.Homeegrams';
    adapter.log.debug('createHomeegram ' + nodeId);
    // create dev
    adapter.getObject(nodeId, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(nodeId, {
                type: 'device',
                common: {name: 'Homee.Homeegrams'},
                native: {
                    name: 'Homee.Homeegrams',
                }
            });
        }
        else {
            adapter.setObject(nodeId, {
                type: 'device',
                common: {name: 'Homee.Homeegrams'},
                native: {
                    name: 'Homee.Homeegrams',
                }
            });
        }
    });
    homee.send('GET:homeegrams');
}

function updateState(node_id, node_name, attribute, node_history) {
    const common = mapper.mapAttributeProperties(node_name, attribute);
    if (!common) {
        adapter.log.warn('Tell this to the Developer!! Type ' + attribute.type + ' unknown.');
        return;
    }
    const realId = node_id + '.' + common.id;
    delete common.id;
    let nodeId = parseInt(node_id.split('-')[1], 10);
	if (nodeId === 0) nodeId = -1;
    const id = nodeId + '.' + attribute.id;
    adapter.log.debug('store lookup ' + id + ' for ' + realId);
    attributeMap[id] = {type: common.type, unit: common.unit, role: common.role, id: realId};

    let value = attribute.current_value;
    /*if (common.type === 'boolean') {
        value = !!value;
    }
    else if (common.type === 'string') {
        value = attribute.data;
        if (attribute.unit === 'RGB') {
            value = '#' + numberColorToHex(value);
        }
    }
    else if (common.type === 'number') {
        if (attribute.unit === 'unixtimestamp') {
            value *= 1000;
        }
    }*/

    adapter.log.debug('updateState ' + realId + ': origValue = ' + value + ' history=' + node_history + '/common= ' + JSON.stringify(common));

    adapter.getObject(realId, (err, obj) => {
        if (!err && obj) {

            //adapter.log.info('getObject ' + realId + ':' + JSON.stringify(obj));
            if (node_history) {
                if (! obj.common.custom) obj.common.custom = {};
                obj.common.custom[adapter.namespace] = {
                    enabled: true
                };
            }
            else {
                if (obj.common.custom && obj.common.custom[adapter.namespace] && obj.common.custom[adapter.namespace].enabled) {
                    obj.common.custom[adapter.namespace].enabled = false;
                }
                let found  = false;
                let custom = obj.common.custom;
                for (let inst in custom) {
                    if (!custom.hasOwnProperty(inst)) continue;
                    if (!custom[inst].enabled) {
                        delete obj.common.custom[inst];
                    } else {
                        found = true;
                    }
                }
                if (!found) {
                    obj.common.custom = null;
                }
            }
            for (let key in common) {
                obj.common[key] = common[key];
            }
            obj.native.id = attribute.id;
            obj.native.node_id = attribute.node_id;
            obj.native.type = attribute.type;
            //adapter.log.info('setObject ' + realId + ':' + JSON.stringify(obj));
            adapter.setObject(realId, obj, () => setStateFromHomee(attribute.node_id, attribute.id, attribute, true));
            //adapter.setState(realId, value, true));
            /*
            if (obj.common.custom && obj.common.custom[adapter.namespace] !== undefined && !node_history) {
                obj.common.custom[adapter.namespace].enabled = false;
            }
            for (let key in common) {
                obj.common[key] = common[key];
            }

            let customEmpty = true;
            for (let key in obj.common.custom) {
              if (obj.common.custom.hasOwnProperty(key)) {
                 customEmpty = false;
                 break;
              }
            }

            if (customEmpty) {
                obj.common.custom = null;
            }
            adapter.log.info(JSON.stringify(obj.common.custom));
            obj.native.id = attribute.id;
            obj.native.node_id = attribute.node_id;
            obj.native.type = attribute.type;
            adapter.log.info('setObject ' + realId + ':' + JSON.stringify(obj));
            adapter.setObject(realId, obj, () => adapter.setState(realId, value, true));*/
            /*adapter.extendObject(realId, {
                type: 'state',
                common: common,
                native: {
                    id: attribute.id,
                    node_id: attribute.node_id,
                    type: attribute.type
                }
            }, () => adapter.setState(realId, value, true));*/
        }
        else {
            if (node_history) {
                if (! common.custom) common.custom = {};
                common.custom[adapter.namespace] = {
                    enabled: true
                };
            }
            adapter.setObject(realId, {
                type: 'state',
                common: common,
                native: {
                    id: attribute.id,
                    node_id: attribute.node_id,
                    type: attribute.type
                }
            }, () => setStateFromHomee(attribute.node_id, attribute.id, attribute, true));
        }
    });
}

function setStateFromHomee(node_id, attribute_id, attribute, initial) {
    if (node_id === -1) node_id = 0;
    const id = node_id + '.' + attribute_id;
    let value = attribute.current_value;
    if (!attributeMap[id]) {
        if (initDone) {
            adapter.log.warn('ID ' + id + ' not found in attribute map!');
        }
        else {
            adapter.log.debug('ID ' + id + ' not found in attribute map - ignore because init not done');
        }
        return;
    }
    if (attributeMap[id].type === 'boolean') {
        value = !!value;
    }
    else if (attributeMap[id].type === 'string') {
        value = attribute.data;
        if (attribute.unit === 'RGB') {
            value = '#' + numberColorToHex(attribute.current_value);
        }
    }
    else if (attributeMap[id].type === 'number') {
        if (attribute.unit === 'unixtimestamp') {
            value *= 1000;
        }
    }
    const realId = attributeMap[id].id;
    if (attribute.current_value === attribute.target_value || attributeMap[id].type === 'string' || initial) {
        adapter.log.debug('Value changed by homee for ' + realId + ' => ' + value);
        adapter.setState(realId, value, true);
    }
    else {
        adapter.log.debug('Ignore value change for ' + realId + ' = ' + value + ' (' + attribute.current_value + ' --> ' + attribute.target_value + ')');
    }
}

adapter.on('ready', () => {
    adapter.getForeignObject('system.config', (err, obj) => {
        if (obj && obj.native && obj.native.secret) {
            //noinspection JSUnresolvedVariable
            adapter.config.password = decrypt(obj.native.secret, adapter.config.password);
        } else {
            //noinspection JSUnresolvedVariable
            adapter.config.password = decrypt('Zgfr56gFe87jJOM', adapter.config.password);
        }
        main();
    });
});

/*function loadExistingAccessories(callback) {
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
}*/

function initNodes(nodes) {
    adapter.log.info('initialize ' + nodes.length + ' nodes');
    adapter.log.silly('Received NODES: ' + JSON.stringify(nodes));
    for (let i = 0; i < nodes.length; i++) {
        initNode(nodes[i]);
    }
    if (!initDone) {
        initDone = true;

        setTimeout(() => adapter.subscribeStates('*'), 5000); // delay till all objects are created, yes hack ...
    }
}

function initNode(node) {
    adapter.log.debug('Initialize Node ' + node.id + ' as "' + node.name + '"');
    const nodeId = updateDev(node);
    if (node.attributes.length) {
        for (let i = 0; i < node.attributes.length; i++) {
            updateState(nodeId, node.name, node.attributes[i], !!node.history);
        }
    }
}

function initHomeegrams(homeegrams) {
    adapter.log.info('initialize ' + homeegrams.length + ' homeegrams');
    adapter.log.silly('Received HOMEEGRAMS: ' + JSON.stringify(homeegrams));
    for (let i = 0; i < homeegrams.length; i++) {
        initHomeegram(homeegrams[i]);
    }
}

function initHomeegram(homeegram) {
    const nodeId = 'Homee-0.Homeegrams.' + homeegram.id;
    const homeegram_name = decodeURIComponent(homeegram.name);
    adapter.log.debug('Initialize Channel Homeegram ' + homeegram.id + ': name = ' + homeegram_name + ' as ' + nodeId);
    // create states
    adapter.getObject(nodeId, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(nodeId, {
                type: 'state',
                common: {
                    name: homeegram_name,
                    role: 'button',
                    type: 'boolean',
                    read: false,
                    write: !!homeegram.triggers.switch_trigger
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => initHomeegramStates(homeegram));
        }
        else {
            adapter.setObject(nodeId, {
                type: 'state',
                common: {
                    name: homeegram_name,
                    role: 'button',
                    type: 'boolean',
                    read: false,
                    write: !!homeegram.triggers.switch_trigger
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => initHomeegramStates(homeegram));
        }
    });
}

function initHomeegramStates(homeegram) {
    const nodeIdBase = 'Homee-0.Homeegrams.' + homeegram.id;
    const homeegram_name = decodeURIComponent(homeegram.name);
    adapter.log.debug('Initialize States Homeegram ' + homeegram.id + ': name = ' + homeegram_name + ' as ' + nodeIdBase);
    // create states
    const nodeIdActive = nodeIdBase + '.active';
    adapter.getObject(nodeIdActive, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(nodeIdActive, {
                type: 'state',
                common: {
                    name: 'active',
                    role: 'switch',
                    type: 'boolean',
                    read: true,
                    write: true
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => adapter.setState(nodeIdActive, !!homeegram.active, true));
        }
        else {
            adapter.setObject(nodeIdActive, {
                type: 'state',
                common: {
                    name: 'active',
                    role: 'button',
                    type: 'boolean',
                    read: false,
                    write: !!homeegram.triggers.switch_trigger
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => adapter.setState(nodeIdActive, !!homeegram.active, true));
        }
    });

    const nodeIdPlay = nodeIdBase + '.play';
    adapter.getObject(nodeIdPlay, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(nodeIdPlay, {
                type: 'state',
                common: {
                    name: 'play',
                    role: 'button',
                    type: 'boolean',
                    read: false,
                    write: !!homeegram.triggers.switch_trigger
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => adapter.setState(nodeIdPlay, false, true));
        }
        else {
            adapter.setObject(nodeIdPlay, {
                type: 'state',
                common: {
                    name: 'play',
                    role: 'button',
                    type: 'boolean',
                    read: false,
                    write: !!homeegram.triggers.switch_trigger
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => adapter.setState(nodeIdPlay, false, true));
        }
    });

    const nodeIdPlaying = nodeIdBase + '.playing';
    adapter.getObject(nodeIdPlaying, (err, obj) => {
        if (!err && obj) {
            adapter.extendObject(nodeIdPlaying, {
                type: 'state',
                common: {
                    name: 'playing',
                    role: 'indicator',
                    type: 'boolean',
                    read: true,
                    write: false
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => adapter.setState(nodeIdPlaying, homeegram.play === 1, true));
        }
        else {
            adapter.setObject(nodeIdPlaying, {
                type: 'state',
                common: {
                    name: 'playing',
                    role: 'indicator',
                    type: 'boolean',
                    read: true,
                    write: false
                },
                native: {
                    id: homeegram.id,
                    name: homeegram_name
                }
            }, () => adapter.setState(nodeIdPlaying, homeegram.play === 1, true));
        }
    });

}

function processMessage(msg) {
    if (msg.command === 'getHistory') {
        getHistory(msg);
    }
}

function requestHistory(nodeId, attributeId, options, callback) {
    let requestStr = 'GET:nodes/' + nodeId + '/attributes/' + attributeId + '/history?';
    if (options.start) requestStr +='from=' + Math.floor(options.start / 1000) + '&';
    if (options.end) requestStr +='till=' + Math.floor(options.end / 1000) + '&';
    if (options.limit) requestStr +='limit=' + options.limit;

    if (! historyQueue[requestStr]) {
        historyQueue[requestStr] = [];
    }
    historyQueue[requestStr].push(callback);
    adapter.log.debug('Request history: ' + requestStr);
    homee.send(requestStr);
}

function processHistory(history) {
    let requestId = 'GET:nodes/' + history.node_id + '/attributes/' + history.attribute_id + '/history?';
    if (history.from !== 0) requestId +='from=' + history.from + '&';
    if (history.till !== 0) requestId +='till=' + history.till + '&';
    if (history.limit !== 0) requestId +='limit=' + history.limit;

    adapter.log.debug('Received History for Request ' + requestId + ': ' + JSON.stringify(history));

    if (historyQueue[requestId] && historyQueue[requestId].length > 0) {
        let callback = historyQueue[requestId].shift();
        if (! historyQueue[requestId].length) {
            delete historyQueue[requestId];
        }
        callback(history.results);
    }
    else {
        adapter.log.debug('No callback found for History request ' + requestId);
    }
}

function parseHistorySeries(serie, results) {
    if (! results) {
        results = [];
    }
    adapter.log.silly('SERIE:' + JSON.stringify(serie));
    if (serie.error || !serie.columns || !serie.values) {
        adapter.log.info('No data in history response: ' + JSON.stringify(serie));
        return results;
    }

    let columnTime = serie.columns.indexOf('time');
    let columnValue = serie.columns.indexOf('value');
    for (let i = 0; i < serie.values.length; i++) {
        const row = {
            val: serie.values[i][columnValue],
            ts: serie.values[i][columnTime],
            ack: true,
            from: adapter.namespace
        };
        results.unshift(row);
    }
    return results;
}

function getHistory(msg) {
    const startTime = new Date().getTime();
    let options = {
        id:         msg.message.id ? msg.message.id : null,
        path:       adapter.config.storeDir,
        start:      msg.message.options.start,
        end:        msg.message.options.end || ((new Date()).getTime() + 5000000),
        step:       parseInt(msg.message.options.step,  10) || null,
        count:      parseInt(msg.message.options.count, 10) || 500,
        from:       false,
        ack:        false,
        q:          false,
        ignoreNull: msg.message.options.ignoreNull,
        aggregate:  msg.message.options.aggregate || 'average', // One of: max, min, average, total
        limit:      parseInt(msg.message.options.limit || adapter.config.limit || 2000, 10),
        addId:      msg.message.options.addId || false,
        sessionId:  msg.message.options.sessionId
    };

    if (options.start > options.end) {
        var _end      = options.end;
        options.end   = options.start;
        options.start = _end;
    }

    // if less 2000.01.01 00:00:00
    if (options.start < 946681200000) {
        options.start *= 1000;
        if (options.step !== null && options.step !== undefined) options.step *= 1000;
    }

    // if less 2000.01.01 00:00:00
    if (options.end < 946681200000) options.end *= 1000;

    const id = options.id.substr(adapter.namespace.length + 1);
    const idParts = id.split('.');
    let nodeId = parseInt(idParts[0].split('-')[1], 10);
    if (nodeId === 0) nodeId = -1;
    let attributeId = parseInt(idParts[1].split('-')[1], 10);
    let lookupId = nodeId + '.' + attributeId;
    adapter.log.debug('getHistory for ' + options.id + ' (' + lookupId + '): ' + JSON.stringify(options));

    // if specific id requested
    requestHistory(nodeId, attributeId, options, function (data) {
        let result = [];
        let err = null;
        if (data[0].error) err = data[0].error;
        if (data[0].series) {
            for (let i = 0; i < data[0].series.length; i++) {
                result = parseHistorySeries(data[0].series[i], result);
            }
            if (options.addId) {
                for (let j = 0; j < result.length; j++) {
                    result[j].id = msg.message.id;
                }
            }
        }

        if (!result.length) {
            adapter.log.debug('No Data');
            adapter.sendTo(msg.from, msg.command, {
                result:     [],
                step:       null,
                error:      err
            }, msg.callback);
            return;
        }

        if ((!options.start && options.count) || options.aggregate === 'onchange' || options.aggregate === '' || options.aggregate === 'none') {
            adapter.sendTo(msg.from, msg.command, {
                result:     result,
                error:      null,
                sessionId:  options.sessionId
            }, msg.callback);
            return;
        }

        Aggregate.initAggregate(options);
        Aggregate.aggregation(options, result);
        Aggregate.finishAggregation(options);
        result = options.result;

        adapter.sendTo(msg.from, msg.command, {
            result:     result,
            error:      err,
            sessionId:  options.sessionId
        }, msg.callback);
    });

}

function main() {
    if (adapter.config.host === "") {
        adapter.log.error('You need to configure the adapter properly.');
        return;
    }

    //loadExistingAccessories(() => {
        const options = {
            device: 'ioBroker',
            reconnect:  true,
            reconnectInterval: 5000,
            maxRetries: Infinity
        };
        adapter.log.info('Init homee ' + adapter.config.host + ' for user ' + adapter.config.user);
        homee = new Homee(adapter.config.host, adapter.config.user, adapter.config.password, options);

        mapper = require('./lib/mapper')(homee.enums);

        // available events
        //homee.on('message', (message) => adapter.log.silly('MESSAGE: ' + JSON.stringify(message)));

        homee.on('connected', () => {
            adapter.log.info('CONNECTED');
            adapter.setState('info.connection', true, true);
        });
        homee.on('disconnected', (reason) => {
            adapter.log.info('DISCONNECTED: ' + JSON.stringify(reason));
            adapter.setState('info.connection', false, true);
        });
        homee.on('reconnect', (retries) => {
            adapter.log.info('RECONNECT: ' + JSON.stringify(retries));
        });
        homee.on('maxRetries', (retries) => {
            adapter.log.debug('MAXRETRIES: ' + JSON.stringify(retries));
        });

        homee.on('error', (err) => {
            adapter.log.error('homee connection error: ' + JSON.stringify(err));
        });

        // special events
        /*homee.on('user', (user) => {
            adapter.log.debug('USER: ' + JSON.stringify(user));
        });*/
        homee.on('attribute', (attribute) => {
            adapter.log.silly('ATTRIBUTE: ' + JSON.stringify(attribute));
            setStateFromHomee(attribute.node_id, attribute.id, attribute);
        });

        homee.on('nodes', (nodes) => initNodes(nodes));

        homee.on('node', (node) => initNodes([node]));

        homee.on('attribute_history', (history) => processHistory(history));

        homee.on('homeegram', (homeegram) => initHomeegrams([homeegram]));

        homee.on('homeegrams', (homeegrams) => initHomeegrams(homeegrams));
        // ...tbc

        homee.connect().then(() => {
            adapter.log.debug('Connection done');
        }).catch((error) => {
            adapter.log.error(error);
        });
    //});
}
