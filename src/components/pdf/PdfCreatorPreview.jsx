import React, { useMemo, useState } from "react";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Stack, TextField, Typography, Button } from "@mui/material";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    position: "relative",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2c3e50",
  },
  subheader: {
    fontSize: 14,
    marginBottom: 5,
    color: "#34495e",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottom: "1pt solid #34495e",
    color: "#2c3e50",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  contact: {
    fontSize: 10,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 10,
  },
  watermark: {
    position: "absolute",
    fontSize: 50,
    color: "rgba(128, 128, 128, 0.2)",
    transform: "rotate(-45deg)",
    top: 0,
    left: 0,
    transformOrigin: "center",
    textAlign: "center",
    width: "100%",
    pointerEvents: "none",
  },
});

const PdfCreatorPreview = () => {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    education: "B.Sc. Computer Science, XYZ University, 2018-2022",
    experience:
      "Software Engineer, ABC Corp, 2022-Present\n- Developed web applications\n- Improved performance by 20%",
    skills: "JavaScript, React, Node.js, Python",
  });

  const [pdfData, setPdfData] = useState(null);

  const handleChange = (field) => (event) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleConvert = () => {
    setPdfData({ ...resumeData });
  };

  // Memoize the PDFViewer JSX to prevent re-renders unless pdfData changes
  const memoizedPdfViewer = useMemo(() => {
    return (
      <PDFViewer
        showToolbar={false}
        style={{
          padding: 20,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      >
        <Document>
          {/* Page 1: Resume */}
          <Page size="A4" style={styles.page}>
            {/* Uncomment if watermark is needed */}
            {/* <Text style={styles.watermark}>DRAFT</Text> */}
            {pdfData ? (
              <>
                <Text style={styles.header}>{pdfData.name}</Text>
                <Text style={styles.contact}>
                  {pdfData.email} | {pdfData.phone}
                </Text>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  <Text style={styles.text}>{pdfData.education}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  <Text style={styles.text}>{pdfData.experience}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <Text style={styles.text}>{pdfData.skills}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.header}>Click "Convert" to generate PDF</Text>
            )}
          </Page>

          {/* Page 2: Sample (only if PDF is generated) */}
          {pdfData && (
            <Page size="A4" style={styles.page}>
              {/* Uncomment if watermark is needed */}
              {/* <Text style={styles.watermark}>DRAFT</Text> */}
              <Text style={styles.header}>
                This is a Sample for multipage pdf document
              </Text>
            </Page>
          )}
        </Document>
      </PDFViewer>
    );
  }, [pdfData]); // Re-run only when pdfData changes

  return (
    <Stack
      direction="row"
      width="100%"
      height="100vh"
      spacing={2}
      sx={{ overflow: "hidden" }}
    >
      {/* Input Fields Section */}
      <Stack
        sx={{
          width: "30%",
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Resume Editor
        </Typography>
        <TextField
          label="Full Name"
          value={resumeData.name}
          onChange={handleChange("name")}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          value={resumeData.email}
          onChange={handleChange("email")}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Phone"
          value={resumeData.phone}
          onChange={handleChange("phone")}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Education"
          value={resumeData.education}
          onChange={handleChange("education")}
          fullWidth
          multiline
          rows={2}
          margin="dense"
        />
        <TextField
          label="Experience"
          value={resumeData.experience}
          onChange={handleChange("experience")}
          fullWidth
          multiline
          rows={4}
          margin="dense"
        />
        <TextField
          label="Skills"
          value={resumeData.skills}
          onChange={handleChange("skills")}
          fullWidth
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          sx={{ marginTop: 2 }}
        >
          Convert to PDF
        </Button>
      </Stack>

      {/* PDF Viewer Section */}
      <Stack
        sx={{
          width: "70%",
          height: "100%",
        }}
      >
        {memoizedPdfViewer}
      </Stack>
    </Stack>
  );
};

export default PdfCreatorPreview;
