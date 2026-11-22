/**
 * Movino Downloads Portal Main Application Logic
 * Features:
 * - Smart user device detection (Android, TV, Windows, iOS/Mac, Linux)
 * - Dynamic GitHub releases API query, asset parsing & Changelog extraction
 * - Direct Link Copying helper for Android TV / Downloader
 * - Native Web Share API + Telegram fallback
 * - Changelog Modal with Markdown parsing
 * - Accordion toggles (FAQ & Architectures)
 * - QR code auto-generation for desktop users
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Localization
  if (typeof MovinoI18n !== 'undefined') {
    MovinoI18n.init();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        MovinoI18n.setLanguage(btn.dataset.lang);
      });
    });
  }

  // 2. Constants & State
  const REPO = 'movinoOfficial/movino-downloads';
  const FALLBACK_RELEASE_PAGE = `https://github.com/${REPO}/releases/latest`;
  const TELEGRAM_CHANNEL = 'https://t.me/MovinoOfficial';
  const TELEGRAM_BOT = 'https://t.me/MovinoBot';

  let currentDevice = detectDevice();
  let latestAssets = {};
  let latestReleaseBody = '';
  let latestTagName = 'v1.0.0';

  // 3. Smart Device Detection
  function detectDevice() {
    const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
    
    // Android TV / Smart TV check
    if (/googletv|smarttv|android tv|box|crkey|pov_tv|tizen|webos/i.test(ua)) {
      return { type: 'tv', key: 'dev_tv', target: 'tv' };
    }
    // Mobile Android
    if (/android/i.test(ua)) {
      return { type: 'android', key: 'dev_android', target: 'android' };
    }
    // iOS (iPhone, iPad, iPod)
    if (/iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return { type: 'ios', key: 'dev_ios', target: 'web' };
    }
    // Windows
    if (/windows|win32|win64/i.test(ua)) {
      return { type: 'windows', key: 'dev_windows', target: 'windows' };
    }
    // Mac desktop
    if (/macintosh|mac os x/i.test(ua)) {
      return { type: 'mac', key: 'dev_mac', target: 'web' };
    }
    // Linux
    if (/linux/i.test(ua)) {
      return { type: 'linux', key: 'dev_linux', target: 'linux' };
    }
    // Generic
    return { type: 'generic', key: 'dev_generic', target: 'android' };
  }

  function applyDeviceHighlight() {
    const deviceName = MovinoI18n.t(currentDevice.key, 'دستگاه شما');
    const titleTemplate = MovinoI18n.t('rec_title', 'دانلود مستقیم مووینو برای {device}');
    const titleEl = document.getElementById('rec-device-title');
    if (titleEl) {
      titleEl.textContent = titleTemplate.replace('{device}', deviceName);
    }

    // Highlight target platform card
    document.querySelectorAll('.platform-card').forEach(card => {
      const isTarget = card.dataset.platform === currentDevice.target;
      card.classList.toggle('is-recommended', isTarget);
    });

    // Configure QR code visibility (desktop only)
    const isDesktop = ['windows', 'mac', 'linux', 'generic'].includes(currentDevice.type);
    const qrCard = document.getElementById('qr-card');
    if (qrCard) {
      qrCard.style.display = isDesktop ? 'flex' : 'none';
      if (isDesktop && typeof MovinoQR !== 'undefined') {
        MovinoQR.renderTo('qr-target', window.location.href, 150);
      }
    }

    updateHeroButton();
  }

  function updateHeroButton() {
    const heroBtn = document.getElementById('btn-hero-download');
    if (!heroBtn) return;

    let targetUrl = FALLBACK_RELEASE_PAGE;
    if (currentDevice.target === 'tv' && latestAssets.tv) {
      targetUrl = latestAssets.tv.url;
    } else if (currentDevice.target === 'android' && (latestAssets.universal || latestAssets.arm64)) {
      targetUrl = (latestAssets.universal || latestAssets.arm64).url;
    } else if (currentDevice.target === 'windows' && latestAssets.windows) {
      targetUrl = latestAssets.windows.url;
    } else if (currentDevice.target === 'linux' && latestAssets.appimage) {
      targetUrl = latestAssets.appimage.url;
    } else if (currentDevice.target === 'web') {
      targetUrl = 'https://movino.app';
      heroBtn.textContent = MovinoI18n.t('btn_web_open', 'ورود به وب‌پلیر');
      heroBtn.href = targetUrl;
      return;
    } else if (latestAssets.universal || latestAssets.arm64) {
      targetUrl = (latestAssets.universal || latestAssets.arm64).url;
    }

    heroBtn.href = targetUrl;
  }

  // 4. GitHub Releases & Changelog API
  function fetchReleases() {
    const versionEl = document.getElementById('version-tag');
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(release => {
        latestTagName = release.tag_name || 'v1.0.0';
        latestReleaseBody = release.body || '';
        
        if (versionEl) {
          versionEl.textContent = latestTagName;
        }

        const assets = release.assets || [];
        const rules = {
          universal: /(universal|movino-app)\.apk$/i,
          arm64: /arm64-v8a\.apk$/i,
          armv7: /armeabi-v7a\.apk$/i,
          tv: /(android-tv|tv)\.apk$/i,
          windows: /\.(exe|msi|zip)$/i,
          appimage: /\.AppImage$/i,
          deb: /\.deb$/i,
          aab: /\.aab$/i,
          checksums: /(checksums|sha256)\.txt$/i
        };

        latestAssets = {};
        for (const [key, regex] of Object.entries(rules)) {
          const matches = assets.filter(a => regex.test(a.name));
          const match = key === 'windows'
            ? (matches.find(a => /setup.*\.exe$/i.test(a.name)) ||
              matches.find(a => /\.exe$/i.test(a.name)) || matches[0])
            : matches[0];
          if (match) {
            latestAssets[key] = {
              name: match.name,
              url: match.browser_download_url,
              size: formatBytes(match.size),
            };
          }
        }

        // Bind URLs to page links
        for (const [key, data] of Object.entries(latestAssets)) {
          const links = document.querySelectorAll(`[data-asset="${key}"]`);
          links.forEach(link => {
            link.href = data.url;
            const sizeBadge = link.parentElement.querySelector('.asset-size');
            if (sizeBadge && data.size) {
              sizeBadge.textContent = data.size;
            }
          });
        }

        const allReleasesLink = document.getElementById('link-all-releases');
        if (allReleasesLink) {
          allReleasesLink.href = release.html_url || FALLBACK_RELEASE_PAGE;
        }

        updateHeroButton();
      })
      .catch(() => {
        if (versionEl) versionEl.textContent = 'v1.0.0 (پایدار)';
      });
  }

  function formatBytes(bytes) {
    if (!bytes || isNaN(bytes)) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }

  // 5. Changelog Modal Logic
  function initChangelogModal() {
    const trigger = document.getElementById('btn-open-changelog');
    const modal = document.getElementById('changelog-modal');
    const closeBtn = document.getElementById('btn-close-changelog');
    const footerCloseBtn = document.getElementById('btn-footer-close-changelog');
    const bodyContent = document.getElementById('changelog-content');

    const closeModal = () => {
      if (modal) modal.classList.remove('is-active');
    };

    const openModal = () => {
      if (!modal || !bodyContent) return;
      if (latestReleaseBody.trim() !== '') {
        bodyContent.innerHTML = parseMarkdownToHtml(latestReleaseBody);
      } else {
        bodyContent.innerHTML = `<p style="color:var(--text-muted);">${MovinoI18n.t('changelog_empty', 'توضیحات خاصی برای این ریلیز ثبت نشده است.')}</p>`;
      }
      modal.classList.add('is-active');
    };

    if (trigger) trigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function parseMarkdownToHtml(markdown) {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h4>${escapeHtml(trimmed.slice(4))}</h4>`;
      } else if (trimmed.startsWith('## ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h3>${escapeHtml(trimmed.slice(3))}</h3>`;
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${formatInlineMarkdown(trimmed.slice(2))}</li>`;
      } else if (trimmed !== '') {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<p>${formatInlineMarkdown(trimmed)}</p>`;
      }
    });

    if (inList) html += '</ul>';
    return html;
  }

  function formatInlineMarkdown(text) {
    let safe = escapeHtml(text);
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/`(.*?)`/g, '<code>$1</code>');
    return safe;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 6. Direct Link Copy Helper for TV / Downloader
  function initCopyButtons() {
    const copyTvBtn = document.getElementById('btn-copy-tv-link');
    if (!copyTvBtn) return;

    copyTvBtn.addEventListener('click', () => {
      const tvUrl = latestAssets.tv ? latestAssets.tv.url : 'https://github.com/movinoOfficial/movino-downloads/releases/latest';
      
      const copyAction = () => {
        const originalText = copyTvBtn.innerHTML;
        copyTvBtn.classList.add('copied');
        copyTvBtn.innerHTML = `<span>✓</span> <span>${MovinoI18n.t('copied_msg', 'کپی شد!')}</span>`;
        setTimeout(() => {
          copyTvBtn.classList.remove('copied');
          copyTvBtn.innerHTML = originalText;
        }, 2200);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tvUrl).then(copyAction).catch(() => {
          fallbackCopy(tvUrl);
          copyAction();
        });
      } else {
        fallbackCopy(tvUrl);
        copyAction();
      }
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
  }

  // 7. Web Share API & Telegram Fallback
  function initShareButtons() {
    const shareBtns = document.querySelectorAll('.btn-share-trigger');
    shareBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const title = MovinoI18n.t('share_title', 'دانلود اپلیکیشن مووینو');
        const text = MovinoI18n.t('share_text', 'دانلود سریع و مستقیم اپلیکیشن فیلم و سریال مووینو برای اندروید، تلویزیون و کامپیوتر:');
        const url = window.location.href;

        if (navigator.share) {
          navigator.share({ title, text, url }).catch(() => {});
        } else {
          // Telegram share fallback
          const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
          window.open(tgUrl, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  // 8. Accordions
  function initAccordions() {
    const archTrigger = document.getElementById('accordion-arch-trigger');
    const archContent = document.getElementById('accordion-arch-content');
    if (archTrigger && archContent) {
      archTrigger.addEventListener('click', () => {
        const isOpen = archContent.classList.contains('is-open');
        archContent.classList.toggle('is-open', !isOpen);
        archTrigger.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        if (!answer) return;
        const isOpen = answer.classList.contains('is-open');
        
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('is-open'));
        document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));

        if (!isOpen) {
          answer.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // 9. Re-render on language changed
  window.addEventListener('languageChanged', () => {
    applyDeviceHighlight();
  });

  // Initialization
  initAccordions();
  initChangelogModal();
  initCopyButtons();
  initShareButtons();
  applyDeviceHighlight();
  fetchReleases();
});
