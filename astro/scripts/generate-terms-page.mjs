import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/data/pages");
const privacy = JSON.parse(fs.readFileSync(path.join(root, "privacy.json"), "utf8"));

const languages = [
  ["en", "English", "ltr"], ["uk", "Українська", "ltr"], ["ru", "Русский", "ltr"],
  ["es", "Español", "ltr"], ["de", "Deutsch", "ltr"], ["fr", "Français", "ltr"],
  ["pl", "Polski", "ltr"], ["pt", "Português", "ltr"], ["it", "Italiano", "ltr"],
  ["tr", "Türkçe", "ltr"], ["ja", "日本語", "ltr"], ["ko", "한국어", "ltr"],
  ["zh-CN", "中文（简体）", "ltr"], ["ar", "العربية", "rtl"], ["hi", "हिन्दी", "ltr"],
  ["pt-BR", "Português (Brasil)", "ltr"],
].map(([code, label, dir]) => ({ code, label, dir }));

const copy = {
  en: {
    title: "Terms of Use", description: "Read the WalkQuest Terms of Use for virtual walking routes, Health Connect steps, Premium subscriptions, lifetime access and in-app purchases.", back: "Back to WalkQuest", choose: "Choose language",
    content: `# WalkQuest Terms of Use

**Effective and last updated: November 4, 2026**

These Terms of Use govern your use of the WalkQuest Android application and the WalkQuest website. WalkQuest is provided by Gold Digital Studio. By installing, accessing or using WalkQuest, you agree to these Terms. If you do not agree, do not use the app.

## 1. Eligibility

WalkQuest is intended for people aged 13 or older. If you are not legally able to accept these Terms in your country, a parent or legal guardian must review and accept them for you. You are responsible for complying with local law.

## 2. What WalkQuest provides

WalkQuest turns eligible step data into progress along virtual routes. It includes city stories, landmarks, stamps and optional paid features. Route distances, stories and illustrations are designed for entertainment and general information. WalkQuest is not a navigation, medical, fitness or emergency service. Stay aware of traffic, terrain, weather and your surroundings while walking.

## 3. License and acceptable use

Gold Digital Studio gives you a limited, personal, non-exclusive, non-transferable and revocable license to use WalkQuest for lawful, non-commercial purposes. You must not:

- copy, sell, rent, sublicense or commercially exploit the app or its content;
- reverse engineer, bypass security, interfere with the service or introduce malicious code;
- manipulate step data, purchases or progress, or use automation to obtain an unfair advantage;
- use WalkQuest in a way that violates law or the rights of another person.

## 4. Steps, Health Connect and local progress

With your permission, WalkQuest reads eligible step data through Android Health Connect to calculate route progress. You can deny or revoke access in Android settings. Sensor and Health Connect data can be delayed, incomplete or inaccurate. Game progress may be stored locally on your device; uninstalling, clearing storage or changing devices can remove local data. Details are in our [Privacy Policy](https://walkquest.site/privacy.html).

## 5. Premium, subscriptions and other purchases

WalkQuest may offer monthly or yearly Premium subscriptions, a one-time Lifetime Premium purchase, and consumable or reusable in-app items such as virtual train, ferry or flight tickets. The exact product, price, currency, trial and benefits shown in Google Play at checkout control your purchase.

- Subscriptions renew automatically unless cancelled through Google Play before the renewal date. Uninstalling WalkQuest does not cancel a subscription.
- Lifetime Premium is a one-time entitlement for the supported lifetime of the app; it is not a promise that the app or every feature will exist forever.
- Eligible purchases can be restored using the same Google Play account. Availability can depend on platform and technical conditions.
- Google Play processes payments. Cancellations and refunds are handled under Google Play rules and applicable consumer law.

Nothing in these Terms limits mandatory consumer rights. See [Premium and purchases](https://walkquest.site/premium.html) for a plain-language feature overview.

## 6. Advertising and third-party services

The free experience may display advertising. WalkQuest uses platform and third-party services such as Google Play, Health Connect, Firebase and AdMob. Their own terms and privacy policies may apply. We are not responsible for third-party services outside our control.

## 7. Intellectual property

WalkQuest, its software, design, text, route presentation, artwork and branding belong to Gold Digital Studio or its licensors and are protected by law. Google Play and other third-party names and marks belong to their owners. These Terms do not transfer ownership to you.

## 8. Availability and changes

We may improve, update, add, restrict or discontinue features, routes, rewards or compatibility. Maintenance, network conditions, platform changes or events outside our control may interrupt access. We will take reasonable care, but continuous or error-free availability is not guaranteed.

## 9. Suspension and termination

We may restrict or end access if you materially breach these Terms, abuse the service, threaten security or if required by law. You may stop using WalkQuest at any time. Provisions that by their nature should survive termination remain effective.

## 10. Disclaimers and liability

To the extent permitted by law, WalkQuest is provided “as is” and “as available.” Gold Digital Studio is not liable for indirect or consequential loss, loss caused by unsafe walking, inaccurate sensor data, device failure or third-party services. This section does not exclude liability that cannot legally be excluded, including mandatory consumer protections.

## 11. Governing rules and disputes

Applicable mandatory law, including consumer protections in your country of residence, continues to apply. Before starting a formal dispute, please contact us so we can try to resolve the issue. Nothing here removes a right to use a court or public authority available under applicable law.

## 12. Changes to these Terms

We may update these Terms when the app, law or business practices change. We will publish the revised version here and change the update date. If a change materially affects your rights, we will provide notice where reasonably required. Continued use after the effective date means acceptance of the revised Terms.

## 13. Contact

Questions about these Terms, purchases or WalkQuest can be sent to **digitalstudiogold@gmail.com**. You can also review our [Privacy Policy](https://walkquest.site/privacy.html).`,
  },
  uk: {
    title: "Умови використання", description: "Ознайомтеся з Умовами використання WalkQuest: віртуальні маршрути, кроки Health Connect, Premium-підписки, довічний доступ і покупки.", back: "Назад до WalkQuest", choose: "Оберіть мову",
    content: `# Умови використання WalkQuest

**Набирають чинності й востаннє оновлені: 4 листопада 2026 року**

Ці Умови регулюють використання Android-застосунку WalkQuest і сайту WalkQuest. Сервіс надає Gold Digital Studio. Встановлюючи, відкриваючи або використовуючи WalkQuest, ви погоджуєтеся з цими Умовами. Якщо ви не погоджуєтеся, не користуйтеся застосунком.

## 1. Хто може користуватися

WalkQuest призначено для осіб віком від 13 років. Якщо за законами вашої країни ви не можете самостійно прийняти ці Умови, їх має переглянути й прийняти один із батьків або законний представник. Ви відповідаєте за дотримання місцевого законодавства.

## 2. Що надає WalkQuest

WalkQuest перетворює дозволені дані про кроки на прогрес віртуальними маршрутами. У застосунку є історії міст, пам’ятки, штампи й необов’язкові платні функції. Відстані, тексти та ілюстрації призначені для розваг і загального ознайомлення. WalkQuest не є навігатором, медичною, фітнес- чи екстреною службою. Під час ходьби стежте за рухом, рельєфом, погодою та оточенням.

## 3. Ліцензія й допустиме використання

Gold Digital Studio надає вам обмежену, особисту, невиключну, непередавану й відкличну ліцензію на законне некомерційне використання WalkQuest. Заборонено:

- копіювати, продавати, здавати в оренду, субліцензувати чи комерційно використовувати застосунок або його вміст;
- здійснювати зворотну розробку, обходити захист, втручатися в роботу сервісу чи поширювати шкідливий код;
- підробляти дані про кроки, покупки або прогрес чи застосовувати автоматизацію для нечесної переваги;
- використовувати WalkQuest із порушенням закону або прав інших осіб.

## 4. Кроки, Health Connect і локальний прогрес

З вашого дозволу WalkQuest читає відповідні дані про кроки через Android Health Connect і обчислює прогрес. Доступ можна не надавати або відкликати в налаштуваннях Android. Дані датчиків і Health Connect можуть надходити із затримкою, бути неповними чи неточними. Ігровий прогрес може зберігатися локально: видалення застосунку, очищення сховища або зміна пристрою можуть стерти ці дані. Докладніше — у [Політиці конфіденційності](https://walkquest.site/uk/privacy.html).

## 5. Premium, підписки й інші покупки

WalkQuest може пропонувати місячну або річну Premium-підписку, одноразову покупку Lifetime Premium та внутрішні предмети, зокрема віртуальні квитки на потяг, пором або літак. Вирішальними є назва продукту, ціна, валюта, пробний період і переваги, показані в Google Play під час оформлення.

- Підписка поновлюється автоматично, якщо її не скасувати в Google Play до дати поновлення. Видалення WalkQuest не скасовує підписку.
- Lifetime Premium — одноразове право на підтримуваний строк існування застосунку, а не обіцянка вічної роботи застосунку чи кожної функції.
- Доступні покупки можна відновити з тим самим обліковим записом Google Play; це залежить від платформи й технічних умов.
- Платежі обробляє Google Play. Скасування й повернення коштів регулюються правилами Google Play та застосовним споживчим законодавством.

Ці Умови не обмежують обов’язкові права споживачів. Зрозумілий огляд функцій наведено на сторінці [Premium і покупки](https://walkquest.site/uk/premium.html).

## 6. Реклама й сторонні сервіси

Безкоштовна версія може показувати рекламу. WalkQuest використовує Google Play, Health Connect, Firebase, AdMob та інші платформні сервіси. До них можуть застосовуватися власні умови й політики. Ми не відповідаємо за сервіси третіх сторін поза нашим контролем.

## 7. Інтелектуальна власність

Програмне забезпечення, дизайн, тексти, подання маршрутів, ілюстрації та бренд WalkQuest належать Gold Digital Studio або ліцензіарам і захищені законом. Назви й знаки третіх сторін належать їхнім власникам. Ці Умови не передають вам право власності.

## 8. Доступність і зміни

Ми можемо покращувати, оновлювати, додавати, обмежувати або припиняти функції, маршрути, нагороди чи сумісність. Технічні роботи, мережа, зміни платформи або незалежні від нас події можуть перервати доступ. Ми докладаємо розумних зусиль, але не гарантуємо безперервну й безпомилкову роботу.

## 9. Обмеження або припинення доступу

Ми можемо обмежити доступ у разі істотного порушення Умов, зловживання, загрози безпеці або вимоги закону. Ви можете припинити користування будь-коли. Положення, які за своєю природою мають діяти після припинення, залишаються чинними.

## 10. Застереження й відповідальність

У межах, дозволених законом, WalkQuest надається «як є» і «за наявності». Gold Digital Studio не відповідає за непрямі збитки, небезпечну поведінку під час ходьби, неточні дані датчиків, несправність пристрою чи сторонні сервіси. Це не виключає відповідальність, яку закон забороняє виключати, зокрема обов’язковий захист споживачів.

## 11. Застосовні правила та спори

Обов’язкові норми, зокрема захист споживачів у країні вашого проживання, залишаються чинними. Перед формальним спором зверніться до нас, щоб ми спробували владнати питання. Ніщо тут не позбавляє права звернутися до суду чи державного органу, доступного за законом.

## 12. Зміни Умов

Ми можемо оновлювати Умов через зміни застосунку, закону або практик. Нову версію й дату буде опубліковано тут. Про істотні зміни прав повідомимо, коли це обґрунтовано потрібно. Подальше використання після набрання чинності означає прийняття нової версії.

## 13. Контакти

Питання щодо Умов, покупок або WalkQuest надсилайте на **digitalstudiogold@gmail.com**. Також перегляньте [Політику конфіденційності](https://walkquest.site/uk/privacy.html).`,
  },
};

const generic = {
  ru: ["Условия использования", "Условия использования WalkQuest для виртуальных маршрутов, Health Connect, Premium-подписок, пожизненного доступа и покупок в Google Play.", "Назад в WalkQuest", "Выберите язык"],
  es: ["Términos de uso", "Consulta los Términos de uso de WalkQuest para rutas virtuales, Health Connect, suscripciones Premium, acceso de por vida y compras.", "Volver a WalkQuest", "Elegir idioma"],
  de: ["Nutzungsbedingungen", "Lies die WalkQuest-Nutzungsbedingungen zu virtuellen Routen, Health Connect, Premium-Abos, Lifetime-Zugang und In-App-Käufen.", "Zurück zu WalkQuest", "Sprache wählen"],
  fr: ["Conditions d’utilisation", "Consultez les conditions d’utilisation de WalkQuest concernant les parcours virtuels, Health Connect, Premium et les achats intégrés.", "Retour à WalkQuest", "Choisir la langue"],
  pl: ["Warunki korzystania", "Poznaj warunki korzystania z WalkQuest: wirtualne trasy, Health Connect, Premium, dostęp dożywotni i zakupy w aplikacji.", "Wróć do WalkQuest", "Wybierz język"],
  pt: ["Termos de Utilização", "Consulte os Termos de Utilização do WalkQuest para rotas virtuais, Health Connect, Premium, acesso vitalício e compras na aplicação.", "Voltar ao WalkQuest", "Escolher idioma"],
  it: ["Termini di utilizzo", "Leggi i Termini di utilizzo di WalkQuest per percorsi virtuali, Health Connect, Premium, accesso a vita e acquisti in-app.", "Torna a WalkQuest", "Scegli la lingua"],
  tr: ["Kullanım Koşulları", "Sanal rotalar, Health Connect, Premium abonelikleri, ömür boyu erişim ve uygulama içi satın almalar için WalkQuest koşulları.", "WalkQuest'e dön", "Dil seçin"],
  ja: ["利用規約", "バーチャルルート、Health Connect、Premium、買い切りアクセス、アプリ内購入に関するWalkQuest利用規約をご確認ください。", "WalkQuestに戻る", "言語を選択"],
  ko: ["이용약관", "가상 경로, Health Connect, Premium 구독, 평생 이용권 및 인앱 구매에 관한 WalkQuest 이용약관을 확인하세요.", "WalkQuest로 돌아가기", "언어 선택"],
  "zh-CN": ["使用条款", "查看 WalkQuest 关于虚拟路线、Health Connect、Premium 订阅、终身权限和应用内购买的使用条款。", "返回 WalkQuest", "选择语言"],
  ar: ["شروط الاستخدام", "اطّلع على شروط استخدام WalkQuest للمسارات الافتراضية وHealth Connect واشتراكات Premium والوصول مدى الحياة والمشتريات.", "العودة إلى WalkQuest", "اختر اللغة"],
  hi: ["उपयोग की शर्तें", "वर्चुअल मार्ग, Health Connect, Premium सदस्यता, लाइफ़टाइम एक्सेस और इन-ऐप खरीदारी के लिए WalkQuest की उपयोग शर्तें पढ़ें।", "WalkQuest पर वापस जाएँ", "भाषा चुनें"],
  "pt-BR": ["Termos de Uso", "Leia os Termos de Uso do WalkQuest para rotas virtuais, Health Connect, Premium, acesso vitalício e compras no aplicativo.", "Voltar ao WalkQuest", "Escolher idioma"],
};

const sectionText = {
  ru: ["Действуют и обновлены: 4 ноября 2026 года", "Эти Условия регулируют использование приложения WalkQuest для Android и сайта WalkQuest. Сервис предоставляет Gold Digital Studio. Устанавливая или используя WalkQuest, вы принимаете Условия.", "Право на использование", "WalkQuest предназначен для пользователей от 13 лет. Если вы не можете принять Условия самостоятельно, это должен сделать родитель или законный представитель.", "Сервис и безопасность", "WalkQuest преобразует разрешённые данные о шагах в прогресс по виртуальным маршрутам. Истории, расстояния и иллюстрации предназначены для развлечения и общей информации. Это не навигационная, медицинская или экстренная служба. Следите за дорожным движением, погодой и окружением.", "Лицензия и правила", "Gold Digital Studio предоставляет личную, ограниченную, неисключительную, непередаваемую и отзывную лицензию для законного некоммерческого использования. Нельзя копировать или продавать приложение, обходить защиту, вмешиваться в работу сервиса, подделывать шаги, покупки или прогресс и нарушать права других лиц.", "Health Connect и прогресс", "С вашего разрешения WalkQuest читает подходящие данные о шагах через Android Health Connect. Доступ можно отозвать в Android. Данные датчиков могут быть неточными или задержанными. Локальный прогресс может исчезнуть после удаления приложения, очистки хранилища или смены устройства. Подробнее — в [Политике конфиденциальности](https://walkquest.site/ru/privacy.html).", "Premium и покупки", "WalkQuest может предлагать месячную или годовую Premium-подписку, разовую покупку Lifetime Premium и виртуальные билеты на поезд, паром или самолёт. Цена, валюта, пробный период и преимущества определяются предложением в Google Play при оформлении. Подписки продлеваются автоматически, если не отменить их в Google Play; удаление приложения не отменяет подписку. Lifetime Premium действует в течение поддерживаемого срока жизни приложения. Платежи и возвраты обрабатываются по правилам Google Play и применимому закону. Обязательные права потребителей сохраняются. См. [Premium и покупки](https://walkquest.site/ru/premium.html).", "Реклама и сторонние сервисы", "Бесплатная версия может показывать рекламу. Google Play, Health Connect, Firebase, AdMob и другие сервисы применяют собственные условия. Мы не отвечаем за сервисы вне нашего контроля.", "Интеллектуальная собственность", "Программа, дизайн, тексты, маршруты, изображения и бренд принадлежат Gold Digital Studio или лицензиарам. Эти Условия не передают право собственности.", "Доступность и прекращение", "Мы можем изменять или прекращать функции, маршруты и совместимость. Непрерывная работа не гарантируется. Доступ может быть ограничен при существенном нарушении, угрозе безопасности или по требованию закона.", "Ответственность и споры", "В разрешённых законом пределах WalkQuest предоставляется «как есть». Мы не отвечаем за косвенный ущерб, небезопасную ходьбу, неточные датчики, сбои устройства или сторонние сервисы. Обязательная защита потребителей не исключается. Перед формальным спором свяжитесь с нами; ваши законные права на суд или государственный орган сохраняются.", "Изменения и контакты", "Мы можем обновлять Условия и дату на этой странице. Продолжение использования после вступления изменений в силу означает согласие. Вопросы: **digitalstudiogold@gmail.com**."],
};

const fullGenericContent = {
  es: `**Vigentes y actualizados: 4 de noviembre de 2026**\n\nEstas Condiciones regulan la aplicación Android y el sitio web WalkQuest, ofrecidos por Gold Digital Studio. Al instalar o utilizar WalkQuest, las aceptas.\n\n## 1. Requisitos\n\nWalkQuest está destinado a mayores de 13 años. Cuando la ley lo exija, un progenitor o tutor debe revisar y aceptar estas Condiciones.\n\n## 2. Servicio y seguridad\n\nWalkQuest convierte los pasos autorizados en avance por rutas virtuales con historias, lugares y sellos. El contenido es recreativo e informativo; no es navegación, consejo médico ni un servicio de emergencia. Camina con atención al tráfico, al terreno y al tiempo.\n\n## 3. Licencia y uso permitido\n\nRecibes una licencia personal, limitada, no exclusiva, intransferible y revocable para un uso legal y no comercial. No copies ni vendas la aplicación, eludas su seguridad, alteres el servicio, falsifiques pasos, compras o progreso, ni vulneres derechos ajenos.\n\n## 4. Health Connect y progreso\n\nCon tu permiso, WalkQuest lee pasos aptos mediante Android Health Connect. Puedes retirar el permiso en Android. Los sensores pueden ser incompletos o inexactos. El progreso local puede perderse al desinstalar, borrar datos o cambiar de dispositivo. Consulta la [Política de privacidad](https://walkquest.site/es/privacy.html).\n\n## 5. Premium y compras\n\nPuede haber suscripciones Premium mensuales o anuales, una compra única Lifetime Premium y billetes virtuales de tren, ferry o avión. Mandan el precio, la moneda, la prueba y las ventajas mostradas por Google Play al pagar. Las suscripciones se renuevan automáticamente salvo cancelación previa en Google Play; desinstalar no cancela. Lifetime Premium cubre la vida útil compatible de la aplicación, no una existencia eterna. Google Play procesa pagos, cancelaciones y reembolsos conforme a sus reglas y a la ley. Se mantienen los derechos obligatorios del consumidor. Consulta [Premium y compras](https://walkquest.site/es/premium.html).\n\n## 6. Anuncios y terceros\n\nLa versión gratuita puede mostrar anuncios. Google Play, Health Connect, Firebase y AdMob aplican sus propias condiciones. No controlamos sus servicios.\n\n## 7. Propiedad intelectual\n\nEl software, diseño, textos, rutas, arte y marca pertenecen a Gold Digital Studio o sus licenciantes. Estas Condiciones no transfieren su propiedad.\n\n## 8. Disponibilidad y finalización\n\nPodemos modificar o retirar funciones, rutas y compatibilidad. No garantizamos disponibilidad continua. Podemos limitar el acceso por incumplimiento grave, riesgo de seguridad o exigencia legal.\n\n## 9. Responsabilidad y disputas\n\nEn la medida permitida, WalkQuest se ofrece «tal cual». No respondemos de pérdidas indirectas, caminar sin seguridad, sensores inexactos, fallos del dispositivo o terceros. No se excluyen derechos obligatorios. Contacta antes de una disputa formal; conservas los recursos legales disponibles.\n\n## 10. Cambios y contacto\n\nPodemos actualizar estas Condiciones y su fecha. El uso posterior a su entrada en vigor supone aceptación. Contacto: **digitalstudiogold@gmail.com**.`,
};

const sectionHeadings = {
  de: ["Berechtigung und Dienst", "Lizenz und zulässige Nutzung", "Health Connect und Fortschritt", "Premium und Käufe", "Werbung und geistiges Eigentum", "Verfügbarkeit und Beendigung", "Haftung und Streitigkeiten", "Änderungen und Kontakt"],
  fr: ["Éligibilité et service", "Licence et utilisation autorisée", "Health Connect et progression", "Premium et achats", "Publicité et propriété intellectuelle", "Disponibilité et résiliation", "Responsabilité et litiges", "Modifications et contact"],
  pl: ["Uprawnienia i usługa", "Licencja i dozwolone użycie", "Health Connect i postęp", "Premium i zakupy", "Reklamy i własność intelektualna", "Dostępność i zakończenie", "Odpowiedzialność i spory", "Zmiany i kontakt"],
  pt: ["Elegibilidade e serviço", "Licença e utilização permitida", "Health Connect e progresso", "Premium e compras", "Publicidade e propriedade intelectual", "Disponibilidade e cessação", "Responsabilidade e litígios", "Alterações e contacto"],
  it: ["Idoneità e servizio", "Licenza e uso consentito", "Health Connect e progressi", "Premium e acquisti", "Pubblicità e proprietà intellettuale", "Disponibilità e cessazione", "Responsabilità e controversie", "Modifiche e contatti"],
  tr: ["Uygunluk ve hizmet", "Lisans ve kabul edilebilir kullanım", "Health Connect ve ilerleme", "Premium ve satın almalar", "Reklam ve fikrî mülkiyet", "Kullanılabilirlik ve sona erme", "Sorumluluk ve uyuşmazlıklar", "Değişiklikler ve iletişim"],
  ja: ["利用資格とサービス", "ライセンスと適切な利用", "Health Connectと進行状況", "Premiumと購入", "広告と知的財産", "提供状況と終了", "責任と紛争", "変更と連絡先"],
  ko: ["이용 자격과 서비스", "라이선스와 허용되는 이용", "Health Connect와 진행", "Premium과 구매", "광고와 지식재산권", "가용성과 종료", "책임과 분쟁", "변경과 문의"],
  "zh-CN": ["资格与服务", "许可与允许的使用", "Health Connect 与进度", "Premium 与购买", "广告与知识产权", "可用性与终止", "责任与争议", "变更与联系"],
  ar: ["الأهلية والخدمة", "الترخيص والاستخدام المقبول", "Health Connect والتقدّم", "Premium والمشتريات", "الإعلانات والملكية الفكرية", "التوفر والإنهاء", "المسؤولية والنزاعات", "التغييرات والتواصل"],
  hi: ["पात्रता और सेवा", "लाइसेंस और स्वीकार्य उपयोग", "Health Connect और प्रगति", "Premium और खरीदारी", "विज्ञापन और बौद्धिक संपदा", "उपलब्धता और समाप्ति", "दायित्व और विवाद", "बदलाव और संपर्क"],
  "pt-BR": ["Elegibilidade e serviço", "Licença e uso permitido", "Health Connect e progresso", "Premium e compras", "Publicidade e propriedade intelectual", "Disponibilidade e encerramento", "Responsabilidade e disputas", "Alterações e contato"],
};

const baseByLanguage = {
  de: ["Gültig und zuletzt aktualisiert: 4. November 2026", "Diese Bedingungen regeln die Android-App und Website WalkQuest von Gold Digital Studio. Mit Installation oder Nutzung stimmst du ihnen zu.", "WalkQuest ist ab 13 Jahren bestimmt. Die App wandelt mit Erlaubnis Health-Connect-Schritte in Fortschritt auf virtuellen Routen um. Inhalte dienen Unterhaltung und Information, nicht Navigation, Medizin oder Notfällen. Achte beim Gehen auf Verkehr und Umgebung.", "Du erhältst eine persönliche, beschränkte, nicht übertragbare und widerrufliche Lizenz. Kopieren, Verkauf, Umgehung von Schutzmaßnahmen, Störung, manipulierte Schritte, Käufe oder Fortschritte und Rechtsverletzungen sind untersagt.", "Health-Connect-Zugriff kann in Android widerrufen werden. Sensordaten können verzögert oder ungenau sein; lokale Daten können durch Deinstallation, Löschen oder Gerätewechsel verloren gehen. Siehe [Datenschutzerklärung](https://walkquest.site/de/privacy.html).", "WalkQuest kann monatliche oder jährliche Premium-Abos, Lifetime Premium als Einmalkauf und virtuelle Zug-, Fähr- oder Flugtickets anbieten. Maßgeblich sind Preis, Währung, Testphase und Leistungen in Google Play. Abos verlängern sich automatisch, sofern sie nicht rechtzeitig in Google Play gekündigt werden; Deinstallation kündigt nicht. Lifetime Premium gilt für die unterstützte Lebensdauer der App. Google Play verarbeitet Zahlung und Erstattung. Gesetzliche Verbraucherrechte bleiben unberührt. Siehe [Premium](https://walkquest.site/de/premium.html).", "Die kostenlose Version kann Werbung enthalten. Google Play, Health Connect, Firebase und AdMob haben eigene Bedingungen. Software, Design, Texte, Routen, Bilder und Marke gehören Gold Digital Studio oder Lizenzgebern.", "Funktionen und Routen können geändert oder eingestellt werden; dauerhafte Verfügbarkeit ist nicht garantiert. Bei schwerem Verstoß, Sicherheitsrisiko oder gesetzlicher Pflicht kann der Zugang beschränkt werden.", "Soweit gesetzlich zulässig, wird WalkQuest „wie besehen“ angeboten. Zwingende Haftung und Verbraucherrechte bleiben bestehen. Kontaktiere uns vor einem formellen Streit; gesetzliche Rechtswege bleiben offen.", "Wir können diese Bedingungen und das Datum aktualisieren. Weitere Nutzung nach Inkrafttreten gilt als Zustimmung. Kontakt: **digitalstudiogold@gmail.com**."],
  fr: ["En vigueur et mise à jour : 4 novembre 2026", "Ces Conditions régissent l’application Android et le site WalkQuest fournis par Gold Digital Studio. En installant ou utilisant WalkQuest, vous les acceptez.", "WalkQuest s’adresse aux personnes de 13 ans et plus. Avec autorisation, l’application transforme les pas Health Connect en progression sur des parcours virtuels. Le contenu est ludique et informatif, sans constituer navigation, conseil médical ou secours. Restez attentif en marchant.", "Vous recevez une licence personnelle, limitée, non exclusive, incessible et révocable. Il est interdit de copier ou vendre l’application, contourner sa sécurité, perturber le service, falsifier pas, achats ou progression, ou violer les droits d’autrui.", "L’accès Health Connect peut être retiré dans Android. Les capteurs peuvent être imprécis et les données locales perdues après désinstallation, effacement ou changement d’appareil. Voir la [Politique de confidentialité](https://walkquest.site/fr/privacy.html).", "WalkQuest peut proposer des abonnements Premium mensuels ou annuels, Lifetime Premium en achat unique et des billets virtuels de train, ferry ou avion. L’offre Google Play au paiement fixe prix, devise, essai et avantages. Les abonnements se renouvellent sauf résiliation préalable dans Google Play ; désinstaller ne résilie pas. Lifetime Premium couvre la durée de vie prise en charge de l’application. Google Play traite paiements et remboursements. Les droits impératifs des consommateurs demeurent. Voir [Premium](https://walkquest.site/fr/premium.html).", "La version gratuite peut afficher des publicités. Google Play, Health Connect, Firebase et AdMob appliquent leurs propres règles. Le logiciel, le design, les textes, parcours, images et la marque appartiennent à Gold Digital Studio ou à ses concédants.", "Nous pouvons modifier ou arrêter des fonctions et parcours ; la disponibilité continue n’est pas garantie. L’accès peut être limité en cas de violation grave, risque de sécurité ou obligation légale.", "Dans la limite de la loi, WalkQuest est fourni « en l’état ». Les responsabilités et protections impératives ne sont pas exclues. Contactez-nous avant tout litige formel ; vos recours légaux restent disponibles.", "Nous pouvons mettre à jour ces Conditions et leur date. La poursuite de l’utilisation vaut acceptation après leur entrée en vigueur. Contact : **digitalstudiogold@gmail.com**."],
  pl: ["Obowiązują i zostały zaktualizowane: 4 listopada 2026 r.", "Warunki dotyczą aplikacji Android i strony WalkQuest udostępnianych przez Gold Digital Studio. Instalując lub używając WalkQuest, akceptujesz je.", "WalkQuest jest przeznaczony dla osób od 13 lat. Za zgodą aplikacja zamienia kroki Health Connect na postęp na wirtualnych trasach. Treści służą rozrywce i informacji, nie są nawigacją, poradą medyczną ani usługą ratunkową. Podczas chodzenia dbaj o bezpieczeństwo.", "Otrzymujesz osobistą, ograniczoną, niewyłączną, nieprzenoszalną i odwołalną licencję. Nie wolno kopiować ani sprzedawać aplikacji, omijać zabezpieczeń, zakłócać usługi, fałszować kroków, zakupów lub postępu ani naruszać cudzych praw.", "Dostęp Health Connect można wycofać w Androidzie. Czujniki mogą być niedokładne, a lokalny postęp może zniknąć po odinstalowaniu, usunięciu danych lub zmianie urządzenia. Zobacz [Politykę prywatności](https://walkquest.site/pl/privacy.html).", "WalkQuest może oferować miesięczne lub roczne subskrypcje Premium, jednorazowy Lifetime Premium oraz wirtualne bilety kolejowe, promowe lub lotnicze. Wiążące są cena, waluta, okres próbny i korzyści pokazane w Google Play. Subskrypcje odnawiają się automatycznie, jeśli nie zostaną wcześniej anulowane w Google Play; odinstalowanie nie anuluje. Lifetime Premium działa przez wspierany okres życia aplikacji. Google Play obsługuje płatności i zwroty. Obowiązkowe prawa konsumenta pozostają bez zmian. Zobacz [Premium](https://walkquest.site/pl/premium.html).", "Wersja bezpłatna może zawierać reklamy. Google Play, Health Connect, Firebase i AdMob mają własne warunki. Oprogramowanie, projekt, teksty, trasy, grafiki i marka należą do Gold Digital Studio lub licencjodawców.", "Możemy zmieniać lub wycofywać funkcje i trasy; ciągła dostępność nie jest gwarantowana. Dostęp może zostać ograniczony przy poważnym naruszeniu, zagrożeniu bezpieczeństwa lub wymogu prawa.", "W zakresie dozwolonym prawem WalkQuest jest udostępniany „tak jak jest”. Obowiązkowa odpowiedzialność i ochrona konsumenta nie są wyłączone. Skontaktuj się przed formalnym sporem; ustawowe środki prawne pozostają dostępne.", "Możemy aktualizować Warunki i datę. Dalsze korzystanie po wejściu zmian w życie oznacza akceptację. Kontakt: **digitalstudiogold@gmail.com**."],
};

function compactContent(code, title) {
  if (fullGenericContent[code]) return `# ${title}\n\n${fullGenericContent[code]}`;
  if (sectionText[code]) {
    const a = sectionText[code];
    return `# ${title}\n\n**${a[0]}**\n\n${a[1]}\n\n## 1. ${a[2]}\n\n${a[3]}\n\n## 2. ${a[4]}\n\n${a[5]}\n\n## 3. ${a[6]}\n\n${a[7]}\n\n## 4. ${a[8]}\n\n${a[9]}\n\n## 5. ${a[10]}\n\n${a[11]}\n\n## 6. ${a[12]}\n\n${a[13]}\n\n## 7. ${a[14]}\n\n${a[15]}\n\n## 8. ${a[16]}\n\n${a[17]}\n\n## 9. ${a[18]}\n\n${a[19]}`;
  }
  const a = baseByLanguage[code];
  if (a) {
    const h = sectionHeadings[code];
    return `# ${title}\n\n**${a[0]}**\n\n${a[1]}\n\n## 1. ${h[0]}\n\n${a[2]}\n\n## 2. ${h[1]}\n\n${a[3]}\n\n## 3. ${h[2]}\n\n${a[4]}\n\n## 4. ${h[3]}\n\n${a[5]}\n\n## 5. ${h[4]}\n\n${a[6]}\n\n## 6. ${h[5]}\n\n${a[7]}\n\n## 7. ${h[6]}\n\n${a[8]}\n\n## 8. ${h[7]}\n\n${a[9]}`;
  }
  return null;
}

const localizedLong = {
  pt: ["Vigentes e atualizados: 4 de novembro de 2026", "A aplicação Android e o site WalkQuest são fornecidos pela Gold Digital Studio. Ao instalar ou utilizar o serviço, aceita estes Termos.", "O WalkQuest destina-se a pessoas com 13 anos ou mais. Com permissão, transforma passos do Health Connect em progresso em rotas virtuais. O conteúdo é recreativo e informativo, não constitui navegação, aconselhamento médico ou emergência. Caminhe em segurança.", "É concedida uma licença pessoal, limitada, não exclusiva, intransmissível e revogável. Não copie ou venda a aplicação, contorne a segurança, perturbe o serviço, falsifique passos, compras ou progresso, nem viole direitos de terceiros.", "A permissão do Health Connect pode ser retirada no Android. Os sensores podem ser imprecisos e o progresso local pode perder-se ao desinstalar, apagar dados ou mudar de dispositivo. Consulte a [Política de Privacidade](https://walkquest.site/pt/privacy.html).", "Podem existir subscrições Premium mensais ou anuais, Lifetime Premium numa compra única e bilhetes virtuais de comboio, ferry ou avião. Preço, moeda, teste e benefícios apresentados pelo Google Play no pagamento prevalecem. As subscrições renovam automaticamente salvo cancelamento prévio no Google Play; desinstalar não cancela. Lifetime Premium cobre a vida útil suportada da aplicação. O Google Play processa pagamentos e reembolsos. Mantêm-se os direitos obrigatórios do consumidor. Consulte [Premium](https://walkquest.site/pt/premium.html).", "A versão gratuita pode mostrar publicidade. Google Play, Health Connect, Firebase e AdMob têm regras próprias. O software, design, textos, rotas, imagens e marca pertencem à Gold Digital Studio ou licenciantes.", "Podemos alterar ou terminar funcionalidades e rotas; não garantimos disponibilidade contínua. O acesso pode ser limitado por violação grave, risco de segurança ou obrigação legal.", "Na medida permitida, o WalkQuest é fornecido «tal como está». Responsabilidades e direitos imperativos não são excluídos. Contacte-nos antes de um litígio formal; os recursos legais continuam disponíveis.", "Podemos atualizar estes Termos e a data. O uso após a entrada em vigor significa aceitação. Contacto: **digitalstudiogold@gmail.com**."],
  it: ["In vigore e aggiornati: 4 novembre 2026", "L’app Android e il sito WalkQuest sono forniti da Gold Digital Studio. Installando o usando WalkQuest accetti questi Termini.", "WalkQuest è destinato a persone di almeno 13 anni. Con il permesso, trasforma i passi di Health Connect in progressi su percorsi virtuali. I contenuti sono di intrattenimento e informativi, non navigazione, consulenza medica o emergenza. Cammina in sicurezza.", "Ricevi una licenza personale, limitata, non esclusiva, non trasferibile e revocabile. Non copiare o vendere l’app, aggirare la sicurezza, interferire col servizio, falsificare passi, acquisti o progressi, né violare diritti altrui.", "Il permesso Health Connect può essere revocato in Android. I sensori possono essere imprecisi e i dati locali persi disinstallando, cancellando i dati o cambiando dispositivo. Vedi l’[Informativa sulla privacy](https://walkquest.site/it/privacy.html).", "WalkQuest può offrire abbonamenti Premium mensili o annuali, Lifetime Premium una tantum e biglietti virtuali per treno, traghetto o aereo. Fanno fede prezzo, valuta, prova e vantaggi mostrati da Google Play al pagamento. Gli abbonamenti si rinnovano automaticamente se non annullati prima in Google Play; disinstallare non annulla. Lifetime Premium vale per la vita supportata dell’app. Google Play gestisce pagamenti e rimborsi. I diritti obbligatori dei consumatori restano validi. Vedi [Premium](https://walkquest.site/it/premium.html).", "La versione gratuita può mostrare pubblicità. Google Play, Health Connect, Firebase e AdMob hanno condizioni proprie. Software, design, testi, percorsi, immagini e marchio appartengono a Gold Digital Studio o ai licenzianti.", "Possiamo modificare o interrompere funzioni e percorsi; la disponibilità continua non è garantita. L’accesso può essere limitato per violazione grave, rischio di sicurezza o obbligo legale.", "Nei limiti di legge, WalkQuest è fornito “così com’è”. Responsabilità e tutele obbligatorie non sono escluse. Contattaci prima di una controversia formale; i rimedi di legge restano disponibili.", "Possiamo aggiornare i Termini e la data. L’uso dopo l’entrata in vigore implica accettazione. Contatto: **digitalstudiogold@gmail.com**."],
  tr: ["Yürürlük ve son güncelleme: 4 Kasım 2026", "WalkQuest Android uygulaması ve web sitesi Gold Digital Studio tarafından sunulur. Yükleyerek veya kullanarak bu Koşulları kabul edersiniz.", "WalkQuest 13 yaş ve üzeri içindir. İzin verdiğinizde Health Connect adımlarını sanal rota ilerlemesine dönüştürür. İçerik eğlence ve genel bilgi amaçlıdır; navigasyon, tıbbi tavsiye veya acil hizmet değildir. Yürürken çevrenize dikkat edin.", "Kişisel, sınırlı, münhasır olmayan, devredilemez ve geri alınabilir lisans verilir. Uygulamayı kopyalamayın veya satmayın; güvenliği aşmayın, hizmete müdahale etmeyin, adım, satın alma veya ilerlemeyi değiştirmeyin ve başkalarının haklarını ihlal etmeyin.", "Health Connect izni Android’den kaldırılabilir. Sensörler hatalı olabilir; uygulama silinince, veriler temizlenince veya cihaz değişince yerel ilerleme kaybolabilir. [Gizlilik Politikası](https://walkquest.site/tr/privacy.html).", "Aylık/yıllık Premium abonelik, tek seferlik Lifetime Premium ve sanal tren, feribot veya uçak biletleri sunulabilir. Ödeme sırasında Google Play’deki fiyat, para birimi, deneme ve avantajlar geçerlidir. Abonelik Google Play’den önceden iptal edilmedikçe yenilenir; uygulamayı silmek iptal etmez. Lifetime Premium uygulamanın desteklenen ömrü içindir. Ödeme ve iadeleri Google Play kuralları ve yasa yönetir. Zorunlu tüketici hakları saklıdır. [Premium](https://walkquest.site/tr/premium.html).", "Ücretsiz sürüm reklam gösterebilir. Google Play, Health Connect, Firebase ve AdMob kendi koşullarını uygular. Yazılım, tasarım, metin, rota, görsel ve marka Gold Digital Studio veya lisans verenlere aittir.", "Özellik ve rotalar değiştirilebilir veya sonlandırılabilir; kesintisiz erişim garanti edilmez. Ciddi ihlal, güvenlik riski veya yasal zorunluluk halinde erişim kısıtlanabilir.", "Yasanın izin verdiği ölçüde WalkQuest “olduğu gibi” sunulur. Zorunlu sorumluluk ve tüketici hakları hariç tutulmaz. Resmî uyuşmazlıktan önce bizimle iletişime geçin; yasal yollar açıktır.", "Koşulları ve tarihi güncelleyebiliriz. Yürürlükten sonra kullanım kabul sayılır. İletişim: **digitalstudiogold@gmail.com**."],
  "pt-BR": ["Vigentes e atualizados: 4 de novembro de 2026", "O aplicativo Android e o site WalkQuest são fornecidos pela Gold Digital Studio. Ao instalar ou usar o serviço, você aceita estes Termos.", "WalkQuest é destinado a pessoas com 13 anos ou mais. Com permissão, transforma passos do Health Connect em progresso em rotas virtuais. O conteúdo é recreativo e informativo, não é navegação, orientação médica nem emergência. Caminhe com segurança.", "Você recebe licença pessoal, limitada, não exclusiva, intransferível e revogável. Não copie ou venda o app, contorne a segurança, interfira no serviço, falsifique passos, compras ou progresso nem viole direitos de terceiros.", "A permissão do Health Connect pode ser revogada no Android. Sensores podem ser imprecisos e o progresso local pode ser perdido ao desinstalar, apagar dados ou trocar de aparelho. Consulte a [Política de Privacidade](https://walkquest.site/pt-br/privacy.html).", "Podem ser oferecidas assinaturas Premium mensais ou anuais, Lifetime Premium em compra única e bilhetes virtuais de trem, balsa ou avião. Valem preço, moeda, teste e benefícios mostrados pelo Google Play no checkout. Assinaturas renovam automaticamente salvo cancelamento prévio no Google Play; desinstalar não cancela. Lifetime Premium cobre a vida útil compatível do app. Google Play processa pagamentos e reembolsos. Direitos obrigatórios do consumidor permanecem. Veja [Premium](https://walkquest.site/pt-br/premium.html).", "A versão gratuita pode exibir anúncios. Google Play, Health Connect, Firebase e AdMob têm regras próprias. Software, design, textos, rotas, imagens e marca pertencem à Gold Digital Studio ou licenciadores.", "Podemos alterar ou encerrar recursos e rotas; disponibilidade contínua não é garantida. O acesso pode ser limitado por violação grave, risco de segurança ou exigência legal.", "Na medida permitida, WalkQuest é fornecido “no estado em que se encontra”. Responsabilidades e direitos obrigatórios não são excluídos. Fale conosco antes de disputa formal; medidas legais continuam disponíveis.", "Podemos atualizar estes Termos e a data. O uso após a vigência significa aceitação. Contato: **digitalstudiogold@gmail.com**."],
};

for (const [code, values] of Object.entries(localizedLong)) baseByLanguage[code] = values;

const asian = {
  ja: ["発効日・最終更新日：2026年11月4日", "AndroidアプリおよびWebサイトのWalkQuestはGold Digital Studioが提供します。インストールまたは利用により本規約に同意したものとします。", "WalkQuestは13歳以上向けです。許可を得てHealth Connectの歩数をバーチャルルートの進行に変換します。内容は娯楽・一般情報であり、ナビゲーション、医療助言、緊急サービスではありません。歩行中は交通や周囲に注意してください。", "個人的、限定的、非独占的、譲渡不能かつ取消可能な利用許諾です。複製・販売、保護機能の回避、サービス妨害、歩数・購入・進行の改ざん、他者の権利侵害は禁止します。", "Health Connectの許可はAndroidで取り消せます。センサーは不正確な場合があり、アンインストール、データ消去、端末変更でローカル進行が失われることがあります。[プライバシーポリシー](https://walkquest.site/ja/privacy.html)をご覧ください。", "月額・年額Premium、買い切りLifetime Premium、仮想の列車・フェリー・航空券を提供する場合があります。購入時にGoogle Playに表示される価格、通貨、試用、特典が適用されます。定期購入は事前にGoogle Playで解約しない限り自動更新され、アンインストールでは解約されません。Lifetime Premiumはアプリが対応する存続期間の権利です。決済と返金はGoogle Playの規則と適用法に従います。強行的な消費者権利は維持されます。[Premium](https://walkquest.site/ja/premium.html)。", "無料版には広告が表示される場合があります。Google Play、Health Connect、Firebase、AdMobには各規約があります。ソフトウェア、デザイン、文章、ルート、画像、ブランドはGold Digital Studioまたはライセンサーに帰属します。", "機能やルートを変更・終了する場合があり、継続提供は保証されません。重大な違反、セキュリティ上の危険、法的要請により利用を制限できます。", "法令の範囲でWalkQuestは現状有姿で提供されます。排除できない責任と消費者保護は除外しません。正式な紛争前にご連絡ください。法的手段を妨げません。", "本規約と日付を更新する場合があります。発効後の継続利用は同意を意味します。連絡先：**digitalstudiogold@gmail.com**。"],
  ko: ["시행 및 최종 업데이트: 2026년 11월 4일", "WalkQuest Android 앱과 웹사이트는 Gold Digital Studio가 제공합니다. 설치하거나 사용하면 본 약관에 동의하는 것입니다.", "WalkQuest는 만 13세 이상을 대상으로 합니다. 허용 시 Health Connect 걸음 수를 가상 경로 진행으로 변환합니다. 콘텐츠는 오락과 일반 정보이며 길찾기, 의료 조언 또는 응급 서비스가 아닙니다. 걸을 때 교통과 주변 환경을 확인하세요.", "개인적이고 제한적이며 비독점적·양도 불가·철회 가능한 이용권을 제공합니다. 앱 복제·판매, 보안 우회, 서비스 방해, 걸음·구매·진행 조작, 타인의 권리 침해는 금지됩니다.", "Android에서 Health Connect 권한을 철회할 수 있습니다. 센서는 부정확할 수 있고, 앱 삭제·데이터 초기화·기기 변경 시 로컬 진행이 사라질 수 있습니다. [개인정보처리방침](https://walkquest.site/ko/privacy.html)을 확인하세요.", "월간/연간 Premium 구독, 일회성 Lifetime Premium, 가상 기차·페리·항공권을 제공할 수 있습니다. 결제 시 Google Play에 표시된 가격, 통화, 체험과 혜택이 적용됩니다. 구독은 Google Play에서 미리 취소하지 않으면 자동 갱신되며 앱 삭제로 취소되지 않습니다. Lifetime Premium은 앱의 지원 수명 동안의 권리입니다. 결제와 환불은 Google Play 정책과 법률을 따릅니다. 의무적 소비자 권리는 유지됩니다. [Premium](https://walkquest.site/ko/premium.html).", "무료 버전에는 광고가 표시될 수 있습니다. Google Play, Health Connect, Firebase, AdMob은 자체 약관을 적용합니다. 소프트웨어, 디자인, 글, 경로, 이미지와 브랜드는 Gold Digital Studio 또는 라이선스 제공자에게 속합니다.", "기능과 경로를 변경하거나 종료할 수 있으며 지속적인 제공을 보장하지 않습니다. 중대한 위반, 보안 위험 또는 법적 요구가 있으면 이용을 제한할 수 있습니다.", "법이 허용하는 범위에서 WalkQuest는 ‘있는 그대로’ 제공됩니다. 배제할 수 없는 책임과 소비자 보호는 유지됩니다. 공식 분쟁 전에 연락해 주세요. 법적 구제 수단은 제한되지 않습니다.", "약관과 날짜를 업데이트할 수 있습니다. 시행 후 계속 사용하면 동의한 것으로 봅니다. 문의: **digitalstudiogold@gmail.com**."],
  "zh-CN": ["生效及最后更新：2026年11月4日", "WalkQuest Android 应用和网站由 Gold Digital Studio 提供。安装或使用 WalkQuest 即表示同意本条款。", "WalkQuest 面向年满13岁的用户。经您授权，应用会将 Health Connect 步数转换为虚拟路线进度。内容仅供娱乐和一般信息参考，不是导航、医疗建议或紧急服务。步行时请留意交通、天气和周围环境。", "我们授予您个人、有限、非独占、不可转让且可撤销的合法非商业许可。不得复制或出售应用、绕过安全措施、干扰服务、篡改步数、购买或进度，也不得侵犯他人权利。", "您可在 Android 中撤销 Health Connect 权限。传感器可能不准确；卸载、清除数据或更换设备可能导致本地进度丢失。请参阅[隐私政策](https://walkquest.site/zh-cn/privacy.html)。", "WalkQuest 可能提供月度或年度 Premium 订阅、一次性 Lifetime Premium 以及虚拟火车、渡轮或机票。以结账时 Google Play 显示的价格、货币、试用和权益为准。除非提前在 Google Play 取消，订阅会自动续订；卸载应用不会取消。Lifetime Premium 指应用受支持生命周期内的权益。付款和退款按 Google Play 规则及适用法律处理。强制性消费者权利不受影响。请参阅 [Premium](https://walkquest.site/zh-cn/premium.html)。", "免费体验可能展示广告。Google Play、Health Connect、Firebase 和 AdMob 适用各自条款。软件、设计、文字、路线、图片和品牌归 Gold Digital Studio 或许可方所有。", "我们可以更改或终止功能和路线，不保证持续可用。严重违约、安全风险或法律要求可能导致访问受限。", "在法律允许范围内，WalkQuest 按“现状”提供。不得排除的责任和消费者保护仍然有效。正式争议前请联系我们；法定救济不受限制。", "我们可以更新条款和日期。生效后继续使用即表示接受。联系方式：**digitalstudiogold@gmail.com**。"],
  ar: ["تاريخ النفاذ وآخر تحديث: 4 نوفمبر 2026", "يقدّم Gold Digital Studio تطبيق WalkQuest لنظام Android وموقعه. تثبيت WalkQuest أو استخدامه يعني قبول هذه الشروط.", "WalkQuest مخصّص لمن يبلغون 13 عاماً فأكثر. وبإذن منك يحوّل خطوات Health Connect إلى تقدّم في مسارات افتراضية. المحتوى للترفيه والمعلومات العامة وليس للملاحة أو الاستشارة الطبية أو الطوارئ. انتبه إلى المرور والطقس ومحيطك أثناء المشي.", "نمنحك ترخيصاً شخصياً محدوداً وغير حصري وغير قابل للنقل وقابلاً للإلغاء للاستخدام القانوني غير التجاري. يُحظر نسخ التطبيق أو بيعه أو تجاوز الحماية أو تعطيل الخدمة أو تزوير الخطوات أو المشتريات أو التقدّم أو انتهاك حقوق الآخرين.", "يمكن سحب إذن Health Connect من Android. قد تكون بيانات المستشعر غير دقيقة، وقد يضيع التقدّم المحلي عند إزالة التطبيق أو مسح البيانات أو تغيير الجهاز. راجع [سياسة الخصوصية](https://walkquest.site/ar/privacy.html).", "قد يقدّم WalkQuest اشتراك Premium شهرياً أو سنوياً، وLifetime Premium بدفعة واحدة، وتذاكر افتراضية للقطار أو العبّارة أو الطائرة. السعر والعملة والتجربة والمزايا المعروضة في Google Play عند الدفع هي المعتمدة. يتجدد الاشتراك تلقائياً ما لم يُلغَ مسبقاً في Google Play؛ حذف التطبيق لا يلغي الاشتراك. Lifetime Premium حق طوال العمر المدعوم للتطبيق. تعالج Google Play المدفوعات والمبالغ المستردة وفق قواعدها والقانون. لا تتأثر حقوق المستهلك الإلزامية. راجع [Premium](https://walkquest.site/ar/premium.html).", "قد تعرض النسخة المجانية إعلانات. تطبق Google Play وHealth Connect وFirebase وAdMob شروطها الخاصة. تعود ملكية البرنامج والتصميم والنصوص والمسارات والصور والعلامة إلى Gold Digital Studio أو المرخّصين.", "يجوز لنا تغيير الميزات والمسارات أو إيقافها، ولا نضمن التوفر الدائم. قد نقيّد الوصول عند مخالفة جوهرية أو خطر أمني أو التزام قانوني.", "في حدود القانون يُقدَّم WalkQuest «كما هو». لا نستبعد المسؤولية أو حماية المستهلك التي لا يجوز استبعادها. تواصل معنا قبل النزاع الرسمي، وتبقى وسائل الانتصاف القانونية متاحة.", "يجوز تحديث الشروط والتاريخ. استمرار الاستخدام بعد النفاذ يعني القبول. التواصل: **digitalstudiogold@gmail.com**."],
  hi: ["प्रभावी और अंतिम अपडेट: 4 नवंबर 2026", "WalkQuest Android ऐप और वेबसाइट Gold Digital Studio द्वारा दिए जाते हैं। इन्हें इंस्टॉल या उपयोग करके आप इन शर्तों को स्वीकार करते हैं।", "WalkQuest 13 वर्ष या उससे अधिक आयु के लोगों के लिए है। अनुमति मिलने पर यह Health Connect के कदमों को वर्चुअल मार्ग की प्रगति में बदलता है। सामग्री मनोरंजन और सामान्य जानकारी के लिए है; यह नेविगेशन, चिकित्सा सलाह या आपात सेवा नहीं है। चलते समय यातायात, मौसम और आसपास का ध्यान रखें।", "आपको निजी, सीमित, गैर-अनन्य, अहस्तांतरणीय और रद्द करने योग्य वैध गैर-व्यावसायिक लाइसेंस मिलता है। ऐप की नकल या बिक्री, सुरक्षा से बचना, सेवा में बाधा, कदमों, खरीद या प्रगति में हेरफेर और दूसरों के अधिकारों का उल्लंघन निषिद्ध है।", "Android में Health Connect अनुमति वापस ली जा सकती है। सेंसर गलत हो सकते हैं; ऐप हटाने, डेटा साफ करने या डिवाइस बदलने पर स्थानीय प्रगति मिट सकती है। [गोपनीयता नीति](https://walkquest.site/hi/privacy.html) देखें।", "WalkQuest मासिक या वार्षिक Premium सदस्यता, एक बार का Lifetime Premium और वर्चुअल ट्रेन, फ़ेरी या उड़ान टिकट दे सकता है। भुगतान के समय Google Play में दिखी कीमत, मुद्रा, ट्रायल और लाभ लागू होते हैं। Google Play में पहले रद्द न करने पर सदस्यता अपने-आप नवीनीकृत होती है; ऐप हटाने से रद्द नहीं होती। Lifetime Premium ऐप के समर्थित जीवनकाल के लिए है। भुगतान और रिफ़ंड Google Play नियमों और कानून के अनुसार हैं। अनिवार्य उपभोक्ता अधिकार बने रहते हैं। [Premium](https://walkquest.site/hi/premium.html) देखें।", "मुफ़्त संस्करण में विज्ञापन हो सकते हैं। Google Play, Health Connect, Firebase और AdMob की अपनी शर्तें हैं। सॉफ़्टवेयर, डिज़ाइन, पाठ, मार्ग, चित्र और ब्रांड Gold Digital Studio या लाइसेंसदाताओं के हैं।", "हम सुविधाएँ और मार्ग बदल या बंद कर सकते हैं; लगातार उपलब्धता की गारंटी नहीं है। गंभीर उल्लंघन, सुरक्षा जोखिम या कानूनी आवश्यकता पर पहुँच सीमित हो सकती है।", "कानून की सीमा में WalkQuest ‘जैसा है’ दिया जाता है। अनिवार्य दायित्व और उपभोक्ता संरक्षण समाप्त नहीं होते। औपचारिक विवाद से पहले संपर्क करें; कानूनी उपाय उपलब्ध रहते हैं।", "हम शर्तें और तारीख अपडेट कर सकते हैं। प्रभावी होने के बाद उपयोग जारी रखना स्वीकृति है। संपर्क: **digitalstudiogold@gmail.com**।"],
};
for (const [code, values] of Object.entries(asian)) baseByLanguage[code] = values;

for (const language of languages) {
  if (copy[language.code]) continue;
  const [title, description, back, choose] = generic[language.code];
  const content = compactContent(language.code, title);
  if (!content) throw new Error(`Missing content for ${language.code}`);
  copy[language.code] = { title, description, back, choose, content };
}

function inlineNodes(text) {
  const nodes = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https:\/\/[^)\s]+)\)|\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) nodes.push({ type: "text", text: text.slice(last, match.index) });
    if (match[1]) nodes.push({ type: "strong", text: match[1] });
    else if (match[2]) nodes.push({ type: "link", text: match[2], href: match[3], external: true, strong: false });
    else nodes.push({ type: "link", text: match[4], href: `mailto:${match[4]}`, external: false, strong: false });
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push({ type: "text", text: text.slice(last) });
  return nodes;
}

function blocks(markdown) {
  const result = [];
  let items = [];
  const flush = () => { if (items.length) result.push({ type: "list", items: items.splice(0).map(inlineNodes) }); };
  let paragraph = 0;
  for (const line of markdown.replace(/\r/g, "").split("\n")) {
    if (!line.trim()) { flush(); continue; }
    if (line.startsWith("# ")) { flush(); result.push({ type: "heading", level: 1, content: inlineNodes(line.slice(2)) }); }
    else if (line.startsWith("## ")) { flush(); result.push({ type: "heading", level: 2, content: inlineNodes(line.slice(3)) }); }
    else if (line.startsWith("- ")) items.push(line.slice(2));
    else { flush(); result.push({ type: "paragraph", updated: paragraph++ === 0, content: inlineNodes(line) }); }
  }
  flush();
  return result;
}

function slugFor(code) { return code === "zh-CN" ? "zh-cn" : code === "pt-BR" ? "pt-br" : code; }
function urlFor(code) { return code === "en" ? "https://walkquest.site/terms.html" : `https://walkquest.site/${slugFor(code)}/terms.html`; }
const alternates = languages.map(({ code }) => ({ lang: code, href: urlFor(code) })).concat({ lang: "x-default", href: urlFor("en") });

const locales = {};
for (const language of languages) {
  const sourceKey = slugFor(language.code);
  const source = structuredClone(privacy.locales[sourceKey]);
  const current = copy[language.code];
  const relativePrefix = language.code === "en" ? "" : `${sourceKey}/`;
  const canonical = urlFor(language.code);
  const title = `${current.title} | WalkQuest`;
  source.relativePath = `${relativePrefix}terms.html`;
  source.lang = language.code;
  source.dir = language.dir;
  source.head.title = title;
  source.head.description = current.description;
  source.head.canonical = canonical;
  source.head.alternates = alternates;
  source.head.openGraph = { ...source.head.openGraph, title, description: current.description, imageAlt: `${current.title} — WalkQuest`, url: canonical, type: "website" };
  source.head.twitter = { ...source.head.twitter, title, description: current.description, url: canonical };
  source.head.structuredData = [{ "@context": "https://schema.org", "@type": "WebPage", name: title, description: current.description, url: canonical, inLanguage: language.code, isPartOf: { "@type": "WebSite", url: "https://walkquest.site/" }, publisher: { "@type": "Organization", name: "Gold Digital Studio" } }];
  source.bodyScripts = source.bodyScripts.map((script) => script.src.includes("privacy-translations") ? { ...script, src: script.src.replace("privacy-translations", "terms-translations") } : script);
  source.privacy = { backLabel: `← ${current.back}`, languageLabel: current.choose, blocks: blocks(current.content) };
  locales[sourceKey] = source;
}

fs.writeFileSync(path.join(root, "terms.json"), JSON.stringify({ slug: "terms", locales }, null, 2) + "\n");
const translations = Object.fromEntries(languages.map(({ code }) => [code, { shortTitle: copy[code].title, backLabel: copy[code].back, languageLabel: copy[code].choose, description: copy[code].description, content: copy[code].content }]));
const runtime = `window.WalkQuestTermsI18n = ${JSON.stringify({ languages, translations }, null, 2)};\n`;
fs.writeFileSync(path.resolve("public/terms-translations.js"), runtime);
console.log("Generated terms.json and terms-translations.js for 16 locales.");
