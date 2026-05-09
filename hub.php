<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BraiamBank</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/@primer/css@21.0.7/dist/primer.css">
  <link href="CSS/primer.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['DM Sans', 'sans-serif'],
            display: ['Fraunces', 'serif'],
          },
          colors: {
            navy: { 900: '#0d1b4b', 800: '#122060', 700: '#1a2c7a' },
            amber: { 400: '#f5a623', 500: '#e8971a' },
            sidebar: '#0f172a',
          }
        }
      }
    }
  </script>
  <style>
    * { box-sizing: border-box; }

    html, body {
      margin: 0; padding: 0;
      width: 100%; height: 100%;
      font-family: 'DM Sans', sans-serif;
    }

    /* ── App shell ── */
    .app-shell {
      display: flex;
      width: 100%;
      min-height: 100vh;
    }

    /* ══════════════════════════════
       SIDEBAR — desktop full
    ══════════════════════════════ */
    .sidebar {
      width: 220px;
      flex-shrink: 0;
      background: #ffffff;
      border-right: 1px solid #e8ecf0;
      display: flex;
      flex-direction: column;
      padding: 28px 16px;
      gap: 28px;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      transition: width 0.25s ease, padding 0.25s ease;
      z-index: 20;
    }

    .brand {
      font-family: 'Fraunces', serif;
      font-weight: 900;
      font-size: 1.15rem;
      color: #0d1b4b;
      letter-spacing: -0.5px;
      white-space: nowrap;
      overflow: hidden;
    }

    .nav-section { display: flex; flex-direction: column; gap: 2px; }

    .nav-label {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #94a3b8;
      padding: 0 10px;
      margin-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #475569;
      transition: background 0.18s, color 0.18s;
      text-decoration: none;
      user-select: none;
      white-space: nowrap;
      overflow: hidden;
    }
    .nav-item:hover { background: #f1f5f9; color: #0d1b4b; }
    .nav-item.active { background: #eef2ff; color: #0d1b4b; font-weight: 600; }
    .nav-item svg { width: 17px; height: 17px; flex-shrink: 0; opacity: 0.7; }
    .nav-item.active svg { opacity: 1; }
    .nav-text { transition: opacity 0.2s; }

    /* ══════════════════════════════
       SIDEBAR — tablet (icon rail)
    ══════════════════════════════ */
    @media (max-width: 1023px) and (min-width: 641px) {
      .sidebar {
        width: 64px;
        padding: 28px 10px;
        gap: 20px;
        align-items: center;
      }
      .brand { font-size: 0; }         /* hide text, keep element */
      .brand::before {
        content: 'B';
        font-family: 'Fraunces', serif;
        font-size: 1.15rem;
        font-weight: 900;
        color: #0d1b4b;
      }
      .nav-label { opacity: 0; height: 0; margin: 0; padding: 0; }
      .nav-text { opacity: 0; width: 0; overflow: hidden; }
      .nav-item { justify-content: center; padding: 10px; gap: 0; border-radius: 10px; }
      .nav-item svg { width: 20px; height: 20px; }
    }

    /* ══════════════════════════════
       SIDEBAR — mobile (hidden)
    ══════════════════════════════ */
    @media (max-width: 640px) {
      .sidebar { display: none; }
    }

    /* ══════════════════════════════
       DRAWER (mobile slide-in)
    ══════════════════════════════ */
    .drawer-overlay {
      display: none;
      position: fixed; inset: 0;
      background: rgba(0,0,0,.4);
      z-index: 40;
      opacity: 0;
      transition: opacity 0.25s;
    }
    .drawer {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 240px;
      background: #fff;
      z-index: 50;
      transform: translateX(-100%);
      transition: transform 0.28s cubic-bezier(.4,0,.2,1);
      padding: 28px 16px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .drawer.open { transform: translateX(0); }
    .drawer-overlay.open { opacity: 1; }

    @media (max-width: 640px) {
      .drawer-overlay { display: block; pointer-events: none; }
      .drawer-overlay.open { pointer-events: all; }
    }

    .drawer .brand {
      font-family: 'Fraunces', serif;
      font-weight: 900;
      font-size: 1.15rem;
      color: #0d1b4b;
    }
    .drawer .nav-section { display: flex; flex-direction: column; gap: 2px; }
    .drawer .nav-label {
      font-size: 0.65rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 1.2px;
      color: #94a3b8; padding: 0 10px; margin-bottom: 6px;
    }
    .drawer .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 10px;
      font-size: 0.9rem; font-weight: 500;
      color: #475569; text-decoration: none; cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .drawer .nav-item:hover { background: #f1f5f9; color: #0d1b4b; }
    .drawer .nav-item.active { background: #eef2ff; color: #0d1b4b; font-weight: 600; }
    .drawer .nav-item svg { width: 18px; height: 18px; flex-shrink: 0; opacity: 0.7; }
    .drawer .nav-item.active svg { opacity: 1; }

    /* ══════════════════════════════
       MAIN
    ══════════════════════════════ */
    .main {
      flex: 1;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      min-width: 0;
    }

    /* top bar */
    .topbar {
      height: 52px;
      background: #ffffff;
      border-bottom: 1px solid #e8ecf0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      flex-shrink: 0;
      position: sticky; top: 0; z-index: 10;
    }

    .topbar-left { display: flex; align-items: center; gap: 12px; }

    .hamburger {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: #475569;
      border-radius: 8px;
      transition: background 0.15s;
    }
    .hamburger:hover { background: #f1f5f9; }
    .hamburger svg { width: 20px; height: 20px; display: block; }

    @media (max-width: 640px) { .hamburger { display: flex; } }

    .topbar-title {
      font-size: 0.78rem;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .topbar-actions { display: flex; align-items: center; gap: 10px; }

    .avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0d1b4b, #f5a623);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; font-weight: 700; color: #fff;
      cursor: pointer; flex-shrink: 0;
    }

    /* content */
    .content {
      padding: 36px 32px 40px;
      flex: 1;
    }

    .page-heading {
      font-family: 'Fraunces', serif;
      font-size: 1.75rem;
      font-weight: 900;
      color: #0d1b4b;
      margin: 0 0 28px;
      letter-spacing: -0.5px;
    }

    /* ══════════════════════════════
       CARDS GRID
    ══════════════════════════════ */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    /* tablet: 2 columns */
    @media (max-width: 1023px) {
      .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    }

    /* mobile: 2 columns tighter */
    @media (max-width: 640px) {
      .content { padding: 24px 16px 100px; }
      .page-heading { font-size: 1.4rem; margin-bottom: 20px; }
      .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    }

    .class-card {
      display: flex; flex-direction: column;
      gap: 10px; cursor: pointer;
    }

    .card-visual {
      border-radius: 16px;
      aspect-ratio: 1 / 0.85;
      display: flex;
      align-items: flex-start;
      padding: 18px;
      position: relative;
      overflow: hidden;
      transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
    }

    .class-card:hover .card-visual {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 18px 40px rgba(0,0,0,.18);
    }

    .card-navy {
      background: linear-gradient(145deg, #122060 0%, #0d1b4b 100%);
      box-shadow: 0 8px 24px rgba(13,27,75,.25);
    }
    .card-amber {
      background: linear-gradient(145deg, #f5b730 0%, #e8921a 100%);
      box-shadow: 0 8px 24px rgba(232,150,26,.3);
    }

    .card-visual::before {
      content: '';
      position: absolute;
      width: 140px; height: 140px; border-radius: 50%;
      right: -35px; bottom: -40px;
      background: rgba(255,255,255,.07);
    }
    .card-visual::after {
      content: '';
      position: absolute;
      width: 80px; height: 80px; border-radius: 50%;
      right: 40px; bottom: -10px;
      background: rgba(255,255,255,.05);
    }

    .card-label {
      font-family: 'Fraunces', serif;
      font-size: 1.1rem; font-weight: 700;
      color: #ffffff; line-height: 1.2;
      position: relative; z-index: 1;
    }

    @media (max-width: 640px) {
      .card-label { font-size: 0.95rem; }
      .card-visual { padding: 14px; border-radius: 14px; }
    }

    .card-chip {
      position: absolute; bottom: 14px; left: 16px;
      background: rgba(255,255,255,.18);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,.25);
      border-radius: 6px; padding: 3px 8px;
      font-size: 0.65rem; font-weight: 600;
      letter-spacing: 0.5px; color: rgba(255,255,255,.9);
      text-transform: uppercase; z-index: 1;
    }

    @media (max-width: 640px) {
      .card-chip { bottom: 10px; left: 12px; font-size: 0.6rem; padding: 2px 6px; }
    }

    .card-meta { padding: 0 2px; }
    .card-name { font-size: 0.875rem; font-weight: 600; color: #1e293b; margin: 0 0 1px; }
    .card-type { font-size: 0.75rem; font-weight: 400; color: #94a3b8; margin: 0; }

    /* ══════════════════════════════
       BOTTOM NAV — mobile only
    ══════════════════════════════ */
    .bottom-nav {
      display: none;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 64px;
      background: #ffffff;
      border-top: 1px solid #e8ecf0;
      z-index: 30;
      padding: 0 8px;
      align-items: center;
      justify-content: space-around;
    }

    @media (max-width: 640px) { .bottom-nav { display: flex; } }

    .bn-item {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 4px; flex: 1;
      padding: 8px 4px;
      border-radius: 12px;
      cursor: pointer;
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.6rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.4px;
      transition: color 0.15s;
    }
    .bn-item.active { color: #0d1b4b; }
    .bn-item svg { width: 20px; height: 20px; }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .class-card { animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
    .class-card:nth-child(1) { animation-delay: 0.05s; }
    .class-card:nth-child(2) { animation-delay: 0.12s; }
    .class-card:nth-child(3) { animation-delay: 0.19s; }
    .class-card:nth-child(4) { animation-delay: 0.26s; }

    /* ── Primer search bar ── */
    .primer-search-wrap {
      display: flex;
      align-items: center;
    }

    .search-form {
      display: flex;
      align-items: center;
      position: relative;
    }

    .primer-search-label {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      pointer-events: none;
      z-index: 1;
      color: #6e7781;
    }

    .primer-search-icon {
      fill: currentColor;
    }

    .search-form .form-control {
      padding-left: 30px !important;
      width: 240px;
      font-family: 'DM Sans', sans-serif !important;
      font-size: 0.8rem !important;
      background-color: #f6f8fa !important;
      border-color: #d0d7de !important;
      border-radius: 6px !important;
      height: 32px !important;
      transition: width 0.2s ease, border-color 0.15s, box-shadow 0.15s;
    }

    .search-form .form-control:focus {
      width: 300px;
      background-color: #ffffff !important;
      border-color: #0969da !important;
      box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.12) !important;
      outline: none !important;
    }

    /* hide native search cancel button */
    .search-form .form-control::-webkit-search-cancel-button { display: none; }

    @media (max-width: 640px) {
      .search-form .form-control { width: 160px; }
      .search-form .form-control:focus { width: 180px; }
    }

    /* ── Scrollbar ── */
    .main::-webkit-scrollbar { width: 5px; }
    .main::-webkit-scrollbar-track { background: transparent; }
    .main::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
  </style>
</head>
<body>

<div class="app-shell">

  <!-- ── Sidebar (desktop / tablet) ── -->
  <aside class="sidebar">
    <div class="brand">BraiamBank</div>

    <nav class="nav-section">
      <div class="nav-label">Descubra</div>
      <a class="nav-item active" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="nav-text">Início</span>
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        <span class="nav-text">Pontos</span>
      </a>
    </nav>

    <nav class="nav-section">
      <div class="nav-label">Gestão</div>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
        <span class="nav-text">Justificativas</span>
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <span class="nav-text">Relatório</span>
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <span class="nav-text">Cadastrar</span>
      </a>
    </nav>
  </aside>

  <!-- ── Mobile Drawer overlay ── -->
  <div class="drawer-overlay" id="drawerOverlay"></div>

  <!-- ── Mobile Drawer ── -->
  <div class="drawer" id="drawer">
    <div class="brand">BraiamBank</div>
    <nav class="nav-section">
      <div class="nav-label">Descubra</div>
      <a class="nav-item active" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Início
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        Pontos
      </a>
    </nav>
    <nav class="nav-section">
      <div class="nav-label">Gestão</div>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
        Justificativas
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        Relatório
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        Cadastrar
      </a>
    </nav>
  </div>

  <!-- ── Main ── -->
  <div class="main">

    <!-- Top bar -->
    <div class="topbar">
      <div class="topbar-left">
        <button class="hamburger" id="hamburgerBtn" aria-label="Abrir menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <!-- Primer search bar -->
        <div class="primer-search-wrap">
          <form class="search-form" role="search" autocomplete="off">
            <label class="primer-search-label" for="globalSearch">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="primer-search-icon">
                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
              </svg>
            </label>
            <input
              id="globalSearch"
              class="form-control input-sm"
              type="search"
              placeholder="Pesquisar..."
              aria-label="Pesquisar"
            >
          </form>
        </div>
      </div>
      <div class="topbar-actions">
        <div class="avatar">BB</div>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <h1 class="page-heading">Turmas</h1>

      <div class="cards-grid">
        <!-- Turma A -->
        <div class="class-card">
          <div class="card-visual card-navy">
            <span class="card-label">Turma A</span>
            <span class="card-chip">Curso</span>
          </div>
          <div class="card-meta">
            <p class="card-name">Turma A</p>
            <p class="card-type">Curso</p>
          </div>
        </div>
        <!-- Turma B -->
        <div class="class-card">
          <div class="card-visual card-navy">
            <span class="card-label">Turma B</span>
            <span class="card-chip">Curso</span>
          </div>
          <div class="card-meta">
            <p class="card-name">Turma B</p>
            <p class="card-type">Curso</p>
          </div>
        </div>
        <!-- Turma C -->
        <div class="class-card">
          <div class="card-visual card-amber">
            <span class="card-label">Turma C</span>
            <span class="card-chip">Curso</span>
          </div>
          <div class="card-meta">
            <p class="card-name">Turma C</p>
            <p class="card-type">Curso</p>
          </div>
        </div>
        <!-- Turma D -->
        <div class="class-card">
          <div class="card-visual card-amber">
            <span class="card-label">Turma D</span>
            <span class="card-chip">Curso</span>
          </div>
          <div class="card-meta">
            <p class="card-name">Turma D</p>
            <p class="card-type">Curso</p>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /main -->

</div><!-- /app-shell -->

<!-- ── Bottom Nav (mobile only) ── -->
<nav class="bottom-nav">
  <a class="bn-item active" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
    Início
  </a>
  <a class="bn-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
    Pontos
  </a>
  <a class="bn-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
    </svg>
    Gestão
  </a>
  <a class="bn-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
    Cadastrar
  </a>
</nav>

<script>
  // ── Sidebar nav active state
  document.querySelectorAll('.sidebar .nav-item, .drawer .nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.sidebar .nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.drawer .nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ── Bottom nav active
  document.querySelectorAll('.bn-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.bn-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ── Drawer toggle
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer    = document.getElementById('drawer');
  const overlay   = document.getElementById('drawerOverlay');

  function openDrawer()  { drawer.classList.add('open'); overlay.classList.add('open'); }
  function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('open'); }

  hamburger.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('.nav-item').forEach(i => i.addEventListener('click', closeDrawer));

  // ── Card ripple
  document.querySelectorAll('.card-visual').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute;border-radius:50%;background:rgba(255,255,255,.25);
        width:80px;height:80px;
        left:${e.clientX - rect.left - 40}px;top:${e.clientY - rect.top - 40}px;
        transform:scale(0);animation:ripple .5s ease-out forwards;
        pointer-events:none;z-index:10;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  const s = document.createElement('style');
  s.textContent = `@keyframes ripple { to { transform:scale(3);opacity:0; } }`;
  document.head.appendChild(s);
</script>

</body>
</html>