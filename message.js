class Message {
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error("Message name not provided.");
    }
    this.commands = commands;
  }
}
module.exports = Message;
