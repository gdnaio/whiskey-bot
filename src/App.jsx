import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Home from './pages/Home'

// Main category pages
import RawMaterials from './pages/RawMaterials'
import FinishedProducts from './pages/FinishedProducts'
import Tanks from './pages/Tanks'
import LogsAndReports from './pages/LogsAndReports'
import Administrator from './pages/Administrator'
import Calculator from './pages/Calculator'
import Settings from './pages/Settings'

// Transfer In Bond pages
import NewToteTIBIn from './pages/TransferInBond/NewToteTIBIn'
import NewTankerTIBIn from './pages/TransferInBond/NewTankerTIBIn'
import NewBarrelTIBIn from './pages/TransferInBond/NewBarrelTIBIn'
import NewBulkBarrelTIBIn from './pages/TransferInBond/NewBulkBarrelTIBIn'
import NewFinishedProductTIBIn from './pages/TransferInBond/NewFinishedProductTIBIn'
import TIBInLog from './pages/TransferInBond/TIBInLog'
import NewTankToteTIBOut from './pages/TransferInBond/NewTankToteTIBOut'
import NewTankerTIBOut from './pages/TransferInBond/NewTankerTIBOut'
import NewFinishedProductTIBOut from './pages/TransferInBond/NewFinishedProductTIBOut'
import TIBOutLog from './pages/TransferInBond/TIBOutLog'

// Processing pages
import NewBatchingRun from './pages/Processing/NewBatchingRun'
import BatchingRunLog from './pages/Processing/BatchingRunLog'
import NewBottlingRun from './pages/Processing/NewBottlingRun'
import BottlingRunLog from './pages/Processing/BottlingRunLog'

// Barrels pages
import NewFill from './pages/Barrels/NewFill'
import BarrelFillLog from './pages/Barrels/BarrelFillLog'
import OnsiteBarrels from './pages/Barrels/OnsiteBarrels'
import OffsiteBarrels from './pages/Barrels/OffsiteBarrels'
import RackhouseInventory from './pages/Barrels/RackhouseInventory'
import QueuedDumps from './pages/Barrels/QueuedDumps'
import CompletedDumps from './pages/Barrels/CompletedDumps'
import BarrelHistory from './pages/Barrels/BarrelHistory'
import UpdateLog from './pages/Barrels/UpdateLog'
import EmptyBarrels from './pages/Barrels/EmptyBarrels'

// Production pages (only category with subcategories)
import FermentationScrapLog from './pages/Production/FermentationScrapLog'
import FermentationLog from './pages/Production/FermentationLog'
import FermentationCooks from './pages/Production/FermentationCooks'
import FermenterStatus from './pages/Production/FermenterStatus'
import FermentationReports from './pages/Production/FermentationReports'
import NewDistillation from './pages/Production/NewDistillation'
import DistillationLog from './pages/Production/DistillationLog'
import Distillation from './pages/Production/Distillation'

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
              
              {/* Main category pages */}
              <Route path="/raw-materials" element={<RawMaterials />} />
              <Route path="/finished-products" element={<FinishedProducts />} />
              <Route path="/tanks" element={<Tanks />} />
              <Route path="/logs-and-reports" element={<LogsAndReports />} />
              <Route path="/administrator" element={<Administrator />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Barrels subcategories */}
              <Route path="/barrels/new-fill" element={<NewFill />} />
              <Route path="/barrels/barrel-fill-log" element={<BarrelFillLog />} />
              <Route path="/barrels/onsite-barrels" element={<OnsiteBarrels />} />
              <Route path="/barrels/offsite-barrels" element={<OffsiteBarrels />} />
              <Route path="/barrels/rackhouse-inventory" element={<RackhouseInventory />} />
              <Route path="/barrels/queued-dumps" element={<QueuedDumps />} />
              <Route path="/barrels/completed-dumps" element={<CompletedDumps />} />
              <Route path="/barrels/barrel-history" element={<BarrelHistory />} />
              <Route path="/barrels/update-log" element={<UpdateLog />} />
              <Route path="/barrels/empty-barrels" element={<EmptyBarrels />} />
              
              {/* Processing subcategories */}
              <Route path="/processing/new-batching-run" element={<NewBatchingRun />} />
              <Route path="/processing/batching-run-log" element={<BatchingRunLog />} />
              <Route path="/processing/new-bottling-run" element={<NewBottlingRun />} />
              <Route path="/processing/bottling-run-log" element={<BottlingRunLog />} />
              
              {/* Transfer In Bond subcategories */}
              <Route path="/transfer-in-bond/new-tote-tib-in" element={<NewToteTIBIn />} />
              <Route path="/transfer-in-bond/new-tanker-tib-in" element={<NewTankerTIBIn />} />
              <Route path="/transfer-in-bond/new-barrel-tib-in" element={<NewBarrelTIBIn />} />
              <Route path="/transfer-in-bond/new-bulk-barrel-tib-in" element={<NewBulkBarrelTIBIn />} />
              <Route path="/transfer-in-bond/new-finished-product-tib-in" element={<NewFinishedProductTIBIn />} />
              <Route path="/transfer-in-bond/tib-in-log" element={<TIBInLog />} />
              <Route path="/transfer-in-bond/new-tank-tote-tib-out" element={<NewTankToteTIBOut />} />
              <Route path="/transfer-in-bond/new-tanker-tib-out" element={<NewTankerTIBOut />} />
              <Route path="/transfer-in-bond/new-finished-product-tib-out" element={<NewFinishedProductTIBOut />} />
              <Route path="/transfer-in-bond/tib-out-log" element={<TIBOutLog />} />
              
              {/* Production subcategories */}
              <Route path="/production/fermentation-scrap-log" element={<FermentationScrapLog />} />
              <Route path="/production/fermentation-log" element={<FermentationLog />} />
              <Route path="/production/fermentation-cooks" element={<FermentationCooks />} />
              <Route path="/production/fermenter-status" element={<FermenterStatus />} />
              <Route path="/production/fermentation-reports" element={<FermentationReports />} />
              <Route path="/production/new-distillation" element={<NewDistillation />} />
              <Route path="/production/distillation-log" element={<DistillationLog />} />
              <Route path="/production/distillation" element={<Distillation />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

