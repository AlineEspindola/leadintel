import { LeadProvider } from "./contexts/LeadContext";
import { Header } from "./components/layout/Header/Header";
import { SearchPage } from "./pages/SearchPage";
import { useViewMode } from "./hooks/useViewMode";

export default function App() {
  const [viewMode, setViewMode] = useViewMode();

  return (
    <LeadProvider>
      <div className="min-h-screen bg-surface-base">
        <Header viewMode={viewMode} onModeChange={setViewMode} />
        <SearchPage viewMode={viewMode} />
      </div>
    </LeadProvider>
  );
}
