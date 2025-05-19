import { createContext } from "react";

export const PageCategoryContext = createContext({
  category: "Dashboard",
  setCategory: () => {},
});
