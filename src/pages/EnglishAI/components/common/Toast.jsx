// src/components/common/Toast.jsx
import React from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-[90vw] w-full sm:w-auto pointer-events-none">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-slide-in border transition-all ${
          toast.type === "error"
            ? "bg-red-50/90 border-red-200 text-red-800"
            : "bg-emerald-50/90 border-emerald-200 text-emerald-800"
        }`}
      >
        {toast.type === "error" ? (
          <AlertCircle size={20} className="shrink-0" />
        ) : (
          <CheckCircle size={20} className="shrink-0" />
        )}
        <span className="text-sm font-semibold">{toast.message}</span>
        <button
          onClick={() => removeToast(toast.id)}
          className="ml-auto p-1 hover:bg-black/5 rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    ))}
  </div>
);
