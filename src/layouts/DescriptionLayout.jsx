import {
  Divider,
  Stack,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const DescriptionLayout = ({ markdown, maxWidth }) => {
  const headings = [];
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");

  markdown.split("\n").forEach((line) => {
    const headingMatch = line.match(/^(#+)\s+(.+?)\s*\[id="([^"]+)"\]\s*$/);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = headingMatch[3];
      headings.push({ level, text, id });
    }
  });

  const extractIdAndText = (children) => {
    let text = "";
    let id = "";

    const flattenChildren = (child) => {
      if (typeof child === "string") return child;
      if (Array.isArray(child)) return child.map(flattenChildren).join("");
      if (React.isValidElement(child))
        return flattenChildren(child.props.children);
      return "";
    };

    const childString = flattenChildren(children);
    const match = childString.match(/(.+?)\s*\[id="([^"]+)"\]/);
    if (match) {
      text = match[1].trim();
      id = match[2];
    } else {
      text = childString.trim();
    }

    return { text, id };
  };

  const components = {
    h1: ({ node, children, ...props }) => {
      const { text, id } = extractIdAndText(children);
      return (
        <>
          <h1
            id={id || ""}
            style={{
              display: "block",
              width: "100%",
              marginTop: "32px",
              marginBottom: "24px",
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#1A237E",
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              transition: "color 0.3s ease",
            }}
            {...props}
          >
            {text}
          </h1>
          <Divider sx={{ marginBottom: "24px", borderColor: "#E0E0E0" }} />
        </>
      );
    },
    h2: ({ node, children, ...props }) => {
      const { text, id } = extractIdAndText(children);
      return (
        <>
          <h2
            id={id || ""}
            style={{
              display: "block",
              width: "100%",
              marginTop: "28px",
              marginBottom: "20px",
              fontSize: "1.75rem",
              fontWeight: 600,
              lineHeight: 1.3,
              color: "#3F51B5",
              transition: "color 0.3s ease",
            }}
            {...props}
          >
            {text}
          </h2>
          <Divider sx={{ marginBottom: "20px", borderColor: "#EEEEEE" }} />
        </>
      );
    },
    h3: ({ node, children, ...props }) => {
      const { text, id } = extractIdAndText(children);
      return (
        <h3
          id={id || ""}
          style={{
            display: "block",
            width: "100%",
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "1.25rem",
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#5C6BC0",
            transition: "color 0.3s ease",
          }}
          {...props}
        >
          {text}
        </h3>
      );
    },
    p: ({ node, ...props }) => (
      <p
        style={{
          display: "block",
          width: "100%",
          marginTop: "0",
          marginBottom: "16px",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.6,
          color: "#212121",
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li
        style={{
          display: "block",
          width: "100%",
          marginBottom: "8px",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.6,
          color: "#424242",
          whiteSpace: "normal",
        }}
        {...props}
      />
    ),
  };

  const handleSectionClick = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      const offset = 120;
      const elementPosition = element.offsetTop;
      contentRef.current.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;

    const observerOptions = {
      root: contentRef.current,
      rootMargin: "-80px 0px -20% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
      sx={{
        width: "100%",
        maxWidth: maxWidth || "1200px",
        mx: "auto",
        height: "100%",
      }}
    >
      {/* Table of Contents Sidebar */}
      <Box
        sx={{
          width: "25%",
          position: "sticky",
          top: "20px",
          maxHeight: "100%",
          overflowY: "auto",
          pr: 2,
          borderRight: "1px solid #E0E0E0",
          bgcolor: "#FAFAFA",
        }}
      >
        <List component="nav">
          {headings.map((heading, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleSectionClick(heading.id)}
              sx={{
                pl: (heading.level - 1) * 2,
                py: 0.5,
                borderRadius: "4px",
                backgroundColor:
                  activeSection === heading.id ? "#E8EAF6" : "transparent",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                  "& .MuiListItemText-primary": { color: "#3F51B5" },
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemText
                primary={heading.text}
                primaryTypographyProps={{
                  fontSize:
                    heading.level === 1
                      ? "1.1rem"
                      : heading.level === 2
                        ? "1rem"
                        : "0.9rem",
                  fontWeight: heading.level === 1 ? 600 : 400,
                  color: activeSection === heading.id ? "#1A237E" : "#616161",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Stack
        ref={contentRef}
        sx={{
          width: "75%",
          pl: 3,
          overflowY: "auto",
          maxHeight: "100%",
          height: "100%",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#B0BEC5",
            borderRadius: "4px",
          },
        }}
        padding={2}
      >
        <Markdown remarkPlugins={[remarkBreaks]} components={components}>
          {markdown}
        </Markdown>
      </Stack>
    </Stack>
  );
};

export default DescriptionLayout;
