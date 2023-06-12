// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SipcotPark {
    struct DeviceState {
        string state;
    }

    struct Organization {
        uint256 id;
        string name;
        string water_consumption;
    }

    struct Sipcot_park {
        uint256 id;
        string parkName;
        string water_consumption;
    }

    struct Park {
        uint256 id;
        string parkName;
        string water_consumption;
        Organization[] organizations;
        DeviceState[] flow_meters_industries;
    }

    mapping(uint256 => Park) public Parks;
    mapping(uint256 => Sipcot_park[]) Sipcot_parks;
    mapping(uint256 => Organization[]) public Organizations;
    mapping(uint256 => DeviceState[]) public Flow_meters_industries;

    uint256 public numberOfParks = 0;
    uint256 public numberOfOrganization = 0;
    uint256 public numberOfFlow_meters_industries = 0;

    function storePark(Park[] memory _data) public {
        uint256 len = _data.length + numberOfParks;
        uint256 index = 0;
        for (uint256 i = numberOfParks; i < len; i++) {
            Sipcot_park memory newSipcot_park = Sipcot_park(
                _data[index].id,
                _data[index].parkName,
                _data[index].water_consumption
            );

            Sipcot_parks[i].push(newSipcot_park);

            if (_data[index].flow_meters_industries.length > 0) {
                for (
                    uint256 k = 0;
                    k < _data[index].flow_meters_industries.length;
                    k++
                ) {
                    DeviceState memory newStruct = DeviceState(
                        _data[index].flow_meters_industries[k].state
                    );
                    Flow_meters_industries[_data[index].id].push(newStruct);
                }
            }

            if (_data[index].organizations.length > 0) {
                for (
                    uint256 j = 0;
                    j < _data[index].organizations.length;
                    j++
                ) {
                    Organization memory newStruct = Organization(
                        _data[index].organizations[j].id,
                        _data[index].organizations[j].name,
                        _data[index].organizations[j].water_consumption
                    );
                    Organizations[_data[index].id].push(newStruct);
                    numberOfOrganization++;
                }
            }

            index++;
            numberOfParks++;
        }

        index = 0;
    }

    function getParkArr() public view returns (Sipcot_park[] memory) {
        Sipcot_park[] memory ret = new Sipcot_park[](numberOfParks);
        for (uint256 i = 0; i < numberOfParks; i++) {
            // for(uint256 j = 0; j < Sipcot_parks[i].length; j++){}
            ret[i].id = Sipcot_parks[i][0].id;
            ret[i].parkName = Sipcot_parks[i][0].parkName;
            ret[i].water_consumption = Sipcot_parks[i][0].water_consumption;
        }
        return ret;
    }

    function getOrganizationArr(
        uint256 _id
    ) public view returns (Organization[] memory) {
        return Organizations[_id];
    }

    function getOrganizationStatus(
        uint256 _id
    ) public view returns (DeviceState[] memory) {
        return Flow_meters_industries[_id];
    }
}
