// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.22;

contract test {
    uint256 myNumber;
    bool isActive;
    bytes32 password; // bytes32 takes less space than string
    string name;

    string[] names;
    mapping(uint256 => address) id;

    address ad; //42 char

    struct Person{
        address id;
        string name;
        uint24 age;
    }

    enum Day {Monday,Tuesday}

    constructor() public{
        myNumber = 16;
        isActive = true;
        name = 'Akshay';
    }

    // function name(type name) {public | external | internal | private} {pure|constant|view|payable}
    // keywords
    // now = current time
    // msg.sender = address of sender
    // msg.value = value of sender's message

    modifier nonzero(uint256 _newNumber){
      require(_newNumber !=0, "Number is zero");
      _;
    }

    function setNumber(uint256 _newNumber) internal nonzero(_newNumber){
      myNumber = _newNumber;
    }

    function getNumber() external view returns (uint256) {
      return myNumber;
    }
}
