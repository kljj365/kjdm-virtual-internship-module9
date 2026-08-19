import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type MarketItem = {
  id: string;
  title: string;
  category: string;
  eyebrow: string;
  description: string;
  price: string;
  format: string;
  image: string;
  accent: string;
  included: string[];
};

const items: MarketItem[] = [
  {
    id: "signal-sprint",
    title: "Signal Sprint",
    category: "Systems",
    eyebrow: "FIELD GUIDE / 01",
    description: "A focused operating system for turning a scattered marketing week into a clear, repeatable sprint.",
    price: "$49",
    format: "Notion + PDF",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
    accent: "orange",
    included: ["Weekly planning canvas", "Priority scoring prompts", "Client handoff checklist"],
  },
  {
    id: "content-compass",
    title: "Content Compass",
    category: "Content",
    eyebrow: "FIELD GUIDE / 02",
    description: "A practical editorial map for creating useful content that sounds like a person and points toward a business goal.",
    price: "$39",
    format: "Workbook",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    accent: "blue",
    included: ["Audience angle matrix", "30-day idea board", "Repurposing workflow"],
  },
  {
    id: "conversion-lab",
    title: "Conversion Lab",
    category: "Websites",
    eyebrow: "FIELD GUIDE / 03",
    description: "A teardown-led workbook for making a service website easier to understand, trust, and act on.",
    price: "$59",
    format: "Figma + PDF",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
    accent: "green",
    included: ["Page hierarchy prompts", "CTA clarity checklist", "Mobile QA worksheet"],
  },
  {
    id: "client-kickoff",
    title: "Client Kickoff Kit",
    category: "Operations",
    eyebrow: "FIELD GUIDE / 04",
    description: "A calm, structured start for projects that need clear scope, useful questions, and visible next steps.",
    price: "$29",
    format: "Templates",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    accent: "purple",
    included: ["Discovery call agenda", "Scope boundary sheet", "First-week timeline"],
  },
  {
    id: "local-launch",
    title: "Local Launch Map",
    category: "Growth",
    eyebrow: "FIELD GUIDE / 05",
    description: "A grounded launch sequence for local businesses that need discoverability without noisy marketing theater.",
    price: "$45",
    format: "Workbook",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
    accent: "yellow",
    included: ["Local visibility audit", "Offer positioning map", "Measurement starter sheet"],
  },
  {
    id: "portfolio-proof",
    title: "Portfolio Proof Kit",
    category: "Career",
    eyebrow: "FIELD GUIDE / 06",
    description: "A structure for turning projects into evidence-led case studies that show decisions, constraints, and outcomes honestly.",
    price: "$35",
    format: "Notion + PDF",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85",
    accent: "pink",
    included: ["Case-study outline", "Evidence ledger", "Interview walkthrough prompts"],
  },
];

const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

function getHashItem() {
  const match = window.location.hash.match(/^#\/item\/([^/]+)/);
  return match ? items.find((item) => item.id === match[1]) : undefined;
}

export default function CineScope() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<MarketItem | undefined>(() => getHashItem());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 650, easing: "ease-out-cubic", once: true, offset: 60, disable: "mobile" });
    const onHashChange = () => {
      setSelected(getHashItem());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !normalized || `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  if (selected) {
    return <ItemDetail item={selected} onBack={() => { window.location.hash = "/"; }} />;
  }

  return (
    <div className="market-app">
      <header className="market-header">
        <a className="brand" href="#/" aria-label="KJDM Market home"><span className="brand-mark">KJ</span><span>KJDM <em>MARKET</em></span></a>
        <nav className={menuOpen ? "market-nav is-open" : "market-nav"} aria-label="Primary navigation">
          <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#authors" onClick={() => setMenuOpen(false)}>The desk</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main>
        <section className="market-hero" data-aos="fade-up">
          <div className="hero-copy">
            <p className="kicker"><span className="pulse-dot" /> KJDM / ORIGINAL FIELD NOTES</p>
            <h1>Useful ideas,<br /><i>made tangible.</i></h1>
            <p className="hero-description">A small, considered market of digital tools for clearer marketing, sharper websites, and better work weeks.</p>
            <a className="text-link" href="#collections">Explore the desk <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-art" data-aos="zoom-in" data-aos-delay="120"><div className="hero-card"><span>ISSUE 09</span><strong>Build<br />with<br /><em>intent.</em></strong><small>KLJJ365 / 2026</small></div><div className="hero-stamp">ORIGINAL<br />KJDM<br />EDITION</div></div>
        </section>

        <section className="ticker" aria-label="Market statement"><span>DESIGN × STRATEGY × SYSTEMS</span><span>BUILT FOR THE NEXT MOVE</span><span>TRUTHFUL BY DEFAULT</span></section>

        <section className="collections-section" id="collections">
          <div className="section-heading" data-aos="fade-up"><div><p className="kicker">01 / COLLECTIONS</p><h2>Find your next<br /><i>useful thing.</i></h2></div><p className="section-note">Digital resources built from the same practice KJDM brings to websites, content, and growth systems.</p></div>
          <div className="filter-bar" data-aos="fade-up" data-aos-delay="80"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the market" aria-label="Search the market" /></label><div className="category-list" role="group" aria-label="Filter by category">{categories.map((name) => <button className={category === name ? "filter-chip active" : "filter-chip"} key={name} onClick={() => setCategory(name)}>{name}</button>)}</div></div>
          <div className="item-grid" aria-live="polite">{visibleItems.map((item, index) => <ItemCard key={item.id} item={item} index={index} />)}</div>
          {visibleItems.length === 0 && <div className="empty-state"><p className="kicker">NO MATCHES / TRY AGAIN</p><h3>Nothing in the current drawer.</h3><button className="text-link" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters <ArrowUpRight size={16} /></button></div>}
        </section>

        <section className="hot-section" data-aos="fade-up"><div className="hot-intro"><p className="kicker">02 / HOT COLLECTIONS</p><h2>Start where<br /><i>the signal is.</i></h2></div><div className="hot-list">{categories.slice(1, 5).map((name, index) => <button key={name} className="hot-row" onClick={() => { setCategory(name); document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" }); }}><span>0{index + 1}</span><strong>{name}</strong><small>{items.filter((item) => item.category === name).length} FIELD GUIDES</small><ChevronRight size={19} /></button>)}</div></section>

        <section className="desk-section" id="authors"><div className="desk-image" data-aos="fade-right"><img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=85" alt="A bright studio desk with notes and a laptop" /><span className="image-label">THE KJDM DESK / 2026</span></div><div className="desk-copy" data-aos="fade-left"><p className="kicker">03 / THE DESK</p><h2>Made by doing<br /><i>the work.</i></h2><p>Every field guide starts as a real question: how do we make the next step clearer? These are small tools for people building something of their own.</p><a className="text-link" href="https://github.com/kljj365" target="_blank" rel="noreferrer">See the source trail <ArrowUpRight size={16} /></a></div></section>

        <section className="market-note" id="about" data-aos="fade-up"><p className="kicker">04 / A NOTE ON THE MARKET</p><h2>Sample catalog. <i>Real practice.</i></h2><p>This is an original frontend companion project built for learning and portfolio evidence. The catalog uses sample product content and does not represent live checkout, customer reviews, or real sales results.</p></section>
      </main>

      <footer className="market-footer"><div className="brand"><span className="brand-mark">KJ</span><span>KJDM <em>MARKET</em></span></div><p>Original tools for clearer work.</p><span>© 2026 KJDM / FIELD NOTES</span></footer>
    </div>
  );
}

function ItemCard({ item, index }: { item: MarketItem; index: number }) {
  return <article className={`item-card accent-${item.accent}`} data-aos="fade-up" data-aos-delay={Math.min(index * 60, 240)}><a href={`#/item/${item.id}`} className="item-image"><img src={item.image} alt="" /><span>{item.eyebrow}</span><span className="view-badge">View <ArrowUpRight size={15} /></span></a><div className="item-meta"><p>{item.category} / {item.format}</p><h3><a href={`#/item/${item.id}`}>{item.title}</a></h3><p className="item-description">{item.description}</p><div className="item-bottom"><strong>{item.price}</strong><a className="item-link" href={`#/item/${item.id}`}>Explore <ArrowUpRight size={15} /></a></div></div></article>;
}

function ItemDetail({ item, onBack }: { item: MarketItem; onBack: () => void }) {
  return <div className="market-app detail-page"><header className="market-header"><a className="brand" href="#/" aria-label="KJDM Market home"><span className="brand-mark">KJ</span><span>KJDM <em>MARKET</em></span></a><button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Back to market</button></header><main><section className="detail-hero"><div className="detail-image" data-aos="fade-right"><img src={item.image} alt="" /><span>{item.eyebrow}</span></div><div className="detail-copy" data-aos="fade-left"><p className="kicker">{item.category} / {item.format}</p><h1>{item.title}</h1><p className="detail-description">{item.description}</p><div className="detail-price"><strong>{item.price}</strong><span>Sample catalog price</span></div><div className="detail-actions"><button className="primary-button" onClick={() => alert("Demo interaction only — no checkout is connected.")}>Add to plan <ArrowUpRight size={16} /></button><span className="demo-note"><Check size={15} /> Planning demo only</span></div><div className="included"><p className="kicker">INCLUDED</p>{item.included.map((entry) => <p key={entry}><Check size={15} /> {entry}</p>)}</div></div></section><section className="detail-note" data-aos="fade-up"><p className="kicker">FIELD NOTE / {item.eyebrow.split("/")[1]}</p><p>Designed as a clear starting point, not a promise of an outcome. Use the materials, test the idea, and make the next decision visible.</p></section></main><footer className="market-footer"><div className="brand"><span className="brand-mark">KJ</span><span>KJDM <em>MARKET</em></span></div><span>© 2026 KJDM / FIELD NOTES</span></footer></div>;
}
