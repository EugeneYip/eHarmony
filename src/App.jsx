import React, { useEffect, useMemo, useState } from "react";

/* ─────────────────────────────────────────────
   INLINE SVG ICON SYSTEM (no lucide-react)
   24x24 viewBox, stroke-based, 2px stroke
   ───────────────────────────────────────────── */
const ICON_PATHS = {
  bookOpen: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  brain: "M9.5 2a3.5 3.5 0 0 0-3 5.1A3.5 3.5 0 0 0 5 10.5V11a4 4 0 0 0 4 4h.5v4M14.5 2a3.5 3.5 0 0 1 3 5.1A3.5 3.5 0 0 1 19 10.5V11a4 4 0 0 1-4 4h-.5v4M12 7v10M9 7.5h6",
  layers: "M12 3 2 8l10 5 10-5-10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5",
  database: "M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Zm0 0v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6m-16 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6",
  spark: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  target: "M12 3v4M12 17v4M3 12h4M17 12h4M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0",
  gitBranch: "M6 3v12a3 3 0 1 0 2 0V9h6a3 3 0 1 1 0 6h-2M6 6a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm10 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z",
  checkCircle: "M9 12l2 2 4-4M12 22a10 10 0 1 0 0-20a10 10 0 0 0 0 20Z",
  alertTriangle: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01",
  chartBar: "M4 20V10M10 20V4M16 20v-7M22 20v-12",
  search: "m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16a8 8 0 0 1 0 16Z",
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  chevronDown: "m6 9 6 6 6-6",
  chevronRight: "m9 6 6 6-6 6",
  pin: "M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Zm0-8a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z",
  filter: "M3 5h18M6 12h12M10 19h4",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20a10 10 0 0 0 0 20Z",
  scale: "M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z",
  compass: "M12 22a10 10 0 1 0 0-20a10 10 0 0 0 0 20Zm4-14-6 2-2 6 6-2 2-6Z",
  flag: "M5 21V4m0 0c3-2 6 2 9 0s6 2 9 0v9c-3 2-6-2-9 0s-6-2-9 0",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M8 9h3",
  messageSquare: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  layout: "M3 4h18v5H3zM3 13h7v7H3zM14 13h7v7h-7z",
  badge: "M12 2l3 2 4-.5.5 4L22 11l-2 3 1.5 3.5-4 .5L12 22l-3-2-4 .5-.5-4L2 13l2-3-1.5-3.5 4-.5L12 2Z",
};

function Icon({ name, size = 18, stroke = 1.9, color = "currentColor", style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "0 0 auto", ...style }}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const palette = {
  bg: "#F5EFE5",
  bgSoft: "#FBF7F0",
  paper: "#FFFDFC",
  border: "#E2D7C8",
  borderStrong: "#D2C1AA",
  ink: "#1F2330",
  sub: "#5B5F6B",
  muted: "#7A7F89",
  red: "#C8102E",
  redDeep: "#A20E27",
  redSoft: "#F9E2E6",
  navy: "#2C3345",
  gold: "#B9862F",
  green: "#156B52",
  greenSoft: "#E8F4EF",
  amber: "#9A6700",
  amberSoft: "#F9F1DB",
  blueSoft: "#EAF0F7",
  shadow: "0 8px 24px rgba(31, 35, 48, 0.08)",
};

const studyData = {
  meta: {
    moduleEN: "MODULE II: DESIGNING A PREDICTION FACTORY INTO YOUR OPERATING MODEL — FOUNDATIONS",
    moduleZH: "模組二：將預測工廠設計入營運模式 — 基礎篇",
    subtitleEN: "eHarmony & Predicting Love | Weak AI/ML & Building Algorithms",
    subtitleZH: "eHarmony 與愛情預測｜弱 AI/ML 與演算法建構",
    courseLine: "Prof. Kevin Boudreau | Northeastern University | HBS Case 9-709-424",
  },
  hero: {
    takeawaysEN: [
      "eHarmony is best read as a prediction-driven operating model, not just a dating website.",
      "Its advantage comes from complementary choices: long questionnaire, selective admission, algorithmic matching, Guided Communication, premium pricing, and research investment.",
      "The central strategic tension is scale versus model integrity.",
    ],
    takeawaysZH: [
      "eHarmony 最值得用「預測驅動的營運模式」來理解，而不只是交友網站。",
      "其優勢來自互補選擇的整套設計：長問卷、選擇性准入、演算法配對、引導式溝通、溢價定價與研究投資。",
      "本案的核心策略張力，是規模擴張與模型完整性之間的取捨。",
    ],
  },
  quickStats: [
    {
      icon: "users",
      labelEN: "Questionnaires Completed",
      labelZH: "完成問卷人數",
      value: "14M+",
      noteEN: "first seven years",
      noteZH: "前七年",
    },
    {
      icon: "badge",
      labelEN: "Employees",
      labelZH: "員工數",
      value: "~230",
      noteEN: "about half in customer service",
      noteZH: "約半數在客服",
    },
    {
      icon: "checkCircle",
      labelEN: "Applicant Rejection Rate",
      labelZH: "申請者拒絕率",
      value: "~20%",
      noteEN: "to protect fit and credibility",
      noteZH: "為保護適配性與可信度",
    },
    {
      icon: "heart",
      labelEN: "Daily Marriages Claimed",
      labelZH: "宣稱每日成婚數",
      value: "236",
      noteEN: "Harris study, 2007",
      noteZH: "2007 Harris 研究",
    },
  ],
  precisionChecks: [
    {
      level: "must-fix",
      titleEN: "Cash-flow wording",
      titleZH: "現金流表述",
      bodyEN: "Case-safe wording: eHarmony broke even in 2002 and became cash-flow positive the following year.",
      bodyZH: "最安全的寫法：eHarmony 於 2002 年損益兩平，並在隔年轉為正現金流。",
    },
    {
      level: "must-fix",
      titleEN: "Advertising economics",
      titleZH: "廣告經濟性",
      bodyEN: "Banner ads delivered visibility and click-through, but low conversion made them less efficient than paid search on customer acquisition.",
      bodyZH: "橫幅廣告雖有曝光與點擊，但因轉換率低，在獲客效率上不如付費搜尋。",
    },
    {
      level: "watch",
      titleEN: "Algorithm claim",
      titleZH: "演算法表述",
      bodyEN: "Say the algorithm is the core of the advantage, not the entire advantage by itself. The operating model matters.",
      bodyZH: "應說演算法是優勢核心，而不是全部優勢本身；整套營運模式同樣重要。",
    },
    {
      level: "watch",
      titleEN: "Platform label",
      titleZH: "平台標籤",
      bodyEN: "Safer phrasing: curated matching platform in a two-sided market, but analytically strongest as a prediction-driven operating model.",
      bodyZH: "更穩的說法：它是雙邊市場中的策展式配對平台，但在分析上更適合視為預測驅動的營運模式。",
    },
  ],
  timeline: [
    {
      year: "1998",
      titleEN: "Founded",
      titleZH: "創立",
      bodyEN: "Neil Clark Warren and Greg Forgatch create eHarmony around long-term compatibility.",
      bodyZH: "Neil Clark Warren 與 Greg Forgatch 以長期相容性為核心創立 eHarmony。",
      icon: "flag",
    },
    {
      year: "2000",
      titleEN: "Launch",
      titleZH: "上線",
      bodyEN: "August launch with a structured compatibility questionnaire and algorithmic matching model.",
      bodyZH: "2000 年 8 月上線，以結構化相容性問卷與演算法配對為核心。",
      icon: "spark",
    },
    {
      year: "2002–2003",
      titleEN: "Financial Turn",
      titleZH: "財務轉折",
      bodyEN: "Break-even in 2002, cash-flow positive the following year.",
      bodyZH: "2002 年損益兩平，隔年轉為正現金流。",
      icon: "chartBar",
    },
    {
      year: "2004",
      titleEN: "Patent + Funding",
      titleZH: "專利與投資",
      bodyEN: "Matching-system patent secured; TCV and Sequoia invest.",
      bodyZH: "取得配對系統專利；TCV 與 Sequoia 投資。",
      icon: "badge",
    },
    {
      year: "2007",
      titleEN: "Strategic Inflection",
      titleZH: "策略轉折",
      bodyEN: "Competition intensifies from Chemistry, Match, free sites, and social networks.",
      bodyZH: "Chemistry、Match、免費網站與社群網路使競爭大幅升溫。",
      icon: "alertTriangle",
    },
  ],
  studyMaps: [
    {
      titleEN: "How to read the case in class",
      titleZH: "課堂上最好的讀法",
      bulletsEN: [
        "Start with the use case: serious, long-term relationship formation.",
        "Identify the prediction: which two people are likely to form a satisfying, enduring relationship.",
        "Then show how the operating model is built to protect that prediction.",
        "Only after that move to platform structure, network effects, and strategic options.",
      ],
      bulletsZH: [
        "先從 use case 開始：以認真、長期關係形成為核心。",
        "再界定預測：哪兩個人較可能形成令人滿意且持久的關係。",
        "接著說明整套營運模式如何被設計來保護這個預測。",
        "最後再進入平台結構、網路效應與策略選項。",
      ],
      icon: "compass",
    },
    {
      titleEN: "What the professor is likely to reward",
      titleZH: "教授最可能買單的答法",
      bulletsEN: [
        "Clear distinction between fact, inference, and course lens.",
        "Explanation of complementary choices rather than single-feature thinking.",
        "Attention to trade-offs: quality vs. scale, control vs. user autonomy, rigor vs. speed.",
        "Precise definitions of user, use case, and dimensions of value.",
      ],
      bulletsZH: [
        "清楚區分 fact、inference 與 course lens。",
        "強調互補選擇，而不是把優勢誤解成單一功能。",
        "看見取捨：品質對規模、控制對使用者自主、嚴謹對速度。",
        "先精準界定 user、use case 與 dimensions of value。",
      ],
      icon: "brain",
    },
  ],
  flow: [
    {
      icon: "database",
      titleEN: "Structured data intake",
      titleZH: "結構化資料輸入",
      bodyEN: "258–436 questions capture personality, values, interests, preferences, demographics, and optional photos.",
      bodyZH: "258–436 題問卷收集性格、價值觀、興趣、偏好、人口資料與可選照片。",
    },
    {
      icon: "spark",
      titleEN: "Compatibility model",
      titleZH: "相容性模型",
      bodyEN: "A patented algorithm validated against married-couple data estimates long-term compatibility rather than instant attraction.",
      bodyZH: "受專利保護且用已婚伴侶資料驗證的模型，估計的是長期相容性，而不是即時吸引力。",
    },
    {
      icon: "target",
      titleEN: "Controlled matching",
      titleZH: "受控配對",
      bodyEN: "Users do not browse freely. The system chooses who sees whom, protecting the logic of the prediction.",
      bodyZH: "使用者不能自由瀏覽，系統決定誰看見誰，以保護預測邏輯。",
    },
    {
      icon: "messageSquare",
      titleEN: "Guided interaction",
      titleZH: "引導式互動",
      bodyEN: "Structured questions, must-haves, can’t-stands, and open-ended prompts stage the interaction path.",
      bodyZH: "透過結構化問題、必備條件、不能接受項與開放題，分階段管理互動流程。",
    },
    {
      icon: "gitBranch",
      titleEN: "Feedback + refinement",
      titleZH: "回饋與修正",
      bodyEN: "Acceptance, closure, subscription, and research data feed ongoing learning, though the model still relies heavily on front-end profile data.",
      bodyZH: "接受、關閉、訂閱與研究資料能回饋系統，但模型仍高度依賴前端檔案資料。",
    },
  ],
  valueCurve: [
    {
      dimensionEN: "Match quality / compatibility",
      dimensionZH: "配對品質／相容性",
      eharmony: "Very High",
      chemistry: "Moderate",
      free: "Very Low",
      social: "Low",
    },
    {
      dimensionEN: "Pool size / variety",
      dimensionZH: "候選池大小／多樣性",
      eharmony: "Moderate",
      chemistry: "High",
      free: "Very High",
      social: "Very High",
    },
    {
      dimensionEN: "Safety / screening",
      dimensionZH: "安全／篩選",
      eharmony: "Very High",
      chemistry: "Low–Moderate",
      free: "Low",
      social: "Moderate",
    },
    {
      dimensionEN: "Ease / speed",
      dimensionZH: "易用性／速度",
      eharmony: "Low",
      chemistry: "High",
      free: "High",
      social: "High",
    },
    {
      dimensionEN: "Price affordability",
      dimensionZH: "價格可負擔性",
      eharmony: "Low",
      chemistry: "Moderate",
      free: "Very High",
      social: "Very High",
    },
    {
      dimensionEN: "Communication depth",
      dimensionZH: "溝通深度",
      eharmony: "High",
      chemistry: "Moderate",
      free: "Low",
      social: "Low",
    },
  ],
  optionMatrix: [
    {
      optionEN: "Option 1",
      optionZH: "選項一",
      titleEN: "Defend core through faster membership growth",
      titleZH: "以更快會員成長防守核心",
      fitEN: "Best short-term defensive move, but only if the company protects data quality, screening discipline, and model credibility.",
      fitZH: "短期內最合理的防守動作，但前提是不能破壞資料品質、篩選紀律與模型可信度。",
      riskEN: "Relaxing admission or shortening the questionnaire could damage the very prediction quality that differentiates eHarmony.",
      riskZH: "若放寬准入或縮短問卷，可能反而傷害最有差異化的預測品質。",
      tag: "Most Defensible",
    },
    {
      optionEN: "Option 2",
      optionZH: "選項二",
      titleEN: "Broaden into casual or medium-term dating",
      titleZH: "擴展到休閒或中期約會",
      fitEN: "Large addressable market, but it changes the target prediction itself.",
      fitZH: "雖然市場更大，但它直接改變了系統正在預測的對象。",
      riskEN: "The current model was validated for long-term satisfaction, not medium-term relationship compatibility.",
      riskZH: "現有模型驗證的是長期滿意婚姻，而非中期關係相容性。",
      tag: "Model Drift Risk",
    },
    {
      optionEN: "Option 3",
      optionZH: "選項三",
      titleEN: "Launch life-stage sites",
      titleZH: "推出人生階段網站",
      fitEN: "Leverages research capabilities and longitudinal insights rather than the core matching model.",
      fitZH: "主要利用研究能力與縱向洞察，而非核心配對模型。",
      riskEN: "Different revenue model, different capability set, and a real risk of distracting the firm from the core dating engine.",
      riskZH: "需要不同的營收模式與能力結構，也可能分散對核心交友引擎的注意力。",
      tag: "Adjacency",
    },
    {
      optionEN: "Option 4",
      optionZH: "選項四",
      titleEN: "Expand internationally",
      titleZH: "國際化擴張",
      fitEN: "Can extend the data and matching flywheel geographically, but only if the model transfers across cultures.",
      fitZH: "若模型能跨文化遷移，便可在地理上擴大資料與配對飛輪。",
      riskEN: "The algorithm was validated on U.S. couples, so transferability is uncertain and re-validation is likely necessary.",
      riskZH: "演算法是在美國伴侶資料上驗證的，跨文化可遷移性不確定，且大概率需要重新驗證。",
      tag: "Second Move",
    },
  ],
  exhibits: [
    {
      num: "1",
      titleEN: "Marriage-event demographics",
      titleZH: "婚姻事件人口統計",
      noteEN: "Use for segmentation language.",
      noteZH: "可用來支撐市場區隔分析。",
    },
    {
      num: "4",
      titleEN: "International marriage attitudes",
      titleZH: "各國婚姻態度比較",
      noteEN: "Critical for Option 4.",
      noteZH: "評估選項四時最重要。",
    },
    {
      num: "7",
      titleEN: "How couples met",
      titleZH: "伴侶如何相識",
      noteEN: "Use to compare online vs. offline pathways.",
      noteZH: "可拿來比較線上與線下途徑。",
    },
    {
      num: "8",
      titleEN: "eHarmony profile structure",
      titleZH: "eHarmony 問卷結構",
      noteEN: "Core data intake exhibit.",
      noteZH: "核心資料輸入附錄。",
    },
    {
      num: "9–10",
      titleEN: "Pricing comparison",
      titleZH: "定價比較",
      noteEN: "Shows consistent premium positioning.",
      noteZH: "顯示其持續採溢價定位。",
    },
    {
      num: "12",
      titleEN: "Chemistry test structure",
      titleZH: "Chemistry 測試結構",
      noteEN: "Useful for competitor comparison.",
      noteZH: "可用於競爭者比較。",
    },
  ],
  coldCalls: [
    {
      qEN: "What is eHarmony really selling?",
      qZH: "eHarmony 真正在賣什麼？",
      aEN: "It is selling higher-confidence compatibility judgment for people seeking serious relationships. The website, questionnaire, matching logic, and Guided Communication are all delivery mechanisms for that judgment.",
      aZH: "它真正販售的是：對嚴肅關係尋求者而言，更高信心的相容性判斷。網站、問卷、配對邏輯與引導式溝通，都只是交付這個判斷的機制。",
    },
    {
      qEN: "Is eHarmony a platform?",
      qZH: "eHarmony 算是平台嗎？",
      aEN: "It can be analyzed as a curated matching platform in a two-sided market. But for this module, the stronger analytical point is that it is a prediction-driven operating model rather than an open browse-and-search platform.",
      aZH: "它可以被分析為雙邊市場中的策展式配對平台。但對本模組而言，更強的分析重點是：它是一套預測驅動的營運模式，而不是開放式瀏覽搜尋平台。",
    },
    {
      qEN: "Where do the network effects come from?",
      qZH: "它的網路效應從哪裡來？",
      aEN: "There are traditional cross-side effects, but the more interesting effect is data-mediated: a richer serious-user pool gives the algorithm more high-quality candidates and can improve satisfaction and retention. That is an inference grounded in the case, not a direct quote from the case.",
      aZH: "它當然有傳統跨邊效應，但更有意思的是資料中介效應：越豐富且越認真的使用者池，越能讓演算法選出高品質候選並提升滿意度與留存。這是基於個案的推論，不是個案原句。",
    },
    {
      qEN: "What should Waldorf do?",
      qZH: "Waldorf 應該怎麼做？",
      aEN: "The safest recommendation is Option 1 first, but without degrading the prediction system. Defend the core serious-relationship franchise before attempting broader adjacency or geographic expansion.",
      aZH: "最穩的建議是先做選項一，但不能破壞預測系統本身。應先守住認真關係這個核心市場，再考慮外圍延伸或地理擴張。",
    },
  ],
  sections: [
    {
      id: "session-thesis",
      titleEN: "I. Session Thesis & Reading Logic",
      titleZH: "一、課堂主軸與閱讀邏輯",
      tag: "CLASS LENS",
      tagZH: "課程視角",
      icon: "compass",
      summaryEN: "Read eHarmony as a narrow prediction engine embedded into a tightly controlled operating model.",
      summaryZH: "應把 eHarmony 讀成一個嵌入嚴密營運模式中的狹義預測引擎。",
      subsections: [
        {
          label: "class-lens",
          titleEN: "Why this case belongs in Module II",
          titleZH: "為什麼這個案例屬於模組二",
          contentEN: `This session is not asking whether eHarmony uses technology in a broad, generic sense. The better question is whether the firm has built a prediction-driven operating model. In this module, prediction matters because AI and ML lower the cost of making judgments under uncertainty. eHarmony is an early, clean example: it gathers structured user data, uses an algorithm to estimate compatibility, and inserts that judgment directly into who is admitted, who gets matched, and how interaction proceeds.

The strongest class reading therefore starts with the use case, the prediction, and the operating model. Only after that should you discuss platform structure, network effects, and competitive positioning.`,
          contentZH: `這堂課真正要問的，不是 eHarmony 有沒有使用科技，而是它是否建出一套以預測為核心的營運模式。在本模組裡，預測之所以重要，是因為 AI 與 ML 讓不確定情境下的判斷成本下降。eHarmony 是一個非常早期而且很乾淨的例子：它先蒐集結構化使用者資料，再用演算法估計相容性，最後把這個判斷直接嵌進誰能加入、誰會被配對、以及互動如何展開。

因此，課堂上最強的讀法應先從 use case、prediction、operating model 開始，之後才談平台結構、網路效應與競爭定位。`,
        },
        {
          label: "class-lens",
          titleEN: "One-sentence thesis",
          titleZH: "一句話核心論點",
          contentEN: `eHarmony is best understood as a curated matching system that automates a narrow judgment problem: given two structured profiles, how likely are these two people to form a satisfying, enduring relationship?

That judgment is not left sitting inside analytics. It is embedded into the firm’s operating model through screening, matching, Guided Communication, and premium positioning.`,
          contentZH: `eHarmony 最適合被理解成一套策展式配對系統，它自動化了一個狹義判斷問題：給定兩份結構化個人檔案，這兩個人形成令人滿意且長久關係的機率有多高？

而這個判斷不是停留在分析層，而是透過篩選、配對、引導式溝通與溢價定位，被真正嵌進公司的營運模式。`,
        },
      ],
    },
    {
      id: "overview",
      titleEN: "II. Case Overview & Industry Context",
      titleZH: "二、案例概覽與產業背景",
      icon: "bookOpen",
      summaryEN: "The case takes place in October 2007, when eHarmony faces intensified rivalry from Match, Chemistry, free sites, and social networks.",
      summaryZH: "案例時間點為 2007 年 10 月，eHarmony 正面臨來自 Match、Chemistry、免費網站與社群網路的升溫競爭。",
      subsections: [
        {
          label: "fact",
          titleEN: "Case setting",
          titleZH: "案例情境",
          contentEN: `Date: October 2007. CEO Greg Waldorf and President/COO Greg Steiner leave a day-long strategy meeting and must determine how eHarmony should respond to intensifying competition.

Company snapshot:
- Founded in 1998 by Dr. Neil Clark Warren and Greg Forgatch
- Launched in August 2000 with $3 million of seed funding from Fayez Sarofim & Company
- About 230 employees, with roughly half in customer service
- More than 14 million people completed the Relationship Questionnaire in the first seven years
- The firm broke even in 2002 and became cash-flow positive the following year
- Women represented about 60% of the user base, and the 45+ segment was growing quickly
- eHarmony priced at roughly twice many competitors and maintained a premium positioning
- Technology Crossover Ventures and Sequoia Capital invested in 2004`,
          contentZH: `時間：2007 年 10 月。CEO Greg Waldorf 與總裁兼營運長 Greg Steiner 結束全天策略會議後，必須決定 eHarmony 要如何回應持續升高的競爭。

公司概況：
- 1998 年由 Dr. Neil Clark Warren 與 Greg Forgatch 創立
- 2000 年 8 月上線，種子資金為 Fayez Sarofim & Company 提供的 300 萬美元
- 約有 230 名員工，其中大約一半在客服部門
- 前七年有超過 1,400 萬人完成 Relationship Questionnaire
- 公司於 2002 年損益兩平，並在隔年轉為正現金流
- 女性約佔使用者的 60%，45 歲以上族群成長迅速
- eHarmony 定價約為許多競爭者的兩倍，維持溢價定位
- Technology Crossover Ventures 與 Sequoia Capital 於 2004 年投資`,
        },
        {
          label: "fact",
          titleEN: "Industry context",
          titleZH: "產業背景",
          contentEN: `Marriage and relationship formation were changing in the United States. Marriage rates had fallen, median marriage age had risen, cohabitation had increased, and the meaning of marriage had shifted from a functional arrangement toward a more emotionally loaded and experience-oriented ideal.

In online personals, stigma had fallen materially by the mid-2000s. Industry revenues were substantial and projected to grow further. Yet the market was fragmented: paid subscription incumbents, fast-growing free sites, and social networks all competed for attention in different ways.`,
          contentZH: `美國的婚姻與關係形成模式正在改變。結婚率下降、結婚年齡中位數上升、同居增加，而婚姻本身也從功能性安排，逐漸轉向更強調情感與體驗的理想。

到 2000 年代中期，線上交友的社會汙名已顯著下降。產業營收規模可觀，且仍被預期會繼續成長。但市場結構十分分散：付費訂閱型業者、快速成長的免費網站、以及社群網路都以不同方式競爭使用者注意力。`,
        },
        {
          label: "fact",
          titleEN: "Competitive pressure points",
          titleZH: "競爭壓力來源",
          contentEN: `The four immediate threats were:
- Match’s scale and marketing spend
- Chemistry’s attempt to attack the same serious-relationship segment with a matching logic of its own
- Free sites such as Plenty of Fish and OKCupid lowering willingness to pay
- Social networks such as MySpace and Facebook creating alternative online ways to meet people`,
          contentZH: `眼前最直接的四個威脅是：
- Match 的規模與行銷預算
- Chemistry 以自身的配對邏輯切入同一個 serious-relationship 市場
- Plenty of Fish、OKCupid 等免費網站壓低使用者的付費意願
- MySpace、Facebook 等社群網路提供另一種線上認識人的方式`,
        },
      ],
    },
    {
      id: "data",
      titleEN: "III. Full Data / Data-Source Inventory",
      titleZH: "三、完整資料與資料來源盤點",
      tag: "CLASS PREP REQUIREMENT",
      tagZH: "課堂準備要求",
      icon: "database",
      summaryEN: "This is the most important factual preparation item for class: enumerate what data eHarmony can access, not just what it says in marketing.",
      summaryZH: "這是課堂準備中最重要的事實題：要能列出 eHarmony 能接觸到哪些資料，而不只是它對外宣稱什麼。",
      subsections: [
        {
          label: "fact",
          titleEN: "A. Questionnaire and profile data",
          titleZH: "A. 問卷與個人檔案資料",
          contentEN: `The Personality Profile / Relationship Questionnaire is the core data asset. It began at 436 questions and was later pared to 258. It covered approximately 29 compatibility measures organized around personality, values, and interests.

Examples of data captured:
1. Lifestyle and routines
2. Communication style
3. Values and beliefs
4. Attitudes toward life situations
5. Family background and upbringing
6. Birth order
7. Energy level and emotional stability markers
8. Self-described intelligence and spirituality
9. Special interests and hobbies
10. Future aspirations and life goals
11. Self-descriptions such as agreeable, quarrelsome, spiritual, attractive, or liberal
12. Emotional self-assessments such as happy, fearful, fortunate, or misunderstood
13. Desired partner traits such as communication ability and energy level
14. Smoking tolerance, relocation willingness, and distance preferences
15. Demographics such as height, ethnicity, religion, number of marriages, number of children, and home region
16. Optional photo uploads`,
          contentZH: `Personality Profile / Relationship Questionnaire 是公司的核心資料資產。最初為 436 題，之後縮減為 258 題，涵蓋約 29 個相容性面向，主要圍繞 personality、values、interests 三大構面。

具體蒐集的資料包括：
1. 生活方式與日常作息
2. 溝通風格
3. 價值觀與信念
4. 對不同生活情境的態度
5. 家庭背景與成長環境
6. 出生序
7. 精力水平與情緒穩定相關指標
8. 自我描述的智力與靈性
9. 特殊興趣與嗜好
10. 未來抱負與人生目標
11. 自我描述詞，例如隨和、好爭辯、有靈性、有吸引力、自由派
12. 情緒自評，例如快樂、恐懼、幸運、被誤解
13. 希望伴侶具備的特質，例如溝通能力與精力水平
14. 對抽菸、搬遷、配對距離的偏好
15. 身高、族裔、宗教、婚姻次數、子女數、居住地區等人口資料
16. 可選擇上傳的照片`,
        },
        {
          label: "fact",
          titleEN: "B. Screening and admission data",
          titleZH: "B. 篩選與准入資料",
          contentEN: `eHarmony did not sell memberships to everyone. It screened and rejected approximately 20% of applicants, commonly because the applicant was already married, underage, or divorced too many times. This created an additional class of data: eligibility, exclusion reasons, and the boundaries of the user pool the firm believed its model could serve credibly.

This matters because the company was explicitly willing to sacrifice revenue in order to preserve fit and model credibility.`,
          contentZH: `eHarmony 並不把會員資格賣給所有人。它會篩選並拒絕約 20% 的申請者，常見原因包括申請者已婚、未成年，或離婚次數過多。這使公司額外掌握一類重要資料：資格審查、排除原因，以及公司認為其模型能夠可信服務的使用者邊界。

這一點重要，因為公司明確願意犧牲部分收入，以換取更好的適配性與模型可信度。`,
        },
        {
          label: "fact",
          titleEN: "C. Matching and interaction data",
          titleZH: "C. 配對與互動資料",
          contentEN: `Once a user entered the system, eHarmony could observe:
- Which matches were shown
- Whether a match was accepted or closed
- Which Guided Communication questions were selected
- Multiple-choice responses in early-stage interaction
- Must-haves and can’t-stands exchanged by each side
- Open-ended question responses
- Whether the pair entered Open Communication
- Whether photos were exchanged
- Whether Fast Track was used
- Communication preference information
- Where in the funnel interaction stopped`,
          contentZH: `使用者一旦進入系統，eHarmony 便能觀察：
- 系統顯示了哪些配對
- 配對是被接受還是被關閉
- 選了哪些 Guided Communication 問題
- 初期互動中的多選題回答
- 雙方交換的 must-haves 與 can’t-stands
- 開放式問題的回答
- 是否進入 Open Communication
- 是否交換照片
- 是否使用 Fast Track
- 偏好的溝通方式
- 互動在漏斗中的哪個階段停止`,
        },
        {
          label: "fact",
          titleEN: "D. Behavioral, engagement, and monetization data",
          titleZH: "D. 行為、參與與變現資料",
          contentEN: `The platform also had access to:
- Registration-start versus questionnaire-completion data
- Conversion rates from active to paying members
- Subscription choice across pricing tiers
- Renewal and re-subscription behavior
- Time-to-outcome data such as how long it took successful users to reach eventual spouses
- Gendered usage patterns such as women generating a disproportionate share of visits
- Geographic distribution of members
- Friction points involving paying users matched with non-paying users
- The relationship between match availability and re-subscription`,
          contentZH: `平台也能取得：
- 註冊開始與問卷完成之間的漏斗資料
- 活躍使用者轉為付費會員的轉換率
- 不同方案的訂閱選擇
- 續訂與再訂閱行為
- 結果時間資料，例如成功使用者平均多久遇到最終配偶
- 帶有性別差異的使用模式，例如女性帶來更多造訪量
- 會員的地理分布
- 付費會員與非付費會員配對所產生的摩擦
- 配對可得性與再訂閱之間的關係`,
        },
        {
          label: "fact",
          titleEN: "E. Research, validation, and experimental data",
          titleZH: "E. 研究、驗證與實驗資料",
          contentEN: `Research assets went well beyond platform logs:
- More than 2,000 couples surveyed before launch to build the measurement instrument
- More than 4,000 couples used for algorithm validation between 2000 and 2004
- Validation against the Dyadic Adjustment Scale as a proxy for long-term relationship success
- eHarmony Labs observation and longitudinal research after launch
- Research on physical attraction, speed dating, offline disappointment, and post-marriage transitions
- A five-year study following 400 couples through engagement, marriage, pregnancy, and childbirth`,
          contentZH: `研究資產遠不只是平台操作紀錄：
- 上線前調查超過 2,000 對伴侶，用以建立測量工具
- 2000 至 2004 年間使用超過 4,000 對伴侶驗證演算法
- 以 Dyadic Adjustment Scale 作為長期關係成功的代理指標
- 上線後的 eHarmony Labs 觀察研究與縱向研究
- 關於外貌吸引力、快速約會、線下面對面落差，以及婚後轉換的研究
- 一項為期五年、追蹤 400 對伴侶從訂婚、結婚到懷孕與生子的研究`,
        },
        {
          label: "fact",
          titleEN: "F. Marketing, acquisition, and competitive data",
          titleZH: "F. 行銷、獲客與競爭資料",
          contentEN: `eHarmony also had meaningful commercial data:
- Advertising spend by channel, with heavy use of radio and TV
- Visibility, click-through, and conversion patterns across banners and paid search
- Response differences across creative approaches such as lonely-problem framing versus happy-couple framing
- Testimonial performance from documentary-style success-story advertising
- Media buying efficiency and remnant inventory economics
- Competitor pricing, traffic, feature design, and positioning across Match, Chemistry, Yahoo! Personals, and free sites`,
          contentZH: `eHarmony 也掌握大量商業資料：
- 各管道的廣告支出，尤其大量使用廣播與電視
- 橫幅廣告與付費搜尋的曝光、點擊與轉換模式
- 不同廣告創意的反應差異，例如孤獨問題框架與幸福伴侶框架
- 紀錄片式成功故事廣告的表現
- 媒體採買效率與尾盤庫存經濟性
- Match、Chemistry、Yahoo! Personals 與免費網站的定價、流量、功能與定位資料`,
        },
        {
          label: "inference",
          titleEN: "G. Derived or model-generated data",
          titleZH: "G. 衍生或模型生成資料",
          contentEN: `The case clearly supports the existence of derived outputs, even when it does not always list them as standalone data categories. These include compatibility scores, match rankings, estimates of likely relationship success, expected pool depth for a given user, and the practical likelihood that a user will renew or churn.

These are not raw inputs. They are algorithmic products built from the underlying data asset.`,
          contentZH: `即使個案沒有把它們一一列成獨立資料類別，從內容仍可清楚推導出一批衍生輸出，例如相容性分數、配對排序、關係成功機率估計、某位使用者可得候選池深度，以及續訂或流失的可能性。

它們不是原始輸入，而是建立在底層資料資產之上的演算法產出。`,
        },
      ],
    },
    {
      id: "platform",
      titleEN: "IV. Platform, User, Use Case, and Value Logic",
      titleZH: "四、平台、使用者、Use Case 與價值邏輯",
      tag: "CLASS LENS",
      tagZH: "課程視角",
      icon: "layers",
      summaryEN: "This is where Boudreau’s framework matters most: define the user, the use case, the dimensions of value, and the alternative solutions in the market.",
      summaryZH: "這一節最需要套用 Boudreau 的框架：先定義 user、use case、dimensions of value，以及市場中的替代方案。",
      subsections: [
        {
          label: "class-lens",
          titleEN: "Who is the user?",
          titleZH: "誰是使用者？",
          contentEN: `The focal user is not “anyone dating online.” The better-defined user is a person seeking a serious, potentially marriage-oriented relationship and willing to spend time, disclose personal information, and pay for a process that promises higher-quality matching.

Important nuance: the buyer, user, and value recipient are often the same individual here. That simplifies one part of the platform analysis.`,
          contentZH: `焦點使用者不是「任何會線上交友的人」。更精準的定義是：尋找認真、可能以婚姻為導向的關係，且願意投入時間、揭露個人資訊並付費，來換取更高品質配對流程的人。

重要細節是：在這個案例中，buyer、user、value recipient 往往是同一個人，這使平台分析中的一部分相對單純。`,
        },
        {
          label: "class-lens",
          titleEN: "What is the use case?",
          titleZH: "什麼是 use case？",
          contentEN: `The use case is not generic social interaction. It is serious partner search under uncertainty, where the user wants a better chance of finding a satisfying long-term partner without suffering the congestion, superficiality, and low-trust environment common on open personals sites.`,
          contentZH: `這裡的 use case 不是一般社交互動，而是在高度不確定下尋找認真伴侶。使用者想要的是：提高找到長期適合對象的機率，同時避免開放式交友平台常見的壅塞、膚淺與低信任環境。`,
        },
        {
          label: "class-lens",
          titleEN: "Dimensions of value that matter most",
          titleZH: "最重要的價值維度",
          contentEN: `The most relevant dimensions of value are:
- Match quality and compatibility confidence
- Candidate-pool depth and variety
- Safety, seriousness, and screening credibility
- Information depth before meeting
- Emotional dignity and hopefulness of the process
- Ease and speed
- Price affordability
- Communication structure and depth
- Historical success rate`,
          contentZH: `最重要的價值維度包括：
- 配對品質與相容性信心
- 候選池深度與多樣性
- 安全性、認真程度與篩選可信度
- 見面前可取得的資訊深度
- 過程是否讓人保有尊嚴與希望感
- 使用便利與速度
- 價格可負擔性
- 溝通的結構與深度
- 歷史成功率`,
        },
        {
          label: "fact",
          titleEN: "Is eHarmony a platform?",
          titleZH: "eHarmony 算平台嗎？",
          contentEN: `It can be analyzed as a two-sided matching platform because men and women on different sides create value for one another through the mediated possibility of matching.

However, it is not an open do-it-yourself platform. Users do not browse and freely message the entire pool. The platform is curated and controlled. That is why, in this module, the stronger description is often “prediction-driven operating model” rather than simply “platform.”`,
          contentZH: `它可以被分析為雙邊配對平台，因為不同邊的男性與女性，是透過被中介的配對可能性為彼此創造價值。

但它不是開放式 DIY 平台。使用者無法自由瀏覽整個池子，也不能任意向所有人發訊息。整個平台是被策展與控制的。因此，在本模組中，常常用「預測驅動的營運模式」來描述它，比單純稱作平台更有分析力。`,
        },
        {
          label: "inference",
          titleEN: "Why DIY sites structurally struggle",
          titleZH: "為何 DIY 網站在結構上容易出問題",
          contentEN: `Open browse-and-message systems create congestion, superficial filtering, and trust problems. Women can be overwhelmed by inbound messages, users can optimize for photos or surface traits rather than long-term compatibility, and the matching problem becomes decentralized and noisy.

eHarmony sacrifices autonomy and speed in order to reduce those structural failures.`,
          contentZH: `開放式瀏覽與自由訊息系統，容易產生壅塞、膚淺篩選與信任問題。女性可能被大量訊息淹沒，使用者也可能過度依賴照片或表層條件，而不是長期相容性，結果讓配對問題變得分散且混亂。

eHarmony 犧牲了部分自主與速度，換取對這些結構性失敗的控制。`,
        },
      ],
    },
    {
      id: "network-effects",
      titleEN: "V. Network Effects and the Data Flywheel",
      titleZH: "五、網路效應與資料飛輪",
      tag: "INFERENCE + CLASS LENS",
      tagZH: "推論 + 課程視角",
      icon: "gitBranch",
      summaryEN: "The case supports cross-side effects directly; the richer data-flywheel interpretation is analytically strong but should be labeled as inference.",
      summaryZH: "個案直接支持跨邊效應，而較完整的資料飛輪說法雖然分析上很強，但應明確標示為推論。",
      subsections: [
        {
          label: "fact",
          titleEN: "Cross-side effects",
          titleZH: "跨邊效應",
          contentEN: `At a basic level, more serious users on one side create more match opportunities for users on the other side. In a matching market, that is the standard cross-side effect.

Waldorf’s shift in view is important: he no longer believed the firm faced diminishing returns to additional subscribers. Instead, a larger network still improved user satisfaction through access to more viable matches.`,
          contentZH: `在最基本層次上，一邊更多認真的使用者，會為另一邊創造更多配對機會。這是配對市場中典型的跨邊效應。

Waldorf 的觀點轉變很重要：他不再相信新增訂閱者會帶來遞減報酬。相反地，更大的網路仍能透過更多可行配對來提升使用者滿意度。`,
        },
        {
          label: "fact",
          titleEN: "Negative same-side effects in dating",
          titleZH: "交友市場中的負面同邊效應",
          contentEN: `Dating markets often suffer negative same-side effects. More users on the same side can intensify competition and congestion. Open sites are especially vulnerable because users can flood one another with low-quality outreach.

eHarmony’s controlled matching system mitigates this by rationing exposure and limiting uncontrolled interaction.`,
          contentZH: `交友市場常見負面同邊效應。同一邊更多人，可能代表更激烈的競爭與更嚴重的壅塞。開放式網站尤其脆弱，因為使用者可以以低品質方式大量接觸對方。

eHarmony 透過受控配對來緩解這個問題，限制無節制曝光與互動。`,
        },
        {
          label: "inference",
          titleEN: "Data flywheel",
          titleZH: "資料飛輪",
          contentEN: `A strong analytical inference is that eHarmony also benefits from a data-mediated flywheel:
- More serious users complete the questionnaire
- The system has a richer pool of structured candidates
- Match quality can improve because the algorithm selects from a deeper set of plausible partners
- Better outcomes improve satisfaction, credibility, and renewal
- That attracts or retains more serious users

This is not spelled out as a neat loop in the case, but it is highly consistent with the case facts and with the course’s prediction-factory lens.`,
          contentZH: `一個很強的分析推論是：eHarmony 也受益於資料中介飛輪：
- 更多認真的使用者完成問卷
- 系統擁有更豐富的結構化候選池
- 演算法可從更深的合理候選集合中做選擇，因而提升配對品質
- 更好的結果提升滿意度、可信度與續訂
- 這又吸引或留住更多認真使用者

個案沒有把它寫成完整閉環，但這種解讀與個案事實及課堂的 prediction-factory lens 高度一致。`,
        },
      ],
    },
    {
      id: "prediction",
      titleEN: "VI. Prediction Factory / Weak AI-ML Analysis",
      titleZH: "六、預測工廠／弱 AI-ML 分析",
      tag: "MODULE II CORE LENS",
      tagZH: "模組二核心視角",
      icon: "brain",
      summaryEN: "eHarmony automates a narrow, high-stakes judgment problem using structured data and statistical pattern matching rather than general intelligence.",
      summaryZH: "eHarmony 以結構化資料與統計式模式比對，自動化一個狹義但高風險的判斷問題，而不是在做一般智慧。",
      subsections: [
        {
          label: "class-lens",
          titleEN: "What exactly is being predicted?",
          titleZH: "它到底在預測什麼？",
          contentEN: `The prediction is not “love” in any general sense. The system is trying to estimate whether two specific people, given their profiles and preferences, are likely to form a satisfying, enduring relationship.

That is a narrower and more operationally useful target than generic romance.`,
          contentZH: `它預測的不是籠統的「愛情」。系統真正要估計的是：給定兩個人的個人檔案與偏好，他們是否較可能形成一段令人滿意且持久的關係。

這是一個比抽象浪漫更狹義、也更能被營運化的預測目標。`,
        },
        {
          label: "fact",
          titleEN: "How the model was built",
          titleZH: "模型如何被建立",
          contentEN: `The company built its logic around married-couple research. It surveyed couples, designed its measurement instrument, and validated the algorithm against married-couple outcomes using the Dyadic Adjustment Scale. In theoretical terms, the company believed successful relationships were strongly associated with similarity, especially on personality-related dimensions such as agreeableness and emotional stability. Personality mattered most, then values, then interests.`,
          contentZH: `公司是以已婚伴侶研究作為基礎來建構其邏輯。它先調查伴侶、設計量表，再用已婚伴侶結果透過 Dyadic Adjustment Scale 驗證演算法。理論上，公司相信成功關係通常與高度相似性有關，尤其是在性格相關維度上，例如隨和性與情緒穩定性。其優先順序是 personality，再來是 values，最後是 interests。`,
        },
        {
          label: "fact",
          titleEN: "Methodological limitation",
          titleZH: "方法論限制",
          contentEN: `The ideal research design would have followed singles through matching, dating, marriage, and long-term outcomes. eHarmony did not have that full path early on. Instead, it inferred from already-married couples and then applied those lessons to singles.

That is a pragmatic design, but it carries real survivorship and selection-bias concerns.`,
          contentZH: `理想的研究設計，是從單身者開始一路追蹤到配對、約會、結婚與長期結果。eHarmony 早期並沒有完整做到這一點，而是先從已婚伴侶回推，再把經驗套用到單身者上。

這是務實的設計，但同時也帶有明確的倖存者偏差與選擇偏差問題。`,
        },
        {
          label: "fact",
          titleEN: "What the model did not fully incorporate",
          titleZH: "模型沒有完整納入哪些東西",
          contentEN: `The model did not fully learn from downstream user rejections in a dynamic way. The case explicitly notes limitations around preference mismatches such as pets or hunting. Physical attraction also sat awkwardly in the model. Photos mattered behaviorally, but Buckwalter argued physical attraction was weak as a predictor of long-term success.`,
          contentZH: `模型沒有以高度動態的方式去學習使用者在後段互動中的拒絕訊號。個案明確提到像寵物或打獵等偏好錯配，都是系統的已知限制。外貌吸引力也和模型存在緊張關係：雖然照片在行為上明顯重要，但 Buckwalter 同時主張外貌對長期成功的預測力很弱。`,
        },
        {
          label: "inference",
          titleEN: "Why this is “weak” AI/ML",
          titleZH: "為何這屬於「弱」AI/ML",
          contentEN: `This is a classic weak-AI / weak-ML configuration. The system is narrow, domain-specific, and built on structured inputs plus statistical pattern matching. It is not autonomous reasoning, not general-purpose intelligence, and not a continuously self-updating deep learning system.

Its strength is not breadth. Its strength is disciplined scope and operational embedding.`,
          contentZH: `這是一個典型的弱 AI／弱 ML 配置。系統的範圍狹窄、問題特定，依靠的是結構化輸入加上統計式模式比對。它不是自主推理，不是通用智慧，也不是一個持續自我更新的深度學習系統。

它的強項不在廣度，而在於明確範圍與營運嵌入。`,
        },
      ],
    },
    {
      id: "operating-model",
      titleEN: "VII. Operating Model as Complementary Choices",
      titleZH: "七、作為互補選擇集合的營運模式",
      tag: "CLASS LENS",
      tagZH: "課程視角",
      icon: "layout",
      summaryEN: "The major analytical payoff is showing that eHarmony’s choices reinforce one another instead of standing alone.",
      summaryZH: "這一節的分析價值，在於證明 eHarmony 的關鍵選擇彼此強化，而不是各自孤立存在。",
      subsections: [
        {
          label: "class-lens",
          titleEN: "The complementary system",
          titleZH: "互補系統",
          contentEN: `Every major design choice serves the same strategic logic:
- Long questionnaire generates richer structured input and screens for seriousness
- Selective admission protects pool quality and model credibility
- No browsing forces reliance on the algorithm instead of superficial user sorting
- Guided Communication creates structure and depth in the interaction path
- Premium pricing signals seriousness and helps fund R&D
- Research investment improves credibility and supports model refinement

This is why the firm’s advantage is difficult to copy by imitating just one feature.`,
          contentZH: `每一項重大設計選擇，都在服務同一套策略邏輯：
- 長問卷提供更豐富的結構化輸入，同時篩選出更認真的人
- 選擇性准入保護 pool quality 與模型可信度
- 不允許瀏覽，強迫使用者依賴演算法，而非表層篩選
- Guided Communication 讓互動流程更有結構與深度
- 溢價定價傳遞認真與高品質訊號，也支撐研發投入
- 研究投資提升可信度並支持模型修正

這就是為什麼競爭者不容易只靠模仿單一功能就複製其優勢。`,
        },
        {
          label: "inference",
          titleEN: "What would break the system?",
          titleZH: "什麼會破壞這套系統？",
          contentEN: `The model weakens if the company expands pool size at the cost of seriousness, data quality, or matching discipline. It also weakens if users stop believing that the algorithm produces meaningfully better matches than open alternatives.

In other words, the firm’s moat is not “more users” in the abstract. It is a particular kind of user pool plus a particular operating discipline.`,
          contentZH: `如果公司為了擴大池子而犧牲認真程度、資料品質或配對紀律，這套模型就會弱化。另一個風險，是使用者不再相信演算法能明顯比開放式替代品做出更好的配對。

換句話說，公司的護城河不是抽象的「更多使用者」，而是特定性質的使用者池，加上一整套特定的營運紀律。`,
        },
      ],
    },
    {
      id: "strategy",
      titleEN: "VIII. Strategic Options and Recommendation Logic",
      titleZH: "八、策略選項與建議邏輯",
      icon: "target",
      summaryEN: "The best answer is not to list all four options. It is to connect each option to the prediction system it would protect, stretch, or undermine.",
      summaryZH: "最好的答法不是把四個選項照表列出，而是說明每個選項會保護、延伸，還是破壞哪一種預測系統。",
      subsections: [
        {
          label: "fact",
          titleEN: "Option 1",
          titleZH: "選項一",
          contentEN: `Defend the core serious-relationship position through faster membership growth. This is the most immediate competitive response because Chemistry was attacking eHarmony’s core value proposition directly.

The catch is that some tactics discussed under this option, such as loosening admission or shortening the questionnaire too aggressively, could damage the prediction system.`,
          contentZH: `透過更快會員成長來防守認真關係這個核心定位。由於 Chemistry 直接攻擊 eHarmony 最核心的價值主張，這是最立即的競爭回應。

但關鍵在於，這個選項底下若採取過度放寬准入或過度縮短問卷等手段，反而可能破壞預測系統本身。`,
        },
        {
          label: "fact",
          titleEN: "Option 2",
          titleZH: "選項二",
          contentEN: `Broaden toward casual or medium-term relationships. This promises a larger market, but it shifts the problem definition. Predicting medium-term compatibility is not the same as predicting long-term satisfaction in marriage-oriented relationships.`,
          contentZH: `向休閒或中期關係延伸。這雖然對應更大的市場，但它也改變了問題定義。預測中期相容性，不等於預測婚姻導向長期關係的滿意度。`,
        },
        {
          label: "fact",
          titleEN: "Option 3",
          titleZH: "選項三",
          contentEN: `Use eHarmony’s research capabilities to create life-stage sites such as weddings, fertility, parenting, and elder care. This extends the research franchise more than the matching engine itself.

Strategically, this is an adjacency move with a different monetization logic and a different operating model.`,
          contentZH: `利用 eHarmony 的研究能力，打造婚禮、生育、育兒、長照等人生階段網站。這個方向延伸的，主要是研究能力，而不是配對引擎本身。

在策略上，它屬於鄰接市場延伸，而且對應的是不同的變現方式與不同的營運模式。`,
        },
        {
          label: "fact",
          titleEN: "Option 4",
          titleZH: "選項四",
          contentEN: `Expand internationally, first in English-speaking markets and then potentially into parts of Europe. This is attractive because it could extend the matching model into new geographies.

But culturally contingent attitudes toward marriage and compatibility raise a serious transferability question. A model validated on U.S. couples may not travel cleanly.`,
          contentZH: `進行國際擴張，先進入英語系市場，再考慮歐洲部分國家。這之所以有吸引力，是因為它可以把配對模型延伸到新的地理市場。

但不同文化對婚姻與相容性的態度差異很大，這使模型可遷移性成為重大問題。以美國伴侶驗證的模型，未必能直接移植。`,
        },
        {
          label: "inference",
          titleEN: "Most defensible recommendation",
          titleZH: "最穩健的建議",
          contentEN: `The most defensible recommendation is Option 1 first, but with a strict condition: preserve the integrity of the prediction system. Defend the core serious-relationship franchise before moving into broader adjacency or international expansion.

If a second move is later available, selective international expansion is more attractive than casual-dating broadening because it preserves the same fundamental use case, even though re-validation would likely be necessary.`,
          contentZH: `最穩健的建議，是先做選項一，但必須附加一個嚴格前提：維持預測系統的完整性。也就是說，先守住認真關係這個核心市場，再去考慮鄰接延伸或國際擴張。

如果後續有第二步空間，那麼選擇性國際化通常比擴展到 casual dating 更吸引人，因為它至少保留了同一個基本 use case，雖然大概率仍需要重新驗證模型。`,
        },
      ],
    },
    {
      id: "cold-call",
      titleEN: "IX. Cold Call, Recitation, and Memory Triggers",
      titleZH: "九、冷叫、課堂發言與記憶觸發",
      icon: "messageSquare",
      summaryEN: "Use short, precise, defensible language. Start with the prediction. Then explain the operating model built around it.",
      summaryZH: "課堂發言要短、準、守得住。先講 prediction，再講圍繞它設計出的 operating model。",
      subsections: [
        {
          label: "class-lens",
          titleEN: "Best opening answer structure",
          titleZH: "最佳開場答題結構",
          contentEN: `A strong 30-second answer can follow this order:
1. Define the use case: serious relationship search
2. Define the prediction: likely long-term compatibility
3. Explain the controlled operating model: questionnaire, algorithm, Guided Communication, screening
4. State the strategic tension: scale versus model integrity`,
          contentZH: `一個強而穩的 30 秒回答，可以照這個順序：
1. 先定義 use case：尋找認真關係
2. 再定義 prediction：長期相容性的可能性
3. 接著說明受控營運模式：問卷、演算法、Guided Communication、篩選
4. 最後點出策略張力：規模對模型完整性`,
        },
        {
          label: "fact",
          titleEN: "Numbers worth memorizing",
          titleZH: "值得硬背的數字",
          contentEN: `Memorize these for class:
- 1998 founding, 2000 launch
- 436 questions originally, later 258
- 14 million+ questionnaires completed in the first seven years
- ~230 employees, about half in customer service
- ~20% applicant rejection
- 4,000+ couples in validation work
- 236 daily marriages in the 2007 Harris claim
- Pricing at roughly 2x many competitors`,
          contentZH: `這些數字值得直接背起來：
- 1998 創立，2000 上線
- 問卷最初 436 題，後來 258 題
- 前七年超過 1,400 萬人完成問卷
- 約 230 名員工，半數左右在客服
- 約 20% 申請者被拒絕
- 驗證研究超過 4,000 對伴侶
- 2007 Harris 宣稱每日 236 對成婚
- 定價約為許多競爭者的兩倍`,
        },
        {
          label: "watch-out",
          titleEN: "Common mistakes to avoid",
          titleZH: "常見失誤",
          contentEN: `Do not say:
- “It is just a dating website.”
- “Its advantage is only having more users.”
- “The algorithm alone is the moat.”
- “More scale is always better.”
- “Option 2 is easy because dating is dating.”

Instead, emphasize complementarity, fit, and the risk of degrading the core prediction system.`,
          contentZH: `不要這樣說：
- 「它就只是交友網站。」
- 「它的優勢只是人比較多。」
- 「演算法單獨就是護城河。」
- 「規模越大一定越好。」
- 「選項二很容易，因為交友都差不多。」

應改強調互補性、適配性，以及破壞核心預測系統的風險。`,
        },
      ],
    },
  ],
};

function useMedia(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\'/g, "&#039;");
}

function renderInline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code style=\"background:#F6F1E8;padding:1px 5px;border-radius:4px;font-size:.92em;\">$1</code>");
}

function MarkdownBlock({ text, color = palette.ink }) {
  if (!text) return null;

  const lines = text.split("\n");
  return (
    <div style={{ color }}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} style={{ height: 10 }} />;
        }
        if (/^-\s+/.test(trimmed)) {
          return (
            <div key={index} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ color: palette.red, lineHeight: 1.55 }}>•</span>
              <div dangerouslySetInnerHTML={{ __html: renderInline(trimmed.replace(/^-\s+/, "")) }} />
            </div>
          );
        }
        if (/^\d+\.\s+/.test(trimmed)) {
          const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
          return (
            <div key={index} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ minWidth: 18, color: palette.redDeep, fontWeight: 700, lineHeight: 1.55 }}>{match?.[1]}.</span>
              <div dangerouslySetInnerHTML={{ __html: renderInline(match?.[2] || "") }} />
            </div>
          );
        }
        return <div key={index} style={{ marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }} />;
      })}
    </div>
  );
}

function Pill({ children, tone = "default" }) {
  const toneMap = {
    default: { bg: palette.bgSoft, border: palette.border, color: palette.navy },
    red: { bg: palette.redSoft, border: "#F0C1CB", color: palette.redDeep },
    green: { bg: palette.greenSoft, border: "#C5E5D8", color: palette.green },
    amber: { bg: palette.amberSoft, border: "#E6D5A9", color: palette.amber },
    blue: { bg: palette.blueSoft, border: "#C8D8EA", color: palette.navy },
  };
  const active = toneMap[tone] || toneMap.default;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 999,
        background: active.bg,
        border: `1px solid ${active.border}`,
        color: active.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function HeatCell({ value }) {
  const map = {
    "Very High": { bg: "#DFF2EA", color: palette.green },
    High: { bg: "#EAF4EC", color: "#2D6A4F" },
    Moderate: { bg: "#F7F0DF", color: palette.amber },
    "Low–Moderate": { bg: "#F7EEDC", color: palette.amber },
    Low: { bg: "#FBE7D8", color: "#B45309" },
    "Very Low": { bg: "#FBE1E4", color: palette.redDeep },
  };
  const tone = map[value] || { bg: palette.bgSoft, color: palette.navy };
  return (
    <span style={{ display: "inline-block", minWidth: 86, textAlign: "center", padding: "6px 8px", borderRadius: 10, background: tone.bg, color: tone.color, fontWeight: 700, fontSize: 12 }}>
      {value}
    </span>
  );
}

function SectionCard({ section, lang, isOpen, toggle, children }) {
  return (
    <section id={section.id} style={{ scrollMarginTop: 110, marginBottom: 18 }}>
      <div style={{ border: `1px solid ${palette.borderStrong}`, borderRadius: 20, overflow: "hidden", background: palette.paper, boxShadow: palette.shadow }}>
        <button
          onClick={() => toggle(section.id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            border: "none",
            background: isOpen ? `linear-gradient(135deg, ${palette.redDeep} 0%, ${palette.red} 100%)` : palette.paper,
            color: isOpen ? "#fff" : palette.ink,
            padding: "18px 20px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, minWidth: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", background: isOpen ? "rgba(255,255,255,0.14)" : palette.redSoft, color: isOpen ? "#fff" : palette.redDeep, flex: "0 0 auto" }}>
              <Icon name={section.icon || "fileText"} size={20} color="currentColor" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.25 }}>
                  {lang !== "zh" && section.titleEN}
                  {lang === "both" && <div style={{ height: 2 }} />}
                  {lang !== "en" && (
                    <div style={{ fontSize: lang === "both" ? 14 : 18, opacity: lang === "both" ? 0.92 : 1, fontWeight: lang === "both" ? 700 : 800 }}>
                      {section.titleZH}
                    </div>
                  )}
                </div>
                {section.tag && <Pill tone={isOpen ? "blue" : "red"}>{lang !== "zh" ? section.tag : section.tagZH}</Pill>}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: isOpen ? "rgba(255,255,255,0.88)" : palette.sub, maxWidth: 860 }}>
                {lang !== "zh" && section.summaryEN}
                {lang === "both" && <div style={{ height: 6 }} />}
                {lang !== "en" && <div>{section.summaryZH}</div>}
              </div>
            </div>
          </div>
          <div style={{ flex: "0 0 auto", color: isOpen ? "#fff" : palette.redDeep }}>
            <Icon name={isOpen ? "chevronDown" : "chevronRight"} size={22} color="currentColor" />
          </div>
        </button>
        {isOpen && <div style={{ padding: "14px 14px 16px" }}>{children}</div>}
      </div>
    </section>
  );
}

function SubsectionCard({ sub, lang, isOpen, onToggle }) {
  const tone =
    sub.label === "fact"
      ? { pill: "green", text: "FACT", textZH: "事實" }
      : sub.label === "inference"
        ? { pill: "amber", text: "INFERENCE", textZH: "推論" }
        : sub.label === "watch-out"
          ? { pill: "red", text: "WATCH OUT", textZH: "注意" }
          : { pill: "blue", text: "CLASS LENS", textZH: "課程視角" };

  return (
    <div style={{ border: `1px solid ${palette.border}`, borderRadius: 16, overflow: "hidden", background: palette.bgSoft, marginBottom: 10 }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          border: "none",
          background: isOpen ? "#FFF8F0" : palette.bgSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "14px 16px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: palette.navy, lineHeight: 1.3 }}>
              {lang !== "zh" && sub.titleEN}
              {lang === "both" && " / "}
              {lang !== "en" && sub.titleZH}
            </div>
            <Pill tone={tone.pill}>{lang !== "zh" ? tone.text : tone.textZH}</Pill>
          </div>
        </div>
        <Icon name={isOpen ? "chevronDown" : "chevronRight"} size={18} color={palette.redDeep} />
      </button>
      {isOpen && (
        <div style={{ padding: "0 16px 16px", fontSize: 14, lineHeight: 1.68, overflowWrap: "anywhere" }}>
          {lang !== "zh" && <MarkdownBlock text={sub.contentEN} color={palette.ink} />}
          {lang === "both" && <div style={{ margin: "12px 0", borderTop: `1px dashed ${palette.borderStrong}` }} />}
          {lang !== "en" && <MarkdownBlock text={sub.contentZH} color={lang === "both" ? palette.sub : palette.ink} />}
        </div>
      )}
    </div>
  );
}

function SummaryTiles({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
      {studyData.quickStats.map((item) => (
        <div key={item.labelEN} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 16, boxShadow: palette.shadow }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: palette.redSoft, color: palette.redDeep, display: "grid", placeItems: "center", marginBottom: 10 }}>
            <Icon name={item.icon === "heart" ? "checkCircle" : item.icon} size={18} color="currentColor" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: palette.navy, lineHeight: 1 }}>{item.value}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: palette.ink, marginTop: 8 }}>{lang !== "zh" ? item.labelEN : item.labelZH}</div>
          <div style={{ fontSize: 12, color: palette.sub, marginTop: 4 }}>{lang !== "zh" ? item.noteEN : item.noteZH}</div>
        </div>
      ))}
    </div>
  );
}

function PrecisionGrid({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
      {studyData.precisionChecks.map((item) => (
        <div key={item.titleEN} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 14, boxShadow: palette.shadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: item.level === "must-fix" ? palette.redSoft : palette.amberSoft, color: item.level === "must-fix" ? palette.redDeep : palette.amber, display: "grid", placeItems: "center" }}>
              <Icon name={item.level === "must-fix" ? "alertTriangle" : "eye"} size={18} color="currentColor" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: palette.navy }}>{lang !== "zh" ? item.titleEN : item.titleZH}</div>
              <div style={{ marginTop: 4 }}>
                <Pill tone={item.level === "must-fix" ? "red" : "amber"}>{item.level === "must-fix" ? (lang !== "zh" ? "PRECISION FIX" : "精準修正") : lang !== "zh" ? "WORDING WATCH" : "措辭注意"}</Pill>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: palette.ink }}>{lang !== "zh" ? item.bodyEN : item.bodyZH}</div>
        </div>
      ))}
    </div>
  );
}

function Timeline({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
      {studyData.timeline.map((item) => (
        <div key={item.year} style={{ position: "relative", background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 16, boxShadow: palette.shadow }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: palette.redDeep }}>{item.year}</div>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: palette.redSoft, color: palette.redDeep, display: "grid", placeItems: "center" }}>
              <Icon name={item.icon} size={18} color="currentColor" />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: palette.navy, marginBottom: 6 }}>{lang !== "zh" ? item.titleEN : item.titleZH}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: palette.ink }}>{lang !== "zh" ? item.bodyEN : item.bodyZH}</div>
        </div>
      ))}
    </div>
  );
}

function StudyMap({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
      {studyData.studyMaps.map((item) => (
        <div key={item.titleEN} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 16, boxShadow: palette.shadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: palette.blueSoft, color: palette.navy, display: "grid", placeItems: "center" }}>
              <Icon name={item.icon} size={18} color="currentColor" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: palette.navy }}>{lang !== "zh" ? item.titleEN : item.titleZH}</div>
          </div>
          {(lang !== "zh" ? item.bulletsEN : item.bulletsZH).map((bullet) => (
            <div key={bullet} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ color: palette.red, lineHeight: 1.5 }}>•</span>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: palette.ink }}>{bullet}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function FlowStrip({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
      {studyData.flow.map((step, index) => (
        <div key={step.titleEN} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 16, position: "relative", boxShadow: palette.shadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: palette.redSoft, color: palette.redDeep, display: "grid", placeItems: "center" }}>
              <Icon name={step.icon} size={18} color="currentColor" />
            </div>
            <Pill tone="red">{index + 1}</Pill>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: palette.navy, marginBottom: 6 }}>{lang !== "zh" ? step.titleEN : step.titleZH}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: palette.ink }}>{lang !== "zh" ? step.bodyEN : step.bodyZH}</div>
        </div>
      ))}
    </div>
  );
}

function ValueCurveTable({ lang }) {
  return (
    <div style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 12, overflowX: "auto", boxShadow: palette.shadow }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 780 }}>
        <thead>
          <tr>
            {[
              lang !== "zh" ? "Dimension of Value" : "價值維度",
              "eHarmony",
              "Chemistry / Match",
              lang !== "zh" ? "Free Sites" : "免費網站",
              lang !== "zh" ? "Social Networks" : "社群網路",
            ].map((head, idx) => (
              <th key={head} style={{ textAlign: idx === 0 ? "left" : "center", fontSize: 12, letterSpacing: 0.2, padding: "12px 10px", color: palette.sub, borderBottom: `1px solid ${palette.border}` }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studyData.valueCurve.map((row, idx) => (
            <tr key={row.dimensionEN}>
              <td style={{ padding: "12px 10px", borderBottom: idx === studyData.valueCurve.length - 1 ? "none" : `1px solid ${palette.border}`, fontWeight: 700, color: palette.navy, fontSize: 13, verticalAlign: "top" }}>
                {lang !== "zh" ? row.dimensionEN : row.dimensionZH}
              </td>
              <td style={{ padding: "12px 10px", textAlign: "center", borderBottom: idx === studyData.valueCurve.length - 1 ? "none" : `1px solid ${palette.border}` }}><HeatCell value={row.eharmony} /></td>
              <td style={{ padding: "12px 10px", textAlign: "center", borderBottom: idx === studyData.valueCurve.length - 1 ? "none" : `1px solid ${palette.border}` }}><HeatCell value={row.chemistry} /></td>
              <td style={{ padding: "12px 10px", textAlign: "center", borderBottom: idx === studyData.valueCurve.length - 1 ? "none" : `1px solid ${palette.border}` }}><HeatCell value={row.free} /></td>
              <td style={{ padding: "12px 10px", textAlign: "center", borderBottom: idx === studyData.valueCurve.length - 1 ? "none" : `1px solid ${palette.border}` }}><HeatCell value={row.social} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OptionMatrix({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12 }}>
      {studyData.optionMatrix.map((item) => (
        <div key={item.optionEN} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 16, boxShadow: palette.shadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900, color: palette.redDeep, textTransform: "uppercase", letterSpacing: 0.3 }}>{lang !== "zh" ? item.optionEN : item.optionZH}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: palette.navy, marginTop: 4 }}>{lang !== "zh" ? item.titleEN : item.titleZH}</div>
            </div>
            <Pill tone={item.tag === "Most Defensible" ? "green" : item.tag === "Model Drift Risk" ? "red" : "amber"}>{lang !== "zh" ? item.tag : item.tag === "Most Defensible" ? "最穩健" : item.tag === "Model Drift Risk" ? "模型漂移風險" : item.tag === "Adjacency" ? "鄰接延伸" : "第二步"}</Pill>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: palette.ink, marginBottom: 12 }}>{lang !== "zh" ? item.fitEN : item.fitZH}</div>
          <div style={{ borderTop: `1px dashed ${palette.borderStrong}`, paddingTop: 10, fontSize: 12.5, lineHeight: 1.6, color: palette.sub }}>
            <strong style={{ color: palette.navy }}>{lang !== "zh" ? "Risk: " : "風險："}</strong>
            {lang !== "zh" ? item.riskEN : item.riskZH}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExhibitGrid({ lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
      {studyData.exhibits.map((item) => (
        <div key={item.num} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 14, boxShadow: palette.shadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Pill tone="blue">{lang !== "zh" ? `Exhibit ${item.num}` : `附錄 ${item.num}`}</Pill>
            <Icon name="fileText" size={18} color={palette.redDeep} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: palette.navy, marginBottom: 6 }}>{lang !== "zh" ? item.titleEN : item.titleZH}</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.6, color: palette.sub }}>{lang !== "zh" ? item.noteEN : item.noteZH}</div>
        </div>
      ))}
    </div>
  );
}

function ColdCallCards({ lang }) {
  const [openCard, setOpenCard] = useState(0);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
      {studyData.coldCalls.map((item, index) => {
        const active = openCard === index;
        return (
          <div key={item.qEN} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, overflow: "hidden", boxShadow: palette.shadow }}>
            <button onClick={() => setOpenCard(active ? -1 : index)} style={{ width: "100%", border: "none", background: active ? palette.redSoft : palette.paper, padding: 16, textAlign: "left", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: palette.navy }}>{lang !== "zh" ? item.qEN : item.qZH}</div>
                <Icon name={active ? "chevronDown" : "chevronRight"} size={18} color={palette.redDeep} />
              </div>
            </button>
            {active && <div style={{ padding: "0 16px 16px", fontSize: 13, lineHeight: 1.65, color: palette.ink }}>{lang !== "zh" ? item.aEN : item.aZH}</div>}
          </div>
        );
      })}
    </div>
  );
}

function NavRail({ sections, lang, activeId, onJump, search, setSearch, dense, setDense, filterTag, setFilterTag, expandAll, collapseAll, openSections }) {
  return (
    <aside style={{ position: "sticky", top: 92, alignSelf: "start" }}>
      <div style={{ background: palette.paper, border: `1px solid ${palette.borderStrong}`, borderRadius: 20, boxShadow: palette.shadow, overflow: "hidden" }}>
        <div style={{ padding: 16, borderBottom: `1px solid ${palette.border}` }}>
          <div style={{ fontSize: 12, color: palette.sub, fontWeight: 800, letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 8 }}>
            {lang !== "zh" ? "Study Navigator" : "學習導航"}
          </div>
          <div style={{ position: "relative" }}>
            <Icon name="search" size={16} color={palette.muted} style={{ position: "absolute", left: 10, top: 10 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang !== "zh" ? "Search titles or content" : "搜尋標題或內容"}
              style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${palette.borderStrong}`, borderRadius: 12, padding: "9px 10px 9px 34px", background: palette.bgSoft, color: palette.ink, fontSize: 13, outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {[
              { key: "all", labelEN: "All", labelZH: "全部" },
              { key: "fact", labelEN: "Facts", labelZH: "事實" },
              { key: "inference", labelEN: "Inference", labelZH: "推論" },
              { key: "class-lens", labelEN: "Class Lens", labelZH: "課程視角" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilterTag(item.key)}
                style={{ border: `1px solid ${filterTag === item.key ? palette.redDeep : palette.borderStrong}`, background: filterTag === item.key ? palette.redSoft : palette.bgSoft, color: filterTag === item.key ? palette.redDeep : palette.navy, borderRadius: 999, padding: "6px 9px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}
              >
                {lang !== "zh" ? item.labelEN : item.labelZH}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            <button onClick={expandAll} style={{ border: `1px solid ${palette.borderStrong}`, background: palette.bgSoft, color: palette.navy, borderRadius: 12, padding: "8px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{lang !== "zh" ? "Expand all" : "全部展開"}</button>
            <button onClick={collapseAll} style={{ border: `1px solid ${palette.borderStrong}`, background: palette.bgSoft, color: palette.navy, borderRadius: 12, padding: "8px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{lang !== "zh" ? "Collapse all" : "全部收合"}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${palette.border}` }}>
            <div style={{ fontSize: 12, color: palette.sub, fontWeight: 700 }}>{lang !== "zh" ? "Reading density" : "閱讀密度"}</div>
            <button onClick={() => setDense(!dense)} style={{ border: `1px solid ${palette.borderStrong}`, background: dense ? palette.redSoft : palette.bgSoft, color: dense ? palette.redDeep : palette.navy, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>{dense ? (lang !== "zh" ? "Dense" : "緊湊") : lang !== "zh" ? "Comfort" : "舒適"}</button>
          </div>
        </div>
        <div style={{ padding: 10, maxHeight: "calc(100vh - 220px)", overflow: "auto" }}>
          {sections.map((section) => {
            const active = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onJump(section.id)}
                style={{ width: "100%", border: "none", background: active ? palette.redSoft : "transparent", color: active ? palette.redDeep : palette.ink, borderRadius: 14, padding: "10px 12px", display: "flex", justifyContent: "space-between", gap: 10, textAlign: "left", cursor: "pointer", marginBottom: 4, alignItems: "center" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, lineHeight: 1.35 }}>{lang !== "zh" ? section.titleEN : section.titleZH}</div>
                </div>
                <div style={{ color: openSections.has(section.id) ? palette.green : palette.muted }}>
                  <Icon name={openSections.has(section.id) ? "checkCircle" : "chevronRight"} size={16} color="currentColor" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default function EHarmonyPrepUltra() {
  const [lang, setLang] = useState("both");
  const [dense, setDense] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const isMobile = useMedia("(max-width: 980px)");
  const [openSections, setOpenSections] = useState(new Set(studyData.sections.map((section) => section.id)));
  const [openSubs, setOpenSubs] = useState(() => {
    const next = new Set();
    studyData.sections.forEach((section) => section.subsections.forEach((_, index) => next.add(`${section.id}-${index}`)));
    return next;
  });
  const [activeId, setActiveId] = useState(studyData.sections[0].id);

  const normalizedQuery = search.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    return studyData.sections
      .map((section) => {
        const filteredSubs = section.subsections
          .map((sub, originalIndex) => ({ ...sub, originalIndex }))
          .filter((sub) => {
            const tagPass = filterTag === "all" ? true : sub.label === filterTag;
            if (!tagPass) return false;
            if (!normalizedQuery) return true;
            const haystack = [sub.titleEN, sub.titleZH, sub.contentEN, sub.contentZH, section.titleEN, section.titleZH].join(" ").toLowerCase();
            return haystack.includes(normalizedQuery);
          });
        const fallbackSubs = section.subsections
          .map((sub, originalIndex) => ({ ...sub, originalIndex }))
          .filter((sub) => (filterTag === "all" ? true : sub.label === filterTag));
        const sectionPass = filteredSubs.length > 0 || (!normalizedQuery && filterTag === "all");
        return sectionPass ? { ...section, subsections: filteredSubs.length ? filteredSubs : fallbackSubs } : null;
      })
      .filter(Boolean);
  }, [normalizedQuery, filterTag]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handler = () => {
      let current = activeId;
      studyData.sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) current = section.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [activeId]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const expandAll = () => {
    setOpenSections(new Set(studyData.sections.map((section) => section.id)));
    const next = new Set();
    studyData.sections.forEach((section) => section.subsections.forEach((_, index) => next.add(`${section.id}-${index}`)));
    setOpenSubs(next);
  };

  const collapseAll = () => {
    setOpenSections(new Set());
    setOpenSubs(new Set());
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSub = (key) => {
    setOpenSubs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const pagePadding = isMobile ? "14px 14px 28px" : "20px 22px 32px";

  return (
    <div style={{ background: palette.bg, minHeight: "100vh", color: palette.ink, fontFamily: "Inter, 'Segoe UI', 'Noto Sans TC', Arial, sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(10px)", background: "rgba(245, 239, 229, 0.88)", borderBottom: `1px solid ${palette.borderStrong}` }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, letterSpacing: 0.35, textTransform: "uppercase", fontWeight: 800, color: palette.redDeep }}>{studyData.meta.moduleEN}</div>
            <div style={{ fontSize: 12, color: palette.sub, marginTop: 2 }}>{studyData.meta.moduleZH}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {[{ key: "en", label: "EN" }, { key: "zh", label: "中文" }, { key: "both", label: "Both 雙語" }].map((item) => (
              <button
                key={item.key}
                onClick={() => setLang(item.key)}
                style={{ border: `1px solid ${lang === item.key ? palette.redDeep : palette.borderStrong}`, background: lang === item.key ? palette.redDeep : palette.paper, color: lang === item.key ? "#fff" : palette.navy, borderRadius: 999, padding: "7px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: pagePadding }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "320px minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
          {!isMobile && (
            <NavRail
              sections={filteredSections}
              lang={lang}
              activeId={activeId}
              onJump={jumpTo}
              search={search}
              setSearch={setSearch}
              dense={dense}
              setDense={setDense}
              filterTag={filterTag}
              setFilterTag={setFilterTag}
              expandAll={expandAll}
              collapseAll={collapseAll}
              openSections={openSections}
            />
          )}

          <main style={{ minWidth: 0 }}>
            <div style={{ background: `linear-gradient(135deg, ${palette.paper} 0%, #FFF7F0 70%, #FBE7EA 100%)`, border: `1px solid ${palette.borderStrong}`, borderRadius: 26, padding: isMobile ? 18 : 24, boxShadow: palette.shadow, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: palette.redSoft, border: "1px solid #F0C1CB", borderRadius: 999, padding: "7px 12px", color: palette.redDeep, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
                    <Icon name="badge" size={16} color="currentColor" />
                    Northeastern-style study interface
                  </div>
                  <h1 style={{ margin: 0, fontSize: isMobile ? 26 : 34, lineHeight: 1.12, color: palette.navy }}>{lang !== "zh" ? "eHarmony Case Master Prep" : "eHarmony 案例主題式總複習"}</h1>
                  <div style={{ marginTop: 8, fontSize: 14, color: palette.sub, maxWidth: 920 }}>
                    {lang !== "zh" ? studyData.meta.subtitleEN : studyData.meta.subtitleZH}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12.5, color: palette.muted }}>{studyData.meta.courseLine}</div>
                </div>
                <div style={{ display: "grid", gap: 8, minWidth: isMobile ? "100%" : 250 }}>
                  <div style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: palette.sub, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.25 }}>{lang !== "zh" ? "Study default" : "預設閱讀模式"}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Pill tone="green">{lang !== "zh" ? "Fact first" : "先看事實"}</Pill>
                      <Pill tone="amber">{lang !== "zh" ? "Inference tagged" : "推論標示"}</Pill>
                      <Pill tone="blue">{lang !== "zh" ? "Class lens separate" : "課程鏡頭分開"}</Pill>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 18 }}>
                {[(lang !== "zh" ? studyData.hero.takeawaysEN : studyData.hero.takeawaysZH)].flat().map((item, idx) => (
                  <div key={idx} style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 14, boxShadow: palette.shadow, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: palette.redSoft, color: palette.redDeep, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                      <Icon name={idx === 0 ? "target" : idx === 1 ? "layers" : "scale"} size={16} color="currentColor" />
                    </div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.6, color: palette.ink }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {isMobile && (
              <div style={{ marginBottom: 18 }}>
                <NavRail
                  sections={filteredSections}
                  lang={lang}
                  activeId={activeId}
                  onJump={jumpTo}
                  search={search}
                  setSearch={setSearch}
                  dense={dense}
                  setDense={setDense}
                  filterTag={filterTag}
                  setFilterTag={setFilterTag}
                  expandAll={expandAll}
                  collapseAll={collapseAll}
                  openSections={openSections}
                />
              </div>
            )}

            <div style={{ marginBottom: 18 }}>
              <SummaryTiles lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <PrecisionGrid lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <Timeline lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <StudyMap lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <FlowStrip lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <ValueCurveTable lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <OptionMatrix lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <ExhibitGrid lang={lang} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <ColdCallCards lang={lang} />
            </div>

            {filteredSections.map((section) => {
              const isOpen = openSections.has(section.id);
              return (
                <SectionCard key={section.id} section={section} lang={lang} isOpen={isOpen} toggle={toggleSection}>
                  {section.subsections.map((sub, index) => {
                    const stableIndex = typeof sub.originalIndex === "number" ? sub.originalIndex : index;
                    const key = `${section.id}-${stableIndex}`;
                    const isSubOpen = openSubs.has(key);
                    return <SubsectionCard key={key} sub={sub} lang={lang} isOpen={isSubOpen} onToggle={() => toggleSub(key)} />;
                  })}
                </SectionCard>
              );
            })}

            <div style={{ marginTop: 20, background: palette.paper, border: `1px solid ${palette.borderStrong}`, borderRadius: 20, padding: 16, boxShadow: palette.shadow }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: palette.sub, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 10 }}>{lang !== "zh" ? "Legend" : "標籤說明"}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <Pill tone="green">{lang !== "zh" ? "FACT" : "事實"}</Pill>
                <Pill tone="amber">{lang !== "zh" ? "INFERENCE" : "推論"}</Pill>
                <Pill tone="blue">{lang !== "zh" ? "CLASS LENS" : "課程視角"}</Pill>
                <Pill tone="red">{lang !== "zh" ? "WATCH OUT" : "注意"}</Pill>
              </div>
              <div style={{ fontSize: 13, lineHeight: dense ? 1.48 : 1.66, color: palette.ink }}>
                {lang !== "zh"
                  ? "Facts are grounded in the case and course materials. Inferences extend those facts analytically. Class Lens sections apply Kevin Boudreau’s platform and operating-model frameworks. This interface is designed for student study use: dense enough to prepare, structured enough to skim, and visually segmented so the reader can move from overview to detail without losing the logic of the case."
                  : "事實內容以案例與課程材料為基礎。推論則是在事實之上做出的分析延伸。Class Lens 區塊是把 Kevin Boudreau 的平台與營運模式框架套用到本案。此介面是以學生端學習為中心設計：內容密度足以備課，結構又足夠清晰，讓讀者能從總覽一路滑到細節而不失去案例主線。"}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
