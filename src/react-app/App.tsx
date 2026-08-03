import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import NicosSmokehouse from "@/react-app/pages/NicosSmokehouse";
import NanaSans from "@/react-app/pages/NanaSans";
import RedRuby from "@/react-app/pages/RedRuby";
import OBeachIbiza from "@/react-app/pages/OBeachIbiza";
import OBeachIbiza1 from "@/react-app/pages/OBeachIbiza1";
import FinnsBeachParty from "@/react-app/pages/FinnsBeachParty";
import { CountryProvider } from "@/react-app/context/CountryContext";
import CountrySelector from "@/react-app/components/CountrySelector";

export default function App() {
  return (
    <CountryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nicossmokehouse" element={<NicosSmokehouse />} />
          <Route path="/nanasans" element={<NanaSans />} />
          <Route path="/redruby" element={<RedRuby />} />
          <Route path="/obeachibiza" element={<OBeachIbiza />} />
          <Route path="/obeachibiza1" element={<OBeachIbiza1 />} />
          <Route path="/finnsbeachparty" element={<FinnsBeachParty />} />
        </Routes>
      </Router>
      <CountrySelector />
    </CountryProvider>
  );
}
