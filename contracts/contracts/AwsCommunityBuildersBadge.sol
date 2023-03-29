// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract AWSCommunityBuildersBadge is ERC721Upgradeable, AccessControlUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

  function initialize() public initializer {
    __ERC721_init("AWS Community Builders", "AWSCB");
    __Ownable_init();
    __AccessControl_init();
    __ERC165_init();
    __AWSCommunityBuildersBadge_init();
  }

  function __AWSCommunityBuildersBadge_init() internal onlyInitializing {
    __AWSCommunityBuildersBadge_init_unchained();
  }

  function __AWSCommunityBuildersBadge_init_unchained() internal onlyInitializing {
    _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _grantRole(ADMIN_ROLE, _msgSender());
    _grantRole(MINTER_ROLE, _msgSender());
    _grantRole(BURNER_ROLE, _msgSender());
  }

  function safeMint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
    _safeMint(to, tokenId);
  }

  function burn(uint256 tokenId) public onlyRole(BURNER_ROLE) {
    _burn(tokenId);
  }

  function supportsInterface(bytes4 interfaceID) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
    return interfaceID == type(IERC721Upgradeable).interfaceId || interfaceID == type(IERC721MetadataUpgradeable).interfaceId || super.supportsInterface(interfaceID);
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyRole(ADMIN_ROLE) {}

  uint256[50] private __gap;
}
