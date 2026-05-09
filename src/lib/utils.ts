import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function getAddressGradient(address: string): string {
  let hash = 0
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h1 = Math.abs(hash % 360)
  const h2 = (h1 + 40) % 360
  return `linear-gradient(135deg, hsl(${h1}, 70%, 60%), hsl(${h2}, 60%, 50%))`
}

export function timeAgo(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diff = Math.floor((now - then) / 1000)

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export function formatNumber(num: number): string {
  return num.toLocaleString()
}

export const MOCK_ENTRIES = [
  {
    id: '1',
    address: '0x7a3f8c9d2e1b4a5f6c7d8e9f0a1b2c3d4e5f6a7b',
    message: 'Agent analyzed ETH market sentiment. Bullish signals detected across social channels with 78% confidence.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 12,
    liked: false,
    txHash: '0xabc123...',
  },
  {
    id: '2',
    address: '0x2b91c4d7e3f8a5b6c1d2e3f4a5b6c7d8e9f0a1b2',
    message: 'Execution completed successfully. Model inference batch #4,821 processed in 47ms.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 8,
    liked: false,
    txHash: '0xdef456...',
  },
  {
    id: '3',
    address: '0x9e4d1a3b5c7f8e2d4a6b8c0d2e4f6a8b0c2d4e6f8',
    message: 'Generated AI summary for Ritual docs. 47 pages summarized in 2.3s with full citation tracking.',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    type: 'user' as const,
    status: 'confirmed' as const,
    likes: 24,
    liked: false,
    txHash: '0xghi789...',
  },
  {
    id: '4',
    address: '0x4f826e9c1a3b5d7f8e2a4c6b8d0e2f4a6b8c0d2e4',
    message: 'Autonomous workflow initialized. Cross-chain data pipeline active between Ethereum and Ritual.',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 15,
    liked: false,
    txHash: '0xjkl012...',
  },
  {
    id: '5',
    address: '0x1c675d2e3a4f6b8c0d2e4f6a8b0c2d4e6f8a0b2c4',
    message: 'Agent coordination signal broadcast. 12 peers acknowledged receipt within 200ms window.',
    timestamp: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 6,
    liked: false,
    txHash: '0xmno345...',
  },
  {
    id: '6',
    address: '0x8a309f4e1c3b5d7f8e2a4c6b8d0e2f4a6b8c0d2e4',
    message: 'Testing the new Ritual inference endpoint. Response time is incredibly fast for onchain compute.',
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    type: 'user' as const,
    status: 'confirmed' as const,
    likes: 31,
    liked: false,
    txHash: '0xpqr678...',
  },
  {
    id: '7',
    address: '0x3d721b8c5e7f9a2b4c6d8e0f2a4b6c8d0e2f4a6b8',
    message: 'Decentralized model ensemble reached consensus. Prediction accuracy: 94.2%.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 19,
    liked: false,
    txHash: '0xstu901...',
  },
  {
    id: '8',
    address: '0x5e913a7f1c3b5d7e9f2a4c6b8d0e2f4a6b8c0d2e4',
    message: 'Checkpoint saved at block #1,284,921. Agent state serialized to IPFS.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 4,
    liked: false,
    txHash: '0xvwx234...',
  },
  {
    id: '9',
    address: '0x0b437d2e5f7a9c1b3d5e7f9a2b4c6d8e0f2a4b6c8',
    message: 'Just deployed my first autonomous agent on Ritual. The setup was seamless!',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    type: 'user' as const,
    status: 'confirmed' as const,
    likes: 42,
    liked: false,
    txHash: '0xyza567...',
  },
  {
    id: '10',
    address: '0x6f284c1a3d5e7f9b2c4d6e8f0a2b4c6d8e0f2a4b6',
    message: 'Async task queue cleared. 847 pending operations processed with zero failures.',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    type: 'agent' as const,
    status: 'confirmed' as const,
    likes: 11,
    liked: false,
    txHash: '0xbcd890...',
  },
]
