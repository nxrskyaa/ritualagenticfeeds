import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './pages/Landing'
import Feed from './pages/Feed'

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageWrapper>
            <Landing />
          </PageWrapper>
        }
      />
      <Route
        path="/feed"
        element={
          <PageWrapper>
            <Feed />
          </PageWrapper>
        }
      />
    </Routes>
  )
}
