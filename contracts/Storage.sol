// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Permissions.sol";
import "./SipcotPark.sol";

contract Storage is Permissions, SipcotPark {
    function getAdmin(
        address sender
    ) public view restricted(sender) returns (address) {
        return CAN_ADD_PARTICIPANT;
    }
}
