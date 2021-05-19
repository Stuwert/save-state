import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import usePortal from "../utility/usePortal";

export function Modal({
  children,
  show,
  close,
}: {
  children: ReactNode;
  show: boolean;
  close: () => void;
}) {
  const target = usePortal("modal");
  const Modal = (
    <>
      <div className="modal bg-white flex flex-col p-10 pt-0">
        {children}
        <button
          className="simpleButton bg-red-300 hover:bg-red-100 text-black"
          onClick={close}
        >
          Close
        </button>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50"
        onClick={close}
      ></div>
    </>
  );

  if (show) {
    return createPortal(Modal, target);
  }

  return <></>;
}
