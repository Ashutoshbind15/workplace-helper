"use client";

import { Button } from "@/components/ui/button";
import { exportToBlob, Footer, loadFromBlob } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

const Page = () => {
  const [excaliApi, setExcaliApi] = useState<ExcalidrawImperativeAPI>();
  const [blob, setBlob] = useState<Blob>();

  return (
    <div>
      <div className="diagramcontainer">
        <Excalidraw
          excalidrawAPI={(api) => setExcaliApi(api)}
          onChange={(elements, appState, files) => {
            // console.log(elements);
            // console.log(appState);
            // console.log(files);
          }}
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

              <Button
                onClick={async () => {
                  if (!blob || !excaliApi) return;
                  const scene = await loadFromBlob(blob, null, null);
                  excaliApi.updateScene(scene);
                }}
              >
                Reset from blob
              </Button>
            </div>
          </Footer>
        </Excalidraw>
      </div>
    </div>
  );
};

export default Page;
