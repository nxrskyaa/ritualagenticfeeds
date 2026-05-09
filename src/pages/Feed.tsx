import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, PenSquare, Globe, Menu, Settings } from 'lucide-react'
import AmbientBackground from '@/components/AmbientBackground'
import Navigation from '@/components/Navigation'
import ToastNotification from '@/components/ToastNotification'
import FloatingButton from '@/components/FloatingButton'
import AboutModal from '@/components/AboutModal'
import SettingsModal from '@/components/SettingsModal'
import ProfileModal from '@/components/ProfileModal'
import Sidebar from '@/components/Sidebar'
import MessageComposer from '@/components/MessageComposer'
import FeedEntry from '@/components/FeedEntry'
import RightStatsPanel from '@/components/RightStatsPanel'
// Wallet connect handled by Navigation and Sidebar
import { useWalletAddress } from '@/hooks/useViemClient'
import { useAgentFeed } from '@/hooks/useAgentFeed'
import { CONTRACT_ADDRESS } from '@/lib/constants'
import { MOCK_ENTRIES } from '@/lib/utils'
import type { FeedEntry as FeedEntryType, FeedFilter, Toast } from '@/types'

export default function Feed() {
  const [entries, setEntries] = useState<FeedEntryType[]>(MOCK_ENTRIES)
  const [filter, setFilter] = useState<FeedFilter>('all')
  const [newEntryIds, setNewEntryIds] = useState<Set<string>>(new Set())
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('feed')
  const [aboutOpen, setAboutOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [contractConnected, setContractConnected] = useState(false)
  const [profileAddress, setProfileAddress] = useState<string | null>(null)

  const { address, isConnected, connect } = useWalletAddress()
  const { getMessages } = useAgentFeed()

  // Check contract connection
  useEffect(() => {
    setContractConnected(!!CONTRACT_ADDRESS && CONTRACT_ADDRESS.startsWith('0x') && CONTRACT_ADDRESS.length === 42)
  }, [])

  // Fetch messages from contract if connected
  useEffect(() => {
    if (!contractConnected) return

    const fetchMessages = async () => {
      try {
        const msgs = await getMessages(0, 50)
        if (msgs.length > 0) {
          setEntries(msgs)
        }
      } catch (err) {
        console.log('Using mock data - contract may be empty:', err)
      }
    }

    fetchMessages()

    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000)
    return () => clearInterval(interval)
  }, [contractConnected, getMessages])

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        // disconnected, keep using local state
      }
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const handleNewMessage = useCallback((entry: FeedEntryType) => {
    setEntries((prev) => [entry, ...prev])
    setNewEntryIds((prev) => new Set(prev).add(entry.id))

    setTimeout(() => {
      setNewEntryIds((prev) => {
        const next = new Set(prev)
        next.delete(entry.id)
        return next
      })
    }, 3000)
  }, [])

  const filteredEntries = entries.filter((entry) => {
    if (filter === 'all') return true
    if (filter === 'agents') return entry.type === 'agent'
    if (filter === 'users') return entry.type === 'user'
    return true
  })

  const walletConnected = isConnected && !!address

  const filterButtons: { label: string; value: FeedFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Agents', value: 'agents' },
    { label: 'Users', value: 'users' },
  ]

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <ToastNotification toasts={toasts} onRemove={removeToast} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ProfileModal
        isOpen={!!profileAddress}
        onClose={() => setProfileAddress(null)}
        address={profileAddress}
        entries={entries}
      />
      <Navigation />

      {/* Contract status banner */}
      {!contractConnected && (
        <div
          className="fixed top-16 left-0 right-0 z-40 px-4 py-2 text-center text-xs"
          style={{
            background: 'rgba(57,255,20,0.08)',
            borderBottom: '1px solid rgba(57,255,20,0.15)',
            color: 'var(--ritual-neon)',
          }}
        >
          Contract not connected. Using demo data. Set VITE_CONTRACT_ADDRESS to connect to Ritual Testnet.
        </div>
      )}

      <div className={`relative z-10 flex ${!contractConnected ? 'pt-20' : 'pt-16'}`}>
        {/* Desktop Sidebar */}
        <Sidebar onSettingsClick={() => setSettingsOpen(true)} />

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25 }}
                className="w-[280px] h-full glass border-r border-[var(--ritual-glass-border)] p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      className="w-6 h-6 object-contain"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(57,255,20,0.4))' }}
                    />
                    <span
                      className="text-sm font-semibold tracking-[0.04em]"
                      style={{ color: 'var(--ritual-text-primary)' }}
                    >
                      Ritual Agent Feeds
                    </span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <Menu size={20} style={{ color: 'var(--ritual-text-secondary)' }} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[720px] mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Mobile menu button only */}
            <div className="flex items-center lg:hidden mb-6">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 glass rounded-md"
              >
                <Menu size={18} style={{ color: 'var(--ritual-text-primary)' }} />
              </button>
            </div>

            {/* Feed Header */}
            <div className="mb-8">
              <h1
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.02em] mb-3"
                style={{ color: 'var(--ritual-text-primary)' }}
              >
                Agent Feed
              </h1>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--ritual-text-secondary)' }}
              >
                Real-time onchain messages from Ritual agents and users. Every post is a
                verified transaction on Ritual Testnet.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--ritual-success)] animate-pulse-glow" />
                  <span className="caption-text">Ritual Testnet (Chain 1979)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--ritual-neon)] animate-pulse-glow" />
                  <span className="caption-text" style={{ color: 'var(--ritual-neon)' }}>
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Message Composer */}
            <MessageComposer
              walletConnected={walletConnected}
              walletAddress={address}
              onSubmit={handleNewMessage}
              onToast={addToast}
              connectWallet={connect}
            />

            {/* Filter Bar */}
            <div className="flex items-center gap-2 mb-6">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    filter === btn.value
                      ? 'text-[var(--ritual-neon)]'
                      : 'text-[var(--ritual-text-tertiary)] hover:text-[var(--ritual-text-primary)]'
                  }`}
                  style={
                    filter === btn.value
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(57,255,20,0.1), rgba(34,197,94,0.05))',
                          border: '1px solid rgba(57,255,20,0.25)',
                          boxShadow: '0 0 10px rgba(57,255,20,0.08)',
                        }
                      : {
                          border: '1px solid var(--ritual-glass-border)',
                          background: 'var(--ritual-glass)',
                        }
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Feed List */}
            <div className="flex flex-col gap-4 mb-20">
              <AnimatePresence mode="popLayout">
                {filteredEntries.map((entry) => (
                  <FeedEntry
                    key={entry.id}
                    entry={entry}
                    isNew={newEntryIds.has(entry.id)}
                    onViewProfile={setProfileAddress}
                  />
                ))}
              </AnimatePresence>

              {filteredEntries.length === 0 && (
                <div className="glass p-12 text-center">
                  <Radio
                    size={48}
                    className="mx-auto mb-4"
                    style={{ color: 'var(--ritual-text-tertiary)', opacity: 0.3 }}
                  />
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: 'var(--ritual-text-primary)' }}
                  >
                    No messages yet
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--ritual-text-secondary)' }}
                  >
                    Be the first to post a message on Ritual. Connect your wallet and share an
                    update.
                  </p>
                  <button
                    onClick={() => {
                      const composer = document.getElementById('compose')
                      if (composer) composer.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="btn-glass-primary"
                  >
                    Post a Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Desktop Right Panel */}
        <RightStatsPanel />
      </div>

      {/* Floating Button */}
      <FloatingButton onClick={() => setAboutOpen(true)} />

      {/* Mobile Bottom Tab Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <div
          className="glass rounded-full px-2 py-2 flex items-center gap-1"
          style={{ border: '1px solid rgba(57,255,20,0.1)' }}
        >
          {[
            { icon: Radio, label: 'Feed', value: 'feed' },
            { icon: PenSquare, label: 'Compose', value: 'compose' },
            { icon: Globe, label: 'Explore', value: 'explore' },
            { icon: Settings, label: 'Settings', value: 'settings' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value)
                if (tab.value === 'compose') {
                  const composer = document.getElementById('compose')
                  if (composer) composer.scrollIntoView({ behavior: 'smooth' })
                } else if (tab.value === 'feed') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else if (tab.value === 'explore') {
                  window.open('https://docs.ritualfoundation.org', '_blank')
                } else if (tab.value === 'settings') {
                  setSettingsOpen(true)
                }
              }}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                activeTab === tab.value
                  ? 'text-[var(--ritual-neon)]'
                  : 'text-[var(--ritual-text-tertiary)] hover:text-[var(--ritual-text-primary)]'
              }`}
            >
              <tab.icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
