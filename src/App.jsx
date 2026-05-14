import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { PetProvider } from "@/context/PetContext";
import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";
import Home from "@/pages/Home";
import PetHistory from "@/pages/PetHistory";
import PetSettings from "@/pages/PetSettings";

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <PetProvider>
        <Router>
          <Routes>
            <Route element={<AppLayoutWrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<PetHistory />} />
              <Route path="/settings" element={<PetSettings />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </PetProvider>
    </QueryClientProvider>
  );
}

export default App;
