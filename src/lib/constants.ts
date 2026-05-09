// ============================================
// Ritual Testnet Configuration
// Chain ID: 1979
// RPC: https://rpc.ritualfoundation.org
// Explorer: https://explorer.ritualfoundation.org
// ============================================

export const RITUAL_CHAIN_CONFIG = {
  id: 1979,
  name: 'Ritual Testnet',
  nativeCurrency: {
    name: 'RITUAL',
    symbol: 'RITUAL',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.ritualfoundation.org'] },
    public: { http: ['https://rpc.ritualfoundation.org'] },
  },
  blockExplorers: {
    default: { name: 'Ritual Explorer', url: 'https://explorer.ritualfoundation.org' },
  },
} as const

// ============================================
// DEPLOYED AgentFeed Contract
// ============================================

export const CONTRACT_ADDRESS = '0x07A8ecA1dAa542ca191c0dE9eEEf7a84cA0C2Cd6'

export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AlreadyLiked',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyMessage',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MessageNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MessageTooLong',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotLiked',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'messageId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'liker', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'newTotalLikes', type: 'uint256' },
    ],
    name: 'MessageLiked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'author', type: 'address' },
      { indexed: false, internalType: 'string', name: 'content', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'MessagePosted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'messageId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'liker', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'newTotalLikes', type: 'uint256' },
    ],
    name: 'MessageUnliked',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_messageId', type: 'uint256' }],
    name: 'likeMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_content', type: 'string' }],
    name: 'postMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_messageId', type: 'uint256' }],
    name: 'unlikeMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllMessages',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'author', type: 'address' },
          { internalType: 'string', name: 'content', type: 'string' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'likes', type: 'uint256' },
          { internalType: 'bool', name: 'exists', type: 'bool' },
        ],
        internalType: 'struct AgentFeed.Message[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_author', type: 'address' }],
    name: 'getAuthorProfile',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'messageCount', type: 'uint256' },
          { internalType: 'uint256', name: 'totalLikes', type: 'uint256' },
          { internalType: 'bool', name: 'exists', type: 'bool' },
        ],
        internalType: 'struct AgentFeed.AuthorProfile',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_messageId', type: 'uint256' }],
    name: 'getMessage',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'author', type: 'address' },
          { internalType: 'string', name: 'content', type: 'string' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'likes', type: 'uint256' },
          { internalType: 'bool', name: 'exists', type: 'bool' },
        ],
        internalType: 'struct AgentFeed.Message',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMessageCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_offset', type: 'uint256' },
      { internalType: 'uint256', name: '_limit', type: 'uint256' },
    ],
    name: 'getRecentMessages',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'author', type: 'address' },
          { internalType: 'string', name: 'content', type: 'string' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'likes', type: 'uint256' },
          { internalType: 'bool', name: 'exists', type: 'bool' },
        ],
        internalType: 'struct AgentFeed.Message[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'hasLiked',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'messageCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'messageIds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'messages',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'author', type: 'address' },
      { internalType: 'string', name: 'content', type: 'string' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'likes', type: 'uint256' },
      { internalType: 'bool', name: 'exists', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'profiles',
    outputs: [
      { internalType: 'uint256', name: 'messageCount', type: 'uint256' },
      { internalType: 'uint256', name: 'totalLikes', type: 'uint256' },
      { internalType: 'bool', name: 'exists', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalLikes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'uint256', name: '_messageId', type: 'uint256' },
    ],
    name: 'userHasLiked',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// ============================================
// App Constants
// ============================================

export const MAX_MESSAGE_LENGTH = 280

export const FEED_PLACEHOLDERS = [
  'Share an agent update, execution log, or coordination message...',
  'What are your agents working on?',
  'Broadcast a coordination signal...',
]

export const CREATOR_INFO = {
  name: 'Nxrskyaa',
  xLink: 'https://x.com/nxrskyaa',
  avatar: '/images/creator.png',
  network: 'Ritual Testnet',
}
