import "./App.css";

import { GlobalStateProvider } from "./GlobalProvider";
import Route from "./Route";
function App() {
  return <GlobalStateProvider>
    <Route/>
  </GlobalStateProvider>;
}

export default App;
