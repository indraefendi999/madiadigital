/**
 * EduPortal SMP - Sistem Web Mading Digital & PPDB Online Terpadu
 * Profil Resmi: SMPN 1 Mesuji Makmur (Kab. OKI, Sumatera Selatan)
 * Architecture: Clean Vanilla JS, Role-Based Access Control (RBAC), Educator Authoring Engine
 * Standard: ZettBOT Engineering Protocol
 */

(function () {
  'use strict';

  // ==========================================
  // 1. STATE & DATABASE STORE
  // ==========================================
  const STORAGE_KEY = 'EDUPORTAL_SMP_MESMA_V5';
  const SESSION_KEY = 'EDUPORTAL_SMP_SESSION_V5';

  const defaultDatabase = {
    settings: {
      namaSekolah: 'SMPN 1 Mesuji Makmur',
      inisialSekolah: 'SMPN 1 MesMa',
      logoUrl: 'logo_smpn1.png',
      alamatSekolah: 'Jalan Catur Raya Desa Catur Tunggal Kec. Mesuji Makmur Kab. OKI Prov. Sumatera Selatan',
      teleponSekolah: '081328069001',
      emailSekolah: 'smpn1mesujimakmur@gmail.com',
      websiteSekolah: 'https://smpn1mesujimakmur.sch.id',
      kepalaSekolah: 'Sugianto, S.Pd.',
      nipKepalaSekolah: '19750810 200501 1 008',
      ppdbOpen: true,
      tanggalPengumuman: '30 November 2026, Pukul 09:00 WIB',
      kuotaTotal: 126,
      kuotaZonasi: 63,    // 50%
      kuotaPrestasi: 38,   // 30%
      kuotaAfirmasi: 19,   // 15%
      kuotaMutasi: 6       // 5%
    },
    users: {
      admin: {
        username: 'admin',
        password: 'admin123',
        nama: 'Sugianto, S.Pd. (Kepala Sekolah / Admin)',
        email: 'admin@smpn1mesujimakmur.sch.id',
        role: 'admin'
      },
      panitia: [
        {
          id: 'PAN-01',
          nama: 'Panitia PPDB SMPN 1 MesMa',
          nip: '19820315 200801 1 005',
          username: 'panitia',
          password: 'panitia123',
          tugasJalur: 'Semua Jalur (Koordinator)',
          role: 'panitia'
        }
      ]
    },
    auditLogs: [
      {
        id: 'LOG-001',
        waktu: '2026-11-14 09:30',
        pelaksana: 'Sugianto, S.Pd.',
        peran: 'Super Admin',
        aksi: 'Inisialisasi Sistem',
        target: 'SMPN 1 Mesuji Makmur',
        detail: 'Konfigurasi kuota resmi 126 siswa dan modul kepenulisan Dewan Guru.'
      }
    ],
    madingPosts: [
      {
        id: 'POST-001',
        judul: 'Penerimaan Peserta Didik Baru (PPDB) SMPN 1 Mesuji Makmur Resmi Dibuka',
        kategori: 'Pengumuman',
        penulis: 'Panitia PPDB 2026',
        penulisRole: 'Panitia',
        kelas: 'Official Sekolah',
        tanggal: '2026-11-14',
        ringkasan: 'SMPN 1 Mesuji Makmur membuka pendaftaran 4 rombel (126 siswa) melalui Jalur Zonasi, Prestasi, Afirmasi, dan Mutasi.',
        konten: 'Keluarga besar SMPN 1 Mesuji Makmur mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027. Pada tahun ini, sekolah membuka kuota resmi sebanyak 126 siswa untuk 4 rombongan belajar. Pendaftaran dilakukan secara mandiri melalui portal web ini dengan 4 jalur resmi: Zonasi (63 kursi), Prestasi (38 kursi), Afirmasi (19 kursi), dan Mutasi Tugas Orang Tua (6 kursi). Silakan calon siswa dan orang tua mengisi formulir secara lengkap.',
        gambarUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
        lampiranUrl: '',
        status: 'Publish',
        jumlahSuka: 142,
        featured: true
      },
      {
        id: 'POST-GURU-001',
        judul: 'Menumbuhkan Budaya Literasi & Karakter Pelajar Pancasila di Era Digital',
        kategori: 'Pojok Literasi Guru',
        penulis: 'Sugianto, S.Pd.',
        penulisRole: 'Guru',
        kelas: 'Kepala Sekolah / Guru Matematika',
        tanggal: '2026-11-13',
        ringkasan: 'Catatan inspirasi pentingnya gemar membaca, berakhlak mulia, dan berdaya saing bagi pelajar Desa Catur Tunggal.',
        konten: 'Anak-anaku sekalian di SMPN 1 Mesuji Makmur,\nKemajuan teknologi gawai pintar saat ini harus menjadi jembatan ilmu, bukan sekadar hiburan semata. Di ruang mading digital ini, bapak mengajak seluruh siswa untuk membiasakan membaca minimal 15 menit setiap hari sebelum jam belajar dimulai.\n\nKarakter Pelajar Pancasila yang mandiri, bergotong royong, dan bernalar kritis harus terpancar dari perbuatan kita sehari-hari di sekolah maupun di tengah masyarakat Desa Catur Tunggal. Mari jadikan membaca sebagai gaya hidup pelajar MesMa yang unggul!',
        gambarUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
        lampiranUrl: 'https://drive.google.com',
        status: 'Publish',
        jumlahSuka: 178,
        featured: true
      },
      {
        id: 'POST-002',
        judul: 'Prestasi Gemilang Pelajar SMPN 1 MesMa di Ajang Lomba Pelajar Kab. OKI',
        kategori: 'Prestasi',
        penulis: 'Pembina Kesiswaan',
        penulisRole: 'Guru',
        kelas: 'Official Kesiswaan',
        tanggal: '2026-11-12',
        ringkasan: 'Siswa-siswi SMPN 1 Mesuji Makmur berhasil meraih penghargaan kejuaraan tingkat Kabupaten Ogan Komering Ilir.',
        konten: 'Apresiasi setinggi-tingginya kepada seluruh siswa dan pembina yang telah mengharumkan nama SMPN 1 Mesuji Makmur di tingkat Kabupaten Ogan Komering Ilir. Semangat belajar yang gigih membuktikan bahwa pelajar dari Desa Catur Tunggal mampu bersaing dan berprestasi tinggi di kancah daerah.',
        gambarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
        lampiranUrl: '',
        status: 'Publish',
        jumlahSuka: 98,
        featured: true
      },
      {
        id: 'POST-003',
        judul: 'Senja di Bumi Mesuji Makmur: Bait Karya Sastra Siswa',
        kategori: 'Karya Siswa',
        penulis: 'Nurul Hidayah',
        penulisRole: 'Siswa',
        kelas: 'Kelas 8-B',
        tanggal: '2026-11-10',
        ringkasan: 'Sebuah puisi refleksi kecintaan pada tanah kelahiran dan semangat menuntut ilmu di bangku SMP.',
        konten: 'Di hamparan tanah Desa Catur Tunggal yang permai,\nLangkah kecil kami menapak jalan menatap damai.\nDi ruang kelas SMPN 1 Mesuji Makmur kami bersua,\nMerajut mimpi, ilmu, dan bakti bagi nusa dan bangsa.\n\nTak surut asa walau jalan berliku,\nBimbingan guruku pelita dalam kalbu.',
        gambarUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
        lampiranUrl: '',
        status: 'Publish',
        jumlahSuka: 86,
        featured: false
      }
    ],
    agendaSekolah: [
      {
        id: 'AGD-001',
        judul: 'Verifikasi Berkas Fisik PPDB SMPN 1 MesMa',
        tanggal: '20-28 Nov 2026',
        waktu: '08:00 - 13:00 WIB',
        lokasi: 'Ruang Panitia PPDB, Kampus SMPN 1 MesMa',
        keterangan: 'Pemeriksaan berkas fisik KK, Akta Kelahiran, dan Surat KIP bagi pendaftar.'
      },
      {
        id: 'AGD-002',
        judul: 'Penilaian Akhir Semester (PAS) Ganjil',
        tanggal: '01-08 Des 2026',
        waktu: '07:30 - 11:30 WIB',
        lokasi: 'Ruang Kelas 7, 8, dan 9',
        keterangan: 'Pelaksanaan ujian semester ganjil T.A 2026/2027.'
      }
    ],
    ppdbPendaftar: [
      {
        id: 'PPDB-REC-001',
        noRegistrasi: 'PPDB-202611-001',
        nisn: '0112345678',
        namaLengkap: 'Rian Saputra',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Catur Tunggal',
        tanggalLahir: '2014-04-12',
        asalSekolah: 'SD Negeri 1 Catur Tunggal',
        jalurPendaftaran: 'Zonasi',
        jarakRumahKm: 0.75,
        nilaiRataRata: 88.5,
        namaWali: 'Bambang Irawan',
        noHpWa: '081328069001',
        statusVerifikasi: 'Diterima',
        catatanPanitia: 'Zonasi Desa Catur Tunggal valid (0.75 km). Berkas KK asli terverifikasi sah.',
        waktuDaftar: '2026-11-14 09:15',
        berkasPerbaikan: null,
        konfirmasiDaftarUlang: true
      },
      {
        id: 'PPDB-REC-002',
        noRegistrasi: 'PPDB-202611-002',
        nisn: '0119876543',
        namaLengkap: 'Dewi Anggraini',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Mesuji Makmur',
        tanggalLahir: '2014-07-25',
        asalSekolah: 'SD Negeri 2 Mesuji Makmur',
        jalurPendaftaran: 'Prestasi',
        jarakRumahKm: 1.8,
        nilaiRataRata: 92.5,
        namaWali: 'Hendra Gunawan',
        noHpWa: '081328069001',
        statusVerifikasi: 'Lolos Berkas',
        catatanPanitia: 'Piagam Juara O2SN Tingkat Kecamatan terverifikasi sah.',
        waktuDaftar: '2026-11-14 11:30',
        berkasPerbaikan: null,
        konfirmasiDaftarUlang: false
      }
    ]
  };

  let db = loadDatabase();
  let currentSession = loadSession();

  function loadDatabase() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage unavailable, using default state', e);
    }
    saveDatabase(defaultDatabase);
    return JSON.parse(JSON.stringify(defaultDatabase));
  }

  function saveDatabase(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to LocalStorage', e);
    }
  }

  function loadSession() {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) return JSON.parse(s);
    } catch (e) {}
    return { role: 'guest', user: null, registrant: null };
  }

  function saveSession(session) {
    currentSession = session;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {}
    updateAuthUI();
  }

  function addAuditLog(pelaksana, peran, aksi, target, detail) {
    const log = {
      id: 'LOG-' + Date.now().toString().slice(-5),
      waktu: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pelaksana: pelaksana,
      peran: peran,
      aksi: aksi,
      target: target,
      detail: detail || '-'
    };
    db.auditLogs.unshift(log);
    saveDatabase(db);
  }

  function generatePpdbId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const prefix = `PPDB-${year}${month}-`;

    let maxNum = 0;
    db.ppdbPendaftar.forEach(item => {
      if (item.noRegistrasi && item.noRegistrasi.startsWith(prefix)) {
        const numPart = parseInt(item.noRegistrasi.replace(prefix, ''), 10);
        if (!isNaN(numPart) && numPart > maxNum) {
          maxNum = numPart;
        }
      }
    });

    const nextNum = String(maxNum + 1).padStart(3, '0');
    return `${prefix}${nextNum}`;
  }

  // ==========================================
  // 2. CONTROLLER AUTH & PROFILE UPDATE
  // ==========================================
  function initAuthSystem() {
    const btnOpenLogin = document.getElementById('btnNavLogin');
    if (btnOpenLogin) {
      btnOpenLogin.addEventListener('click', () => openLoginModal());
    }

    const btnLogout = document.getElementById('btnLogoutSession');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => logoutSession());
    }

    const roleTabs = document.querySelectorAll('[data-login-role-tab]');
    roleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const role = tab.getAttribute('data-login-role-tab');
        switchLoginTab(role);
      });
    });

    const formSiswa = document.getElementById('formLoginSiswa');
    if (formSiswa) {
      formSiswa.addEventListener('submit', (e) => {
        e.preventDefault();
        const nisnOrReg = document.getElementById('loginSiswaKey').value.trim();
        loginAsSiswa(nisnOrReg);
      });
    }

    const formPanitia = document.getElementById('formLoginPanitia');
    if (formPanitia) {
      formPanitia.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('loginPanitiaUser').value.trim();
        const p = document.getElementById('loginPanitiaPass').value;
        loginAsPanitia(u, p);
      });
    }

    const formAdmin = document.getElementById('formLoginAdmin');
    if (formAdmin) {
      formAdmin.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('loginAdminUser').value.trim();
        const p = document.getElementById('loginAdminPass').value;
        loginAsAdmin(u, p);
      });
    }

    const formProfile = document.getElementById('formAdminEditProfile');
    if (formProfile) {
      formProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        saveSchoolProfileSettings();
      });
    }

    // Inisialisasi Form Kirim Karya Guru
    initTeacherSubmission();

    updateAuthUI();
  }

  function openLoginModal(defaultRole) {
    const modal = document.getElementById('modalLoginMultiRole');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    switchLoginTab(defaultRole || 'siswa');
  }

  function closeLoginModal() {
    const modal = document.getElementById('modalLoginMultiRole');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function switchLoginTab(role) {
    const tabs = document.querySelectorAll('[data-login-role-tab]');
    tabs.forEach(t => {
      if (t.getAttribute('data-login-role-tab') === role) {
        t.classList.add('border-slate-900', 'text-slate-900', 'font-bold');
        t.classList.remove('border-transparent', 'text-slate-400');
      } else {
        t.classList.remove('border-slate-900', 'text-slate-900', 'font-bold');
        t.classList.add('border-transparent', 'text-slate-400');
      }
    });

    const forms = {
      'siswa': document.getElementById('loginFormContainerSiswa'),
      'panitia': document.getElementById('loginFormContainerPanitia'),
      'admin': document.getElementById('loginFormContainerAdmin')
    };

    Object.keys(forms).forEach(r => {
      if (forms[r]) {
        if (r === role) forms[r].classList.remove('hidden');
        else forms[r].classList.add('hidden');
      }
    });
  }

  function loginAsSiswa(nisnOrReg) {
    if (!nisnOrReg) return;
    const q = nisnOrReg.toUpperCase();
    const match = db.ppdbPendaftar.find(p => p.nisn === q || p.noRegistrasi === q);

    if (!match) {
      alert(`Data pendaftar dengan NISN / Nomor Registrasi "${nisnOrReg}" tidak ditemukan di ${db.settings.namaSekolah}!`);
      return;
    }

    saveSession({
      role: 'siswa',
      registrant: match,
      user: {
        nama: match.namaLengkap,
        nisn: match.nisn,
        noRegistrasi: match.noRegistrasi
      }
    });

    closeLoginModal();
    switchTab('portal-siswa');
    alert(`Selamat datang, ${match.namaLengkap}! Anda masuk ke Portal Calon Siswa ${db.settings.namaSekolah}.`);
  }

  function loginAsPanitia(username, password) {
    const match = db.users.panitia.find(p => p.username === username && p.password === password);
    if (!match) {
      alert('Username atau password Panitia salah! (Petunjuk: username "panitia", password "panitia123")');
      return;
    }

    saveSession({ role: 'panitia', user: match });
    closeLoginModal();
    switchTab('panel-panitia');
    alert(`Selamat bertugas, ${match.nama}! Anda masuk ke Meja Kerja Panitia PPDB ${db.settings.namaSekolah}.`);
  }

  function loginAsAdmin(username, password) {
    if (username === db.users.admin.username && password === db.users.admin.password) {
      saveSession({ role: 'admin', user: db.users.admin });
      closeLoginModal();
      switchTab('panel-admin');
      alert(`Selamat datang di Panel Super Admin ${db.settings.namaSekolah}!`);
    } else {
      alert('Username atau password Super Admin salah! (Petunjuk: username "admin", password "admin123")');
    }
  }

  function logoutSession() {
    if (!confirm('Apakah Anda yakin ingin keluar dari sesi ini?')) return;
    saveSession({ role: 'guest', user: null, registrant: null });
    switchTab('mading');
  }

  function updateAuthUI() {
    const btnNavLogin = document.getElementById('btnNavLogin');
    const userSessionBadge = document.getElementById('userSessionBadge');
    const userSessionName = document.getElementById('userSessionName');
    const userSessionRole = document.getElementById('userSessionRole');

    const navPortalSiswa = document.getElementById('navItemPortalSiswa');
    const navPanelPanitia = document.getElementById('navItemPanelPanitia');
    const navPanelAdmin = document.getElementById('navItemPanelAdmin');

    if (currentSession.role === 'guest') {
      if (btnNavLogin) btnNavLogin.classList.remove('hidden');
      if (userSessionBadge) userSessionBadge.classList.add('hidden');
      if (navPortalSiswa) navPortalSiswa.classList.add('hidden');
      if (navPanelPanitia) navPanelPanitia.classList.add('hidden');
      if (navPanelAdmin) navPanelAdmin.classList.add('hidden');
    } else {
      if (btnNavLogin) btnNavLogin.classList.add('hidden');
      if (userSessionBadge) userSessionBadge.classList.remove('hidden');

      if (currentSession.role === 'siswa') {
        if (userSessionName) userSessionName.textContent = currentSession.user.nama;
        if (userSessionRole) userSessionRole.textContent = `Calon Siswa (${currentSession.user.nisn})`;
        if (navPortalSiswa) navPortalSiswa.classList.remove('hidden');
        if (navPanelPanitia) navPanelPanitia.classList.add('hidden');
        if (navPanelAdmin) navPanelAdmin.classList.add('hidden');
      } else if (currentSession.role === 'panitia') {
        if (userSessionName) userSessionName.textContent = currentSession.user.nama;
        if (userSessionRole) userSessionRole.textContent = 'Panitia / Dewan Guru';
        if (navPortalSiswa) navPortalSiswa.classList.add('hidden');
        if (navPanelPanitia) navPanelPanitia.classList.remove('hidden');
        if (navPanelAdmin) navPanelAdmin.classList.add('hidden');
      } else if (currentSession.role === 'admin') {
        if (userSessionName) userSessionName.textContent = currentSession.user.nama;
        if (userSessionRole) userSessionRole.textContent = 'Kepala Sekolah (Super Admin)';
        if (navPortalSiswa) navPortalSiswa.classList.add('hidden');
        if (navPanelPanitia) navPanelPanitia.classList.remove('hidden');
        if (navPanelAdmin) navPanelAdmin.classList.remove('hidden');
      }
    }
  }

  // ==========================================
  // 3. EDIT IDENTITAS PROFIL SEKOLAH LIVE
  // ==========================================
  function saveSchoolProfileSettings() {
    const nama = document.getElementById('adminSettingNamaSekolah').value.trim();
    const inisial = document.getElementById('adminSettingInisial').value.trim();
    const logo = document.getElementById('adminSettingLogo') ? document.getElementById('adminSettingLogo').value.trim() : 'logo_smpn1.png';
    const alamat = document.getElementById('adminSettingAlamat').value.trim();
    const wa = document.getElementById('adminSettingWa').value.trim();
    const kepsek = document.getElementById('adminSettingKepsek').value.trim();
    const kuotaTot = parseInt(document.getElementById('adminSettingKuotaTotal').value, 10) || 126;
    const kuotaZon = parseInt(document.getElementById('adminSettingKuotaZonasi').value, 10) || 63;
    const kuotaPres = parseInt(document.getElementById('adminSettingKuotaPrestasi').value, 10) || 38;
    const kuotaAfir = parseInt(document.getElementById('adminSettingKuotaAfirmasi').value, 10) || 19;
    const kuotaMut = parseInt(document.getElementById('adminSettingKuotaMutasi').value, 10) || 6;

    if (!nama || !alamat || !wa) {
      alert('Mohon lengkapi nama sekolah, alamat, dan nomor WhatsApp resmi panitia.');
      return;
    }

    db.settings.namaSekolah = nama;
    db.settings.inisialSekolah = inisial;
    db.settings.logoUrl = logo || 'logo_smpn1.png';
    db.settings.alamatSekolah = alamat;
    db.settings.teleponSekolah = wa;
    db.settings.kepalaSekolah = kepsek;
    db.settings.kuotaTotal = kuotaTot;
    db.settings.kuotaZonasi = kuotaZon;
    db.settings.kuotaPrestasi = kuotaPres;
    db.settings.kuotaAfirmasi = kuotaAfir;
    db.settings.kuotaMutasi = kuotaMut;

    saveDatabase(db);
    addAuditLog(currentSession.user ? currentSession.user.nama : 'Admin', 'Super Admin', 'Pembaruan Profil Sekolah', nama, `Kuota: ${kuotaTot}`);

    updateDomWithSchoolProfile();
    updatePpdbStats();
    alert('Profil dan kapasitas kuota SMPN 1 Mesuji Makmur berhasil diperbarui!');
  }

  function updateDomWithSchoolProfile() {
    document.querySelectorAll('.school-name-text').forEach(el => el.textContent = db.settings.namaSekolah);
    document.querySelectorAll('.school-initial-text').forEach(el => el.textContent = db.settings.inisialSekolah);
    document.querySelectorAll('.school-address-text').forEach(el => el.textContent = db.settings.alamatSekolah);
    document.querySelectorAll('.school-wa-text').forEach(el => el.textContent = db.settings.teleponSekolah);
    document.querySelectorAll('.school-kepsek-text').forEach(el => el.textContent = db.settings.kepalaSekolah);
    document.querySelectorAll('.school-logo-img').forEach(el => el.src = db.settings.logoUrl || 'logo_smpn1.png');

    const inNama = document.getElementById('adminSettingNamaSekolah');
    const inInisial = document.getElementById('adminSettingInisial');
    const inLogo = document.getElementById('adminSettingLogo');
    const inAlamat = document.getElementById('adminSettingAlamat');
    const inWa = document.getElementById('adminSettingWa');
    const inKepsek = document.getElementById('adminSettingKepsek');
    const inTot = document.getElementById('adminSettingKuotaTotal');
    const inZon = document.getElementById('adminSettingKuotaZonasi');
    const inPres = document.getElementById('adminSettingKuotaPrestasi');
    const inAfir = document.getElementById('adminSettingKuotaAfirmasi');
    const inMut = document.getElementById('adminSettingKuotaMutasi');

    if (inNama) inNama.value = db.settings.namaSekolah;
    if (inInisial) inInisial.value = db.settings.inisialSekolah;
    if (inLogo) inLogo.value = db.settings.logoUrl || 'logo_smpn1.png';
    if (inAlamat) inAlamat.value = db.settings.alamatSekolah;
    if (inWa) inWa.value = db.settings.teleponSekolah;
    if (inKepsek) inKepsek.value = db.settings.kepalaSekolah;
    if (inTot) inTot.value = db.settings.kuotaTotal;
    if (inZon) inZon.value = db.settings.kuotaZonasi;
    if (inPres) inPres.value = db.settings.kuotaPrestasi;
    if (inAfir) inAfir.value = db.settings.kuotaAfirmasi;
    if (inMut) inMut.value = db.settings.kuotaMutasi;
  }

  // ==========================================
  // 4. ROUTER & NAVIGATION
  // ==========================================
  let currentTab = 'mading';
  let activeFilter = 'Semua';
  let searchQuery = '';
  let kioskInterval = null;
  let currentKioskSlide = 0;

  function initNavigation() {
    const navLinks = document.querySelectorAll('[data-target-tab]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target-tab');
        switchTab(target);

        const mobileMenu = document.getElementById('mobileMenuDrawer');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      });
    });

    const btnMobileToggle = document.getElementById('btnMobileToggle');
    if (btnMobileToggle) {
      btnMobileToggle.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenuDrawer');
        if (mobileMenu) mobileMenu.classList.toggle('hidden');
      });
    }

    const filterBtns = document.querySelectorAll('[data-filter-cat]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          const cat = b.getAttribute('data-filter-cat');
          b.classList.remove('bg-slate-900', 'text-white', 'shadow-xs', 'shadow-md');
          if (cat === 'Karya Pendidik') {
            b.classList.add('bg-gradient-to-r', 'from-amber-200', 'via-amber-300', 'to-amber-200', 'text-amber-950', 'border', 'border-amber-400');
          } else {
            b.classList.add('bg-slate-50', 'text-slate-700', 'border', 'border-slate-200/70');
          }
        });

        const activeCat = btn.getAttribute('data-filter-cat');
        btn.classList.remove('bg-slate-50', 'text-slate-700', 'from-amber-200', 'via-amber-300', 'to-amber-200', 'text-amber-950', 'border-amber-400');
        btn.classList.add('bg-slate-900', 'text-white', 'shadow-xs');

        activeFilter = activeCat;
        renderMadingFeed();
      });
    });

    const searchInput = document.getElementById('searchMadingInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderMadingFeed();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          searchInput.focus();
        }
      });
    }
  }

  function switchTab(tabId) {
    if (tabId === 'portal-siswa' && currentSession.role !== 'siswa') {
      openLoginModal('siswa');
      return;
    }
    if (tabId === 'panel-panitia' && currentSession.role !== 'panitia' && currentSession.role !== 'admin') {
      openLoginModal('panitia');
      return;
    }
    if (tabId === 'panel-admin' && currentSession.role !== 'admin') {
      openLoginModal('admin');
      return;
    }

    currentTab = tabId;

    const views = {
      'mading': document.getElementById('viewMading'),
      'ppdb': document.getElementById('viewPpdb'),
      'tv-kiosk': document.getElementById('viewTvKiosk'),
      'portal-siswa': document.getElementById('viewPortalSiswa'),
      'panel-panitia': document.getElementById('viewPanelPanitia'),
      'panel-admin': document.getElementById('viewPanelAdmin')
    };

    Object.keys(views).forEach(key => {
      const el = views[key];
      if (el) {
        if (key === tabId) el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });

    document.querySelectorAll('[data-target-tab]').forEach(btn => {
      if (btn.getAttribute('data-target-tab') === tabId) {
        btn.classList.add('text-emerald-700', 'font-semibold');
        btn.classList.remove('text-slate-600');
      } else {
        btn.classList.remove('text-emerald-700', 'font-semibold');
        btn.classList.add('text-slate-600');
      }
    });

    if (tabId === 'tv-kiosk') {
      startKioskMode();
    } else {
      stopKioskMode();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'mading') {
      renderMadingFeed();
      renderAgendaWidget();
    } else if (tabId === 'ppdb') {
      updatePpdbStats();
    } else if (tabId === 'portal-siswa') {
      renderPortalSiswa();
    } else if (tabId === 'panel-panitia') {
      renderPanitiaWorkbench();
    } else if (tabId === 'panel-admin') {
      renderAdminDashboard();
    }
  }

  // ==========================================
  // 5. MADING FEED RENDERER DENGAN BADGE GURU
  // ==========================================
  function renderMadingFeed() {
    const container = document.getElementById('madingGridContainer');
    if (!container) return;

    const publishedPosts = db.madingPosts.filter(p => p.status === 'Publish');
    
    const filtered = publishedPosts.filter(item => {
      let matchCat = false;
      if (activeFilter === 'Semua') matchCat = true;
      else if (activeFilter === 'Karya Pendidik') matchCat = (item.penulisRole === 'Guru');
      else matchCat = (item.kategori === activeFilter);

      const matchSearch = !searchQuery || 
        item.judul.toLowerCase().includes(searchQuery) ||
        item.penulis.toLowerCase().includes(searchQuery) ||
        item.konten.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
          <p class="text-slate-600 font-medium">Tidak ada artikel atau karya yang cocok.</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(post => {
      const badgeColor = getCategoryBadgeColor(post.kategori);
      const isGuru = post.penulisRole === 'Guru';

      html += `
        <article class="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col overflow-hidden group">
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img src="${post.gambarUrl}" alt="${escapeHtml(post.judul)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80'">
            <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColor}">
                ${escapeHtml(post.kategori)}
              </span>
              ${isGuru ? `
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-amber-300 border border-amber-400/50 shadow-xs">
                  <svg class="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  Karya Pendidik
                </span>
              ` : ''}
            </div>
            ${post.featured ? `
              <div class="absolute top-3 right-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-white tracking-wide uppercase shadow-xs">
                  Pilihan Redaksi
                </span>
              </div>
            ` : ''}
          </div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span class="font-semibold text-slate-800">${escapeHtml(post.penulis)}</span>
                ${post.kelas ? `<span class="inline-block w-1 h-1 rounded-full bg-slate-300"></span><span class="text-emerald-700 font-medium">${escapeHtml(post.kelas)}</span>` : ''}
                <span class="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                <span>${post.tanggal}</span>
              </div>
              <h3 class="font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition">
                ${escapeHtml(post.judul)}
              </h3>
              <p class="text-slate-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                ${escapeHtml(post.ringkasan || post.konten.substring(0, 130) + '...')}
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button onclick="window.EduPortal.openArticleDetail('${post.id}')" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-700 transition">
                Baca Selengkapnya &rarr;
              </button>
              <button onclick="window.EduPortal.likePost('${post.id}')" class="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 transition p-1.5 rounded-lg hover:bg-rose-50" title="Beri Apresiasi">
                <svg class="w-4 h-4 text-rose-500 fill-rose-50" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span id="like-count-${post.id}">${post.jumlahSuka}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  function getCategoryBadgeColor(kategori) {
    switch (kategori) {
      case 'Prestasi': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Karya Siswa': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Pengumuman': return 'bg-rose-100 text-rose-800 border border-rose-200';
      case 'Pojok Literasi Guru':
      case 'Pojok P5 (Kurikulum Merdeka)':
      case 'Bimbingan Konseling (BK)':
        return 'bg-purple-100 text-purple-900 border border-purple-200';
      case 'Berita': default: return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
  }

  function renderAgendaWidget() {
    const list = document.getElementById('agendaWidgetList');
    if (!list) return;

    let html = '';
    db.agendaSekolah.forEach(item => {
      html += `
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-slate-100/70 transition">
          <div class="flex items-start justify-between gap-2">
            <h4 class="font-bold text-sm text-slate-800 leading-snug">${escapeHtml(item.judul)}</h4>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
              ${escapeHtml(item.tanggal)}
            </span>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-500 mt-2">
            <span>${escapeHtml(item.waktu)}</span>
            <span>•</span>
            <span>${escapeHtml(item.lokasi)}</span>
          </div>
          <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${escapeHtml(item.keterangan)}</p>
        </div>
      `;
    });

    list.innerHTML = html;
  }

  function openArticleDetail(postId) {
    const post = db.madingPosts.find(p => p.id === postId);
    if (!post) return;

    const modal = document.getElementById('articleDetailModal');
    const content = document.getElementById('articleDetailContent');
    if (!modal || !content) return;

    const badgeColor = getCategoryBadgeColor(post.kategori);
    const isGuru = post.penulisRole === 'Guru';

    content.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}">
              ${escapeHtml(post.kategori)}
            </span>
            ${isGuru ? `
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-amber-300 border border-amber-400/40 shadow-xs">
                ✓ Karya Pendidik / Dewan Guru
              </span>
            ` : ''}
          </div>
          <span class="text-xs text-slate-400">${post.tanggal}</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
          ${escapeHtml(post.judul)}
        </h2>
        <div class="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
          <div class="w-10 h-10 rounded-full ${isGuru ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-white font-bold'} flex items-center justify-center text-sm shadow-xs">
            ${post.penulis.charAt(0)}
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">${escapeHtml(post.penulis)}</p>
            <p class="text-xs text-emerald-700 font-medium">${post.kelas ? escapeHtml(post.kelas) : db.settings.namaSekolah}</p>
          </div>
        </div>

        <div class="mb-6 rounded-2xl overflow-hidden max-h-96 bg-slate-100">
          <img src="${post.gambarUrl}" alt="${escapeHtml(post.judul)}" class="w-full h-full object-cover">
        </div>

        <div class="prose max-w-none text-slate-700 leading-relaxed text-base space-y-4 whitespace-pre-line font-normal">
          ${escapeHtml(post.konten)}
        </div>

        ${post.lampiranUrl ? `
          <div class="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <svg class="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <div>
                <h4 class="font-bold text-xs text-emerald-950">Lampiran Bahan Ajar / Modul Bacaan Siswa</h4>
                <p class="text-[11px] text-emerald-800">Disediakan langsung oleh guru penulis.</p>
              </div>
            </div>
            <a href="${escapeHtml(post.lampiranUrl)}" target="_blank" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition">
              Buka / Unduh Lampiran &rarr;
            </a>
          </div>
        ` : ''}

        <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button onclick="window.EduPortal.likePost('${post.id}')" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-sm transition">
            <span>Apresiasi (<span id="modal-like-count">${post.jumlahSuka}</span>)</span>
          </button>
          <button onclick="window.EduPortal.closeArticleDetail()" class="text-sm text-slate-500 hover:text-slate-900 font-semibold">
            Tutup
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleDetail() {
    const modal = document.getElementById('articleDetailModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function likePost(postId) {
    const post = db.madingPosts.find(p => p.id === postId);
    if (!post) return;
    post.jumlahSuka += 1;
    saveDatabase(db);

    const countSpan = document.getElementById(`like-count-${postId}`);
    if (countSpan) countSpan.textContent = post.jumlahSuka;
    const modalCount = document.getElementById('modal-like-count');
    if (modalCount) modalCount.textContent = post.jumlahSuka;
  }

  // ==========================================
  // 6. FORM KIRIM KARYA SISWA & KARYA GURU
  // ==========================================
  function initStudentSubmission() {
    const form = document.getElementById('formKirimKarya');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('karyaNama').value.trim();
      const kelas = document.getElementById('karyaKelas').value.trim();
      const kategori = document.getElementById('karyaKategori').value;
      const judul = document.getElementById('karyaJudul').value.trim();
      const konten = document.getElementById('karyaKonten').value.trim();
      const gambar = document.getElementById('karyaGambar').value.trim() || 
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80';

      if (!nama || !kelas || !judul || !konten) {
        alert('Mohon lengkapi seluruh kolom formulir karya Anda.');
        return;
      }

      const newPost = {
        id: 'POST-USR-' + Date.now().toString().slice(-5),
        judul: judul,
        kategori: kategori,
        penulis: nama,
        penulisRole: 'Siswa',
        kelas: kelas,
        tanggal: new Date().toISOString().split('T')[0],
        ringkasan: konten.substring(0, 110) + '...',
        konten: konten,
        gambarUrl: gambar,
        lampiranUrl: '',
        status: 'Menunggu Moderasi',
        jumlahSuka: 0,
        featured: false
      };

      db.madingPosts.unshift(newPost);
      saveDatabase(db);

      form.reset();
      closeModalKirimKarya();
      alert(`Terima kasih! Karya tulisan Anda berhasil dikirim ke Pembina Mading ${db.settings.namaSekolah}.`);
    });
  }

  function openModalKirimKarya() {
    const modal = document.getElementById('modalKirimKarya');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModalKirimKarya() {
    const modal = document.getElementById('modalKirimKarya');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  // CONTROLLER KIRIM TULISAN GURU (EDUCATOR ENGINE)
  function initTeacherSubmission() {
    const form = document.getElementById('formKirimKaryaGuru');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitKaryaGuruAction(false); // Terbitkan sekarang
    });
  }

  function openModalKirimKaryaGuru() {
    const modal = document.getElementById('modalKirimKaryaGuru');
    if (!modal) return;

    // Prefill data if logged in
    const inNama = document.getElementById('guruNama');
    const inJabatan = document.getElementById('guruJabatan');

    if (currentSession.role === 'admin') {
      if (inNama) inNama.value = db.settings.kepalaSekolah;
      if (inJabatan) inJabatan.value = 'Kepala Sekolah / Dewan Pendidik';
    } else if (currentSession.role === 'panitia') {
      if (inNama) inNama.value = currentSession.user ? currentSession.user.nama : 'Bapak/Ibu Guru SMPN 1 MesMa';
      if (inJabatan) inJabatan.value = 'Panitia / Dewan Guru';
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModalKirimKaryaGuru() {
    const modal = document.getElementById('modalKirimKaryaGuru');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function submitKaryaGuruAction(isDraft) {
    const nama = document.getElementById('guruNama').value.trim();
    const jabatan = document.getElementById('guruJabatan').value.trim();
    const kategori = document.getElementById('guruKategori').value;
    const judul = document.getElementById('guruJudul').value.trim();
    const konten = document.getElementById('guruKonten').value.trim();
    const gambar = document.getElementById('guruGambar').value.trim() || 
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';
    const lampiran = document.getElementById('guruLampiran').value.trim();
    const pinKiosk = document.getElementById('guruPinKiosk').checked;

    if (!nama || !judul || !konten) {
      alert('Mohon isi nama pendidik, judul tulisan, dan naskah artikel Anda.');
      return;
    }

    const newPost = {
      id: 'POST-GURU-' + Date.now().toString().slice(-5),
      judul: judul,
      kategori: kategori,
      penulis: nama,
      penulisRole: 'Guru', // Identitas Pendidik
      kelas: jabatan || 'Dewan Guru SMPN 1 MesMa',
      tanggal: new Date().toISOString().split('T')[0],
      ringkasan: konten.substring(0, 120) + '...',
      konten: konten,
      gambarUrl: gambar,
      lampiranUrl: lampiran,
      status: isDraft ? 'Draf' : 'Publish', // Langsung terbit tanpa antre moderasi
      jumlahSuka: 0,
      featured: pinKiosk // Masuk TV Kiosk jika dicentang
    };

    db.madingPosts.unshift(newPost);
    saveDatabase(db);
    addAuditLog(nama, 'Dewan Guru', isDraft ? 'Simpan Draf Tulisan' : 'Penerbitan Tulisan Pendidik', judul, kategori);

    document.getElementById('formKirimKaryaGuru').reset();
    closeModalKirimKaryaGuru();
    renderMadingFeed();

    if (isDraft) {
      alert(`Tulisan "${judul}" berhasil disimpan sebagai Draf pribadi.`);
    } else {
      alert(`Luar biasa! Tulisan Pendidik "${judul}" berhasil langsung terbit di Mading Digital ${db.settings.namaSekolah}${pinKiosk ? ' dan otomatis masuk ke antrean Layar TV Monitor Lobi!' : '!'}`);
    }
  }

  // ==========================================
  // 7. MODE TV KIOSK (16:9 Display Lobi)
  // ==========================================
  function startKioskMode() {
    stopKioskMode();
    currentKioskSlide = 0;
    renderKioskSlides();
    updateKioskClock();

    kioskInterval = setInterval(() => {
      advanceKioskSlide();
    }, 8000);

    window.kioskClockInterval = setInterval(updateKioskClock, 1000);
  }

  function stopKioskMode() {
    if (kioskInterval) {
      clearInterval(kioskInterval);
      kioskInterval = null;
    }
    if (window.kioskClockInterval) {
      clearInterval(window.kioskClockInterval);
      window.kioskClockInterval = null;
    }
  }

  function updateKioskClock() {
    const clockEl = document.getElementById('kioskLiveClock');
    const dateEl = document.getElementById('kioskLiveDate');
    if (!clockEl || !dateEl) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${hours}:${minutes}:${seconds} WIB`;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('id-ID', options);
  }

  function renderKioskSlides() {
    const container = document.getElementById('kioskSlidesContainer');
    if (!container) return;

    const slidesData = db.madingPosts.filter(p => p.status === 'Publish').slice(0, 5);
    let html = '';
    slidesData.forEach((item, index) => {
      const isActive = index === 0 ? 'active' : 'inactive';
      html += `
        <div class="kiosk-slide ${isActive} absolute inset-0 flex flex-col md:flex-row items-stretch bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl" data-kiosk-index="${index}">
          <div class="w-full md:w-3/5 relative h-72 md:h-full bg-slate-950 overflow-hidden">
            <img src="${item.gambarUrl}" alt="${escapeHtml(item.judul)}" class="w-full h-full object-cover opacity-90">
            <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
            <div class="absolute top-6 left-6 flex flex-col gap-2 items-start">
              <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 tracking-wider uppercase">
                ${escapeHtml(item.kategori)}
              </span>
              ${item.penulisRole === 'Guru' ? `
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950 text-amber-300 border border-amber-400/60 shadow-lg">
                  ✓ Karya Pendidik
                </span>
              ` : ''}
            </div>
          </div>
          <div class="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-slate-900 text-white">
            <div>
              <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span class="font-semibold text-emerald-400">${escapeHtml(item.penulis)}</span>
                <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>${item.tanggal}</span>
              </div>
              <h2 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4">
                ${escapeHtml(item.judul)}
              </h2>
              <p class="text-slate-300 text-base md:text-lg leading-relaxed line-clamp-5">
                ${escapeHtml(item.ringkasan || item.konten)}
              </p>
            </div>
            <div class="pt-6 border-t border-slate-800 flex items-center justify-between">
              <span class="text-xs font-mono text-emerald-400">#${db.settings.inisialSekolah}</span>
              <span class="text-xs text-slate-400">Slide ${index + 1} dari ${slidesData.length}</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function advanceKioskSlide() {
    const slides = document.querySelectorAll('.kiosk-slide');
    if (slides.length <= 1) return;

    slides[currentKioskSlide].classList.remove('active');
    slides[currentKioskSlide].classList.add('inactive');

    currentKioskSlide = (currentKioskSlide + 1) % slides.length;

    slides[currentKioskSlide].classList.remove('inactive');
    slides[currentKioskSlide].classList.add('active');
  }

  function toggleFullscreenKiosk() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // ==========================================
  // 8. PPDB ONLINE & FORM CONTROLLER
  // ==========================================
  function updatePpdbStats() {
    const totalPendaftar = db.ppdbPendaftar.length;
    const kuota = db.settings.kuotaTotal;
    const sisa = Math.max(0, kuota - totalPendaftar);

    const elTotal = document.getElementById('statPpdbTotal');
    const elSisa = document.getElementById('statPpdbSisa');
    if (elTotal) elTotal.textContent = totalPendaftar;
    if (elSisa) elSisa.textContent = sisa;

    const formBox = document.getElementById('formPendaftaranPpdbContainer');
    const closedBox = document.getElementById('boxPpdbDitutup');
    if (formBox && closedBox) {
      if (db.settings.ppdbOpen) {
        formBox.classList.remove('hidden');
        closedBox.classList.add('hidden');
      } else {
        formBox.classList.add('hidden');
        closedBox.classList.remove('hidden');
      }
    }
  }

  function initPpdbRegistrationForm() {
    const form = document.getElementById('formPendaftaranPpdb');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!db.settings.ppdbOpen) {
        alert(`Mohon maaf, pendaftaran PPDB online ${db.settings.namaSekolah} sedang ditutup.`);
        return;
      }

      const nisn = document.getElementById('ppdbNisn').value.trim();
      const nama = document.getElementById('ppdbNama').value.trim();
      const jenisKelamin = document.getElementById('ppdbGender').value;
      const tempatLahir = document.getElementById('ppdbTempatLahir').value.trim();
      const tanggalLahir = document.getElementById('ppdbTanggalLahir').value;
      const asalSekolah = document.getElementById('ppdbAsalSd').value.trim();
      const jalur = document.getElementById('ppdbJalur').value;
      const jarak = parseFloat(document.getElementById('ppdbJarak').value) || 1.0;
      const nilai = parseFloat(document.getElementById('ppdbNilai').value) || 80.0;
      const namaWali = document.getElementById('ppdbNamaWali').value.trim();
      const noHpWa = document.getElementById('ppdbNoHp').value.trim();

      if (!/^\d{10}$/.test(nisn)) {
        alert('NISN (Nomor Induk Siswa Nasional) wajib terdiri dari tepat 10 digit angka!');
        document.getElementById('ppdbNisn').focus();
        return;
      }

      const exist = db.ppdbPendaftar.find(p => p.nisn === nisn);
      if (exist) {
        alert(`NISN ${nisn} sudah terdaftar dengan Nomor Registrasi: ${exist.noRegistrasi}. Silakan login ke Portal Siswa untuk memantau status.`);
        return;
      }

      if (!noHpWa.startsWith('08') && !noHpWa.startsWith('628')) {
        alert('Nomor kontak WhatsApp wajib diawali format standar Indonesia (08... atau 628...).');
        document.getElementById('ppdbNoHp').focus();
        return;
      }

      const newNoReg = generatePpdbId();

      const newRegistrant = {
        id: 'PPDB-REC-' + Date.now().toString().slice(-6),
        noRegistrasi: newNoReg,
        nisn: nisn,
        namaLengkap: nama,
        jenisKelamin: jenisKelamin,
        tempatLahir: tempatLahir,
        tanggalLahir: tanggalLahir,
        asalSekolah: asalSekolah,
        jalurPendaftaran: jalur,
        jarakRumahKm: jarak,
        nilaiRataRata: nilai,
        namaWali: namaWali,
        noHpWa: noHpWa,
        statusVerifikasi: 'Menunggu Verifikasi',
        catatanPanitia: `Pendaftaran mandiri di ${db.settings.namaSekolah} berhasil disimpan. Menunggu pemeriksaan verifikator.`,
        waktuDaftar: new Date().toISOString().replace('T', ' ').substring(0, 16),
        berkasPerbaikan: null,
        konfirmasiDaftarUlang: false
      };

      db.ppdbPendaftar.unshift(newRegistrant);
      saveDatabase(db);
      addAuditLog(nama, 'Pendaftar Siswa', 'Pendaftaran Baru', newNoReg, `Jalur ${jalur}`);

      form.reset();
      showPpdbSuccessModal(newRegistrant);
      updatePpdbStats();
    });
  }

  function showPpdbSuccessModal(pendaftar) {
    const modal = document.getElementById('ppdbSuccessModal');
    const content = document.getElementById('ppdbSuccessCardPreview');
    if (!modal || !content) return;

    content.innerHTML = renderRegistrationCardHtml(pendaftar);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function openModalVisiMisi() {
    const modal = document.getElementById('modalVisiMisi');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModalVisiMisi() {
    const modal = document.getElementById('modalVisiMisi');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function generateQrSvg(regNo, nisn) {
    const size = 25;
    let seed = 0;
    const str = String(regNo) + String(nisn) + 'SMPN1MESUJIMAKMUR';
    for (let i = 0; i < str.length; i++) {
      seed = ((seed << 5) - seed) + str.charCodeAt(i);
      seed |= 0;
    }

    function isFinder(r, c) {
      if (r < 7 && c < 7) return true;
      if (r < 7 && c >= size - 7) return true;
      if (r >= size - 7 && c < 7) return true;
      return false;
    }

    function finderCell(r, c) {
      const lr = r < 7 ? r : (r >= size - 7 ? r - (size - 7) : 0);
      const lc = c < 7 ? c : (c >= size - 7 ? c - (size - 7) : 0);
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return 1;
      if (lr === 1 || lr === 5 || lc === 1 || lc === 5) return 0;
      return 1;
    }

    let rects = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        let isDark = false;
        if (isFinder(r, c)) {
          isDark = finderCell(r, c) === 1;
        } else if (r === 6 || c === 6) {
          isDark = (r + c) % 2 === 0;
        } else {
          seed = (seed * 1103515245 + 12345) & 0x7fffffff;
          isDark = (seed % 3) === 0;
        }
        if (isDark) {
          rects += `<rect x="${c * 4}" y="${r * 4}" width="4" height="4" fill="#0f172a"/>`;
        }
      }
    }

    return `
      <svg viewBox="0 0 100 100" class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-white p-1 rounded-lg border border-slate-300 shadow-2xs">
        ${rects}
      </svg>
    `;
  }

  function renderRegistrationCardHtml(p) {
    return `
      <div id="printArea" class="bg-white p-6 md:p-8 rounded-2xl border border-slate-300 text-slate-900 shadow-xs">
        <div class="flex items-center gap-4 pb-4 border-b-2 border-slate-900 text-center md:text-left">
          <div class="w-16 h-16 rounded-xl bg-white border border-slate-300 p-1 flex items-center justify-center shrink-0 mx-auto md:mx-0 shadow-2xs">
            <img src="${db.settings.logoUrl || 'logo_smpn1.png'}" alt="Logo SMPN 1 Mesuji Makmur" class="w-full h-full object-contain school-logo-img">
          </div>
          <div class="flex-1">
            <h3 class="font-extrabold text-base md:text-xl uppercase tracking-wide text-slate-900">
              PANITIA PENERIMAAN PESERTA DIDIK BARU (PPDB)
            </h3>
            <h4 class="font-bold text-sm md:text-lg text-emerald-800">
              ${escapeHtml(db.settings.namaSekolah)}
            </h4>
            <p class="text-xs text-slate-500 mt-0.5">
              ${escapeHtml(db.settings.alamatSekolah)} | WA Panitia: ${escapeHtml(db.settings.teleponSekolah)}
            </p>
          </div>
        </div>

        <div class="py-4 my-3 px-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span class="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
              Tanda Bukti Registrasi Sah • PPDB Daring
            </span>
            <h2 class="text-2xl sm:text-3xl font-black font-mono text-slate-900 mt-1">
              ${p.noRegistrasi}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">Waktu Registrasi: ${p.waktuDaftar} WIB</p>
            <p class="text-[11px] font-mono text-emerald-700 font-bold mt-1 flex items-center justify-center sm:justify-start gap-1">
              <span>● DOKUMEN TEREGISTRASI RESMI</span>
            </p>
          </div>
          <div class="flex flex-col items-center sm:items-end gap-1 shrink-0">
            ${generateQrSvg(p.noRegistrasi, p.nisn)}
            <span class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Scan Verifikasi Keaslian</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-slate-200 text-sm">
          <div class="space-y-2">
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Nama Lengkap:</span>
              <span class="font-bold text-slate-900">${escapeHtml(p.namaLengkap)}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">NISN Siswa:</span>
              <span class="font-mono font-semibold">${p.nisn}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Jenis Kelamin:</span>
              <span>${p.jenisKelamin}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Tempat, Tgl Lahir:</span>
              <span>${escapeHtml(p.tempatLahir)}, ${p.tanggalLahir}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Asal SD / MI:</span>
              <span class="font-semibold">${escapeHtml(p.asalSekolah)}</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Jalur Seleksi:</span>
              <span class="inline-block px-2 py-0.5 text-xs font-bold rounded bg-emerald-100 text-emerald-800">${p.jalurPendaftaran}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Jarak Domisili:</span>
              <span>${p.jarakRumahKm} km ke sekolah</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Nilai Rata-rata:</span>
              <span class="font-bold">${p.nilaiRataRata}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Nama Orang Tua / Wali:</span>
              <span>${escapeHtml(p.namaWali)}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-1">
              <span class="text-slate-500">Kontak WhatsApp:</span>
              <span class="font-mono">${escapeHtml(p.noHpWa)}</span>
            </div>
          </div>
        </div>

        <div class="p-3 my-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>Perhatian:</strong> Simpan tanda bukti registrasi ini. Anda dapat login ke <strong>Portal Siswa</strong> kapan saja menggunakan NISN 10 digit Anda.
        </div>

        <div class="grid grid-cols-2 gap-8 pt-6 text-center text-xs text-slate-700">
          <div>
            <p>Orang Tua / Wali Siswa</p>
            <div class="h-16"></div>
            <p class="font-bold underline">${escapeHtml(p.namaWali)}</p>
          </div>
          <div>
            <p>Kepala Sekolah / Panitia PPDB</p>
            <div class="h-16 flex items-center justify-center">
              <span class="text-[10px] font-mono border border-dashed border-emerald-600 px-3 py-1 rounded text-emerald-700">
                TEREGIS-ONLINE
              </span>
            </div>
            <p class="font-bold underline">${escapeHtml(db.settings.kepalaSekolah)}</p>
          </div>
        </div>
      </div>
    `;
  }

  function printRegistrationCard() {
    window.print();
  }

  function closePpdbSuccessModal() {
    const modal = document.getElementById('ppdbSuccessModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function initCheckPpdbStatus() {
    const btn = document.getElementById('btnCekStatusPpdb');
    const input = document.getElementById('inputCekNisn');
    const resultBox = document.getElementById('boxHasilCekStatus');
    if (!btn || !input || !resultBox) return;

    btn.addEventListener('click', () => {
      const q = input.value.trim().toUpperCase();
      if (!q) {
        alert('Masukkan NISN 10 digit atau Nomor Registrasi Anda.');
        return;
      }

      const match = db.ppdbPendaftar.find(p => p.nisn === q || p.noRegistrasi === q);
      resultBox.classList.remove('hidden');

      if (!match) {
        resultBox.innerHTML = `
          <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm">
            <p class="font-bold">Data Tidak Ditemukan!</p>
            <p class="text-xs mt-1">NISN atau No. Registrasi "${escapeHtml(q)}" belum terdaftar di ${db.settings.namaSekolah}.</p>
          </div>
        `;
        return;
      }

      resultBox.innerHTML = `
        <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span class="text-xs text-slate-400">Nomor Registrasi:</span>
              <h4 class="font-mono font-bold text-slate-900">${match.noRegistrasi}</h4>
            </div>
            <div>
              <span class="px-3 py-1 text-xs font-bold rounded-full ${getStatusBadgeClass(match.statusVerifikasi)}">
                ${match.statusVerifikasi}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div><span class="text-slate-400">Nama Siswa:</span> <p class="font-bold text-slate-800">${escapeHtml(match.namaLengkap)}</p></div>
            <div><span class="text-slate-400">Jalur:</span> <p class="font-bold text-slate-800">${match.jalurPendaftaran}</p></div>
          </div>
          <div class="pt-2 flex items-center justify-between">
            <button onclick="window.EduPortal.loginAsSiswa('${match.nisn}')" class="text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1">
              Buka Portal Siswa Mandiri &rarr;
            </button>
            <button onclick="window.EduPortal.showPpdbSuccessModalByNo('${match.noRegistrasi}')" class="text-xs font-semibold text-emerald-700 hover:underline">
              Cetak Bukti PDF
            </button>
          </div>
        </div>
      `;
    });
  }

  function getStatusBadgeClass(status) {
    if (status === 'Diterima') return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
    if (status === 'Lolos Berkas') return 'bg-blue-100 text-blue-800 border border-blue-300';
    if (status === 'Cadangan') return 'bg-amber-100 text-amber-800 border border-amber-300';
    if (status === 'Ditolak') return 'bg-rose-100 text-rose-800 border border-rose-300';
    return 'bg-slate-100 text-slate-800 border border-slate-300';
  }

  function showPpdbSuccessModalByNo(noReg) {
    const item = db.ppdbPendaftar.find(p => p.noRegistrasi === noReg);
    if (item) showPpdbSuccessModal(item);
  }

  // ==========================================
  // 9. PORTAL SISWA MANDIRI
  // ==========================================
  function renderPortalSiswa() {
    if (currentSession.role !== 'siswa' || !currentSession.registrant) return;

    const p = db.ppdbPendaftar.find(item => item.nisn === currentSession.registrant.nisn) || currentSession.registrant;
    currentSession.registrant = p;

    const nameEl = document.getElementById('portalSiswaNamaHeader');
    const nisnEl = document.getElementById('portalSiswaNisnHeader');
    const regEl = document.getElementById('portalSiswaRegHeader');
    if (nameEl) nameEl.textContent = p.namaLengkap;
    if (nisnEl) nisnEl.textContent = p.nisn;
    if (regEl) regEl.textContent = p.noRegistrasi;

    const step1 = document.getElementById('stepSiswa1');
    const step2 = document.getElementById('stepSiswa2');
    const step3 = document.getElementById('stepSiswa3');
    const step4 = document.getElementById('stepSiswa4');

    if (step1 && step2 && step3 && step4) {
      setStepState(step1, true, false);

      if (p.statusVerifikasi === 'Menunggu Verifikasi') {
        setStepState(step2, false, true);
        setStepState(step3, false, false);
        setStepState(step4, false, false);
      } else if (p.statusVerifikasi === 'Lolos Berkas') {
        setStepState(step2, true, false);
        setStepState(step3, false, true);
        setStepState(step4, false, false);
      } else if (p.statusVerifikasi === 'Diterima' || p.statusVerifikasi === 'Cadangan' || p.statusVerifikasi === 'Ditolak') {
        setStepState(step2, true, false);
        setStepState(step3, true, false);
        setStepState(step4, true, false);
      }
    }

    const bannerBox = document.getElementById('portalSiswaStatusBanner');
    if (bannerBox) {
      if (p.statusVerifikasi === 'Diterima') {
        bannerBox.className = 'p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4';
        bannerBox.innerHTML = `
          <div>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white uppercase tracking-wider mb-1">
              SELAMAT! ANDA DINYATAKAN DITERIMA
            </span>
            <h3 class="text-lg font-black text-emerald-950 mt-1">Peserta Didik Baru ${escapeHtml(db.settings.namaSekolah)}</h3>
            <p class="text-xs text-emerald-800 mt-1">Silakan lakukan konfirmasi komitmen daftar ulang sebelum jadwal ditutup.</p>
          </div>
          <div class="shrink-0">
            ${p.konfirmasiDaftarUlang ? `
              <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
                ✓ Sudah Konfirmasi Daftar Ulang
              </span>
            ` : `
              <button onclick="window.EduPortal.konfirmasiDaftarUlangSiswa('${p.nisn}')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition">
                Konfirmasi Daftar Ulang Sekarang &rarr;
              </button>
            `}
          </div>
        `;
      } else if (p.statusVerifikasi === 'Lolos Berkas') {
        bannerBox.className = 'p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950';
        bannerBox.innerHTML = `
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-blue-700">Lolos Verifikasi Administrasi</span>
          </div>
          <h3 class="text-base font-bold text-blue-900">Berkas KK, Akta, dan Jalur ${p.jalurPendaftaran} Telah Dinyatakan Lengkap</h3>
          <p class="text-xs text-blue-800 mt-1">Pengumuman final kelulusan serentak pada: <strong>${db.settings.tanggalPengumuman}</strong>.</p>
        `;
      } else if (p.statusVerifikasi === 'Ditolak') {
        bannerBox.className = 'p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950';
        bannerBox.innerHTML = `
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white uppercase tracking-wider mb-1">
            Belum Memenuhi Syarat Seleksi
          </span>
          <h3 class="text-base font-bold text-rose-900 mt-1">Mohon Maaf, Kuota Jalur ${p.jalurPendaftaran} Telah Terpenuhi</h3>
          <p class="text-xs text-rose-800 mt-1">${escapeHtml(p.catatanPanitia || 'Terima kasih atas partisipasi Anda.')}</p>
        `;
      } else {
        bannerBox.className = 'p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800';
        bannerBox.innerHTML = `
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Tahap 1: Menunggu Pemeriksaan</span>
          </div>
          <h3 class="text-base font-bold text-slate-900">Berkas Telah Diterima Sistem</h3>
          <p class="text-xs text-slate-600 mt-1">Panitia PPDB ${db.settings.namaSekolah} sedang memverifikasi berkas Anda.</p>
        `;
      }
    }

    const notesBox = document.getElementById('portalSiswaCatatanPanitia');
    if (notesBox) {
      notesBox.textContent = p.catatanPanitia || 'Belum ada catatan khusus dari panitia.';
    }

    const dataBox = document.getElementById('portalSiswaDetailRingkasan');
    if (dataBox) {
      dataBox.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div><span class="text-slate-400">Jalur Pendaftaran:</span> <p class="font-bold text-slate-900">${p.jalurPendaftaran}</p></div>
          <div><span class="text-slate-400">Asal SD/MI:</span> <p class="font-bold text-slate-900">${escapeHtml(p.asalSekolah)}</p></div>
          <div><span class="text-slate-400">Jarak Rumah ke SMP:</span> <p class="font-bold text-slate-900">${p.jarakRumahKm} km</p></div>
          <div><span class="text-slate-400">Nilai Rata-rata:</span> <p class="font-bold text-slate-900">${p.nilaiRataRata}</p></div>
          <div><span class="text-slate-400">Nama Orang Tua / Wali:</span> <p class="font-bold text-slate-900">${escapeHtml(p.namaWali)}</p></div>
          <div><span class="text-slate-400">No. WhatsApp:</span> <p class="font-mono text-slate-900">${escapeHtml(p.noHpWa)}</p></div>
        </div>
      `;
    }
  }

  function setStepState(el, isDone, isActive) {
    const circle = el.querySelector('.step-circle');
    const label = el.querySelector('.step-label');
    if (!circle || !label) return;

    if (isDone) {
      circle.className = 'step-circle w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs';
      circle.innerHTML = '✓';
      label.className = 'step-label text-xs font-bold text-slate-900 mt-2 text-center';
    } else if (isActive) {
      circle.className = 'step-circle w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-amber-100 shadow-xs animate-pulse';
      circle.textContent = '...';
      label.className = 'step-label text-xs font-bold text-amber-700 mt-2 text-center';
    } else {
      circle.className = 'step-circle w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0';
      circle.textContent = 'o';
      label.className = 'step-label text-xs font-medium text-slate-400 mt-2 text-center';
    }
  }

  function submitRevisiBerkasSiswa() {
    if (currentSession.role !== 'siswa' || !currentSession.registrant) return;
    const p = db.ppdbPendaftar.find(item => item.nisn === currentSession.registrant.nisn);
    if (!p) return;

    const catatanRevisi = document.getElementById('inputRevisiDokumenSiswa').value.trim();
    if (!catatanRevisi) {
      alert('Tuliskan rincian perbaikan berkas yang telah Anda perbarui.');
      return;
    }

    p.berkasPerbaikan = catatanRevisi;
    p.statusVerifikasi = 'Menunggu Verifikasi';
    p.catatanPanitia = `Siswa telah mengunggah perbaikan berkas: "${catatanRevisi}". Menunggu verifikasi ulang panitia.`;
    saveDatabase(db);
    addAuditLog(p.namaLengkap, 'Siswa', 'Unggah Perbaikan Berkas', p.noRegistrasi, catatanRevisi);

    document.getElementById('inputRevisiDokumenSiswa').value = '';
    renderPortalSiswa();
    alert('Terima kasih! Pemberitahuan perbaikan dokumen Anda telah terkirim ke Meja Kerja Panitia PPDB.');
  }

  function konfirmasiDaftarUlangSiswa(nisn) {
    const p = db.ppdbPendaftar.find(item => item.nisn === nisn);
    if (!p) return;

    if (!confirm(`Apakah Anda menyatakan komitmen bersedia daftar ulang sebagai Peserta Didik Baru ${db.settings.namaSekolah}?`)) return;

    p.konfirmasiDaftarUlang = true;
    saveDatabase(db);
    addAuditLog(p.namaLengkap, 'Siswa', 'Konfirmasi Daftar Ulang', p.noRegistrasi, 'Menyatakan hadir daftar ulang.');
    renderPortalSiswa();
    alert('Selamat! Konfirmasi komitmen daftar ulang Anda telah tercatat secara resmi di basis data sekolah.');
  }

  // ==========================================
  // 10. MEJA KERJA PANITIA PPDB
  // ==========================================
  let panitiaFilterJalur = 'Semua';
  let panitiaFilterStatus = 'Semua';
  let panitiaSortMode = 'default';

  function renderPanitiaWorkbench() {
    renderPanitiaQuotaCards();
    renderPanitiaApplicantTable();
  }

  function renderPanitiaQuotaCards() {
    const zonasiCount = db.ppdbPendaftar.filter(p => p.jalurPendaftaran === 'Zonasi' && (p.statusVerifikasi === 'Lolos Berkas' || p.statusVerifikasi === 'Diterima')).length;
    const prestasiCount = db.ppdbPendaftar.filter(p => p.jalurPendaftaran === 'Prestasi' && (p.statusVerifikasi === 'Lolos Berkas' || p.statusVerifikasi === 'Diterima')).length;
    const afirmasiCount = db.ppdbPendaftar.filter(p => p.jalurPendaftaran === 'Afirmasi' && (p.statusVerifikasi === 'Lolos Berkas' || p.statusVerifikasi === 'Diterima')).length;
    const mutasiCount = db.ppdbPendaftar.filter(p => p.jalurPendaftaran === 'Mutasi' && (p.statusVerifikasi === 'Lolos Berkas' || p.statusVerifikasi === 'Diterima')).length;

    const elZon = document.getElementById('panitiaKuotaZonasi');
    const elPres = document.getElementById('panitiaKuotaPrestasi');
    const elAfir = document.getElementById('panitiaKuotaAfirmasi');
    const elMut = document.getElementById('panitiaKuotaMutasi');

    if (elZon) elZon.textContent = `${zonasiCount} / ${db.settings.kuotaZonasi}`;
    if (elPres) elPres.textContent = `${prestasiCount} / ${db.settings.kuotaPrestasi}`;
    if (elAfir) elAfir.textContent = `${afirmasiCount} / ${db.settings.kuotaAfirmasi}`;
    if (elMut) elMut.textContent = `${mutasiCount} / ${db.settings.kuotaMutasi}`;
  }

  function setPanitiaSortMode(mode) {
    panitiaSortMode = mode;
    renderPanitiaApplicantTable();
  }

  function setPanitiaFilter(jalur, status) {
    if (jalur !== undefined) panitiaFilterJalur = jalur;
    if (status !== undefined) panitiaFilterStatus = status;
    renderPanitiaApplicantTable();
  }

  function renderPanitiaApplicantTable() {
    const tbody = document.getElementById('panitiaTableBody');
    if (!tbody) return;

    let list = [...db.ppdbPendaftar];

    if (panitiaFilterJalur !== 'Semua') {
      list = list.filter(p => p.jalurPendaftaran === panitiaFilterJalur);
    }
    if (panitiaFilterStatus !== 'Semua') {
      list = list.filter(p => p.statusVerifikasi === panitiaFilterStatus);
    }

    if (panitiaSortMode === 'zonasi_jarak') {
      list.sort((a, b) => a.jarakRumahKm - b.jarakRumahKm);
    } else if (panitiaSortMode === 'prestasi_nilai') {
      list.sort((a, b) => b.nilaiRataRata - a.nilaiRataRata);
    }

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-12 text-center text-slate-400 text-xs">
            Tidak ada calon siswa pada kriteria filter ini.
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    list.forEach((p, idx) => {
      const badgeClass = getStatusBadgeClass(p.statusVerifikasi);

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
          <td class="py-3 px-4 font-mono font-bold text-slate-900">
            ${panitiaSortMode !== 'default' ? `<span class="inline-block w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] text-center leading-5 mr-1 font-sans">${idx + 1}</span>` : ''}
            ${p.noRegistrasi}
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-slate-800">${escapeHtml(p.namaLengkap)}</div>
            <div class="text-[11px] text-slate-400">NISN: ${p.nisn} | ${escapeHtml(p.asalSekolah)}</div>
            ${p.berkasPerbaikan ? `<span class="inline-block mt-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Ada Perbaikan Berkas</span>` : ''}
          </td>
          <td class="py-3 px-4">
            <span class="font-bold text-slate-700">${p.jalurPendaftaran}</span>
            <div class="text-[11px] text-slate-400">Jarak: ${p.jarakRumahKm} km | Rapor: ${p.nilaiRataRata}</div>
          </td>
          <td class="py-3 px-4">
            <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${badgeClass}">
              ${p.statusVerifikasi}
            </span>
            <div class="text-[10px] text-slate-400 mt-1 line-clamp-1" title="${escapeHtml(p.catatanPanitia || '')}">
              ${escapeHtml(p.catatanPanitia || '-')}
            </div>
          </td>
          <td class="py-3 px-4 font-mono">
            <a href="https://wa.me/${p.noHpWa.replace(/^0/, '62')}" target="_blank" class="text-emerald-700 hover:underline flex items-center gap-1">
              ${escapeHtml(p.noHpWa)}
            </a>
          </td>
          <td class="py-3 px-4 text-right">
            <button onclick="window.EduPortal.openVerifikasiModal('${p.noRegistrasi}')" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition shadow-xs">
              Verifikasi &amp; Catat
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  function openVerifikasiModal(noReg) {
    const p = db.ppdbPendaftar.find(item => item.noRegistrasi === noReg);
    if (!p) return;

    const modal = document.getElementById('modalVerifikasiPanitia');
    const content = document.getElementById('modalVerifikasiContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="p-6">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span class="text-xs font-mono font-bold text-emerald-700">${p.noRegistrasi}</span>
            <h3 class="text-lg font-bold text-slate-900">${escapeHtml(p.namaLengkap)}</h3>
            <p class="text-xs text-slate-400">NISN: ${p.nisn} | Asal: ${escapeHtml(p.asalSekolah)}</p>
          </div>
          <button onclick="window.EduPortal.closeVerifikasiModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="grid grid-cols-2 gap-3 p-3 my-4 bg-slate-50 rounded-xl text-xs">
          <div><span class="text-slate-400">Jalur Pilihan:</span> <p class="font-bold text-slate-800">${p.jalurPendaftaran}</p></div>
          <div><span class="text-slate-400">Jarak Domisili:</span> <p class="font-bold text-slate-800">${p.jarakRumahKm} km</p></div>
          <div><span class="text-slate-400">Nilai Rata-rata Rapor:</span> <p class="font-bold text-slate-800">${p.nilaiRataRata}</p></div>
          <div><span class="text-slate-400">Orang Tua / Kontak:</span> <p class="font-bold text-slate-800">${escapeHtml(p.namaWali)} (${p.noHpWa})</p></div>
        </div>

        ${p.berkasPerbaikan ? `
          <div class="p-3 mb-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Catatan Siswa Mengenai Berkas Perbaikan:</strong>
            <p class="mt-1">${escapeHtml(p.berkasPerbaikan)}</p>
          </div>
        ` : ''}

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Pilih Status Verifikasi:</label>
            <select id="inputStatusVerifikasiModal" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 font-semibold">
              <option value="Menunggu Verifikasi" ${p.statusVerifikasi === 'Menunggu Verifikasi' ? 'selected' : ''}>Menunggu Verifikasi</option>
              <option value="Lolos Berkas" ${p.statusVerifikasi === 'Lolos Berkas' ? 'selected' : ''}>Lolos Verifikasi Berkas</option>
              <option value="Diterima" ${p.statusVerifikasi === 'Diterima' ? 'selected' : ''}>Dinyatakan DITERIMA (Lolos Seleksi)</option>
              <option value="Cadangan" ${p.statusVerifikasi === 'Cadangan' ? 'selected' : ''}>Status Cadangan</option>
              <option value="Ditolak" ${p.statusVerifikasi === 'Ditolak' ? 'selected' : ''}>Ditolak (Tidak Memenuhi Syarat / Kuota Habis)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Catatan Panitia (Akan Tampil di Akun Siswa):</label>
            <textarea id="inputCatatanVerifikasiModal" rows="3" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 leading-relaxed" placeholder="Contoh: Berkas KK valid...">${escapeHtml(p.catatanPanitia || '')}</textarea>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <button onclick="window.EduPortal.closeVerifikasiModal()" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100">Batal</button>
          <button onclick="window.EduPortal.saveVerifikasiPanitia('${p.noRegistrasi}')" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs">Simpan Keputusan</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeVerifikasiModal() {
    const modal = document.getElementById('modalVerifikasiPanitia');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function saveVerifikasiPanitia(noReg) {
    const p = db.ppdbPendaftar.find(item => item.noRegistrasi === noReg);
    if (!p) return;

    const newStatus = document.getElementById('inputStatusVerifikasiModal').value;
    const newNotes = document.getElementById('inputCatatanVerifikasiModal').value.trim();

    p.statusVerifikasi = newStatus;
    p.catatanPanitia = newNotes;
    p.berkasPerbaikan = null;

    const actor = currentSession.user ? currentSession.user.nama : 'Panitia PPDB';
    addAuditLog(actor, 'Panitia PPDB', `Ubah Status ke ${newStatus}`, p.noRegistrasi, newNotes);

    saveDatabase(db);
    closeVerifikasiModal();
    renderPanitiaWorkbench();
    alert(`Status pendaftar ${p.namaLengkap} berhasil diperbarui.`);
  }

  // ==========================================
  // 11. PANEL SUPER ADMIN
  // ==========================================
  function renderAdminDashboard() {
    updateDomWithSchoolProfile();
    renderAdminMasterSettings();
    renderAdminMadingModeration();
    renderAdminPanitiaAccounts();
    renderAdminAuditLogs();
  }

  function renderAdminMasterSettings() {
    const toggleBtn = document.getElementById('btnTogglePpdbOpen');
    const statusText = document.getElementById('textPpdbOpenStatus');
    if (!toggleBtn || !statusText) return;

    if (db.settings.ppdbOpen) {
      statusText.innerHTML = '<span class="text-emerald-700 font-bold">DIBUKA (Aktif Menerima Pendaftaran)</span>';
      toggleBtn.textContent = 'Tutup Pendaftaran PPDB';
      toggleBtn.className = 'px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition';
    } else {
      statusText.innerHTML = '<span class="text-rose-700 font-bold">DITUTUP (Pendaftaran Nonaktif)</span>';
      toggleBtn.textContent = 'Buka Pendaftaran PPDB';
      toggleBtn.className = 'px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition';
    }

    const tglEl = document.getElementById('adminTanggalPengumumanInput');
    if (tglEl) tglEl.value = db.settings.tanggalPengumuman;
  }

  function togglePpdbOpenGlobal() {
    db.settings.ppdbOpen = !db.settings.ppdbOpen;
    saveDatabase(db);
    addAuditLog(currentSession.user.nama, 'Super Admin', db.settings.ppdbOpen ? 'Buka Pendaftaran Global' : 'Tutup Pendaftaran Global', db.settings.namaSekolah);
    renderAdminMasterSettings();
    updatePpdbStats();
    alert(`Status pendaftaran PPDB ${db.settings.namaSekolah}: ${db.settings.ppdbOpen ? 'DIBUKA' : 'DITUTUP'}.`);
  }

  function savePengumumanDate() {
    const val = document.getElementById('adminTanggalPengumumanInput').value.trim();
    if (!val) return;
    db.settings.tanggalPengumuman = val;
    saveDatabase(db);
    addAuditLog(currentSession.user.nama, 'Super Admin', 'Ubah Tanggal Pengumuman', val);
    alert('Jadwal rilis pengumuman kelulusan berhasil diperbarui.');
  }

  function renderAdminMadingModeration() {
    const list = document.getElementById('adminPendingMadingList');
    const badgeCount = document.getElementById('adminPendingBadge');
    if (!list) return;

    const pendingPosts = db.madingPosts.filter(p => p.status === 'Menunggu Moderasi');
    if (badgeCount) badgeCount.textContent = pendingPosts.length;

    if (pendingPosts.length === 0) {
      list.innerHTML = `
        <div class="py-10 text-center text-slate-400">
          <p class="text-xs font-medium">Tidak ada antrean kiriman karya baru saat ini.</p>
        </div>
      `;
      return;
    }

    let html = '';
    pendingPosts.forEach(post => {
      html += `
        <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-100 text-amber-800">${escapeHtml(post.kategori)}</span>
              <span class="text-xs text-slate-400">${post.tanggal}</span>
              <span class="text-xs font-semibold text-emerald-700">${escapeHtml(post.penulis)} (${escapeHtml(post.kelas)})</span>
            </div>
            <h4 class="font-bold text-slate-900 text-sm">${escapeHtml(post.judul)}</h4>
            <p class="text-xs text-slate-600 mt-1 line-clamp-2">${escapeHtml(post.konten)}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button onclick="window.EduPortal.approvePost('${post.id}')" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition">
              Setujui &amp; Terbitkan
            </button>
            <button onclick="window.EduPortal.rejectPost('${post.id}')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition">
              Tolak
            </button>
          </div>
        </div>
      `;
    });

    list.innerHTML = html;
  }

  function approvePost(postId) {
    const post = db.madingPosts.find(p => p.id === postId);
    if (!post) return;
    post.status = 'Publish';
    saveDatabase(db);
    addAuditLog(currentSession.user ? currentSession.user.nama : 'Admin', 'Admin', 'Setujui Karya Mading', post.judul);
    renderAdminMadingModeration();
    renderMadingFeed();
    alert(`Karya "${post.judul}" berhasil diterbitkan ke Mading Digital ${db.settings.namaSekolah}!`);
  }

  function rejectPost(postId) {
    if (!confirm('Apakah Anda yakin ingin menolak karya ini?')) return;
    db.madingPosts = db.madingPosts.filter(p => p.id !== postId);
    saveDatabase(db);
    renderAdminMadingModeration();
  }

  function renderAdminPanitiaAccounts() {
    const list = document.getElementById('adminPanitiaAccountsList');
    if (!list) return;

    let html = '';
    db.users.panitia.forEach((p, idx) => {
      html += `
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span class="font-bold text-slate-900">${escapeHtml(p.nama)}</span>
            <div class="text-[11px] text-slate-400">NIP: ${p.nip} | Username: <code class="font-mono text-emerald-700 font-bold">${p.username}</code></div>
            <div class="text-[10px] text-slate-500 mt-0.5">Tugas: ${escapeHtml(p.tugasJalur)}</div>
          </div>
          <div class="flex items-center gap-2">
            ${idx > 0 ? `
              <button onclick="window.EduPortal.deletePanitiaAccount('${p.id}')" class="text-rose-600 hover:text-rose-800 text-[11px] font-semibold">
                Hapus
              </button>
            ` : `<span class="text-[10px] text-slate-400 italic">Akun Panitia</span>`}
          </div>
        </div>
      `;
    });

    list.innerHTML = html;
  }

  function addNewPanitiaAccount() {
    const nama = prompt('Masukkan Nama Lengkap Guru Panitia:');
    if (!nama) return;
    const nip = prompt('Masukkan NIP Guru:') || '-';
    const username = prompt('Masukkan Username Login:') || ('panitia' + Date.now().toString().slice(-3));
    const password = prompt('Masukkan Password Login:') || 'panitia123';
    const tugas = prompt('Masukkan Jalur Tugas (contoh: Jalur Zonasi / Semua Jalur):') || 'Semua Jalur';

    const newPan = {
      id: 'PAN-' + Date.now().toString().slice(-4),
      nama: nama,
      nip: nip,
      username: username,
      password: password,
      tugasJalur: tugas,
      role: 'panitia'
    };

    db.users.panitia.push(newPan);
    saveDatabase(db);
    addAuditLog(currentSession.user.nama, 'Super Admin', 'Tambah Akun Panitia', nama, `Username: ${username}`);
    renderAdminPanitiaAccounts();
    alert(`Akun Panitia untuk ${nama} berhasil dibuat.`);
  }

  function deletePanitiaAccount(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus akun panitia ini?')) return;
    db.users.panitia = db.users.panitia.filter(p => p.id !== id);
    saveDatabase(db);
    renderAdminPanitiaAccounts();
  }

  function renderAdminAuditLogs() {
    const list = document.getElementById('adminAuditLogsList');
    if (!list) return;

    let html = '';
    db.auditLogs.slice(0, 15).forEach(log => {
      html += `
        <tr class="border-b border-slate-100 text-xs">
          <td class="py-2.5 px-3 font-mono text-slate-400 text-[11px]">${log.waktu}</td>
          <td class="py-2.5 px-3 font-bold text-slate-800">${escapeHtml(log.pelaksana)} <span class="text-[10px] text-slate-400 font-normal">(${log.peran})</span></td>
          <td class="py-2.5 px-3 font-semibold text-emerald-800">${escapeHtml(log.aksi)}</td>
          <td class="py-2.5 px-3 text-slate-600">${escapeHtml(log.target)}</td>
          <td class="py-2.5 px-3 text-slate-500 text-[11px]">${escapeHtml(log.detail)}</td>
        </tr>
      `;
    });

    list.innerHTML = html;
  }

  function backupMasterDatabase() {
    const jsonStr = JSON.stringify(db, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BACKUP_PPDB_SMPN1_MESMA_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportPpdbToCsv() {
    if (db.ppdbPendaftar.length === 0) {
      alert('Tidak ada data pendaftar untuk diekspor.');
      return;
    }

    const headers = [
      'No Registrasi', 'NISN', 'Nama Lengkap', 'Jenis Kelamin', 'Tempat Lahir', 
      'Tanggal Lahir', 'Asal SD', 'Jalur Pendaftaran', 'Jarak Rumah (km)', 
      'Nilai Rata-rata', 'Nama Wali', 'No WhatsApp', 'Status Verifikasi', 'Catatan Panitia', 'Daftar Ulang', 'Waktu Daftar'
    ];

    const rows = db.ppdbPendaftar.map(p => [
      `"${p.noRegistrasi}"`,
      `"${p.nisn}"`,
      `"${p.namaLengkap.replace(/"/g, '""')}"`,
      `"${p.jenisKelamin}"`,
      `"${p.tempatLahir}"`,
      `"${p.tanggalLahir}"`,
      `"${p.asalSekolah.replace(/"/g, '""')}"`,
      `"${p.jalurPendaftaran}"`,
      `"${p.jarakRumahKm}"`,
      `"${p.nilaiRataRata}"`,
      `"${p.namaWali.replace(/"/g, '""')}"`,
      `"${p.noHpWa}"`,
      `"${p.statusVerifikasi}"`,
      `"${(p.catatanPanitia || '').replace(/"/g, '""')}"`,
      `"${p.konfirmasiDaftarUlang ? 'Sudah' : 'Belum'}"`,
      `"${p.waktuDaftar}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + 
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `REKAP_PPDB_SMPN1_MESMA_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // 12. GLOBAL API EXPOSURE
  // ==========================================
  window.EduPortal = {
    switchTab: switchTab,
    openLoginModal: openLoginModal,
    closeLoginModal: closeLoginModal,
    openModalVisiMisi: openModalVisiMisi,
    closeModalVisiMisi: closeModalVisiMisi,
    switchLoginTab: switchLoginTab,
    loginAsSiswa: loginAsSiswa,
    logoutSession: logoutSession,
    openArticleDetail: openArticleDetail,
    closeArticleDetail: closeArticleDetail,
    likePost: likePost,
    openModalKirimKarya: openModalKirimKarya,
    closeModalKirimKarya: closeModalKirimKarya,
    openModalKirimKaryaGuru: openModalKirimKaryaGuru,
    closeModalKirimKaryaGuru: closeModalKirimKaryaGuru,
    submitKaryaGuruAction: submitKaryaGuruAction,
    toggleFullscreenKiosk: toggleFullscreenKiosk,
    printRegistrationCard: printRegistrationCard,
    closePpdbSuccessModal: closePpdbSuccessModal,
    showPpdbSuccessModalByNo: showPpdbSuccessModalByNo,
    submitRevisiBerkasSiswa: submitRevisiBerkasSiswa,
    konfirmasiDaftarUlangSiswa: konfirmasiDaftarUlangSiswa,
    setPanitiaSortMode: setPanitiaSortMode,
    setPanitiaFilter: setPanitiaFilter,
    openVerifikasiModal: openVerifikasiModal,
    closeVerifikasiModal: closeVerifikasiModal,
    saveVerifikasiPanitia: saveVerifikasiPanitia,
    approvePost: approvePost,
    rejectPost: rejectPost,
    togglePpdbOpenGlobal: togglePpdbOpenGlobal,
    savePengumumanDate: savePengumumanDate,
    saveSchoolProfileSettings: saveSchoolProfileSettings,
    addNewPanitiaAccount: addNewPanitiaAccount,
    deletePanitiaAccount: deletePanitiaAccount,
    backupMasterDatabase: backupMasterDatabase,
    exportPpdbToCsv: exportPpdbToCsv
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAuthSystem();
    initNavigation();
    initStudentSubmission();
    initPpdbRegistrationForm();
    initCheckPpdbStatus();

    updateDomWithSchoolProfile();
    renderMadingFeed();
    renderAgendaWidget();
    updatePpdbStats();
  });

})();
