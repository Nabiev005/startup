import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

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

const delay = (i: number) => ({ "--d": `${i * 80}ms` }) as CSSProperties;

export const Landing = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = pageRef.current?.querySelectorAll("[data-reveal]");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Page ref={pageRef}>
      <Header>
        <NavBar>
          <Logo to="/">
            <LogoIcon>
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
            </LogoIcon>
            ТигүүERP
          </Logo>
          <Menu>
            <a href="#">Башкы бет</a>
            <a href="#features">Мүмкүнчүлүктөр</a>
            <a href="#how">Кантип иштейт</a>
            <a href="#pricing">Тарифтер</a>
            <a href="#about">Биз жөнүндө</a>
            <a href="#contact">Байланыш</a>
          </Menu>
          <NavRight>
            <HideMobile>
              <Lang>KG / RU</Lang>
              <NavButton to="/login">Кирүү</NavButton>
            </HideMobile>
            <NavButton to="/login" $primary>
              Катталуу
            </NavButton>
          </NavRight>
        </NavBar>
      </Header>

      <Hero>
        <HeroGrid>
          <HeroCopy>
            <Pill>Тигүү цехтери үчүн ERP/MES · Кыргызстанда жасалган</Pill>
            <h1>Буйрутмадан айлыкка чейин — бүт цех бир системада</h1>
            <HeroText>
              Тигүүчүлөр телефон менен QR-кодду сканерлешет. Сдельный эмгек акы,
              буйрутманын абалы жана кездеменин чыгымы өзү эсептелет — дептер
              жана Excel кереги жок.
            </HeroText>
            <HeroButtons>
              <Button href="#contact" $primary $big>
                Акысыз сынап көрүү
              </Button>
              <Button href="#contact" $big>
                Демо көрсөтүүгө жазылуу
              </Button>
            </HeroButtons>
            <HeroMeta>
              <span>10–200 кызматкери бар цехтер үчүн</span>
              <span>Кыргызча жана орусча</span>
              <span>Арзан Android телефондордо иштейт</span>
            </HeroMeta>
          </HeroCopy>

          <HeroVisual>
            <Bundle>
              <BundleTop>
                <span>Б-0142 · Эркектер көйнөгү</span>
                <b>Тигүүдө</b>
              </BundleTop>
              <Percent>48%</Percent>
              <Bar>
                <span />
              </Bar>
              <Row>
                <span>Ийинди бириктирүү</span>
                <Mono>57/60</Mono>
              </Row>
              <Row>
                <span>Жеңди бекитүү</span>
                <Mono>48/60</Mono>
              </Row>
              <Row $alert>
                <span>Жака тигүү · тыгын</span>
                <Mono>20/60</Mono>
              </Row>
            </Bundle>
            <Phone>
              <small>Бүгүн тапканыңыз</small>
              <Earned>1 240 сом</Earned>
              <ScanButton>Сканерлөө</ScanButton>
              <Toast>Жака тигүү × 20 = 160 сом</Toast>
            </Phone>
          </HeroVisual>
        </HeroGrid>
      </Hero>

      <Section>
        <Wrap>
          <Eyebrow data-reveal>Кандай маселени чечет</Eyebrow>
          <Title data-reveal>Бул көйгөйлөр сизге тааныштырбы?</Title>
          <Grid $cols={4} $tablet={2}>
            {pains.map((p, i) => (
              <PainCard key={p.t} data-reveal style={delay(i)}>
                <PainNum>0{i + 1}</PainNum>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <strong>{p.f}</strong>
              </PainCard>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section id="how" $bg="light">
        <Wrap>
          <Eyebrow data-reveal>Кантип иштейт</Eyebrow>
          <Title data-reveal>Бир скан — айлык да, буйрутманын абалы да</Title>
          <Lead data-reveal>
            Системанын өзөгү жөнөкөй цикл. Тигүүчү операцияны бүтүрүп, пачканын
            QR-кодун сканерлейт — калганын система өзү эсептейт.
          </Lead>
          <Grid $cols={5} $tablet={2}>
            {steps.map((s, i) => (
              <Step
                key={s.t}
                $active={i === 3}
                data-reveal
                style={delay(i)}
              >
                <StepNum $active={i === 3}>{i + 1}</StepNum>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Step>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section id="features" $bg="accent">
        <Wrap>
          <Eyebrow data-reveal $light>
            Мүмкүнчүлүктөр
          </Eyebrow>
          <Title data-reveal>Цехке керектүүнүн баары — 10 модулда</Title>
          <Grid $cols={4} $tablet={2}>
            {modules.map((m, i) => (
              <Module key={m.t} data-reveal style={delay(i % 4)}>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </Module>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Eyebrow data-reveal>Эмне үчүн колдонуу керек</Eyebrow>
          <Title data-reveal>Ар бир кызматкер өзүнө керектүүнү гана көрөт</Title>
          <Grid $cols={3} $tablet={2}>
            {roles.map((r, i) => (
              <RoleCard key={r.t} data-reveal style={delay(i % 3)}>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </RoleCard>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section $bg="soft">
        <Wrap>
          <Grid $cols={5} $tablet={2} $gap={24} $flush>
            {stats.map((s, i) => (
              <Stat key={s.v} data-reveal style={delay(i)}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </Stat>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Grid $cols={2} $gap={24} $flush>
            <TrustCard data-reveal>
              <h3>Техникалык билими жок адамдар үчүн</h3>
              <ul>
                {easy.map((x) => (
                  <li key={x}>
                    <Check>✓</Check>
                    {x}
                  </li>
                ))}
              </ul>
            </TrustCard>
            <TrustCard data-reveal style={delay(1)}>
              <h3>Маалыматыңыз коопсуз</h3>
              <ul>
                {secure.map((x) => (
                  <li key={x}>
                    <Dot />
                    {x}
                  </li>
                ))}
              </ul>
            </TrustCard>
          </Grid>

          <ToolsTitle data-reveal>Сиз колдонгон куралдар менен иштейт</ToolsTitle>
          <Chips data-reveal>
            {tools.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
            {soon.map((t) => (
              <Chip key={t} $soon>
                {t}
              </Chip>
            ))}
          </Chips>
        </Wrap>
      </Section>

      <Section id="pricing" $bg="light">
        <Wrap>
          <Eyebrow data-reveal>Тарифтер</Eyebrow>
          <Title data-reveal>Цехиңиздин көлөмүнө жараша</Title>
          <Lead data-reveal>
            Ар бир тарифке бекер онлайн окутуу жана баштапкы толтурууга жардам
            кирет.
          </Lead>
          <Grid $cols={3}>
            {plans.map((p, i) => (
              <PriceCard
                key={p.t}
                $highlight={p.hl}
                data-reveal
                style={delay(i)}
              >
                <PriceTop>
                  <h3>{p.t}</h3>
                  {p.hl && <Badge>Сунушталат</Badge>}
                </PriceTop>
                <Who>{p.who}</Who>
                <Amount>
                  {p.amt}
                  {p.per && <small>сом/ай</small>}
                </Amount>
                <ul>
                  {p.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <Button href="#contact" $primary={p.hl} $block>
                  {p.btn}
                </Button>
              </PriceCard>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section id="about">
        <Wrap>
          <Grid $cols={2} $gap={48} $flush>
            <div data-reveal>
              <Eyebrow>Биз жөнүндө</Eyebrow>
              <Title>Кыргызстандын жеңил өнөр жайы үчүн жасалган</Title>
            </div>
            <AboutText data-reveal style={delay(1)}>
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
            </AboutText>
          </Grid>

          <FaqTitle data-reveal>Көп берилүүчү суроолор</FaqTitle>
          {faq.map((f, i) => (
            <FaqItem key={f.q} open={i === 0} data-reveal style={delay(i)}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </FaqItem>
          ))}
        </Wrap>
      </Section>

      <Section id="contact" $bg="accent">
        <Wrap>
          <Grid $cols={2} $gap={56} $flush>
            <Cta data-reveal>
              <h2>Цехиңизде көрсөтүп берели</h2>
              <p>
                Өтүнмө калтырыңыз — биз байланышып, системаны сиздин
                моделдериңиз менен көрсөтөбүз жана пилотко даярдайбыз.
              </p>
              <Contacts>
                <span>Телефон: [ТЕЛЕФОН]</span>
                <span>Telegram: [@КОЛДОО]</span>
                <span>Дарек: [ДАРЕК], Бишкек</span>
              </Contacts>
            </Cta>
            <Form
              onSubmit={(e) => e.preventDefault()}
              data-reveal
              style={delay(1)}
            >
              <label htmlFor="lp-name">Атыңыз</label>
              <input id="lp-name" placeholder="Айбек" />
              <label htmlFor="lp-phone">Телефон</label>
              <input id="lp-phone" type="tel" placeholder="+996" />
              <label htmlFor="lp-size">Цехте канча кызматкер бар?</label>
              <select id="lp-size" defaultValue="10–30">
                <option>10–30</option>
                <option>30–100</option>
                <option>100–200</option>
                <option>200+</option>
              </select>
              <button type="submit">Өтүнмө жөнөтүү</button>
            </Form>
          </Grid>
        </Wrap>
      </Section>

      <Footer>
        <Wrap>
          <FooterTop>
            <div>
              <b>ТигүүERP</b>
              <p>Тигүү ишканалары үчүн өндүрүштү башкаруу системасы</p>
            </div>
            <FooterCols>
              <div>
                <h4>Продукт</h4>
                <a href="#features">Мүмкүнчүлүктөр</a>
                <a href="#pricing">Тарифтер</a>
                <Link to="/login">Кирүү</Link>
              </div>
              <div>
                <h4>Компания</h4>
                <a href="#about">Биз жөнүндө</a>
                <a href="#contact">Байланыш</a>
                <a href="#">Купуялык саясаты</a>
              </div>
            </FooterCols>
          </FooterTop>
          <Copy>© 2026 ТигүүERP · Бишкек</Copy>
        </Wrap>
      </Footer>
    </Page>
  );
};

/* ================= Стилдер ================= */

const colors = {
  text: "#0f1e47",
  muted: "#5a6785",
  light: "#f5f8ff",
  accent: "#2563eb",
  accentHover: "#1d4ed8",
  accentSoft: "#e8f0ff",
  accentDeep: "#1e3a8a",
  border: "#dfe7f6",
  danger: "#dc2626",
};

const mono = '"IBM Plex Mono", monospace';
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

/* ---------- Animations ---------- */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.45);
  }
  70% {
    box-shadow: 0 0 0 22px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
`;

const grow = keyframes`
  from {
    width: 0;
  }
  to {
    width: 48%;
  }
`;

const pop = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const cardHover = css`
  transition:
    transform 0.3s ${ease},
    box-shadow 0.3s ${ease},
    border-color 0.3s ${ease};

  &:hover {
    transform: translateY(-6px);
    border-color: #bcd0f7;
    box-shadow: 0 18px 40px -18px rgba(37, 99, 235, 0.35);
  }
`;

/* ---------- Layout ---------- */
const Page = styled.div`
  background: #fff;
  color: ${colors.text};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  [data-reveal] {
    opacity: 0;
    translate: 0 28px;
    transition:
      opacity 0.7s ${ease} var(--d, 0ms),
      translate 0.7s ${ease} var(--d, 0ms),
      transform 0.3s ${ease},
      box-shadow 0.3s ${ease},
      border-color 0.3s ${ease},
      background 0.3s ${ease};
  }

  [data-reveal].is-visible {
    opacity: 1;
    translate: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }

    [data-reveal] {
      opacity: 1;
      translate: none;
    }
  }
`;

const Wrap = styled.div`
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 16px;
`;

const sectionBg = {
  white: { bg: "#fff", fg: "inherit" },
  light: { bg: colors.light, fg: "inherit" },
  soft: { bg: colors.accentSoft, fg: "inherit" },
  accent: {
    bg: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDeep} 100%)`,
    fg: "#fff",
  },
};

const Section = styled.section<{ $bg?: keyof typeof sectionBg }>`
  padding: 88px 0;
  background: ${({ $bg = "white" }) => sectionBg[$bg].bg};
  color: ${({ $bg = "white" }) => sectionBg[$bg].fg};
  scroll-margin-top: 72px;

  @media (max-width: 639px) {
    padding: 64px 0;
  }
`;

const Grid = styled.div<{
  $cols: number;
  $tablet?: number;
  $gap?: number;
  $flush?: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  gap: ${({ $gap = 16 }) => $gap}px;
  margin-top: ${({ $flush }) => ($flush ? 0 : 40)}px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(${({ $tablet = 1 }) => $tablet}, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background: #fff;
`;

/* ---------- Typography ---------- */
const Eyebrow = styled.div<{ $light?: boolean }>`
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ $light }) => ($light ? "#bfd4ff" : colors.accent)};
`;

const Title = styled.h2`
  max-width: 720px;
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;

  @media (max-width: 639px) {
    font-size: 28px;
  }
`;

const Lead = styled.p`
  max-width: 720px;
  margin: 14px 0 0;
  font-size: 17px;
  color: ${colors.muted};
`;

const Mono = styled.span`
  font-family: ${mono};
`;

/* ---------- Buttons ---------- */
const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 20px;
  border: 1.5px solid ${colors.accent};
  border-radius: 10px;
  background: #fff;
  color: ${colors.accent};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.25s ${ease},
    box-shadow 0.25s ${ease},
    background 0.25s ${ease},
    color 0.25s ${ease};

  &:hover {
    transform: translateY(-2px);
    background: ${colors.accentSoft};
    box-shadow: 0 10px 24px -12px rgba(37, 99, 235, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const buttonPrimary = css`
  background: ${colors.accent};
  color: #fff;

  &:hover {
    background: ${colors.accentHover};
  }
`;

const Button = styled.a<{
  $primary?: boolean;
  $big?: boolean;
  $block?: boolean;
}>`
  ${buttonBase}
  ${({ $primary }) => $primary && buttonPrimary}

  ${({ $big }) =>
    $big &&
    css`
      height: 56px;
      padding: 0 24px;
      font-size: 16px;
    `}

  ${({ $block }) =>
    $block &&
    css`
      width: 100%;
      height: 50px;
    `}
`;

const NavButton = styled(Link)<{ $primary?: boolean }>`
  ${buttonBase}
  height: 44px;
  padding: 0 16px;
  border-color: ${colors.border};
  color: ${colors.text};
  ${({ $primary }) => $primary && buttonPrimary}
`;

/* ---------- Header ---------- */
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${colors.border};
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  animation: ${fadeUp} 0.6s ${ease} both;
`;

const NavBar = styled(Wrap)`
  display: flex;
  align-items: center;
  gap: 28px;
  height: 72px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
`;

const LogoIcon = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${colors.accent}, ${colors.accentDeep});
  transition: transform 0.4s ${ease};

  ${Logo}:hover & {
    transform: rotate(-12deg) scale(1.08);
  }
`;

const Menu = styled.nav`
  display: flex;
  gap: 28px;
  margin-left: 28px;
  font-size: 15px;
  color: ${colors.muted};

  a {
    position: relative;
    transition: color 0.2s;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: ${colors.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ${ease};
  }

  a:hover,
  a:first-child {
    color: ${colors.accent};
  }

  a:hover::after {
    transform: scaleX(1);
  }

  a:first-child {
    font-weight: 600;
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

const HideMobile = styled.span`
  display: contents;

  @media (max-width: 639px) {
    display: none;
  }
`;

const Lang = styled.span`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  font-size: 13px;
  color: ${colors.muted};
`;

/* ---------- Hero ---------- */
const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 80px 0 72px;
  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(37, 99, 235, 0.12),
      transparent 45%
    ),
    linear-gradient(180deg, #fff 0%, ${colors.light} 100%);
  border-bottom: 1px solid ${colors.border};
`;

const HeroGrid = styled(Wrap)`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 48px;

  h1 {
    margin: 28px 0 32px;
    font-size: 52px;
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
  }

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 639px) {
    h1 {
      font-size: 36px;
    }
  }
`;

const HeroCopy = styled.div`
  > * {
    animation: ${fadeUp} 0.8s ${ease} both;
  }

  > *:nth-child(2) {
    animation-delay: 0.1s;
  }

  > *:nth-child(3) {
    animation-delay: 0.2s;
  }

  > *:nth-child(4) {
    animation-delay: 0.3s;
  }

  > *:nth-child(5) {
    animation-delay: 0.4s;
  }
`;

const Pill = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #cfdcfb;
  border-radius: 999px;
  background: ${colors.accentSoft};
  color: ${colors.accent};
  font-size: 13px;
  font-weight: 600;
`;

const HeroText = styled.p`
  max-width: 720px;
  margin: 0;
  font-size: 18px;
  color: ${colors.muted};
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 28px 0;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 20px;
  max-width: 460px;
  font-size: 13px;
  color: ${colors.muted};

  span::before {
    content: "✓ ";
    color: ${colors.accent};
    font-weight: 700;
  }
`;

const HeroVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  animation: ${fadeUp} 1s ${ease} 0.3s both;

  @media (max-width: 1023px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const Bundle = styled(Card)`
  width: 320px;
  padding: 22px 20px;
  box-shadow: 0 24px 50px -24px rgba(30, 58, 138, 0.3);
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 639px) {
    width: 100%;
  }
`;

const BundleTop = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${colors.muted};

  b {
    color: ${colors.accent};
  }
`;

const Percent = styled.div`
  margin: 18px 0 20px;
  font-size: 38px;
  font-weight: 700;
`;

const Bar = styled.div`
  height: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 4px;
  background: ${colors.accentSoft};

  span {
    display: block;
    width: 48%;
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #60a5fa, ${colors.accent});
    animation: ${grow} 1.6s ${ease} 0.6s both;
  }
`;

const Row = styled.div<{ $alert?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 13px;
  font-weight: ${({ $alert }) => ($alert ? 600 : 400)};
  color: ${({ $alert }) => ($alert ? colors.danger : "inherit")};
`;

const Phone = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 360px;
  padding: 16px 14px;
  border: 10px solid ${colors.accentDeep};
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 30px 60px -28px rgba(30, 58, 138, 0.5);
  animation: ${float} 6s ease-in-out 1.5s infinite;

  small {
    font-size: 11px;
    color: ${colors.muted};
  }

  @media (max-width: 639px) {
    width: 100%;
  }
`;

const Earned = styled.div`
  margin-top: 8px;
  font-family: ${mono};
  font-size: 22px;
  font-weight: 600;
`;

const ScanButton = styled.div`
  display: grid;
  place-items: center;
  width: 132px;
  height: 132px;
  margin: 22px auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, ${colors.accentDeep});
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  animation: ${pulse} 2.2s ease-out infinite;
`;

const Toast = styled.div`
  margin-top: auto;
  padding: 8px 10px;
  border-radius: 8px;
  background: ${colors.accentSoft};
  color: ${colors.accent};
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  animation: ${pop} 0.6s ${ease} 1.4s both;
`;

/* ---------- Pains ---------- */
const PainCard = styled(Card)`
  padding: 26px 24px;
  ${cardHover}

  h3 {
    margin: 18px 0 14px;
    font-size: 19px;
    font-weight: 600;
    line-height: 1.375;
  }

  p {
    margin: 0;
    padding-bottom: 14px;
    border-bottom: 1px solid ${colors.border};
    font-size: 15px;
    color: ${colors.muted};
  }

  strong {
    display: block;
    padding-top: 14px;
    font-size: 15px;
    font-weight: 600;
    color: ${colors.accent};
  }
`;

const PainNum = styled.div`
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 32px;
  border-radius: 8px;
  background: ${colors.accentSoft};
  color: ${colors.accent};
  font-family: ${mono};
  font-size: 14px;
  font-weight: 600;
`;

/* ---------- Steps ---------- */
const Step = styled.div<{ $active: boolean }>`
  min-height: 226px;
  padding: 22px;
  border: 1px solid ${({ $active }) => ($active ? colors.accent : colors.border)};
  border-radius: 16px;
  background: ${({ $active }) =>
    $active
      ? `linear-gradient(160deg, ${colors.accent}, ${colors.accentDeep})`
      : "#fff"};
  color: ${({ $active }) => ($active ? "#fff" : "inherit")};
  box-shadow: ${({ $active }) =>
    $active ? "0 20px 40px -20px rgba(37, 99, 235, 0.6)" : "none"};
  ${cardHover}

  h3 {
    margin: 16px 0 10px;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.375;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: ${({ $active }) => ($active ? 500 : 400)};
    color: ${({ $active }) => ($active ? "#dbe7ff" : colors.muted)};
  }
`;

const StepNum = styled.span<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $active }) => ($active ? "#fff" : colors.accentSoft)};
  color: ${colors.accent};
  font-size: 15px;
  font-weight: 700;
  transition: transform 0.3s ${ease};

  ${Step}:hover & {
    transform: scale(1.12) rotate(-6deg);
  }
`;

/* ---------- Modules ---------- */
const Module = styled.div`
  padding: 26px 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  transition:
    transform 0.3s ${ease},
    background 0.3s ${ease};

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.16);
  }

  h3 {
    margin: 0 0 10px;
    font-size: 17px;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #dbe7ff;
  }
`;

/* ---------- Roles ---------- */
const RoleCard = styled(Card)`
  padding: 26px 24px;
  ${cardHover}

  h3 {
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 15px;
    color: ${colors.muted};
  }
`;

/* ---------- Stats ---------- */
const Stat = styled.div`
  b {
    display: block;
    font-family: ${mono};
    font-size: 38px;
    font-weight: 600;
    line-height: 1.25;
    color: ${colors.accent};
  }

  span {
    display: block;
    margin-top: 8px;
    font-size: 15px;
    color: ${colors.muted};
  }
`;

/* ---------- Trust ---------- */
const TrustCard = styled(Card)`
  padding: 32px;
  ${cardHover}

  h3 {
    margin: 0 0 14px;
    font-size: 27px;
    font-weight: 600;
    line-height: 1.25;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    gap: 10px;
    margin: 10px 0;
    font-size: 15px;
    color: ${colors.muted};
  }
`;

const Check = styled.span`
  font-weight: 700;
  color: ${colors.accent};
`;

const Dot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 8px;
  border-radius: 50%;
  background: ${colors.accent};
`;

const ToolsTitle = styled.h3`
  margin: 96px 0 22px;
  font-size: 26px;
  font-weight: 600;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.span<{ $soon?: boolean }>`
  padding: 10px 16px;
  border: 1px ${({ $soon }) => ($soon ? "dashed" : "solid")} ${colors.border};
  border-radius: 999px;
  background: ${({ $soon }) => ($soon ? "transparent" : "#fff")};
  color: ${({ $soon }) => ($soon ? colors.muted : "inherit")};
  font-size: 15px;
  font-weight: ${({ $soon }) => ($soon ? 400 : 500)};
  transition:
    transform 0.25s ${ease},
    border-color 0.25s,
    color 0.25s;

  &:hover {
    transform: translateY(-3px);
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`;

/* ---------- Pricing ---------- */
const PriceCard = styled.div<{ $highlight: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 30px 28px;
  border: ${({ $highlight }) =>
    $highlight ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`};
  border-radius: 16px;
  background: #fff;
  box-shadow: ${({ $highlight }) =>
    $highlight ? "0 24px 50px -24px rgba(37, 99, 235, 0.45)" : "none"};
  ${cardHover}

  h3 {
    margin: 0;
    font-size: 21px;
    font-weight: 600;
  }

  ul {
    flex: 1;
    margin: 22px 0;
    padding-left: 18px;
    font-size: 15px;
    color: ${colors.muted};
  }

  li {
    margin: 6px 0;
  }

  li::marker {
    color: ${colors.accent};
  }
`;

const PriceTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: ${colors.accentSoft};
  color: ${colors.accent};
  font-size: 12px;
  font-weight: 600;
`;

const Who = styled.div`
  margin: 18px 0 22px;
  font-size: 15px;
  color: ${colors.muted};
`;

const Amount = styled.div`
  font-family: ${mono};
  font-size: 32px;
  font-weight: 600;

  small {
    margin-left: 20px;
    font-size: 15px;
    color: ${colors.muted};
  }
`;

/* ---------- About + FAQ ---------- */
const AboutText = styled.div`
  font-size: 16px;
  color: ${colors.muted};

  p {
    margin: 0 0 16px;
  }
`;

const FaqTitle = styled.h3`
  margin: 80px 0 24px;
  font-size: 32px;
  font-weight: 600;
`;

const FaqItem = styled.details`
  margin-bottom: 10px;
  padding: 20px 22px;
  border: 1px solid ${colors.border};
  border-radius: 14px;
  background: #fff;

  &:hover,
  &[open] {
    border-color: #bcd0f7;
  }

  summary {
    font-size: 17px;
    font-weight: 600;
    list-style: none;
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    content: "▶";
    display: inline-block;
    margin-right: 10px;
    font-size: 11px;
    color: ${colors.accent};
    transition: transform 0.3s ${ease};
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  &[open] p {
    animation: ${fadeUp} 0.4s ${ease};
  }

  p {
    margin: 12px 0 0;
    font-size: 15px;
    color: ${colors.muted};
  }
`;

/* ---------- Contact ---------- */
const Cta = styled.div`
  h2 {
    margin: 0;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.25;
  }

  p {
    margin: 16px 0 28px;
    font-size: 18px;
    font-weight: 500;
    color: #dbe7ff;
  }

  @media (max-width: 639px) {
    h2 {
      font-size: 28px;
    }
  }
`;

const Contacts = styled.div`
  display: grid;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #dbe7ff;
`;

const Form = styled.form`
  padding: 28px;
  border-radius: 20px;
  background: #fff;
  color: ${colors.text};
  box-shadow: 0 30px 60px -30px rgba(15, 30, 71, 0.6);

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 500;
  }

  input,
  select {
    width: 100%;
    height: 50px;
    margin-bottom: 18px;
    padding: 0 14px;
    border: 1px solid ${colors.border};
    border-radius: 10px;
    background: #fff;
    font-family: inherit;
    font-size: 16px;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  input:focus,
  select:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 4px ${colors.accentSoft};
  }

  button {
    width: 100%;
    height: 52px;
    border: 0;
    border-radius: 10px;
    background: ${colors.accent};
    color: #fff;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition:
      transform 0.25s ${ease},
      background 0.25s,
      box-shadow 0.25s;
  }

  button:hover {
    transform: translateY(-2px);
    background: ${colors.accentHover};
    box-shadow: 0 12px 24px -12px rgba(37, 99, 235, 0.7);
  }
`;

/* ---------- Footer ---------- */
const Footer = styled.footer`
  padding: 56px 0 28px;
  border-top: 1px solid ${colors.border};
  background: #fff;
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;

  b {
    font-size: 18px;
    color: ${colors.accent};
  }

  p {
    max-width: 320px;
    margin: 12px 0 0;
    font-size: 14px;
    color: ${colors.muted};
  }
`;

const FooterCols = styled.div`
  display: flex;
  gap: 48px;
  font-size: 15px;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h4 {
    margin: 0 0 4px;
    font-weight: 600;
  }

  a {
    color: ${colors.muted};
    transition:
      color 0.2s,
      transform 0.2s;
  }

  a:hover {
    color: ${colors.accent};
    transform: translateX(3px);
  }
`;

const Copy = styled.div`
  margin-top: 48px;
  padding-top: 22px;
  border-top: 1px solid ${colors.border};
  font-size: 13px;
  color: ${colors.muted};
`;
