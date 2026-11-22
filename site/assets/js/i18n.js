/**
 * Movino I18n Engine (FA / EN / AR)
 * Lightweight, zero dependencies, automatic dir="rtl" / dir="ltr" management and persistence.
 */

const MovinoI18n = (() => {
  const STORAGE_KEY = 'movino_download_lang';

  const DICTIONARIES = {
    fa: {
      brand_title: 'مووینو',
      brand_sub: 'مرکز دانلود اپلیکیشن',
      badge_stable: 'نسخهٔ پایدار و رسمی',
      btn_changelog: '📜 تغییرات این نسخه',
      changelog_title: 'تغییرات آخرین نسخه مووینو',
      changelog_loading: 'در حال دریافت تغییرات از گیت‌هاب...',
      changelog_empty: 'توضیحات خاصی برای این ریلیز در گیت‌هاب ثبت نشده است.',
      changelog_close: 'بستن',

      hero_title_1: 'سینما در دستان تو،',
      hero_title_2: 'در هر زمان و هر دستگاه',
      hero_desc: 'دریافت مستقیم و پرسرعت اپلیکیشن مووینو برای تمام گوشی‌ها، تلویزیون‌های هوشمند، تبلت و کامپیوتر بدون نیاز به فیلترشکن و با ترافیک نیم‌بها.',
      
      rec_badge: '⚡ پیشنهاد هوشمند برای دستگاه شما',
      rec_title: 'دانلود مستقیم مووینو برای {device}',
      rec_meta: 'نسخه استاندارد و پایدار · بدون قطعی و کاملاً تست‌شده',
      rec_btn: '📥 دریافت مستقیم فایل نصبی',
      rec_mirror_tg: 'دانلود کمکی از تلگرام',
      rec_mirror_gh: 'دانلود مستقیم از گیت‌هاب',

      grid_title: 'انتخاب بر اساس پلتفرم',
      grid_desc: 'نسخهٔ متناسب با سیستم‌عامل دستگاهت رو انتخاب کن:',

      card_android_title: 'اندروید (موبایل و تبلت)',
      card_android_tag: 'گوشی‌های هوشمند',
      card_android_desc: 'نسخه استاندارد سازگار با انواع گوشی‌های شیائومی، سامسونگ، هواوی و تمامی دستگاه‌های اندروید ۵ به بالا.',
      btn_android_dl: 'دانلود APK مستقیم',

      card_tv_title: 'تلویزیون هوشمند (Android TV)',
      card_tv_tag: 'Android TV & Box',
      card_tv_desc: 'طراحی ویژه جهت ناوبری آسان با ریموت‌کنترل تلویزیون، اندروید باکس‌ها، Mi Box و سونی/تی‌سی‌ال.',
      btn_tv_dl: 'دانلود APK تلویزیون',
      btn_copy_tv_link: '📋 کپی لینک مستقیم برای Downloader',
      copied_msg: '✓ کپی شد!',

      card_win_title: 'ویندوز (Desktop)',
      card_win_tag: 'Windows 10 / 11',
      card_win_desc: 'تماشای فیلم‌ها روی لپ‌تاپ و کامپیوتر شخصی با کیفیت فوق‌العاده و پلیر پیشرفته ویندوز.',
      btn_win_dl: 'دانلود نسخه ویندوز',

      card_web_title: 'نسخه وب و آیفون (PWA)',
      card_web_tag: 'iOS & مرورگر',
      card_web_desc: 'پخش سریع و آنلاین بدون نیاز به نصب فایل روی آیفون، مک و تمامی سیستم‌عامل‌ها از طریق مرورگر.',
      btn_web_open: 'ورود به وب‌پلیر',

      card_linux_title: 'لینوکس (Linux)',
      card_linux_tag: 'AppImage & Deb',
      card_linux_desc: 'بستهٔ مستقل AppImage قابل اجرا روی توزیع‌های مختلف اوبونتو، فدورا، دبیان و آرچ‌لینوکس.',
      btn_linux_dl: 'دانلود AppImage',

      // UI Showcase
      showcase_title: 'نمای محیط اپلیکیشن در تلویزیون و موبایل',
      showcase_desc: 'طراحی اختصاصی شبانه، رابط کاربری روان و بهینه‌سازی‌شده برای انواع صفحه‌نمایش‌ها',
      showcase_tv_badge: '📺 ویژه تلویزیون هوشمند (Android TV & TV Box)',
      showcase_tv_title: 'محیط اختصاصی تلویزیون با ریموت‌کنترل',
      showcase_tv_sub: 'پیمایش آسان با D-Pad ریموت، اسلایدر هیرو با کاورهای سینمایی واقعی، پخش روان 4K و چیدمان مناسب صفحه بزرگ.',
      showcase_mob_home_badge: '📱 نسخه موبایل (Android)',
      showcase_mob_home_title: 'صفحه اصلی و کاوش فیلم‌ها',
      showcase_mob_home_sub: 'طراحی مدرن با دسترسی تک‌دستی، جستجوی بلادرنگ، نوار ناوبری شیشه‌ای و دسترسی سریع به تازه‌ترین فیلم‌ها.',
      showcase_mob_details_badge: '🎬 صفحه فیلم و دانلود',
      showcase_mob_details_title: 'صفحه اختصاصی فیلم و انتخاب کیفیت',
      showcase_mob_details_sub: 'مشاهده مشخصات کامل، عوامل، نمرات IMDb، پخش آنلاین با زیرنویس فارسی یا دانلود کیفیت‌های مختلف 1080p و 720p.',

      // 3-Step Install Guide
      guide_title: 'راهنمای ۳ مرحله‌ای نصب فایل APK',
      guide_desc: 'نصب آسان و بدون ابهام روی تمامی گوشی‌ها و تبلت‌های اندرویدی:',
      guide_step1_title: '۱. دانلود و لمس باز کردن (Open)',
      guide_step1_desc: 'پس از اتمام دانلود فایل APK، اعلان را لمس کرده یا از پوشه Downloads فایل را اجرا کنید.',
      guide_step2_title: '۲. انتخاب More details در صورت اخطار',
      guide_step2_desc: 'اگر پیام Google Play Protect نمایش داده شد، روی گزینه More details (جزئیات بیشتر) بزنید.',
      guide_step3_title: '۳. لمس Install anyway و لذت از فیلم‌ها!',
      guide_step3_desc: 'دکمه Install anyway (نصب در هر صورت) را لمس کنید تا برنامه در چند ثانیه نصب و فعال شود.',

      accordion_arch_title: 'سایر پردازنده‌ها و بسته‌های تخصصی (پیشرفته)',
      th_file: 'نام پکیج',
      th_arch: 'معماری پردازنده',
      th_use: 'کاربرد',
      th_dl: 'دانلود',
      arm64_desc: 'گوشی‌های مدرن و جدید',
      armv7_desc: 'گوشی‌ها و تبلت‌های قدیمی‌تر',
      aab_desc: 'بسته انتشار مخصوص گوگل‌پلی و استورها',
      chk_desc: 'کدهای اعتبارسنجی سلامت فایل‌ها',

      features_title: 'چرا اپلیکیشن مووینو؟',
      feat_traffic_title: 'ترافیک نیم‌بها داخلی',
      feat_traffic_desc: 'محاسبه حجم مصرفی اینترنت به صورت نیم‌بها روی تمامی اپراتورهای همراه و خانگی.',
      feat_tv_title: 'اتصال سریع به تلویزیون',
      feat_tv_desc: 'امکان Pair کردن و پخش بدون دردسر فیلم‌ها با کد ۵ رقمی بین گوشی و تلویزیون خانه.',
      feat_archive_title: 'آرشیو جامع دو زبانه',
      feat_archive_desc: 'دوبله اختصاصی، صوت‌های چندزبانه و زیرنویس فارسی هماهنگ و بدون سانسور.',
      feat_speed_title: 'بدون نیاز به فیلترشکن',
      feat_speed_desc: 'پخش روان و پرسرعت بر بستر سرورهای ابری قدرتمند بدون قطعی و افت کیفیت.',

      qr_title: 'دانلود مستقیم روی گوشی از طریق اسکن QR',
      qr_desc: 'اگر با کامپیوتر یا لپ‌تاپ این صفحه را مشاهده می‌کنید، دوربین گوشی خود را مقابل این کد بگیرید تا مستقیماً به لینک دانلود متصل شوید.',

      faq_title: 'سوالات متداول کاربران',
      faq_q1: 'کدام نسخه اندروید را برای گوشی خود دانلود کنم؟',
      faq_a1: 'اگر گوشی شما تولید سال ۲۰۱۷ به بعد است، نسخه استاندارد یا ARM64 بهترین کارایی را دارد. در صورتی که در نصب به مشکل خوردید، نسخه ARMv7 سازگار با تمام دستگاه‌هاست.',
      faq_q2: 'چگونه مووینو را روی تلویزیون هوشمند نصب کنم؟',
      faq_a2: 'فایل APK تلویزیون را دانلود کرده و روی فلش مموری بریزید یا از طریق اپلیکیشن Send Files to TV از روی گوشی به تلویزیون بفرستید و نصب نمایید.',
      faq_q3: 'هنگام نصب هشدار Google Play Protect یا برنامه ناشناس نمایش داده می‌شود، چه کنم؟',
      faq_a3: 'به دلیل اینکه برنامه مستقیماً از سایت و بدون واسطه گوگل‌پلی دانلود می‌شود این هشدار عادی است. کافیست روی More details و سپس Install anyway بزنید.',
      faq_q4: 'آیا برای تماشای فیلم‌ها نیاز به فیلترشکن است؟',
      faq_a4: 'خیر، تمامی سرورهای مووینو در دیتاسنترهای داخلی و پرسرعت میزبانی می‌شوند و بدون نیاز به هیچ ابزار دورزدن تحریم به سادگی و با ترافیک نیم‌بها پخش می‌شوند.',

      tg_banner_title: 'به خانواده بزرگ مووینو در تلگرام بپیوندید',
      tg_banner_desc: 'اطلاع از پخش فیلم‌ها و قسمت‌های جدید سریال‌ها، دریافت لینک‌های مستقیم در ربات و ارتباط با پشتیبانی ۲۴ ساعته.',
      tg_btn_channel: '📢 کانال رسمی تلگرام',
      tg_btn_bot: '🤖 ربات اختصاصی مووینو',
      btn_share: '🗣️ ارسال لینک به دوستان',

      footer_copy: 'مووینو (Movino) · کلیه حقوق برای شبکهٔ اختصاصی مووینو محفوظ است.',
      footer_gh: 'سورس مخزن دانلود در گیت‌هاب',
      dev_android: 'گوشی اندروید',
      dev_tv: 'تلویزیون هوشمند',
      dev_windows: 'کامپیوتر ویندوز',
      dev_mac: 'دستگاه مک (macOS)',
      dev_ios: 'آیفون و آیپد (iOS)',
      dev_linux: 'لینوکس',
      dev_generic: 'دستگاه شما'
    },
    en: {
      brand_title: 'Movino',
      brand_sub: 'App Download Portal',
      badge_stable: 'Official Stable Release',
      btn_changelog: "📜 What's New",
      changelog_title: 'Latest Release Notes',
      changelog_loading: 'Fetching release notes from GitHub...',
      changelog_empty: 'No detailed changelog provided for this release.',
      changelog_close: 'Close',

      hero_title_1: 'Cinema in Your Hands,',
      hero_title_2: 'Anytime, on Any Device',
      hero_desc: 'Direct high-speed download of Movino app for all smartphones, smart TVs, tablets, and PCs without restrictions.',
      
      rec_badge: '⚡ Recommended for Your Device',
      rec_title: 'Download Movino for {device}',
      rec_meta: 'Stable official release · Tested and verified',
      rec_btn: '📥 Direct Download APK',
      rec_mirror_tg: 'Telegram Mirror',
      rec_mirror_gh: 'Direct GitHub Mirror',

      grid_title: 'Choose by Platform',
      grid_desc: 'Select the package optimized for your operating system:',

      card_android_title: 'Android (Mobile & Tablet)',
      card_android_tag: 'Smartphones',
      card_android_desc: 'Standard universal release compatible with Samsung, Xiaomi, Huawei and all Android 5.0+ devices.',
      btn_android_dl: 'Download APK',

      card_tv_title: 'Smart TV (Android TV)',
      card_tv_tag: 'Android TV & Box',
      card_tv_desc: 'Designed for effortless D-Pad and remote control navigation on Android TV, Mi Box, TCL, and Sony.',
      btn_tv_dl: 'Download TV APK',
      btn_copy_tv_link: '📋 Copy Link for TV Downloader',
      copied_msg: '✓ Copied!',

      card_win_title: 'Windows (Desktop)',
      card_win_tag: 'Windows 10 / 11',
      card_win_desc: 'Watch movies on desktop & laptop computers with hardware acceleration and crystal-clear audio.',
      btn_win_dl: 'Download for Windows',

      card_web_title: 'Web & iPhone Player (PWA)',
      card_web_tag: 'iOS & Browsers',
      card_web_desc: 'Instant streaming without installing apps on iPhone, iPad, Mac, and web browsers.',
      btn_web_open: 'Launch Web Player',

      card_linux_title: 'Linux (Desktop)',
      card_linux_tag: 'AppImage & Deb',
      card_linux_desc: 'Self-contained AppImage compatible with Ubuntu, Fedora, Debian, Arch, and derivatives.',
      btn_linux_dl: 'Download AppImage',

      // UI Showcase
      showcase_title: 'App Interface & Experience',
      showcase_desc: 'Tailor-made midnight cinema design, ultra-responsive navigation for TV & Mobile',
      showcase_tv_badge: '📺 Android TV & TV Box Interface',
      showcase_tv_title: 'Dedicated Big-Screen TV Experience',
      showcase_tv_sub: 'Smooth D-Pad remote navigation, dynamic hero slider with authentic posters, 4K streaming, and TV-optimized layout.',
      showcase_mob_home_badge: '📱 Mobile Application (Android)',
      showcase_mob_home_title: 'Home Screen & Movie Discovery',
      showcase_mob_home_sub: 'Modern one-handed navigation, instant live search, frosted glass navigation bar, and rapid access to latest titles.',
      showcase_mob_details_badge: '🎬 Movie Details & Playback',
      showcase_mob_details_title: 'Comprehensive Details & Quality Selection',
      showcase_mob_details_sub: 'Full synopsis, IMDb ratings, Persian dubs & subs, instant online playback or downloads in 1080p and 720p.',

      // 3-Step Install Guide
      guide_title: '3-Step Installation Guide (APK)',
      guide_desc: 'Effortless installation on all Android smartphones and tablets:',
      guide_step1_title: '1. Download & Tap Open',
      guide_step1_desc: 'Once the APK finishes downloading, tap the notification or open it from your Downloads folder.',
      guide_step2_title: "2. Tap 'More details' if Prompted",
      guide_step2_desc: "If Google Play Protect shows a prompt, click on 'More details'.",
      guide_step3_title: "3. Tap 'Install anyway' & Stream!",
      guide_step3_desc: "Select 'Install anyway' to complete setup in seconds and start enjoying movies.",

      accordion_arch_title: 'Specific Architectures & Store Bundles (Advanced)',
      th_file: 'Package Name',
      th_arch: 'Architecture',
      th_use: 'Intended For',
      th_dl: 'Download',
      arm64_desc: 'Modern 64-bit devices',
      armv7_desc: 'Legacy 32-bit devices',
      aab_desc: 'Google Play Store bundle',
      chk_desc: 'Cryptographic SHA-256 checksums',

      features_title: 'Why Choose Movino?',
      feat_traffic_title: 'Optimized Domestic Speeds',
      feat_traffic_desc: 'High-speed cloud nodes providing buffer-free streaming across all carriers.',
      feat_tv_title: 'Instant TV Pairing',
      feat_tv_desc: 'Seamlessly pair your smartphone with your TV in seconds using a 5-digit PIN.',
      feat_archive_title: 'Comprehensive Dual-Audio Archive',
      feat_archive_desc: 'Original audio, multi-language dubbing, and synced subtitle options.',
      feat_speed_title: 'Zero Latency & Rock-Solid Streaming',
      feat_speed_desc: 'Built on dedicated cloud servers for 4K and FHD streaming without buffering.',

      qr_title: 'Scan QR Code for Instant Mobile Download',
      qr_desc: 'Viewing this page on your computer? Point your phone camera at this QR code to download directly to your mobile device.',

      faq_title: 'Frequently Asked Questions',
      faq_q1: 'Which Android APK should I download?',
      faq_a1: 'For devices released after 2017, the Universal or ARM64 build is recommended. If your device is older, choose the ARMv7 package.',
      faq_q2: 'How do I install Movino on my Smart TV?',
      faq_a2: 'Download the TV APK onto a USB drive or transfer it wirelessly using the "Send Files to TV" app, then open and install it with any file manager.',
      faq_q3: 'Why do I see a Play Protect or Unknown Source prompt?',
      faq_a3: 'Because the APK is downloaded directly from our official portal rather than Google Play. Simply tap "More details" and select "Install anyway".',
      faq_q4: 'Do I need a VPN to stream movies?',
      faq_a4: 'No VPN is needed. Movino is hosted on fast, unrestricted high-speed global nodes.',

      tg_banner_title: 'Join the Official Movino Telegram Hub',
      tg_banner_desc: 'Get immediate announcements for new movie releases, direct bot download links, and 24/7 assistance.',
      tg_btn_channel: '📢 Official Channel',
      tg_btn_bot: '🤖 Movino Assistant Bot',
      btn_share: '🗣️ Share Portal with Friends',

      footer_copy: 'Movino Streaming Network · All rights reserved.',
      footer_gh: 'Downloads repository on GitHub',
      dev_android: 'Android Phone',
      dev_tv: 'Smart TV',
      dev_windows: 'Windows PC',
      dev_mac: 'macOS Device',
      dev_ios: 'iPhone / iPad (iOS)',
      dev_linux: 'Linux System',
      dev_generic: 'Your Device'
    },
    ar: {
      brand_title: 'موفينو',
      brand_sub: 'بوابة تحميل التطبيق',
      badge_stable: 'الإصدار الرسمي المستقر',
      btn_changelog: '📜 ما الجديد في هذا الإصدار',
      changelog_title: 'ملاحظات الإصدار والتغييرات',
      changelog_loading: 'جارٍ جلب الملاحظات من GitHub...',
      changelog_empty: 'لا توجد ملاحظات مفصلة لهذا الإصدار.',
      changelog_close: 'إغلاق',

      hero_title_1: 'السينما بين يديك،',
      hero_title_2: 'في أي وقت وعلى أي جهاز',
      hero_desc: 'تحميل مباشر وسريع لتطبيق موفينو لجميع الهواتف، أجهزة التلفزيون الذكية، الأجهزة اللوحية والحواسيب بدون تعقيدات وبأعلى سرعة.',
      
      rec_badge: '⚡ الاختيار الموصى به لجهازك',
      rec_title: 'تحميل موفينو لجهاز {device}',
      rec_meta: 'إصدار رسمي مستقر · تم اختباره والتأكد منه بالكامل',
      rec_btn: '📥 تحميل مباشر لملف التثبيت',
      rec_mirror_tg: 'تحميل عبر تيليجرام',
      rec_mirror_gh: 'تحميل من جيت هاب',

      grid_title: 'اختر حسب نظام التشغيل',
      grid_desc: 'اختر الحزمة المناسبة لجهازك بكل سهولة:',

      card_android_title: 'أندرويد (الهاتف واللوحي)',
      card_android_tag: 'الهواتف الذكية',
      card_android_desc: 'حزمة قياسية شاملة متوافقة مع سامسونج، شاومي، هواوي وجميع أجهزة أندرويد 5 فما فوق.',
      btn_android_dl: 'تحميل APK مباشر',

      card_tv_title: 'التلفزيون الذكي (Android TV)',
      card_tv_tag: 'Android TV & Box',
      card_tv_desc: 'مصمم خصيصاً للتحكم السلس عبر جهاز التحكم عن بعد (الريموت) وأجهزة Mi Box وSony وTCL.',
      btn_tv_dl: 'تحميل APK للتلفزيون',
      btn_copy_tv_link: '📋 نسخ الرابط لـ Downloader التلفزيون',
      copied_msg: '✓ تم النسخ!',

      card_win_title: 'ویندوز (الحاسوب الشخصي)',
      card_win_tag: 'Windows 10 / 11',
      card_win_desc: 'مشاهدة الأفلام والمسلسلات على أجهزة الكمبيوتر المحمولة والمكتبية بأعلى جودة.',
      btn_win_dl: 'تحميل نسخة ويندوز',

      card_web_title: 'مشغل الويب والآيفون (PWA)',
      card_web_tag: 'iOS والمصفحات',
      card_web_desc: 'بث فوري عبر المتصفح بدون الحاجة لتثبيت برامج على الآيفون والماك وباقي الأنظمة.',
      btn_web_open: 'فتح مشغل الويب',

      card_linux_title: 'لينكس (Linux)',
      card_linux_tag: 'AppImage & Deb',
      card_linux_desc: 'حزمة AppImage مستقلة تعمل على توزيعات أوبونتو، فيدورا، ديبيان وتوزيعات آرتش.',
      btn_linux_dl: 'تحميل AppImage',

      // UI Showcase
      showcase_title: 'واجهة التطبيق وتجربة المستخدم',
      showcase_desc: 'تصميم ليلي أنيق، واجهة سريعة ومُحسّنة للتلفزيونات والهواتف المحمولة',
      showcase_tv_badge: '📺 شاشات التلفزيون وأجهزة TV Box',
      showcase_tv_title: 'تجربة مخصصة للتلفزيون الذكي (Android TV)',
      showcase_tv_sub: 'تحكم سلس عبر الريموت، سلايدر ديناميكي بالبوسترات الأصلية، بث بدقة 4K وتنسيق مريح للشاشات الكبيرة.',
      showcase_mob_home_badge: '📱 تطبيق الهاتف (Android)',
      showcase_mob_home_title: 'الصفحة الرئيسية واستكشاف الأفلام',
      showcase_mob_home_sub: 'تنقل سلس بيد واحدة، بحث فوري، شريط تنقل زجاجي ووصول سريع لأحدث الأفلام والمسلسلات.',
      showcase_mob_details_badge: '🎬 صفحة الفيلم والتحميل',
      showcase_mob_details_title: 'تفاصيل العمل واختيار دقة العرض',
      showcase_mob_details_sub: 'عرض التقييمات، القصة، خيارات الدبلجة والترجمة، البث المباشر أو التحميل بدقة 1080p و 720p.',

      // 3-Step Install Guide
      guide_title: 'دليل التثبيت السريع في 3 خطوات (APK)',
      guide_desc: 'تثبيت سهل ومباشر على كافة هواتف وأجهزة أندرويد:',
      guide_step1_title: '1. التحميل والضغط على فتح (Open)',
      guide_step1_desc: 'بعد اكتمال تنزيل الملف، اضغط على الإشعار أو افتحه من مجلد التنزيلات.',
      guide_step2_title: "2. اختيار 'مزيد من التفاصيل' عند ظهور التنبيه",
      guide_step2_desc: "إذا ظهر تنبيه حماية Google Play، اضغط على خيار 'مزيد من التفاصيل'.",
      guide_step3_title: "3. الضغط على 'التثبيت على أي حال' والاستمتاع!",
      guide_step3_desc: "اضغط على 'التثبيت على أي حال' ليكتمل التثبيت وتبدأ المشاهدة فوراً.",

      accordion_arch_title: 'المعالجات الخاصة وحزم المتاجر (متقدم)',
      th_file: 'اسم الحزمة',
      th_arch: 'معمارية المعالج',
      th_use: 'الاستخدام',
      th_dl: 'تحميل',
      arm64_desc: 'الأجهزة الحديثة 64-بت',
      armv7_desc: 'الأجهزة القديمة 32-بت',
      aab_desc: 'حزمة متجر جوجل بلاي',
      chk_desc: 'رموز التحقق الرقمية SHA-256',

      features_title: 'لماذا تختار موفينو؟',
      feat_traffic_title: 'سيرفرات فائقة السرعة',
      feat_traffic_desc: 'بث مستقر دون تقطيع أو تأخير على مدار الساعة.',
      feat_tv_title: 'ربط فوري بالتلفزيون',
      feat_tv_desc: 'إمكانية إقران الهاتف بالشاشة الكبيرة بسهولة باستخدام رمز مكون من 5 أرقام.',
      feat_archive_title: 'أرشيف شامل ومترجم',
      feat_archive_desc: 'دبلجة حصرية وخيارات صوتية متعددة وترجمات احترافية متزامنة.',
      feat_speed_title: 'بدون انقطاع وجودة 4K',
      feat_speed_desc: 'بنية سحابية قوية لتجربة مشاهدة مريحة وعالية الوضوح.',

      qr_title: 'امسح رمز QR للتحميل المباشر على هاتفك',
      qr_desc: 'إذا كنت تتصفح الموقع من الكمبيوتر، وجه كاميرا الهاتف نحو الرمز للتحميل المباشر دون كتابة أي عنوان.',

      faq_title: 'الأسئلة الشائعة',
      faq_q1: 'أي إصدار أندرويد يجب أن أختار؟',
      faq_a1: 'إذا كان هاتفك حديثاً (من 2017 فما بعد)، فإن الإصدار الشامل أو ARM64 هو الأفضل. للأجهزة القديمة اختر ARMv7.',
      faq_q2: 'كيف أقوم بتثبيت موفينو على التلفزيون الذكي؟',
      faq_a2: 'قم بتحميل ملف TV APK ونقله عبر فلاش ميموري USB أو تطبيق Send Files to TV ثم تثبيته عبر مدير الملفات.',
      faq_q3: 'ظهر لي تحذير Google Play Protect أثناء التثبيت، ماذا أفعل؟',
      faq_a3: 'هذا التحذير طبيعي لتحميل التطبيق مباشرة من موقعنا خارج المتجر. انقر على "مزيد من التفاصيل" ثم "التثبيت على أي حال".',
      faq_q4: 'هل أحتاج إلى VPN لتشغيل التطبيق؟',
      faq_a4: 'لا، يعمل التطبيق مباشرة بدون أي برامج وسيطة وبأقصى سرعة.',

      tg_banner_title: 'انضم إلى مجتمع موفينو على تيليجرام',
      tg_banner_desc: 'تابع أحدث الأفلام والمسلسلات الحصرية واحصل على روابط التنزيل عبر البوت المخصص.',
      tg_btn_channel: '📢 القناة الرسمية',
      tg_btn_bot: '🤖 بوت موفينو',
      btn_share: '🗣️ مشاركة مع الأصدقاء',

      footer_copy: 'شبكة موفينو الترفيهية · جميع الحقوق محفوظة.',
      footer_gh: 'مستودع التحميلات على GitHub',
      dev_android: 'هاتف أندروید',
      dev_tv: 'التلفزيون الذكي',
      dev_windows: 'حاسوب ويندوز',
      dev_mac: 'أجهزة ماك (macOS)',
      dev_ios: 'آيفون وآيباد (iOS)',
      dev_linux: 'نظام لينكس',
      dev_generic: 'جهازك'
    }
  };

  let currentLang = 'fa';

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && DICTIONARIES[saved]) {
      currentLang = saved;
    } else {
      const browser = (navigator.language || 'fa').slice(0, 2).toLowerCase();
      if (browser === 'ar') currentLang = 'ar';
      else if (browser === 'en') currentLang = 'en';
      else currentLang = 'fa';
    }
    applyLanguage(currentLang);
  }

  function applyLanguage(lang) {
    if (!DICTIONARIES[lang]) lang = 'fa';
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const isRtl = (lang === 'fa' || lang === 'ar');
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    const dict = DICTIONARIES[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang, isRtl, dict } }));
  }

  function t(key, fallback = '') {
    return (DICTIONARIES[currentLang] && DICTIONARIES[currentLang][key]) || fallback;
  }

  function getLang() {
    return currentLang;
  }

  return { init, setLanguage: applyLanguage, t, getLang };
})();
