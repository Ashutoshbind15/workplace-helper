"use client";

import { useUploadThing } from "@/lib/storage/uploadthing";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";

const EditorImageUploader = ({
  onUploadComplete,
}: {
  onUploadComplete: any;
}) => {
  const { isUploading, startUpload } = useUploadThing("imageRouter", {
    onClientUploadComplete: onUploadComplete,
  });

  const useUploadThingInputProps = () => {
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const selectedFiles = Array.from(e.target.files);

      const file = selectedFiles[0];

      const result = await startUpload([file]);

      console.log("uploaded files", result);
      // TODO: persist result in state maybe?
    };

    return {
      inputProps: {
        onChange,
        accept: "image/*",
      },
      isUploading: isUploading,
    };
  };

  const { inputProps } = useUploadThingInputProps();

  return (
    <>
      <label
        htmlFor="upload-button"
        className="bg-black text-white py-2 px-4 rounded-md hover:scale-105 transition-all cursor-pointer"
      >
        Upload and add an image
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </>
  );
};

export default EditorImageUploader;
