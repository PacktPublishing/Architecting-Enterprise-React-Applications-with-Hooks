import { bootstrap } from "@theme-ui/presets";

const container = {
  px: "0.75rem",
};
const layout = {
  container,
  sm: { ...container, maxWidth: "sm" },
  md: { ...container, maxWidth: "md" },
  lg: { ...container, maxWidth: "lg" },
  xl: { ...container, maxWidth: "xl" },
};

const theme = {
  ...bootstrap,
  layout,
};
export default theme;
