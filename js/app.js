import { DATA_SEKOLAH as DEFAULT_DATA_SEKOLAH, DAFTAR_KELAS as DEFAULT_DAFTAR_KELAS, RUBRIK_PENILAIAN, TEKS_UX } from './rubrik-data.js';
import { getOverallClassSummary, exportToCSV } from './analytics.js';

// --- Global State & Constants ---
const LOCAL_STORAGE_KEY = 'smpn3_besuki_class_scores_v1';
const ADMIN_CONFIG_KEY = 'smpn3_besuki_admin_config_v1';

let classScoresData = {}; 
let currentClassId = null; 
let activeDataSekolah = { ...DEFAULT_DATA_SEKOLAH };
let activeDaftarKelas = [...DEFAULT_DAFTAR_KELAS];

// --- DOM Elements ---
const appContainer = document.querySelector('.app-container');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

const schoolNameEl = document.getElementById('school-name');
const appTitleEl = document.getElementById('app-title');
const classListContainer = document.getElementById('class-list-container');
const dashboardNavBtn = document.querySelector('.nav-item[data-target="dashboard"]');
const adminNavBtn = document.getElementById('nav-btn-admin');
const btnExport = document.getElementById('btn-export');

const adminAuthModal = document.getElementById('admin-auth-modal');
const adminAuthForm = document.getElementById('admin-auth-form');
const adminPasswordInput = document.getElementById('admin-password-input');
const btnCancelAuth = document.getElementById('btn-cancel-auth');

const viewDashboard = document.getElementById('view-dashboard');
const dashboardTitleEl = document.getElementById('dashboard-title');
const dashboardSubtitleEl = document.getElementById('dashboard-subtitle');
const statJudgedEl = document.getElementById('stat-judged');
const leaderboardBody = document.getElementById('leaderboard-body');

const viewScoring = document.getElementById('view-scoring');
const scoringClassNameEl = document.getElementById('scoring-class-name');
const scoringClassInfoEl = document.getElementById('scoring-class-info');
const currentTotalScoreEl = document.getElementById('current-total-score');
const rubricContainer = document.getElementById('rubric-container');
const scoringForm = document.getElementById('scoring-form');
const classNotesTextarea = document.getElementById('class-notes');
const backToDashboardBtns = document.querySelectorAll('.back-to-dashboard');

const viewAdmin = document.getElementById('view-admin');
const adminConfigForm = document.getElementById('admin-config-form');
const adminClassNameInput = document.getElementById('admin-class-name');
const adminClassWaliInput = document.getElementById('admin-class-wali');
const adminClassZonaInput = document.getElementById('admin-class-zona');
const adminClassLevelSelect = document.getElementById('admin-class-level');
const btnAddClass = document.getElementById('btn-add-class');
const adminClassTableBody = document.getElementById('admin-class-table-body');

const toastContainer = document.getElementById('toast-container');

// --- Helper Functions ---

function loadAdminConfig() {
    try {
        const stored = localStorage.getItem(ADMIN_CONFIG_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.v === 1) {
                if (parsed.dataSekolah) activeDataSekolah = { ...DEFAULT_DATA_SEKOLAH, ...parsed.dataSekolah };
                if (parsed.daftarKelas && Array.isArray(parsed.daftarKelas)) activeDaftarKelas = [...parsed.daftarKelas];
            }
        }
    } catch (e) {
        console.error('Gagal memuat konfigurasi admin:', e);
    }
}

function saveAdminConfig() {
    try {
        const payload = {
            v: 1,
            dataSekolah: activeDataSekolah,
            daftarKelas: activeDaftarKelas
        };
        localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(payload));
    } catch (e) {
        console.error('Gagal menyimpan konfigurasi admin:', e);
        showToast('Gagal menyimpan konfigurasi admin.', 'danger');
    }
}

function loadScores() {
    try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            if (parsed.v === 1 && parsed.data) {
                return parsed.data;
            }
        }
    } catch (e) {
        console.error('Failed to load scores from localStorage:', e);
    }
    return {};
}

function saveScores(data) {
    try {
        const dataToStore = { v: 1, data: data };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (e) {
        console.error('Failed to save scores to localStorage:', e);
        showToast('Gagal menyimpan data.', 'danger');
    }
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    let iconName = type === 'success' ? 'check-circle' : type === 'danger' ? 'x-circle' : 'info';
    toast.innerHTML = `
        <i data-lucide="${iconName}" class="toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;
    toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

function calculateTotalScore(classId) {
    const classData = classScoresData[classId];
    if (!classData || !classData.scores) {
        return 0;
    }

    let totalWeightedScore = 0;
    let totalPossibleWeightedScore = 0;

    RUBRIK_PENILAIAN.forEach(category => {
        const categoryWeight = category.bobotPersen / 100;
        category.kriteriaList.forEach(criterion => {
            const score = classData.scores[criterion.id] || 0;
            totalWeightedScore += (score / 4) * categoryWeight;
            totalPossibleWeightedScore += (4 / 4) * categoryWeight;
        });
    });

    if (totalPossibleWeightedScore === 0) return 0;
    return (totalWeightedScore / totalPossibleWeightedScore) * 100;
}

function getScoreBadge(score) {
    const sortedCategories = [...TEKS_UX.kategoriPenghargaan].sort((a, b) => b.batasSkor - a.batasSkor);
    for (const category of sortedCategories) {
        if (score >= category.batasSkor) {
            return category;
        }
    }
    return TEKS_UX.kategoriPenghargaan[TEKS_UX.kategoriPenghargaan.length - 1];
}

// --- Render Functions ---

function renderHeaderInfo() {
    if (schoolNameEl) schoolNameEl.textContent = activeDataSekolah.namaSekolah;
    if (appTitleEl) appTitleEl.textContent = activeDataSekolah.namaLomba;
    const dashboardTahunAjarEl = document.getElementById('dashboard-tahun-ajar');
    if (dashboardTahunAjarEl) {
        dashboardTahunAjarEl.innerHTML = `<i data-lucide="award"></i> Tahun Ajaran ${activeDataSekolah.tahunAjar}`;
        lucide.createIcons();
    }
}

function renderSidebarClasses() {
    if (!classListContainer) return;
    classListContainer.innerHTML = '';
    activeDaftarKelas.forEach(kelas => {
        const classItem = document.createElement('button');
        classItem.classList.add('nav-item');
        classItem.dataset.classId = kelas.id;
        classItem.innerHTML = `<i data-lucide="door-open"></i><span>${kelas.nama}</span>`;
        classListContainer.appendChild(classItem);

        classItem.addEventListener('click', () => handleClassNavClick(kelas.id));
    });
    const loadingSkeleton = classListContainer.querySelector('.loading-skeleton');
    if (loadingSkeleton) {
        loadingSkeleton.remove();
    }
    lucide.createIcons();
}

function renderDashboard() {
    if (dashboardTitleEl) dashboardTitleEl.textContent = TEKS_UX.panduanPenjuryan.judul;
    if (dashboardSubtitleEl) dashboardSubtitleEl.textContent = TEKS_UX.panduanPenjuryan.petunjuk.join(' ');

    const classSummary = getOverallClassSummary(classScoresData, activeDaftarKelas);
    let judgedClassesCount = classSummary.filter(c => c.hasBeenJudged).length;

    if (statJudgedEl) statJudgedEl.textContent = `${judgedClassesCount}/${activeDaftarKelas.length}`;

    if (leaderboardBody) {
        leaderboardBody.innerHTML = '';
        classSummary.forEach((data, index) => {
            const badge = getScoreBadge(data.score);
            const statusText = data.hasBeenJudged ? badge.lencana : 'Belum Dinilai';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.score > 0 ? index + 1 : '-'}</td>
                <td><strong>${data.nama}</strong></td>
                <td>${data.waliKelas}</td>
                <td><strong>${data.score > 0 ? data.score.toFixed(1) : '-'}</strong></td>
                <td><span class="status-badge status-${statusText.toLowerCase().replace(/[^a-z0-9]/g, '')}">${statusText}</span></td>
            `;
            leaderboardBody.appendChild(row);
        });
    }
}

function renderScoringForm(classId) {
    const kelas = activeDaftarKelas.find(k => k.id === classId);
    if (!kelas || !rubricContainer) return;

    if (scoringClassNameEl) scoringClassNameEl.textContent = kelas.nama;
    if (scoringClassInfoEl) scoringClassInfoEl.textContent = `Wali Kelas: ${kelas.waliKelas} | Zona: ${kelas.zona}`;

    if (!classScoresData[classId]) {
        classScoresData[classId] = { scores: {}, notes: '' };
    }
    const currentScores = classScoresData[classId].scores;
    const currentNotes = classScoresData[classId].notes;

    rubricContainer.innerHTML = '';
    RUBRIK_PENILAIAN.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.classList.add('category-section');
        categorySection.innerHTML = `
            <div class="category-title">
                <i data-lucide="clipboard-list"></i>
                <h4>${category.namaKategori}</h4>
                <span class="weight-tag">${category.bobotPersen}% Bobot</span>
            </div>
            <p class="text-muted" style="margin-bottom: 16px;">${category.deskripsi}</p>
        `;

        category.kriteriaList.forEach(criterion => {
            const criteriaCard = document.createElement('div');
            criteriaCard.classList.add('criteria-card');
            criteriaCard.innerHTML = `
                <div class="criteria-info">
                    <h5>${criterion.nama}</h5>
                    <p>${criterion.keterangan}</p>
                </div>
                <div class="rating-options" data-criterion-id="${criterion.id}">
                    ${Object.entries(criterion.skala).map(([score, desc]) => `
                        <label class="rating-item">
                            <input type="radio" name="criterion-${criterion.id}" value="${score}" ${currentScores[criterion.id] == score ? 'checked' : ''}>
                            <span class="rating-label">
                                <span class="score-num">${score}</span>
                                <span class="score-desc">${desc}</span>
                            </span>
                        </label>
                    `).join('')}
                </div>
            `;
            categorySection.appendChild(criteriaCard);
        });
        rubricContainer.appendChild(categorySection);
    });

    if (classNotesTextarea) classNotesTextarea.value = currentNotes;
    updateCurrentTotalScore();
    lucide.createIcons();
}

function renderAdminSettings() {
    const elNamaSekolah = document.getElementById('admin-nama-sekolah');
    const elNamaLomba = document.getElementById('admin-nama-lomba');
    const elSubjudul = document.getElementById('admin-subjudul');
    const elTahunAjar = document.getElementById('admin-tahun-ajar');

    if (elNamaSekolah) elNamaSekolah.value = activeDataSekolah.namaSekolah;
    if (elNamaLomba) elNamaLomba.value = activeDataSekolah.namaLomba;
    if (elSubjudul) elSubjudul.value = activeDataSekolah.subjudul;
    if (elTahunAjar) elTahunAjar.value = activeDataSekolah.tahunAjar;

    renderAdminClassTable();
}

function renderAdminClassTable() {
    if (!adminClassTableBody) return;
    adminClassTableBody.innerHTML = '';
    activeDaftarKelas.forEach((kelas) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${kelas.nama}</strong></td>
            <td>${kelas.tingkat}</td>
            <td>${kelas.waliKelas}</td>
            <td>${kelas.zona}</td>
            <td>
                <button type="button" class="btn-icon btn-sm delete-class-btn" data-id="${kelas.id}" title="Hapus Kelas">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        `;
        adminClassTableBody.appendChild(tr);
    });

    adminClassTableBody.querySelectorAll('.delete-class-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (activeDaftarKelas.length <= 1) {
                showToast('Minimal harus ada 1 kelas terdaftar!', 'danger');
                return;
            }
            if (confirm('Yakin ingin menghapus kelas ini?')) {
                activeDaftarKelas = activeDaftarKelas.filter(k => k.id !== id);
                saveAdminConfig();
                renderAdminClassTable();
                renderSidebarClasses();
                renderDashboard();
                showToast('Kelas berhasil dihapus & disinkronkan ke dashboard!', 'success');
            }
        });
    });

    lucide.createIcons();
}

function updateCurrentTotalScore() {
    if (currentClassId && currentTotalScoreEl) {
        const totalScore = calculateTotalScore(currentClassId);
        currentTotalScoreEl.textContent = totalScore.toFixed(1);
    }
}

// --- Event Handlers ---

function handleClassNavClick(classId) {
    currentClassId = classId;
    switchView('scoring');
    renderScoringForm(classId);

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const navBtn = document.querySelector(`.nav-item[data-class-id="${classId}"]`);
    if (navBtn) navBtn.classList.add('active');
    closeSidebar();
}

function handleDashboardNavClick() {
    currentClassId = null;
    switchView('dashboard');
    renderDashboard();

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (dashboardNavBtn) dashboardNavBtn.classList.add('active');
    if (adminNavBtn) adminNavBtn.classList.remove('active');
    closeSidebar();
}

function handleAdminNavClick() {
    if (adminAuthModal) {
        adminAuthModal.classList.remove('is-hidden');
        adminAuthModal.setAttribute('aria-hidden', 'false');
        adminAuthModal.style.display = 'flex';
        if (adminPasswordInput) {
            adminPasswordInput.value = '';
            adminPasswordInput.focus();
        }
    }
    closeSidebar();
}

function handleAdminAuthSubmit(e) {
    e.preventDefault();
    const password = adminPasswordInput ? adminPasswordInput.value.trim() : '';
    if (password === 'admin123') {
        if (adminAuthModal) {
            adminAuthModal.classList.add('is-hidden');
            adminAuthModal.setAttribute('aria-hidden', 'true');
            adminAuthModal.style.display = 'none';
        }
        currentClassId = null;
        switchView('admin');
        renderAdminSettings();

        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        if (adminNavBtn) adminNavBtn.classList.add('active');
        showToast('Autentikasi admin berhasil. Selamat datang di Panel Admin!', 'success');
    } else {
        showToast('Kata sandi salah! Sandi default adalah admin123.', 'danger');
        if (adminPasswordInput) {
            adminPasswordInput.value = '';
            adminPasswordInput.focus();
        }
    }
}

function handleCancelAuth() {
    if (adminAuthModal) {
        adminAuthModal.classList.add('is-hidden');
        adminAuthModal.setAttribute('aria-hidden', 'true');
        adminAuthModal.style.display = 'none';
    }
}

function handleAdminFormSubmit(e) {
    e.preventDefault();
    const elNamaSekolah = document.getElementById('admin-nama-sekolah');
    const elNamaLomba = document.getElementById('admin-nama-lomba');
    const elSubjudul = document.getElementById('admin-subjudul');
    const elTahunAjar = document.getElementById('admin-tahun-ajar');

    if (elNamaSekolah) activeDataSekolah.namaSekolah = elNamaSekolah.value.trim();
    if (elNamaLomba) activeDataSekolah.namaLomba = elNamaLomba.value.trim();
    if (elSubjudul) activeDataSekolah.subjudul = elSubjudul.value.trim();
    if (elTahunAjar) activeDataSekolah.tahunAjar = elTahunAjar.value.trim();

    saveAdminConfig();
    renderHeaderInfo();
    renderDashboard();
    showToast('Identitas lembaga berhasil diperbarui & disinkronkan ke dashboard!', 'success');
}

function handleAddClass(e) {
    e.preventDefault();
    const nama = adminClassNameInput.value.trim();
    const waliKelas = adminClassWaliInput.value.trim();
    const zona = adminClassZonaInput.value.trim();
    const tingkat = adminClassLevelSelect.value;

    if (!nama || !waliKelas || !zona) {
        showToast('Mohon lengkapi semua kolom data kelas!', 'danger');
        return;
    }

    const id = nama.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (activeDaftarKelas.some(k => k.id === id)) {
        showToast('ID Kelas sudah ada, gunakan nama lain.', 'danger');
        return;
    }

    activeDaftarKelas.push({ id, nama, tingkat, zona, waliKelas });
    saveAdminConfig();
    renderAdminClassTable();
    renderSidebarClasses();
    renderDashboard();

    adminClassNameInput.value = '';
    adminClassWaliInput.value = '';
    adminClassZonaInput.value = '';
    showToast('Kelas baru berhasil ditambahkan & disinkronkan ke dashboard!', 'success');
}

function handleRubricChange(event) {
    if (event.target.type === 'radio' && event.target.name.startsWith('criterion-')) {
        const criterionId = event.target.name.replace('criterion-', '');
        const score = parseInt(event.target.value);

        if (currentClassId) {
            if (!classScoresData[currentClassId]) {
                classScoresData[currentClassId] = { scores: {}, notes: '' };
            }
            classScoresData[currentClassId].scores[criterionId] = score;
            updateCurrentTotalScore();
        }
    }
}

const debouncedSaveNotes = debounce(() => {
    if (currentClassId && classNotesTextarea) {
        if (!classScoresData[currentClassId]) {
            classScoresData[currentClassId] = { scores: {}, notes: '' };
        }
        classScoresData[currentClassId].notes = classNotesTextarea.value;
        saveScores(classScoresData);
    }
}, 500);

function handleScoringFormSubmit(event) {
    event.preventDefault();

    if (!currentClassId) {
        showToast('Terjadi kesalahan: Kelas tidak dipilih.', 'danger');
        return;
    }

    let allCriteriaScored = true;
    RUBRIK_PENILAIAN.forEach(category => {
        category.kriteriaList.forEach(criterion => {
            if (!classScoresData[currentClassId] || !classScoresData[currentClassId].scores[criterion.id]) {
                allCriteriaScored = false;
            }
        });
    });

    if (!allCriteriaScored) {
        showToast('Mohon lengkapi semua kriteria penilaian sebelum menyimpan.', 'danger');
        return;
    }

    if (classNotesTextarea) {
        classScoresData[currentClassId].notes = classNotesTextarea.value;
    }
    classScoresData[currentClassId].lastUpdated = new Date().toISOString();
    saveScores(classScoresData);
    showToast('Penilaian berhasil disimpan & diperbarui di dashboard!', 'success');
    handleDashboardNavClick();
}

function handleExportData() {
    try {
        const csv = exportToCSV(classScoresData, activeDaftarKelas);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", url);
        downloadAnchorNode.setAttribute("download", `rekap_penilaian_kebersihan_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        URL.revokeObjectURL(url);
        showToast('Data berhasil diekspor ke CSV!', 'success');
    } catch (e) {
        console.error('Failed to export data:', e);
        showToast('Gagal mengekspor data.', 'danger');
    }
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add('active');
}

function toggleSidebar() {
    if (appContainer) appContainer.classList.toggle('sidebar-open');
}

function closeSidebar() {
    if (appContainer && appContainer.classList.contains('sidebar-open')) {
        appContainer.classList.remove('sidebar-open');
    }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    loadAdminConfig();
    classScoresData = loadScores();

    renderHeaderInfo();
    renderSidebarClasses();
    renderDashboard();

    // Pastikan modal autentikasi admin benar-benar tertutup saat inisialisasi awal
    if (adminAuthModal) {
        adminAuthModal.classList.add('is-hidden');
        adminAuthModal.setAttribute('aria-hidden', 'true');
        adminAuthModal.style.display = 'none';
    }

    // Set tampilan awal ke Dashboard
    switchView('dashboard');
    if (dashboardNavBtn) {
        dashboardNavBtn.classList.add('active');
    }
    if (adminNavBtn) {
        adminNavBtn.classList.remove('active');
    }

    if (dashboardNavBtn) dashboardNavBtn.addEventListener('click', handleDashboardNavClick);
    if (adminNavBtn) adminNavBtn.addEventListener('click', handleAdminNavClick);

    if (adminAuthForm) adminAuthForm.addEventListener('submit', handleAdminAuthSubmit);
    if (btnCancelAuth) btnCancelAuth.addEventListener('click', handleCancelAuth);

    if (adminConfigForm) adminConfigForm.addEventListener('submit', handleAdminFormSubmit);
    if (btnAddClass) btnAddClass.addEventListener('click', handleAddClass);

    if (scoringForm) {
        scoringForm.addEventListener('change', handleRubricChange);
        scoringForm.addEventListener('submit', handleScoringFormSubmit);
    }
    if (classNotesTextarea) classNotesTextarea.addEventListener('input', debouncedSaveNotes);
    if (btnExport) btnExport.addEventListener('click', handleExportData);

    backToDashboardBtns.forEach(btn => {
        btn.addEventListener('click', handleDashboardNavClick);
    });

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleSidebar);
    }

    lucide.createIcons();
});