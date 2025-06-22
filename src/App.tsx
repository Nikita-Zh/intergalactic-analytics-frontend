import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AnalyticsPage } from "./pages/Analytics/AnalyticsPage";
import { MainLayout } from "./components/layouts/MainLayout/MainLayout";
import { HistoryPage } from "./pages/History/HistoryPage";
import { GeneratorPage } from "./pages/Generator/GeneratorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<AnalyticsPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
