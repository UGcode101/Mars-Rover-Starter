const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

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
