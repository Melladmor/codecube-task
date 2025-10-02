import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { ToasterProvider } from "./context/ToasterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ToasterProvider>
    <RouterProvider router={router} />
  </ToasterProvider>
);
