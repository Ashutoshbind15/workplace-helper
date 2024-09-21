"use client";

import BlobUploader from "@/components/files/BlobUploader";
import { Button } from "@/components/ui/button";
import {
  Excalidraw,
  exportToBlob,
  Footer,
  loadFromBlob,
} from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [excaliApi, setExcaliApi] = useState<ExcalidrawImperativeAPI>();
  const [blob, setBlob] = useState<Blob>();

  const [remoteFileUrl, setRemoteFileUrl] = useState<string | null>(null);
  const [remoteBlob, setRemoteBlob] = useState<Blob | null>(null);

  const onUploadComplete = (ures: any) => {
    toast.success("Uploaded successfully");
    console.log(ures);
    const fileResponse = ures[0];
    setRemoteFileUrl(fileResponse.url);
  };

  const convertToBlobFromUrl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  return (
    <div>
      <div className="diagramcontainer">
        <Excalidraw
          excalidrawAPI={(api) => setExcaliApi(api)}
          onChange={(elements, appState, files) => {}}
        >
          <Footer>
            <div className="ml-5 flex items-center gap-x-3">
              <Button
                onClick={async () => {
                  if (!excaliApi) return;

                  const elements = excaliApi.getSceneElements();
                  const currentState = excaliApi.getAppState();

                  const canvasExportOpts = {
                    elements,
                    appState: {
                      ...currentState,
                      exportEmbedScene: true,
                    },
                    files: excaliApi.getFiles(),
                    getDimensions: () => {
                      return {
                        width: currentState.width,
                        height: currentState.height,
                      };
                    },
                  };

                  const blob = await exportToBlob(canvasExportOpts);
                  setBlob(blob);
                  toast("Conv to a blob and upload it to the server");
                }}
              >
                Click me
              </Button>
              <Button
                onClick={() => {
                  excaliApi?.resetScene();
                  toast.success("Reset the canvas successfully");
                }}
              >
                Reset
              </Button>

              {blob && (
                <BlobUploader blob={blob} onUploadComplete={onUploadComplete} />
              )}

              <Button
                onClick={async () => {
                  if (!blob || !excaliApi) return;
                  const scene = await loadFromBlob(blob, null, null);
                  excaliApi.updateScene(scene);
                }}
              >
                Reset from blob
              </Button>

              {remoteFileUrl && (
                <Button
                  onClick={async () => {
                    const blob = await convertToBlobFromUrl(remoteFileUrl);
                    console.log(blob);
                    if (!excaliApi) return;
                    const scene = await loadFromBlob(blob, null, null);
                    excaliApi.updateScene(scene);
                  }}
                >
                  Load from remote blob
                </Button>
              )}
            </div>
          </Footer>
        </Excalidraw>
      </div>
    </div>
  );
};

export default Page;
