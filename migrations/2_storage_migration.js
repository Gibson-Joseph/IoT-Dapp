// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
