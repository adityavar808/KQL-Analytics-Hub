// src/components/DataTable.jsx

import React, { forwardRef } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Checkbox, Box, Typography, TablePagination, FormGroup, FormControlLabel
} from "@mui/material";

const PAGE_SIZE = 5;

const DataTable = forwardRef(({
  data, columns, selectedColumns, setSelectedColumns, page, setPage
}, ref) => {
  if (!columns.length) {
    return (
      <Typography sx={{ color: "#6c757d", textAlign: "center", py: 4 }}>
        No data to display. Execute a report to see results.
      </Typography>
    );
  }

  const handleColumnChange = (col) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter(c => c !== col));
    } else {
      // Insert the column back at its original position
      const colIndex = columns.indexOf(col);
      const updated = [...selectedColumns];
      updated.splice(colIndex, 0, col);
      setSelectedColumns(updated);
    }
  };

  const paginatedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Helper to safely render any cell value (handles objects/arrays)
  const renderCellValue = (value) => {
    if (typeof value === "object" && value !== null) {
      try {
        return JSON.stringify(value);
      } catch {
        return "";
      }
    }
    return value ?? "";
  };

  // Always render columns in the original order, showing only selected ones
  const visibleColumns = columns.filter(col => selectedColumns.includes(col));

  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormGroup row>
          {columns.map(col => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={selectedColumns.includes(col)}
                  onChange={() => handleColumnChange(col)}
                  size="small"
                />
              }
              label={col}
            />
          ))}
        </FormGroup>
      </Box>
      <TableContainer
        sx={{
          border: "1px solid #e0e6ed",
          borderRadius: 2,
          boxShadow: "0 4px 24px rgba(44,62,80,0.08)",
          mb: 2,
          width: "100%",
          minWidth: "0",
          maxWidth: "100%",
          overflowX: "auto", // Enables horizontal scroll INSIDE the table container
        }}
      >
        <Table
          size="small"
          ref={ref}
          sx={{
            tableLayout: "auto",
            minWidth: "max-content", // Table grows as needed, but scroll stays inside container
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              {visibleColumns.map(col => (
                <TableCell
                  key={col}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "#f3f5fa",
                    whiteSpace: "nowrap",
                    minWidth: 120
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow key={idx}>
                {visibleColumns.map(col => (
                  <TableCell
                    key={col}
                    sx={{
                      whiteSpace: "nowrap",
                      maxWidth: 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {renderCellValue(row[col])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
      />
    </Box>
  );
});

export default DataTable;
