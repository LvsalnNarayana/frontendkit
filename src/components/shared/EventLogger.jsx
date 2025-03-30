import { Stack, Typography, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import emitter from "../../utils/EventEmitter";

const EventLogger = () => {
  const [logs, setLogs] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const logContainerRef = useRef(null);

  useEffect(() => {
    const handleLogMessage = (message) => {
      setLogs((prevLogs) => [...prevLogs, message]);
    };

    emitter.on("log", handleLogMessage);
    setIsListening(true);

    return () => {
      emitter.off("log", handleLogMessage);
    };
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Function to clear logs
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Stack width="100%" height="100%" flexGrow={1} gap={1}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontSize={18} fontWeight={500}>
          Event Logger
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={clearLogs}
        >
          Clear Logs
        </Button>
      </Stack>

      {/* Logs Container */}
      <Stack
        ref={logContainerRef}
        width="100%"
        flexGrow={1}
        sx={{
          backgroundColor: "#222222",
          color: "#fff",
          height: "80%",
          padding: 1,
          overflowY: "auto",
          borderRadius: "4px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {isListening && logs.length === 0 && (
          <Typography
            className="code"
            sx={{ flexShrink: 0 }}
            variant="body1"
            fontSize={12}
          >
            Started listening to events...
          </Typography>
        )}
        {logs.map((log, index) => (
          <Typography
            className="code"
            key={index}
            variant="body1"
            fontSize={12}
            sx={{
              flexShrink: 0,
              display: "block",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {log}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default EventLogger;
