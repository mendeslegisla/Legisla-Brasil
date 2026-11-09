/**
 * Checagem antes do lançamento. Lê o site compilado (pasta out/) e lista, página por página:
 * - textos entre [colchetes] (dados que só a equipe tem);
 * - formulários sem serviço de envio (NEXT_PUBLIC_FORM_ENDPOINT);
 * - retratos, logos e capas provisórios.
 * Sai com código 1 enquanto houver pendências, para travar a publicação.
 * Uso: npm run build && npm run check:launch   (ou npm run release)
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
if (!existsSync(OUT)) {
  console.log("Rode antes: npm run build");
  process.exit(2);
}

function pages(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === "_next" ? [] : pages(p);
    return f === "index.html" ? [p] : [];
  });
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ");
}

let pending = 0;
for (const file of pages(OUT).sort()) {
  const html = readFileSync(file, "utf8");
  const route = "/" + relative(OUT, file).replace(/index\.html$/, "");
  const brackets = [...new Set((visibleText(html).match(/\[[^[\]]{2,120}\]/g) ?? []).map((s) => s.trim()))];
  const demoForms = (html.match(/data-form-status="demo"/g) ?? []).length;
  const count = (kind) => (html.match(new RegExp(`data-placeholder="${kind}"`, "g")) ?? []).length;
  const portraits = count("retrato"), logos = count("logo"), covers = count("capa");
  if (!(brackets.length || demoForms || portraits || logos || covers)) continue;
  console.log(`\n${route}`);
  brackets.forEach((b) => console.log(`  · preencher: ${b}`));
  if (demoForms) console.log(`  · ${demoForms} formulário(s) sem serviço de envio (defina NEXT_PUBLIC_FORM_ENDPOINT)`);
  if (portraits) console.log(`  · trocar ${portraits} retrato(s) com monograma pela foto real`);
  if (logos) console.log(`  · trocar ${logos} marca(s) em texto pelo logo oficial`);
  if (covers) console.log(`  · trocar ${covers} capa(s) provisória(s) pela capa real, se houver`);
  pending += brackets.length + demoForms + portraits + logos + covers;
}
if (pending) {
  console.log(`\n${pending} pendência(s). O site ainda não está pronto para ir ao ar.`);
  process.exit(1);
}
console.log("Nenhuma pendência. Pronto para publicar.");
