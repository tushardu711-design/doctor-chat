const $app = document.querySelector('.app');
const $backBtn = document.getElementById('backBtn');
const $list = document.getElementById('doctorList');
const $infoCards = document.getElementById('infoCards');
const $heroPhoto = document.getElementById('heroPhoto');
const $heroFallback = document.getElementById('heroFallback');
const $infoView = document.getElementById('infoView');
const $threadView = document.getElementById('threadView');
const $toggleInfo = document.getElementById('toggleInfo');
const $infoShowBtn = document.getElementById('infoShowBtn');
const $hideInfoRow = document.querySelector('.hide-info-row');
const $input = document.getElementById('input');
const $sendBtn = document.getElementById('sendBtn');
const $peerName = document.getElementById('peerName');
const $mainScroll = document.getElementById('mainScroll');
const $heroPhotoZone = document.querySelector('.hero-photo-zone');
const $profileAvatarImg = document.getElementById('profileAvatarImg');
const $profileAvatarFallback = document.getElementById('profileAvatarFallback');

let activeId = doctors[0].id;
let infoHidden = false;

function renderList() {
  $list.innerHTML = '';
  doctors.forEach((d, i) => {
    const last = d.messages[d.messages.length - 1];
    const li = document.createElement('li');
    li.className = 'doctor' + (d.id === activeId ? ' active' : '');
    li.style.setProperty('--index', i);
    li.innerHTML = `
      <div class="thumb" style="background:${d.palette[0]};color:${d.palette[1]}">
        ${d.photo ? `<img src="${d.photo}" alt="${d.name}" />` : d.initials}
      </div>
      <div class="doctor-meta">
        <div class="doctor-row">
          <span class="doctor-name">${d.name}</span>
        </div>
        <div class="doctor-preview">${last.from === 'out' ? 'You: ' : ''}${last.text}</div>
      </div>
      ${d.unread ? `<span class="unread">${d.unread}</span>` : ''}`;
    li.addEventListener('click', () => {
      activeId = d.id;
      d.unread = 0;
      renderList();
      renderMain();
      $app.classList.add('chat-open');
    });
    $list.appendChild(li);
  });
}

function renderInfo(d) {
  $infoCards.innerHTML = d.fields.map(f => `
    <div class="info-card">
      <div class="info-card-label">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 4.5v3l2 1.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        ${f.label.toUpperCase()}
      </div>
      <div class="info-card-value">${f.value}</div>
    </div>`).join('');

  if (d.photo) {
    $heroPhoto.src = d.photo;
    $heroPhoto.style.display = 'block';
    $heroFallback.style.display = 'none';
    $profileAvatarImg.src = d.photo;
    $profileAvatarImg.style.display = 'block';
    $profileAvatarFallback.style.display = 'none';
  } else {
    $heroPhoto.style.display = 'none';
    $heroFallback.style.display = 'grid';
    const root = getComputedStyle(document.documentElement);
    $heroFallback.style.background = root.getPropertyValue(d.palette[0].slice(4, -1));
    $heroFallback.style.color = root.getPropertyValue(d.palette[1].slice(4, -1));
    $heroFallback.textContent = d.initials;
    $profileAvatarImg.style.display = 'none';
    $profileAvatarFallback.style.display = 'grid';
    $profileAvatarFallback.style.background = root.getPropertyValue(d.palette[0].slice(4, -1));
    $profileAvatarFallback.style.color = root.getPropertyValue(d.palette[1].slice(4, -1));
    $profileAvatarFallback.textContent = d.initials;
  }
}

function renderThread(d) {
  $threadView.innerHTML = '<div class="day-divider">Today</div>';
  d.messages.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'msg ' + m.from;
    el.style.animationDelay = (i * 60) + 'ms';
    el.innerHTML = `<div class="bubble"></div><div class="msg-time">${m.time}</div>`;
    el.querySelector('.bubble').textContent = m.text;
    $threadView.appendChild(el);
  });
  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.id = 'typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  $threadView.appendChild(typing);
}

function renderMain() {
  const d = doctors.find(x => x.id === activeId);
  $peerName.textContent = d.name;
  renderInfo(d);
  renderThread(d);
  $mainScroll.scrollTop = 0;
}

function setInfoHidden(hidden) {
  infoHidden = hidden;
  $infoView.classList.toggle('hidden', hidden);
  $threadView.classList.toggle('visible', hidden);
  $hideInfoRow.classList.toggle('hidden', hidden);
  $infoShowBtn.style.display = hidden ? 'flex' : 'none';
  document.querySelector('.profile-head').classList.toggle('info-hidden', hidden);
  $profileAvatarImg.parentElement.classList.toggle('visible', hidden);

  if (!hidden) {
    // Remove and re-add animation to trigger it
    $heroPhoto.classList.remove('animate');
    // Force reflow to restart animation
    void $heroPhoto.offsetWidth;
    $heroPhoto.classList.add('animate');
  }

  $toggleInfo.innerHTML = hidden
    ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 5l4 4 4-4M2 2l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Show Info`
    : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 7l4-4 4 4M2 10l4-4 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Hide Info`;
  if (hidden) $mainScroll.scrollTop = $mainScroll.scrollHeight;
}

$toggleInfo.addEventListener('click', () => setInfoHidden(!infoHidden));
$infoShowBtn.addEventListener('click', () => setInfoHidden(false));
$backBtn.addEventListener('click', () => $app.classList.remove('chat-open'));

function nowTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function send() {
  const text = $input.value.trim();
  if (!text) return;
  const d = doctors.find(x => x.id === activeId);
  const msg = { from: 'out', text, time: nowTime() };
  d.messages.push(msg);
  d.time = msg.time;
  $input.value = '';
  renderList();

  if (!infoHidden) setInfoHidden(true);
  else renderThread(d);

  const typing = document.getElementById('typing');
  $mainScroll.scrollTop = $mainScroll.scrollHeight;
  setTimeout(() => {
    if (typing) { typing.classList.add('visible'); $mainScroll.scrollTop = $mainScroll.scrollHeight; }
  }, 700);
  setTimeout(() => {
    const reply = { from: 'in', text: replies[Math.floor(Math.random() * replies.length)], time: nowTime() };
    d.messages.push(reply);
    d.time = reply.time;
    renderThread(d);
    renderList();
    $mainScroll.scrollTop = $mainScroll.scrollHeight;
  }, 2400);
}

$sendBtn.addEventListener('click', send);
$input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

renderList();
renderMain();
