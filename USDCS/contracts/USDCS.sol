//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDCS is ERC20, ERC20Burnable, Ownable, ERC20Pausable {
    constructor(address initialOwner) ERC20("USDCS", "USDCS") Ownable(initialOwner) {
        transferOwnership(initialOwner);    
        _mint(msg.sender, 100000000000 *10 **decimals());
    }

    function pause() public onlyOwner{
        _pause();
    }

    function unpause() public onlyOwner{
        _unpause();
    }

    function _update(address from, address to, uint256 amount) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, amount);
    }
}