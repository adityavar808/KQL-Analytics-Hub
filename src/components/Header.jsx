// src/components/Header.jsx

import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0f2027 0%, #2c5364 50%, #00c9ff 100%)",
        color: "#fff",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 0 },
        textAlign: "center",
        boxShadow: "0 6px 32px 0 rgba(44,62,80,0.12)",
        borderBottomLeftRadius: { xs: 0, md: 32 },
        borderBottomRightRadius: { xs: 0, md: 32 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background accent */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 320,
          opacity: 0.10,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fff 0%, #00c9ff 60%, transparent 100%)",
          zIndex: 0,
        }}
      />
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          letterSpacing: 1,
          zIndex: 1,
          position: "relative",
          fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
          mb: 1,
          textShadow: "0 3px 12px rgba(44,62,80,0.10)",
        }}
      >
        <span role="img" aria-label="chart" style={{ marginRight: 8 }}>📉📈</span>
        KQL Analytics Hub
      </Typography>
      
    </Box>
  );
}
