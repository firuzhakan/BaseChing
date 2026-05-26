import type { Address } from 'viem';

export const BASECHING_ABI = [
  {
    type: 'event',
    name: 'DivinationCast',
    inputs: [
      { name: 'seeker', type: 'address', indexed: true },
      { name: 'questionHash', type: 'bytes32', indexed: true },
      { name: 'lines', type: 'uint8', indexed: false },
      { name: 'castId', type: 'uint256', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'cast',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'questionHash', type: 'bytes32' }],
    outputs: [{ name: 'lines', type: 'uint8' }],
  },
  {
    type: 'function',
    name: 'castsBy',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalCasts',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '') as Address | '';

export const HAS_CONTRACT = CONTRACT_ADDRESS.length === 42;
