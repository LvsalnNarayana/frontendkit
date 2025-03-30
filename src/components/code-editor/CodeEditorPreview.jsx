import React, { useState, useRef, useEffect } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import {
  Stack,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const CodeEditorPreview = () => {
  const [editorMode, setEditorMode] = useState("editor");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");
  const [originalLanguage, setOriginalLanguage] = useState("javascript");
  const [modifiedLanguage, setModifiedLanguage] = useState("javascript");
  const [readOnly, setReadOnly] = useState(false);
  const [wordWrap, setWordWrap] = useState("off");
  const [lineNumbers, setLineNumbers] = useState("on");
  const [minimap, setMinimap] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [bracketColorization, setBracketColorization] = useState(true);
  const [scrollbar, setScrollbar] = useState("auto");
  const [saveViewState, setSaveViewState] = useState(true);
  const [keepModel, setKeepModel] = useState(false);
  const [line, setLine] = useState(1);
  const [autoSave, setAutoSave] = useState(false);
  const [value, setValue] = useState("// Type your code here");
  const [originalValue, setOriginalValue] = useState("// Original Code");
  const [modifiedValue, setModifiedValue] = useState("// Modified Code");
  const [originalPath, setOriginalPath] = useState("original.js");
  const [modifiedPath, setModifiedPath] = useState("modified.js");

  // Store previous values using useRef
  const prevValuesRef = useRef({
    value: "// Type your code here",
    originalValue: "// Original Code",
    modifiedValue: "// Modified Code",
    originalPath: "original.js",
    modifiedPath: "modified.js",
  });

  // State to hold differences
  const [diffs, setDiffs] = useState({
    value: "",
    originalValue: "",
    modifiedValue: "",
    originalPath: "",
    modifiedPath: "",
  });

  // Update previous values and compute diffs on change
  useEffect(() => {
    const computeDiff = (prev, current) =>
      prev !== current ? `Prev: "${prev}" → Now: "${current}"` : "";
    setDiffs({
      value: computeDiff(prevValuesRef.current.value, value),
      originalValue: computeDiff(
        prevValuesRef.current.originalValue,
        originalValue
      ),
      modifiedValue: computeDiff(
        prevValuesRef.current.modifiedValue,
        modifiedValue
      ),
      originalPath: computeDiff(
        prevValuesRef.current.originalPath,
        originalPath
      ),
      modifiedPath: computeDiff(
        prevValuesRef.current.modifiedPath,
        modifiedPath
      ),
    });
    // Update previous values
    prevValuesRef.current = {
      value,
      originalValue,
      modifiedValue,
      originalPath,
      modifiedPath,
    };
  }, [value, originalValue, modifiedValue, originalPath, modifiedPath]);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    if (autoSave) {
      setTimeout(() => {
        console.log("Auto-saving:", newValue);
      }, 2000);
    }
  };

  const formControlSx = { fontSize: 14 };
  const menuItemSx = { fontSize: 14, minHeight: "auto" };

  return (
    <Stack
      width="100%"
      height="100%"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: 2,
        overflow: "hidden",
      }}
    >
      {/* Monaco Editor / Diff Editor */}
      <Stack sx={{ gridArea: "1 / 1 / 5 / 7", width: "100%", height: "100%" }}>
        {editorMode === "editor" ? (
          <Editor
            height="100%"
            value={value}
            language={language}
            theme={theme}
            path={originalPath}
            line={line}
            saveViewState={saveViewState}
            keepCurrentModel={keepModel}
            options={{
              readOnly,
              wordWrap,
              minimap: { enabled: minimap },
              lineNumbers,
              fontSize,
              bracketPairColorization: { enabled: bracketColorization },
              scrollBeyondLastLine: false,
              scrollbar: { vertical: scrollbar },
            }}
            onChange={handleEditorChange}
            beforeMount={(monaco) => console.log("Before Mount:", monaco)}
            onMount={(editor, monaco) => {
              console.log("Editor Mounted:", editor, monaco);
              editor.setPosition({ lineNumber: line, column: 1 });
              editor.revealLine(line);
            }}
          />
        ) : (
          <DiffEditor
            height="100%"
            original={originalValue}
            modified={modifiedValue}
            originalLanguage={originalLanguage}
            modifiedLanguage={modifiedLanguage}
            originalModelPath={originalPath}
            modifiedModelPath={modifiedPath}
            theme={theme}
            options={{
              readOnly,
              wordWrap,
              minimap: { enabled: minimap },
              fontSize,
              renderSideBySide: true,
            }}
          />
        )}
      </Stack>

      {/* Sidebar Controls */}
      <Stack
        sx={{
          gridArea: "1 / 7 / 5 / 9",
          width: "100%",
          height: "100%",
          overflow: "auto",
          p: 2,
          gap: 2,
        }}
      >
        {/* Theme Selector */}
        <FormControl size="small">
          <InputLabel sx={formControlSx}>Theme</InputLabel>
          <Select
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            sx={formControlSx}
          >
            <MenuItem value="light" sx={menuItemSx}>
              Light
            </MenuItem>
            <MenuItem value="vs-dark" sx={menuItemSx}>
              Dark
            </MenuItem>
          </Select>
        </FormControl>

        {/* Language Selector */}
        {editorMode === "editor" ? (
          <FormControl size="small">
            <InputLabel sx={formControlSx}>Language</InputLabel>
            <Select
              label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={formControlSx}
            >
              {[
                "javascript",
                "typescript",
                "python",
                "json",
                "html",
                "css",
              ].map((lang) => (
                <MenuItem key={lang} value={lang} sx={menuItemSx}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <FormControl size="small">
              <InputLabel sx={formControlSx}>Original Language</InputLabel>
              <Select
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                sx={formControlSx}
              >
                {[
                  "javascript",
                  "typescript",
                  "python",
                  "json",
                  "html",
                  "css",
                ].map((lang) => (
                  <MenuItem key={lang} value={lang} sx={menuItemSx}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel sx={formControlSx}>Modified Language</InputLabel>
              <Select
                value={modifiedLanguage}
                onChange={(e) => setModifiedLanguage(e.target.value)}
                sx={formControlSx}
              >
                {[
                  "javascript",
                  "typescript",
                  "python",
                  "json",
                  "html",
                  "css",
                ].map((lang) => (
                  <MenuItem key={lang} value={lang} sx={menuItemSx}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* Read-Only Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={readOnly}
              onChange={() => setReadOnly(!readOnly)}
            />
          }
          label="Read-Only"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* Word Wrap Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={wordWrap === "on"}
              onChange={() => setWordWrap(wordWrap === "on" ? "off" : "on")}
            />
          }
          label="Word Wrap"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* Line Numbers Selector */}
        <FormControl size="small">
          <InputLabel sx={formControlSx}>Line Numbers</InputLabel>
          <Select
            label="Line Numbers"
            value={lineNumbers}
            onChange={(e) => setLineNumbers(e.target.value)}
            sx={formControlSx}
          >
            <MenuItem value="on" sx={menuItemSx}>
              On
            </MenuItem>
            <MenuItem value="off" sx={menuItemSx}>
              Off
            </MenuItem>
            <MenuItem value="relative" sx={menuItemSx}>
              Relative
            </MenuItem>
          </Select>
        </FormControl>

        {/* Jump to Line */}
        <TextField
          label="Jump to Line"
          type="number"
          value={line}
          onChange={(e) => setLine(Math.max(1, Number(e.target.value)))}
          size="small"
          sx={{ input: formControlSx }}
        />

        {/* Font Size Slider */}
        <FormControl
          sx={{
            flexShrink: 0,
          }}
        >
          <InputLabel sx={{ ...formControlSx, mb: 2, flexShrink: 0 }}>
            Font Size
          </InputLabel>
          <Slider
            value={fontSize}
            onChange={(e, val) => setFontSize(val)}
            min={12}
            max={36}
            valueLabelDisplay="auto"
            sx={{ mt: 2 }}
          />
        </FormControl>

        {/* Minimap Toggle */}
        <FormControlLabel
          control={
            <Switch checked={minimap} onChange={() => setMinimap(!minimap)} />
          }
          label="Minimap"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* Bracket Colorization Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={bracketColorization}
              onChange={() => setBracketColorization(!bracketColorization)}
            />
          }
          label="Bracket Colorization"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* Scrollbar Selector */}
        <FormControl size="small">
          <InputLabel sx={formControlSx}>Scrollbar</InputLabel>
          <Select
            label="Scrollbar"
            value={scrollbar}
            onChange={(e) => setScrollbar(e.target.value)}
            sx={formControlSx}
          >
            <MenuItem value="auto" sx={menuItemSx}>
              Auto
            </MenuItem>
            <MenuItem value="visible" sx={menuItemSx}>
              Visible
            </MenuItem>
            <MenuItem value="hidden" sx={menuItemSx}>
              Hidden
            </MenuItem>
          </Select>
        </FormControl>

        {/* Keep Model on Unmount Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={keepModel}
              onChange={() => setKeepModel(!keepModel)}
            />
          }
          label="Keep Model on Unmount"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* AutoSave Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={autoSave}
              onChange={() => setAutoSave(!autoSave)}
            />
          }
          label="AutoSave (2s Delay)"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* Diff Mode Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={editorMode === "diff"}
              onChange={() =>
                setEditorMode(editorMode === "editor" ? "diff" : "editor")
              }
            />
          }
          label="Diff Mode"
          sx={{
            ...formControlSx,
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />

        {/* Editor Value (Editor Mode Only) */}
        {editorMode === "editor" && (
          <>
            <TextField
              label="Editor Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              multiline
              rows={2}
              sx={{ textarea: formControlSx }}
            />
            {diffs.value && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={formControlSx}
              >
                {diffs.value}
              </Typography>
            )}
          </>
        )}

        {/* Original Value (Diff Mode Only) */}
        {editorMode === "diff" && (
          <>
            <TextField
              label="Original Value"
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value)}
              size="small"
              multiline
              rows={2}
              sx={{ textarea: formControlSx }}
            />
            {diffs.originalValue && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={formControlSx}
              >
                {diffs.originalValue}
              </Typography>
            )}
          </>
        )}

        {/* Modified Value (Diff Mode Only) */}
        {editorMode === "diff" && (
          <>
            <TextField
              label="Modified Value"
              value={modifiedValue}
              onChange={(e) => setModifiedValue(e.target.value)}
              size="small"
              multiline
              rows={2}
              sx={{ textarea: formControlSx }}
            />
            {diffs.modifiedValue && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={formControlSx}
              >
                {diffs.modifiedValue}
              </Typography>
            )}
          </>
        )}

        {/* Original Path */}
        <TextField
          label="Original Path"
          value={originalPath}
          onChange={(e) => setOriginalPath(e.target.value)}
          size="small"
          sx={{ input: formControlSx }}
        />
        {diffs.originalPath && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={formControlSx}
          >
            {diffs.originalPath}
          </Typography>
        )}

        {/* Modified Path (Diff Mode Only) */}
        {editorMode === "diff" && (
          <>
            <TextField
              label="Modified Path"
              value={modifiedPath}
              onChange={(e) => setModifiedPath(e.target.value)}
              size="small"
              sx={{ input: formControlSx }}
            />
            {diffs.modifiedPath && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={formControlSx}
              >
                {diffs.modifiedPath}
              </Typography>
            )}
          </>
        )}

        {/* Reset Button */}
        <Button
          variant="contained"
          color="error"
          onClick={() => window.location.reload()}
          sx={formControlSx}
        >
          Reset Editor
        </Button>
      </Stack>
    </Stack>
  );
};

export default CodeEditorPreview;
