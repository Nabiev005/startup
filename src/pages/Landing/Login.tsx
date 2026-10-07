import { useRef, useState } from "react";
import type {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
} from "react";

type Tab = "admin" | "sewer";

const CODE_LENGTH = 6;

const FEATURES = [
  "Кесим эмгек акы кол менен эсептелбейт",
  "Ар бир буйрутманын абалы реалдуу убакытта",
  "Интернет жок болсо да сканерлөө иштейт",
];

const fieldInput =
  "h-[42px] w-full rounded-[10px] border border-[#e3e1da] bg-white px-3.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[#2343b8]";

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

  const tabClass = (active: boolean) =>
    `rounded-[7px] px-2 py-2.5 text-xs transition ${
      active
        ? "bg-white font-semibold text-[#1b1b1b] shadow-sm"
        : "text-[#6b6b66]"
    }`;

  return (
    <div className="grid min-h-screen grid-cols-1 font-sans text-[#1b1b1b] md:grid-cols-2">
      {/* Left brand panel */}
      <aside className="flex flex-col justify-between gap-5 bg-[#1b1b1b] p-5 text-white md:p-8">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg bg-[#2343b8] text-lg"
          >
            ↗
          </span>
          <span className="text-base font-bold">ТигүүERP</span>
        </div>

        <div className="max-w-[460px]">
          <h1 className="text-[22px] font-bold leading-tight md:mb-4 md:text-[clamp(28px,3vw,40px)]">
            Буйрутмадан жөнөтүүгө
            <br />
            чейин — бир системада
          </h1>
          <p className="mb-6 hidden text-sm leading-relaxed text-[#a8a8a3] md:block">
            Тигүүчүлөр QR сканерлешет, ал эми эмгек акы, өндүрүштүн абалы жана
            өздүк нарк автоматтык эсептелет.
          </p>
          <ul className="hidden gap-3 md:grid">
            {FEATURES.map((text, i) => (
              <li key={text} className="flex items-center gap-3 text-[13px]">
                <span className="grid h-[22px] min-w-[26px] place-items-center rounded-md bg-[#2b2b2b] text-[11px] text-[#8e8e89]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="hidden text-xs text-[#6f6f6a] md:block">
          Колдоо: Telegram, иш күндөрү 8:00–20:00
        </p>
      </aside>

      {/* Right form panel */}
      <main className="grid place-items-center bg-[#f3f2ee] p-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid w-full max-w-[340px] gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold">Кирүү</h2>
            <label className="flex items-center gap-2 text-[11px] text-[#6b6b66]">
              Тил
              <select
                defaultValue="ky"
                className="rounded-md border border-[#e3e1da] bg-white px-2 py-1 text-[11px]"
              >
                <option value="ky">Кыргызча</option>
                <option value="ru">Русский</option>
              </select>
            </label>
          </div>

          <div
            className="grid grid-cols-2 rounded-[10px] bg-[#e8e6df] p-1"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "admin"}
              className={tabClass(tab === "admin")}
              onClick={() => setTab("admin")}
            >
              Жетекчи / кызматкер
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "sewer"}
              className={tabClass(tab === "sewer")}
              onClick={() => setTab("sewer")}
            >
              Тигүүчү (PIN)
            </button>
          </div>

          {tab === "admin" ? (
            <>
              <label className="grid gap-1.5">
                <span className="text-[11px] font-semibold">
                  Телефон номери
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="username"
                  placeholder="+996 555 12 34 56"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldInput}
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-[11px] font-semibold">Сырсөз</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldInput}
                />
              </label>

              <div className="rounded-xl border border-[#e3e1da] bg-white p-3.5">
                <p className="text-xs font-bold">Эки факторлуу текшерүү</p>
                <p className="mb-3 mt-1 text-[11px] text-[#6b6b66]">
                  Telegram-ботко 6 орундуу код жөнөтүлдү
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {code.map((digit, i) => (
                    <input
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
                      onChange={(e) => handleCodeChange(i, e)}
                      onKeyDown={(e) => handleCodeKey(i, e)}
                      onPaste={handlePaste}
                      className={`aspect-[1/1.1] w-full rounded-lg border bg-white text-center text-lg outline-none focus:border-[#2343b8] focus-visible:ring-2 focus-visible:ring-[#2343b8] ${
                        digit ? "border-[#2343b8]" : "border-[#e3e1da]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <label className="grid gap-1.5">
              <span className="text-[11px] font-semibold">PIN код</span>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className={fieldInput}
              />
            </label>
          )}

          {error && (
            <p role="alert" className="text-xs text-[#b3261e]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="h-11 rounded-[10px] bg-[#2343b8] text-[13px] font-semibold text-white transition hover:bg-[#1b3596] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2343b8]"
          >
            Кирүү
          </button>

          <div className="flex justify-between gap-3 text-[11px] text-[#2343b8]">
            <a href="/forgot-password" className="underline">
              Сырсөздү унуттуңузбу?
            </a>
            <a href="/login/qr" className="underline">
              Кардар катары кирүү
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
