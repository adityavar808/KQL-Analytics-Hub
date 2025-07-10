// src/components/Controls.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { getTimeRange } from "../utils/timeUtils";

// Universal Export Logo SVG (green for Excel, yellow for CSV)
const ExportLogo = ({ color = "#21A366" }) => (
  <svg width={28} height={28} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="6" width="36" height="36" rx="6" fill={color}/>
    <rect x="14" y="14" width="20" height="20" rx="2" fill="#fff" opacity="0.9"/>
    <path d="M18.5 29L23 21H25L29.5 29H27.5L24.5 24.5L21.5 29H18.5Z" fill={color}/>
    <rect x="18" y="18" width="12" height="2" rx="1" fill={color}/>
  </svg>
);

// CSV export utility (all data, not just current page)
const exportToCSV = (data, columns) => {
  if (!data || data.length === 0) return;
  const csvRows = [];
  csvRows.push(columns.join(","));
  data.forEach((row) => {
    const values = columns.map((col) => {
      const value =
        typeof row[col] === "object" && row[col] !== null
          ? JSON.stringify(row[col])
          : row[col];
      const escaped = ("" + (value ?? "")).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  });
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "KQL_Report.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// Excel export utility (all data, not just current page, with bold headers)
const exportAllToExcel = async (data, columns) => {
  if (!data || data.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Report");

  // Add header row
  const headerRow = worksheet.addRow(columns);

  // Make header bold and style
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEFEFEF" }
    };
    cell.border = {
      bottom: { style: "thin", color: { argb: "FFCCCCCC" } }
    };
  });

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(
      columns.map((col) =>
        typeof row[col] === "object" && row[col] !== null
          ? JSON.stringify(row[col])
          : row[col]
      )
    );
  });

  // Auto-width columns
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellLength = cell.value ? cell.value.toString().length : 0;
      if (cellLength > maxLength) maxLength = cellLength;
    });
    column.width = maxLength + 2;
  });

  // Freeze header row
  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  // Save file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer], { type: "application/octet-stream" }), "KQL_Report.xlsx");
};

const ranges = [
  { value: "30m", label: "Last 30 minutes" },
  { value: "1h", label: "Last hour" },
  { value: "4h", label: "Last 4 hours" },
  { value: "12h", label: "Last 12 hours" },
  { value: "24h", label: "Last 24 hours" },
  { value: "48h", label: "Last 48 hours" },
  { value: "3d", label: "Last 3 days" },
  { value: "7d", label: "Last 7 days" },
  { value: "custom", label: "Custom" },
];

export default function Controls({
  onExecute,
  data,
  columns,
  selectedColumns,
  tableRef,
  defaultRange = "1h",
}) {
  const [range, setRange] = useState(defaultRange);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // Auto-fetch data on mount with default time range
  useEffect(() => {
    const timeRange = getTimeRange(range, customStart, customEnd);
    onExecute(timeRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-fetch data when time range changes
  useEffect(() => {
    if (range !== "custom") {
      const timeRange = getTimeRange(range, customStart, customEnd);
      onExecute(timeRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  // Auto-fetch data when custom date changes (if custom selected)
  useEffect(() => {
    if (range === "custom" && customStart && customEnd) {
      const timeRange = getTimeRange(range, customStart, customEnd);
      onExecute(timeRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customStart, customEnd]);

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: "#f4f6fb",
        borderBottom: "1px solid #e0e6ed",
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left side: Time range and custom date controls */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, alignItems: "center" }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={range}
            label="Time Range"
            onChange={(e) => setRange(e.target.value)}
          >
            {ranges.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {range === "custom" && (
          <>
            <TextField
              label="Start"
              type="datetime-local"
              size="small"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End"
              type="datetime-local"
              size="small"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
      </Box>
      {/* Right side: Icon-based stylish export buttons with the same logo */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Tooltip title="Export as Excel" arrow>
          <IconButton
            onClick={() => exportAllToExcel(data, selectedColumns)}
            sx={{
              background: "linear-gradient(135deg, #1D6F42 0%, #21A366 100%)",
              color: "#fff",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(44,62,80,0.13)",
              p: 1.2,
              transition: "background 0.2s, box-shadow 0.2s",
              "&:hover": {
                background: "linear-gradient(135deg, #15723A 0%, #1D6F42 100%)",
                boxShadow: "0 4px 16px rgba(44,62,80,0.18)",
              }
            }}
            size="large"
          >
            <ExportLogo color="#21A366" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Export as CSV" arrow>
          <IconButton
            onClick={() => exportToCSV(data, selectedColumns)}
            sx={{
              background: "linear-gradient(135deg, #FFD600 0%, #FFEA00 100%)",
              color: "#fff",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(44,62,80,0.13)",
              p: 1.2,
              transition: "background 0.2s, box-shadow 0.2s",
              "&:hover": {
                background: "linear-gradient(135deg, #FFB300 0%, #FFD600 100%)",
                boxShadow: "0 4px 16px rgba(44,62,80,0.18)",
              }
            }}
            size="large"
          >
            <ExportLogo color="#FFD600" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
