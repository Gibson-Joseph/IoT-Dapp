// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Permissions {
    //  Abilities to change the membership of a participant group
    address CAN_ADD_PARTICIPANT = 0x09458B509C75caB3bcb8CA75468aB88d6d758128;
    address CAN_REMOVE_PARTICIPANT = 0x09458B509C75caB3bcb8CA75468aB88d6d758128;
    address ADMIN = 0x09458B509C75caB3bcb8CA75468aB88d6d758128;

    address[] public requstsUser;
    address[] public approvedUser;

    uint256 public numberOfrequstsUser = 0;
    uint256 public numberOfapprovedUser = 0;
    mapping(address => bool) userExists;

    constructor() {
        requstsUser.push(ADMIN);
        userExists[ADMIN] = true;
        numberOfrequstsUser = 1;
    }

    modifier restricted(address sender) {
        require(
            (sender == CAN_ADD_PARTICIPANT) ||
                (sender == CAN_REMOVE_PARTICIPANT) ||
                (sender == ADMIN),
            "Only owner can call this function"
        );
        _;
    }

    modifier userExistsRequire(address account) {
        require(!userExists[account], "user already exits");
        _;
    }

    function request(address account) public userExistsRequire(account) {
        requstsUser.push(account);
        numberOfrequstsUser++;
        userExists[account] = true;
    }

    function getUser() public view returns (address[] memory) {
        return requstsUser;
    }

    function approved() public {}
}
