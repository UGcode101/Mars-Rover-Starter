const Command = require("../command.js");

describe("Command class", () => {
  it("throws error if a command type is NOT passed into the constructor as the first parameter", () => {
    expect(() => {
      new Command();
    }).toThrow("Command type required.");
  });

  it("constructor sets command type", () => {
    const commandType = "MOVE";
    const command = new Command(commandType);
    expect(command.commandType).toBe(commandType);
  });

  it("constructor sets a value passed in as the 2nd argument", () => {
    const commandType = "MODE_CHANGE";
    const value = "LOW_POWER";
    const command = new Command(commandType, value);
    expect(command.value).toBe(value);
  });
});
