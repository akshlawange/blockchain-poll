pragma solidity 0.8.22;

contract MyContract
 {
  uint256 public myNumber;

  constructor() public{
    myNumber = 8;
  }

  function setNumber(uint256 _num) public{
    myNumber = _num;
  }

  // function getNumber() public view returns (uint256){
  //   return myNumber;
  // }
 }
