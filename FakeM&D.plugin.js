/**
 * @name FakeMute&Deafen
 * @version 1.0.0
 * @description Allows you to fake mute and deafen yourself, shows for others. This has been found by many others but I've decided to add some features to beautify it.
 * @author BetOnGod
 * @source https://github.com/BetOnGod
 * @updateUrl https://raw.githubusercontent.com/BetOnGod/Fake-MuteDeafen/main/FakeM%26D.plugin.js
 */

module.exports = class FakeMuteDeafen {
  start() {

    let React = BdApi.React;
    let Patcher = BdApi.Patcher;
    
    var text = new TextDecoder("utf-8");

    WebSocket.prototype.original = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        if (text.decode(data).includes("self_deaf")) {
          data = data.replace('"self_mute":false');
        }
      }
      WebSocket.prototype.original.apply(this, [data]);
    };
    BdApi.alert("Enabled", `You can now unmute or undeafen yourself and it will show for others. The plugin will be disabled by default.`);
    BdApi.Plugins.disable('FakeMute&Deafen')
  }
  stop() {}
};
