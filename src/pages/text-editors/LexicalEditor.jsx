import React from "react";
import LexicalEditorCode from "../../components/TextEditor/LexicalEditorCode";
import LexicalEditorPreview from "../../components/TextEditor/LexicalEditorPreview";
import LexicalEditorDescription from "../../components/TextEditor/LexicalEditorDescription";
import PreviewLayout from "../../layouts/PreviewLayout";

const LexicalEditor = () => {
  return (
    <PreviewLayout
      code={<LexicalEditorCode />}
      preview={<LexicalEditorPreview />}
      description={<LexicalEditorDescription />}
    />
  );
};

export default LexicalEditor;
