
var Test = require('../config/testConfig.js');

contract('ExerciseC6A', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

  it('contract owner can register new user', async () => {
    
    // ARRANGE
    let caller = accounts[0]; // This should be config.owner or accounts[0] for registering a new user
    let newUser = config.testAddresses[0];  //test addresses are random, acconts[i] are associated with ganache

    // ACT
    await config.exerciseC6A.registerUser(newUser, false, {from: caller});
    let result = await config.exerciseC6A.isUserRegistered.call(newUser); 

    // ASSERT
    assert.equal(result, true, "Contract owner cannot register new user");

  });

  it('function call is made when multi-party threshold is reached', async () => {
    
    // ARRANGE
    let admin1 = accounts[1]; //accounts are associated with ganache, 
    let admin2 = accounts[2];
    let admin3 = accounts[3];
    let admin4 = accounts[4];
    
    await config.exerciseC6A.registerUser(admin1, true, {from: config.owner});
    await config.exerciseC6A.registerUser(admin2, true, {from: config.owner});
    await config.exerciseC6A.registerUser(admin3, true, {from: config.owner});
    await config.exerciseC6A.registerUser(admin4, true, {from: config.owner});
    
    let startStatus = await config.exerciseC6A.isOperational.call(); //get current status of contract
    let changeStatus = !startStatus; //change it to opposite of above. Better than static bc this test is testing if it worked either way

    // ACT
    await config.exerciseC6A.setOperatingStatus(changeStatus, {from: admin1});
    await config.exerciseC6A.setOperatingStatus(changeStatus, {from: admin2});
    
    let newStatus = await config.exerciseC6A.isOperational.call(); 

    // ASSERT
    assert.equal(changeStatus, newStatus, "Multi-party call failed");

  });


 
});
