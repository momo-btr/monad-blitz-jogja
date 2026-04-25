// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title TerraformaLand
 * @dev Core MVP for Terraforma Indonesian Land Registry.
 * Target Chain: Monad Testnet (Chain ID: 10143).
 * Benefit: Monad parallel execution → instant land title verification & high throughput.
 * No contract changes needed for Monad optimstic concurrency.
 */
contract TerraformaLand is ERC721 {
    uint256 private _nextTokenId;
    string public greeting = "Decentralized Land Registry";

    struct LandPlot {
        uint256 id;
        string geoJSONHash; // IPFS URI metadata
        string locationProvince;
        string locationCity;
        uint256 areaSqm;
        string NIB_NomorIdentitasBidang;
        bool isVerified;
    }

    mapping(address => bool) public admins;
    mapping(uint256 => LandPlot) public landPlots;

    event LandMinted(uint256 indexed tokenId, address indexed owner, string nib);
    event VerificationUpdated(uint256 indexed tokenId, bool isVerified);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not admin");
        _;
    }

    constructor() ERC721("TerraformaLand", "TLND") {
        admins[msg.sender] = true;
    }

    /**
     * @dev Mint new land cert.
     * Monad async execution → UI will see tx in 3 blocks (~3s).
     */
    function mintLandCertificate(
        address owner,
        string memory geoJSONHash,
        string memory locationProvince,
        string memory locationCity,
        uint256 areaSqm,
        string memory nib
    ) public onlyAdmin returns (uint256) {
        uint256 tokenId = ++_nextTokenId;

        landPlots[tokenId] = LandPlot({
            id: tokenId,
            geoJSONHash: geoJSONHash,
            locationProvince: locationProvince,
            locationCity: locationCity,
            areaSqm: areaSqm,
            NIB_NomorIdentitasBidang: nib,
            isVerified: false
        });

        _safeMint(owner, tokenId);

        emit LandMinted(tokenId, owner, nib);
        return tokenId;
    }

    function updateVerificationStatus(uint256 id, bool verified) public onlyAdmin {
        require(_ownerOf(id) != address(0), "Land not exist");
        landPlots[id].isVerified = verified;
        emit VerificationUpdated(id, verified);
    }

    function getLandPlotDetails(uint256 id) public view returns (LandPlot memory) {
        require(_ownerOf(id) != address(0), "Land not exist");
        return landPlots[id];
    }
}
