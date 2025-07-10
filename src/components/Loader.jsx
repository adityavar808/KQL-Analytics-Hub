import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader({ show }) {
  return (
    <Backdrop open={show} sx={{ zIndex: 9999, color: "#667eea" }}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
}
