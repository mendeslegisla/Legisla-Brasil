"use client";

import { useState } from "react";

export default function PixCopy({ value }: { value: string }) {
  const [msg, setMsg] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setMsg("Chave copiada.");
    } catch {
      setMsg("Selecione a chave e copie.");
    }
  };
  return (
    <>
      <div className="lg-pix">
        <code>{value}</code>
        <button className="lg-btn is-dark" onClick={copy} type="button">Copiar</button>
      </div>
      <p aria-live="polite" className="lg-copied">{msg}</p>
    </>
  );
}
