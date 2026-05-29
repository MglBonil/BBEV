<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BraiamBank</title>
  <link  rel="stylesheet" href="CSS/hub.css">
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
  
<div class="app-shell">

  <!-- ── Sidebar (desktop / tablet) ── -->
   <aside class="sidebar">

    <!-- Logo -->
    <div class="sidebar-logo ">
      <img src="assets/icons/LogoVetorizado.svg">
    </div>

    <!-- Navigation -->
    <a class="nav-item active" href="hub.php">
      <img src="assets/icons/home.svg"><i class="ti ti-layout-dashboard"></i> Inicio
    </a>
    <a class="nav-item" href="pontos.php">
       <img src="assets/icons/wallet.svg"> <i class="ti ti-users"></i> Pontos
    </a>
    <!-- Teams -->
    <div class="section-label">Gestão</div>

    <a class="nav-item" href="hub.php">
      <img src="assets/icons/menu.svg"><i class="ti ti-layout-dashboard"></i> Justificativa
    </a>
    <a class="nav-item" href="#">
       <img src="assets/icons/archive.svg"> <i class="ti ti-users"></i> Relatório
    </a>
    <a class="nav-item" href="#">
       <img src="assets/icons/add.svg"> <i class="ti ti-users"></i> Cadastrar

    <!-- Footer -->
    <div class="sidebar-footer">
      <a class="nav-item" href="#">
        <img src="assets/icons/settings.svg"><i class="ti ti-settings"></i> Configurações
      </a>
    </div>

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