import React, { useEffect, Fragment } from "react";
import { useService } from "@xstate/react";

const Panel = ({ children, panelRef, loader: Loader }) => {
  const [state, send] = useService(panelRef);
  const { id, name, ...meta } = state.context;

  const isLoading = state.matches("loading");
  const isReady = state.matches("ready");
  const isEditing = state.matches("editing");

  useEffect(() => {
    setTimeout(_ => send("INITIALIZE"), 2000);

    return _ => send("COMMIT");
  }, [send]);

  if (isLoading) {
    if (React.isValidElement(<Loader />)) {
      return <Loader />;
    }

    return <Fragment>loading...</Fragment>;
  }

  if ((isReady || isEditing) && typeof children === "function") {
    return children({ id, name, meta });
  }

  return <Fragment>{children}</Fragment>;
};

export default Panel;
