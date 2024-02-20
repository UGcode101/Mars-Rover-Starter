class Message {
  constructor(name, commands = []) {
    if (!name) {
      throw new Error("Message name not provided.");
    }
    this.name = name;
    this.commands = commands;
  }
}

module.exports = Message;
