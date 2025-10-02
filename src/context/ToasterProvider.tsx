import { createContext, useContext, useState } from "react";
import type { Toast, ToastType } from "../components/Toaster/type";
import Toaster from "../components/Toaster/Toaster";

type ToasterContextT = {
  addToast: (message: string, type?: ToastType) => void;
};

const ToasterContext = createContext<ToasterContextT | undefined>(undefined);
export const ToasterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev: Toast[]) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev: Toast[]) => prev.filter((t: Toast) => t.id !== id));
    }, 1500);
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      <Toaster toasts={toasts} />
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context)
    throw new Error("useToaster must be used within ToasterProvider");
  return context.addToast;
};
