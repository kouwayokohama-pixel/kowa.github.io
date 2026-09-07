// ==========================================================================
// ★ ブラウザのスクロール記憶を「最優先で」リセット
// ==========================================================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
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

  // ==========================================================================
  // 0. 構造化データ（JSON-LD）の追加：全ページ共通
  //    検索結果でのサイトリンク表示や、地域名・車種などのローカル検索対策のため、
  //    見た目には影響しない形でGoogleに会社情報を伝えます。
  // ==========================================================================
  const ldOrganization = document.createElement('script');
  ldOrganization.type = 'application/ld+json';
  ldOrganization.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "有限会社晃和運輸",
    "alternateName": "KOWA LOGISTICS",
    "url": "https://kowa-yokohama.com/",
    "image": "https://kowa-yokohama.com/images/TOP.jpg",
    "telephone": "+81-45-954-3111",
    "faxNumber": "+81-45-954-3112",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "下川井町2098-1",
      "addressLocality": "横浜市旭区",
      "addressRegion": "神奈川県",
      "postalCode": "241-0806",
      "addressCountry": "JP"
    },
    "areaServed": ["横浜市旭区", "横浜市", "神奈川県", "首都圏"],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:30",
      "closes": "19:00"
    }
  });
  head.appendChild(ldOrganization);

  // パンくずリスト（画面上の.breadcrumbsをそのままJSON-LD化。表示テキストの二重管理を避けるため自動生成）
  const breadcrumbEl = document.querySelector('.breadcrumbs');
  if (breadcrumbEl) {
    const itemListElement = [];
    let position = 0;
    breadcrumbEl.querySelectorAll('a').forEach((a) => {
      position += 1;
      itemListElement.push({
        "@type": "ListItem",
        "position": position,
        "name": a.textContent.trim(),
        "item": new URL(a.getAttribute('href'), window.location.origin).href
      });
    });
    const currentLabel = breadcrumbEl.textContent.split('>').pop().trim();
    if (currentLabel) {
      itemListElement.push({
        "@type": "ListItem",
        "position": position + 1,
        "name": currentLabel,
        "item": window.location.href
      });
    }
    const ldBreadcrumb = document.createElement('script');
    ldBreadcrumb.type = 'application/ld+json';
    ldBreadcrumb.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    });
    head.appendChild(ldBreadcrumb);
  }

  // ==========================================================================
  // 1. 共通ヘッダーHTMLの定義 と 挿入
  // ==========================================================================
  const headerHTML = `
  <header class="site-header" id="header">
    <div class="header-inner">
      <a href="/" class="brand">(有)晃和運輸</a>
      

      <div class="header-right" id="header-right">
        <div class="header-top pc-only">
          <div class="header-badges">
            <a href="/dx" class="hbadge hbadge-dx"><span class="hbadge-dot"></span>社内DXを推進中</a>
            <a href="/recruit" class="hbadge hbadge-recruit"><span class="hbadge-dot"></span>求人募集中</a>
          </div>
          <div class="header-contact">
            <a href="tel:045-954-3111" class="header-action-btn">TEL: 045-954-3111</a>
            <a href="/contact" class="header-action-btn" id="nav-btn-contact">✉️ お問い合わせ</a>
          </div>
        </div>
        
        <div class="menu-badges sp-only">
          <a href="/recruit" class="hbadge hbadge-recruit"><span class="hbadge-dot"></span>求人募集中</a>
          <a href="/dx" class="hbadge hbadge-dx"><span class="hbadge-dot"></span>社内DXを推進中</a>
        </div>

        <nav class="site-nav">
          <a href="/" id="menu-home" class="nav-home">HOME <span class="nav-ja">ホーム</span></a>
          <a href="/services" id="menu-services" class="nav-services">SERVICES <span class="nav-ja">事業内容</span></a>
          <a href="/company" id="menu-company" class="nav-company">COMPANY <span class="nav-ja">会社情報</span></a>
          <a href="/recruit" id="menu-recruit" class="nav-recruit">RECRUIT <span class="nav-ja">採用情報</span></a>
          <a href="/faq" id="menu-faq" class="nav-faq">FAQ <span class="nav-ja">よくある質問</span></a>
          <a href="/access" id="menu-access" class="nav-access">ACCESS <span class="nav-ja">所在地</span></a>
        </nav>
        
        <div class="header-contact sp-only menu-contact-grid">
          <div class="menu-contact-box">
            <div class="menu-contact-title">TEL</div>
            <a href="tel:045-954-3111" class="menu-contact-btn">045-954-3111</a>
          </div>
          <div class="menu-contact-box">
            <div class="menu-contact-title">CONTACT</div>
            <a href="/contact" class="menu-contact-btn">フォームへ進む</a>
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
  // 2. カレントページ判定 ＆ 共通フッターHTMLの挿入
  // ==========================================================================
  let currentPage = window.location.pathname.split("/").pop() || "index";
  currentPage = currentPage.replace(".html", "");

  const isRecruitPage = (currentPage === "recruit");

  const footerBannerHTML = isRecruitPage ? "" : `
        <div class="footer-right">
          <div class="footer-recruit-banner">
            <div class="footer-recruit-text">
              <h3>JOIN OUR TEAM</h3>
              <p><strong style="color: var(--text-main); border-bottom: 1px solid var(--accent-orange);">夏季休暇30日・「日勤のみ」の働きやすさ</strong><br>私たちと一緒に働きませんか？</p>
            </div>
            <a href="/recruit" class="footer-recruit-btn">採用情報を詳しく見る</a>
          </div>
        </div>
  `;

  const footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top fade-up">
        
        <div class="footer-left">
          <a href="/" class="footer-brand">有限会社 晃和運輸</a>
          <p class="footer-info">
            <a href="https://maps.google.com/?q=神奈川県横浜市旭区下川井町2098−1" target="_blank" rel="noopener noreferrer" class="footer-map-link">
              〒241-0806<br>神奈川県横浜市旭区下川井町2098−1
            </a>
          </p>
          <p>
            <a href="tel:045-954-3111" class="footer-tel-link">TEL: 045-954-3111</a>
            <span class="footer-fax">FAX: 045-954-3112</span>
          </p>

          <div style="margin-top: 20px;"> <a href="https://www.kta.or.jp" target="_blank" rel="noopener noreferrer" class="truck-logo-link">
              <img src="images/trackicon.jpg" alt="神奈川県トラック協会">
            </a>
          </div>
          </div>
        
        <div class="footer-right-area">
          ${footerBannerHTML}
        </div>

      </div>
      
      <div class="footer-bottom">
        <p>© 2026 有限会社晃和運輸</p>
        <p style="margin: 0;">
          <a href="/sitepolicy" class="footer-policy-link">プライバシーポリシー</a>

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
  if (currentPage === "index" || currentPage === "") {
    const el = document.getElementById("menu-home");
    if (el) el.style.color = "var(--accent-cyan)";
  } else if (currentPage === "services") {
    const el = document.getElementById("menu-services");
    if (el) el.style.color = "var(--accent-red)";
  } else if (currentPage === "company") {
    const el = document.getElementById("menu-company");
    if (el) el.style.color = "var(--accent-green)";
  } else if (currentPage === "recruit") {
    const el = document.getElementById("menu-recruit");
    if (el) el.style.color = "var(--accent-orange)";
  } else if (currentPage === "faq") {
    const el = document.getElementById("menu-faq");
    if (el) el.style.color = "#b026ff";
  } else if (currentPage === "access") { 
    const el = document.getElementById("menu-access");
    if (el) el.style.color = "var(--primary-blue)";
  } else if (currentPage === "contact") {
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
  // passive: true にすると、ブラウザがこの処理を待たずにスクロールできます
  window.addEventListener('scroll', () => {
    if (headerEl) {
      headerEl.classList.toggle('scrolled', window.scrollY > 50);
    }
  }, { passive: true });

  const menuToggle = document.getElementById('menu-toggle');
  const headerRight = document.getElementById('header-right');
  const navLinks = document.querySelectorAll('.site-nav a, .header-action-btn, .menu-contact-btn, .menu-badges a');

  if (menuToggle && headerRight) {
    // メニューを開いているあいだ背後をスクロールさせないための処理。
    // ここで大事なのは「position: fixed を当てる前にスクロール位置を控えておく」こと。
    // fixed を先に当てるとページの高さが無くなって window.scrollY が 0 になってしまい、
    // 閉じたときに一番上へ戻ってしまいます。
    let savedScrollY = 0;

    const lockScroll = () => {
      savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedScrollY); // 見ていた位置に戻す
    };

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      const opened = headerRight.classList.toggle('is-active');
      if (opened) {
        lockScroll();
      } else {
        unlockScroll();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!headerRight.classList.contains('is-active')) return;
        menuToggle.classList.remove('is-active');
        headerRight.classList.remove('is-active');
        unlockScroll();
      });
    });

    // 保険：メニューが閉じているのに背後の固定だけが残っていたら、必ず解除します。
    // 原因が何であれ「見た目は正常なのにスクロールできない」状態を自動で復旧させます。
    const releaseStuckScroll = () => {
      if (headerRight.classList.contains('is-active')) return;
      if (document.body.style.position === 'fixed' || document.body.style.overflow === 'hidden') {
        const y = parseInt(document.body.style.top || '0', 10) * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (y > 0) window.scrollTo(0, y);
      }
    };
    releaseStuckScroll();
    window.addEventListener('resize', releaseStuckScroll);
    window.addEventListener('pageshow', releaseStuckScroll);
    document.addEventListener('visibilitychange', releaseStuckScroll);

    // ★重要：メニューを開いたまま画面幅がPCサイズになると、
    //   メニュー自体は見えなくなるのに背後の固定だけが残り、
    //   ページが一切スクロールできなくなります（見た目は正常なので原因が分かりにくい）。
    //   ウィンドウの拡大、ブラウザの拡大縮小、外部ディスプレイの抜き差しなどで起きます。
    //   幅が戻ったら、メニューを閉じて固定も必ず解除します。
    window.addEventListener('resize', () => {
      if (!headerRight.classList.contains('is-active')) return;
      if (window.matchMedia('(min-width: 769px)').matches) {
        menuToggle.classList.remove('is-active');
        headerRight.classList.remove('is-active');
        unlockScroll();
      }
    });
  }

  // マーキー（KOWA LOGISTICS の帯）は、必要なときだけ動かします。
  //  ・画面に入っていないあいだは止める（ページの大半では見えていないため）
  //  ・スマホではスクロール中も止める（動く帯を見ながらスクロールすることはないので
  //    見た目に影響はなく、そのぶんスクロールに処理を回せます）
  const marquee = document.querySelector('.marquee-text');
  if (marquee) {
    const pauseWhileScrolling = window.matchMedia('(max-width: 768px)').matches;
    let onScreen = true;
    let scrolling = false;
    let scrollTimer = null;

    const apply = () => {
      marquee.style.animationPlayState = (onScreen && !scrolling) ? 'running' : 'paused';
    };

    const marqueeObserver = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      apply();
    });
    marqueeObserver.observe(marquee);

    if (pauseWhileScrolling) {
      window.addEventListener('scroll', () => {
        if (!scrolling) { scrolling = true; apply(); }
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => { scrolling = false; apply(); }, 150);
      }, { passive: true });
    }
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