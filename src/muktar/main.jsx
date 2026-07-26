import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MuktarCard from "./MuktarCard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MuktarCard />
  </StrictMode>
);
