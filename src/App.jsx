import { useState } from "react";

const data = {
  sections: [
    {
      id: "overview",
      titleEN: "I. Case Overview & Context",
      titleZH: "一、案例概覽與背景",
      subsections: [
        {
          titleEN: "Case Setting",
          titleZH: "案例情境",
          contentEN: `**Date:** October 2007. CEO Greg Waldorf and President/COO Greg Steiner driving on I-10 Freeway after a day-long strategy meeting.

**Core Decision:** Which of four strategic options to pursue in response to intensifying competition from Match (Chemistry), Yahoo! Personals, free sites (Plenty of Fish, OKCupid), and social networks (MySpace, Facebook).

**Company Snapshot (2007):**
- Founded 1998 by Dr. Neil Clark Warren (clinical psychologist, 35 yrs experience) and son-in-law Greg Forgatch
- Launched August 2000 with $3M seed from Fayez Sarofim & Company (Houston)
- ~230 employees, approximately half in customer service
- 14+ million people completed the Relationship Questionnaire in first 7 years
- 236 eHarmony members married every day in the US (2007 Harris study) = 2% of all US marriages
- 60% of users were women; people 45+ were fastest-growing segment
- Charged roughly 2x competitors; premium pricing strategy
- Profitable; cash-flow positive since 2002
- Technology Crossover Ventures and Sequoia Capital invested (2004)`,
          contentZH: `**時間：** 2007年10月。CEO Greg Waldorf 與總裁兼營運長 Greg Steiner 在 I-10 高速公路上，剛結束全天策略會議。

**核心決策：** 面對 Match（Chemistry）、Yahoo! Personals、免費網站（Plenty of Fish、OKCupid）及社群網路（MySpace、Facebook）的激烈競爭，應選擇四個策略選項中的哪一個。

**公司概況（2007年）：**
- 1998年由 Dr. Neil Clark Warren（臨床心理學家，35年執業經驗）與女婿 Greg Forgatch 創立
- 2000年8月上線，種子資金300萬美元來自休士頓 Fayez Sarofim & Company
- 約230名員工，約半數從事客服
- 創立前七年，超過1,400萬人完成「關係問卷」
- 2007年 Harris 研究：平均每天236名 eHarmony 會員在美國結婚 = 全美婚姻的2%
- 60%使用者為女性；45歲以上為成長最快族群
- 收費約為競爭對手的兩倍；採取溢價定價策略
- 公司獲利中；自2002年起現金流為正
- Technology Crossover Ventures 與紅杉資本（Sequoia Capital）於2004年投資`
        },
        {
          titleEN: "Industry Context (Marriage & Personals Markets)",
          titleZH: "產業背景（婚姻與交友市場）",
          contentEN: `**Marriage Market Trends:**
- Only 16% of US singles (~7% of adult population) actively looking for a partner
- Marriage rate at historical low; median age rising (27 men / 26 women by 2004, vs. 26/22 in 1890)
- Divorce peaked in 1981, declining since; 45% of marriages end in divorce, most in 4th year
- Cohabitation rates rose from 2.9% to 4.7% (1995-2005)
- Marriage shifted from "functional partnership" to seeking "love, sexual passion, or even close friendship" — spouses became more like "experience goods" than "search goods"

**Online Personals Industry:**
- First online personals: 1992; initial stigma very high
- By 2005: 16 million people had visited a site at least once
- Industry revenue ~$900M in 2007; expected to double by 2012
- 37% of people looking for relationships had internet access but hadn't visited a personals site (growth room)
- Repeat customer tendency: once subscribed, people tended to re-subscribe
- Of 2.2 million marriages/year, reportedly 120,000 occurred between people who met on personals sites; insiders claimed nearly 1/5 of marriages were initiated online
- 45% of personals users never married; 31% divorced/separated/widowed; 23% married
- 40% entered long-term relationships via online personals
- 40-50 year olds: fastest-growing online dating demographic`,
          contentZH: `**婚姻市場趨勢：**
- 僅16%的美國單身者（約成年人口的7%）正在積極尋找伴侶
- 結婚率處於歷史最低點；結婚年齡中位數上升（2004年男性27歲／女性26歲，1890年為男性26歲／女性22歲）
- 離婚率於1981年達到高峰後持續下降；45%的婚姻以離婚收場，多數在第四年
- 同居比率從2.9%升至4.7%（1995-2005年）
- 婚姻已從「功能性合夥」轉向追求「愛情、性吸引力、甚至親密友誼」——配偶從「搜尋財」變得更像「經驗財」

**線上交友產業：**
- 第一個線上交友網站：1992年；初期社會汙名極高
- 至2005年：1,600萬人至少造訪過一次
- 2007年產業營收約9億美元；預計2012年翻倍
- 37%尋找伴侶者有網路但尚未造訪交友網站（成長空間）
- 回購傾向：一旦訂閱，使用者傾向續訂
- 每年220萬樁婚姻中，據報12萬樁發生在透過交友網站認識的人之間；業內人士認為近五分之一的婚姻始於線上
- 交友網站使用者：45%未婚；31%離婚／分居／喪偶；23%已婚
- 40%透過線上交友進入長期關係
- 40-50歲：線上交友成長最快的族群`
        }
      ]
    },
    {
      id: "data",
      titleEN: "II. COMPLETE INVENTORY: Every Data / Data Source eHarmony Has Access To",
      titleZH: "二、完整盤點：eHarmony 可取得的所有資料與資料來源",
      tag: "CLASS PREP REQUIREMENT",
      tagZH: "課堂準備要求",
      subsections: [
        {
          titleEN: "A. Personality Profile / Relationship Questionnaire Data",
          titleZH: "A. 個性檔案／關係問卷資料",
          contentEN: `**The core data asset.** Initially 436 questions, pared to 258 (later abbreviated to ~250). Covers 29 basic measures of compatibility across three primary constructs: personality, values, and interests.

Specific data fields collected:
1. **Personal lifestyle preferences** — daily habits, routines
2. **Communication style** — how individuals express themselves
3. **Values** — moral, ethical, and life-priority frameworks
4. **Beliefs** — religious, spiritual, philosophical orientations
5. **Attitudes** — disposition toward various life situations
6. **Personality background** — family background, upbringing
7. **Birth order** — position among siblings
8. **Energy level** — activity and vitality self-assessment
9. **Intelligence** — self-reported cognitive engagement
10. **Spirituality** — depth and nature of spiritual life
11. **Special interests** — hobbies, passions, pursuits
12. **Future aspirations** — life goals and plans
13. **Self-descriptions** — traits like "agreeable," "spiritual," "cold," "quarrelsome," "attractive," "liberal"
14. **Information-seeking behavior** — social occasions preferences
15. **Emotional self-assessment** — feelings like "Happy," "Fearful about future," "Misunderstood," "Fortunate"
16. **Partner preference characteristics** — energy level, communication ability
17. **Personality traits** — via multiple-choice and scale-rated items
18. **Personal interests inventory** — "board games," "church involvement," "movies," "shopping"
19. **Living skills self-assessment** — practical life capabilities
20. **Matching preferences** — smoking tolerance, relocation willingness, ideal match distance
21. **Height, ethnicity, religion, number of marriages, number of children, home region**
22. **Photos** — optional upload; 80% of paying subscribers had photos posted`,
          contentZH: `**核心資料資產。** 最初436題，精簡為258題（後縮短至約250題）。涵蓋29項基本相容性指標，橫跨三大主要構面：性格、價值觀與興趣。

具體蒐集的資料欄位：
1. **個人生活方式偏好** — 日常習慣、作息
2. **溝通風格** — 個人表達方式
3. **價值觀** — 道德、倫理與人生優先順序框架
4. **信仰** — 宗教、靈性、哲學取向
5. **態度** — 面對各種生活情境的傾向
6. **個性背景** — 家庭背景、成長環境
7. **排行** — 在兄弟姊妹中的位置
8. **精力水平** — 活動力與活力自我評估
9. **智力** — 自我報告的認知參與程度
10. **靈性** — 精神生活的深度與性質
11. **特殊興趣** — 嗜好、熱情、追求
12. **未來抱負** — 人生目標與計畫
13. **自我描述** — 如「隨和」、「具靈性」、「冷淡」、「好爭辯」、「有吸引力」、「自由派」
14. **資訊尋求行為** — 社交場合偏好
15. **情緒自我評估** — 如「快樂」、「對未來恐懼」、「被誤解」、「幸運」
16. **伴侶偏好特質** — 精力水平、溝通能力
17. **人格特質** — 透過多選題與量表評分
18. **個人興趣清單** — 「桌遊」、「教會參與」、「電影」、「購物」
19. **生活技能自評** — 實際生活能力
20. **配對偏好** — 吸菸容忍度、搬遷意願、理想配對距離
21. **身高、種族、宗教、婚姻次數、子女數、居住地區**
22. **照片** — 選擇性上傳；80%的付費會員已上傳照片`
        },
        {
          titleEN: "B. Matching Algorithm & Outcome Data",
          titleZH: "B. 配對演算法與結果資料",
          contentEN: `1. **Algorithm validation dataset** — 4,000+ couples studied between 2000-2004; algorithm tested against Dyadic Adjustment Scale (long-term relationship happiness measure)
2. **Match acceptance/rejection data** — whether each party chose to pursue or "close" a match
3. **Match quality signals** — subscription driven by how much users like their matches; re-subscription rates correlated with number of hypothetical pairings available
4. **Screening/rejection data** — the company declined to sell memberships to ~20% of applicants (already married, underage, divorced 3+ times); estimated $10M/year in foregone revenue; over 1 million total people rejected since inception
5. **Patent on matching system** — secured May 2004
6. **Couples research data** — studies of married couples to validate that algorithm-predicted matches were happier than couples who met elsewhere`,
          contentZH: `1. **演算法驗證資料集** — 2000至2004年間研究4,000對以上伴侶；以「雙方適應量表」（衡量長期關係幸福感）測試演算法
2. **配對接受／拒絕資料** — 雙方是否選擇追求或「關閉」配對
3. **配對品質訊號** — 訂閱受使用者對配對滿意度驅動；續訂率與可用假設配對數量相關
4. **篩選／拒絕資料** — 公司拒絕向約20%的申請者銷售會籍（已婚、未成年、離婚三次以上）；估計每年放棄1,000萬美元收入；創立以來累計拒絕超過100萬人
5. **配對系統專利** — 2004年5月取得
6. **伴侶研究資料** — 對已婚伴侶的研究，驗證演算法預測的配對比透過其他方式認識的伴侶更幸福`
        },
        {
          titleEN: "C. Guided Communication Behavioral Data",
          titleZH: "C. 引導式溝通行為資料",
          contentEN: `1. **Stage 1 — Easy-to-answer questions:** Each member chose 5 questions from eHarmony's list and sent to match (e.g., "If you were taken by your date to a party where you knew no one, how would you respond?") with multiple-choice answers
2. **Stage 2 — "Must haves" and "Can't stands":** Personal list exchanges revealing dealbreakers and non-negotiables
3. **Stage 3 — Open-ended questions:** Three deep questions exchanged (e.g., "What person in your life has been most inspirational, and why?")
4. **Open Communication data:** Email exchanges, photo sharing, meeting arrangement discussions
5. **Fast Track usage data** — 10% of members used Fast Track (bypassing Guided Communication); tripled after letting users state preferred communication method; men requested it more
6. **Match closure data** — 20-30% of matches ended up in Open Communication; either party could "close" at any point
7. **Message read-receipt data** — eHarmony was considering adding read-receipt feature to address paying subscribers' frustration with non-responsive matches`,
          contentZH: `1. **第一階段 — 簡易回答問題：** 每位會員從 eHarmony 提供的清單中選擇5個問題發送給配對對象（如「假如約會對象帶你參加一個你不認識任何人的聚會，你會如何回應？」），附多選答案
2. **第二階段 — 「必備條件」與「無法忍受」：** 交換個人清單，揭示底線與不可妥協事項
3. **第三階段 — 開放式問題：** 交換三個深度問題（如「你生命中最具啟發性的人是誰？為什麼？」）
4. **開放溝通資料：** 電子郵件交流、照片分享、見面安排討論
5. **快速通道使用資料** — 10%的會員使用快速通道（跳過引導式溝通）；允許使用者選擇偏好的溝通方式後增加三倍；男性較常請求
6. **配對關閉資料** — 20-30%的配對最終進入開放溝通；任一方可隨時「關閉」
7. **訊息已讀回執資料** — eHarmony 正考慮新增已讀回執功能，以解決付費會員對未回應配對的不滿`
        },
        {
          titleEN: "D. User Behavioral & Engagement Data",
          titleZH: "D. 使用者行為與參與度資料",
          contentEN: `1. **Registration vs. completion funnel data** — men less likely to complete questionnaire once started
2. **Conversion rates** — eHarmony converted active-to-paying members 3x industry average
3. **Subscription/renewal patterns** — pricing tiers from 1-month to 12-month; re-subscription rates as function of match availability
4. **Paying vs. non-paying member interaction data** — non-paying members could still be matched and initiate interactions, creating conversion opportunities but also friction
5. **Time-to-marriage data** — successful subscriber took 4-6 months on average to be matched with eventual spouse
6. **Geographic distribution data** — members distributed well across US with slight skew toward less populous areas
7. **Demographic data** — age, gender ratios (60% women), visit patterns (women generated 2/3 of visits)
8. **Member satisfaction data** — Harris Interactive study (Aug 2004-Aug 2005): 90 members married daily; follow-up (2007): 236 daily`,
          contentZH: `1. **註冊與完成漏斗資料** — 男性一旦開始填寫問卷，完成的可能性較低
2. **轉換率** — eHarmony 將活躍會員轉為付費會員的比率為業界平均的三倍
3. **訂閱／續訂模式** — 定價從1個月到12個月不等；續訂率為配對可用數量的函數
4. **付費與非付費會員互動資料** — 非付費會員仍可被配對並發起互動，創造轉換機會但也產生摩擦
5. **成婚時間資料** — 成功的訂閱者平均需要4-6個月才能與最終配偶配對
6. **地理分佈資料** — 會員在全美分佈良好，略偏向人口較少地區
7. **人口統計資料** — 年齡、性別比（60%女性）、造訪模式（女性產生三分之二的造訪量）
8. **會員滿意度資料** — Harris Interactive 研究（2004年8月-2005年8月）：每天90位會員結婚；後續追蹤（2007年）：每天236位`
        },
        {
          titleEN: "E. Marketing & Acquisition Data",
          titleZH: "E. 行銷與獲客資料",
          contentEN: `1. **Advertising spend data** — up to $80M/year; 3/4 on TV and radio, remainder on paid internet search and banner ads
2. **Channel performance data** — banner ads: high visibility, decent click-through, low conversion; paid search: more expensive per acquisition
3. **Campaign A/B test data** — tested "problem-first" ads (lonely individuals) vs. "benefit-first" ads (happy couples); problem-first increased anxiety and reduced response rates
4. **Testimonial/success story data** — featured real couples in documentary-style ads
5. **Media buying efficiency data** — worked with direct-response-focused agencies; bought remnant inventory at discount; avoided broadcast TV (expensive); used national cable only
6. **Customer acquisition cost data** — profitability depended on efficient acquisition; Match's spend increase from $80M to $145M tracked against eHarmony's percentage of sales`,
          contentZH: `1. **廣告支出資料** — 每年高達8,000萬美元；四分之三用於電視和廣播，其餘用於付費網路搜尋和橫幅廣告
2. **管道績效資料** — 橫幅廣告：高曝光、尚可點擊率、低轉換率；付費搜尋：每次獲客成本更高
3. **廣告 A/B 測試資料** — 測試「問題先行」廣告（孤獨個體）vs.「效益先行」廣告（幸福伴侶）；問題先行增加焦慮、降低回應率
4. **見證／成功故事資料** — 以真實伴侶拍攝紀錄片風格廣告
5. **媒體購買效率資料** — 與專注直效行銷的代理商合作；購買尾盤庫存以取得折扣；避免無線電視（昂貴）；僅使用全國有線電視
6. **客戶獲取成本資料** — 獲利能力取決於獲客效率；Match 廣告支出從8,000萬增至1.45億美元，與 eHarmony 的銷售百分比追蹤比較`
        },
        {
          titleEN: "F. R&D and Labs Data",
          titleZH: "F. 研發與實驗室資料",
          contentEN: `1. **eHarmony Labs data (opened 2007)** — 5 research scientists; 2,000 sq ft clinical space with observation rooms; studying biological, sociological, and neurological underpinnings of love
2. **Physical attraction research** — Buckwalter: "physical attraction plays a large role in the initial meeting but is a very poor predictor of long-term success"
3. **Five-year longitudinal study** — 400 couples tracked through engagement, marriage, pregnancy, childbirth; early finding: "the biggest adjustment of every marriage is the birth of the first child"
4. **Speed-dating and offline meeting research** — researchers found online daters "ended up going out with fewer than 1% of the people whose profiles they studied" and dates often resulted in "huge letdowns"
5. **Married couples compatibility research** — 2,000 couples surveyed before website launch to develop the instrument; algorithm predicted top-quartile Dyadic Adjustment Scale scores`,
          contentZH: `1. **eHarmony Labs 資料（2007年成立）** — 5位研究科學家；2,000平方呎臨床空間含觀察室；研究愛情的生物學、社會學與神經學基礎
2. **外貌吸引力研究** — Buckwalter：「外貌吸引力在初次見面時扮演重要角色，但對預測長期成功極為薄弱」
3. **五年縱貫研究** — 追蹤400對伴侶的訂婚、結婚、懷孕、生子過程；初步發現：「每段婚姻最大的調適是第一個孩子的出生」
4. **快速約會與線下見面研究** — 研究者發現線上約會者「最終只與他們查看過的個人檔案中不到1%的人約會」，且約會經常帶來「巨大的失望」
5. **已婚伴侶相容性研究** — 網站上線前調查2,000對伴侶以開發測量工具；演算法預測了「雙方適應量表」前四分之一的分數`
        },
        {
          titleEN: "G. Competitive Intelligence & Market Data",
          titleZH: "G. 競爭情報與市場資料",
          contentEN: `1. **Competitor pricing data** — detailed tracking across Match, Chemistry, Yahoo! Personals (Exhibits 9, 10)
2. **Market share and traffic data** — Match: 1.3M paying customers; Chemistry: 2M registered; Yahoo! Personals: 7M unique visitors (5% of dating visits); Plenty of Fish: half eHarmony visitors but 20% more visits
3. **Industry revenue benchmarks** — $900M total industry (2007); Match revenues ~$349M projected; average revenue/customer for Yahoo! Personals: $16/month
4. **Competitor feature comparison data** — Chemistry's personality test (fewer questions, different methodology: interpersonal chemistry vs. psychosocial compatibility), Match's Dr. Phil campaign results
5. **Social network threat data** — Jupiter Research saw "no signs that the eruption of social networks has burned the paid online personals market"; only ~5% of people meeting online met through social network sites`,
          contentZH: `1. **競爭對手定價資料** — 詳細追蹤 Match、Chemistry、Yahoo! Personals 的定價（見附錄9、10）
2. **市場佔有率與流量資料** — Match：130萬付費客戶；Chemistry：200萬註冊用戶；Yahoo! Personals：700萬不重複訪客（交友網站造訪量的5%）；Plenty of Fish：訪客數為 eHarmony 的一半，但造訪次數多20%
3. **產業營收基準** — 2007年全產業共9億美元；Match 預估營收約3.49億美元；Yahoo! Personals 每位客戶平均月營收16美元
4. **競爭對手功能比較資料** — Chemistry 的個性測試（題目較少、方法論不同：人際化學 vs. 心理社會相容性）、Match 的 Dr. Phil 行銷活動成效
5. **社群網路威脅資料** — Jupiter Research 認為「沒有跡象顯示社群網路的爆發已燒毀付費線上交友市場」；僅約5%的線上認識者是透過社群網站`
        },
        {
          titleEN: "H. Operational & Financial Data",
          titleZH: "H. 營運與財務資料",
          contentEN: `1. **Subscription tier revenue data** — 1-month ($59.95), 3-month ($39.95/mo), 6-month ($29.95/mo), 12-month ($19.95/mo) as of 2008
2. **Customer lifetime value data** — implicit in re-subscription modeling based on match quality
3. **Rejection cost tracking** — $10M/year estimated foregone revenue from screening out applicants
4. **Employee allocation data** — ~115 of 230 employees in customer service
5. **Harris Interactive commissioned studies** — externally validated marriage outcome data`,
          contentZH: `1. **訂閱方案營收資料** — 1個月（$59.95）、3個月（$39.95/月）、6個月（$29.95/月）、12個月（$19.95/月），截至2008年
2. **客戶終身價值資料** — 隱含於基於配對品質的續訂模型中
3. **拒絕成本追蹤** — 篩選申請者導致的預估放棄收入為每年1,000萬美元
4. **員工配置資料** — 230名員工中約115名從事客服
5. **Harris Interactive 委託研究** — 外部驗證的婚姻結果資料`
        }
      ]
    },
    {
      id: "platform",
      titleEN: "III. Platform & Operating Model Analysis (Course Framework Lens)",
      titleZH: "三、平台與營運模式分析（課程框架視角）",
      subsections: [
        {
          titleEN: "A. Is eHarmony a Platform? Multi-Sided Market Analysis",
          titleZH: "A. eHarmony 是平台嗎？多邊市場分析",
          contentEN: `**[CLASS LENS]** eHarmony operates as a **matching platform** in a two-sided market: men seeking women and women seeking men (heterosexual matching). However, its operating model is fundamentally different from typical "Do-It-Yourself" dating platforms.

**Sides of the Platform:**
- **Side 1: Female users** (60% of user base; generate 2/3 of visits)
- **Side 2: Male users** (40% of user base; less likely to complete questionnaire; more likely to request Fast Track)
- **Potential Side 3 (not pursued):** Same-sex users (excluded citing limited resources and small market size)
- **Potential Side 4 (Option 3):** Advertisers (if free life-stage sites launched)

**Critical distinction from open platforms:** eHarmony is not a browsing/search platform. It is a **curated matching platform** where the algorithm, not the user, determines who sees whom. Users cannot browse profiles independently. This is a fundamentally different operating model from Match, Yahoo! Personals, or any DIY site.

**[INFERENCE]** This positions eHarmony closer to a "prediction factory" model than a pure platform-mediation model. The platform's core value proposition IS the prediction — the algorithm's judgment about compatibility.`,
          contentZH: `**[課程視角]** eHarmony 作為一個**配對平台**運作於雙邊市場中：尋找女性的男性與尋找男性的女性（異性配對）。然而，其營運模式與典型的「自助式」交友平台有本質上的不同。

**平台各邊：**
- **第一邊：女性使用者**（佔使用者基礎的60%；產生三分之二的造訪量）
- **第二邊：男性使用者**（佔使用者基礎的40%；完成問卷的可能性較低；較常要求快速通道）
- **潛在第三邊（未推行）：** 同性使用者（以資源有限及市場規模小為由排除）
- **潛在第四邊（選項三）：** 廣告主（若推出免費人生階段網站）

**與開放平台的關鍵區別：** eHarmony 不是瀏覽／搜尋平台。它是一個**策展式配對平台**，由演算法而非使用者決定誰能看到誰。使用者無法獨立瀏覽個人檔案。這與 Match、Yahoo! Personals 或任何自助式網站的營運模式截然不同。

**[推論]** 這使 eHarmony 更接近「預測工廠」模式，而非純粹的平台中介模式。平台的核心價值主張正是預測本身——演算法對相容性的判斷。`
        },
        {
          titleEN: "B. Network Effects Analysis",
          titleZH: "B. 網路效應分析",
          contentEN: `**Cross-side (indirect) network effects:**
- More women → more potential matches for men → more value for men (and vice versa)
- BUT eHarmony's model complicates this: Waldorf noted, "Two years ago, I believed that we had diminishing returns to subscribers in the network. I no longer believe this at all. There is still a massive user satisfaction effect to having more users."
- The mechanism: more users → more potential high-quality matches for the algorithm to select from → better match quality → higher satisfaction → higher re-subscription

**Same-side (direct) network effects:**
- Traditionally NEGATIVE in dating: more men competing for the same women = worse for each individual man (congestion). DIY sites suffered heavily from this — women were "inundated by messages from men"
- eHarmony's algorithm MITIGATES negative same-side effects by controlling who matches with whom, preventing the "inundation" problem

**Data Network Effects (key for "Prediction Factory" lens):**
- [INFERENCE] More users completing the questionnaire → richer dataset → better algorithm calibration → better predictions → higher match quality → more satisfied users → more users. This is the critical data flywheel.
- The 4,000-couple validation study and ongoing Labs research continuously feed back into algorithm improvement.

**Network effects are DESIGNED, not inherent:**
- The questionnaire screens out low-quality participants (self-selection + company rejection)
- Guided Communication forces depth of interaction
- Algorithm controls matching, preventing the congestion/superficiality problems of open platforms`,
          contentZH: `**跨邊（間接）網路效應：**
- 更多女性 → 更多潛在配對給男性 → 對男性更有價值（反之亦然）
- 但 eHarmony 的模式使此更為複雜：Waldorf 指出，「兩年前，我相信我們在網路中的訂閱者存在遞減報酬。我現在完全不這麼認為了。更多使用者帶來的使用者滿意度效應仍然是巨大的。」
- 機制：更多使用者 → 演算法有更多高品質配對候選 → 更好的配對品質 → 更高滿意度 → 更高續訂率

**同邊（直接）網路效應：**
- 在交友領域傳統上為負面：更多男性競爭同樣的女性 = 對每位男性更差（壅塞）。自助式網站深受其害——女性被「男性的訊息淹沒」
- eHarmony 的演算法透過控制誰與誰配對來**緩解負面同邊效應**，防止「訊息轟炸」問題

**資料網路效應（「預測工廠」視角的關鍵）：**
- [推論] 更多使用者完成問卷 → 更豐富的資料集 → 更好的演算法校準 → 更好的預測 → 更高的配對品質 → 更多滿意使用者 → 更多使用者。這是關鍵的資料飛輪。
- 4,000對伴侶的驗證研究與持續進行的 Labs 研究不斷回饋至演算法的改進。

**網路效應是被設計的，而非天生的：**
- 問卷篩選掉低品質參與者（自我篩選 + 公司拒絕）
- 引導式溝通強制互動深度
- 演算法控制配對，防止開放平台的壅塞／膚淺問題`
        },
        {
          titleEN: "C. Dimensions of Value (DoV) for Users Seeking Serious Relationships",
          titleZH: "C. 尋求認真關係使用者的價值維度（DoV）",
          contentEN: `**Key Dimensions of Value in the dating/matching market:**

1. **Match quality / compatibility accuracy** — How likely is a match to lead to a satisfying long-term relationship?
2. **Pool size / variety of potential matches** — How many eligible partners are available?
3. **Safety & trust / screening quality** — How confident can users be that profiles are genuine and members are serious?
4. **Privacy / stigma reduction** — Can users participate without social embarrassment?
5. **Depth of information about matches** — How much do you learn about a person before deciding?
6. **Ease of use / time efficiency** — How quickly and easily can users engage?
7. **Price / affordability** — Total cost of participation
8. **Communication quality** — Does the platform facilitate meaningful conversation?
9. **Success rate** — Track record of producing marriages/long-term relationships
10. **Emotional experience** — Does the process feel respectful, hopeful, and dignified?`,
          contentZH: `**交友／配對市場的關鍵價值維度：**

1. **配對品質／相容性準確度** — 配對導致令人滿意的長期關係的可能性有多高？
2. **候選池大小／潛在配對的多樣性** — 有多少符合條件的伴侶可供選擇？
3. **安全與信任／篩選品質** — 使用者對個人檔案真實性及會員認真程度有多大信心？
4. **隱私／降低社會汙名** — 使用者能否在不尷尬的情況下參與？
5. **配對資訊深度** — 在做決定前能了解一個人多少？
6. **易用性／時間效率** — 使用者參與的速度和便利性如何？
7. **價格／可負擔性** — 參與的總成本
8. **溝通品質** — 平台是否促進有意義的對話？
9. **成功率** — 促成婚姻／長期關係的歷史記錄
10. **情感體驗** — 過程是否讓人感到被尊重、充滿希望且有尊嚴？`
        },
        {
          titleEN: "D. Value Curve Comparison: eHarmony vs. Competitors",
          titleZH: "D. 價值曲線比較：eHarmony vs. 競爭對手",
          contentEN: `**eHarmony's Value Curve (HIGH on):**
- Match quality/compatibility: VERY HIGH (patented algorithm, 29 dimensions, validated against outcomes)
- Safety/trust/screening: VERY HIGH (rejects 20% of applicants, extensive questionnaire as barrier)
- Depth of information: HIGH (Guided Communication forces deep exchanges)
- Communication quality: HIGH (structured process prevents superficial exchanges)
- Success rate: VERY HIGH (2% of all US marriages; 236/day)
- Emotional experience: HIGH (dignified, relationship-focused branding)

**eHarmony's Value Curve (LOW on):**
- Pool size/variety: MODERATE-LOW (screens out many; no same-sex; no casual daters)
- Ease of use/time efficiency: LOW (1.5-2 hours for questionnaire; slow Guided Communication process)
- Price/affordability: LOW (roughly 2x competitors)
- User control/autonomy: VERY LOW (cannot browse; algorithm decides matches)

**Match/Chemistry Value Curve:**
- Pool size: HIGH (1.2M paying at Match; less selective screening)
- Price: MODERATE (roughly 10% below eHarmony for Chemistry)
- Ease of use: HIGH (browse freely; Chemistry questionnaire shorter)
- Match quality: MODERATE (Chemistry's algorithm less validated)
- Safety/trust: LOW-MODERATE (minimal screening)

**Free Sites (Plenty of Fish) Value Curve:**
- Price: VERY HIGH (free)
- Pool size: VERY HIGH (minimal barriers)
- Ease/speed: HIGH (immediate access)
- Match quality: VERY LOW (no algorithm; self-service browsing)
- Safety/trust: LOW (no screening; misrepresentation rampant)

**Social Networks Value Curve:**
- Price: VERY HIGH (free)
- Trust/authenticity: HIGH (real identities, friend connections verify)
- Pool size: VERY HIGH
- Match quality: LOW (no matching purpose; no compatibility data)
- Privacy for dating: LOW (40%+ didn't indicate marital status; public activity visible)
- Useful for 40-50+ age group: LOW (social networks used less by this demographic)`,
          contentZH: `**eHarmony 的價值曲線（高分項）：**
- 配對品質／相容性：極高（專利演算法、29項維度、以結果驗證）
- 安全／信任／篩選：極高（拒絕20%申請者、大量問卷作為門檻）
- 資訊深度：高（引導式溝通強制深度交流）
- 溝通品質：高（結構化流程防止膚淺交流）
- 成功率：極高（全美婚姻的2%；每天236對）
- 情感體驗：高（有尊嚴、以關係為核心的品牌形象）

**eHarmony 的價值曲線（低分項）：**
- 候選池大小／多樣性：中低（篩選掉許多人；無同性配對；無隨意約會者）
- 易用性／時間效率：低（問卷需1.5-2小時；引導式溝通過程緩慢）
- 價格／可負擔性：低（約為競爭對手的兩倍）
- 使用者控制／自主性：極低（無法瀏覽；演算法決定配對）

**Match／Chemistry 的價值曲線：**
- 候選池：高（Match 有120萬付費會員；篩選較不嚴格）
- 價格：中等（Chemistry 約低 eHarmony 10%）
- 易用性：高（自由瀏覽；Chemistry 問卷較短）
- 配對品質：中等（Chemistry 的演算法驗證較不充分）
- 安全／信任：中低（篩選極少）

**免費網站（Plenty of Fish）的價值曲線：**
- 價格：極高（免費）
- 候選池：極高（門檻極低）
- 便利／速度：高（即時存取）
- 配對品質：極低（無演算法；自助瀏覽）
- 安全／信任：低（無篩選；虛假資料泛濫）

**社群網路的價值曲線：**
- 價格：極高（免費）
- 信任／真實性：高（真實身分、朋友連結可驗證）
- 候選池：極高
- 配對品質：低（無配對目的；無相容性資料）
- 約會隱私：低（超過40%未標示婚姻狀態；活動公開可見）
- 對40-50歲以上族群的實用性：低（此族群較少使用社群網路）`
        }
      ]
    },
    {
      id: "prediction",
      titleEN: "IV. Prediction Factory / Automation of Judgment Analysis",
      titleZH: "四、預測工廠／判斷自動化分析",
      tag: "MODULE II CORE LENS",
      tagZH: "模組二核心視角",
      subsections: [
        {
          titleEN: "A. eHarmony as a 'Prediction Factory'",
          titleZH: "A. eHarmony 作為「預測工廠」",
          contentEN: `**[CLASS LENS — This is the core analytical frame for this module]**

Per Agrawal, Gans & Goldfarb's "Prediction Machines" framework (course reading): AI/ML makes prediction cheaper. When prediction gets cheaper, organizations can redesign operating models around automated prediction.

**What is eHarmony predicting?**
The core prediction: Given Person A's personality/values/interests profile and Person B's profile, how likely are they to form a satisfying, enduring relationship?

This is a classic "judgment" problem that was historically handled by:
- Individuals themselves (browsing profiles, going on dates)
- Professional matchmakers ($1,500-$10,000; charged up to 100x more)
- Family, friends, community networks
- Chance encounters (work, church, bars — see Exhibit 7)

**eHarmony automated this judgment.** The matching algorithm replaces human search and intuition with a statistical model trained on couple-outcome data.

**The Prediction Factory Design:**
1. **Data Collection** → Personality Profile (258-436 structured questions)
2. **Algorithm / Model** → Patented matching algorithm; validated on 4,000+ couples; predicts Dyadic Adjustment Scale outcomes
3. **Decision / Action** → Algorithm generates matches; users cannot override by browsing
4. **Feedback Loop** → Match acceptance/rejection data; marriage outcomes (Harris study); Labs longitudinal research; re-subscription rates as proxy for match satisfaction
5. **Continuous Improvement** → Labs research feeding new insights back into the model

**Key insight:** eHarmony doesn't just USE an algorithm — its entire operating model IS the prediction factory. Remove the algorithm, and the business has no value proposition. The questionnaire, the matching, the Guided Communication, the rejection of unsuitable applicants — all are designed to serve the prediction.`,
          contentZH: `**[課程視角 — 此為本模組的核心分析框架]**

依據 Agrawal、Gans 與 Goldfarb 的「預測機器」框架（課程指定閱讀）：AI/ML 使預測變得更便宜。當預測變便宜時，組織可以圍繞自動化預測重新設計營運模式。

**eHarmony 在預測什麼？**
核心預測：給定 A 的性格／價值觀／興趣檔案與 B 的檔案，他們形成一段令人滿意且持久的關係的可能性有多高？

這是一個典型的「判斷」問題，歷史上由以下方式處理：
- 個人自行處理（瀏覽檔案、約會）
- 專業媒人（收費$1,500-$10,000；費用高達100倍）
- 家人、朋友、社區網路
- 偶然相遇（工作、教會、酒吧 — 見附錄7）

**eHarmony 自動化了這項判斷。** 配對演算法以經過伴侶結果資料訓練的統計模型取代了人類的搜尋與直覺。

**預測工廠設計：**
1. **資料蒐集** → 個性檔案（258-436題結構化問題）
2. **演算法／模型** → 專利配對演算法；以4,000對以上伴侶驗證；預測「雙方適應量表」結果
3. **決策／行動** → 演算法產生配對；使用者無法透過瀏覽覆寫
4. **回饋迴路** → 配對接受／拒絕資料；婚姻結果（Harris 研究）；Labs 縱貫研究；續訂率作為配對滿意度的代理變數
5. **持續改善** → Labs 研究將新洞察回饋至模型

**關鍵洞察：** eHarmony 不僅僅是使用演算法——其整個營運模式本身就是預測工廠。移除演算法，這個企業就沒有價值主張。問卷、配對、引導式溝通、拒絕不合適的申請者——一切都是為了服務預測。`
        },
        {
          titleEN: "B. Algorithm Design Choices & Trade-offs",
          titleZH: "B. 演算法設計選擇與取捨",
          contentEN: `**Similarity vs. Complementarity:**
- Team was "convinced that successful relationships were almost universally characterized by a high degree of similarity, particularly in areas like intellectual ability and emotional stability"
- Priority order: personality characteristics > values > interests
- Agreeableness and emotional stability identified as "very important"
- This CONTRADICTS popular wisdom that "opposites attract"

**Validation Methodology — a pragmatic compromise:**
- Ideal: longitudinal study tracking singles through matching → dating → marriage → long-term outcomes
- Actual: studied already-married couples; assumed "if we got really good at predicting satisfied and happy marriages, that we could apply that to singles"
- This is a significant methodological limitation — survivorship bias, selection bias

**What the algorithm does NOT use:**
- Does not incorporate feedback from rejected matches ("You don't like that this person has a pet, or you're a vegetarian but you keep being matched with hunters" — this was a KNOWN limitation; improving screening preferences was "a next generation feature in the works")
- Does not factor in physical attraction (photos were added later; members with photos 9-15x more likely to receive messages)

**[INFERENCE — Prediction Factory assessment:]**
- This is "weak" AI/ML: statistical pattern-matching on structured questionnaire data, not deep learning
- The algorithm is essentially a compatibility scoring function validated against outcome data
- Significant room for improvement: behavioral data from platform interactions (which questions people answer, how they respond in Guided Communication, what matches they close vs. pursue) could dramatically enhance predictive power
- The algorithm treats the prediction as a ONE-TIME classification at sign-up rather than a continuously updating model`,
          contentZH: `**相似性 vs. 互補性：**
- 團隊「確信成功的關係幾乎普遍以高度相似性為特徵，特別是在智力能力和情緒穩定性等領域」
- 優先順序：性格特質 > 價值觀 > 興趣
- 隨和性與情緒穩定性被認定為「非常重要」
- 這與「異性相吸」的流行觀點相矛盾

**驗證方法 — 務實的折衷：**
- 理想做法：縱貫研究追蹤單身者從配對 → 約會 → 結婚 → 長期結果
- 實際做法：研究已婚伴侶；假設「如果我們能非常準確地預測滿意且幸福的婚姻，就能將此應用於單身者」
- 這是一個重大的方法論限制——倖存者偏差、選擇偏差

**演算法未使用的資料：**
- 未納入被拒絕配對的回饋（「你不喜歡這個人養寵物，或你是素食者但一直被配對給獵人」——這是已知的限制；改善篩選偏好是「開發中的下一代功能」）
- 未考慮外貌吸引力（照片是後來才加入的；有照片的會員收到訊息的可能性高出9-15倍）

**[推論 — 預測工廠評估：]**
- 這是「弱」AI/ML：基於結構化問卷資料的統計模式比對，而非深度學習
- 演算法本質上是一個以結果資料驗證的相容性評分函數
- 有很大的改善空間：來自平台互動的行為資料（使用者回答了哪些問題、在引導式溝通中如何回應、哪些配對被關閉 vs. 被追求）可大幅增強預測能力
- 演算法將預測視為註冊時的一次性分類，而非持續更新的模型`
        },
        {
          titleEN: "C. Complementary Operating Model Choices That Serve the Prediction",
          titleZH: "C. 服務預測的互補營運模式選擇",
          contentEN: `Every major operating model choice at eHarmony reinforces the prediction factory:

**1. Long questionnaire (1.5-2 hours) →** Rich, structured input data for the algorithm; also self-selects for serious users (men drop out more → the ones who complete are more committed)

**2. Rejection of 20% of applicants →** Cleaner data; removes users the algorithm cannot serve well (already married, serial divorcers); maintains prediction quality even at cost of $10M/year

**3. No browsing allowed →** Forces reliance on the algorithm's prediction; prevents users from making superficial choices that undermine the algorithm's logic

**4. Guided Communication (not free messaging) →** Generates rich behavioral data; forces depth; reduces the "huge letdown" of offline meetings by ensuring deeper pre-meeting compatibility assessment

**5. Premium pricing (~2x competitors) →** Signals quality and seriousness; selects for marriage-minded users who value the prediction; funds the R&D to improve the algorithm

**6. eHarmony Labs investment →** Closes the feedback loop; enables continuous algorithm improvement through longitudinal couple studies and neuroscience/sociology research

**7. Marketing focused on success stories →** Reinforces that the VALUE is the prediction outcome (marriages), not the browsing experience

**[CLASS LENS]** This is a textbook example of Boudreau's "operating model as a set of complementary choices" — each practice reinforces the others and collectively delivers a value curve that cannot be replicated by changing just one or two elements.`,
          contentZH: `eHarmony 的每一項重大營運模式選擇都強化了預測工廠：

**1. 長問卷（1.5-2小時）→** 為演算法提供豐富、結構化的輸入資料；同時自我篩選出認真的使用者（男性較易中途放棄 → 完成者更有承諾感）

**2. 拒絕20%的申請者 →** 更乾淨的資料；移除演算法無法良好服務的使用者（已婚、多次離婚者）；即使每年損失1,000萬美元也要維護預測品質

**3. 不允許瀏覽 →** 強制依賴演算法的預測；防止使用者做出破壞演算法邏輯的膚淺選擇

**4. 引導式溝通（非自由訊息傳遞）→** 產生豐富的行為資料；強制深度；透過確保更深層的見面前相容性評估，減少線下見面的「巨大失望」

**5. 溢價定價（約為競爭對手的兩倍）→** 傳達品質與認真態度的訊號；篩選出重視預測的以婚姻為目標的使用者；資助改善演算法的研發

**6. eHarmony Labs 投資 →** 閉合回饋迴路；透過縱貫伴侶研究與神經科學／社會學研究實現演算法的持續改善

**7. 行銷聚焦成功故事 →** 強化價值在於預測結果（婚姻），而非瀏覽體驗

**[課程視角]** 這是 Boudreau「營運模式作為互補選擇的集合」的教科書範例——每項實務做法相互強化，共同提供一條無法僅靠改變一兩個元素就能複製的價值曲線。`
        }
      ]
    },
    {
      id: "options",
      titleEN: "V. The Four Strategic Options",
      titleZH: "五、四個策略選項",
      subsections: [
        {
          titleEN: "Option 1: Defend Core Position — Rapid Membership Growth",
          titleZH: "選項一：防守核心定位 — 快速會員增長",
          contentEN: `**Description:** Aggressively grow paying memberships in the long-term relationship segment to deny Chemistry room to grow.

**Tactics discussed:** Increase advertising; reduce barriers to joining (shorten questionnaire? relax rejection criteria?); encourage Fast Track; sell memberships to anyone who wants to purchase.

**Prediction Factory implications:**
- [INFERENCE] Relaxing quality controls (selling to anyone, shortening questionnaire) would DEGRADE the prediction factory's input data quality
- Waldorf's shift: "I no longer believe [in diminishing returns to subscribers]" — suggests belief that MORE data improves matching
- BUT: selling memberships to previously rejected users means the algorithm cannot confidently serve them → recommending matches the system cannot be confident in
- Tension: short-term revenue/market defense vs. long-term prediction quality

**Risk:** Undermines the very thing that differentiates eHarmony — the curated, high-quality prediction.`,
          contentZH: `**說明：** 積極擴大長期關係領域的付費會員人數，阻止 Chemistry 獲得成長空間。

**討論的策略：** 增加廣告；降低加入門檻（縮短問卷？放寬拒絕標準？）；鼓勵快速通道；向任何願意購買的人銷售會籍。

**預測工廠意涵：**
- [推論] 放寬品質控制（向任何人銷售、縮短問卷）會**降低**預測工廠的輸入資料品質
- Waldorf 的觀點轉變：「我不再相信[訂閱者的遞減報酬]」——暗示相信更多資料能改善配對
- 但是：向先前被拒絕的使用者銷售會籍意味著演算法無法有信心地服務他們 → 推薦系統無法確信的配對
- 張力：短期營收／市場防禦 vs. 長期預測品質

**風險：** 破壞使 eHarmony 與眾不同的根本——策展式的高品質預測。`
        },
        {
          titleEN: "Option 2: Broaden to Include Casual/Medium-Term Daters",
          titleZH: "選項二：擴展至休閒／中期約會者",
          contentEN: `**Description:** Expand the customer base to include medium-term relationship seekers (not just marriage-minded).

**Prediction Factory implications:**
- [INFERENCE] This fundamentally changes WHAT is being predicted. The algorithm was validated against long-term marital satisfaction (Dyadic Adjustment Scale). Predicting "medium-term relationship compatibility" is a DIFFERENT prediction problem.
- Would require retraining or building a second algorithm
- Only ~5% of 94M US singles were paying members of any online personals site → huge untapped market
- Waldorf believed the matching algorithm could provide differentiation even in this segment

**Risk:** Direct competition with Match and Yahoo! Personals on their turf; potential brand dilution; no validated algorithm for this use case.`,
          contentZH: `**說明：** 擴大客戶群以包含中期關係尋求者（不僅限於以婚姻為目標者）。

**預測工廠意涵：**
- [推論] 這從根本上改變了預測的對象。演算法是以長期婚姻滿意度（「雙方適應量表」）驗證的。預測「中期關係相容性」是一個不同的預測問題。
- 需要重新訓練或建立第二套演算法
- 9,400萬美國單身者中僅約5%是任何線上交友網站的付費會員 → 巨大的未開發市場
- Waldorf 相信配對演算法即使在此領域也能提供差異化

**風險：** 在 Match 和 Yahoo! Personals 的地盤上直接競爭；品牌稀釋風險；此使用情境無經過驗證的演算法。`
        },
        {
          titleEN: "Option 3: New Business — Life Stage Sites (Leveraging Research)",
          titleZH: "選項三：新事業 — 人生階段網站（善用研究成果）",
          contentEN: `**Description:** Build a network of eHarmony-branded sites focused on life-stage transitions: weddings, pregnancy/fertility, parenting, elder care. Free-to-use, ad-supported.

**Prediction Factory implications:**
- [INFERENCE] This leverages the RESEARCH side of the prediction factory (Labs' longitudinal study of 400 couples) rather than the matching algorithm itself
- Extends the prediction from "who should you marry?" to "how do you navigate life after marriage?"
- Would generate NEW data types: post-marriage behavioral data, life-stage transition data
- Revenue model shifts from subscription to advertising → fundamentally different business model
- Expert advice + community from other users = platform with content + network effects

**Risk:** Completely different competency required; no proven revenue model; stretches the brand; diverts resources from core dating business.`,
          contentZH: `**說明：** 建立以 eHarmony 品牌為核心的人生階段網站網路，聚焦於人生重大轉折：婚禮、懷孕／生育、育兒、長照。免費使用，廣告支撐。

**預測工廠意涵：**
- [推論] 這利用的是預測工廠的研究端（Labs 對400對伴侶的縱貫研究），而非配對演算法本身
- 將預測從「你應該嫁／娶誰？」延伸至「婚後如何面對人生？」
- 將產生新類型的資料：婚後行為資料、人生階段轉換資料
- 營收模式從訂閱轉為廣告 → 根本不同的商業模式
- 專家建議 + 其他使用者的社群 = 具有內容與網路效應的平台

**風險：** 需要完全不同的核心能力；無經過驗證的營收模式；延伸品牌；分散核心交友事業的資源。`
        },
        {
          titleEN: "Option 4: Geographic Expansion (International)",
          titleZH: "選項四：地理擴張（國際化）",
          contentEN: `**Description:** Expand to English-speaking countries first, then EU nations where online dating was already popular.

**Prediction Factory implications:**
- [INFERENCE] Critical question: Does the matching algorithm's predictions TRANSFER across cultures? The algorithm was validated on US couples. Relationship expectations, compatibility dimensions, and cultural norms vary significantly across countries (see Exhibit 4: attitudes toward marriage vary enormously — e.g., only 10% of Americans consider marriage "out-dated" vs. 36% of French).
- Would need to re-validate the algorithm in each new cultural context
- Match was already present in 30+ countries, including 7 new countries recently — first-mover risk
- Data collection challenge: need large user base in each geography for the algorithm to have sufficient matching pool

**Risk:** Algorithm may not transfer; competitors already present; resource-intensive; cultural adaptation required.`,
          contentZH: `**說明：** 先擴展至英語系國家，再進入線上交友已流行的歐盟國家。

**預測工廠意涵：**
- [推論] 關鍵問題：配對演算法的預測能否跨文化遷移？演算法是以美國伴侶驗證的。關係期望、相容性維度與文化規範在不同國家間差異極大（見附錄4：對婚姻的態度差異巨大——例如僅10%的美國人認為婚姻「過時」，法國人則為36%）。
- 需要在每個新的文化脈絡中重新驗證演算法
- Match 已進入30多個國家，包括近期新進的7個國家——先行者風險
- 資料蒐集挑戰：需要每個地區有足夠的使用者基礎，演算法才有充足的配對池

**風險：** 演算法可能無法遷移；競爭對手已先行布局；資源密集；需要文化適應。`
        }
      ]
    },
    {
      id: "coldcall",
      titleEN: "VI. Cold-Call Preparation",
      titleZH: "六、冷叫準備",
      subsections: [
        {
          titleEN: "Likely Opening Questions & Model Answers",
          titleZH: "可能的開場問題與範例答案",
          contentEN: `**Q: "What is eHarmony's core business? Is it a platform?"**
A: eHarmony is a matching platform operating in a two-sided dating market. But unlike typical DIY dating platforms where users browse and self-select, eHarmony's operating model is built around an automated prediction — a patented algorithm that determines who matches with whom. Users cannot browse independently. So it is more accurately described as a "prediction factory" that happens to be organized as a platform, rather than a platform that happens to use an algorithm.

**Q: "What data does eHarmony have?"**
A: [Use Section II above — be ready to enumerate 5-8 categories quickly, then drill into the most important: the Personality Profile questionnaire data, the algorithm validation data from 4,000+ couples, and the behavioral data from Guided Communication interactions.]

**Q: "Where do eHarmony's network effects come from? Are they strong?"**
A: The most important network effect is a DATA network effect: more users → richer training data → better algorithm → better match quality → higher satisfaction → more users. There are also traditional cross-side effects (more men → more value for women, vice versa), but eHarmony's algorithm mediates and controls these, unlike open platforms where raw numbers drive value. Waldorf explicitly states he no longer believes in diminishing returns to network size. The algorithm also mitigates the NEGATIVE same-side effects that plague competitors (congestion, inundation of women by men's messages).

**Q: "Which option should Waldorf choose?"**
A: [This is the debate question. Be ready to argue any side. The strongest case is probably for a combination of Options 1 and 4, because:]
- Option 1 (defend core) is necessary in the short term: Chemistry is directly attacking eHarmony's value proposition
- Option 4 (international) extends the prediction factory to new geographies where the data flywheel can compound
- Options 2 and 3 are riskier because they require fundamentally different predictions (medium-term compatibility, life-stage guidance) for which eHarmony has no validated algorithm
- The constraint is resources: "the company could afford to invest in only one or two"

**Q: "What is the role of the algorithm in eHarmony's competitive advantage?"**
A: The algorithm is the competitive advantage. It is: (1) patented, (2) validated on proprietary data from 4,000+ couples, (3) continuously improved through eHarmony Labs, (4) embedded in an operating model where every other choice (long questionnaire, rejection of applicants, no browsing, Guided Communication, premium pricing) is designed to serve and protect the prediction's quality. Competitors can copy individual features, but replicating the entire complementary system is extremely difficult. Chemistry tried with a different algorithm and methodology, but with lower validation and a different theoretical basis (interpersonal chemistry vs. psychosocial compatibility).`,
          contentZH: `**問：「eHarmony 的核心業務是什麼？它是平台嗎？」**
答：eHarmony 是一個在雙邊交友市場中運作的配對平台。但與典型的自助式交友平台（使用者瀏覽並自行選擇）不同，eHarmony 的營運模式圍繞自動化預測而建——一個決定誰與誰配對的專利演算法。使用者無法獨立瀏覽。因此更準確地說，它是一個碰巧以平台形式組織的「預測工廠」，而非一個碰巧使用演算法的平台。

**問：「eHarmony 有什麼資料？」**
答：[使用上方第二節——準備好快速列舉5-8個類別，然後深入最重要的：個性檔案問卷資料、來自4,000對以上伴侶的演算法驗證資料，以及引導式溝通互動的行為資料。]

**問：「eHarmony 的網路效應從何而來？它們強嗎？」**
答：最重要的網路效應是資料網路效應：更多使用者 → 更豐富的訓練資料 → 更好的演算法 → 更好的配對品質 → 更高的滿意度 → 更多使用者。也有傳統的跨邊效應（更多男性 → 對女性更有價值，反之亦然），但 eHarmony 的演算法中介並控制這些，不像開放平台中原始數量驅動價值。Waldorf 明確表示他不再相信網路規模有遞減報酬。演算法也緩解了困擾競爭對手的負面同邊效應（壅塞、女性被男性訊息淹沒）。

**問：「Waldorf 應該選哪個選項？」**
答：[這是辯論題。準備好支持任何一方。最強的論點可能是選項1與4的組合，因為：]
- 選項1（防守核心）在短期內是必要的：Chemistry 正在直接攻擊 eHarmony 的價值主張
- 選項4（國際化）將預測工廠擴展至資料飛輪可以複合增長的新地區
- 選項2和3風險較高，因為它們需要根本不同的預測（中期相容性、人生階段指引），而 eHarmony 並無經過驗證的演算法
- 限制條件是資源：「公司只能負擔投資一到兩個選項」

**問：「演算法在 eHarmony 的競爭優勢中扮演什麼角色？」**
答：演算法就是競爭優勢。它是：(1) 受專利保護，(2) 以4,000對以上伴侶的專有資料驗證，(3) 透過 eHarmony Labs 持續改善，(4) 嵌入在一個營運模式中，每個其他選擇（長問卷、拒絕申請者、不可瀏覽、引導式溝通、溢價定價）都是為了服務和保護預測品質。競爭對手可以複製個別功能，但複製整個互補系統極為困難。Chemistry 試圖以不同的演算法和方法論做到，但驗證程度較低且理論基礎不同（人際化學 vs. 心理社會相容性）。`
        },
        {
          titleEN: "Key Exhibits to Know",
          titleZH: "需熟悉的關鍵附錄",
          contentEN: `- **Exhibit 1:** Demographics of people with marital events (race, age, education, poverty level breakdowns by gender — useful for understanding market segmentation)
- **Exhibit 2:** Marriage rates by age 1880-2000 (declining trend; later marriage)
- **Exhibit 3:** Factors reducing divorce risk (income >$50K: -30%; baby after 7mo+: -24%; over 25: -24%; intact family: -14%; religious: -14%; some college: -13%)
- **Exhibit 4:** International marriage market comparison (US vs. Canada, UK, France, Germany, Italy, Sweden — critical for evaluating Option 4)
- **Exhibit 5:** Marriage survival rates by cohort (declining durability over time)
- **Exhibit 6:** Online dating demographics (18-29: 18% tried; 65+: only 3%)
- **Exhibit 7:** How couples met (work/school: 38%; family/friends: 34%; social venues: 13%; internet: only 4%)
- **Exhibit 8:** eHarmony Personality Profile structure (11 sections + picture upload; 258 questions across personality, values, interests)
- **Exhibits 9-10:** Pricing comparison (eHarmony consistently ~2x Match and Yahoo!)
- **Exhibit 11:** Price comparison with other subscriptions (eHarmony at $19.95/mo vs. gym $74.99, phone $59.99)
- **Exhibit 12:** Chemistry Personality Test structure (fewer sections; includes right-hand image analysis and visual game)`,
          contentZH: `- **附錄1：** 具婚姻事件之人口統計（種族、年齡、教育、貧窮水平按性別分類——有助於理解市場區隔）
- **附錄2：** 1880-2000年各年齡結婚率（下降趨勢；晚婚）
- **附錄3：** 降低離婚風險的因素（收入>$50K：-30%；懷孕7個月以上後才結婚：-24%；超過25歲：-24%；完整家庭：-14%；有宗教信仰：-14%；大學以上學歷：-13%）
- **附錄4：** 國際婚姻市場比較（美國 vs. 加拿大、英國、法國、德國、義大利、瑞典——評估選項4的關鍵）
- **附錄5：** 各世代婚姻存續率（持久性隨時間下降）
- **附錄6：** 線上交友人口統計（18-29歲：18%嘗試過；65歲以上：僅3%）
- **附錄7：** 伴侶如何認識的（工作／學校：38%；家人／朋友：34%；社交場所：13%；網路：僅4%）
- **附錄8：** eHarmony 個性檔案結構（11個部分 + 照片上傳；258題涵蓋性格、價值觀、興趣）
- **附錄9-10：** 定價比較（eHarmony 持續約為 Match 和 Yahoo! 的兩倍）
- **附錄11：** 與其他訂閱服務的價格比較（eHarmony $19.95/月 vs. 健身房 $74.99、手機 $59.99）
- **附錄12：** Chemistry 個性測試結構（較少部分；包含慣用手影像分析與視覺遊戲）`
        }
      ]
    }
  ]
};

export default function EHarmonyPrep() {
  const [lang, setLang] = useState("both");
  const [openSections, setOpenSections] = useState(new Set(data.sections.map(s => s.id)));
  const [openSubs, setOpenSubs] = useState(new Set());

  const toggleSection = (id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSub = (key) => {
    setOpenSubs(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const expandAll = () => {
    setOpenSections(new Set(data.sections.map(s => s.id)));
    const allSubs = new Set();
    data.sections.forEach(s => s.subsections.forEach((_, i) => allSubs.add(`${s.id}-${i}`)));
    setOpenSubs(allSubs);
  };

  const collapseAll = () => {
    setOpenSections(new Set());
    setOpenSubs(new Set());
  };

  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      let processed = line;
      // Bold
      processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Check if it's a list item
      const isBullet = processed.match(/^- /);
      const isNumbered = processed.match(/^\d+\. /);
      if (isBullet) {
        processed = processed.replace(/^- /, '');
        return <div key={i} style={{ paddingLeft: 20, position: 'relative', marginBottom: 4 }}>
          <span style={{ position: 'absolute', left: 4 }}>•</span>
          <span dangerouslySetInnerHTML={{ __html: processed }} />
        </div>;
      }
      if (isNumbered) {
        const match = processed.match(/^(\d+)\. (.*)$/);
        if (match) {
          return <div key={i} style={{ paddingLeft: 28, position: 'relative', marginBottom: 4 }}>
            <span style={{ position: 'absolute', left: 4 }}>{match[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: match[2] }} />
          </div>;
        }
      }
      if (processed.trim() === '') return <div key={i} style={{ height: 8 }} />;
      return <div key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Noto Sans TC', Arial, sans-serif", maxWidth: 960, margin: '0 auto', padding: '16px 20px', color: '#1a1a1a', lineHeight: 1.65 }}>
      {/* Header */}
      <div style={{ borderBottom: '3px solid #1a365d', paddingBottom: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#666', fontWeight: 500, letterSpacing: 0.5 }}>
          MODULE II: DESIGNING A PREDICTION FACTORY — FOUNDATIONS
        </div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
          模組二：將預測工廠設計入營運模式 — 基礎篇
        </div>
        <h1 style={{ fontSize: 24, margin: '8px 0 4px', color: '#1a365d' }}>
          eHarmony Case Preparation Notes
        </h1>
        <div style={{ fontSize: 14, color: '#444' }}>
          eHarmony 案例準備筆記 &nbsp;|&nbsp; "Weak" AI/ML & Building Algorithms
        </div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
          Prof. Kevin Boudreau &nbsp;|&nbsp; Northeastern University &nbsp;|&nbsp; HBS Case 9-709-424
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 2, background: '#f0f0f0', borderRadius: 6, padding: 2 }}>
          {[
            { key: 'en', label: 'EN' },
            { key: 'zh', label: '中文' },
            { key: 'both', label: 'Both 雙語' }
          ].map(opt => (
            <button key={opt.key} onClick={() => setLang(opt.key)}
              style={{ padding: '5px 14px', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 600,
                background: lang === opt.key ? '#1a365d' : 'transparent',
                color: lang === opt.key ? '#fff' : '#555', cursor: 'pointer' }}>
              {opt.label}
            </button>
          ))}
        </div>
        <button onClick={expandAll} style={{ padding: '5px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 11, cursor: 'pointer', background: '#fff' }}>
          Expand All 全展開
        </button>
        <button onClick={collapseAll} style={{ padding: '5px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 11, cursor: 'pointer', background: '#fff' }}>
          Collapse All 全收合
        </button>
      </div>

      {/* Sections */}
      {data.sections.map(section => (
        <div key={section.id} style={{ marginBottom: 12, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <div
            onClick={() => toggleSection(section.id)}
            style={{ padding: '10px 16px', background: openSections.has(section.id) ? '#1a365d' : '#f7f7f7',
              color: openSections.has(section.id) ? '#fff' : '#1a1a1a', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>
                {lang !== 'zh' && section.titleEN}
                {lang === 'both' && <br />}
                {lang !== 'en' && <span style={{ fontSize: lang === 'both' ? 13 : 15, opacity: lang === 'both' ? 0.85 : 1 }}>{section.titleZH}</span>}
              </div>
              {section.tag && (
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 3, marginTop: 4, display: 'inline-block',
                  background: openSections.has(section.id) ? 'rgba(255,255,255,0.2)' : '#e6f0ff', color: openSections.has(section.id) ? '#fff' : '#1a365d', fontWeight: 600 }}>
                  {lang !== 'zh' ? section.tag : section.tagZH}
                </span>
              )}
            </div>
            <span style={{ fontSize: 18, fontWeight: 300 }}>{openSections.has(section.id) ? '−' : '+'}</span>
          </div>

          {openSections.has(section.id) && (
            <div style={{ padding: '8px 12px' }}>
              {section.subsections.map((sub, idx) => {
                const subKey = `${section.id}-${idx}`;
                const isOpen = openSubs.has(subKey);
                return (
                  <div key={idx} style={{ marginBottom: 6, border: '1px solid #eee', borderRadius: 6 }}>
                    <div
                      onClick={() => toggleSub(subKey)}
                      style={{ padding: '8px 14px', background: isOpen ? '#f0f5ff' : '#fafafa', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: isOpen ? '6px 6px 0 0' : 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#2a4a7f' }}>
                        {lang !== 'zh' && sub.titleEN}
                        {lang === 'both' && ' / '}
                        {lang !== 'en' && sub.titleZH}
                      </div>
                      <span style={{ fontSize: 14, color: '#999' }}>{isOpen ? '▾' : '▸'}</span>
                    </div>
                    {isOpen && (
                      <div style={{ padding: '10px 16px', fontSize: 13 }}>
                        {lang !== 'zh' && (
                          <div style={{ marginBottom: lang === 'both' ? 16 : 0 }}>
                            {renderMarkdown(sub.contentEN)}
                          </div>
                        )}
                        {lang === 'both' && <hr style={{ border: 'none', borderTop: '1px dashed #ddd', margin: '12px 0' }} />}
                        {lang !== 'en' && (
                          <div style={{ color: lang === 'both' ? '#444' : '#1a1a1a' }}>
                            {renderMarkdown(sub.contentZH)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Footer */}
      <div style={{ marginTop: 20, padding: '12px 16px', background: '#f9f9f9', borderRadius: 6, fontSize: 11, color: '#888', borderLeft: '3px solid #1a365d' }}>
        <div style={{ fontWeight: 600, marginBottom: 4, color: '#555' }}>
          TAGGING LEGEND 標籤說明
        </div>
        <div><strong>[FACT]</strong> — Directly from case text 直接引自案例文本</div>
        <div><strong>[INFERENCE]</strong> — Analytical extension from case facts 由案例事實延伸的分析推論</div>
        <div><strong>[CLASS LENS]</strong> — Application of Boudreau's course frameworks 應用 Boudreau 教授的課程框架</div>
      </div>
    </div>
  );
}
