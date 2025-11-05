"use client";

import { X } from "lucide-react";
import { ReactNode, useState } from "react";

interface ModalProps {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
}

const Modal = ({ trigger, children, title }: ModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;