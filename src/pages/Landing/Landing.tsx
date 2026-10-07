const pains = [
  {
    t: "Айлык дептерге эсептелет",
    d: "Ай сайын бухгалтер бир нече күн бою операцияларды санайт, каталар чыгат, тигүүчүлөр нааразы болушат.",
    f: "→ Ар бир скан айлыкка ошол замат жазылат. Ведомость бир баскыч менен түзүлөт.",
  },
  {
    t: "Буйрутма кайсы этапта — белгисиз",
    d: "Кардар чалат, ал эми жооп берүү үчүн цехти айланып, бригадирлерден сурап чыгуу керек.",
    f: "→ Даярдык пайызы реалдуу убакытта. Кечигиши мүмкүн буйрутмалар кызыл менен белгиленет.",
  },
  {
    t: "Кездеме кайда кеткени көрүнбөйт",
    d: "Кесүүдө канча кетти, канча калдык калды — так эсеп жок, ошондуктан буюмдун чыныгы баасы белгисиз.",
    f: "→ Материалдын нормасы, кесүүдөгү чыгым жана ар бир буюмдун өздүк наркы.",
  },
  {
    t: "Брак кимдики экени талаш",
    d: "Брак табылганда аны ким тиккени белгисиз, ошондуктан ошол эле ката кайталана берет.",
    f: "→ Брак операцияны аткарган тигүүчүгө автоматтык байланышат.",
  },
];

const steps = [
  {
    t: "Буйрутма",
    d: "Кардар, модель, өлчөм-түс матрицасы жана мөөнөтү киргизилет.",
  },
  {
    t: "Технологиялык карта",
    d: "Операциялар, ар биринин баасы жана нормалык убактысы.",
  },
  {
    t: "Кесүү жана QR",
    d: "Деталдар пачкаларга бөлүнүп, ар бирине QR-этикетка басылат.",
  },
  {
    t: "Тигүүчү сканерлейт",
    d: "Ар бир операциядан кийин — телефон менен, 2 секундда.",
  },
  {
    t: "Автоматтык эсеп",
    d: "Эмгек акы, даярдык пайызы жана тыгындар ошол замат көрүнөт.",
  },
];

const modules = [
  {
    t: "Буйрутмалар",
    d: "Статустар, өлчөм-түс матрицасы, мөөнөттү көзөмөлдөө, кардарлардын базасы.",
  },
  {
    t: "Технология",
    d: "Моделдердин каталогу, технологиялык карталар, материалдардын нормасы.",
  },
  {
    t: "Кесүү жана QR",
    d: "Пачкалар, термопринтерге этикетка, кездеменин чыгымы жана калдыгы.",
  },
  {
    t: "Өндүрүш (MES)",
    d: "Операциялар боюнча аткарылыш, тыгындар, кызматкерлердин өндүрүмдүүлүгү.",
  },
  {
    t: "Эмгек акы",
    d: "Сдельный жана айлык маяна, аванс, бонус, ведомость, Excel жана PDF.",
  },
  {
    t: "Кампа",
    d: "Кирим, чыгым, калдыктар жана материал түгөнүп баратканда эскертүү.",
  },
  {
    t: "Сапат",
    d: "Бракты каттоо, оңдоого кайтаруу жана брактын статистикасы.",
  },
  {
    t: "Кардар порталы",
    d: "Кардар өз буйрутмасынын абалын, жөнөтүү күнүн жана документтерин көрөт.",
  },
  {
    t: "Отчеттор",
    d: "Күндүк өндүрүш, өздүк нарк, кирешелүүлүк, Excelге экспорт.",
  },
  {
    t: "Telegram-бот",
    d: "Кечигүү, материал жана күндүк киреше тууралуу билдирүүлөр.",
  },
];

const roles = [
  {
    t: "Ээси / директор",
    d: "Цехтин абалы телефондо: өндүрүш, кечиккен буйрутмалар, эмгек акы жана ар бир буюмдун чыныгы баасы.",
  },
  {
    t: "Технолог жана бригадир",
    d: "Иш кайсы операцияда топтолуп калганы ошол замат көрүнөт — линияны убагында тең салмактоого болот.",
  },
  {
    t: "Тигүүчү",
    d: "Канча тапканын ар бир скандан кийин көрөт. Айлык ачык эсептелет, талаш болбойт.",
  },
  {
    t: "Бухгалтер",
    d: "Ведомость өзү түзүлөт: аванс, бонус жана брак үчүн кармап калуулар менен. Excel жана PDF.",
  },
  {
    t: "Кесүүчү жана кампачы",
    d: "Пачкалар жана этикеткалар бир нече баскыч менен. Материалдын калдыгы ар дайым так.",
  },
  {
    t: "Кардар",
    d: "Өз буйрутмасынын абалын порталдан көрөт — цехке чалып суроонун кереги жок.",
  },
];

const stats = [
  { v: "< 2 сек", l: "скан окулгандан жазылганга чейин" },
  { v: "8 саат", l: "интернетсиз иштей берет" },
  { v: "10 мүн", l: "жаңы тигүүчүнү үйрөтүүгө" },
  { v: "300", l: "тигүүчүгө чейин бир ишканада" },
  { v: "99,5%", l: "айына иштеп туруу кепилдиги" },
];

const easy = [
  "Тигүүчүнүн экраны — бир чоң «Сканерлөө» баскычы жана ири шрифт",
  "PIN-код же Telegram коду менен кирүү, сырсөз жаттоонун кереги жок",
  "Ар бир аракет үн же титирөө менен тастыкталат",
  "Бир операцияны эки жолу каттоо мүмкүн эмес",
  "Android 8+ жана iOS 14+, тиркеме орнотпой эле браузерден",
];

const secure = [
  "Бардык байланыш HTTPS (TLS 1.2+) аркылуу шифрленет",
  "Ар бир ишкананын маалыматы өзүнчө — башка ишкана көрө албайт",
  "Күн сайын резервдик көчүрмө, 30 күн сакталат",
  "Жетекчилер үчүн эки факторлуу аутентификация",
  "КРдин «Жеке мүнөздөгү маалымат жөнүндө» мыйзамына ылайык",
];

const tools = [
  "Telegram",
  "Excel импорт/экспорт",
  "SMS-код",
  "Термопринтерлер (ESC/POS, ZPL)",
];
const soon = [
  "1С: Бухгалтерия · жакында",
  "ЭЛКАРТ, Мбанк, О!Деньги · жакында",
  "ЭСФ · жакында",
];

const plans = [
  {
    t: "Старт",
    who: "30 кызматкерге чейин",
    amt: "[БААСЫ]",
    per: true,
    hl: false,
    items: [
      "Буйрутмалар, технология, кесүү",
      "QR сканерлөө жана эмгек акы",
      "Telegram-бот",
    ],
    btn: "Тандоо",
  },
  {
    t: "Цех",
    who: "100 кызматкерге чейин",
    amt: "[БААСЫ]",
    per: true,
    hl: true,
    items: [
      "Стартта болгондун баары",
      "Кампа жана сапат модулдары",
      "Өздүк нарк жана толук отчеттор",
    ],
    btn: "Тандоо",
  },
  {
    t: "Фабрика",
    who: "100дөн ашык кызматкер",
    amt: "Келишим боюнча",
    per: false,
    hl: false,
    items: [
      "Цехтен болгондун баары",
      "Кардар порталы, 1С, ачык API",
      "Жеке менеджер",
    ],
    btn: "Байланышуу",
  },
];

const faq = [
  {
    q: "Интернет өчүп калса эмне болот?",
    a: "Сканерлөөлөр телефондо 8 саатка чейин сакталат жана байланыш калыбына келгенде өзү жөнөтүлөт. Бир дагы скан жоголбойт.",
  },
  {
    q: "Тигүүчүлөргө кымбат телефон керекпи?",
    a: "Жок. Android 8+ же iOS 14+ болгон каалаган арзан телефон жетиштүү — тиркеме орнотуунун да кереги жок, браузерден иштейт.",
  },
  {
    q: "Мурдагы маалыматтарды Excelден жүктөсө болобу?",
    a: "Ооба. Кардарлар, моделдер, операциялар жана кызматкерлердин тизмесин Excel файлдан импорттоого болот, баштапкы толтурууга жардам беребиз.",
  },
  {
    q: "Тигүүчү башкалардын айлыгын көрөбү?",
    a: "Жок. Ар бир тигүүчү өзүнүн гана скандарын жана тапканын көрөт. Жалпы маалыматты жетекчи жана бухгалтер гана көрөт.",
  },
  {
    q: "QR-этикеткаларды кантип басабыз?",
    a: "ESC/POS же ZPL колдогон каалаган термопринтерден. Кесүү бүткөндө ар бир пачкага этикетка бир баскыч менен басылат.",
  },
];

const wrap = "mx-auto max-w-[1232px] px-4";
const eyebrow =
  "mb-3.5 text-[13px] font-semibold uppercase tracking-wide text-brand";
const h2 =
  "max-w-[720px] text-[28px] font-bold leading-tight tracking-tight sm:text-[38px]";
const lead = "mt-3.5 max-w-[720px] text-[17px] text-muted";
const card = "rounded-[14px] border border-line bg-white";
const btn =
  "inline-flex h-[46px] items-center justify-center rounded-lg border-[1.5px] border-ink bg-white px-5 text-[15px] font-semibold text-ink";
const btnBlue =
  "inline-flex h-[46px] items-center justify-center rounded-lg border-[1.5px] border-brand bg-brand px-5 text-[15px] font-semibold text-white";

export const Landing = () => {
  return (
    <div className="bg-white font-sans leading-normal text-ink">
      <header className="sticky top-0 z-10 border-b border-line bg-white">
        <div className={`${wrap} flex h-[72px] items-center gap-7`}>
          <a href="#" className="flex items-center gap-2.5 text-lg font-bold">
            <span className="grid size-9 place-items-center rounded-lg bg-brand">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M4 20 L16 8" />
                <circle cx="18" cy="6" r="2.4" />
                <path d="M6 13 l3 3" />
              </svg>
            </span>
            ТигүүERP
          </a>
          <nav className="ml-7 hidden gap-7 text-[15px] text-muted lg:flex">
            <a href="#" className="font-semibold text-ink">
              Башкы бет
            </a>
            <a href="#features">Мүмкүнчүлүктөр</a>
            <a href="#how">Кантип иштейт</a>
            <a href="#pricing">Тарифтер</a>
            <a href="#about">Биз жөнүндө</a>
            <a href="#contact">Байланыш</a>
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <span className="hidden h-10 items-center rounded-lg border border-line px-3 text-[13px] sm:flex">
              KG / RU
            </span>
            <a
              href="#"
              className={`${btn} hidden h-11 border-line px-4 sm:inline-flex`}
            >
              Кирүү
            </a>
            <a href="#contact" className={`${btnBlue} h-11 px-4`}>
              Катталуу
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-line bg-paper pb-16 pt-18">
        <div
          className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]`}
        >
          <div>
            <span className="inline-block rounded-full bg-brand-soft px-3 py-1.5 text-[13px] font-semibold text-brand">
              Тигүү цехтери үчүн ERP/MES · Кыргызстанда жасалган
            </span>
            <h1 className="mb-8 mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-[52px]">
              Буйрутмадан айлыкка чейин — бүт цех бир системада
            </h1>
            <p className="max-w-[720px] text-lg text-muted">
              Тигүүчүлөр телефон менен QR-кодду сканерлешет. Сдельный эмгек акы,
              буйрутманын абалы жана кездеменин чыгымы өзү эсептелет — дептер
              жана Excel кереги жок.
            </p>
            <div className="my-7 flex flex-wrap gap-3">
              <a href="#contact" className={`${btnBlue} h-14 px-6 text-base`}>
                Акысыз сынап көрүү
              </a>
              <a href="#contact" className={`${btn} h-14 px-6 text-base`}>
                Демо көрсөтүүгө жазылуу
              </a>
            </div>
            <div className="flex max-w-[460px] flex-wrap gap-x-5 gap-y-3.5 text-[13px] text-muted">
              <span>10–200 кызматкери бар цехтер үчүн</span>
              <span>Кыргызча жана орусча</span>
              <span>Арзан Android телефондордо иштейт</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap lg:justify-end">
            <div className={`${card} w-full px-5 py-[22px] sm:w-80`}>
              <div className="flex justify-between text-xs text-muted">
                <span>Б-0142 · Эркектер көйнөгү</span>
                <b className="text-brand">Тигүүдө</b>
              </div>
              <div className="mb-5 mt-[18px] text-[38px] font-bold">48%</div>
              <div className="mb-5 h-2 overflow-hidden rounded bg-paper">
                <span className="block h-full w-[48%] bg-brand" />
              </div>
              <div className="flex justify-between py-1 text-[13px]">
                <span>Ийинди бириктирүү</span>
                <span className="font-mono">57/60</span>
              </div>
              <div className="flex justify-between py-1 text-[13px]">
                <span>Жеңди бекитүү</span>
                <span className="font-mono">48/60</span>
              </div>
              <div className="flex justify-between py-1 text-[13px] font-semibold text-red-700">
                <span>Жака тигүү · тыгын</span>
                <span className="font-mono">20/60</span>
              </div>
            </div>
            <div className="flex h-[360px] w-full flex-col rounded-[26px] border-[10px] border-ink bg-white px-3.5 py-4 sm:w-[220px]">
              <small className="text-[11px] text-muted">Бүгүн тапканыңыз</small>
              <div className="mt-2 font-mono text-[22px] font-semibold">
                1 240 сом
              </div>
              <div className="mx-auto my-[22px] grid size-[132px] place-items-center rounded-full bg-brand text-[15px] font-bold text-white ring-8 ring-brand-soft">
                Сканерлөө
              </div>
              <div className="mt-auto rounded-md bg-green-50 px-2.5 py-2 text-center text-[11px] font-semibold text-green-700">
                Жака тигүү × 20 = 160 сом
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-22">
        <div className={wrap}>
          <div className={eyebrow}>Кандай маселени чечет</div>
          <h2 className={h2}>Бул көйгөйлөр сизге тааныштырбы?</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pains.map((p, i) => (
              <div className={`${card} px-6 py-[26px]`} key={p.t}>
                <div className="font-mono text-[15px] font-semibold text-red-700">
                  0{i + 1}
                </div>
                <h3 className="mb-3.5 mt-[18px] text-[19px] font-semibold leading-snug">
                  {p.t}
                </h3>
                <p className="border-b border-line pb-3.5 text-[15px] text-muted">
                  {p.d}
                </p>
                <p className="pt-3.5 text-[15px] font-semibold">{p.f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-paper py-16 sm:py-22">
        <div className={wrap}>
          <div className={eyebrow}>Кантип иштейт</div>
          <h2 className={h2}>Бир скан — айлык да, буйрутманын абалы да</h2>
          <p className={lead}>
            Системанын өзөгү жөнөкөй цикл. Тигүүчү операцияны бүтүрүп, пачканын
            QR-кодун сканерлейт — калганын система өзү эсептейт.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => {
              const active = i === 3;
              const num = active
                ? "bg-white text-brand"
                : i === 4
                  ? "bg-green-700 text-white"
                  : "bg-ink text-white";
              return (
                <div
                  key={s.t}
                  className={`min-h-[226px] rounded-[14px] border p-[22px] ${active ? "border-brand bg-brand text-white" : "border-line bg-white"}`}
                >
                  <span
                    className={`grid size-10 place-items-center rounded-lg text-[15px] font-bold ${num}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mb-2.5 mt-4 text-[17px] font-semibold leading-snug">
                    {s.t}
                  </h3>
                  <p
                    className={`text-sm ${active ? "font-medium text-indigo-100" : "text-muted"}`}
                  >
                    {s.d}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="bg-ink py-16 text-white sm:py-22">
        <div className={wrap}>
          <div className={`${eyebrow} text-indigo-300`}>Мүмкүнчүлүктөр</div>
          <h2 className={h2}>Цехке керектүүнүн баары — 10 модулда</h2>
          <div className="mt-10 grid overflow-hidden rounded-[14px] border border-zinc-800 bg-zinc-700 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <div
                className="border-b border-r border-zinc-800 bg-ink px-6 py-[26px]"
                key={m.t}
              >
                <h3 className="mb-2.5 text-[17px] font-bold">{m.t}</h3>
                <p className="text-sm text-zinc-300">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-22">
        <div className={wrap}>
          <div className={eyebrow}>Эмне үчүн колдонуу керек</div>
          <h2 className={h2}>Ар бир кызматкер өзүнө керектүүнү гана көрөт</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r) => (
              <div className={`${card} px-6 py-[26px]`} key={r.t}>
                <h3 className="mb-2.5 text-lg font-semibold">{r.t}</h3>
                <p className="text-[15px] text-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-brand-soft py-18">
        <div className={`${wrap} grid gap-6 sm:grid-cols-2 lg:grid-cols-5`}>
          {stats.map((s) => (
            <div key={s.v}>
              <b className="block font-mono text-[38px] font-semibold leading-tight text-[#1f3a9e]">
                {s.v}
              </b>
              <span className="mt-2 block text-[15px] text-muted">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-paper py-16 sm:py-22">
        <div className={wrap}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={`${card} p-8`}>
              <h3 className="mb-3.5 text-[27px] font-semibold leading-tight">
                Техникалык билими жок адамдар үчүн
              </h3>
              <ul>
                {easy.map((x) => (
                  <li
                    key={x}
                    className="my-2.5 flex gap-2.5 text-[15px] text-zinc-700"
                  >
                    <span className="font-bold text-green-700">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${card} p-8`}>
              <h3 className="mb-3.5 text-[27px] font-semibold leading-tight">
                Маалыматыңыз коопсуз
              </h3>
              <ul>
                {secure.map((x) => (
                  <li
                    key={x}
                    className="my-2.5 flex gap-2.5 text-[15px] text-zinc-700"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mb-[22px] mt-24 text-[26px] font-semibold">
            Сиз колдонгон куралдар менен иштейт
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-white px-4 py-2.5 text-[15px] font-medium"
              >
                {t}
              </span>
            ))}
            {soon.map((t) => (
              <span
                key={t}
                className="rounded-full border border-dashed border-line px-4 py-2.5 text-[15px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-22">
        <div className={wrap}>
          <div className={eyebrow}>Тарифтер</div>
          <h2 className={h2}>Цехиңиздин көлөмүнө жараша</h2>
          <p className={lead}>
            Ар бир тарифке бекер онлайн окутуу жана баштапкы толтурууга жардам
            кирет.
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.t}
                className={`flex flex-col rounded-[14px] bg-white px-7 py-[30px] ${p.hl ? "border-2 border-brand" : "border border-line"}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[21px] font-semibold">{p.t}</h3>
                  {p.hl && (
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                      Сунушталат
                    </span>
                  )}
                </div>
                <div className="mb-[22px] mt-[18px] text-[15px] text-muted">
                  {p.who}
                </div>
                <div className="font-mono text-[32px] font-semibold">
                  {p.amt}
                  {p.per && (
                    <small className="ml-5 text-[15px] text-muted">
                      сом/ай
                    </small>
                  )}
                </div>
                <ul className="my-[22px] flex-1 list-disc pl-[18px] text-[15px] text-zinc-700">
                  {p.items.map((x) => (
                    <li key={x} className="my-1.5">
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`${p.hl ? btnBlue : btn} h-[50px] w-full`}
                >
                  {p.btn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-line bg-paper py-16 sm:py-22"
      >
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className={eyebrow}>Биз жөнүндө</div>
              <h2 className={h2}>
                Кыргызстандын жеңил өнөр жайы үчүн жасалган
              </h2>
            </div>
            <div className="space-y-4 text-base text-muted">
              <p>
                ТигүүERP — тигүү цехтери, трикотаж жана текстиль фабрикалары,
                буйрутма менен иштеген ательелер үчүн булут кызматы. Системаны
                иштеп чыгуудан мурун биз цехтердеги процесстерди изилдеп, тигүү
                өндүрүшүнүн технологу менен бирге иштедик.
              </p>
              <p>
                Биздин максат — сдельный айлыкты кол менен эсептөөнү толук жоюу
                жана ээсине цехтин чыныгы абалын ачык көрсөтүү.
              </p>
              <p>
                Колдоо кызматы Telegram аркылуу, иш күндөрү 8:00–20:00. Маанилүү
                каталарга 4 сааттын ичинде жооп беребиз.
              </p>
            </div>
          </div>

          <h3 className="mb-6 mt-20 text-[32px] font-semibold">
            Көп берилүүчү суроолор
          </h3>
          {faq.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group mb-2.5 rounded-xl border border-line bg-white px-[22px] py-5"
            >
              <summary className="cursor-pointer list-none text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                <span className="mr-2 inline-block text-xs group-open:hidden">
                  ▶
                </span>
                <span className="mr-2 hidden text-xs group-open:inline-block">
                  ▼
                </span>
                {f.q}
              </summary>
              <p className="mt-3 text-[15px] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div id="contact" className="bg-brand py-18 text-white">
        <div className={`${wrap} grid gap-14 lg:grid-cols-2`}>
          <div>
            <h2 className="text-[28px] font-bold leading-tight sm:text-[40px]">
              Цехиңизде көрсөтүп берели
            </h2>
            <p className="mb-7 mt-4 text-lg font-medium text-indigo-100">
              Өтүнмө калтырыңыз — биз байланышып, системаны сиздин моделдериңиз
              менен көрсөтөбүз жана пилотко даярдайбыз.
            </p>
            <div className="space-y-2 text-[15px] font-medium text-indigo-100">
              <p>Телефон: [ТЕЛЕФОН]</p>
              <p>Telegram: [@КОЛДОО]</p>
              <p>Дарек: [ДАРЕК], Бишкек</p>
            </div>
          </div>
          <form
            className="rounded-2xl bg-white p-7 text-ink"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="lp-name"
              className="mb-2 block text-[13px] font-medium"
            >
              Атыңыз
            </label>
            <input
              id="lp-name"
              placeholder="Айбек"
              className="mb-[18px] h-[50px] w-full rounded-lg border border-line px-3.5 text-base"
            />
            <label
              htmlFor="lp-phone"
              className="mb-2 block text-[13px] font-medium"
            >
              Телефон
            </label>
            <input
              id="lp-phone"
              type="tel"
              placeholder="+996"
              className="mb-[18px] h-[50px] w-full rounded-lg border border-line px-3.5 text-base"
            />
            <label
              htmlFor="lp-size"
              className="mb-2 block text-[13px] font-medium"
            >
              Цехте канча кызматкер бар?
            </label>
            <select
              id="lp-size"
              defaultValue="10–30"
              className="mb-[18px] h-[50px] w-full rounded-lg border border-line bg-white px-3.5 text-base"
            >
              <option>10–30</option>
              <option>30–100</option>
              <option>100–200</option>
              <option>200+</option>
            </select>
            <button
              type="submit"
              className="h-[52px] w-full cursor-pointer rounded-lg bg-ink text-base font-semibold text-white"
            >
              Өтүнмө жөнөтүү
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-ink pb-7 pt-14 text-white">
        <div className={wrap}>
          <div className="flex flex-wrap justify-between gap-8">
            <div>
              <b className="text-lg">ТигүүERP</b>
              <p className="mt-3 max-w-80 text-sm text-zinc-300">
                Тигүү ишканалары үчүн өндүрүштү башкаруу системасы
              </p>
            </div>
            <div className="flex gap-12 text-[15px]">
              <div className="flex flex-col gap-2">
                <h4 className="mb-1 font-semibold">Продукт</h4>
                <a href="#features" className="text-zinc-300">
                  Мүмкүнчүлүктөр
                </a>
                <a href="#pricing" className="text-zinc-300">
                  Тарифтер
                </a>
                <a href="#" className="text-zinc-300">
                  Кирүү
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="mb-1 font-semibold">Компания</h4>
                <a href="#about" className="text-zinc-300">
                  Биз жөнүндө
                </a>
                <a href="#contact" className="text-zinc-300">
                  Байланыш
                </a>
                <a href="#" className="text-zinc-300">
                  Купуялык саясаты
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-800 pt-[22px] text-[13px] text-zinc-500">
            © 2026 ТигүүERP · Бишкек
          </div>
        </div>
      </footer>
    </div>
  );
};
