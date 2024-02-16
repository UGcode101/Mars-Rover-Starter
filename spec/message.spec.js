const Message = require("../message.js");
const Command = require("../command.js");

describe("Message class", () => {
  it("throws error if a name is NOT passed into the constructor as the first parameter", () => {
    expect(() => {
      new Message();
    }).toThrow("Message name not provided.");
  });

  it("constructor sets name", () => {
    const name = "Test Message";
    const message = new Message(name);
    expect(message.name).toBe(name);
  });

  it("contains a commands array passed into the constructor as the 2nd argument", () => {
    const name = "Test Commands array";
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const message = new Message(name, commands);
    expect(message.commands).toEqual(commands);
  });
});
