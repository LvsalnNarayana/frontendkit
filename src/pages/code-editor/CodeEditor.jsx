import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import CodeEditorPreview from "../../components/code-editor/CodeEditorPreview";

const CodeEditor = () => {
  return <PreviewLayout preview={<CodeEditorPreview />} />;
};

export default CodeEditor;
