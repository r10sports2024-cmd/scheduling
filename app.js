/* ============================================================
   AGENDA FÁCIL — app de serviços locais e agendamentos (demonstração)
   ============================================================ */

const CATEGORIES = {
  tecnologia: { label: "Tecnologia", icon: "i-code", color: "#43d6a4" },
  saude:      { label: "Saúde", icon: "i-heart", color: "#ee8b82" },
  engenharia: { label: "Engenharia", icon: "i-tools", color: "#7fa9f5" },
  design:     { label: "Artes & Design", icon: "i-palette", color: "#f0a072" },
  educacao:   { label: "Educação", icon: "i-book", color: "#86c9e8" },
  beleza:     { label: "Beleza & Estilo", icon: "i-sparkles", color: "#f28ab2" },
  esporte:    { label: "Esporte & Lazer", icon: "i-heart", color: "#8ad06a" },
  cultura:    { label: "Cultura & Arte", icon: "i-mic", color: "#c78af0" },
  servicos:   { label: "Serviços", icon: "i-sparkles", color: "#a8b8c8" }
};

function buildDays() {
  const weekdays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const pad = (n) => String(n).padStart(2, "0");
    return {
      date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      weekday: weekdays[d.getDay()],
      day: pad(d.getDate()),
      month: months[d.getMonth()]
    };
  });
}
const DAYS = buildDays();

const STATIC_SERVICES = [
  { id:"s02", title:"Check-up de Saúde", company:"Clínica Vital", category:"saude",
    short:"Uma conversa sobre cuidados com o corpo, sono e alimentação na adolescência.",
    desc:"Atendimento breve e descontraído com profissional de saúde. Medimos pressão, conversamos sobre sono, alimentação e hábitos, e tiramos dúvidas sem julgamento.",
    duration:30, price:"Gratuito", rating:4.8, reviews:52, location:"Sala 08 · Estande 02", provider:"Dra. Camila Torres", role:"Clínica geral",
    includes:["Aferição de pressão","Orientações de sono e alimentação","Espaço para dúvidas"],
    schedule:{0:["08:30","09:30","10:30","14:00"],1:["09:00","10:00"],2:["08:30","13:00"],4:["10:30","14:30"]} },
  { id:"s03", title:"Oficina de Design Gráfico", company:"Estúdio Forma", category:"design",
    short:"Crie sua primeira marca em 60 minutos usando cor, forma e tipografia.",
    desc:"Oficina prática para montar uma marca simples do zero. Você escolhe formas, cores e fontes e leva uma ideia de identidade visual para casa.",
    duration:60, price:"R$ 10", rating:4.9, reviews:27, location:"Sala de Artes · Estande 03", provider:"Luiza Prado", role:"Designer gráfica",
    includes:["Material e ferramentas inclusos","Exercício guiado","Resultado leva para casa"],
    schedule:{0:["09:00","11:00","14:00"],1:["10:00"],2:["09:00","13:00","15:00"],3:["11:00"]} },
  { id:"s05", title:"Aula de Matemática", company:"Núcleo Educa", category:"educacao",
    short:"Destrave a matemática com um método visual e bem direto.",
    desc:"Uma aula individual de reforço em temas que mais aparecem no ensino fundamental: frações, porcentagem e equações. Leve dicas que dá para usar na prova.",
    duration:50, price:"Gratuito", rating:4.9, reviews:63, location:"Sala 05 · Estande 05", provider:"Prof. Sérgio Alves", role:"Professor",
    includes:["Reforço de conteúdo","Material impresso","Tira-dúvidas livre"],
    schedule:{0:["09:00","10:00","11:00","14:00"],1:["09:00"],2:["10:00","13:00"],3:["09:00","11:00"]} },
  { id:"s06", title:"Introdução à Programação", company:"Nuvem Labs", category:"tecnologia",
    short:"Escreva seu primeiro código em uma atividade de 60 minutos.",
    desc:"Sem experiência prévia: você vai montar um pequeno programa no navegador e entender como pensar em lógica, variáveis e repetição.",
    duration:60, price:"R$ 15", rating:4.8, reviews:34, location:"Lab. Informática 1", provider:"Rafael Costa", role:"Desenvolvedor",
    includes:["Notebook disponível","Exercício prático","Certificado de participação"],
    schedule:{0:["08:00","10:00","13:00","15:00"],1:["10:00","14:00"],2:["09:00","11:00","14:00"],3:["13:00"]} },
  { id:"s07", title:"Orientação Jurídica", company:"Quintela Advogados", category:"servicos",
    short:"Tire dúvidas sobre direitos, contratos e convivência no trabalho.",
    desc:"Atendimento individual para entender direitos no dia a dia, como funcionam contratos simples e o que fazer em situações de conflito no trabalho ou na vizinhança.",
    duration:30, price:"Gratuito", rating:4.6, reviews:19, location:"Sala 07 · Estande 06", provider:"Dr. André Quintela", role:"Advogado",
    includes:["Atendimento individual","Explicação em linguagem simples","Material de apoio"],
    schedule:{0:["09:30","11:00","14:30"],2:["08:30","10:00"],3:["09:30","13:30"],4:["10:00"]} },
  { id:"s15", title:"Arquitetura e Espaços", company:"Ateliê Espaço", category:"engenharia",
    short:"Como um ambiente muda o jeito que as pessoas se sentem?",
    desc:"Veja como luz, cor e circulação transformam um espaço. Você analisa uma planta e propõe uma melhoria simples.",
    duration:45, price:"Gratuito", rating:4.9, reviews:35, location:"Sala 12 · Estande 07", provider:"Beatriz Nogueira", role:"Arquiteta",
    includes:["Análise de planta","Exemplos de projetos","Sugestão individual"],
    schedule:{0:["09:30","11:30"],1:["10:30","14:00"],2:["09:00"],3:["13:00","15:00"],4:["10:00"]} },

  { id:"s16", title:"Corte de Cabelo", company:"Barbearia Vila Nova", category:"beleza",
    short:"Corte moderno e rápido para você chegar bem apresentado a qualquer compromisso.",
    desc:"Corte de cabelo com profissional experiente, incluindo finalização com pomada ou gel. Você escolhe o estilo antes de começar.",
    duration:30, price:"R$ 15", rating:4.8, reviews:44, location:"Arena Beleza · Estande B1", provider:"Ricardo Almeida", role:"Barbeiro",
    includes:["Lavagem e corte","Finalização com produto","Dica de cuidado diário"],
    schedule:{0:["08:30","09:30","10:30","13:00","14:00"],1:["09:00","10:00","11:00"],2:["08:30","13:30"],3:["09:30","11:00"],4:["10:00"]} },
  { id:"s18", title:"Manicure & Nail Art", company:"Studio Bella", category:"beleza",
    short:"Unhas bonitas e uma nail art simples para qualquer ocasião.",
    desc:"Sessão de manicure com lixamento, cutícula e uma nail art discreta. Produtos hipoalergênicos e esterilização garantida.",
    duration:45, price:"R$ 20", rating:4.7, reviews:38, location:"Arena Beleza · Estande B2", provider:"Camila Duarte", role:"Manicure",
    includes:["Manicure completa","Nail art simples","Kit de cuidados para levar"],
    schedule:{0:["08:30","10:00","13:00","15:00"],1:["09:30","11:00"],2:["08:30","10:30","14:00"],3:["09:00","13:30"],4:["10:30"]} },
  { id:"s20", title:"Treino Funcional", company:"Academia Movimento", category:"esporte",
    short:"Uma aula prática de treino funcional para todos os níveis.",
    desc:"Aula de 45 minutos com exercícios adaptados para iniciantes. O objetivo é mostrar que atividade física pode ser leve e divertida.",
    duration:45, price:"Gratuito", rating:4.8, reviews:57, location:"Quadra Coberta · Estande E1", provider:"Marcos Ribeiro", role:"Personal trainer",
    includes:["Aula adaptada ao nível","Equipamentos inclusos","Orientação de postura"],
    schedule:{0:["08:00","10:00","14:00"],1:["09:00","11:00"],2:["08:00","13:00"],3:["10:00","15:00"],4:["09:00"]} },
  { id:"s22", title:"Fotografia com Celular", company:"Estúdio Forma", category:"cultura",
    short:"Tire fotos muito melhores só com o celular que você já tem.",
    desc:"Oficina prática de enquadramento, luz natural e edição no celular. Você sai com três fotos prontas para postar.",
    duration:60, price:"R$ 15", rating:4.8, reviews:33, location:"Sala de Artes · Estande C1", provider:"Marina Costa", role:"Fotógrafa",
    includes:["Enquadramento e luz","Exercício prático","Noções de edição"],
    schedule:{0:["08:30","10:30","13:30"],1:["09:00","14:00"],2:["10:00","15:00"],3:["09:30","13:00"],4:["10:30"]} },
  { id:"s23", title:"Aula de Guitarra", company:"Escola de Música Som", category:"cultura",
    short:"Toque seus primeiros acordes em uma aula individual.",
    desc:"Aula de guitarra para iniciantes com acordes básicos e uma música simples. Trazer instrumento é opcional — temos guitarra disponível.",
    duration:45, price:"R$ 20", rating:4.9, reviews:29, location:"Sala de Música · Estande C2", provider:"Felipe Nunes", role:"Músico e professor",
    includes:["Guitarra disponível","Acordes básicos","Música para levar"],
    schedule:{0:["09:00","11:00","14:00"],1:["10:00","13:00"],2:["09:30","14:30"],3:["08:30","11:30"],4:["09:00"]} },
  { id:"s24", title:"Oficina de Culinária", company:"Cozinha da Vila", category:"cultura",
    short:"Prepare um lanche gostoso e equilibrado com as próprias mãos.",
    desc:"Oficina de culinária com receitas simples, seguras e baratas. Você ajuda a preparar e leva a receita para repetir em casa.",
    duration:60, price:"R$ 18", rating:4.9, reviews:51, location:"Cozinha Experimental · Estande C3", provider:"Chef Helena Souza", role:"Chef de cozinha",
    includes:["Ingredientes inclusos","Receita impressa","Degustação no final"],
    schedule:{0:["08:30","10:30","13:30"],1:["09:30","14:00"],2:["08:30","11:00"],3:["10:00","13:00"],4:["09:30"]} }
];

const SERVICE_IMAGES = {
  s02:"health", s03:"design", s05:"education", s06:"tech", s07:"business",
  s15:"engineering", s16:"barbershop", s18:"beauty", s20:"fitness",
  s22:"photography", s23:"music", s24:"cooking"
};
const CATEGORY_IMAGES = {
  tecnologia:"tech", saude:"health", engenharia:"engineering", design:"design",
  educacao:"education", beleza:"beauty", esporte:"fitness", cultura:"music", servicos:"business"
};
const LOCATION_FIXES = {
  "Sala 08 · Estande 02": "Av. Central, 340",
  "Sala de Artes · Estande 03": "Rua do Ateliê, 55",
  "Sala 05 · Estande 05": "Rua do Ensino, 90",
  "Lab. Informática 1": "Rua Tech, 150",
  "Sala 07 · Estande 06": "Av. Central, 275",
  "Sala 12 · Estande 07": "Rua das Obras, 130",
  "Arena Beleza · Estande B1": "Rua das Flores, 88",
  "Arena Beleza · Estande B2": "Rua das Flores, 88",
  "Quadra Coberta · Estande E1": "Ginásio Municipal",
  "Sala de Artes · Estande C1": "Rua do Ateliê, 55",
  "Sala de Música · Estande C2": "Rua da Música, 64",
  "Cozinha Experimental · Estande C3": "Rua do Sabor, 12"
};
STATIC_SERVICES.forEach((service) => {
  service.image = SERVICE_IMAGES[service.id] || CATEGORY_IMAGES[service.category] || "business";
  service.location = LOCATION_FIXES[service.location] || service.location.replace(/ · Estande .*$/, "");
});

const KEYS = { bookings:"vila1-bookings", services:"vila1-services", prefs:"vila1-prefs", user:"vila1-user", notif:"vila1-notif" };

const ROOTS = new Set(["home", "explore", "bookings", "profile"]);
const CREATE_TIMES = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

const state = {
  screen: "home",
  tab: "home",
  stack: [],
  bookings: readStore(KEYS.bookings, []),
  myServices: readStore(KEYS.services, []),
  prefs: readStore(KEYS.prefs, { notifications: true, reminders: true }),
  user: readStore(KEYS.user, { name: "user", phone: "(11) 98877-6655", bairro: "Vila Nova" }),
  notifRead: readStore(KEYS.notif, false),
  explore: { query: "", cat: "todas", mine: false },
  bookingsTab: "upcoming",
  selectedId: null,
  booking: { day: null, time: null },
  create: freshCreate(),
  lastBooking: null,
  editProfile: false,
  confirmAction: null
};

if (state.user && state.user.name === "Renan Alves") {
  state.user = { ...state.user, name: "user" };
  writeStore(KEYS.user, state.user);
}

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* navegador privado */ }
}
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function icon(name, extra = "") { return `<svg class="ic ${extra}" aria-hidden="true"><use href="#${name}"/></svg>`; }
function initials(name) {
  return String(name || "").replace(/^(Dra?\.|Prof\.)\s*/, "").trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase() || "US";
}
function freshCreate() {
  return { step: 1, data: { title:"", company:"", category:"tecnologia", short:"", desc:"", duration:45, price:"Gratuito", location:"", contact:"", days:[], times:[] } };
}
function allServices() { return [...state.myServices, ...STATIC_SERVICES]; }
function serviceById(id) { return allServices().find((s) => s.id === id); }
function catOf(id) { return CATEGORIES[id] || CATEGORIES.servicos; }
function dayDate(i) { return DAYS[i].date; }
function dayLabel(i) { const d = DAYS[i]; return `${d.weekday}, ${d.day} ${d.month}`; }
function longDate(dateStr) {
  return new Intl.DateTimeFormat("pt-BR", { weekday:"long", day:"2-digit", month:"long" }).format(new Date(`${dateStr}T12:00:00`));
}
function code6() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `AF-${out}`;
}
function isSlotBooked(serviceId, date, time) {
  return state.bookings.some((b) => b.serviceId === serviceId && b.date === date && b.time === time);
}
function availableTimes(service, dayIndex) {
  const times = (service.schedule && service.schedule[dayIndex]) || [];
  return times.filter((t) => !isSlotBooked(service.id, dayDate(dayIndex), t));
}
function firstAvailable(service) {
  for (let i = 0; i < DAYS.length; i++) {
    const times = availableTimes(service, i);
    if (times.length) return { day: i, time: times[0] };
  }
  return null;
}
function sortedBookings() {
  return [...state.bookings].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
}

/* ---------- toast + confirmação ---------- */

function toast(title, message, type = "ok") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  const mark = type === "error" ? "!" : type === "tip" ? "i" : "✓";
  node.innerHTML = `<span class="toast-icon">${mark}</span><div><b>${esc(title)}</b><span>${esc(message)}</span></div>`;
  $("#toastStack").appendChild(node);
  setTimeout(() => { node.classList.add("leaving"); setTimeout(() => node.remove(), 260); }, 3600);
}

function showErrorSummary(boxId, listId, errors) {
  const box = document.getElementById(boxId);
  const list = document.getElementById(listId);
  if (!box || !list) return;
  list.innerHTML = errors.map((e) => `<li><a href="#${e.id}">${esc(e.label)}</a></li>`).join("");
  box.hidden = errors.length === 0;
  if (errors.length) box.focus();
}
function clearErrorSummary(boxId) {
  const box = document.getElementById(boxId);
  if (box) box.hidden = true;
}

function askConfirm(title, message, onOk) {
  $("#confirmTitle").textContent = title;
  $("#confirmMessage").textContent = message;
  $("#sheetBackdrop").hidden = false;
  $("#confirmSheet").hidden = false;
  state.confirmAction = onOk;
}
function closeConfirm() {
  $("#sheetBackdrop").hidden = true;
  $("#confirmSheet").hidden = true;
  state.confirmAction = null;
}
$("#confirmCancel").addEventListener("click", closeConfirm);
$("#sheetBackdrop").addEventListener("click", closeConfirm);
$("#confirmOk").addEventListener("click", () => { const fn = state.confirmAction; closeConfirm(); if (fn) fn(); });

/* ---------- navegação ---------- */

function showScreen(id, direction = "forward") {
  $$(".screen").forEach((screen) => {
    const active = screen.dataset.screen === id;
    screen.classList.remove("active", "forward", "backward");
    if (active) {
      screen.classList.add("active", direction === "back" ? "backward" : "forward");
      const body = screen.querySelector(".screen-body");
      if (body) body.scrollTop = 0;
    }
  });
  state.screen = id;
  if (ROOTS.has(id)) state.tab = id;
  $("#device").classList.toggle("immersive", !ROOTS.has(id));
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.tab));
  renderScreen(id);
}

function goTab(tab) {
  state.stack = [];
  showScreen(tab);
}
function openScreen(id) {
  if (state.screen === id) return;
  if (ROOTS.has(state.screen)) state.stack = [state.screen];
  else state.stack.push(state.screen);
  showScreen(id);
}
function goBack() {
  if (state.screen === "create" && state.create.step > 1) {
    saveCreateFields();
    state.create.step--;
    renderCreate();
    return;
  }
  const previous = state.stack.pop() || state.tab;
  showScreen(previous, "back");
}

function renderScreen(id) {
  const renderers = {
    home: renderHome, explore: renderExplore, detail: renderDetail, booking: renderBooking,
    success: renderSuccess, bookings: renderBookings, create: renderCreate, profile: renderProfile,
    notifications: renderNotifications
  };
  if (renderers[id]) renderers[id]();
  updateDots();
}

/* ---------- componentes ---------- */

function photoURL(service) {
  const name = service.image || CATEGORY_IMAGES[service.category] || "business";
  return `assets/${name}.webp`;
}

function serviceCardHTML(service, index = 0) {
  return `
    <button class="service-card" type="button" data-service="${esc(service.id)}" style="animation-delay:${Math.min(index * 24, 180)}ms">
      <span class="service-photo" style="background-image:url('${photoURL(service)}')"></span>
      <span class="service-main">
        <span class="card-title">${esc(service.title)}</span>
        <span class="company">${esc(service.company)} · ${esc(service.provider)}</span>
        <span class="service-meta">
          <span class="rating">${icon("i-star")} ${service.rating.toFixed(1)}</span>
          <span>${icon("i-clock")} ${service.duration} min</span>
          <span>${esc(service.price)}</span>
        </span>
      </span>
      <span class="service-end">${icon("i-chevron")}</span>
    </button>`;
}

function starsHTML(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    const dim = i > Math.round(rating) ? ' style="opacity:.28"' : "";
    out += `<svg class="ic" aria-hidden="true"${dim}><use href="#i-star"/></svg>`;
  }
  return out;
}

function emptyHTML(title, text, button = "") {
  return `<div class="empty-block">${icon("i-search")}<h3>${esc(title)}</h3><p>${esc(text)}</p>${button}</div>`;
}

/* ---------- home ---------- */

function renderHome() {
  const services = allServices();
  const companies = new Set(services.map((s) => s.company)).size;
  $("#homeSummary").textContent = `${services.length} serviços · ${companies} profissionais`;

  const next = sortedBookings()[0];
  $("#homeNext").innerHTML = next ? `
    <div class="next-card">
      <div class="next-time"><strong>${esc(next.time)}</strong><small>${esc(DAYS.find((d) => d.date === next.date)?.weekday || "")} ${esc(next.date.slice(8))}</small></div>
      <div class="next-info"><strong>${esc(next.sessionTitle)}</strong><span>${esc(next.company)} · ${esc(next.location)}</span></div>
      ${icon("i-chevron")}
    </div>` : `
    <div class="empty-inline">${icon("i-info")}<span>Você ainda não tem atendimentos marcados.</span><button type="button" data-tab="explore">Explorar</button></div>`;

  $("#homeCategories").innerHTML = Object.entries(CATEGORIES).map(([key, cat]) => {
    const count = services.filter((s) => s.category === key).length;
    return `<button class="chip" type="button" data-cat="${key}">${esc(cat.label)} <span class="muted">${count}</span></button>`;
  }).join("");

  const featured = [...services].sort((a, b) => b.rating - a.rating).slice(0, 4);
  $("#homeFeatured").innerHTML = featured.map((s, i) => serviceCardHTML(s, i)).join("");
}

/* ---------- explore ---------- */

function renderExplore() {
  $("#exploreChips").innerHTML = [["todas", "Todas"], ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label])]
    .map(([key, label]) => `<button class="chip ${state.explore.cat === key ? "active" : ""}" type="button" data-cat="${key}">${esc(label)}</button>`).join("");

  $$("#exploreSegment .seg").forEach((seg) => seg.classList.toggle("active", (seg.dataset.mine === "true") === state.explore.mine));

  const q = state.explore.query.trim().toLocaleLowerCase("pt-BR");
  const list = allServices().filter((s) => {
    if (state.explore.mine && !s.mine) return false;
    if (state.explore.cat !== "todas" && s.category !== state.explore.cat) return false;
    const hay = `${s.title} ${s.company} ${s.provider} ${s.short} ${s.desc} ${catOf(s.category).label}`.toLocaleLowerCase("pt-BR");
    return !q || hay.includes(q);
  });

  $("#exploreCount").textContent = `${list.length} ${list.length === 1 ? "RESULTADO" : "RESULTADOS"}`;
  $("#exploreResults").innerHTML = list.length
    ? list.map((s, i) => serviceCardHTML(s, i)).join("")
    : emptyHTML("Nada por aqui", "Tente outro termo ou escolha uma categoria diferente.", '<button class="btn btn-quiet" type="button" id="clearExplore">Limpar filtros</button>');
}

/* ---------- detalhe ---------- */

function renderDetail() {
  const service = serviceById(state.selectedId);
  if (!service) { goTab("explore"); return; }
  const cat = catOf(service.category);
  const next = firstAvailable(service);

  const preview = next ? `<div class="slot-preview"><span>${esc(DAYS[next.day].weekday)} ${esc(DAYS[next.day].day)} ${esc(next.time)}</span><span>${esc(DAYS[next.day].weekday)} ${esc(DAYS[next.day].day)} ${esc(availableTimes(service, next.day)[1] || "")}</span><em>e mais horários</em></div>` : "";

  $("#detailBody").innerHTML = `
    <div class="detail-head">
      <span class="detail-photo-square" style="background-image:url('${photoURL(service)}')"></span>
      <div>
        <span class="detail-cat">${esc(cat.label)}</span>
        <h2>${esc(service.title)}</h2>
        <p class="detail-company">${esc(service.company)} · ${esc(service.provider)}</p>
        <div class="rating-row"><span class="stars">${starsHTML(service.rating)}</span><b>${service.rating.toFixed(1)}</b><span>(${service.reviews})</span></div>
      </div>
    </div>

    <div class="detail-block"><h3>Sobre</h3><p>${esc(service.desc)}</p></div>
    <div class="detail-block"><h3>Informações</h3>
      <div class="info-rows">
        <div>${icon("i-clock")}<span>Duração</span><strong>${service.duration} min</strong></div>
        <div>${icon("i-wallet")}<span>Valor</span><strong>${esc(service.price)}</strong></div>
        <div>${icon("i-pin")}<span>Local</span><strong>${esc(service.location)}</strong></div>
      </div>
    </div>
    <div class="detail-block"><h3>Horários</h3>${preview || '<p class="muted">Sem horários disponíveis no momento.</p>'}</div>`;

  $("#detailFooter").innerHTML = `<button class="btn btn-primary btn-block" type="button" id="goBooking" ${next ? "" : "disabled"}>${next ? "Escolher horário" : "Sem horários disponíveis"} ${icon("i-arrow")}</button>`;
}

/* ---------- agendamento ---------- */

function renderBooking() {
  const service = serviceById(state.selectedId);
  if (!service) { goTab("explore"); return; }
  const firstDay = DAYS.findIndex((_, i) => availableTimes(service, i).length > 0);
  if (state.booking.day === null || !(service.schedule[state.booking.day] || []).length) state.booking.day = Math.max(firstDay, 0);
  state.booking.time = null;

  $("#bookingBody").innerHTML = `
    <div class="detail-block" style="margin-top:18px">
      <div class="booking-mini">
        <span class="booking-photo" style="background-image:url('${photoURL(service)}')"></span>
        <div><strong>${esc(service.title)}</strong><span>${esc(service.company)} · ${service.duration} min · ${esc(service.price)}</span></div>
      </div>
    </div>
    <div class="section-head"><h3>Escolha o dia</h3></div>
    <div class="day-strip" id="dayStrip"></div>
    <div class="section-head"><h3>Horários disponíveis</h3></div>
    <div class="time-grid" id="timeGrid"></div>
    <div class="section-head"><h3>Seus dados</h3></div>
    <div class="error-summary" id="bookingErrors" role="alert" tabindex="-1" aria-labelledby="bookingErrorsTitle" hidden>
      <h4 id="bookingErrorsTitle">Confira os campos abaixo</h4><ul id="bookingErrorsList"></ul>
    </div>
    <div class="form-grid">
      <div class="field" id="nameField"><label for="bookName">Nome completo</label>
        <input id="bookName" type="text" placeholder="Seu nome" value="${esc(state.user.name)}" maxlength="80" autocomplete="name" aria-required="true" aria-describedby="bookNameError" /><span class="field-error" id="bookNameError">Informe seu nome.</span></div>
      <div class="field" id="phoneField"><label for="bookPhone">Telefone</label>
        <input id="bookPhone" type="tel" placeholder="(11) 99999-0000" value="${esc(state.user.phone)}" maxlength="20" autocomplete="tel" aria-required="true" aria-describedby="bookPhoneError" /><span class="field-error" id="bookPhoneError">Informe um telefone válido.</span></div>
    </div>
    <div class="summary-box"><span>RESUMO DO AGENDAMENTO</span>
      <div><span>Serviço</span><b id="sumService">—</b></div>
      <div><span>Data</span><b id="sumDay">—</b></div>
      <div><span>Horário</span><b id="sumTime">—</b></div>
      <div><span>Local</span><b id="sumLocation">—</b></div>
    </div>`;

  renderDays();
  renderTimes();
  updateSummary();
  validateBookingBtn();

  ["bookName", "bookPhone"].forEach((id) => {
    $("#" + id).addEventListener("input", () => {
      const field = id === "bookName" ? $("#nameField") : $("#phoneField");
      field.classList.remove("invalid");
      $("#" + id).setAttribute("aria-invalid", "false");
      clearErrorSummary("bookingErrors");
      validateBookingBtn();
    });
    $("#" + id).addEventListener("blur", () => {
      const valid = id === "bookName" ? $("#" + id).value.trim().length >= 3 : $("#" + id).value.replace(/\D/g, "").length >= 10;
      const field = id === "bookName" ? $("#nameField") : $("#phoneField");
      field.classList.toggle("invalid", !valid);
      $("#" + id).setAttribute("aria-invalid", String(!valid));
    });
  });
}

function renderDays() {
  const service = serviceById(state.selectedId);
  if (!service) return;
  $("#dayStrip").innerHTML = DAYS.map((d, i) => {
    const count = availableTimes(service, i).length;
    const disabled = count === 0;
    return `<button class="day-card ${state.booking.day === i ? "active" : ""} ${disabled ? "disabled" : ""}" type="button" data-day="${i}" ${disabled ? "disabled" : ""}>
      <small>${esc(d.weekday)}</small><strong>${esc(d.day)}</strong><em>${esc(d.month)}</em>
    </button>`;
  }).join("");
}

function renderTimes() {
  const service = serviceById(state.selectedId);
  if (!service || state.booking.day === null) return;
  const times = service.schedule[state.booking.day] || [];
  $("#timeGrid").innerHTML = times.map((time) => {
    const booked = isSlotBooked(service.id, dayDate(state.booking.day), time);
    return `<button class="time-btn ${state.booking.time === time ? "active" : ""}" type="button" data-time="${esc(time)}" ${booked ? "disabled" : ""}>${esc(time)}</button>`;
  }).join("");
}

function updateSummary() {
  const service = serviceById(state.selectedId);
  if (!service) return;
  $("#sumService").textContent = service.title;
  $("#sumDay").textContent = state.booking.day === null ? "—" : longDate(dayDate(state.booking.day));
  $("#sumTime").textContent = state.booking.time || "—";
  $("#sumLocation").textContent = service.location;
}

function validateBookingBtn() {
  const name = $("#bookName")?.value.trim() || "";
  const phone = $("#bookPhone")?.value.replace(/\D/g, "") || "";
  $("#confirmBookingBtn").disabled = !(state.booking.day !== null && state.booking.time && name.length >= 3 && phone.length >= 10);
}

function confirmBooking() {
  const name = $("#bookName").value.trim();
  const phone = $("#bookPhone").value.trim();
  const digits = phone.replace(/\D/g, "");
  const badName = name.length < 3;
  const badPhone = digits.length < 10;
  const badSlot = state.booking.day === null || !state.booking.time;
  $("#nameField").classList.toggle("invalid", badName);
  $("#phoneField").classList.toggle("invalid", badPhone);
  $("#bookName").setAttribute("aria-invalid", String(badName));
  $("#bookPhone").setAttribute("aria-invalid", String(badPhone));
  const errors = [];
  if (badName) errors.push({ id: "bookName", label: "Informe seu nome completo." });
  if (badPhone) errors.push({ id: "bookPhone", label: "Informe um telefone com DDD." });
  if (badSlot) errors.push({ id: "dayStrip", label: "Escolha um dia e um horário disponível." });
  if (errors.length) {
    showErrorSummary("bookingErrors", "bookingErrorsList", errors);
    return;
  }
  clearErrorSummary("bookingErrors");
  const date = dayDate(state.booking.day);
  if (state.bookings.some((b) => b.date === date && b.time === state.booking.time)) {
    toast("Horário conflitante", `Você já tem um atendimento em ${longDate(date)} às ${state.booking.time}.`, "error");
    return;
  }
  const service = serviceById(state.selectedId);
  const booking = {
    id: `bk-${Date.now()}`,
    serviceId: service.id, sessionTitle: service.title, company: service.company,
    category: service.category, location: service.location, provider: service.provider,
    duration: service.duration, date, time: state.booking.time,
    name, phone, bairro: state.user.bairro, code: code6(), createdAt: new Date().toISOString()
  };
  state.bookings.push(booking);
  writeStore(KEYS.bookings, state.bookings);
  state.lastBooking = booking;
  state.stack = [];
  refresh();
  showScreen("success");
}

/* ---------- sucesso ---------- */

function renderSuccess() {
  const b = state.lastBooking;
  if (!b) { goTab("home"); return; }
  $("#successBody").innerHTML = `
    <div class="success-mark">${icon("i-check")}</div>
    <div class="success">${icon("i-sparkles")}<span class="success-kicker">AGENDAMENTO CONFIRMADO</span></div>
    <h2>Seu horário está garantido!</h2>
    <p class="success-sub">Apresente o código ao profissional no dia do atendimento.</p>
    <div class="ticket">
      <div class="ticket-code"><span>CÓDIGO DE CONFIRMAÇÃO</span><strong>${esc(b.code)}</strong></div>
      <div class="ticket-details">
        <div><span>SERVIÇO</span><strong>${esc(b.sessionTitle)}</strong></div>
        <div><span>EMPRESA</span><strong>${esc(b.company)}</strong></div>
        <div><span>DATA</span><strong>${esc(longDate(b.date))}</strong></div>
        <div><span>HORÁRIO</span><strong>${esc(b.time)} · ${b.duration} min</strong></div>
        <div><span>LOCAL</span><strong>${esc(b.location)}</strong></div>
        <div><span>CLIENTE</span><strong>${esc(b.name)}</strong></div>
      </div>
    </div>
    <div class="success-actions">
      <button class="btn btn-primary btn-block" type="button" data-tab="bookings">Ver minha agenda ${icon("i-arrow")}</button>
      <button class="btn btn-quiet btn-block" type="button" data-action="copy-code">${icon("i-copy")} Copiar código</button>
      <button class="btn btn-quiet btn-block" type="button" data-tab="home">Voltar ao início</button>
    </div>`;
}

/* ---------- minha agenda ---------- */

function renderBookings() {
  const list = sortedBookings();
  $("#bookingsCount").textContent = String(list.length);
  $$("#bookingSegment .seg").forEach((seg) => seg.classList.toggle("active", seg.dataset.status === state.bookingsTab));

  const today = new Date().toISOString().slice(0, 10);
  const filtered = list.filter((b) => state.bookingsTab === "upcoming" ? b.date >= today : b.date < today);

  $("#bookingsList").innerHTML = filtered.length ? filtered.map((b, i) => {
    const cat = catOf(b.category);
    return `<div class="booking-item ${state.bookingsTab === "past" ? "past" : ""}" style="animation-delay:${Math.min(i * 30, 200)}ms">
      <div class="booking-top"><h4>${esc(b.sessionTitle)}</h4><span class="when">${esc(b.date.slice(8))}/${esc(b.date.slice(5, 7))} · ${esc(b.time)}</span></div>
      <p class="booking-sub">${esc(b.company)} · ${esc(b.provider)}</p>
      <div class="booking-tags"><span>${esc(cat.label)}</span><span>${icon("i-pin")} ${esc(b.location)}</span><span class="code">${esc(b.code)}</span></div>
      ${state.bookingsTab === "upcoming" ? `<div class="booking-actions">
        <button type="button" data-ics="${esc(b.id)}">${icon("i-download")} Adicionar ao calendário</button>
        <button type="button" class="danger" data-cancel="${esc(b.id)}">${icon("i-trash")} Cancelar</button>
      </div>` : ""}
    </div>`;
  }).join("") : emptyHTML(
    state.bookingsTab === "upcoming" ? "Nenhum atendimento marcado" : "Nada no histórico",
    state.bookingsTab === "upcoming" ? "Explore os serviços e escolha um horário para começar." : "Seus atendimentos realizados aparecerão aqui.",
    state.bookingsTab === "upcoming" ? '<button class="btn btn-primary" type="button" data-tab="explore">Explorar serviços</button>' : ""
  );
}

function cancelBooking(id) {
  const b = state.bookings.find((item) => item.id === id);
  if (!b) return;
  askConfirm("Cancelar agendamento?", `A vaga de “${b.sessionTitle}” em ${longDate(b.date)} às ${b.time} voltará a ficar disponível.`, () => {
    state.bookings = state.bookings.filter((item) => item.id !== id);
    writeStore(KEYS.bookings, state.bookings);
    refresh();
    toast("Agendamento cancelado", "A vaga já está disponível para outro cliente.", "tip");
  });
}

function downloadICS(b) {
  const start = new Date(`${b.date}T${b.time}:00`);
  const end = new Date(start.getTime() + b.duration * 60000);
  const fmt = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Agenda Facil//Agendamentos//PT", "BEGIN:VEVENT",
    `UID:${b.code}@agendafacil.local`, `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${b.sessionTitle} - ${b.company}`, `LOCATION:${b.location}`, `DESCRIPTION:Código ${b.code}. ${b.provider}.`, "END:VEVENT", "END:VCALENDAR"];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `agenda-facil-${b.code}.ics`; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Arquivo gerado", "O evento foi salvo para abrir no seu calendário.", "ok");
}

/* ---------- cadastro de serviço ---------- */

function saveCreateFields() {
  const d = state.create.data;
  const map = { fTitle:"title", fCompany:"company", fCategory:"category", fShort:"short", fDesc:"desc", fDuration:"duration", fPrice:"price", fLocation:"location", fContact:"contact" };
  Object.entries(map).forEach(([id, key]) => { const el = document.getElementById(id); if (el) d[key] = el.value; });
}

function renderCreate() {
  const c = state.create;
  const d = c.data;
  $("#createProgress").style.width = `${(c.step / 3) * 100}%`;

  let body = "";
  let footer = "";

  if (c.step === 1) {
    body = `<div class="create-head"><span class="mono">ETAPA 1 DE 3</span><h2>Conte sobre o serviço</h2><p>Comece pelo básico: as pessoas vão encontrar seu serviço por aqui.</p></div>
      <div class="form-grid">
        <div class="field"><label for="fTitle">Nome do serviço</label><input id="fTitle" type="text" placeholder="Ex.: Oficina de Fotografia" value="${esc(d.title)}" maxlength="60" /></div>
        <div class="two-col">
          <div class="field"><label for="fCompany">Empresa ou equipe</label><input id="fCompany" type="text" placeholder="Ex.: Estúdio Forma" value="${esc(d.company)}" maxlength="50" /></div>
          <div class="field"><label for="fCategory">Categoria</label><select id="fCategory">${Object.entries(CATEGORIES).map(([k, cat]) => `<option value="${k}" ${d.category === k ? "selected" : ""}>${esc(cat.label)}</option>`).join("")}</select></div>
        </div>
        <div class="field"><label for="fShort">Resumo curto</label><input id="fShort" type="text" placeholder="Uma frase que desperta interesse" value="${esc(d.short)}" maxlength="100" /></div>
      </div>
      <p class="hint">Dica: use um nome direto. “Consultoria de Carreira” funciona melhor que “Ajuda”.</p>`;
    footer = `<button class="btn btn-primary btn-block" type="button" id="createNext">Continuar ${icon("i-arrow")}</button>`;
  } else if (c.step === 2) {
    body = `<div class="create-head"><span class="mono">ETAPA 2 DE 3</span><h2>Detalhes e valor</h2><p>Quanto tempo dura, quanto custa e onde o atendimento acontece.</p></div>
      <div class="form-grid">
        <div class="field"><label for="fDesc">Descrição</label><textarea id="fDesc" placeholder="O que acontece no atendimento? O que a pessoa leva?" maxlength="500">${esc(d.desc)}</textarea></div>
        <div class="two-col">
          <div class="field"><label for="fDuration">Duração</label><select id="fDuration">${[30,45,60,90].map((m) => `<option value="${m}" ${Number(d.duration) === m ? "selected" : ""}>${m} minutos</option>`).join("")}</select></div>
          <div class="field"><label for="fPrice">Valor</label><input id="fPrice" type="text" placeholder="Gratuito ou R$ 20" value="${esc(d.price)}" maxlength="24" /></div>
        </div>
        <div class="field"><label for="fLocation">Endereço ou ponto de referência</label><input id="fLocation" type="text" placeholder="Ex.: Rua das Flores, 88" value="${esc(d.location)}" maxlength="60" /></div>
        <div class="field"><label for="fContact">Contato da empresa</label><input id="fContact" type="text" placeholder="E-mail ou telefone" value="${esc(d.contact)}" maxlength="80" /></div>
      </div>`;
    footer = `<button class="btn btn-primary btn-block" type="button" id="createNext">Continuar ${icon("i-arrow")}</button>`;
  } else {
    body = `<div class="create-head"><span class="mono">ETAPA 3 DE 3</span><h2>Disponibilidade</h2><p>Escolha os dias e os horários que você pode atender.</p></div>
      <div class="detail-block" style="margin-top:0"><h3>Dias disponíveis</h3><div class="pick-grid">${DAYS.map((day, i) => `<button class="pick-btn ${d.days.includes(i) ? "active" : ""}" type="button" data-pick-day="${i}">${esc(day.weekday)} ${esc(day.day)}</button>`).join("")}</div></div>
      <div class="detail-block"><h3>Horários de atendimento</h3><div class="pick-grid">${CREATE_TIMES.map((t) => `<button class="pick-btn ${d.times.includes(t) ? "active" : ""}" type="button" data-pick-time="${esc(t)}">${esc(t)}</button>`).join("")}</div><p class="hint">Toque para selecionar ou remover. Você poderá editar depois recriando o serviço.</p></div>
      <div class="create-review"><h4>Resumo do serviço</h4>
        <div><span>Nome</span><b>${esc(d.title || "—")}</b></div>
        <div><span>Empresa</span><b>${esc(d.company || "—")}</b></div>
        <div><span>Categoria</span><b>${esc(catOf(d.category).label)}</b></div>
        <div><span>Duração / valor</span><b>${esc(String(d.duration))} min · ${esc(d.price || "—")}</b></div>
        <div><span>Disponibilidade</span><b>${d.days.length} dia(s) · ${d.times.length} horário(s)</b></div>
      </div>`;
    footer = `<button class="btn btn-primary btn-block" type="button" id="createNext">${icon("i-check")} Publicar serviço</button>`;
  }

  const summaryHTML = `<div class="error-summary" id="createErrors" role="alert" tabindex="-1" aria-labelledby="createErrorsTitle" hidden><h4 id="createErrorsTitle">Confira os campos</h4><ul id="createErrorsList"></ul></div>`;
  $("#createBody").innerHTML = summaryHTML + body;
  $("#createFooter").innerHTML = footer;
}

function nextCreateStep() {
  const d = state.create.data;
  saveCreateFields();
  const step = state.create.step;
  const errors = [];
  if (step === 1) {
    if (d.title.trim().length < 4) errors.push({ id: "fTitle", label: "Dê um nome com pelo menos 4 caracteres." });
    if (d.company.trim().length < 2) errors.push({ id: "fCompany", label: "Informe a empresa ou equipe." });
    if (d.short.trim().length < 8) errors.push({ id: "fShort", label: "Escreva um resumo com pelo menos 8 caracteres." });
  }
  if (step === 2) {
    if (d.desc.trim().length < 12) errors.push({ id: "fDesc", label: "Descreva o serviço em pelo menos 12 caracteres." });
    if (d.location.trim().length < 3) errors.push({ id: "fLocation", label: "Informe onde o atendimento acontece." });
    if (d.contact.trim().length < 6) errors.push({ id: "fContact", label: "Informe um e-mail ou telefone de contato." });
  }
  if (step === 3) {
    if (!d.days.length) errors.push({ id: "createBody", label: "Selecione pelo menos um dia disponível." });
    if (!d.times.length) errors.push({ id: "createBody", label: "Selecione pelo menos um horário de atendimento." });
  }
  if (errors.length) { showErrorSummary("createErrors", "createErrorsList", errors); return; }
  clearErrorSummary("createErrors");
  if (step < 3) {
    state.create.step++;
    renderCreate();
    return;
  }

  const cat = catOf(d.category);
  const schedule = {};
  d.days.forEach((dayIndex) => { schedule[dayIndex] = [...d.times]; });
  const service = {
    id: `my-${Date.now()}`, title: d.title.trim(), company: d.company.trim(), category: d.category,
    short: d.short.trim(), desc: d.desc.trim(), duration: Number(d.duration), price: d.price.trim() || "Gratuito",
    rating: 5, reviews: 0, location: d.location.trim(), provider: state.user.name, role: d.contact.trim(),
    includes: ["Atendimento individual", "Horário reservado via app", "Informações enviadas no agendamento"],
    image: CATEGORY_IMAGES[d.category] || "business",
    schedule, mine: true, createdAt: new Date().toISOString()
  };
  state.myServices.unshift(service);
  writeStore(KEYS.services, state.myServices);
  state.create = freshCreate();
  state.explore.mine = true;
  state.explore.cat = "todas";
  state.explore.query = "";
  $("#exploreSearch").value = "";
  refresh();
  goTab("explore");
  toast("Serviço publicado", "Ele já aparece em Meus serviços com seus horários.", "ok");
}

/* ---------- perfil ---------- */

function renderProfile() {
  $("#profileBody").innerHTML = `
    <div class="profile-hero">
      <div class="big-avatar">${esc(initials(state.user.name))}</div>
      <h2>${esc(state.user.name)}</h2>
      <p>${esc(state.user.bairro)} · cliente Agenda Fácil</p>
      <button class="btn btn-quiet" type="button" data-action="edit-profile">${icon("i-edit")} ${state.editProfile ? "Fechar edição" : "Editar perfil"}</button>
    </div>
    ${state.editProfile ? `<div class="profile-edit form-grid">
      <div class="field"><label for="pName">Nome</label><input id="pName" type="text" value="${esc(state.user.name)}" maxlength="80" /></div>
      <div class="two-col">
        <div class="field"><label for="pPhone">Telefone</label><input id="pPhone" type="tel" value="${esc(state.user.phone)}" maxlength="20" /></div>
        <div class="field"><label for="pBairro">Bairro</label><input id="pBairro" type="text" value="${esc(state.user.bairro)}" maxlength="40" /></div>
      </div>
      <button class="btn btn-primary btn-block" type="button" data-action="save-profile">${icon("i-check")} Salvar alterações</button>
    </div>` : ""}
    <div class="stat-row">
      <div><strong>${state.bookings.length}</strong><small>agendamentos</small></div>
      <div><strong>${state.myServices.length}</strong><small>serviços publicados</small></div>
      <div><strong>4.9</strong><small>sua avaliação</small></div>
    </div>
    <div class="menu-group"><span class="mono">SUA CONTA</span><div class="menu-card">
      <button class="menu-row" type="button" data-action="my-services">${icon("i-briefcase")}<span>Meus serviços<small>Gerencie o que você publicou</small></span>${icon("i-chevron")}</button>
      <button class="menu-row" type="button" data-go="notifications">${icon("i-bell")}<span>Notificações<small>Atendimentos e novidades</small></span>${icon("i-chevron")}</button>
      <button class="menu-row" type="button" data-go="help">${icon("i-help")}<span>Central de ajuda<small>Dúvidas frequentes</small></span>${icon("i-chevron")}</button>
    </div></div>
    <div class="menu-group"><span class="mono">PREFERÊNCIAS</span><div class="menu-card">
      <div class="menu-row">${icon("i-bell")}<span>Notificações no app</span><button class="switch ${state.prefs.notifications ? "on" : ""}" type="button" data-pref="notifications" aria-label="Alternar notificações"></button></div>
      <div class="menu-row">${icon("i-clock")}<span>Lembrete 15 min antes</span><button class="switch ${state.prefs.reminders ? "on" : ""}" type="button" data-pref="reminders" aria-label="Alternar lembretes"></button></div>
    </div></div>
    <div class="menu-group"><span class="mono">DEMONSTRAÇÃO</span><div class="menu-card">
      <button class="menu-row danger" type="button" data-action="reset">${icon("i-refresh")}<span>Redefinir demonstração<small>Apaga agendamentos e serviços criados</small></span>${icon("i-chevron")}</button>
    </div></div>`;
}

function saveProfile() {
  const name = $("#pName").value.trim();
  const phone = $("#pPhone").value.trim();
  if (name.length < 3 || phone.replace(/\D/g, "").length < 10) {
    toast("Dados incompletos", "Informe nome e um telefone válido.", "error"); return;
  }
  const bairro = $("#pBairro").value.trim() || "Vila Nova";
  state.user = { name, phone, bairro };
  writeStore(KEYS.user, state.user);
  state.editProfile = false;
  refresh();
  toast("Perfil atualizado", "Seus dados foram salvos neste navegador.", "ok");
}

/* ---------- notificações ---------- */

function renderNotifications() {
  const items = [
    { icon:"i-sparkles", tone:"", title:"Bem-vindo à Agenda Fácil", text:"Explore serviços perto de você, reserve horários e cadastre o seu próprio atendimento.", time:"HOJE" },
    ...sortedBookings().map((b) => ({ icon:"i-calendar", tone:"", title:"Atendimento confirmado", text:`${b.sessionTitle} · ${longDate(b.date)} às ${b.time}. Código ${b.code}.`, time:"AGENDADO" })),
    ...state.myServices.map((s) => ({ icon:"i-briefcase", tone:"amber", title:"Seu serviço está no ar", text:`“${s.title}” já pode ser encontrado em Meus serviços.`, time:"PUBLICADO" }))
  ];
  $("#notificationsBody").innerHTML = items.map((n, i) => `<div class="notif-item ${!state.notifRead && i < 2 ? "unread" : ""}">
    <span class="notif-ic ${n.tone}">${icon(n.icon)}</span>
    <div><strong>${esc(n.title)}</strong><p>${esc(n.text)}</p><time>${esc(n.time)}</time></div>
  </div>`).join("");
}

function updateDots() {
  const unread = !state.notifRead;
  [$("#notifDot"), $("#notifDot2"), $("#notifDot3")].forEach((dot) => { if (dot) dot.hidden = !unread; });
  $("#tabBadge").hidden = state.bookings.length === 0;
  $("#tabBadgeText").textContent = state.bookings.length === 1 ? "1 agendamento" : `${state.bookings.length} agendamentos`;
}

/* ---------- ações globais ---------- */

document.addEventListener("click", (e) => {
  const target = e.target;

  const tabBtn = target.closest("[data-tab]");
  if (tabBtn) { goTab(tabBtn.dataset.tab); return; }

  const goBtn = target.closest("[data-go]");
  if (goBtn) { openScreen(goBtn.dataset.go); return; }

  if (target.closest("[data-back]")) { goBack(); return; }

  const serviceBtn = target.closest("[data-service]");
  if (serviceBtn) {
    state.selectedId = serviceBtn.dataset.service;
    state.booking = { day: null, time: null };
    openScreen("detail");
    return;
  }

  const catBtn = target.closest("[data-cat]");
  if (catBtn) {
    state.explore.cat = catBtn.dataset.cat;
    if (state.screen !== "explore") goTab("explore"); else renderExplore();
    return;
  }

  const segBtn = target.closest(".seg");
  if (segBtn && segBtn.closest("#exploreSegment")) {
    state.explore.mine = segBtn.dataset.mine === "true";
    renderExplore();
    return;
  }
  if (segBtn && segBtn.closest("#bookingSegment")) {
    state.bookingsTab = segBtn.dataset.status;
    renderBookings();
    return;
  }

  const dayBtn = target.closest("[data-day]");
  if (dayBtn && !dayBtn.disabled) {
    state.booking.day = Number(dayBtn.dataset.day);
    state.booking.time = null;
    renderDays(); renderTimes(); updateSummary(); validateBookingBtn();
    return;
  }

  const timeBtn = target.closest("[data-time]");
  if (timeBtn && !timeBtn.disabled) {
    state.booking.time = timeBtn.dataset.time;
    renderTimes(); updateSummary(); validateBookingBtn();
    return;
  }

  if (target.closest("#goBooking")) {
    const service = serviceById(state.selectedId);
    const first = firstAvailable(service);
    state.booking = { day: first ? first.day : null, time: null };
    openScreen("booking");
    return;
  }
  if (target.closest("#confirmBookingBtn")) { confirmBooking(); return; }

  const icsBtn = target.closest("[data-ics]");
  if (icsBtn) {
    const b = state.bookings.find((item) => item.id === icsBtn.dataset.ics);
    if (b) downloadICS(b);
    return;
  }
  const cancelBtn = target.closest("[data-cancel]");
  if (cancelBtn) { cancelBooking(cancelBtn.dataset.cancel); return; }

  if (target.closest("#createNext")) { nextCreateStep(); return; }
  if (target.closest("#createBack")) { goBack(); return; }

  const pickDay = target.closest("[data-pick-day]");
  if (pickDay) {
    const i = Number(pickDay.dataset.pickDay);
    const days = state.create.data.days;
    const at = days.indexOf(i);
    if (at >= 0) days.splice(at, 1); else days.push(i);
    pickDay.classList.toggle("active", at < 0);
    clearErrorSummary("createErrors");
    return;
  }
  const pickTime = target.closest("[data-pick-time]");
  if (pickTime) {
    const t = pickTime.dataset.pickTime;
    const times = state.create.data.times;
    const at = times.indexOf(t);
    if (at >= 0) times.splice(at, 1); else times.push(t);
    pickTime.classList.toggle("active", at < 0);
    clearErrorSummary("createErrors");
    return;
  }

  const prefBtn = target.closest("[data-pref]");
  if (prefBtn) {
    const key = prefBtn.dataset.pref;
    state.prefs[key] = !state.prefs[key];
    writeStore(KEYS.prefs, state.prefs);
    prefBtn.classList.toggle("on", state.prefs[key]);
    return;
  }

  const action = target.closest("[data-action]")?.dataset.action;
  if (action === "edit-profile") { state.editProfile = !state.editProfile; renderProfile(); return; }
  if (action === "save-profile") { saveProfile(); return; }
  if (action === "my-services") { state.explore.mine = true; state.explore.cat = "todas"; state.explore.query = ""; $("#exploreSearch").value = ""; goTab("explore"); return; }
  if (action === "copy-code") {
    const code = state.lastBooking?.code || "";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => toast("Código copiado", code, "ok")).catch(() => toast("Seu código", code, "tip"));
    } else toast("Seu código", code, "tip");
    return;
  }
  if (action === "reset") {
    askConfirm("Redefinir demonstração?", "Todos os agendamentos e serviços criados serão removidos deste navegador.", () => {
      state.bookings = []; state.myServices = []; state.notifRead = false;
      [KEYS.bookings, KEYS.services, KEYS.notif].forEach((key) => { try { localStorage.removeItem(key); } catch {} });
      state.explore = { query:"", cat:"todas", mine:false }; $("#exploreSearch").value = "";
      state.create = freshCreate();
      refresh();
      goTab("home");
      toast("Demonstração reiniciada", "Tudo voltou ao estado inicial.", "ok");
    });
    return;
  }

  if (target.closest("#markRead")) {
    state.notifRead = true;
    writeStore(KEYS.notif, true);
    renderNotifications(); updateDots();
    toast("Tudo em dia", "Notificações marcadas como lidas.", "ok");
    return;
  }
  if (target.closest("#clearExplore")) {
    state.explore = { query:"", cat:"todas", mine:false };
    $("#exploreSearch").value = "";
    renderExplore();
  }
});

$("#exploreSearch").addEventListener("input", (e) => { state.explore.query = e.target.value; renderExplore(); });

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!$("#confirmSheet").hidden) { closeConfirm(); return; }
  if (!ROOTS.has(state.screen)) goBack();
});

function refresh() {
  renderHome();
  renderExplore();
  renderBookings();
  renderProfile();
  renderNotifications();
  if (state.screen === "detail") renderDetail();
  if (state.screen === "success") renderSuccess();
  updateDots();
}

function updateClock() {
  $("#clock").textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

updateClock();
setInterval(updateClock, 30000);
refresh();
showScreen("home");
