// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract EccContract {
    uint public counter;

    function increment(bytes32 hash, bytes memory signature) external {
        require(
            ECDSA.recover(hash, signature) == msg.sender,
            "invalidate signature"
        );
        counter++;
    }

    function recover(
        bytes32 hash,
        bytes memory signature
    ) pure external returns (address) {
        return ECDSA.recover(hash, signature);
    }
}
