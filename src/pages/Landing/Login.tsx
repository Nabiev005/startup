import { useRef, useState } from "react";
import type {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

type Tab = "admin" | "sewer";

const CODE_LENGTH = 6;

const FEATURES = [
  "Кесим эмгек акы кол менен эсептелбейт",
  "Ар бир буйрутманын абалы реалдуу убакытта",
  "Интернет жок болсо да сканерлөө иштейт",
];

export const Login = () => {
  const [tab, setTab] = useState<Tab>("admin");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    if (digit && i < CODE_LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const handleCodeKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!digits) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    digits.split("").forEach((d, idx) => (next[idx] = d));
    setCode(next);
    inputs.current[Math.min(digits.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (tab === "admin") {
      if (!phone.trim() || !password) {
        setError("Телефон номерин жана сырсөздү жазыңыз");
        return;
      }
      if (code.join("").length < CODE_LENGTH) {
        setError("Telegram'дан келген 6 сандуу кодду жазыңыз");
        return;
      }
      // TODO: API чакыруу
      console.log({ phone, password, code: code.join("") });
    } else {
      if (pin.length < 4) {
        setError("PIN кодду жазыңыз");
        return;
      }
      // TODO: API чакыруу
      console.log({ pin });
    }
  };

  return (
    <Page>
      <Brand>
        <Logo to="/">
          <LogoIcon aria-hidden="true">↗</LogoIcon>
          ТигүүERP
        </Logo>

        <Pitch>
          <h1>
            Буйрутмадан жөнөтүүгө
            <br />
            чейин — бир системада
          </h1>
          <p>
            Тигүүчүлөр QR сканерлешет, ал эми эмгек акы, өндүрүштүн абалы жана
            өздүк нарк автоматтык эсептелет.
          </p>
          <FeatureList>
            {FEATURES.map((text, i) => (
              <Feature key={text}>
                <FeatureNum>{String(i + 1).padStart(2, "0")}</FeatureNum>
                {text}
              </Feature>
            ))}
          </FeatureList>
        </Pitch>

        <Support>Колдоо: Telegram, иш күндөрү 8:00–20:00</Support>
      </Brand>

      <FormSide>
        <Form onSubmit={handleSubmit} noValidate>
          <Head>
            <h2>Кирүү</h2>
            <Lang>
              Тил
              <select defaultValue="ky">
                <option value="ky">Кыргызча</option>
                <option value="ru">Русский</option>
              </select>
            </Lang>
          </Head>

          <Tabs role="tablist">
            <TabButton
              type="button"
              role="tab"
              aria-selected={tab === "admin"}
              $active={tab === "admin"}
              onClick={() => setTab("admin")}
            >
              Жетекчи / кызматкер
            </TabButton>
            <TabButton
              type="button"
              role="tab"
              aria-selected={tab === "sewer"}
              $active={tab === "sewer"}
              onClick={() => setTab("sewer")}
            >
              Тигүүчү (PIN)
            </TabButton>
          </Tabs>

          {tab === "admin" ? (
            <>
              <Field>
                <span>Телефон номери</span>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="username"
                  placeholder="+996 555 12 34 56"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Field>

              <Field>
                <span>Сырсөз</span>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              <TwoFA>
                <strong>Эки факторлуу текшерүү</strong>
                <p>Telegram-ботко 6 орундуу код жөнөтүлдү</p>
                <CodeRow>
                  {code.map((digit, i) => (
                    <CodeInput
                      key={i}
                      ref={(el) => {
                        inputs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={i === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      aria-label={`${i + 1}-сан`}
                      value={digit}
                      $filled={!!digit}
                      onChange={(e) => handleCodeChange(i, e)}
                      onKeyDown={(e) => handleCodeKey(i, e)}
                      onPaste={handlePaste}
                    />
                  ))}
                </CodeRow>
              </TwoFA>
            </>
          ) : (
            <Field>
              <span>PIN код</span>
              <Input
                type="password"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              />
            </Field>
          )}

          {error && <ErrorText role="alert">{error}</ErrorText>}

          <Submit type="submit">Кирүү</Submit>

          <Links>
            <a href="/forgot-password">Сырсөздү унуттуңузбу?</a>
            <a href="/login/qr">Кардар катары кирүү</a>
          </Links>
        </Form>
      </FormSide>
    </Page>
  );
};

export default Login;

/* ================= Стилдер ================= */

const colors = {
  text: "#0f1e47",
  light: "#f5f8ff",
  accent: "#2563eb",
  accentHover: "#1d4ed8",
  accentSoft: "#e8f0ff",
  accentDeep: "#1e3a8a",
  border: "#dfe7f6",
  muted: "#5a6785",
  danger: "#dc2626",
};

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

/* ---------- Animations ---------- */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const drift = keyframes`
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-30px, 20px) scale(1.1);
  }
`;

const shake = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-6px);
  }
  40%,
  80% {
    transform: translateX(6px);
  }
`;

const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1);
  }
`;

/* ---------- Layout ---------- */
const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    "Segoe UI",
    sans-serif;
  color: ${colors.text};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

/* ---------- Brand panel ---------- */
const Brand = styled.aside`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 32px;
  background: linear-gradient(150deg, ${colors.accent} 0%, ${colors.accentDeep} 100%);
  color: #fff;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }

  &::before {
    top: -120px;
    right: -120px;
    width: 360px;
    height: 360px;
    animation: ${drift} 12s ease-in-out infinite;
  }

  &::after {
    bottom: -100px;
    left: -80px;
    width: 260px;
    height: 260px;
    animation: ${drift} 15s ease-in-out infinite reverse;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 820px) {
    padding: 20px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
  animation: ${slideIn} 0.6s ${ease} both;
`;

const LogoIcon = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #fff;
  color: ${colors.accent};
  font-size: 18px;
  transition: transform 0.4s ${ease};

  ${Logo}:hover & {
    transform: rotate(-12deg) scale(1.08);
  }
`;

const Pitch = styled.div`
  max-width: 460px;

  h1 {
    margin: 0 0 16px;
    font-size: clamp(28px, 3vw, 40px);
    line-height: 1.15;
    font-weight: 700;
    animation: ${slideIn} 0.7s ${ease} 0.1s both;
  }

  p {
    margin: 0 0 24px;
    font-size: 14px;
    line-height: 1.6;
    color: #dbe7ff;
    animation: ${slideIn} 0.7s ${ease} 0.2s both;
  }

  @media (max-width: 820px) {
    h1 {
      margin: 0;
      font-size: 22px;
    }
    p,
    ul {
      display: none;
    }
  }
`;

const FeatureList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  animation: ${slideIn} 0.6s ${ease} both;

  &:nth-child(1) {
    animation-delay: 0.3s;
  }

  &:nth-child(2) {
    animation-delay: 0.4s;
  }

  &:nth-child(3) {
    animation-delay: 0.5s;
  }
`;

const FeatureNum = styled.span`
  display: grid;
  place-items: center;
  min-width: 26px;
  height: 22px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 11px;
`;

const Support = styled.p`
  margin: 0;
  font-size: 12px;
  color: #bfd4ff;
  animation: ${slideIn} 0.6s ${ease} 0.6s both;

  @media (max-width: 820px) {
    display: none;
  }
`;

/* ---------- Form panel ---------- */
const FormSide = styled.main`
  display: grid;
  place-items: center;
  padding: 32px;
  background: linear-gradient(180deg, #fff 0%, ${colors.light} 100%);
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  padding: 28px;
  border: 1px solid ${colors.border};
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 30px 60px -30px rgba(30, 58, 138, 0.35);
  animation: ${fadeUp} 0.7s ${ease} 0.15s both;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
  }
`;

const Lang = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: ${colors.muted};

  select {
    padding: 4px 8px;
    border: 1px solid ${colors.border};
    border-radius: 6px;
    background: #fff;
    font-family: inherit;
    font-size: 11px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  border-radius: 10px;
  background: ${colors.accentSoft};
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 9px 8px;
  border: 0;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  color: ${({ $active }) => ($active ? colors.accent : colors.muted)};
  font-family: inherit;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  box-shadow: ${({ $active }) =>
    $active ? "0 2px 6px rgba(37, 99, 235, 0.15)" : "none"};
  cursor: pointer;
  transition:
    background 0.25s ${ease},
    color 0.25s ${ease},
    box-shadow 0.25s ${ease};

  &:hover {
    color: ${colors.accent};
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  animation: ${fadeUp} 0.4s ${ease} both;

  span {
    font-size: 11px;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  background: #fff;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 4px ${colors.accentSoft};
  }
`;

/* ---------- 2FA ---------- */
const TwoFA = styled.div`
  padding: 14px;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  background: ${colors.light};
  animation: ${fadeUp} 0.4s ${ease} 0.1s both;

  strong {
    display: block;
    font-size: 12px;
  }

  p {
    margin: 4px 0 12px;
    font-size: 11px;
    color: ${colors.muted};
  }
`;

const CodeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
`;

const CodeInput = styled.input<{ $filled: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1.1;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  background: #fff;
  font-family: inherit;
  font-size: 18px;
  text-align: center;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 4px ${colors.accentSoft};
  }

  ${({ $filled }) =>
    $filled &&
    css`
      border-color: ${colors.accent};
      color: ${colors.accent};
      animation: ${pop} 0.25s ${ease};
    `}
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${colors.danger};
  animation: ${shake} 0.4s ease;
`;

const Submit = styled.button`
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: ${colors.accent};
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.25s ${ease},
    background 0.25s,
    box-shadow 0.25s;

  &:hover {
    transform: translateY(-2px);
    background: ${colors.accentHover};
    box-shadow: 0 12px 24px -12px rgba(37, 99, 235, 0.7);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 11px;

  a {
    color: ${colors.accent};
    text-decoration: none;
    background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px
      no-repeat;
    transition: background-size 0.3s ${ease};
  }

  a:hover {
    background-size: 100% 1px;
  }
`;
