const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

describe("Rover class", function () {
  it("constructor sets position and default values for mode and generatorWatts", () => {
    const rover = new Rover(100);
    expect(rover.position).toBe(100);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", () => {
    const rover = new Rover(100);
    const message = new Message("Test Message", []);
    const response = rover.receiveMessage(message);
    expect(response.message).toBe("Test Message");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    const rover = new Rover(100);
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const message = new Message("Test Message", commands);
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command", () => {
    const rover = new Rover(100);
    const commands = [new Command("STATUS_CHECK")];
    const message = new Message("Test Message", commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({
      completed: true,
      roverStatus: {
        mode: rover.mode,
        generatorWatts: rover.generatorWatts,
        position: rover.position,
      },
    });
  });

  it("responds correctly to the mode change command", () => {
    const rover = new Rover(100);
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    const message = new Message("Test Message", commands);
    rover.receiveMessage(message);
    expect(rover.mode).toBe("LOW_POWER");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    const rover = new Rover(100);
    rover.mode = "LOW_POWER";
    const commands = [new Command("MOVE", 200)];
    const message = new Message("Test Message", commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(100);
  });

  it("responds with the position for the move command", () => {
    const rover = new Rover(100);
    const commands = [new Command("MOVE", 200)];
    const message = new Message("Test Message", commands);
    rover.receiveMessage(message);
    expect(rover.position).toBe(200);
  });
});
