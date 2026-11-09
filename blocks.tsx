/** Seções reutilizadas em várias páginas: doação, newsletter e “vamos conversar”. */
import { SITE } from "@/content/site";
import Form from "./Form";
import PixCopy from "./PixCopy";
import { Btn, Section } from "./ui";

export function Donate() {
  return (
    <Section id="apoie" tone="wine">
      <div className="lg-split">
        <div>
          <h2>Apoie a Legisla Brasil</h2>
          <p className="lg-lede" style={{ marginTop: "1.25rem" }}>Sua doação sustenta o trabalho suprapartidário de fortalecer o Legislativo: consultorias, formação de assessores e pesquisas abertas ao público.</p>
          <p style={{ marginTop: "1rem" }}>Prestamos contas todo ano, com relatório de impacto e auditoria independente. <a href="/transparencia/">Veja para onde vão os recursos</a>.</p>
        </div>
        <div className="lg-donate">
          <div className="lg-donate__box">
            <h3>Pix</h3>
            <p>Use a chave abaixo no app do seu banco.</p>
            <PixCopy value={SITE.pix} />
          </div>
          <div className="lg-donate__box">
            <h3>Cartão</h3>
            <p>Doação única ou mensal pelo PayPal, em reais ou outra moeda.</p>
            <Btn href={SITE.paypal} variant="dark">Doar com cartão</Btn>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Newsletter() {
  return (
    <Section tone="paper">
      <div className="lg-split">
        <div>
          <h2 style={{ fontSize: "clamp(1.6rem, 1.4rem + .9vw, 2.4rem)" }}>Newsletter da Legisla</h2>
          <p className="lg-muted" style={{ marginTop: "1rem" }}>Uma vez por mês: pesquisas novas, programas com inscrições abertas e bastidores do Legislativo. Sem spam, e você cancela quando quiser.</p>
        </div>
        <Form consent="Concordo em receber a newsletter da Legisla Brasil, conforme a" fields={[{ name: "email", label: "Seu e-mail", type: "email", required: true, autoComplete: "email", placeholder: "nome@exemplo.com" }]} id="newsletter" submit="Assinar" />
      </div>
    </Section>
  );
}

export function Conversa({ title = "Vamos conversar sobre o seu trabalho" }: { title?: string }) {
  return (
    <Section id="conversa" tone="wine">
      <div className="lg-split">
        <div>
          <h2>{title}</h2>
          <p className="lg-lede" style={{ marginTop: "1.25rem" }}>Uma pessoa da equipe responde em até {SITE.responseDays} dias úteis. Prefere falar agora?</p>
          <div className="lg-actions"><Btn href={SITE.whatsapp.href} variant="light">Chamar no WhatsApp</Btn></div>
        </div>
        <div className="lg-form-box">
          <Form
            fields={[
              { name: "nome", label: "Nome", required: true, autoComplete: "name", pair: true },
              { name: "perfil", label: "Você é", type: "select", options: ["Parlamentar", "Chefe de gabinete", "Assessor(a)", "Dirigente partidário", "Outro"], pair: true },
              { name: "casa", label: "Casa legislativa ou partido", pair: true },
              { name: "cidade", label: "Cidade e UF", pair: true },
              { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email", pair: true },
              { name: "telefone", label: "WhatsApp", type: "tel", autoComplete: "tel", pair: true },
              { name: "mensagem", label: "Qual é o maior desafio hoje?", type: "textarea" },
            ]}
            id="conversa"
            newsletterOptIn
            submit="Enviar mensagem"
          />
        </div>
      </div>
    </Section>
  );
}
