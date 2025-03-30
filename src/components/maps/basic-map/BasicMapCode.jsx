import React, { useState } from "react";
import CodePreview from "../../shared/CodePreview";
import { Stack } from "@mui/material";

const BasicMapCode = () => {
  const [languageDemo, setLanguageDemo] = useState(`<html>
<!-- Hello World in HTML -->
<head>
  <title>Hello World!</title>
</head>
<body>
  Hello World!
</body>
</html>`);

  const cssDemo = `.map {
  width: 100%;
  height: 400px;
}`;

  const jsDemno = `
  import React, { useState, useEffect } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import prettier from "prettier/standalone";
import { Button, Stack, Typography } from "@mui/material";

// Load Prettier plugins once outside the component
const loadPrettierPlugins = async () => {
  const plugins = {
    babel: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/babel.mjs"
    ).then((module) => module.default),
    estree: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/estree.mjs"
    ).then((module) => module.default),
    html: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/html.mjs"
    ).then((module) => module.default),
    postcss: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/postcss.mjs"
    ).then((module) => module.default),
    typescript: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/typescript.mjs"
    ).then((module) => module.default),
    markdown: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/markdown.mjs"
    ).then((module) => module.default),
    graphql: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/graphql.mjs"
    ).then((module) => module.default),
    yaml: await import(
      "https://unpkg.com/prettier@3.5.3/plugins/yaml.mjs"
    ).then((module) => module.default),
  };
  return plugins;
};

// Store loaded plugins globally
let prettierPlugins = null;
loadPrettierPlugins()
  .then((plugins) => {
    prettierPlugins = plugins;
  })
  .catch((error) => console.error("Failed to load Prettier plugins:", error));

// Map languages to Prettier parsers and simulate file extensions
const getParserOptions = (language) => {
  const languageToParser = {
    javascript: { parser: "babel", ext: ".js" },
    jsx: { parser: "babel", ext: ".jsx" },
    html: { parser: "html", ext: ".html" },
    css: { parser: "css", ext: ".css" }, // Explicitly use "css" parser
    scss: { parser: "scss", ext: ".scss" },
    less: { parser: "less", ext: ".less" },
    typescript: { parser: "typescript", ext: ".ts" },
    tsx: { parser: "typescript", ext: ".tsx" },
    markdown: { parser: "markdown", ext: ".md" },
    graphql: { parser: "graphql", ext: ".graphql" },
    yaml: { parser: "yaml", ext: ".yaml" },
    json: { parser: "json", ext: ".json" },
    json5: { parser: "json5", ext: ".json5" },
  };

  return (
    languageToParser[language] || { parser: language, ext: \`.\${language}\`}
  );
};

const formatCode = async (code, language) => {
  if (!prettierPlugins) {
    prettierPlugins = await loadPrettierPlugins();
  }

  const { parser, ext } = getParserOptions(language);

  try {
    const formatted = await prettier.format(code, {
      arrowParens: "always",
      bracketSameLine: false,
      bracketSpacing: true,
      semi: true,
      experimentalTernaries: false,
      singleQuote: false,
      jsxSingleQuote: false,
      quoteProps: "as-needed",
      trailingComma: "all",
      singleAttributePerLine: false,
      htmlWhitespaceSensitivity: "css",
      vueIndentScriptAndStyle: false,
      proseWrap: "preserve",
      insertPragma: false,
      printWidth: 80,
      requirePragma: false,
      tabWidth: 20,
      useTabs: true,
      embeddedLanguageFormatting: "auto",
      parser: parser,
      plugins: Object.values(prettierPlugins),
      // Simulate --stdin-filepath for parser inference
      filepath: \`example$\{ext}\`,
    });
    return formatted;
  } catch (error) {
    console.error("Prettier formatting error:", error);
    return code;
  }
};

const CodePreview = ({
  title,
  CodeBlockanguage = "html",
  code,
  showLineNumbers = true,
}) => {
  const [language] = useState(CodeBlockanguage);
  const [lineNumbers] = useState(showLineNumbers);
  const [formattedCode, setFormattedCode] = useState(code);

  useEffect(() => {
    let mounted = true;
    const runFormat = async () => {
      const formatted = await formatCode(code, language);
      if (mounted) {
        setFormattedCode(formatted);
      }
    };
    runFormat();
    return () => {
      mounted = false;
    };
  }, [code, language]);

  if (!code || typeof code !== "string") {
    return null;
  }

  return (
    <Stack height="100%" width="50%" mx="auto" justifyContent="center" p={2}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Stack
        width="100%"
        height="100%"
        direction="row"
        justifyContent="center"
        sx={{
          position: "relative",
          marginBottom: 2,
          "&>span": {
            width: "100%",
          },
        }}
      >
        <Button
          sx={{
            p: 0,
            top: 10,
            right: "3.5%",
            position: "absolute",
            zIndex: 1,
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          onClick={() => {
            navigator.clipboard.writeText(formattedCode);
            console.log("Code copied to clipboard!");
          }}
        >
          Copy
        </Button>
        <CodeBlock
          language={language}
          text={formattedCode}
          showLineNumbers={lineNumbers}
          theme={dracula}
          wrapLines={true}
        />
      </Stack>
    </Stack>
  );
};

export default CodePreview;

  `;
  const [lineNumbers, setLineNumbers] = useState(true);

  return (
    <Stack height={"100%"} width={"60%"} mx="auto">
      <CodePreview title="JSX Demo" code={jsDemno} CodeBlockanguage="jsx" />
    </Stack>
  );
};

export default BasicMapCode;
