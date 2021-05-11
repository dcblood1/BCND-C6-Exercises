
var ExerciseC6A = artifacts.require("ExerciseC6A");
var ExerciseC6B = artifacts.require("ExerciseC6B");
var ExerciseC6C = artifacts.require("ExerciseC6C");
var ExerciseC6CApp = artifacts.require("ExerciseC6CApp");


var Config = async function(accounts) {

    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x69e1CB5cFcA8A311586e3406ed0301C06fb839a2",
        "0xF014343BDFFbED8660A9d8721deC985126f189F3",
        "0x0E79EDbD6A727CfeE09A2b1d0A59F7752d5bf7C9",
        "0x9bC1169Ca09555bf2721A5C9eC6D69c8073bfeB4",
        "0xa23eAEf02F9E0338EEcDa8Fdd0A73aDD781b2A86",
        "0x6b85cc8f612d5457d49775439335f83e12b8cfde",
        "0xcbd22ff1ded1423fbc24a7af2148745878800024",
        "0xc257274276a4e539741ca11b590b9447b26a8051",
        "0x2f2899d6d35b1a48a4fbdc93a37a72f264a9fca7"
    ];


    let owner = accounts[0];
    let exerciseC6A = await ExerciseC6A.new();
    let exerciseC6B = await ExerciseC6B.new();
    let exerciseC6C = await ExerciseC6C.new();
    let exerciseC6CApp = await ExerciseC6CApp.new(exerciseC6C.address); //have to call bc it references C6C


    return {
        owner: owner,
        testAddresses: testAddresses,
        exerciseC6A: exerciseC6A,
        exerciseC6B: exerciseC6B,
        exerciseC6C: exerciseC6C,
        exerciseC6CApp: exerciseC6CApp
    }
}

module.exports = {
    Config: Config
};