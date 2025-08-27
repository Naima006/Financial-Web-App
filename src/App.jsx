import { Route, Routes, useLocation } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import JournalEntries from "./components/JournalEntries"
import Ledger from "./components/Ledger"
import Navigation from "./components/Navigation"
import Payments from "./components/Payments"
import Receipts from "./components/Receipts"
import Reports from "./components/Reports"
import { useAccountingData } from "./hooks/useAccountingData"

function App() {
  const location = useLocation()
  const {
    journalEntries,
    ledgers,
    trialBalance,
    financialSummary,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    clearAllData,
  } = useAccountingData()

  const { processYearEnd } = useAccountingData()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Year End Button
      <div className="relative">
        <YearEndButton onProcessYearEnd={processYearEnd} />
      </div> */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/*"
            element={
              <Dashboard financialSummary={financialSummary} recentEntries={journalEntries.slice(-10).reverse()} />
            }
          />
          <Route
            path="/journal-entries/*"
            element={
              <JournalEntries
                journalEntries={journalEntries}
                ledgers={ledgers}
                onAddEntry={addJournalEntry}
                onUpdateEntry={updateJournalEntry}
                onDeleteEntry={deleteJournalEntry}
              />
            }
          />
          <Route path="/ledger" element={<Ledger ledgers={ledgers} />} />
          <Route
            path="/reports"
            element={<Reports financialSummary={financialSummary} ledgers={ledgers} trialBalance={trialBalance} />}
          />
          <Route path="/receipts" element={<Receipts onAddEntry={addJournalEntry} existingLedgers={ledgers} />} />
          <Route path="/payments" element={<Payments onAddEntry={addJournalEntry} existingLedgers={ledgers} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;