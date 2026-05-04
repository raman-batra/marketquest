(() => {
// ───────────────────────────────────────────────
// MarketQuest — content.js
// All curriculum content lives here. Each quest is 5-10 min.
// ───────────────────────────────────────────────

const WORLDS = [
  {
    id: 1,
    title: "What even IS a stock?",
    description: "Demystify the basics. No jargon walls.",
    icon: "🌱",
    questIds: [1, 2, 3, 4]
  },
  {
    id: 2,
    title: "How markets actually work",
    description: "Exchanges, brokers, what happens when you click 'buy'.",
    icon: "🏛️",
    questIds: [5, 6, 7, 8]
  },
  {
    id: 3,
    title: "Risk: the only thing that matters",
    description: "The single most important world. Don't skip.",
    icon: "🛡️",
    questIds: [9, 10, 11, 12, 13]
  },
  {
    id: 4,
    title: "Your brain, your enemy",
    description: "Trading psychology. The hidden 80% of success.",
    icon: "🧠",
    questIds: [14, 15, 16]
  },
  {
    id: 5,
    title: "Reading charts",
    description: "Just enough technical analysis. Not 47 indicators.",
    icon: "📈",
    questIds: [17, 18, 19, 20]
  },
  {
    id: 6,
    title: "Reading businesses",
    description: "Fundamentals: is this company healthy?",
    icon: "🔬",
    questIds: [21, 22, 23]
  },
  {
    id: 7,
    title: "Your first paper trade",
    description: "Pretend money. Real practice.",
    icon: "📝",
    questIds: [24, 25, 26]
  },
  {
    id: 8,
    title: "Build your strategy",
    description: "Make your own playbook. Yours. Not a guru's.",
    icon: "🗺️",
    questIds: [27, 28, 29]
  },
  {
    id: 9,
    title: "Stay alive",
    description: "What to do when things go wrong.",
    icon: "⚓",
    questIds: [30, 31, 32]
  },
  {
    id: 10,
    title: "Going live (carefully)",
    description: "Real money, tiny size, eyes wide open.",
    icon: "🚀",
    questIds: [33, 34, 35]
  }
];

// ─── Prerequisites (the Foundation tab) ───
const PREREQS = [
  {
    id: "emergency",
    title: "Emergency fund in place",
    desc: "6 months of expenses, in savings or liquid fund. Untouchable for trading.",
    xp: 100
  },
  {
    id: "debt",
    title: "High-interest debt cleared",
    desc: "Credit cards, personal loans paid off. Returns rarely beat 18% interest.",
    xp: 100
  },
  {
    id: "insurance",
    title: "Term + health insurance active",
    desc: "Your dependents shouldn't depend on your trading capital.",
    xp: 100
  },
  {
    id: "sip",
    title: "Index fund SIP running",
    desc: "Nifty 50 or Nifty Next 50 SIP. This is your real wealth builder.",
    xp: 100
  },
  {
    id: "risk-capital",
    title: "Risk capital identified",
    desc: "₹25k-50k you could lose 100% of without changing your life.",
    xp: 100
  },
  {
    id: "demat",
    title: "Demat account opened",
    desc: "Zerodha, Dhan, Upstox, or similar. Don't trade yet.",
    xp: 100
  }
];

// ─── BADGES ───
const BADGES = [
  { id: "first-step", name: "First Step", icon: "🌱", desc: "Complete your first quest" },
  { id: "week-warrior", name: "Week Warrior", icon: "🔥", desc: "7-day streak" },
  { id: "fortnight", name: "Fortnight", icon: "✨", desc: "14-day streak" },
  { id: "monthly", name: "One Month In", icon: "🎯", desc: "30-day streak" },
  { id: "world-1", name: "Foundations", icon: "🏗️", desc: "Complete World 1" },
  { id: "risk-master", name: "Risk Master", icon: "🛡️", desc: "Complete World 3" },
  { id: "psychology", name: "Mind Strong", icon: "🧠", desc: "Complete World 4" },
  { id: "chart-reader", name: "Chart Reader", icon: "📈", desc: "Complete World 5" },
  { id: "fundamentalist", name: "Business Sleuth", icon: "🔬", desc: "Complete World 6" },
  { id: "paper-trader", name: "Paper Trader", icon: "📝", desc: "Log your first paper trade" },
  { id: "ten-trades", name: "Disciplined Ten", icon: "🎖️", desc: "Log 10 paper trades" },
  { id: "fifty-trades", name: "Half Century", icon: "🏆", desc: "Log 50 paper trades" },
  { id: "foundation", name: "Foundation Built", icon: "🏛️", desc: "Complete all prerequisites" },
  { id: "strategist", name: "Strategist", icon: "🗺️", desc: "Complete World 8 (write your strategy)" },
  { id: "graduate", name: "Graduate", icon: "🎓", desc: "Complete all 10 worlds" }
];

// ─── DAILY QUOTES ───
const QUOTES = [
  "The market can stay irrational longer than you can stay solvent. — John Maynard Keynes",
  "Risk comes from not knowing what you're doing. — Warren Buffett",
  "The four most dangerous words in investing are: 'this time it's different.' — John Templeton",
  "In investing, what is comfortable is rarely profitable. — Robert Arnott",
  "Patience is bitter, but its fruit is sweet. — Aristotle (great trading advice somehow)",
  "The intelligent investor is a realist who sells to optimists and buys from pessimists. — Benjamin Graham",
  "Time in the market beats timing the market.",
  "Successful investing is about managing risk, not avoiding it. — Benjamin Graham",
  "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong. — George Soros",
  "The stock market is filled with individuals who know the price of everything, but the value of nothing. — Phil Fisher"
];

// ─── QUESTS — the heart of the curriculum ───
// Each quest = a series of "steps" (info screens + quizzes).
// Designed for 5-10 min completion, gentle tone, no overwhelm.

const QUESTS = {
  1: {
    title: "Money has a job",
    world: 1,
    minutes: 5,
    xp: 20,
    steps: [
      {
        type: "info",
        title: "Money has a job",
        body: `<p>Your money is like an employee. It can either sit at home doing nothing, or go to work and bring back more money.</p>
        <p>When you put ₹1,000 in a savings account, your money is doing a <strong>boring but safe job</strong>. It earns about 3-4% a year. Slow.</p>
        <p>When you buy a stock, your money is doing a <strong>more interesting job</strong>. It joins a real business. If the business does well, your money grows. If the business struggles, your money shrinks.</p>
        <div class="key-insight"><strong>The big idea:</strong> investing isn't gambling. It's hiring your money to work in real businesses.</div>`
      },
      {
        type: "info",
        title: "What is a stock, really?",
        body: `<p>A stock (also called a "share") is a tiny piece of ownership in a real company.</p>
        <p>If Reliance Industries has 100 crore shares, and you own 100 of them, you literally own one-millionth of Reliance. The factories, the brand, the future profits — a sliver of all of it is yours.</p>
        <p>Sounds wild? It is. That's the beauty.</p>
        <blockquote>You don't have to start a business to own one. You can buy a slice in 30 seconds.</blockquote>`
      },
      {
        type: "quiz",
        question: "If you buy 1 share of TCS, what do you actually own?",
        options: [
          "A loan to TCS that they'll pay back",
          "A tiny piece of the actual company",
          "A guess that the price will go up",
          "A digital coupon that expires"
        ],
        correct: 1,
        explanation: "Yes! You own a tiny slice of TCS itself. That's why it's called a 'share' — you share in the business."
      },
      {
        type: "info",
        title: "What you're learning today, in one sentence",
        body: `<p>A stock is part-ownership of a real business. Investing is putting your money to work in those businesses.</p>
        <p>That's it. That's the whole foundation. Everything else builds on this.</p>
        <p>Tomorrow we'll cover <em>why</em> stock prices go up and down — and why most people get it wrong.</p>`
      }
    ],
    glossary: [
      { term: "Stock / Share", def: "A small piece of ownership in a publicly listed company." },
      { term: "Investing", def: "Putting your money to work in assets that grow over time." }
    ]
  },

  2: {
    title: "Why prices move",
    world: 1,
    minutes: 6,
    xp: 20,
    steps: [
      {
        type: "info",
        title: "An auction, all day, every day",
        body: `<p>Imagine a vegetable market. The price of tomatoes today depends on:</p>
        <ul>
          <li>How many tomatoes are available (supply)</li>
          <li>How many people want them (demand)</li>
        </ul>
        <p>Stock prices work exactly the same way. Every second, thousands of people are buying and selling. The price moves based on whether more people want to buy, or more want to sell.</p>`
      },
      {
        type: "info",
        title: "But why do they want to buy or sell?",
        body: `<p>People buy a stock when they believe the company will do better in the future. They sell when they believe it'll do worse — or just need cash.</p>
        <p>So a stock price is really a constant <strong>vote on the company's future</strong>.</p>
        <div class="key-insight"><strong>The trick:</strong> the future is unknown. So prices reflect <em>opinions</em> about the future, not facts. That's why prices swing — opinions change daily, hourly, by the second.</div>`
      },
      {
        type: "info",
        title: "Two timeframes, two stories",
        body: `<p>Over <strong>days and weeks</strong>, prices move on news, rumors, mood, panic, hope. Mostly noise.</p>
        <p>Over <strong>years and decades</strong>, prices move on actual business performance. Real signal.</p>
        <p>This is why a great long-term investment can have an awful month — and why a hot tip can make money for 6 months and then crash.</p>`
      },
      {
        type: "quiz",
        question: "A stock falls 5% in a day. What's the most useful first question?",
        options: [
          "Is the company itself in trouble, or is it just market noise?",
          "Should I sell quickly before it falls more?",
          "Should I buy more because it's cheaper?",
          "Why didn't anyone warn me?"
        ],
        correct: 0,
        explanation: "Always: separate noise from signal. A 5% daily move is usually noise. Real trouble shows up in the company's reports, not in one day's price."
      }
    ],
    glossary: [
      { term: "Supply & Demand", def: "More buyers than sellers = price goes up. More sellers = price goes down." },
      { term: "Noise vs. Signal", def: "Short-term price moves (noise) vs. long-term business performance (signal)." }
    ]
  },

  3: {
    title: "The cast of characters",
    world: 1,
    minutes: 5,
    xp: 20,
    steps: [
      {
        type: "info",
        title: "Who's actually in the market?",
        body: `<p>When you place an order, you're not buying from "the market." You're buying from a <em>specific other person or institution</em>. Let's meet them:</p>
        <h3>1. Retail investors (you and me)</h3>
        <p>Individuals trading their own money. We're the smallest fish.</p>
        <h3>2. FIIs — Foreign Institutional Investors</h3>
        <p>Massive funds from abroad. When they buy big, prices fly. When they sell big, prices crash. They move markets.</p>
        <h3>3. DIIs — Domestic Institutional Investors</h3>
        <p>Indian mutual funds, insurance companies, pension funds. The other big movers.</p>
        <h3>4. Promoters & insiders</h3>
        <p>The actual company founders/owners. They know things you don't.</p>
        <h3>5. Prop traders & algos</h3>
        <p>High-frequency trading firms. They make money in milliseconds, off tiny price differences.</p>`
      },
      {
        type: "info",
        title: "Why this matters",
        body: `<div class="key-insight"><strong>You are competing with everyone above you on this list.</strong> They have more money, more information, faster systems.</div>
        <p>This isn't to scare you. It's to set realistic expectations:</p>
        <ul>
          <li>You won't beat algos at speed</li>
          <li>You won't beat insiders at information</li>
          <li>You won't beat FIIs at scale</li>
        </ul>
        <p>But you have one edge they don't: <strong>patience</strong>. You don't have quarterly performance reviews. You can wait. You can hold. You can buy when they're forced to sell.</p>`
      },
      {
        type: "quiz",
        question: "Who tends to move Indian stock prices the most on any given day?",
        options: [
          "Retail investors like us",
          "FIIs and DIIs",
          "The government",
          "Random news headlines"
        ],
        correct: 1,
        explanation: "FIIs and DIIs move billions of rupees. Their buying/selling creates most of the day's volatility. Retail trades, individually, are tiny by comparison."
      }
    ],
    glossary: [
      { term: "Retail investor", def: "An individual trading their own money. That's you." },
      { term: "FII", def: "Foreign Institutional Investor — large foreign funds that move Indian markets significantly." },
      { term: "DII", def: "Domestic Institutional Investor — Indian mutual funds, insurance, pension funds." },
      { term: "Promoter", def: "The original founder/owner group of a company who still holds significant stake." }
    ]
  },

  4: {
    title: "Two ways to make money",
    world: 1,
    minutes: 5,
    xp: 20,
    steps: [
      {
        type: "info",
        title: "Capital gains vs. dividends",
        body: `<p>There are exactly two ways a stock makes money for you:</p>
        <h3>1. Capital gains</h3>
        <p>You buy at ₹100. Later, you sell at ₹150. The ₹50 difference is a capital gain.</p>
        <p>This is what people usually mean by "making money in stocks."</p>
        <h3>2. Dividends</h3>
        <p>Some companies share their profits with shareholders directly. ITC, for example, pays out a chunk of its earnings every year. If you own 100 shares and they declare ₹10 dividend per share, you get ₹1,000 — just for owning.</p>
        <p>Dividends are small in % terms but rock-steady. They reward patience.</p>`
      },
      {
        type: "info",
        title: "Investing vs. trading",
        body: `<p>This is where most beginners get confused. Both are fine; they're just different jobs:</p>
        <ul>
          <li><strong>Investor:</strong> buys good businesses, holds for years, mostly ignores price swings. Think Warren Buffett.</li>
          <li><strong>Trader:</strong> buys and sells frequently — days, weeks, sometimes minutes. Tries to profit from price moves themselves.</li>
        </ul>
        <div class="key-insight"><strong>The honest truth:</strong> investing is much easier and statistically much more profitable for most people. Trading is harder, more stressful, and most retail traders lose money.</div>
        <p>This app teaches both — but always recommends doing the easy thing (long-term investing in index funds) <em>alongside</em> any trading you do.</p>`
      },
      {
        type: "quiz",
        question: "Your friend says 'I made 30% on a stock in 3 months — investing is easy!' What's the most accurate response?",
        options: [
          "Wow, you're a natural — go bigger!",
          "Lucky for now. The real test is: did your strategy still work the next 3 months?",
          "That's impossible — you must be lying",
          "You should put your savings into stocks immediately"
        ],
        correct: 1,
        explanation: "Three months means almost nothing in markets. Anyone can make money in a bull market. Real skill shows over years and across different market conditions."
      }
    ],
    glossary: [
      { term: "Capital gain", def: "Profit from selling a stock at a higher price than you bought it." },
      { term: "Dividend", def: "Cash distribution from a company to its shareholders, usually paid yearly or quarterly." },
      { term: "Investor vs Trader", def: "Investors hold for years; traders hold for days/weeks. Different games entirely." }
    ]
  },

  5: {
    title: "Where stocks live: exchanges",
    world: 2,
    minutes: 5,
    xp: 25,
    steps: [
      {
        type: "info",
        title: "NSE and BSE",
        body: `<p>India has two main stock exchanges:</p>
        <h3>NSE — National Stock Exchange</h3>
        <p>The bigger, faster one. Most trading volume happens here. Home of the <strong>Nifty 50</strong> index.</p>
        <h3>BSE — Bombay Stock Exchange</h3>
        <p>The older one (since 1875). Home of the <strong>Sensex</strong> index. Slightly different stock list.</p>
        <p>Both are open 9:15 AM to 3:30 PM, Monday to Friday (with holidays).</p>`
      },
      {
        type: "info",
        title: "What's an index?",
        body: `<p>The Nifty 50 isn't a stock. It's a <em>list</em> of the 50 biggest, most actively traded Indian companies — and a <em>price</em> calculated from their average movement.</p>
        <p>When news says "Nifty up 1%," it means those 50 companies, on average, gained 1% today.</p>
        <p>Other indexes you'll hear in real life:</p>
        <ul>
          <li><strong>Sensex:</strong> 30 large companies on BSE</li>
          <li><strong>Nifty Bank (Bank Nifty):</strong> major banking stocks; usually moves faster than Nifty 50</li>
          <li><strong>Nifty Next 50:</strong> the next layer after Nifty 50, often more volatile</li>
        </ul>
        <p>For beginners, track Nifty 50 first. Add Bank Nifty only after your risk rules are solid.</p>
        <p>Indexes give you the market's mood at a glance. They also let you invest in the entire top 50 in one click — through index funds. (The boring, profitable kind of investing.)</p>
        <div class="key-insight"><strong>Tip:</strong> If you do nothing else from this app, set up a monthly SIP into a Nifty 50 index fund. Over 20 years, this beats most traders.</div>`
      },
      {
        type: "quiz",
        question: "What does it mean if 'Nifty 50 closed at 24,500, up 0.8%'?",
        options: [
          "One particular stock went up 0.8%",
          "The average of India's top 50 listed companies rose 0.8% today",
          "The government announced a 0.8% rate change",
          "Foreign investors made 0.8% profit"
        ],
        correct: 1,
        explanation: "Right. The Nifty 50 is an index — a weighted average of 50 large companies. Its movement reflects the broad market mood."
      }
    ],
    glossary: [
      { term: "NSE", def: "National Stock Exchange — India's largest stock exchange." },
      { term: "BSE", def: "Bombay Stock Exchange — India's oldest exchange, since 1875." },
      { term: "Nifty 50", def: "Index of India's top 50 companies by size, traded on NSE." },
      { term: "Sensex", def: "Index of 30 large companies, traded on BSE." },
      { term: "Bank Nifty", def: "Nifty Bank index tracking major Indian banking stocks. More volatile than Nifty 50." },
      { term: "Index fund", def: "A fund that simply buys all stocks in an index. Cheap, simple, beats most traders long-term." }
    ]
  },

  6: {
    title: "What a broker does",
    world: 2,
    minutes: 6,
    xp: 25,
    steps: [
      {
        type: "info",
        title: "Your gateway to the market",
        body: `<p>You can't directly trade on NSE or BSE. You need a <strong>broker</strong> — a SEBI-registered middleman who places orders for you.</p>
        <p>When you tap "buy" on Zerodha's app, here's what happens in the next 200 milliseconds:</p>
        <ol>
          <li>Your order goes to Zerodha's servers</li>
          <li>Zerodha forwards it to NSE</li>
          <li>NSE matches you with a seller</li>
          <li>The trade executes</li>
          <li>Money leaves your bank, shares enter your demat account</li>
        </ol>
        <p>Brokers charge a small fee for this. Discount brokers (Zerodha, Dhan, Upstox) charge ₹20 per intraday/F&O trade, ₹0 for delivery. That's it.</p>`
      },
      {
        type: "info",
        title: "What's a demat account?",
        body: `<p>"Demat" = dematerialized. In the old days, shares were paper certificates. Now they're digital records.</p>
        <p>Your demat account is a digital locker for your shares. It's held by a depository (NSDL or CDSL), but accessed through your broker.</p>
        <p>You don't need to worry about the technical details — just know:</p>
        <ul>
          <li>Your shares are safe even if your broker shuts down (they're with the depository, not the broker)</li>
          <li>You only need <em>one</em> demat account to start. Don't open multiple.</li>
          <li>Maintenance charges are small (₹300-500/year for most discount brokers)</li>
        </ul>`
      },
      {
        type: "info",
        title: "Choosing a broker in real life",
        body: `<p>For Indian beginners, Zerodha and Dhan are both popular and reliable. Upstox, Angel One, and Groww are also common. The best broker for you depends on execution quality and your workflow.</p>
        <p>Use this practical checklist:</p>
        <ul>
          <li>Platform stability during volatile days (app + web uptime)</li>
          <li>Order speed and reliability (especially for stop-loss execution)</li>
          <li>Clear charges: brokerage, DP charges, call & trade charges</li>
          <li>Easy reports for taxes (P&L, contract notes, ledger)</li>
          <li>Good support response when something goes wrong</li>
        </ul>
        <div class="key-insight"><strong>Simple start:</strong> pick one SEBI-registered broker, learn the platform deeply, and avoid switching apps every week.</div>`
      },
      {
        type: "quiz",
        question: "If your broker shuts down tomorrow, what happens to your shares?",
        options: [
          "You lose them — that's the risk",
          "They're safe — they're held by the depository (NSDL/CDSL), not the broker",
          "The government takes them over",
          "You have to buy them again"
        ],
        correct: 1,
        explanation: "Your shares live with NSDL or CDSL, which are infrastructure run by SEBI/exchanges. Brokers are just access points. This is why it's safe to use any SEBI-registered broker."
      }
    ],
    glossary: [
      { term: "Broker", def: "A SEBI-licensed company that places your stock orders on the exchange." },
      { term: "Demat account", def: "A digital account that holds your shares electronically." },
      { term: "Depository", def: "NSDL or CDSL — institutions that actually store your shares." },
      { term: "Trading platform", def: "The broker app/web terminal (for example Kite or Dhan) used to place and manage orders." },
      { term: "SEBI", def: "Securities and Exchange Board of India — the market regulator." }
    ]
  },

  7: {
    title: "Order types: market vs limit",
    world: 2,
    minutes: 7,
    xp: 25,
    steps: [
      {
        type: "info",
        title: "Two ways to ask for a stock",
        body: `<h3>Market order</h3>
        <p>"Buy me this stock at whatever the current price is, right now."</p>
        <p>Fast, guaranteed to fill. But you have no control over the price you get — especially in fast-moving stocks.</p>
        <h3>Limit order</h3>
        <p>"Buy this stock only if the price is ₹500 or lower."</p>
        <p>Slower (might never fill), but you control your entry price exactly.</p>
        <div class="key-insight"><strong>Beginner rule:</strong> always use <em>limit</em> orders. Market orders can give you nasty surprises in volatile stocks. Spend 5 extra seconds, save yourself 5% slippage.</div>`
      },
      {
        type: "info",
        title: "Stop-loss orders",
        body: `<p>This is the most important order type. Memorize it.</p>
        <p>A <strong>stop-loss</strong> is a pre-set order that says: "If this stock falls to ₹X, sell it automatically."</p>
        <p>Why this matters: it removes the emotion. When a stock you love starts falling, you'll be tempted to "wait, it'll bounce back." That's how 5% losses become 50% losses.</p>
        <blockquote>The stop-loss is the seatbelt of trading. Use it on every single trade. No exceptions.</blockquote>`
      },
      {
        type: "info",
        title: "Intraday vs Delivery",
        body: `<p>When you place an order, you choose:</p>
        <ul>
          <li><strong>Delivery (CNC):</strong> you intend to keep the shares. They go into your demat. You can hold for years.</li>
          <li><strong>Intraday (MIS):</strong> you must close the position by 3:20 PM the same day. Higher leverage, but the broker forces you to exit.</li>
        </ul>
        <p>Intraday looks tempting because of leverage (you can trade ₹50,000 worth of stock with just ₹10,000). But:</p>
        <div class="key-insight"><strong>SEBI data 2024-25:</strong> 91% of individual F&O traders lost money. Intraday is similar. Leverage cuts both ways — viciously.</div>
        <p>Beginners: stick with delivery (CNC) for at least the first 6 months.</p>`
      },
      {
        type: "info",
        title: "Order tools you'll actually use",
        body: `<p>Three practical tools most Indian traders use quickly:</p>
        <ul>
          <li><strong>GTT (Good Till Triggered):</strong> useful for planned entries/exits when you're not watching screens all day</li>
          <li><strong>AMO (After Market Order):</strong> place orders after market hours for next day execution</li>
          <li><strong>Alerts:</strong> set price alerts in TradingView/Kite/Dhan so you act on setups, not random checking</li>
        </ul>
        <p>These tools reduce impulsive trades and help you follow your written strategy.</p>`
      },
      {
        type: "quiz",
        question: "You want to buy Reliance at ₹2,800 or lower. The current price is ₹2,820. Which order type?",
        options: [
          "Market order (buy now)",
          "Limit order at ₹2,800",
          "Stop-loss order",
          "Intraday order"
        ],
        correct: 1,
        explanation: "Limit order at ₹2,800. The order will only execute if the price drops to your level. You control entry."
      }
    ],
    glossary: [
      { term: "Market order", def: "Buy/sell at current market price, immediately." },
      { term: "Limit order", def: "Buy/sell only at your specified price or better." },
      { term: "Stop-loss", def: "An automatic sell order that triggers if price falls to a danger level. Always use one." },
      { term: "Delivery / CNC", def: "Buy and keep the stock in your demat. No time pressure." },
      { term: "GTT", def: "Good Till Triggered order — condition-based order that remains active until triggered or cancelled." },
      { term: "AMO", def: "After Market Order — order placed after market hours for the next session." },
      { term: "Intraday / MIS", def: "Must square off the same day. Higher leverage but riskier. Avoid as a beginner." }
    ]
  },

  8: {
    title: "What it costs to trade",
    world: 2,
    minutes: 5,
    xp: 25,
    steps: [
      {
        type: "info",
        title: "The hidden taxes on every trade",
        body: `<p>Every time you buy or sell, you pay a stack of small charges. Most beginners ignore these, then wonder why their "profitable" strategy doesn't actually make money.</p>
        <p>Here's what you pay on a typical ₹10,000 delivery trade:</p>
        <ul>
          <li><strong>Brokerage:</strong> ₹0 (delivery) or ₹20 (intraday/F&O)</li>
          <li><strong>STT (Securities Transaction Tax):</strong> 0.1% on buy + sell = ₹20</li>
          <li><strong>Exchange charges:</strong> ~0.003% = ₹0.30</li>
          <li><strong>GST:</strong> 18% on brokerage + exchange = ~₹3</li>
          <li><strong>Stamp duty:</strong> 0.015% on buy = ₹1.50</li>
          <li><strong>SEBI charges:</strong> tiny, ~₹0.01</li>
          <li><strong>DP charges (delivery sell):</strong> ~₹16</li>
        </ul>
        <p><strong>Total: ~₹40-60 round trip on ₹10,000.</strong> That's about 0.5%.</p>`
      },
      {
        type: "info",
        title: "Why this matters more than you think",
        body: `<p>If you trade frequently, costs compound. A trader who makes 100 trades a year, with 0.5% costs each, gives up 50% of the trade value to costs. That's brutal.</p>
        <div class="key-insight"><strong>The math:</strong> for short-term trading to be profitable, your strategy needs to consistently beat its own transaction costs. Many "profitable looking" backtests forget this and break in real life.</div>
        <p>For long-term investing (holding 5+ years), costs are negligible. One more reason long-term wins for most people.</p>`
      },
      {
        type: "quiz",
        question: "You make 200 trades a year, each turning over ₹10,000. Roughly how much do you pay in costs per year?",
        options: [
          "₹100 — almost nothing",
          "₹1,000 — small price",
          "~₹10,000 — that's the cost of being active",
          "Free, brokers don't charge anything"
        ],
        correct: 2,
        explanation: "200 trades × ~₹50 round trip = ~₹10,000. Active trading isn't free. Your strategy must beat this just to break even."
      }
    ],
    glossary: [
      { term: "STT", def: "Securities Transaction Tax — paid to the government on every buy/sell." },
      { term: "Brokerage", def: "Fee charged by your broker per trade. Discount brokers: ₹0 delivery, ₹20 intraday/F&O." },
      { term: "DP charges", def: "Charged when you sell from your demat account. ~₹16 per stock." },
      { term: "Round trip cost", def: "Total cost of one buy + one sell. Roughly 0.3-0.5% for retail." }
    ]
  },

  // ─── WORLD 3: Risk Management ───
  9: {
    title: "Why most traders fail",
    world: 3,
    minutes: 7,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "The number that should scare you",
        body: `<p>SEBI did a study of every individual F&O trader in India for FY24-25. Here's what they found:</p>
        <ul>
          <li><strong>91% lost money</strong></li>
          <li>Average loss: <strong>₹1.1 lakh per person</strong></li>
          <li>Top 3.5% of loss-makers lost <strong>₹28 lakh each</strong></li>
        </ul>
        <p>This isn't because they were stupid. Many were smart, educated people. They lost for one core reason:</p>
        <div class="key-insight"><strong>They didn't manage risk.</strong> They were focused on what stock to buy, not on how much they could afford to lose.</div>`
      },
      {
        type: "info",
        title: "The shift in mindset",
        body: `<p>Beginners think: <em>"What stock should I buy to make money?"</em></p>
        <p>Survivors think: <em>"How much can I afford to lose if I'm wrong, and is the potential reward worth that risk?"</em></p>
        <p>This is the most important shift in your entire trading journey. Make it now.</p>
        <blockquote>You're not a stock picker. You're a risk manager who happens to pick stocks.</blockquote>
        <p>Every world after this builds on this idea. If risk management bores you, you'll lose money. If it fascinates you, you have a chance.</p>`
      },
      {
        type: "quiz",
        question: "You're about to enter a trade. What's the FIRST question to ask?",
        options: [
          "How much can I make if I'm right?",
          "How much will I lose if I'm wrong, and where will I exit?",
          "What's everyone else doing?",
          "Is this stock going up?"
        ],
        correct: 1,
        explanation: "Defense first. If your downside is unlimited or unknown, no upside is worth it. Survivors ALWAYS know their exit before they enter."
      }
    ],
    glossary: [
      { term: "Risk management", def: "The discipline of controlling losses. The most important skill in trading." }
    ]
  },

  10: {
    title: "The 1% rule",
    world: 3,
    minutes: 6,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "The single most important rule",
        body: `<p>Here it is: <strong>never risk more than 1-2% of your capital on any single trade.</strong></p>
        <p>If your trading capital is ₹50,000:</p>
        <ul>
          <li>1% = ₹500 max loss per trade</li>
          <li>2% = ₹1,000 max loss per trade</li>
        </ul>
        <p>That's the maximum loss you'd take if your stop-loss hits. Not the position size — the loss.</p>`
      },
      {
        type: "info",
        title: "Why this number?",
        body: `<p>Imagine a coin-flip game where you risk 50% of your capital each time. If you lose twice in a row (flip two tails — happens 25% of the time), you've lost 75%. You're nearly out.</p>
        <p>Now risk 1%. To lose 50% of your capital, you need to lose 50 times in a row. With even an okay strategy, that's almost impossible.</p>
        <div class="key-insight"><strong>The math of survival:</strong> at 1% risk per trade with a 50% win rate, your probability of losing your account is essentially zero. At 10% risk per trade, you'll blow up within 6 months almost certainly.</div>`
      },
      {
        type: "info",
        title: "How to actually use it",
        body: `<p>Say you want to buy Reliance at ₹2,800. You set your stop-loss at ₹2,720 (₹80 risk per share).</p>
        <p>Your capital: ₹50,000. Your 1% risk: ₹500.</p>
        <p>Position size = ₹500 / ₹80 per share = <strong>6 shares</strong>.</p>
        <p>Total trade size: 6 × ₹2,800 = ₹16,800. Maximum loss: ₹500 (1%).</p>
        <p>This is the calculation you do <em>before every trade</em>. We'll build a calculator together.</p>`
      },
      {
        type: "quiz",
        question: "Capital: ₹1,00,000. Stock entry: ₹500. Stop-loss: ₹480. Using the 1% rule, how many shares?",
        options: [
          "200 shares",
          "100 shares",
          "50 shares",
          "10 shares"
        ],
        correct: 2,
        explanation: "1% of ₹1,00,000 = ₹1,000 max loss. Risk per share = ₹500 - ₹480 = ₹20. Shares = ₹1,000 / ₹20 = 50."
      }
    ],
    glossary: [
      { term: "Position sizing", def: "Calculating how many shares to buy based on your risk tolerance and stop-loss distance." },
      { term: "1% rule", def: "Never risk more than 1-2% of your capital on any single trade." }
    ]
  },

  11: {
    title: "Your stop-loss is sacred",
    world: 3,
    minutes: 6,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "The trader's vow",
        body: `<p>Repeat after me: <em>"Once I set my stop-loss, I do not move it. I do not widen it. I do not 'just give it a little more room'."</em></p>
        <p>This is the single most violated rule in trading. Every loser in market history has, at some point, said:</p>
        <ul>
          <li>"It'll bounce back, I'll just hold a bit longer"</li>
          <li>"My stop is too tight, let me give it some breathing room"</li>
          <li>"This is a great long-term company anyway, I'll just hold"</li>
        </ul>
        <p>This is how a 2% loss becomes a 20% loss becomes a 50% loss.</p>`
      },
      {
        type: "info",
        title: "Where to place stops",
        body: `<p>A stop-loss should be placed at a price level where, if it's hit, your <em>reason for the trade is invalid</em>.</p>
        <p>Examples:</p>
        <ul>
          <li>You bought because the stock bounced off support at ₹500. Stop = just below ₹500. If it breaks support, your thesis is wrong.</li>
          <li>You bought a breakout above ₹600. Stop = below the breakout level (~₹595). If it falls back, the breakout failed.</li>
        </ul>
        <p>Don't place stops based on what you can <em>afford</em> to lose. Place them based on where the market would tell you you're wrong. Then size the trade to fit your 1% risk budget.</p>`
      },
      {
        type: "info",
        title: "The two stop-loss mistakes",
        body: `<h3>Mistake 1: Mental stop-loss</h3>
        <p>"I'll watch it, and exit if it falls to ₹X." No. You won't. When the moment comes, your brain will lie to you. Place the order with the broker.</p>
        <h3>Mistake 2: Stop too tight</h3>
        <p>If your stop is so close that normal market noise hits it, you'll get stopped out repeatedly with small losses. Use ATR (a volatility measure) — typically 1.5-2× ATR.</p>
        <p>Don't worry about ATR yet — we'll cover it in World 5.</p>`
      },
      {
        type: "quiz",
        question: "Your stop-loss is hit. The stock immediately reverses and goes higher. What did you do wrong?",
        options: [
          "Used a stop-loss — clearly bad idea",
          "Set the stop too tight — got chopped by noise",
          "Nothing wrong — sometimes stops just get hit, that's the cost of survival",
          "Should have moved the stop further away"
        ],
        correct: 2,
        explanation: "This will happen sometimes. It's the price of having stops at all. The alternative — no stops — kills accounts. Accept the occasional whipsaw."
      }
    ],
    glossary: [
      { term: "Whipsaw", def: "When your stop is hit and the price immediately reverses. Annoying but unavoidable cost of using stops." },
      { term: "Mental stop", def: "An unenforced 'I'll exit if...' plan. Doesn't work. Always place real stop-loss orders." }
    ]
  },

  12: {
    title: "Risk vs Reward",
    world: 3,
    minutes: 6,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "The R-multiple",
        body: `<p>"R" stands for your risk on a trade. If you risk ₹500, that trade is worth 1R for you.</p>
        <p>Your potential reward should be at least 2R (₹1,000) — better, 3R or more.</p>
        <p>Why? Because you'll be wrong sometimes. If you're right 50% of the time and your winners are 2× your losers, you make money:</p>
        <ul>
          <li>5 wins × +2R = +10R</li>
          <li>5 losses × -1R = -5R</li>
          <li>Net: +5R, profit</li>
        </ul>`
      },
      {
        type: "info",
        title: "Expectancy",
        body: `<p>Expectancy = (Win rate × Avg win) - (Loss rate × Avg loss)</p>
        <p>If your expectancy per trade is positive, you make money over many trades. If negative, you lose, no matter how confident you feel.</p>
        <div class="key-insight"><strong>Wild fact:</strong> a strategy with 30% win rate can be very profitable, if winners are 4× losers. A strategy with 80% win rate can lose money, if losses are 5× winners. Win rate alone tells you almost nothing.</div>
        <p>This is why "I'm right 70% of the time!" doesn't mean you're profitable. It depends entirely on the size of your wins vs your losses.</p>`
      },
      {
        type: "quiz",
        question: "You win 40% of trades. Avg winner: ₹2,000. Avg loser: ₹500. Per trade expectancy?",
        options: [
          "Negative — you should change strategy",
          "Positive ₹500 per trade",
          "Positive ₹50 per trade",
          "Need more info"
        ],
        correct: 1,
        explanation: "(0.4 × 2000) - (0.6 × 500) = 800 - 300 = ₹500 expected value per trade. Even with a 40% win rate, big winners + small losers = profit."
      }
    ],
    glossary: [
      { term: "R-multiple", def: "Multiple of your initial risk. A 2R win means you made 2× what you risked." },
      { term: "Expectancy", def: "Average profit/loss per trade over many trades. Must be positive long-term." },
      { term: "Risk:Reward ratio", def: "Potential loss vs potential gain. Aim for 1:2 or better." }
    ]
  },

  13: {
    title: "Build your risk rules",
    world: 3,
    minutes: 7,
    xp: 40,
    steps: [
      {
        type: "info",
        title: "Time to write your own rules",
        body: `<p>This is a doing-quest, not a reading-quest. By the end, you'll have a written rules document. Print it. Stick it above your screen.</p>
        <p>Your rules should cover:</p>
        <ol>
          <li><strong>Risk per trade</strong> (1% or 2%?)</li>
          <li><strong>Maximum daily loss</strong> (3% of capital? Stop trading for the day if hit)</li>
          <li><strong>Maximum weekly loss</strong> (6% of capital? Stop for the week if hit)</li>
          <li><strong>Maximum concurrent positions</strong> (3? 5? Don't go beyond what you can monitor)</li>
          <li><strong>Maximum position size</strong> (max 20-25% of capital in one stock)</li>
          <li><strong>Mandatory stop-loss</strong> (yes, on every trade, no exceptions)</li>
        </ol>`
      },
      {
        type: "info",
        title: "Write yours now",
        body: `<p>Open Notes / Google Docs / Notion. Write today, in your own words:</p>
        <blockquote>"My trading rules, [Date]:<br>
        I will risk no more than ___% per trade.<br>
        If I lose ___% in a day, I stop trading until tomorrow.<br>
        If I lose ___% in a week, I stop until next Monday.<br>
        I will hold a maximum of ___ open positions.<br>
        No single position will be more than ___% of my capital.<br>
        Every trade will have a stop-loss placed before entry.<br>
        I will not move stops further from entry. Ever.<br>
        I will journal every trade.<br>
        Signed: ____"</blockquote>
        <p>Print and keep it visible. This is your contract with yourself.</p>`
      },
      {
        type: "info",
        title: "Why writing matters",
        body: `<p>In the heat of a losing trade, your brain will negotiate. "Just this once. The rule doesn't apply here. This is special."</p>
        <p>A piece of paper with your handwriting on it cuts through that. It's your sober self talking to your panicked self.</p>
        <div class="key-insight"><strong>Try it:</strong> next time you're tempted to break a rule, read your written rules out loud. Most of the time, you'll calm down.</div>`
      },
      {
        type: "quiz",
        question: "You hit your daily loss limit by 11 AM. Market is volatile, you 'see opportunities' everywhere. What do you do?",
        options: [
          "Trade smaller, since it's a great market",
          "Stop trading completely. The rule is the rule.",
          "Take one more 'good' trade to recover the loss",
          "Move the loss limit up — it was too strict anyway"
        ],
        correct: 1,
        explanation: "STOP. This is exactly the moment when traders blow up. The rule exists for this exact moment. Walk away from the screen. Tomorrow is another day."
      }
    ],
    glossary: [
      { term: "Daily loss limit", def: "A pre-set max loss for one day. Hit it, stop trading until tomorrow." },
      { term: "Trading rules document", def: "Your personal written contract about risk. Update rarely, follow always." }
    ]
  },

  // ─── WORLD 4: Psychology ───
  14: {
    title: "Your brain hates uncertainty",
    world: 4,
    minutes: 6,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "Why humans suck at trading",
        body: `<p>Your brain evolved to survive on the savannah, not to trade markets. Two ancient instincts mess you up:</p>
        <h3>1. Loss aversion</h3>
        <p>You feel the pain of losing ₹1,000 about 2× as strongly as the pleasure of gaining ₹1,000. So you'll do irrational things to avoid losses — like hold a falling stock that's clearly broken.</p>
        <h3>2. Pattern-finding</h3>
        <p>Your brain sees patterns in random noise. You'll see "trends" and "opportunities" that aren't there. You'll feel certain about things that are 50/50.</p>
        <p>Awareness of these biases doesn't fix them. It just helps you notice when they're acting up.</p>`
      },
      {
        type: "info",
        title: "The market doesn't care",
        body: `<p>Here's a freeing truth: <strong>the market doesn't know you exist.</strong></p>
        <p>It doesn't reward you for studying hard. It doesn't punish you for being a good person. It doesn't owe you. Your conviction means nothing to the market.</p>
        <p>This sounds harsh. But it's actually the most calming idea in trading. Once you accept that the market is impersonal:</p>
        <ul>
          <li>A loss isn't a personal attack</li>
          <li>A win isn't validation of your genius</li>
          <li>You can focus on process, not outcomes</li>
        </ul>`
      },
      {
        type: "quiz",
        question: "You took a perfect setup, followed all your rules, and still lost money. How should you feel?",
        options: [
          "Terrible — clearly the strategy is broken",
          "Fine — losses on good trades are part of the game",
          "Angry at the market for being unfair",
          "Determined to never use that strategy again"
        ],
        correct: 1,
        explanation: "This is huge. A losing trade where you followed your rules is a SUCCESSFUL trade in process terms. Outcomes are random in the short term. Process is what compounds."
      }
    ],
    glossary: [
      { term: "Loss aversion", def: "The bias that makes losses feel ~2× more painful than equivalent gains." },
      { term: "Process vs outcome", def: "Process = following your rules. Outcome = win/loss. Reward yourself for good process, not for lucky outcomes." }
    ]
  },

  15: {
    title: "FOMO, revenge trades, and other monsters",
    world: 4,
    minutes: 7,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "Three traps that destroy beginners",
        body: `<h3>1. FOMO (Fear Of Missing Out)</h3>
        <p>A stock is mooning. Everyone on Twitter is rich. You jump in at the top — right before it crashes. The pros sell <em>to</em> the FOMO crowd.</p>
        <p>Cure: pre-decide your watchlist. If a stock isn't on your list, you don't trade it. Period.</p>
        <h3>2. Revenge trading</h3>
        <p>You just took a loss. You're angry. You take a bigger trade to "get it back." It loses bigger. Now you're really angry...</p>
        <p>Cure: walk away from the screen for 30 minutes after any losing trade. Yes, really.</p>
        <h3>3. Overconfidence after wins</h3>
        <p>You've had 5 wins in a row. You're a genius. You size up. The next trade — your largest — wipes out all 5 wins.</p>
        <p>Cure: position size doesn't change based on recent wins or losses. Ever.</p>`
      },
      {
        type: "info",
        title: "The 'one more trade' problem",
        body: `<p>Most blowups don't happen on a single bad trade. They happen when a trader is having a bad day, and tries to "fix it" with one more trade. And another. And another.</p>
        <blockquote>If you wouldn't take this trade tomorrow morning when you're calm, don't take it now.</blockquote>
        <p>This question — "would I take this trade tomorrow?" — has saved more accounts than any indicator ever invented.</p>`
      },
      {
        type: "quiz",
        question: "You just had two losing trades back-to-back. You see a setup that 'looks really good.' What do you do?",
        options: [
          "Take it bigger — to get back what you lost",
          "Skip it. Walk away from the screen for 30 min. If still good after that, smaller size.",
          "Take it normal size, can't let losses scare you",
          "Take a third loss to be sure your strategy is broken"
        ],
        correct: 1,
        explanation: "After back-to-back losses, your judgment is compromised. Step away. The setup will still be there in 30 minutes (or it won't, and you'll thank yourself)."
      }
    ],
    glossary: [
      { term: "FOMO", def: "Fear of missing out — entering a trade because everyone else is, not because of your strategy." },
      { term: "Revenge trade", def: "An emotional trade taken right after a loss to 'get it back.' Almost always loses." }
    ]
  },

  16: {
    title: "The one-month rule",
    world: 4,
    minutes: 5,
    xp: 30,
    steps: [
      {
        type: "info",
        title: "Don't judge yourself too quickly",
        body: `<p>You're going to have great weeks. You're going to have terrible weeks. Both will lie to you about your skill.</p>
        <p>A great week makes you feel like a genius. A bad week makes you feel like an idiot. Neither is true.</p>
        <div class="key-insight"><strong>Rule:</strong> never make strategy changes based on less than a month of data. Single trades, single weeks — they're noise. A month of trades is signal.</div>`
      },
      {
        type: "info",
        title: "What to track instead",
        body: `<p>Don't obsess over P&L day to day. Track these instead:</p>
        <ul>
          <li><strong>Rules followed?</strong> Did you stick to your written rules today? Yes/No.</li>
          <li><strong>Stop-loss placed?</strong> Every trade?</li>
          <li><strong>Trades journaled?</strong></li>
          <li><strong>Daily loss limit respected?</strong></li>
        </ul>
        <p>Aim for 100% on these process metrics, every single day. Outcomes will follow.</p>`
      },
      {
        type: "quiz",
        question: "You had your worst trading day ever. What's the right reaction?",
        options: [
          "Quit trading forever",
          "Double down tomorrow to recover",
          "Walk away. Journal what happened. No changes for 30 days.",
          "Switch to a new strategy that won't lose"
        ],
        correct: 2,
        explanation: "One bad day proves nothing. The post-loss period is when you're most likely to make decisions you'll regret. Pause. Journal. Don't change anything."
      }
    ],
    glossary: [
      { term: "Process metrics", def: "Things you control: rule-following, journaling, stop placement. Track these instead of P&L." }
    ]
  },

  // ─── WORLD 5: Charts ───
  17: {
    title: "Reading a chart",
    world: 5,
    minutes: 7,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "What's a candlestick?",
        body: `<p>A candle on a chart shows you 4 numbers for a time period (e.g., 1 day):</p>
        <ul>
          <li><strong>Open:</strong> price at start of day</li>
          <li><strong>Close:</strong> price at end of day</li>
          <li><strong>High:</strong> highest price during the day</li>
          <li><strong>Low:</strong> lowest price during the day</li>
        </ul>
        <p>If close > open, candle is green (price went up that day). If close < open, candle is red (price went down).</p>
        <p>The thick part is open-to-close (the "body"). The thin lines (wicks) show the high and low.</p>`
      },
      {
        type: "info",
        title: "What candles tell you",
        body: `<p>One candle = a snapshot of one day's battle between buyers and sellers.</p>
        <ul>
          <li><strong>Long green body, small wicks</strong> = buyers won decisively. Strong day.</li>
          <li><strong>Long red body, small wicks</strong> = sellers crushed it.</li>
          <li><strong>Tiny body, long wicks</strong> = indecision. Buyers and sellers fought to a draw.</li>
          <li><strong>Long lower wick, body at top</strong> = sellers tried to push down, but buyers rejected and pushed back up. Bullish signal.</li>
        </ul>
        <p>Don't memorize 50 patterns. Just understand: candles show you who's winning today's battle.</p>`
      },
      {
        type: "quiz",
        question: "You see a green candle with a tiny body and a very long lower wick. What's the most likely interpretation?",
        options: [
          "Sellers in full control — bearish",
          "Sellers tried to push price down, but buyers overpowered them — possibly bullish",
          "Random noise, no signal",
          "Stock will fall tomorrow for sure"
        ],
        correct: 1,
        explanation: "Long lower wick = price went down, but came back up. Body is green = closed above open. Buyers fought back hard. Often (not always) signals reversal."
      }
    ],
    glossary: [
      { term: "Candlestick", def: "A chart marker showing open, high, low, close for a time period." },
      { term: "Body / Wick", def: "Body = open-to-close. Wicks (or shadows) = the high and low extremes." }
    ]
  },

  18: {
    title: "Trends and trendlines",
    world: 5,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "The trend is your friend",
        body: `<p>A stock is in one of three states:</p>
        <ul>
          <li><strong>Uptrend:</strong> series of higher highs and higher lows. Demand &gt; supply.</li>
          <li><strong>Downtrend:</strong> lower highs, lower lows. Supply &gt; demand.</li>
          <li><strong>Sideways/Range:</strong> bouncing between two levels.</li>
        </ul>
        <p>Most traders' biggest mistake: trying to catch the bottom of a downtrend ("it can't go lower!") or shorting an uptrend ("it can't go higher!").</p>
        <div class="key-insight"><strong>Rule of thumb:</strong> trade <em>with</em> the trend, not against it. It's harder than it sounds.</div>`
      },
      {
        type: "info",
        title: "Identifying trends",
        body: `<p>Two ways to spot a trend:</p>
        <h3>1. Visual</h3>
        <p>Zoom out. Look at 6-month or 1-year chart. Higher highs, higher lows = uptrend. Just visual pattern matching.</p>
        <h3>2. Moving Average</h3>
        <p>A 50-day moving average smooths out the noise. If price is consistently <em>above</em> the 50DMA, it's in uptrend. Below, downtrend.</p>
        <p>Don't overcomplicate. One moving average is enough for most beginners.</p>`
      },
      {
        type: "quiz",
        question: "A stock has been making lower lows for 3 months. You think it's 'cheap' and 'has to bounce.' What's the smart move?",
        options: [
          "Buy now — bargains don't last",
          "Wait. Let the trend reverse first. Falling stocks can fall a lot more than you'd think.",
          "Short it for sure",
          "Buy and hold for years"
        ],
        correct: 1,
        explanation: "The graveyard of trading is full of people who 'caught the falling knife.' Wait for actual evidence of a reversal — a higher low, then a higher high — before buying."
      }
    ],
    glossary: [
      { term: "Uptrend / Downtrend", def: "Series of higher highs/lows or lower highs/lows. Trade with the trend." },
      { term: "Moving average", def: "Average price over N days, plotted as a line. Smooths out noise to show trend." },
      { term: "50DMA", def: "50-day moving average. A common trend indicator." }
    ]
  },

  19: {
    title: "Support and resistance",
    world: 5,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "Invisible floors and ceilings",
        body: `<p>Every stock has price levels where, historically, lots of buying or selling happens:</p>
        <ul>
          <li><strong>Support:</strong> a level where buyers consistently step in. The "floor."</li>
          <li><strong>Resistance:</strong> a level where sellers consistently appear. The "ceiling."</li>
        </ul>
        <p>These aren't magical lines. They exist because:</p>
        <ul>
          <li>People remember "Reliance was a great buy at ₹2,500 last time" — and buy again at ₹2,500</li>
          <li>People who lost money when it last fell from ₹3,000 — sell when it returns to ₹3,000</li>
        </ul>`
      },
      {
        type: "info",
        title: "How to use them",
        body: `<p>Two basic strategies:</p>
        <h3>1. Buy at support, sell at resistance (range-trading)</h3>
        <p>Works in sideways markets. Stop-loss just below support. Target: resistance.</p>
        <h3>2. Buy a breakout (above resistance)</h3>
        <p>When price breaks resistance with high volume, it often runs further. Stop just below the broken level.</p>
        <div class="key-insight"><strong>Common rookie mistake:</strong> chasing the breakout 5% after it's already moved. By then, the easy money is gone. Wait for retests.</div>`
      },
      {
        type: "quiz",
        question: "Reliance has bounced off ₹2,800 four times in 6 months. What's the best interpretation?",
        options: [
          "Random — chart patterns don't work",
          "₹2,800 is meaningful support; if price returns there, watch for a 5th bounce",
          "Reliance will never go below ₹2,800 again",
          "Sell immediately, the bounce can't last"
        ],
        correct: 1,
        explanation: "Levels that hold multiple times are more meaningful. Doesn't guarantee they hold forever — when they break, they break — but they're worth watching."
      }
    ],
    glossary: [
      { term: "Support", def: "A price level where buying tends to emerge. The 'floor.'" },
      { term: "Resistance", def: "A price level where selling tends to emerge. The 'ceiling.'" },
      { term: "Breakout", def: "When price decisively crosses above resistance (or below support). Often signals a continuation." }
    ]
  },

  20: {
    title: "Chart hours: the only shortcut",
    world: 5,
    minutes: 6,
    xp: 40,
    steps: [
      {
        type: "info",
        title: "There's no replacement for chart time",
        body: `<p>You can't learn to read charts from videos. You learn by looking at thousands of charts and noticing patterns.</p>
        <p>Here's an exercise:</p>
        <ol>
          <li>Open TradingView (free)</li>
          <li>Look up any Nifty 50 stock — say, Reliance</li>
          <li>Look at the daily chart for the past year</li>
          <li>Spend 2 minutes: identify the trend, mark 2 supports, 2 resistances</li>
          <li>Repeat for 10 different stocks</li>
        </ol>
        <p>Do this every day for a few weeks. After 100 charts, your brain starts seeing patterns automatically. There's no shortcut for this. It's pattern recognition, and pattern recognition needs reps.</p>`
      },
      {
        type: "info",
        title: "What to ignore (for now)",
        body: `<p>You'll see traders use 47 indicators. Most are noise. For your first year, ignore:</p>
        <ul>
          <li>Bollinger Bands</li>
          <li>MACD</li>
          <li>Stochastics</li>
          <li>Fibonacci retracements</li>
          <li>Elliott Waves</li>
          <li>Ichimoku Cloud</li>
        </ul>
        <p>Use these only:</p>
        <ul>
          <li>Price (candles)</li>
          <li>One moving average (50DMA)</li>
          <li>Volume</li>
          <li>Support/resistance you draw yourself</li>
          <li>RSI (optional, for momentum)</li>
        </ul>
        <p>You'd be surprised how far these alone get you.</p>`
      },
      {
        type: "quiz",
        question: "Your friend says 'I use 8 indicators on every chart and still lose money.' What's likely wrong?",
        options: [
          "They need a 9th indicator",
          "Indicator overload — they're seeing contradictory signals everywhere and ignoring price",
          "Their broker is scamming them",
          "Indicators don't work for retail traders"
        ],
        correct: 1,
        explanation: "More indicators = more noise = more confusion. Pros use 1-3 max. Indicators are derivatives of price; the price itself is the most important info."
      }
    ],
    glossary: [
      { term: "Volume", def: "Number of shares traded. High volume on a move = conviction. Low volume = doubt." },
      { term: "RSI", def: "Relative Strength Index — measures momentum 0-100. Above 70 = overbought, below 30 = oversold." }
    ]
  },

  // ─── WORLD 6: Fundamentals ───
  21: {
    title: "Is this a real business?",
    world: 6,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "The smell test",
        body: `<p>Before you trade ANY stock, ask: is this a real, healthy business?</p>
        <p>Many penny stocks aren't. They're shells used for pump-and-dumps. Indian markets have thousands of these. They lure beginners with cheap prices ("only ₹10 a share!") and disappear with their money.</p>
        <p>5-second smell tests:</p>
        <ul>
          <li>Market cap above ₹10,000 cr? (Established company)</li>
          <li>Listed in NSE F&O list, or in Nifty 500? (Real liquidity)</li>
          <li>Has been listed for 5+ years? (Track record)</li>
          <li>Revenue actually growing over years? (Real business)</li>
          <li>Has positive cash flow? (Not just losing money)</li>
        </ul>`
      },
      {
        type: "info",
        title: "Where to check",
        body: `<p>Two free, excellent tools:</p>
        <h3>Screener.in</h3>
        <p>Look up any stock. See 10-year financials, ratios, news. The cleanest fundamentals tool for India.</p>
        <h3>Tickertape</h3>
        <p>Similar, with a friendlier UI. Good for beginners.</p>
        <p>Both free. Both essential. Bookmark them.</p>
        <div class="key-insight"><strong>Rule:</strong> if a stock isn't on Screener.in or you can't easily find its financials, don't trade it. Period.</div>`
      },
      {
        type: "quiz",
        question: "A YouTube channel recommends 'XYZ Industries' at ₹15. Market cap: ₹200 crore. Listed 2022. No revenue growth. What do you do?",
        options: [
          "Buy a small position to test",
          "Skip. This is exactly the kind of stock used in pump-and-dumps.",
          "Invest your savings, it's cheap",
          "Borrow money to buy more"
        ],
        correct: 1,
        explanation: "Tiny mcap + recent listing + no revenue growth + free YouTube tip = textbook pump-and-dump setup. Stick to large, liquid, growing companies."
      }
    ],
    glossary: [
      { term: "Market cap", def: "Total value of a company's shares. Mcap = price × shares outstanding." },
      { term: "Penny stock", def: "Low-priced stock, often of shaky companies. High pump-and-dump risk." },
      { term: "Pump-and-dump", def: "Scam where operators inflate a stock with fake hype, then sell to retail buyers as it crashes." }
    ]
  },

  22: {
    title: "Three numbers that matter",
    world: 6,
    minutes: 7,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "You don't need to be a CFA",
        body: `<p>You don't need to read every line of a balance sheet. Three numbers tell you most of what you need:</p>
        <h3>1. Revenue growth (5-10 year)</h3>
        <p>Is the company actually growing? On Screener.in, look at the "Sales" growth rate. Healthy: 10%+ per year. Stagnant or declining: red flag.</p>
        <h3>2. ROCE (Return on Capital Employed)</h3>
        <p>How efficiently does the company use its money? A good ROCE is 15%+. Below 10% = the company can't generate good returns on what it has.</p>
        <h3>3. Debt-to-Equity</h3>
        <p>How much debt does the company carry? Below 0.5 = healthy. Above 1 = risky (especially in tough times). Above 2 = danger.</p>`
      },
      {
        type: "info",
        title: "A 30-second framework",
        body: `<p>Open Screener.in, search a stock. In 30 seconds:</p>
        <ol>
          <li>Revenue growing 10%+ per year? ✓ or ✗</li>
          <li>ROCE above 15%? ✓ or ✗</li>
          <li>Debt-to-equity below 0.5? ✓ or ✗</li>
        </ol>
        <p>3 ✓ = solid business. Trade with confidence.</p>
        <p>2 ✓ = okay business. Trade carefully.</p>
        <p>1 or 0 ✓ = problematic. Skip unless you really know what you're doing.</p>
        <div class="key-insight"><strong>Note:</strong> banks and financials use different ratios. For them, look at NPAs, NIM, CASA. Beyond beginner scope.</div>`
      },
      {
        type: "quiz",
        question: "You check a stock: Revenue growing 4%/yr, ROCE 8%, Debt-to-Equity 1.8. Your verdict?",
        options: [
          "Solid all-round business",
          "Buy because the price is low",
          "Slow growth + low capital efficiency + high debt = avoid",
          "Wait until the price drops more"
        ],
        correct: 2,
        explanation: "Three red flags: poor growth, weak capital returns, high debt. The price may be 'cheap' for a reason. Cheap stocks often get cheaper."
      }
    ],
    glossary: [
      { term: "Revenue / Sales", def: "Total money the company brings in. Growth indicates real demand for the business." },
      { term: "ROCE", def: "Return on Capital Employed. Measures efficiency. 15%+ is good." },
      { term: "Debt-to-Equity", def: "How much debt vs how much shareholder money. Lower = safer." }
    ]
  },

  23: {
    title: "Good business, wrong price",
    world: 6,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "P/E — the simplest valuation",
        body: `<p>P/E = Price / Earnings (per share).</p>
        <p>If a company earns ₹10 per share and trades at ₹200, its P/E is 20. You're paying ₹20 for every ₹1 the company earns.</p>
        <p>Rough rules:</p>
        <ul>
          <li>P/E under 15: cheap (or the company has problems)</li>
          <li>P/E 15-25: reasonable</li>
          <li>P/E 25-40: expensive (priced for growth)</li>
          <li>P/E above 50: very expensive (or zero current earnings)</li>
        </ul>`
      },
      {
        type: "info",
        title: "Why even great companies can be bad trades",
        body: `<p>HDFC Bank is a fantastic business. But if you bought it at a P/E of 35 in 2020, your returns over the next 3 years would have been mediocre — even though the business kept growing.</p>
        <p>Why? You overpaid. Future growth was already priced in.</p>
        <div class="key-insight"><strong>The principle:</strong> a great business is only a great trade at a reasonable price. Quality matters. Price matters. You need both.</div>
        <p>Conversely, a mediocre business at a very cheap price can sometimes be a great trade — but only if you understand <em>why</em> it's cheap.</p>`
      },
      {
        type: "quiz",
        question: "Reliance Industries has P/E 28 today. Average for past 10 years: 18. What does this hint at?",
        options: [
          "Reliance is a great buy right now",
          "Reliance is currently expensive vs its own history; high expectations are baked in",
          "P/E doesn't matter for big companies",
          "P/E should always go up"
        ],
        correct: 1,
        explanation: "When a stock's P/E is well above its long-term average, the market expects strong future growth. If that growth disappoints, returns can be poor even from a great business."
      }
    ],
    glossary: [
      { term: "P/E ratio", def: "Price-to-Earnings. How much you're paying per ₹1 of company earnings. Lower = cheaper." },
      { term: "Valuation", def: "Whether a stock is cheap, fair, or expensive vs its earnings/assets/peers." }
    ]
  },

  // ─── WORLD 7: Paper Trading ───
  24: {
    title: "Welcome to paper trading",
    world: 7,
    minutes: 7,
    xp: 40,
    steps: [
      {
        type: "info",
        title: "Practice without losing money",
        body: `<p>Before risking real rupees, you'll trade with fake ones. This is called paper trading.</p>
        <p>Don't dismiss it. Paper trading does three crucial things:</p>
        <ol>
          <li>Tests your strategy without real cost</li>
          <li>Reveals where you panic, hesitate, or break rules</li>
          <li>Builds the routine of placing orders, journaling, reviewing</li>
        </ol>
        <p>The number one reason traders skip this step: ego. "I already know what to do." 91% of those traders lose money. Don't be them.</p>`
      },
      {
        type: "info",
        title: "Where to paper trade",
        body: `<p>Three free options for India:</p>
        <ul>
          <li><strong>TradingView paper trading</strong> — built into the charts you're already using. Easiest.</li>
          <li><strong>Sensibull virtual trading</strong> — best if you eventually want options. Realistic Indian fills.</li>
          <li><strong>Moneybhai by Moneycontrol</strong> — full simulated broker.</li>
        </ul>
        <p>Pick one. Stick with it. Don't switch around.</p>`
      },
      {
        type: "info",
        title: "Your first 'rules of paper trading'",
        body: `<ul>
          <li>Use the same capital amount you'd actually trade with (e.g., ₹50,000)</li>
          <li>Apply the 1% rule on every trade</li>
          <li>Place actual stop-loss orders</li>
          <li>Journal every trade in this app's Journal section</li>
          <li>Be honest — record losses fully, don't pretend the bad ones didn't happen</li>
        </ul>
        <p>Your Journal feature in this app is ready. We'll use it from quest 25 onwards.</p>
        <p>Goal: <strong>50 paper trades over 6-8 weeks</strong>. Then we evaluate.</p>`
      },
      {
        type: "quiz",
        question: "You start paper trading. Why is it important to use the SAME capital amount you'd trade with for real?",
        options: [
          "To make it more exciting",
          "Because position sizing depends on capital — practicing with ₹10 lakh when you'll actually trade with ₹50k teaches you the wrong habits",
          "Brokers require it",
          "It doesn't matter, paper trading is fake anyway"
        ],
        correct: 1,
        explanation: "The point of paper trading is to practice exactly what you'll do live. Wrong capital = wrong sizing = wrong habits. Make it as realistic as possible."
      }
    ],
    glossary: [
      { term: "Paper trading", def: "Practicing trades with fake money. Essential before going live." }
    ]
  },

  25: {
    title: "Place your first paper trade",
    world: 7,
    minutes: 10,
    xp: 50,
    steps: [
      {
        type: "info",
        title: "Today's mission",
        body: `<p>Place your first paper trade and log it in this app. Steps:</p>
        <ol>
          <li>Open TradingView (or your chosen platform)</li>
          <li>Pick a Nifty 50 stock you've already studied</li>
          <li>Identify a clean setup: support bounce, breakout, or moving average pullback</li>
          <li>Calculate position size using 1% risk rule</li>
          <li>Place the paper trade with stop-loss</li>
          <li>Open the Journal tab in this app and log it</li>
        </ol>
        <p>This single action — logging your first trade — earns you the Paper Trader badge.</p>`
      },
      {
        type: "info",
        title: "What your trade entry should include",
        body: `<p>For each trade, your journal needs:</p>
        <ul>
          <li>Symbol and date</li>
          <li>Entry price</li>
          <li>Stop-loss (always)</li>
          <li>Target (if you have one)</li>
          <li>Quantity</li>
          <li><strong>Reason for entry</strong> — in plain English. "Bounce off 50DMA support, RSI just turned up." Not "felt like it."</li>
          <li>Emotion: 1 (calm) to 10 (stressed)</li>
        </ul>
        <p>The "reason for entry" field is the most valuable part of your journal. After 50 trades, you'll see which reasons actually predict winners.</p>`
      },
      {
        type: "info",
        title: "Open the Journal tab now",
        body: `<p>Click "Journal" in the left nav. Click "+ Log a trade." Fill in your first trade.</p>
        <p>This quest is complete when your first trade is logged. No quiz today. Doing > knowing.</p>
        <div class="key-insight"><strong>The shift:</strong> from "I'm reading about trading" to "I'm trading." From here, every quest pairs with real practice.</div>`
      }
    ],
    glossary: []
  },

  26: {
    title: "Reviewing trades that lost",
    world: 7,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "Losses are tuition",
        body: `<p>Every trader has losing trades. The question is what you do with them.</p>
        <p>For each losing trade, ask:</p>
        <ol>
          <li><strong>Did I follow my rules?</strong> If yes → losing trade with good process. Move on. This is fine.</li>
          <li><strong>Did I break a rule?</strong> If yes → which one? When? Why?</li>
          <li><strong>Was my entry reason actually valid in hindsight?</strong></li>
          <li><strong>Was my stop-loss too tight, too loose, or correctly placed?</strong></li>
        </ol>
        <p>Honesty matters. The journal isn't to make you feel good. It's to make you a better trader.</p>`
      },
      {
        type: "info",
        title: "Three common patterns",
        body: `<p>After 30+ trades, look for patterns in your losses. The big three are:</p>
        <h3>1. Stop-losses too tight</h3>
        <p>"I keep getting stopped out, then the stock goes back up." Solution: use ATR-based stops, or place stops below recent swing lows.</p>
        <h3>2. Taking too many setups</h3>
        <p>"I traded 25 times this week." Solution: pick fewer, better setups. Patience is an edge.</p>
        <h3>3. Entries too early</h3>
        <p>"I bought at the bottom of a 10% drop, but it went down another 15%." Solution: wait for confirmation. A higher low first, then enter.</p>`
      },
      {
        type: "quiz",
        question: "Looking back at your last 10 paper trades, you find you broke your stop-loss rule on 4 of them. What's the right action?",
        options: [
          "Keep trading, you're learning",
          "Reduce all position sizes by 50% until you can follow rules consistently — discipline first",
          "Switch to a new strategy",
          "Quit trading entirely"
        ],
        correct: 1,
        explanation: "Discipline failures aren't a strategy problem. Address them by reducing risk until the discipline is rebuilt. Don't change strategies — change behavior."
      }
    ],
    glossary: []
  },

  // ─── WORLD 8: Strategy ───
  27: {
    title: "What's a 'strategy', actually?",
    world: 8,
    minutes: 7,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "Eight questions every strategy must answer",
        body: `<p>A strategy isn't "buy stocks that look good." It's a specific, written plan that answers all of these:</p>
        <ol>
          <li><strong>Universe:</strong> which stocks am I trading? (e.g., Nifty 50 only)</li>
          <li><strong>Setup:</strong> what specific conditions trigger my interest?</li>
          <li><strong>Entry:</strong> exact price/condition for entering</li>
          <li><strong>Stop-loss:</strong> exact price/condition for exiting losing trade</li>
          <li><strong>Target:</strong> exact price/condition for exiting winning trade</li>
          <li><strong>Position size:</strong> how much capital per trade (1% rule)</li>
          <li><strong>Time horizon:</strong> hold for hours? Days? Weeks?</li>
          <li><strong>Invalidation:</strong> when do I stop trading this strategy?</li>
        </ol>
        <div class="key-insight"><strong>If you can't answer all 8 specifically, you don't have a strategy. You have a vibe.</strong></div>`
      },
      {
        type: "info",
        title: "Example: 'support bounce' strategy",
        body: `<p>Here's a complete starter strategy you can use:</p>
        <ul>
          <li><strong>Universe:</strong> Nifty 50 stocks only</li>
          <li><strong>Setup:</strong> stock has bounced off a clear support level at least 2 times in past 6 months, currently above 50DMA, returning to that support</li>
          <li><strong>Entry:</strong> first green candle off support, with RSI &gt; 40</li>
          <li><strong>Stop-loss:</strong> 1-2% below the support level</li>
          <li><strong>Target:</strong> previous resistance, or 2× the risk</li>
          <li><strong>Position size:</strong> 1% of capital risked</li>
          <li><strong>Time horizon:</strong> hold until target/stop hit, max 30 days</li>
          <li><strong>Invalidation:</strong> after 50 trades, if win rate × avg win is less than loss rate × avg loss, retire strategy</li>
        </ul>
        <p>This is a reasonable starting strategy. Doesn't mean it'll print money. Means it's <em>testable</em>.</p>`
      },
      {
        type: "quiz",
        question: "Your friend says their strategy is 'I buy stocks that look like they're about to go up.' What's missing?",
        options: [
          "Nothing — sounds good",
          "Everything — they don't have a strategy, they have intuition",
          "Just position sizing",
          "Just a name for the strategy"
        ],
        correct: 1,
        explanation: "'Look like' is not testable. A strategy must have specific conditions that anyone could check. Intuition is fine for experienced traders; for beginners, it leads to inconsistent decisions and unmeasurable results."
      }
    ],
    glossary: [
      { term: "Strategy", def: "A specific, written, testable plan covering entry, exit, sizing, and invalidation." },
      { term: "Setup", def: "The specific conditions that trigger your interest in a stock." }
    ]
  },

  28: {
    title: "Backtesting (manually)",
    world: 8,
    minutes: 8,
    xp: 40,
    steps: [
      {
        type: "info",
        title: "Test before you trust",
        body: `<p>You wrote a strategy. Does it work? You don't know yet. Your job now: <strong>backtest</strong> it.</p>
        <p>Manual backtest method (no coding needed):</p>
        <ol>
          <li>Open TradingView, use the "Bar Replay" feature (free)</li>
          <li>Pick 5 Nifty 50 stocks, last 2 years</li>
          <li>Step forward day by day, looking for your specific setup</li>
          <li>When you spot one, note: entry, stop, target. Hypothetically take the trade.</li>
          <li>Keep stepping forward. Did stop hit, or target hit?</li>
          <li>Log result. Repeat.</li>
        </ol>
        <p>Aim for 50+ historical setups across multiple stocks. This takes hours. It's worth every minute.</p>`
      },
      {
        type: "info",
        title: "What to measure",
        body: `<p>After 50 backtested trades, calculate:</p>
        <ul>
          <li><strong>Win rate:</strong> % of trades that hit target</li>
          <li><strong>Average winner:</strong> in R-multiples (e.g., 1.8R)</li>
          <li><strong>Average loser:</strong> in R-multiples (usually -1R if you stuck to your stop)</li>
          <li><strong>Expectancy:</strong> (win% × avg win) - (loss% × avg loss)</li>
        </ul>
        <p>If expectancy is positive (e.g., +0.3R per trade), the strategy has edge. If negative, modify or abandon.</p>
        <div class="key-insight"><strong>Important:</strong> a strategy can have a positive backtest and still fail in real trading because of slippage, costs, and your own behavior. Backtest is necessary but not sufficient.</div>`
      },
      {
        type: "quiz",
        question: "Your backtest: 100 trades, 35% win rate, avg win 3R, avg loss 1R. What's your expectancy?",
        options: [
          "0.05R — barely profitable",
          "0.4R — clearly profitable strategy",
          "Negative — this is a losing strategy",
          "Need win rate above 50% to be profitable"
        ],
        correct: 1,
        explanation: "(0.35 × 3) - (0.65 × 1) = 1.05 - 0.65 = 0.4R per trade. A 35% win rate is great IF your wins are big enough. Win rate alone is misleading."
      }
    ],
    glossary: [
      { term: "Backtest", def: "Testing a strategy on historical data to see how it would have performed." },
      { term: "Bar Replay", def: "TradingView feature that lets you step through history bar-by-bar, hiding the future." }
    ]
  },

  29: {
    title: "Document YOUR strategy",
    world: 8,
    minutes: 10,
    xp: 60,
    steps: [
      {
        type: "info",
        title: "Time to write your own",
        body: `<p>You've learned enough to write a real strategy. Yours. Specific to your goals, risk tolerance, and time available.</p>
        <p>Open Notes / Google Docs. Title it: "My Trading Strategy v1 — [Date]."</p>
        <p>Write all 8 components from quest 27. Be specific. Numbers, not adjectives.</p>
        <p>This document will evolve. v1 will probably have flaws. That's fine — you'll iterate to v2, v3 over months. The act of writing is itself a forcing function for clear thinking.</p>`
      },
      {
        type: "info",
        title: "A reasonable starter for now",
        body: `<p>If unsure, start with this template and modify:</p>
        <blockquote>
        <strong>Universe:</strong> Nifty 100 stocks only<br>
        <strong>Setup:</strong> Stock pulls back to its 50DMA in an established uptrend, RSI between 40-60<br>
        <strong>Entry:</strong> Buy on the day the stock closes back above the previous day's high after touching 50DMA<br>
        <strong>Stop-loss:</strong> 2% below the 50DMA, OR below the recent swing low (whichever is closer)<br>
        <strong>Target:</strong> Previous resistance, OR 2.5× the risk (whichever is closer)<br>
        <strong>Position size:</strong> 1% of capital risked<br>
        <strong>Time horizon:</strong> Hold for 5-30 days<br>
        <strong>Max concurrent positions:</strong> 3<br>
        <strong>Invalidation:</strong> If after 50 trades my expectancy is below 0, retire this strategy
        </blockquote>
        <p>This is a "trend-pullback" strategy. It's not magical. It just works often enough to be tradeable in trending markets.</p>`
      },
      {
        type: "quiz",
        question: "You wrote a strategy and tested it: 50 trades, +0.5R expectancy. Your friend wrote a different one: 30 trades, +0.8R expectancy. Whose is better?",
        options: [
          "Friend's — higher expectancy",
          "Yours — more trades = more reliable estimate",
          "Both equally good",
          "Need to compare on the same stocks/period to know"
        ],
        correct: 3,
        explanation: "Expectancy comparisons are only meaningful if measured on the same period and stocks. Different markets behave differently. Always test on the same conditions to compare."
      }
    ],
    glossary: []
  },

  // ─── WORLD 9: Stay alive ───
  30: {
    title: "Drawdowns are normal",
    world: 9,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "Even the best lose",
        body: `<p>A drawdown is a drop from your peak account value. Every trader, no matter how good, has them.</p>
        <p>Realistic expectations:</p>
        <ul>
          <li>10% drawdown: normal, monthly</li>
          <li>20% drawdown: yearly</li>
          <li>30% drawdown: every few years (and painful)</li>
        </ul>
        <p>Even Renaissance Technologies — the most famous quant fund ever — has had losing months and years. The difference? They've designed their risk so drawdowns don't end them.</p>`
      },
      {
        type: "info",
        title: "Surviving drawdowns",
        body: `<p>The biggest drawdown trap: scaling up size during recovery to "make it back faster." This is how 30% drawdowns become 60% drawdowns become game-overs.</p>
        <p>Counterintuitively, in a drawdown, you should:</p>
        <ul>
          <li>Reduce position sizes by 50%</li>
          <li>Take fewer trades, only A+ setups</li>
          <li>Review whether your strategy is broken or just having a normal bad streak</li>
          <li>Walk away from screens for a day or two</li>
        </ul>
        <div class="key-insight"><strong>The math:</strong> after a 50% drawdown, you need a 100% gain to break even. After 80%, you need 400%. Avoid deep drawdowns at all costs.</div>`
      },
      {
        type: "quiz",
        question: "You're in a 25% drawdown. Your strategy hasn't changed. What's the right action?",
        options: [
          "Quit, the strategy is broken",
          "Increase size to recover faster",
          "Reduce size, keep trading the strategy carefully, evaluate again after 30 more trades",
          "Switch to a totally new strategy"
        ],
        correct: 2,
        explanation: "25% is painful but normal-ish for active strategies. Reducing risk while continuing protects you both ways: if the strategy comes back, you're fine. If not, you've limited the damage."
      }
    ],
    glossary: [
      { term: "Drawdown", def: "Drop from your account peak. Normal in trading. Limit depth at all costs." }
    ]
  },

  31: {
    title: "When NOT to trade",
    world: 9,
    minutes: 6,
    xp: 35,
    steps: [
      {
        type: "info",
        title: "Some days, the best trade is no trade",
        body: `<p>The amateur trades every day. The pro waits for setups they truly understand.</p>
        <p>Don't trade when:</p>
        <ul>
          <li>You're emotional (fight, breakup, big stress)</li>
          <li>You're sick or sleep-deprived</li>
          <li>You hit your daily/weekly loss limit</li>
          <li>You can't clearly articulate the setup</li>
          <li>You haven't had time to prepare in the morning</li>
          <li>Major news event you don't understand is brewing</li>
          <li>The market is in a regime your strategy wasn't designed for</li>
        </ul>
        <div class="key-insight"><strong>Reframe:</strong> sitting out a day is not 'missing out.' It's protecting capital for the day when a great setup actually shows up.</div>`
      },
      {
        type: "info",
        title: "The 'tomorrow morning' test",
        body: `<p>Before any trade, ask: <em>"If I were calm and rested tomorrow morning looking at this exact setup, would I still take this trade?"</em></p>
        <p>If the answer is "yes, definitely" — go ahead.</p>
        <p>If the answer is "maybe" or "I'm not sure" — skip it.</p>
        <p>If the answer is "yes but I might be biased right now because I just lost / I'm seeing FOMO / I want excitement" — definitely skip it.</p>
        <p>This single question filters out 80% of bad trades.</p>`
      },
      {
        type: "quiz",
        question: "It's been a quiet week, you've taken 0 trades. You feel restless and 'see something kinda interesting' on a chart. What do you do?",
        options: [
          "Take it, you've waited long enough",
          "Take it small, just to be in the action",
          "Skip it. Boredom isn't a setup. The best traders are comfortable doing nothing for weeks.",
          "Take 2 trades to make up for the quiet week"
        ],
        correct: 2,
        explanation: "Trading from boredom is one of the most reliable ways to bleed. The market doesn't owe you action. Comfort with inactivity is itself an edge."
      }
    ],
    glossary: []
  },

  32: {
    title: "Pump-and-dump: stay safe",
    world: 9,
    minutes: 6,
    xp: 40,
    steps: [
      {
        type: "info",
        title: "How retail gets eaten",
        body: `<p>The most common way Indian retail traders lose big money isn't bad strategy. It's getting suckered into pump-and-dump schemes via:</p>
        <ul>
          <li>Telegram groups offering "free tips"</li>
          <li>WhatsApp forwards from "uncles in finance"</li>
          <li>YouTube channels with screenshots of "sure-shot calls"</li>
          <li>Twitter/X "fintwit" influencers boosting penny stocks</li>
          <li>Random office colleagues with "an inside source"</li>
        </ul>
        <p>The pattern: operators accumulate a small-cap stock cheap → pump it via these channels → sell to retail at the top → stock crashes 70%+ → retail loses everything.</p>
        <p>SEBI has banned dozens of such operators in 2024-26. Many are still active.</p>`
      },
      {
        type: "info",
        title: "Red flags",
        body: `<p>Treat as scams: ANY of these signals.</p>
        <ul>
          <li>"Guaranteed returns" or "100% accurate"</li>
          <li>"Buy XYZ today, target ₹X by Friday"</li>
          <li>Pressure to act fast ("only 2 hours left!")</li>
          <li>Asking you to pay for "premium tips"</li>
          <li>Asking you to share your trading account or login</li>
          <li>Pushing penny stocks (mcap below ₹1000 cr) you've never heard of</li>
          <li>Showing only winning screenshots — anyone can fake these</li>
          <li>Claiming SEBI registration without showing the number</li>
        </ul>
        <div class="key-insight"><strong>Verify:</strong> any legitimate "Research Analyst" must have a SEBI INH number you can verify at sebi.gov.in. If they can't show one, walk away.</div>`
      },
      {
        type: "quiz",
        question: "A Telegram channel with 50,000 members posts: 'XYZ Microsensor Ltd — buy at 35, target 45 by next week. Sure-shot!' Mcap ₹400 cr. What do you do?",
        options: [
          "Buy small, just in case",
          "Skip and report. This is the textbook pump-and-dump pattern.",
          "Wait for confirmation from another channel",
          "Invest 10% of capital"
        ],
        correct: 1,
        explanation: "Small cap + price target on a specific date + 'sure-shot' language + posted to large group = textbook pump-and-dump. The operators are the ones who already bought; you'd be their exit."
      }
    ],
    glossary: [
      { term: "Pump-and-dump", def: "Coordinated stock manipulation where promoters inflate a price, then sell to retail." },
      { term: "Research Analyst (RA)", def: "Someone licensed by SEBI to give investment advice. Verify INH number before trusting anyone." }
    ]
  },

  // ─── WORLD 10: Going Live ───
  33: {
    title: "The pre-live checklist",
    world: 10,
    minutes: 8,
    xp: 50,
    steps: [
      {
        type: "info",
        title: "Are you ready?",
        body: `<p>Before placing a single live trade, you should be able to honestly answer YES to all of these:</p>
        <ul>
          <li>I have completed all 6 Foundation prerequisites</li>
          <li>I have placed 50+ paper trades with one strategy</li>
          <li>My paper trading expectancy is positive over 50+ trades</li>
          <li>I have a written strategy document</li>
          <li>I have a position sizing calculator</li>
          <li>I have written risk rules — taped above my screen</li>
          <li>I have journaled every paper trade</li>
          <li>My capital is genuinely 'lose 100% and life continues' money</li>
          <li>I have NOT joined any paid Telegram tip channels</li>
          <li>I have someone I can talk to about losses without it being a crisis</li>
        </ul>
        <p>Anything not checked? Don't go live yet. Take another month of paper trading.</p>`
      },
      {
        type: "info",
        title: "What changes in real trading",
        body: `<p>Real money creates emotions paper trading doesn't. Expect to:</p>
        <ul>
          <li>Want to exit winners early (lock it in!)</li>
          <li>Want to widen stops on losers (it'll come back!)</li>
          <li>Skip valid signals (this one looks too risky)</li>
          <li>Take invalid signals (FOMO when you see others making money)</li>
          <li>Stare at your phone way too much</li>
        </ul>
        <p>This is universal. Don't fight these feelings — observe them, journal them, and trade smaller until they fade.</p>`
      },
      {
        type: "quiz",
        question: "You've done 50 paper trades, expectancy +0.4R. You're emotionally ready. Should you trade your full strategy size live from day one?",
        options: [
          "Yes — you've proven yourself",
          "Start at 25% size for first 20 trades, scale up over months as discipline holds",
          "Trade bigger to make up for paper trading time",
          "Trade only the first month, then pause"
        ],
        correct: 1,
        explanation: "Real trading reveals new emotions. Start small. Earn the right to your full size by demonstrating live discipline. Most traders who blew up did so by going to full size too fast."
      }
    ],
    glossary: []
  },

  34: {
    title: "Your first 20 live trades",
    world: 10,
    minutes: 6,
    xp: 50,
    steps: [
      {
        type: "info",
        title: "The most important 20 trades of your career",
        body: `<p>Your first 20 live trades will teach you more than 200 paper trades did. Here's how to make them count:</p>
        <h3>Rules</h3>
        <ul>
          <li>Position size: 25% of what your strategy says</li>
          <li>Maximum 1 open trade at a time</li>
          <li>Strict stop-losses — no exceptions ever</li>
          <li>Journal every single trade with emotion score</li>
          <li>After each, ask: did I follow my rules? Yes/No</li>
          <li>Take a break of at least 1 day between trades</li>
        </ul>
        <p>The point is NOT profit. The point is execution. If your rule-following rate is 100% over 20 trades, scale up. If it's 70%, do 20 more at the same tiny size.</p>`
      },
      {
        type: "info",
        title: "What to celebrate",
        body: `<p>Don't celebrate winning trades. Don't beat yourself up for losing trades. Celebrate <strong>discipline</strong>.</p>
        <p>Celebrate:</p>
        <ul>
          <li>Stop-loss hit and you didn't move it</li>
          <li>You skipped a setup that didn't quite fit your rules</li>
          <li>You walked away after a bad day</li>
          <li>You journaled honestly — including the embarrassing parts</li>
        </ul>
        <p>These are the actual skills that compound. Profits follow discipline, not the other way around.</p>`
      },
      {
        type: "quiz",
        question: "You finish your first 20 live trades: 8 wins, 12 losses. But you followed every rule. What's your assessment?",
        options: [
          "Failed — losing more than winning",
          "Excellent — perfect discipline. Now check expectancy: if avg win > 1.5× avg loss, scale up.",
          "Should change strategy immediately",
          "Trading isn't for you"
        ],
        correct: 1,
        explanation: "Win rate alone is meaningless. With perfect discipline + a 35-40% win rate + 2R winners, you're profitable long-term. Discipline first; profitability follows."
      }
    ],
    glossary: []
  },

  35: {
    title: "Becoming a long-term trader",
    world: 10,
    minutes: 6,
    xp: 60,
    steps: [
      {
        type: "info",
        title: "What survival looks like",
        body: `<p>You've made it through 35 quests. You know more than 95% of retail traders. Here's what comes next:</p>
        <ul>
          <li><strong>Year 1:</strong> tiny sizes, strict rules, honest journal. Goal: not lose money. Profit is a bonus.</li>
          <li><strong>Year 2:</strong> if year 1 was disciplined and net positive, scale up. Add a second strategy. Continue journaling.</li>
          <li><strong>Year 3+:</strong> you start to see your edge. You know your strengths and weaknesses. Trading becomes a craft, not a gamble.</li>
        </ul>
        <p>Most retail traders don't make it past month 6. They either blow up or quit. By following this framework, you've built the structure to be in the surviving 5%.</p>`
      },
      {
        type: "info",
        title: "The honest truth about wealth",
        body: `<p>Even if you become a successful trader, your biggest wealth-builder will likely still be:</p>
        <ul>
          <li>SIPs into index funds for 20+ years</li>
          <li>Real estate (carefully)</li>
          <li>Your career income, invested wisely</li>
          <li>Owning a business</li>
        </ul>
        <p>Trading should be a <strong>side experiment</strong>, not your retirement plan. Even if you make 30% per year (which is exceptional), starting from ₹50k, that's ₹15k profit. Worth it for skill-building. Not worth it as a primary income.</p>
        <div class="key-insight"><strong>The realistic best case:</strong> after 3-5 years, trading becomes a small but interesting income stream. It teaches you about businesses, money, and yourself. It rarely makes anyone rich quickly.</div>`
      },
      {
        type: "info",
        title: "What's next?",
        body: `<p>You've completed the curriculum. Next steps:</p>
        <ul>
          <li>Continue paper trading or live tiny trades for 6+ more months</li>
          <li>Read 'Trading in the Zone' by Mark Douglas — the bible of trading psychology</li>
          <li>Read 'Trade Your Way to Financial Freedom' by Van K. Tharp — the bible of position sizing</li>
          <li>Consider sitting for NISM Series XV (Research Analyst) certification — hard deadline forces real learning</li>
          <li>Stay humble. The market is bigger than all of us.</li>
        </ul>
        <p>You've earned the Graduate badge. Hard part starts now.</p>`
      },
      {
        type: "quiz",
        question: "You graduate this curriculum. You make ₹2 lakh in your first year of live trading. What's the wisest move?",
        options: [
          "Quit your job — you're a trader now",
          "10x your position size — clearly you've got it",
          "Continue tiny size for another year. Real edge takes 3-5 years to confirm. Don't get cocky.",
          "Start a paid Telegram channel"
        ],
        correct: 2,
        explanation: "One profitable year proves nothing — it could be luck, or a friendly market regime. Real traders are humble. They continue testing their edge for years before sizing up. Survival > speed."
      }
    ],
    glossary: []
  }
};

// Make available to app.js
window.MARKETQUEST_CONTENT = { WORLDS, PREREQS, BADGES, QUOTES, QUESTS };
})();
