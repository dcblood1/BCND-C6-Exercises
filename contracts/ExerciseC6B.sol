pragma solidity ^0.4.25;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract ExerciseC6B {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/


    address private contractOwner;                  // Account used to deploy contract


    constructor
                (
                )
                public 
    {
        contractOwner = msg.sender;
    }
   
    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /**
    * @dev modifier that requires the rate limiter to be in effect, limiting how often a function can be called
     */
     uint256 private enabled = block.timestamp;
     modifier rateLimit(uint time) {
         require(block.timestamp >= enabled, "Rate limiting in effect"); //require timestamp to be greater than enabled
         enabled = enabled.add(time); // increase enabled time using timestamp
         _;
     }

    // this prevents bad players from calling your function multiple times without letting it complete
    // typically for people who found a bug and want to drain accounts with a loop of transactions
    // essentially it might loop through the whole thing, but then at the end, it will fail, killing the whole transaction
     uint256 private counter = 1;
     modifier entrancyGuard(){
        counter = counter.add(1);
        uint256 guard = counter;
         _;
         require(guard == counter, "That is not allowed");
     }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

    // this is going to be my safe withdraw function
    mapping(address => uint256) private sales; //maps addresses to sales
    // dont know if this 30 minutes is the correct way to use Ratelimit, think it would be timestamp one
    function safeWithdraw(uint256 amount) external rateLimit(30 minutes) entrancyGuard {

        //checks
        require(msg.sender == tx.origin, "Contracts not allowed"); //msg.sender is caller of function, tx.origin is for this one a contract??
        require(sales[msg.sender] >= amount, "insufficient funds"); 

        //effects
        uint256 amount = sales[msg.sender]; //set local var to amount
        sales[msg.sender] = sales[msg.sender].sub(amount); //subtract sales amount using safemath
        
        //interaction
        msg.sender.transfer(amount); //send that money
    }

    
}

