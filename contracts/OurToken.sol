// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OurToken is ERC20{
    // initial supply is 50 <- 50 WEI
    // initial supply is 50e18

    constructor(uint256 initialSupply) ERC20("OurToken", "OT") {
        _mint(msg.sender, initialSupply);
    }
}