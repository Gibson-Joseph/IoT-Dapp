// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SipcotPark {
    struct Park {
        uint256 id;
        string parkName;
        uint256 water_consumption;
    }

    string[] public parkNames;
    uint256[] public water_consumption;
    uint256[] public id;
    // Park[] arr;
    mapping(uint256 => Park) public Parks;

    uint256 public numberOfParks = 0;

    function storePark(Park[] memory _data) public {
        for (uint256 i = 0; i < _data.length; i++) {
            Park storage newParks = Parks[i];
            newParks.id = _data[i].id;
            newParks.parkName = _data[i].parkName;
            newParks.water_consumption = _data[i].water_consumption;
            // arr.push(_data[i]);
            numberOfParks++;
        }
    }

    function getParkArr() public view returns (Park[] memory) {
        Park[] memory ret = new Park[](numberOfParks);
        for (uint256 i = 0; i < numberOfParks; i++) {
            ret[i] = Parks[i];
        }
        return ret;
    }

    function getPark() public view returns (string[] memory) {
        return parkNames;
    }
}
