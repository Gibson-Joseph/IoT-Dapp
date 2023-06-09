// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SipcotPark {
    struct Organization {
        uint256 id;
        string name;
        string water_consumption;
    }

    struct Park {
        uint256 id;
        string parkName;
        string water_consumption;
        Organization[] organizations;
    }
    mapping(uint256 => Park) public Parks;
    mapping(uint256 => Organization[]) public Organizations;

    uint256 public numberOfParks = 0;
    uint256 public numberOfOrganization = 0;

    function storePark(Park[] memory _data) public {
        for (uint256 i = 0; i < _data.length; i++) {
            Park storage newParks = Parks[i];
            newParks.id = _data[i].id;
            newParks.parkName = _data[i].parkName;
            newParks.water_consumption = _data[i].water_consumption;
            if (_data[i].organizations.length > 0) {
                for (uint256 j = 0; j < _data[i].organizations.length; j++) {
                    Organization memory newStruct = Organization(
                        _data[i].organizations[j].id,
                        _data[i].organizations[j].name,
                        _data[i].organizations[j].water_consumption
                    );
                    Organizations[_data[i].id].push(newStruct);
                    numberOfOrganization++;
                }
            }
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

    function getOrganizationArr(
        uint256 _id
    ) public view returns (Organization[] memory) {
        return Organizations[_id];
    }
}
