import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Home from './pages/Home'

// Raw Materials pages
import Receipts from './pages/RawMaterials/Receipts'
import Inventory from './pages/RawMaterials/Inventory'
import Transactions from './pages/RawMaterials/Transactions'
import Conversions from './pages/RawMaterials/Conversions'
import Logs from './pages/RawMaterials/Logs'

// Production pages
import Fermentation from './pages/Production/Fermentation'
import FermentationScrapLog from './pages/Production/FermentationScrapLog'
import FermentationLog from './pages/Production/FermentationLog'
import FermentationCooks from './pages/Production/FermentationCooks'
import FermenterStatus from './pages/Production/FermenterStatus'
import FermentationReports from './pages/Production/FermentationReports'
import Distillation from './pages/Production/Distillation'

// Barrels pages
import FillBarrels from './pages/Barrels/FillBarrels'
import RackhouseInventory from './pages/Barrels/RackhouseInventory'
import DumpBarrels from './pages/Barrels/DumpBarrels'
import ManageBarrels from './pages/Barrels/ManageBarrels'

// Processing pages
import Batching from './pages/Processing/Batching'
import Bottling from './pages/Processing/Bottling'
import MixedCases from './pages/Processing/MixedCases'
import DumpedCases from './pages/Processing/DumpedCases'
import Recasing from './pages/Processing/Recasing'
import CaseAndCSCLabels from './pages/Processing/CaseAndCSCLabels'

// Transfer In Bond pages
import Inbound from './pages/TransferInBond/Inbound'
import Outbound from './pages/TransferInBond/Outbound'

// Finished Products pages
import FinishedGoodsInventory from './pages/FinishedProducts/FinishedGoodsInventory'
import FinishedGoodsTransfers from './pages/FinishedProducts/FinishedGoodsTransfers'
import SalesOrders from './pages/FinishedProducts/SalesOrders'
import SalesInteractions from './pages/FinishedProducts/SalesInteractions'
import PriceLists from './pages/FinishedProducts/PriceLists'
import BailmentsAndDepletions from './pages/FinishedProducts/BailmentsAndDepletions'

// Tanks pages
import TankStatus from './pages/Tanks/TankStatus'
import TankLogs from './pages/Tanks/Logs'

// Logs and Reports pages
import TTBReports from './pages/LogsAndReports/TTBReports'
import FinancialReports from './pages/LogsAndReports/FinancialReports'
import WhiskeySystemReports from './pages/LogsAndReports/WhiskeySystemReports'
import StateReports from './pages/LogsAndReports/StateReports'
import PrintableWorksheets from './pages/LogsAndReports/PrintableWorksheets'
import PhysicalInventory from './pages/LogsAndReports/PhysicalInventory'
import WhiskeySystemLogs from './pages/LogsAndReports/WhiskeySystemLogs'
import DailyLogs from './pages/LogsAndReports/DailyLogs'
import DataArchive from './pages/LogsAndReports/DataArchive'

// Administrator pages
import DeleteTransactions from './pages/Administrator/DeleteTransactions'
import QuickBooksExport from './pages/Administrator/QuickBooksExport'
import PaymentSettings from './pages/Administrator/PaymentSettings'
import QueuedJobs from './pages/Administrator/QueuedJobs'
import ManageUsers from './pages/Administrator/ManageUsers'
import ResetAccount from './pages/Administrator/ResetAccount'

// Calculator pages
import ProofGallons from './pages/Calculator/ProofGallons'
import LAA from './pages/Calculator/LAA'
import CalculatorConversions from './pages/Calculator/Conversions'

// Settings page
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-primary-dark">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Raw Materials */}
              <Route path="/raw-materials/receipts" element={<Receipts />} />
              <Route path="/raw-materials/inventory" element={<Inventory />} />
              <Route path="/raw-materials/transactions" element={<Transactions />} />
              <Route path="/raw-materials/conversions" element={<Conversions />} />
              <Route path="/raw-materials/logs" element={<Logs />} />
              
              {/* Production */}
              <Route path="/production/fermentation" element={<Fermentation />} />
              <Route path="/production/fermentation-scrap-log" element={<FermentationScrapLog />} />
              <Route path="/production/fermentation-log" element={<FermentationLog />} />
              <Route path="/production/fermentation-cooks" element={<FermentationCooks />} />
              <Route path="/production/fermenter-status" element={<FermenterStatus />} />
              <Route path="/production/fermentation-reports" element={<FermentationReports />} />
              <Route path="/production/distillation" element={<Distillation />} />
              
              {/* Barrels */}
              <Route path="/barrels/fill-barrels" element={<FillBarrels />} />
              <Route path="/barrels/rackhouse-inventory" element={<RackhouseInventory />} />
              <Route path="/barrels/dump-barrels" element={<DumpBarrels />} />
              <Route path="/barrels/manage-barrels" element={<ManageBarrels />} />
              
              {/* Processing */}
              <Route path="/processing/batching" element={<Batching />} />
              <Route path="/processing/bottling" element={<Bottling />} />
              <Route path="/processing/mixed-cases" element={<MixedCases />} />
              <Route path="/processing/dumped-cases" element={<DumpedCases />} />
              <Route path="/processing/recasing" element={<Recasing />} />
              <Route path="/processing/case-and-csc-labels" element={<CaseAndCSCLabels />} />
              
              {/* Transfer In Bond */}
              <Route path="/transfer-in-bond/inbound" element={<Inbound />} />
              <Route path="/transfer-in-bond/outbound" element={<Outbound />} />
              
              {/* Finished Products */}
              <Route path="/finished-products/finished-goods-inventory" element={<FinishedGoodsInventory />} />
              <Route path="/finished-products/finished-goods-transfers" element={<FinishedGoodsTransfers />} />
              <Route path="/finished-products/sales-orders" element={<SalesOrders />} />
              <Route path="/finished-products/sales-interactions" element={<SalesInteractions />} />
              <Route path="/finished-products/price-lists" element={<PriceLists />} />
              <Route path="/finished-products/bailments-and-depletions" element={<BailmentsAndDepletions />} />
              
              {/* Tanks */}
              <Route path="/tanks/tank-status" element={<TankStatus />} />
              <Route path="/tanks/logs" element={<TankLogs />} />
              
              {/* Logs and Reports */}
              <Route path="/logs-and-reports/ttb-reports" element={<TTBReports />} />
              <Route path="/logs-and-reports/financial-reports" element={<FinancialReports />} />
              <Route path="/logs-and-reports/whiskey-system-reports" element={<WhiskeySystemReports />} />
              <Route path="/logs-and-reports/state-reports" element={<StateReports />} />
              <Route path="/logs-and-reports/printable-worksheets" element={<PrintableWorksheets />} />
              <Route path="/logs-and-reports/physical-inventory" element={<PhysicalInventory />} />
              <Route path="/logs-and-reports/whiskey-system-logs" element={<WhiskeySystemLogs />} />
              <Route path="/logs-and-reports/daily-logs" element={<DailyLogs />} />
              <Route path="/logs-and-reports/data-archive" element={<DataArchive />} />
              
              {/* Administrator */}
              <Route path="/administrator/delete-transactions" element={<DeleteTransactions />} />
              <Route path="/administrator/quickbooks-export" element={<QuickBooksExport />} />
              <Route path="/administrator/payment-settings" element={<PaymentSettings />} />
              <Route path="/administrator/queued-jobs" element={<QueuedJobs />} />
              <Route path="/administrator/manage-users" element={<ManageUsers />} />
              <Route path="/administrator/reset-account" element={<ResetAccount />} />
              
              {/* Calculator */}
              <Route path="/calculator/proof-gallons" element={<ProofGallons />} />
              <Route path="/calculator/laa" element={<LAA />} />
              <Route path="/calculator/conversions" element={<CalculatorConversions />} />
              
              {/* Settings */}
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

