import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Columns3, Clock } from 'lucide-react'
import { Navbar } from './components/layout/navbar'
import { Sidebar } from './components/dashboard/sidebar'
import { KanbanBoard } from './components/kanban/kanban-board'
import { ListView } from './components/opportunities/list-view'
import { CreateModal } from './components/opportunities/create-modal'
import { ToastContainer } from './components/ui/toast'
import { useUIStore } from './store/ui.store'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
})

function MainContent() {
  const { viewMode } = useUIStore()
  return (
    <div className="main">
      <Sidebar />
      {viewMode === 'kanban' ? (
        <div className="kanban-wrapper">
          <div className="kanban-header">
            <div className="kanban-heading">
              <Columns3 size={14} />
              Deals Board
            </div>
            <span className="kanban-meta">
              <Clock size={11} />
              Last updated just now
            </span>
          </div>
          <KanbanBoard />
        </div>
      ) : (
        <ListView />
      )}
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Navbar />
        <MainContent />
        <CreateModal />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  )
}
