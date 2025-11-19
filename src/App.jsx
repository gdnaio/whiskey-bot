import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Home from './pages/Home'

// Main category pages
import RawMaterials from './pages/RawMaterials'
import Calculator from './pages/Calculator'

// Settings pages
import DSPSettingsAndInfo from './pages/Settings/DSPSettingsAndInfo'
import WhiskeyKinds from './pages/Settings/WhiskeyKinds'
import TTBMaterialKinds from './pages/Settings/TTBMaterialKinds'
import BaseTaxRates from './pages/Settings/BaseTaxRates'
import SettingsRawMaterials from './pages/Settings/RawMaterials'
import InternalSpiritTypes from './pages/Settings/InternalSpiritTypes'
import MashBills from './pages/Settings/MashBills'
import Recipes from './pages/Settings/Recipes'
import ProductLines from './pages/Settings/ProductLines'
import ProductMasters from './pages/Settings/ProductMasters'
import MixedProductMasters from './pages/Settings/MixedProductMasters'
import Fermenters from './pages/Settings/Fermenters'
import SettingsTanks from './pages/Settings/Tanks'
import Vendors from './pages/Settings/Vendors'
import Customers from './pages/Settings/Customers'
import Contacts from './pages/Settings/Contacts'
import DSPs from './pages/Settings/DSPs'
import Owners from './pages/Settings/Owners'
import LinkedDistilleries from './pages/Settings/LinkedDistilleries'
import Rackhouses from './pages/Settings/Rackhouses'
import Warehouses from './pages/Settings/Warehouses'
import StartingTanks from './pages/Settings/StartingTanks'
import StartingFinishedGoods from './pages/Settings/StartingFinishedGoods'
import StartingRawMaterials from './pages/Settings/StartingRawMaterials'
import StartingOnsiteBarrels from './pages/Settings/StartingOnsiteBarrels'
import StartingOffsiteBarrels from './pages/Settings/StartingOffsiteBarrels'

// Administrator pages
import DeleteTransactions from './pages/Administrator/DeleteTransactions'
import QuickBooksExport from './pages/Administrator/QuickBooksExport'
import ManageUsers from './pages/Administrator/ManageUsers'

// Logs and Reports pages
import TTBProductionReports from './pages/LogsAndReports/TTBProductionReports'
import TTBStorageReports from './pages/LogsAndReports/TTBStorageReports'
import TTBProcessingReports from './pages/LogsAndReports/TTBProcessingReports'
import TTBReportsChecker from './pages/LogsAndReports/TTBReportsChecker'
import ExciseTaxScheduleReturns from './pages/LogsAndReports/ExciseTaxScheduleReturns'
import WSPayGovChromeExtension from './pages/LogsAndReports/WSPayGovChromeExtension'
import WhiskeySystemLogs from './pages/LogsAndReports/WhiskeySystemLogs'
import DailyLogs from './pages/LogsAndReports/DailyLogs'

// Tanks pages
import TankStatus from './pages/Tanks/TankStatus'
import TankMoveLog from './pages/Tanks/TankMoveLog'
import FilteringLog from './pages/Tanks/FilteringLog'
import AdjustmentLog from './pages/Tanks/AdjustmentLog'
import RecordsOfDestruction from './pages/Tanks/RecordsOfDestruction'

// Finished Products pages
import FinishedGoodsInventory from './pages/FinishedProducts/FinishedGoodsInventory'
import NewFinishedGoodsTransfers from './pages/FinishedProducts/NewFinishedGoodsTransfers'
import FinishedGoodsTransfersLogs from './pages/FinishedProducts/FinishedGoodsTransfersLogs'
import NewSalesOrder from './pages/FinishedProducts/NewSalesOrder'
import SalesOrderLog from './pages/FinishedProducts/SalesOrderLog'
import InvoiceLog from './pages/FinishedProducts/InvoiceLog'
import PriceLists from './pages/FinishedProducts/PriceLists'

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
import NewFermentation from './pages/Production/NewFermentation'
import FermentationLog from './pages/Production/FermentationLog'
import FermenterStatus from './pages/Production/FermenterStatus'
import FermMoveLog from './pages/Production/FermMoveLog'
import FermentationScrapLog from './pages/Production/FermentationScrapLog'
import NewDistillation from './pages/Production/NewDistillation'
import DistillationLog from './pages/Production/DistillationLog'

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
              <Route path="/calculator" element={<Calculator />} />
              
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
              
              {/* Finished Products subcategories */}
              <Route path="/finished-products/finished-goods-inventory" element={<FinishedGoodsInventory />} />
              <Route path="/finished-products/new-finished-goods-transfers" element={<NewFinishedGoodsTransfers />} />
              <Route path="/finished-products/finished-goods-transfers-logs" element={<FinishedGoodsTransfersLogs />} />
              <Route path="/finished-products/new-sales-order" element={<NewSalesOrder />} />
              <Route path="/finished-products/sales-order-log" element={<SalesOrderLog />} />
              <Route path="/finished-products/invoice-log" element={<InvoiceLog />} />
              <Route path="/finished-products/price-lists" element={<PriceLists />} />
              
              {/* Tanks subcategories */}
              <Route path="/tanks/tank-status" element={<TankStatus />} />
              <Route path="/tanks/tank-move-log" element={<TankMoveLog />} />
              <Route path="/tanks/filtering-log" element={<FilteringLog />} />
              <Route path="/tanks/adjustment-log" element={<AdjustmentLog />} />
              <Route path="/tanks/records-of-destruction" element={<RecordsOfDestruction />} />
              
              {/* Logs and Reports subcategories */}
              <Route path="/logs-and-reports/ttb-production-reports" element={<TTBProductionReports />} />
              <Route path="/logs-and-reports/ttb-storage-reports" element={<TTBStorageReports />} />
              <Route path="/logs-and-reports/ttb-processing-reports" element={<TTBProcessingReports />} />
              <Route path="/logs-and-reports/ttb-reports-checker" element={<TTBReportsChecker />} />
              <Route path="/logs-and-reports/excise-tax-schedule-returns" element={<ExciseTaxScheduleReturns />} />
              <Route path="/logs-and-reports/ws-pay-gov-chrome-extension" element={<WSPayGovChromeExtension />} />
              <Route path="/logs-and-reports/whiskey-system-logs" element={<WhiskeySystemLogs />} />
              <Route path="/logs-and-reports/daily-logs" element={<DailyLogs />} />
              
              {/* Administrator subcategories */}
              <Route path="/administrator/delete-transactions" element={<DeleteTransactions />} />
              <Route path="/administrator/quickbooks-export" element={<QuickBooksExport />} />
              <Route path="/administrator/manage-users" element={<ManageUsers />} />
              
              {/* Settings subcategories */}
              <Route path="/settings/dsp-settings-and-info" element={<DSPSettingsAndInfo />} />
              <Route path="/settings/whiskey-kinds" element={<WhiskeyKinds />} />
              <Route path="/settings/ttb-material-kinds" element={<TTBMaterialKinds />} />
              <Route path="/settings/base-tax-rates" element={<BaseTaxRates />} />
              <Route path="/settings/raw-materials" element={<SettingsRawMaterials />} />
              <Route path="/settings/internal-spirit-types" element={<InternalSpiritTypes />} />
              <Route path="/settings/mash-bills" element={<MashBills />} />
              <Route path="/settings/recipes" element={<Recipes />} />
              <Route path="/settings/product-lines" element={<ProductLines />} />
              <Route path="/settings/product-masters" element={<ProductMasters />} />
              <Route path="/settings/mixed-product-masters" element={<MixedProductMasters />} />
              <Route path="/settings/fermenters" element={<Fermenters />} />
              <Route path="/settings/tanks" element={<SettingsTanks />} />
              <Route path="/settings/vendors" element={<Vendors />} />
              <Route path="/settings/customers" element={<Customers />} />
              <Route path="/settings/contacts" element={<Contacts />} />
              <Route path="/settings/dsps" element={<DSPs />} />
              <Route path="/settings/owners" element={<Owners />} />
              <Route path="/settings/linked-distilleries" element={<LinkedDistilleries />} />
              <Route path="/settings/rackhouses" element={<Rackhouses />} />
              <Route path="/settings/warehouses" element={<Warehouses />} />
              <Route path="/settings/starting-tanks" element={<StartingTanks />} />
              <Route path="/settings/starting-finished-goods" element={<StartingFinishedGoods />} />
              <Route path="/settings/starting-raw-materials" element={<StartingRawMaterials />} />
              <Route path="/settings/starting-onsite-barrels" element={<StartingOnsiteBarrels />} />
              <Route path="/settings/starting-offsite-barrels" element={<StartingOffsiteBarrels />} />
              
              {/* Production subcategories */}
              <Route path="/production/new-fermentation" element={<NewFermentation />} />
              <Route path="/production/fermentation-log" element={<FermentationLog />} />
              <Route path="/production/fermenter-status" element={<FermenterStatus />} />
              <Route path="/production/ferm-move-log" element={<FermMoveLog />} />
              <Route path="/production/fermentation-scrap-log" element={<FermentationScrapLog />} />
              <Route path="/production/new-distillation" element={<NewDistillation />} />
              <Route path="/production/distillation-log" element={<DistillationLog />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

