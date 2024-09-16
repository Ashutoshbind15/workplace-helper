"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

// render these dynamically without the ssr

const Basics = dynamic(() => import("./components/Basics"), { ssr: false });
const Setup = dynamic(() => import("./components/Setup"), { ssr: false });

const Page = ({
  params,
}: {
  params: {
    mid: string;
    id: string;
  };
}) => {
  const { mid, id } = params;

  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isSetup, setisSetup] = useState(false);

  return (
    <div>
      <span>Meeting id: {mid}</span>
      <span>Team id: {id}</span>

      {!isSetup && (
        <Setup
          isCamOn={isCamOn}
          setIsCamOn={setIsCamOn}
          isMicOn={isMicOn}
          setIsMicOn={setIsMicOn}
          setisSetup={setisSetup}
        />
      )}

      {isSetup && (
        <Basics
          isCamOn={isCamOn}
          isMicOn={isMicOn}
          setIsCamOn={setIsCamOn}
          setIsMicOn={setIsMicOn}
          meetingId={mid}
        />
      )}
    </div>
  );
};

export default Page;
