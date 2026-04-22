

import { RouterProvider } from "react-router";
import { appRouter } from "./routes/router";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
