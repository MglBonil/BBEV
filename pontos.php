<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BraiamBank — Pontos</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="CSS/pontos.css">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:opsz,wght@9..144,700;9..144,900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['DM Sans', 'sans-serif'],
            display: ['Fraunces', 'serif'],
          }
        }
      }
    }
  </script>
  
</head>
<body>

<div class="app-shell">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="brand">BraiamBank</div>
    <nav class="nav-section">
      <div class="nav-label">Descubra</div>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span class="nav-text">Início</span>
      </a>
      <a class="nav-item active" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <span class="nav-text">Pontos</span>
      </a>
    </nav>
    <nav class="nav-section">
      <div class="nav-label">Gestão</div>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        <span class="nav-text">Justificativas</span>
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span class="nav-text">Relatório</span>
      </a>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span class="nav-text">Cadastrar</span>
      </a>
    </nav>
  </aside>

  <!-- DRAWER OVERLAY -->
  <div class="drawer-overlay" id="drawerOverlay"></div>

  <!-- DRAWER -->
  <div class="drawer" id="drawer">
    <div class="brand">BraiamBank</div>
    <nav class="nav-section">
      <div class="nav-label">Descubra</div>
      <a class="nav-item" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Início
      </a>
      <a class="nav-item active" href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        Pontos
      </a>
    </nav>
    <nav class="nav-section">
      <div class="nav-label">Gestão</div>
      <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>Justificativas</a>
      <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>Relatório</a>
      <a class="nav-item" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>Cadastrar</a>
    </nav>
  </div>

  <!-- MAIN -->
  <div class="main">

    <!-- Topbar -->
    <div class="topbar">
      <div class="topbar-left">
        <button class="hamburger" id="hamburgerBtn" aria-label="Abrir menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="search-wrap">
          <div class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
          <input class="search-input" type="search" placeholder="Pesquisar...">
        </div>
      </div>
      <div class="topbar-actions">
        <div class="avatar">BB</div>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <h1 class="page-heading">Pontos</h1>
      <p class="page-sub">Gerencie os pontos dos alunos por turma</p>

      <!-- Page search -->
      <div class="page-search-wrap">
        <div class="page-search-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <input class="page-search-input" id="studentSearch" type="search" placeholder="Buscar aluno..." value="Aluno A">
      </div>

      <!-- Student row -->
      <div class="student-row" id="studentSection">

        <!-- Card visual -->
        <div class="student-card-visual">
          <div class="card-visual">
            <div class="card-monogram" id="cardMonogram">A</div>
            <div class="card-student-name" id="cardName">Aluno A</div>
            <span class="card-chip" id="cardChip">Curso</span>
          </div>
          <div class="card-meta">
            <p class="card-meta-name" id="metaName">Aluno A</p>
            <p class="card-meta-type">Turma A · Curso</p>
          </div>
        </div>

        <!-- Controls panel -->
        <div class="controls-panel">

          <!-- Points display -->
          <div>
            <p class="ctrl-label">Saldo de pontos</p>
            <div class="points-row">
              <div class="points-badge">
                <div class="points-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div>
                  <div class="points-label">Pontos</div>
                  <div class="points-value" id="pointsDisplay">99</div>
                </div>
              </div>
              <div class="points-delta neutral" id="deltaDisplay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span id="deltaText">0 pts</span>
              </div>
            </div>
          </div>

          <hr class="divider">

          <!-- Justificativa -->
          <div>
            <p class="ctrl-label">Justificativa</p>
            <div class="select-wrap">
              <select id="justificativa">
                <option value="">Selecione uma justificativa...</option>
                <option value="participacao">Participação em aula</option>
                <option value="tarefa">Entrega de tarefa</option>
                <option value="comportamento">Bom comportamento</option>
                <option value="falta">Falta sem justificativa</option>
                <option value="atraso">Atraso</option>
                <option value="bonus">Bônus especial</option>
              </select>
              <div class="select-chevron">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </div>

          <!-- Counter -->
          <div>
            <p class="ctrl-label">Quantidade de pontos</p>
            <div style="display:flex; align-items:center; gap:0;">
              <button class="counter-btn dec" id="decBtn" onclick="changeCounter(-1)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <div class="counter-display" id="counterDisplay">0</div>
              <button class="counter-btn inc" id="incBtn" onclick="changeCounter(1)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="counter-hint">Use valores negativos para remover pontos</span>
            </div>
          </div>

          <hr class="divider">

          <!-- Actions -->
          <div class="actions-row">
            <button class="btn btn-primary" id="enviarBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Enviar
            </button>
            <button class="btn btn-danger" id="excluirBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              Excluir usuário
            </button>
          </div>
        </div>

      </div>
    </div>
  </div><!-- /main -->
</div><!-- /app-shell -->

<!-- Delete Confirm Modal -->
<div class="modal-bg" id="modalBg">
  <div class="modal">
    <div class="modal-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
    </div>
    <p class="modal-title">Excluir usuário?</p>
    <p class="modal-body">Esta ação não pode ser desfeita. <strong id="modalStudentName">Aluno A</strong> será removido permanentemente do sistema.</p>
    <div class="modal-actions">
      <button class="btn-cancel" id="cancelDelete">Cancelar</button>
      <button class="btn-confirm-del" id="confirmDelete">Sim, excluir</button>
    </div>
  </div>
</div>

<!-- Toast container -->
<div class="toast-container" id="toastContainer"></div>

<!-- Bottom Nav -->
<nav class="bottom-nav">
  <a class="bn-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    Início
  </a>
  <a class="bn-item active" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    Pontos
  </a>
  <a class="bn-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/></svg>
    Gestão
  </a>
  <a class="bn-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
    Cadastrar
  </a>
</nav>

<script>
  // ── State ──────────────────────────────────────────────
  let counter = 0;
  let basePoints = 99;

  // ── Counter ────────────────────────────────────────────
  function changeCounter(delta) {
    counter += delta;
    document.getElementById('counterDisplay').textContent = counter;
    updateDelta();
  }

  function updateDelta() {
    const el = document.getElementById('deltaDisplay');
    const txt = document.getElementById('deltaText');
    el.className = 'points-delta';
    if (counter > 0) {
      el.classList.add('positive');
      txt.textContent = `+${counter} pts`;
      el.querySelector('svg').innerHTML = '<polyline points="18 15 12 9 6 15"/>';
    } else if (counter < 0) {
      el.classList.add('negative');
      txt.textContent = `${counter} pts`;
      el.querySelector('svg').innerHTML = '<polyline points="6 9 12 15 18 9"/>';
    } else {
      el.classList.add('neutral');
      txt.textContent = '0 pts';
      el.querySelector('svg').innerHTML = '<line x1="5" y1="12" x2="19" y2="12"/>';
    }
  }

  // ── Enviar ─────────────────────────────────────────────
  document.getElementById('enviarBtn').addEventListener('click', () => {
    const just = document.getElementById('justificativa').value;
    if (!just) { showToast('Selecione uma justificativa antes de enviar.', 'error'); return; }
    if (counter === 0) { showToast('Defina uma quantidade de pontos.', 'error'); return; }

    basePoints += counter;
    document.getElementById('pointsDisplay').textContent = basePoints;
    const sign = counter > 0 ? '+' : '';
    showToast(`${sign}${counter} pontos enviados com sucesso!`, 'success');

    counter = 0;
    document.getElementById('counterDisplay').textContent = 0;
    document.getElementById('justificativa').value = '';
    updateDelta();
  });

  // ── Delete modal ───────────────────────────────────────
  const modalBg = document.getElementById('modalBg');
  document.getElementById('excluirBtn').addEventListener('click', () => {
    document.getElementById('modalStudentName').textContent =
      document.getElementById('cardName').textContent;
    modalBg.classList.add('open');
  });
  document.getElementById('cancelDelete').addEventListener('click', () => modalBg.classList.remove('open'));
  modalBg.addEventListener('click', e => { if (e.target === modalBg) modalBg.classList.remove('open'); });
  document.getElementById('confirmDelete').addEventListener('click', () => {
    modalBg.classList.remove('open');
    showToast('Usuário excluído com sucesso.', 'success');
  });

  // ── Toast ──────────────────────────────────────────────
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    };
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `${icons[type]}<span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.classList.add('toast-out');
      setTimeout(() => t.remove(), 300);
    }, 3000);
  }

  // ── Drawer ─────────────────────────────────────────────
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  document.getElementById('hamburgerBtn').addEventListener('click', () => {
    drawer.classList.add('open'); overlay.classList.add('open');
  });
  overlay.addEventListener('click', () => {
    drawer.classList.remove('open'); overlay.classList.remove('open');
  });
  drawer.querySelectorAll('.nav-item').forEach(i => i.addEventListener('click', () => {
    drawer.classList.remove('open'); overlay.classList.remove('open');
  }));

  // ── Nav active ─────────────────────────────────────────
  document.querySelectorAll('.sidebar .nav-item, .drawer .nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.sidebar .nav-item, .drawer .nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
  document.querySelectorAll('.bn-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.bn-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ── Card ripple ────────────────────────────────────────
  document.querySelectorAll('.card-visual').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.2);width:80px;height:80px;left:${e.clientX-rect.left-40}px;top:${e.clientY-rect.top-40}px;transform:scale(0);animation:ripple .5s ease-out forwards;pointer-events:none;z-index:10;`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
</script>
</body>
</html>
