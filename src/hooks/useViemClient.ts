import { useState, useCallback, useEffect } from 'react'
import { createPublicClient, createWalletClient, custom, http, publicActions } from 'viem'
import { RITUAL_CHAIN_CONFIG } from '@/lib/constants'

// Public client (read-only, no wallet needed)
export function getPublicClient() {
  return createPublicClient({
    chain: RITUAL_CHAIN_CONFIG,
    transport: http(RITUAL_CHAIN_CONFIG.rpcUrls.default.http[0]),
  })
}

// Wallet client (requires connected wallet)
export function getWalletClient() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No wallet found. Please install MetaMask.')
  }
  return createWalletClient({
    chain: RITUAL_CHAIN_CONFIG,
    transport: custom(window.ethereum),
  }).extend(publicActions)
}

// Hook for wallet address
export function useWalletAddress() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const checkConnection = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) return

    try {
      const accounts = (await window.ethereum.request({
        method: 'eth_accounts',
      })) as string[]

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0])
        setIsConnected(true)
      } else {
        setAddress(null)
        setIsConnected(false)
      }
    } catch {
      setAddress(null)
      setIsConnected(false)
    }
  }, [])

  const connect = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('Please install MetaMask or another Web3 wallet')
    }

    // Switch to Ritual Testnet
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${RITUAL_CHAIN_CONFIG.id.toString(16)}` }],
      })
    } catch (switchError: unknown) {
      const err = switchError as { code: number }
      // Chain not added, add it
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${RITUAL_CHAIN_CONFIG.id.toString(16)}`,
              chainName: RITUAL_CHAIN_CONFIG.name,
              nativeCurrency: RITUAL_CHAIN_CONFIG.nativeCurrency,
              rpcUrls: [RITUAL_CHAIN_CONFIG.rpcUrls.default.http[0]],
              blockExplorerUrls: [RITUAL_CHAIN_CONFIG.blockExplorers.default.url],
            },
          ],
        })
      }
    }

    const accounts = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[]

    if (accounts && accounts.length > 0) {
      setAddress(accounts[0])
      setIsConnected(true)
      localStorage.setItem('ritual_wallet_address', accounts[0])
      return accounts[0]
    }

    return null
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setIsConnected(false)
    localStorage.removeItem('ritual_wallet_address')
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        disconnect()
      } else {
        setAddress(accs[0])
        setIsConnected(true)
        localStorage.setItem('ritual_wallet_address', accs[0])
      }
    }

    const handleChainChanged = () => {
      window.location.reload()
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    // Check existing connection
    const stored = localStorage.getItem('ritual_wallet_address')
    if (stored) {
      checkConnection()
    }

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener('chainChanged', handleChainChanged)
    }
  }, [checkConnection, disconnect])

  return { address, isConnected, connect, disconnect, checkConnection }
}
