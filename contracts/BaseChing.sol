// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseChing — on-chain I Ching divination
/// @notice One call casts six coin tosses and emits the resulting hexagram.
///         Designed for minimal gas on Base. The question itself is never
///         stored on-chain — only its keccak256 hash, for privacy.
///
/// @dev Randomness uses block.prevrandao mixed with caller + nonce. On Base
///      (an OP-stack chain) prevrandao is the L1 beacon randao value, which
///      is sufficient for a non-financial divination use case. For any flow
///      where the outcome carries economic stakes, swap this for Chainlink
///      VRF or a commit–reveal scheme.
contract BaseChing {
    /// @notice Emitted on each divination.
    /// @param seeker        Address that cast the divination.
    /// @param questionHash  keccak256(question) supplied by the caller.
    /// @param lines         6 bits, line 1 (bottom) = LSB. 1 = Yang, 0 = Yin.
    /// @param castId        Per-seeker monotonically increasing id (1-indexed).
    event DivinationCast(
        address indexed seeker,
        bytes32 indexed questionHash,
        uint8 lines,
        uint256 castId
    );

    /// @notice Total divinations cast by an address.
    mapping(address => uint256) public castsBy;

    /// @notice Global counter; also used as a nonce in the entropy mix.
    uint256 public totalCasts;

    /// @notice Cast a divination.
    /// @param questionHash keccak256 of the user's question. May be zero.
    /// @return lines 6 bits (line 1 LSB). 1 = Yang (solid), 0 = Yin (broken).
    function cast(bytes32 questionHash) external returns (uint8 lines) {
        unchecked {
            totalCasts += 1;
            castsBy[msg.sender] += 1;
        }

        uint256 entropy = uint256(
            keccak256(
                abi.encodePacked(
                    block.prevrandao,
                    block.timestamp,
                    msg.sender,
                    totalCasts,
                    questionHash
                )
            )
        );

        lines = uint8(entropy & 0x3F); // low 6 bits

        emit DivinationCast(msg.sender, questionHash, lines, castsBy[msg.sender]);
    }
}
