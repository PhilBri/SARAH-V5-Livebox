
module.exports = function (RED) {
    var request = require ('request');
    var ipCmd = require ('./ipCmd');

    function sarahlivebox (config) {
        RED.nodes.createNode (this, config);
        this.host = config.host;
        this.port = config.port;
        this.boxConnected = false;
        this.friendlyName = undefined;
        this.standbyState = undefined;
        var node = this;
        var boxUrl = "http://" + node.host + ':' + node.port + '/remoteControl/cmd?';

        this.sendBox = function (boxCmd, sendClbk) {
            request.get (uri = boxUrl + boxCmd, function (error, response, body) {
                if (error) {
                    node.boxConnected = false;
                    node.error (error);
                    node.status ({
                        fill: 'red',
                        shape: 'dot',
                        text: error.code === 'ETIMEDOUT' ? 'Déconnectée !' : error.code
                    });
                    msg = {
                        payload: {
                            responseCode: error.code,
                            message: error.toString(),
                            data: {}
                        }
                    };
                } else {
                    node.boxConnected = true;
                    msg = {payload: JSON.parse (body).result};

                    if (msg.payload.data.friendlyName !== undefined) {
                        node.friendlyName = msg.payload.data.friendlyName;
                        node.standbyState = msg.payload.data.activeStandbyState;
                    }
                    node.status ({
                        fill: 'green',
                        shape: 'dot',
                        text: node.friendlyName
                    });
                }
                sendClbk (msg);
            });
        }

        node.on ('input', function (msg) {
            var box_Cmd = ['operation=10'];
            var box_Msg = msg.payload.options;

            if (!msg.payload.hasOwnProperty('options') || !box_Msg.hasOwnProperty('plugin') || box_Msg['plugin'] != 'livebox') return;
            node.sendBox (box_Cmd, (clbk) => {});
            if (!node.boxConnected) return node.send (msg = {payload: ipCmd['error']});

            for (var key in box_Msg) {
                switch (key.toString()) {
                    case ('cmd'):
                        if (node.standbyState == 1) return (msg = {payload: ipCmd['nobox']});
                        box_Cmd.unshift ('operation=01&key=' + ipCmd[box_Msg[key]].replace (':', '&mode='));
                        break;

                    case ('epg'):
                        box_Cmd.unshift ('operation=09&epg_id=' + "*".repeat (10 - (box_Msg[key].length)) + box_Msg[key] + '&uui=1');
                        break;

                    case ('stby'):
                        if (box_Msg[key] == node.standbyState) return node.send (msg = {payload: ipCmd[key][box_Msg[key]]});
                        var item = ipCmd['Shutdown'].split(':').join('&mode').split(',');
                        while (item.length) {
                            box_Cmd.unshift('operation=01&key=' + item.shift());
                        }
                        break;
                }
            }
            function sendData (box_Cmd) {
                setTimeout (function () {
                    node.sendBox (box_Cmd.shift(), function (clbk) {
                        if (clbk.payload.responseCode != 0) {
                            node.error (clbk);
                            return node.send (msg = {payload: ipCmd['cmdErr']});
                        }
                        box_Cmd.length ? sendData (box_Cmd) : node.send (msg = {payload: ipCmd[key][Math.floor (Math.random() * ipCmd[key].length)]});
                    });
                }, 500);
            }
            sendData (box_Cmd);
        });

        setTimeout (function () {
            node.sendBox ('operation=10', (clbk) => {});
        }, 400);
    }
    RED.nodes.registerType ("sarah-livebox", sarahlivebox);
}
