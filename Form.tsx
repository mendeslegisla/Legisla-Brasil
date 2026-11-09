"use client";

/**
 * Formulário com validação em português, campo a campo.
 * - Erros aparecem ao tentar enviar e somem assim que o campo é corrigido.
 * - Com NEXT_PUBLIC_FORM_ENDPOINT definido (por exemplo, um formulário do Formspree),
 *   envia de verdade. Sem ele, avisa o caminho alternativo em vez de fingir que enviou.
 */
import { type FormEvent, useId, useRef, useState } from "react";
import { SITE } from "@/content/site";

export type Field = {
  name: string; label: string; type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean; options?: string[]; placeholder?: string; autoComplete?: string; pair?: boolean;
};

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

function message(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, label: string) {
  if (el.validity.valueMissing) {
    if (el instanceof HTMLInputElement && el.type === "checkbox") return "Marque esta opção para continuar.";
    if (el instanceof HTMLInputElement && el.type === "email") return "Escreva seu e-mail.";
    return `Preencha o campo “${label}”.`;
  }
  if (el.validity.typeMismatch) return "Escreva um e-mail completo, como nome@exemplo.com.";
  return el.validationMessage;
}

export default function Form({ id, fields, submit, consent, newsletterOptIn, privacyNote = true }: {
  id: string; fields: Field[]; submit: string; consent?: string; newsletterOptIn?: boolean; privacyNote?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "demo" | "fail">("idle");
  const fid = (name: string) => `${id}-${name}-${uid}`;
  const labels: Record<string, string> = Object.fromEntries(fields.map((f) => [f.name, f.label]));
  labels.consentimento = "consentimento";

  const check = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (el.checkValidity()) delete next[el.name];
      else if (prev[el.name]) next[el.name] = message(el, labels[el.name] ?? el.name);
      return next;
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const els = Array.from(form.elements).filter((el): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
      el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement);
    const found: Record<string, string> = {};
    els.forEach((el) => { if (el.name && !el.checkValidity()) found[el.name] = message(el, labels[el.name] ?? el.name); });
    setErrors(found);
    const first = els.find((el) => found[el.name]);
    if (first) { setStatus("idle"); first.focus(); return; }
    if (!ENDPOINT) { setStatus("demo"); return; }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("fail");
    }
  }

  const control = (f: Field) => {
    const common = {
      id: fid(f.name), name: f.name, required: f.required, autoComplete: f.autoComplete,
      "aria-invalid": errors[f.name] ? true : undefined,
      "aria-describedby": errors[f.name] ? `${fid(f.name)}-erro` : undefined,
      onInput: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => check(e.currentTarget),
    };
    if (f.type === "textarea") return <textarea rows={4} {...common} />;
    if (f.type === "select") return <select {...common}>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>;
    return <input placeholder={f.placeholder} type={f.type ?? "text"} {...common} />;
  };

  const field = (f: Field) => (
    <div className="lg-field" key={f.name}>
      <label htmlFor={fid(f.name)}>{f.label}{!f.required && f.type !== "select" ? <span className="lg-optional"> (opcional)</span> : null}</label>
      {control(f)}
      {errors[f.name] ? <p className="lg-error" id={`${fid(f.name)}-erro`}>{errors[f.name]}</p> : null}
    </div>
  );

  // Agrupa campos marcados com pair em linhas de dois.
  const rows: Field[][] = [];
  fields.forEach((f) => {
    const last = rows[rows.length - 1];
    if (f.pair && last && last.length === 1 && last[0].pair) last.push(f);
    else rows.push([f]);
  });

  return (
    <form className="lg-form" data-form-status={ENDPOINT ? "live" : "demo"} noValidate onSubmit={onSubmit} ref={formRef}>
      <input name="formulario" type="hidden" value={id} />
      {rows.map((r) => (r.length > 1 ? <div className="lg-pair" key={r[0].name}>{r.map(field)}</div> : field(r[0])))}
      {consent ? (
        <>
          <label className="lg-check" htmlFor={fid("consentimento")}>
            <input aria-describedby={errors.consentimento ? `${fid("consentimento")}-erro` : undefined} aria-invalid={errors.consentimento ? true : undefined}
              id={fid("consentimento")} name="consentimento" onChange={(e) => check(e.currentTarget)} required type="checkbox" />
            <span>{consent} <a href="/politica-de-privacidade/">Política de Privacidade</a>.</span>
          </label>
          {errors.consentimento ? <p className="lg-error" id={`${fid("consentimento")}-erro`}>{errors.consentimento}</p> : null}
        </>
      ) : null}
      {newsletterOptIn ? (
        <label className="lg-check" htmlFor={fid("newsletter")}>
          <input id={fid("newsletter")} name="newsletter" type="checkbox" />
          <span>Quero receber também a newsletter da Legisla (opcional)</span>
        </label>
      ) : null}
      {privacyNote && !consent ? <p className="lg-note">Usamos seus dados só para responder ao contato. <a href="/politica-de-privacidade/">Política de Privacidade</a></p> : null}
      <button className="lg-btn is-dark" disabled={status === "sending"} style={{ alignSelf: "flex-start" }} type="submit">
        {status === "sending" ? "Enviando…" : submit}
      </button>
      <div aria-live="polite" role="status">
        {status === "demo" ? <p className="lg-form-msg">O formulário está sendo configurado. Escreva para {SITE.email}.</p> : null}
        {status === "sent" ? <p className="lg-form-msg is-ok">Recebemos sua mensagem. Respondemos em até {SITE.responseDays} dias úteis.</p> : null}
        {status === "fail" ? <p className="lg-form-msg">Não conseguimos enviar agora. Tente de novo ou escreva para {SITE.email}.</p> : null}
      </div>
    </form>
  );
}
