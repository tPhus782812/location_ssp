import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductFinder from "./pages/ProductFinder/ProductFinder";
import Shipment from "./pages/Shipment/Shipment";
import PutAway from "./pages/PutAway/PutAway";
import Inventory from "./pages/Inventory/Inventory";
import Settings from "./pages/Settings/Settings";
import DataCenter from "./pages/DataCenter/DataCenter";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/finder" element={<ProductFinder />} />
                    <Route path="/shipment" element={<Shipment />} />
                    <Route path="/putaway" element={<PutAway />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/data-center"element={<DataCenter />}/>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;