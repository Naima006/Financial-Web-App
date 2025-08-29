import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { calculateFinancialSummary, generateLedgers, generateTrialBalance } from '../utils/accounting';

const STORAGE_KEY = 'financeflow_journal_entries';

export const useAccountingData = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [trialBalance, setTrialBalance] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    totalCapital: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    console.log('Loading data from localStorage...');
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEY);
      console.log('Raw localStorage data:', savedEntries);
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        console.log('Parsed entries:', parsedEntries);
        if (Array.isArray(parsedEntries)) {
          setJournalEntries(parsedEntries);
          console.log('Set journal entries:', parsedEntries);
        }
      }
    } catch (error) {
      console.error('Error loading journal entries from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoaded(true);
  }, []);

  // Update derived data when journal entries change
  useEffect(() => {
    // Don't save to localStorage during initial load
    if (!isLoaded) return;

    console.log('Updating derived data for entries:', journalEntries);
    const newLedgers = generateLedgers(journalEntries);
    const newTrialBalance = generateTrialBalance(newLedgers);
    const newFinancialSummary = calculateFinancialSummary(newLedgers);

    setLedgers(newLedgers);
    setTrialBalance(newTrialBalance);
    setFinancialSummary(newFinancialSummary);

    // Save to localStorage with error handling
    try {
      console.log('Saving to localStorage:', journalEntries);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journalEntries));
      console.log('Successfully saved to localStorage');
    } catch (error) {
      console.error('Error saving journal entries to localStorage:', error);
    }
  }, [journalEntries, isLoaded]);

  const addJournalEntry = (entry) => {
    console.log('Adding journal entry:', entry);
    // Ensure the entry has a unique ID
    const entryWithId = {
      ...entry,
      id: entry.id || uuidv4(),
      createdAt: entry.createdAt || new Date().toISOString()
    };
    setJournalEntries(prev => [...prev, entryWithId]);
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries((prev) => {
      const exists = prev.some(entry => entry.id === id);
      if (!exists) console.warn('Tried to delete non-existent entry:', id);
      return prev.filter(entry => entry.id !== id);
    });
  };


  const updateJournalEntry = (updatedEntry) => {
    setJournalEntries((prev) =>
        prev.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
        )
    );
  };

  const clearAllData = () => {
    console.log('Clearing all data');
    setJournalEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // const processYearEnd = () => {
  //   // 1. Create new ledgers with balances carried forward
  //   const newLedgers = ledgers.map(ledger => ({
  //     ...ledger,
  //     openingBalance: ledger.balance, // Carry forward the balance
  //     balance: ledger.balance,        // Keep same balance
  //     transactions: []                // Clear transactions
  //   }));

  //   // 2. Archive current year data
  //   const archiveData = {
  //     date: new Date().toISOString(),
  //     year: new Date().getFullYear(),
  //     journalEntries: [...journalEntries],
  //     ledgers: [...ledgers]
  //   };

  //   // 3. Update state
  //   setLedgers(newLedgers);
  //   setJournalEntries([]);
    
  //   // 4. Save to localStorage
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  //   localStorage.setItem(`${STORAGE_KEY}_archive_${new Date().getFullYear()}`, JSON.stringify(archiveData));

  //   return archiveData; // Return the archived data if needed
  // };

  return {
    journalEntries,
    ledgers,
    trialBalance,
    financialSummary,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    clearAllData,
    //processYearEnd
  };
};