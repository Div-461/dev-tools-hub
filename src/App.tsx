import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const Index = lazy(() => import("./pages/Index"));
const JsonViewer = lazy(() => import("./pages/JsonViewer"));
const JsonToCsv = lazy(() => import("./pages/JsonToCsv"));
const CsvToJson = lazy(() => import("./pages/CsvToJson"));
const XmlFormatter = lazy(() => import("./pages/XmlFormatter"));
const Base64Tool = lazy(() => import("./pages/Base64Tool"));
const TimestampConverter = lazy(() => import("./pages/TimestampConverter"));
const JwtDecoder = lazy(() => import("./pages/JwtDecoder"));
const SqlFormatter = lazy(() => import("./pages/SqlFormatter"));
const TextCompare = lazy(() => import("./pages/TextCompare"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Loading = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <ThemeProvider>
  <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/json-viewer" element={<JsonViewer />} />
                  <Route path="/json-to-csv" element={<JsonToCsv />} />
                  <Route path="/csv-to-json" element={<CsvToJson />} />
                  <Route path="/xml-formatter" element={<XmlFormatter />} />
                  <Route path="/base64" element={<Base64Tool />} />
                  <Route path="/timestamp" element={<TimestampConverter />} />
                  <Route path="/jwt-decoder" element={<JwtDecoder />} />
                  <Route path="/sql-formatter" element={<SqlFormatter />} />
                  <Route path="/text-compare" element={<TextCompare />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
  </HelmetProvider>
  </ThemeProvider>
);

export default App;
