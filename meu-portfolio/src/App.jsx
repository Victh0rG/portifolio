// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

import { useState, useEffect, useRef } from 'react'
import './App.css'

// ── DATA ────────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    icon: '⟨/⟩', title: 'Languages',
    items: ['JavaScript / TypeScript', 'Python', 'SQL', 'C / C++'],
  },
  {
    icon: '⚙', title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST API Design', 'OAuth / Auth systems', 'Microservices'],
  },
  {
    icon: '◈', title: 'Frontend',
    items: ['React', 'Next.js', 'Responsive UI', 'Modern Architecture'],
  },
  {
    icon: '▦', title: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Data Modeling', 'Query Optimization'],
  },
  {
    icon: '⟳', title: 'Data & Automation',
    items: ['Data Processing', 'Google Sheets API', 'OCR Processing', 'Spreadsheet Automation'],
  },
  {
    icon: '⎔', title: 'Tools',
    items: ['Git & GitHub', 'Docker', 'Vercel', 'Linux / Windows'],
  },
]

const PROJECTS = [
  {
    num: 'PROJECT_01',
    title: 'Intelligent PDF Processing System',
    desc: 'Automated pipeline for reading and processing PDF documents, including scanned PDFs with image-based text using OCR technology.',
    features: ['Automatic text extraction from scanned docs', 'Structured data processing pipeline', 'Intelligent workflow automation'],
    stack: ['Python', 'OCR', 'Automation'],
  },
  {
    num: 'PROJECT_02',
    title: 'Expense Management Platform',
    desc: 'Full-stack system for managing and analyzing personal financial expenses with visualization dashboards and intelligent categorization.',
    features: ['Expense categorization engine', 'Data visualization dashboard', 'Financial analysis reports'],
    stack: ['Node.js', 'React', 'SQL'],
  },
  {
    num: 'PROJECT_03',
    title: 'Google Sheets Automation System',
    desc: 'Automation tool leveraging the Google Sheets API to dynamically create, manage, and synchronize spreadsheets programmatically.',
    features: ['Automatic spreadsheet creation', 'Sheet management via API', 'Real-time data synchronization'],
    stack: ['Python', 'Google API', 'OAuth'],
  },
  {
    num: 'PROJECT_04',
    title: 'Full-Stack Web Architecture',
    desc: 'Scalable full-stack application design using separated backend APIs and modern frontend frameworks, focusing on clean code.',
    features: ['Scalable separated architecture', 'Clean code organization', 'Maintainable systems design'],
    stack: ['Node.js', 'Express', 'React', 'Next.js'],
  },
]

const INTERESTS = ['Artificial Intelligence', 'Machine Learning', 'Data Engineering', 'Distributed Systems', 'Computational Graphics', 'Software Architecture', 'High-Performance Systems']
const LEARNING  = ['Advanced ML', 'System Design', 'Backend Architecture', 'Data Processing']
const TYPED_PHRASES = ['', '.js', '.py', '.ts']

// ── HOOKS ────────────────────────────────────────────────────────────────────
function useTyped(phrases, speed = 130) {
  const [text, setText] = useState('')
  const state = useRef({ pi: 0, ci: 0, deleting: false })

  useEffect(() => {
    let timer
    const tick = () => {
      const { pi, ci, deleting } = state.current
      const phrase = phrases[pi]
      if (!deleting) {
        setText(phrase.slice(0, ci + 1))
        if (ci + 1 === phrase.length) {
          state.current.deleting = true
          timer = setTimeout(tick, 1800)
        } else {
          state.current.ci++
          timer = setTimeout(tick, speed)
        }
      } else {
        setText(phrase.slice(0, ci - 1))
        if (ci - 1 === 0) {
          state.current.deleting = false
          state.current.pi = (pi + 1) % phrases.length
          state.current.ci = 0
        } else {
          state.current.ci--
        }
        timer = setTimeout(tick, 80)
      }
    }
    timer = setTimeout(tick, 1000)
    return () => clearTimeout(timer)
  }, [])

  return text
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 100)
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('gl-cursor')
    const ring   = document.getElementById('gl-ring')
    if (!cursor || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0, raf

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top  = my + 'px'
    }
    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
}

function useActiveNav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const handler = () => {
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) setActive(s.id) })
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return active
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────
function Cursor() {
  return (
    <>
      <div id="gl-cursor" />
      <div id="gl-ring" />
    </>
  )
}

function Nav({ active }) {
  const links = ['about', 'skills', 'projects', 'contact']
  return (
    <nav className="gl-nav">
      <div className="nav-logo">G<span>.</span>Libiert</div>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} className={active === l ? 'active' : ''}>{l}</a>
          </li>
        ))}
      </ul>
      <div className="nav-status">
        <span className="status-dot" />
        Available for work
      </div>
    </nav>
  )
}

function Hero({ typed }) {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-label">Software Developer</div>
        <h1 className="hero-title">
          Victhor<br />
          <span className="line2">Gabriel<span className="typed">{typed}|</span></span>
        </h1>
        <p className="hero-desc">
          Building scalable web applications and intelligent systems.
          Backend, frontend, automation — from API architecture to AI-driven pipelines.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View Projects →</a>
          <a href="https://github.com/Victh0rG" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub ↗</a>
        </div>
      </div>
      <div className="hero-scroll"><span className="scroll-line" />Scroll to explore</div>
      <div className="hero-stats">
        {[
          { n: '4+', l: 'Featured\nProjects' },
          { n: '5+', l: 'Languages &\nFrameworks' },
          { n: '∞',  l: 'Problems\nSolved' },
        ].map(s => (
          <div className="stat" key={s.n}>
            <div className="stat-n">{s.n}</div>
            <div className="stat-l" style={{ whiteSpace: 'pre-line' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div className="section-label">// 01 — About</div>
      <h2 className="section-title reveal">Who I Am</h2>
      <div className="about-grid">
        <div className="reveal">
          <p>I'm a software developer focused on building <strong>scalable web applications</strong> and intelligent systems. My work primarily involves backend and frontend development using modern JavaScript frameworks and API-driven architectures.</p>
          <p>I enjoy solving complex problems, designing robust systems, and continuously improving my knowledge in areas such as <strong className="accent-text">artificial intelligence</strong>, machine learning, and software architecture.</p>
          <p>My goal is to develop technology that automates processes, improves decision-making, and creates real value through data and software.</p>
        </div>
        <div className="reveal">
          <div className="interests">
            <div className="interests-title">// Areas of Interest</div>
            <div className="tags">{INTERESTS.map(t => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
          <div className="interests" style={{ marginTop: '2.5rem' }}>
            <div className="interests-title">// Currently Learning</div>
            <div className="tags">{LEARNING.map(t => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section-dark">
      <div className="section-label">// 02 — Skills</div>
      <h2 className="section-title reveal">Technical Stack</h2>
      <div className="skills-grid reveal">
        {SKILLS.map(s => (
          <div className="skill-block" key={s.title}>
            <div className="skill-block-icon">{s.icon}</div>
            <div className="skill-block-title">{s.title}</div>
            <ul className="skill-list">
              {s.items.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <div className="section-label">// 03 — Projects</div>
      <h2 className="section-title reveal">Featured Work</h2>
      <div className="projects-grid reveal">
        {PROJECTS.map(p => (
          <div className="project-card" key={p.num}>
            <span className="project-num">{p.num}</span>
            <div className="project-title">{p.title}</div>
            <p className="project-desc">{p.desc}</p>
            <ul className="project-features">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="project-stack">
              {p.stack.map(s => <span className="stack-badge" key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-dark">
      <div className="section-label">// 04 — Contact</div>
      <div className="contact-inner">
        <h2 className="section-title reveal">Let's Build<br />Something.</h2>
        <a href="https://github.com/Victh0rG" className="contact-email reveal" target="_blank" rel="noreferrer">
          github.com/Victh0rG ↗
        </a>
        <div className="contact-links reveal">
          <a href="https://github.com/Victh0rG" target="_blank" rel="noreferrer" className="contact-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="mailto:gabriel@example.com" className="contact-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
          <span className="contact-link location-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Brazil 🇧🇷
          </span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <span>© 2025 Gabriel Libiert — All rights reserved.</span>
      <span className="footer-built">Built with Vite + Vercel</span>
    </footer>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const typed  = useTyped(TYPED_PHRASES)
  const active = useActiveNav()
  useCursor()
  useReveal()

  return (
    <>
      <Cursor />
      <div className="grid-bg" />
      <div className="scanline" />
      <div className="orb orb1" />
      <div className="orb orb2" />

      <Nav active={active} />
      <Hero typed={typed} />
      <hr className="divider" />
      <About />
      <hr className="divider" />
      <Skills />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <Contact />
      <Footer />
    </>
  )
}
