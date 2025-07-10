// src/App.jsx

import { useState, useEffect, useRef } from "react";
import { Container, Box, Paper } from "@mui/material";
import Header from "./components/Header";
import Controls from "./components/Controls";
import DataTable from "./components/DataTable";
import Loader from "./components/Loader";
import SnackbarAlert from "./components/SnackbarAlert";
import { executeReport } from "./api/reportApi";
import { getTimeRange } from "./utils/timeUtils";

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ open: false, message: "", type: "success" });
  const [page, setPage] = useState(0);

  const tableRef = useRef(null);

  // Default time range value
  const DEFAULT_RANGE = "1h";
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // Fetch data from API
  const handleExecute = async (timeRange) => {
    setLoading(true);
    setStatus({ open: true, message: "Loading data...", type: "success" });
    try {
      const response = await executeReport(timeRange);
      // Use response.results or response.products depending on your API
      const results = response.results || response.products || [];
      if (!results.length) {
        setData([]);
        setColumns([]);
        setSelectedColumns([]);
        setStatus({ open: true, message: "No data to display.", type: "error" });
      } else {
        setData(results);
        const cols = Object.keys(results[0] || {});
        setColumns(cols);
        setSelectedColumns(cols);
        setStatus({ open: true, message: "Data loaded successfully!", type: "success" });
      }
      setPage(0);
    } catch (err) {
      setData([]);
      setColumns([]);
      setSelectedColumns([]);
      setStatus({ open: true, message: "Error loading data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Auto-load data on mount and whenever time range changes
  useEffect(() => {
    const timeRange = getTimeRange(range, customStart, customEnd);
    handleExecute(timeRange);
  }, [range, customStart, customEnd]);

  return (
    <Box sx={{ bgcolor: "#f4f6fb", minHeight: "100vh" }}>
      <Container
        maxWidth={false}
        sx={{
          py: 4,
          px: 4,
          width: "98vw",
          maxWidth: "1800px",
          margin: "0 auto"
        }}
      >
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Header />
          <Controls
            onExecute={handleExecute}
            range={range}
            setRange={setRange}
            customStart={customStart}
            setCustomStart={setCustomStart}
            customEnd={customEnd}
            setCustomEnd={setCustomEnd}
            data={data}
            columns={columns}
            selectedColumns={selectedColumns}
            tableRef={tableRef}
          />
          <Box sx={{ p: 3 }}>
            <DataTable
              data={data}
              columns={columns}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
              page={page}
              setPage={setPage}
              ref={tableRef}
            />
          </Box>
        </Paper>
        <Loader show={loading} />
        <SnackbarAlert
          open={status.open}
          message={status.message}
          type={status.type}
          onClose={() => setStatus({ ...status, open: false })}
        />
      </Container>
    </Box>
  );
}

export default App;
