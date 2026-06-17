// ==========================================================================
// ★ ここに移動！ブラウザのスクロール記憶を「最優先で」リセット
// ==========================================================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
// さらに念押し：ページが表示された瞬間に確実に一番上へ戻す
window.addEventListener('pageshow', function() {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function() {
  
// --- SEO・SNS共有用メタタグの動的追加 ---
  const head = document.querySelector('head');
  
  // OGP（SNSでシェアされた時に出るカード設定）
  const metaOgTitle = document.createElement('meta');
  metaOgTitle.setAttribute('property', 'og:title');
  metaOgTitle.setAttribute('content', '有限会社 晃和運輸 | 横浜の運送会社');
  head.appendChild(metaOgTitle);

  const metaOgDescription = document.createElement('meta');
  metaOgDescription.setAttribute('property', 'og:description');
  metaOgDescription.setAttribute('content', '横浜市旭区を拠点に、給食配送や日用品配送を行う有限会社晃和運輸。創業1972年、確かな信頼と機動力で地域の物流を支えます。');
  head.appendChild(metaOgDescription);
  
  // サイトアイコン（ファビコン）の設定があればここに

  // ==========================================================================
  // 1. 共通ヘッダーHTMLの定義 と 挿入
  // ==========================================================================
  const headerHTML = `
  <header class="site-header" id="header">
    <div class="header-inner">
      <a href="index.html" class="brand">KOWA <span class="accent-gold">Logistics</span></a>
      
      <div class="header-right" id="header-right">
        <div class="header-contact pc-only">
          <a href="tel:045-954-3111" class="header-action-btn">TEL: 045-954-3111</a>
          <a href="contact.html" class="header-action-btn" id="nav-btn-contact">✉️ お問い合わせ</a>
        </div>
        
        <nav class="site-nav">
          <a href="index.html" id="menu-home" class="nav-home">HOME<span>ホーム</span></a>
          <a href="services.html" id="menu-services" class="nav-services">SERVICES<span>事業内容</span></a>
          <a href="company.html" id="menu-company" class="nav-company">COMPANY<span>会社情報</span></a>
          <a href="recruit.html" id="menu-recruit" class="nav-recruit">RECRUIT<span>採用情報</span></a>
          <a href="faq.html" id="menu-faq" class="nav-faq">FAQ<span>よくある質問</span></a>
        </nav>
        
        <div class="header-contact sp-only menu-contact-grid">
          <div class="menu-contact-box">
            <div class="menu-contact-title">TEL</div>
            <a href="tel:045-954-3111" class="menu-contact-btn">045-954-3111</a>
          </div>
          <div class="menu-contact-box">
            <div class="menu-contact-title">CONTACT</div>
            <a href="contact.html" class="menu-contact-btn">フォームへ進む</a>
          </div>
        </div>
      </div>

      <button class="menu-toggle" id="menu-toggle" aria-label="メニューを開閉する">
        <span class="menu-toggle-bar"></span>
        <span class="menu-toggle-bar"></span>
        <span class="menu-toggle-bar"></span>
      </button>
    </div>
  </header>
  `;

  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = headerHTML;
  }

  // ==========================================================================
  // 2. カレントページ判定 ＆ 共通フッターHTML（求人バナー合体版）の挿入
  // ==========================================================================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const isRecruitPage = (currentPage === "recruit.html");

  // 採用ページ以外なら、右側に出すバナーのHTMLを用意する
  const footerBannerHTML = isRecruitPage ? "" : `
        <div class="footer-right">
          <div class="footer-recruit-banner">
            <div class="footer-recruit-text">
              <h3>JOIN OUR TEAM</h3>
              <p><strong style="color: var(--text-main); border-bottom: 1px solid var(--accent-orange);">平均勤続17.6年・夏季休暇30日の働きやすさ</strong><br>私たちと一緒に働きませんか？</p>
            </div>
            <a href="recruit.html" class="footer-recruit-btn">採用情報を詳しく見る</a>
          </div>
        </div>
  `;

  const footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top fade-up">
        
        <div class="footer-left">
          <div class="footer-brand">KOWA <span class="accent-gold">Logistics</span></div>
          <div class="footer-company">有限会社 晃和運輸</div>
          <p class="footer-info">
            <a href="https://maps.google.com/?q=神奈川県横浜市旭区下川井町2098−1" target="_blank" rel="noopener noreferrer" class="footer-map-link">
              〒241-0806<br>神奈川県横浜市旭区下川井町2098−1
            </a>
          </p>
          <p>
            <a href="tel:045-954-3111" class="footer-tel-link">TEL: 045-954-3111</a>
          </p>
        </div>
        
        ${footerBannerHTML}

      </div>
      
      <div class="footer-bottom">
        <p>© 2026 KOWA LOGISTICS. All Rights Reserved.</p>
        <p>
          <a href="sitepolicy.html" class="footer-policy-link">プライバシーポリシー</a>
          <span class="footer-policy-split" style="margin: 0 12px; color: rgba(255,255,255,0.1);">|</span>
          <span>Yokohama, Japan</span>
        </p>
      </div>
    </div>
  </footer>
  `;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }

  // ==========================================================================
  // 3. メニューの自動色変え
  // ==========================================================================
  if (currentPage === "index.html" || currentPage === "") {
    const el = document.getElementById("menu-home");
    if (el) el.style.color = "var(--accent-cyan)";
  } else if (currentPage === "services.html") {
    const el = document.getElementById("menu-services");
    if (el) el.style.color = "var(--accent-red)";
  } else if (currentPage === "company.html") {
    const el = document.getElementById("menu-company");
    if (el) el.style.color = "var(--accent-green)";
  } else if (currentPage === "recruit.html") {
    const el = document.getElementById("menu-recruit");
    if (el) el.style.color = "var(--accent-orange)";
  } else if (currentPage === "faq.html") {
    const el = document.getElementById("menu-faq");
    if (el) el.style.color = "#e2b659";
  } else if (currentPage === "contact.html") {
    // お問い合わせページにいる時は、右上ボタンをオレンジ強調
    const btn = document.getElementById("nav-btn-contact");
    if (btn) {
      btn.style.borderColor = "var(--accent-orange)";
      btn.style.color = "var(--accent-orange)";
      btn.style.backgroundColor = "rgba(255, 157, 0, 0.05)";
    }
  }

  // ==========================================================================
  // 4. ヘッダースクロール ＆ ハンバーガー＆フェードイン
  // ==========================================================================
  const headerEl = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (headerEl) {
      headerEl.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  const menuToggle = document.getElementById('menu-toggle');
  const headerRight = document.getElementById('header-right');
  const navLinks = document.querySelectorAll('.site-nav a, .header-action-btn');

  if (menuToggle && headerRight) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      headerRight.classList.toggle('is-active');
      
      // ★ここを追加：メニューが開いている時は背景のスクロールを止める
      if (headerRight.classList.contains('is-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        headerRight.classList.remove('is-active');
        
        // ★ここを追加：リンクを押してメニューが閉じたらスクロールを復活させる
        document.body.style.overflow = '';
      });
    });
  }

  // スクロールフェードイン
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });
  
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }, 100);
});
