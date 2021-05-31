import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import loadStateFromHistory from "./utility/loadStateFromHistory";

export function LoadGame({ send }: { send: any }) {
  const { id } = useParams<{ id: string }>();
  const [loadResult, setLoadResult] = useState<string | boolean>(
    "Failed To Load"
  );

  useEffect(() => {
    const unencodedId = decodeURI(id).replace("%2F", "/").trim();
    const result = loadStateFromHistory(unencodedId, send);
    setLoadResult(result);
  }, [id, send]);

  if (loadResult === true) {
    return <Redirect to="/game" />;
  }

  return (
    <>
      <h1>Failed to Load the Game</h1>
      <p>{loadResult}</p>
    </>
  );
}

export default React.memo(LoadGame);
