"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import EditorImageUploader from "@/components/files/EditorImageUploader";

const CustomMenu = ({ editor }: { editor: Editor }) => {
  return (
    <div>
      <Button
        onClick={() =>
          editor
            .chain()
            .focus()
            .setImage({ src: "https://source.unsplash.com/random" })
            .run()
        }
      >
        Add Image
      </Button>

      <EditorImageUploader
        onUploadComplete={(files: any) => {
          const file = files[0];
          editor.chain().focus().setImage({ src: file.url }).run();
        }}
      />
    </div>
  );
};

const ClientWrapper = () => {
  const [jsonContent, setJsonContent] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },

    content: "<p>Hello World! 🌎️</p>",
  });

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <>
      {editor && <CustomMenu editor={editor} />}
      <EditorContent editor={editor} />
      <Button
        onClick={() => {
          const json = editor?.getJSON();
          const str = JSON.stringify(json);
          setJsonContent(str);
          editor?.commands.clearContent();
        }}
      >
        Save Content and reset
      </Button>
      <Button
        onClick={() => {
          if (jsonContent) {
            editor?.commands.setContent(JSON.parse(jsonContent));
          }
        }}
      >
        Generate content
      </Button>
    </>
  );
};

export default ClientWrapper;
