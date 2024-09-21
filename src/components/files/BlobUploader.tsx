"use client";

import { useUploadThing } from "@/lib/storage/uploadthing";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";

const BlobUploader = ({
  blob,
  onUploadComplete,
}: {
  blob: Blob;
  onUploadComplete: any;
}) => {
  const { isUploading, startUpload } = useUploadThing("blobRouter", {
    onClientUploadComplete: onUploadComplete,
  });

  const convertToFile = (blob: Blob): File => {
    const file = new File([blob], `${uuidv4()}`, {
      type: blob.type,
    });
    return file;
  };
  const uploadHander = () => {
    if (!blob) return;
    const file = convertToFile(blob);
    startUpload([file]);
  };

  return (
    <Button onClick={uploadHander} disabled={isUploading}>
      Upload the blob
    </Button>
  );
};

export default BlobUploader;
