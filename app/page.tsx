'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Code2, Copy, Download, Github, Linkedin, Mail, Menu, Moon, Send, Sun, TerminalSquare, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { GitHubCalendar } from 'react-github-calendar';
const stack = [
  ['React', 'Interface systems', 'Composing product-grade UI with deliberate state and motion.'], ['Next.js', 'Web products', 'Fast, search-friendly applications with modern routing.'], ['TypeScript', 'Reliable scale', 'Type-safe contracts that keep teams moving quickly.'], ['JavaScript', 'Core craft', 'The flexible layer underneath every polished interaction.'], ['Node.js', 'Product APIs', 'Eventful server-side systems that meet frontend needs.'], ['NestJS', 'Backend architecture', 'Structured services designed to grow without friction.'], ['Spring Boot', 'Enterprise systems', 'Reliable Java services and production integrations.'], ['PostgreSQL', 'Data integrity', 'Thoughtful relational modelling and query performance.'], ['MongoDB', 'Flexible data', 'Document models for fast-moving product requirements.'], ['Firebase', 'Rapid shipping', 'Authentication, realtime data and streamlined deployment.'], ['AWS', 'Cloud delivery', 'Pragmatic cloud infrastructure and release workflows.'], ['Docker', 'Reproducible builds', 'Same environment from local development to production.'], ['Tailwind CSS', 'Design velocity', 'Consistent interfaces without CSS drift.'], ['Material UI', 'Product foundations', 'Accessible primitives shaped into bespoke experiences.'], ['Redux', 'State clarity', 'Predictable app state for complex user flows.'], ['GraphQL', 'Connected data', 'Precise client data requirements with scalable APIs.'], ['Git', 'Team flow', 'Versioned collaboration and confident iteration.'],
];

const projects = [
  { slug: 'teamtrakr', number: '01', title: 'TeamTrakr', eyebrow: 'SaaS workforce management', url: 'https://teamtrakr.com/', description: 'A multi-tenant workspace for projects, attendance, employee engagement, subscription management and team administration.', role: 'React developer', tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'], features: ['Task and attendance workflows', 'RBAC user management', 'Subscription experiences'], accent: 'lime', architecture: 'Reusable React and TypeScript components communicate with REST APIs, with role-aware dashboards and state built for live workspace updates.', problem: 'Modern teams needed a unified workspace that supports productivity, engagement and operational oversight.', result: 'A responsive SaaS experience covering project summaries, attendance widgets, management tools and subscription flows.' },
  { slug: 'teamrex', number: '02', title: 'Teamrex', eyebrow: 'SaaS collaboration platform', url: 'https://main.d6sjazuoh3gde.amplifyapp.com/', description: 'A real-time collaboration workspace for chat, video meetings, file sharing, team channels and notifications.', role: 'React developer', tech: ['React', 'Next.js', 'Bootstrap', 'WebSockets'], features: ['Instant chat', 'Channel management', 'File sharing'], accent: 'violet', architecture: 'React and Next.js interfaces use REST APIs and WebSockets to surface live messaging, presence and channel activity.', problem: 'Teams required reliable communication, shared files and channel coordination within a single subscription platform.', result: 'A responsive collaboration experience with real-time updates, role-aware screens and subscription UI flows.' },
  { slug: 'jobber', number: '03', title: 'Jobber', eyebrow: 'Recruitment module', description: 'A recruitment platform for tracking resumes, candidate profiles and application status in one organized workflow.', role: 'React developer', tech: ['React', 'Next.js', 'Redux Toolkit', 'Swagger'], features: ['Resume upload', 'Candidate status tracking', 'Profile management'], accent: 'blue', architecture: 'A modular React UI uses Redux Toolkit for shared state and Swagger-documented APIs for consistent recruitment data flows.', problem: 'Recruiters needed a clearer way to manage candidate records and application progress.', result: 'A maintainable recruitment module with reusable components and real-time-feeling UI updates.' },
  { slug: 'timespace', number: '04', title: 'Time & Space', eyebrow: 'Metro advertising inventory', description: 'An interactive web platform that presents Hyderabad Metro advertising inventory across stations and pillars.', role: 'React frontend developer', tech: ['React', 'Material UI', 'REST APIs'], features: ['Location-based browsing', 'Media showcases', 'Responsive inventory views'], accent: 'blue', architecture: 'A responsive React interface uses Material UI components to make location-specific media inventory easy to browse.', problem: 'Businesses and agencies needed a polished way to discover outdoor branding opportunities by location.', result: 'A modern, scalable showcase that turns advertising inventory into an accessible digital catalogue.' },
  { slug: 'zenn', number: '05', title: 'Zenn', eyebrow: 'Catering & product ordering', url: 'https://www.zenncafe.com.au/', description: 'An Australia-based catering and product ordering website with a smooth journey from menu browsing to order placement.', role: 'Next.js frontend developer', tech: ['Next.js', 'Material UI', 'REST APIs'], features: ['Dynamic menus', 'Cart management', 'Order placement'], accent: 'orange', architecture: 'Next.js pages and reusable Material UI components consume live product and order data through REST APIs.', problem: 'The client needed a clear ordering experience that worked beautifully on desktop, tablet and mobile.', result: 'A responsive commerce experience for catering menus, products and real-time ordering data.' },
  { slug: 'stdreux', number: '06', title: 'St Dreux', eyebrow: 'Catering operations', url: 'https://stdreux.com.au/', description: 'An Australia-based catering and ordering management platform for browsing menus, managing addresses and tracking orders.', role: 'Next.js frontend developer', tech: ['Next.js', 'Material UI', 'REST APIs'], features: ['Order history', 'Address management', 'Customer workflows'], accent: 'orange', architecture: 'Reusable frontend modules communicate with REST APIs for product data, user profiles and order processing.', problem: 'Customers and operations teams needed a more intuitive end-to-end ordering and management flow.', result: 'A scalable, cross-browser ordering experience designed for the full customer journey.' },
];

const terminalResponses: Record<string, string[]> = {
  whoami: ['Sandeep Bhargav', 'Frontend Developer', 'React • Next.js • TypeScript'],
  about: ['2.1 years building responsive, interactive and scalable React applications.', 'I turn complex requirements into clear product experiences.'],
  skills: ['React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Material UI and Bootstrap.', 'REST API integration with Axios and Fetch API.'],
  projects: ['TeamTrakr · Teamrex · Jobber · Time & Space · Zenn · St Dreux', 'Scroll up for selected work.'],
  experience: ['Frontend Developer at TResource Innovations Pvt Ltd (part of Ekipit).', 'July 2024 to present.'],
  contact: ['Open to meaningful product challenges.', 'sandeepbhargavmurarishetti@gmail.com'],
};

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } as const;

function Magnetic({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0); const sx = useSpring(x, { stiffness: 220, damping: 16 }); const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return <motion.button onClick={onClick} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * .16); y.set((e.clientY - b.top - b.height / 2) * .16); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }} className={className}>{children}</motion.button>;
}

function Cursor() { const x = useMotionValue(-50); const y = useMotionValue(-50); const sx = useSpring(x, { stiffness: 400, damping: 30 }); const sy = useSpring(y, { stiffness: 400, damping: 30 }); const [mode, setMode] = useState(''); useEffect(() => { const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); const t = e.target as HTMLElement; setMode(t.closest('[data-cursor]')?.getAttribute('data-cursor') || ''); }; window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move); }, [x, y]); return <><motion.div className="cursor-spotlight" style={{ x: sx, y: sy }} /><motion.div className={`cursor ${mode}`} style={{ x: sx, y: sy }}>{mode === 'view' && <span>VIEW</span>}</motion.div></>; }

function Navbar({ light, setLight }: { light: boolean; setLight: (v: boolean) => void }) { const [open, setOpen] = useState(false); const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']; return <header className="nav-wrap"><nav className="nav glass" aria-label="Main navigation"><a className="brand" href="#home">sandeep bhargav murarishetty</a><div className="nav-links">{links.map(l => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}</div><div className="nav-actions"><button aria-label="Toggle color theme" className="icon-button" onClick={() => setLight(!light)}>{light ? <Moon size={16} /> : <Sun size={16} />}</button><a className="button primary" style={{ padding: '8px 14px', fontSize: '10px', gap: '6px' }} href="/images/Sandeep%20bhargav%20_resume.pdf" target="_blank" rel="noopener noreferrer"><Download size={14} /> Resume</a><button aria-label="Open menu" className="icon-button mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button></div></nav><AnimatePresence>{open && <motion.div className="mobile-nav glass" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{links.map(l => <a key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`}>{l}</a>)}</motion.div>}</AnimatePresence></header> }

function CodePanel() { return <div className="workspace-wrap"><div className="workspace"><div className="editor-top"><div className="dots"><i /><i /><i /></div><span>sandeep.ts</span><Code2 size={15} /></div><pre><code><span className="purple">const</span> <span className="blue">developer</span> = {'{'}{`\n`}  <span className="aqua">name</span>: <span className="yellow">&quot;Sandeep&quot;</span>,{`\n`}  <span className="aqua">stack</span>: [<span className="yellow">&quot;React&quot;</span>, <span className="yellow">&quot;Next.js&quot;</span>, <span className="yellow">&quot;Node.js&quot;</span>],{`\n`}  <span className="aqua">passion</span>: <span className="yellow">&quot;Building products&quot;</span>,{`\n`}  <span className="aqua">approach</span>: <span className="yellow">&quot;Intentional&quot;</span>{`\n`}{'}'};</code></pre><div className="editor-status"><span><b /> system online</span><span>TypeScript</span></div></div><motion.div className="terminal-float" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="float-title"><TerminalSquare size={13} /> terminal <span>•••</span></div><p>$ npm run build</p><p className="muted">$ deploying...</p><p className="success">$ success <Check size={12} /></p></motion.div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div> }

function Hero() { const { scrollY } = useScroll(); const scaleText = useTransform(scrollY, [0, 600], [1, 0.7]); const opacityText = useTransform(scrollY, [0, 500], [1, 0]); const yText = useTransform(scrollY, [0, 800], [0, 300]); const scalePortrait = useTransform(scrollY, [0, 800], [1, 1.15]); const yPortrait = useTransform(scrollY, [0, 800], [0, 150]); return <section id="home" className="hero section"><motion.div className="hero-copy" style={{ scale: scaleText, opacity: opacityText, y: yText }}><motion.div className="availability glass" {...reveal}><span /> Available for opportunities</motion.div><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>Building Digital<br />Products That <em>Actually</em> Work.</motion.h1><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35, duration: .7 }}>I&apos;m Sandeep Bhargav — a React-focused developer who turns complex ideas into fast, scalable and intuitive web experiences.</motion.p><motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}><Magnetic className="button primary glass" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>View My Work <ArrowDownRight size={17} /></Magnetic><Magnetic className="button ghost glass" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>Let&apos;s Work Together <ArrowUpRight size={17} /></Magnetic></motion.div></motion.div><motion.div className="hero-visual clean-wrap" style={{ scale: scalePortrait, y: yPortrait }} initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .15, ease: [0.16, 1, 0.3, 1] }}><div className="clean-ring2" /><div className="clean-ring1" /><div className="clean-portrait"><Image src="/images/sandeep-portrait.png" alt="Sandeep Bhargav, Frontend Developer" fill priority sizes="(max-width: 850px) 90vw, 400px" /></div><motion.div className="clean-label glass" whileHover={{ y: -4, scale: 1.03 }} transition={{ type: 'spring', stiffness: 210, damping: 20 }}><span>Frontend Developer</span><strong>Sandeep<br />Bhargav</strong><i>React · Next.js · TypeScript</i></motion.div><motion.div className="clean-status glass" whileHover={{ y: -4, scale: 1.03 }} transition={{ type: 'spring', stiffness: 210, damping: 20 }}><span><i /> OPEN TO COLLABORATE</span><strong>2.1 years of<br />product craft</strong></motion.div></motion.div><a className="scroll-cue" href="#about"><span /> Scroll to explore</a></section> }

function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const skills = [
    { name: 'Frontend Development', num: '01', pct: 95 },
    { name: 'API Integration', num: '02', pct: 88 },
    { name: 'Responsive UI', num: '03', pct: 92 },
    { name: 'Real-time Interfaces', num: '04', pct: 80 },
    { name: 'Performance Optimization', num: '05', pct: 85 },
    { name: 'Design Systems', num: '06', pct: 78 },
    { name: 'Problem Solving', num: '07', pct: 90 },
  ];
  return (
    <motion.section ref={ref} style={{ y, opacity }} id="about" className="section intro">
      <div className="intro-eyebrow"><span>01 / Behind the code</span></div>
      <div className="intro-headline">
        <h2>
          I don&apos;t just<br />
          <span className="outline-text">write code.</span><br />
          I build <span className="accent-word">experiences.</span>
        </h2>
      </div>
      <div className="intro-body">
        <div className="intro-left">
          <p>With 2.1 years of frontend experience, I turn wireframes and product requirements into responsive, reliable React experiences — with attention to performance, clarity and the details users notice.</p>
          <div className="intro-stats">
            {[['2.1', 'Years experience'], ['6+', 'Projects shipped'], ['11+', 'Core tools'], ['100%', 'Passion']].map(([n, l]) => (
              <div key={l} className="intro-stat glass"><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>
        <div className="intro-skills">
          {skills.map((s) => (
            <div key={s.name} className="skill-card">
              <div className="skill-card-accent" />
              <span className="skill-card-ghost">{s.num}</span>
              <span className="skill-card-num">{s.num}</span>
              <div className="skill-card-name">{s.name}</div>
              <div className="skill-card-footer">
                <div className="skill-card-track"><div className="skill-card-fill" style={{ width: `${s.pct}%` }} /></div>
                <span className="skill-card-pct">{s.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiNestjs, SiSpringboot, SiPostgresql, SiMongodb, SiFirebase, SiDocker, SiTailwindcss, SiMui, SiRedux, SiGraphql, SiGit } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

function TechStack() { 
  const ref = useRef(null); 
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] }); 
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]); 
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]); 

  const icons: Record<string, React.ReactNode> = {
    'React': <SiReact size={24} color="#61DAFB" />,
    'Next.js': <SiNextdotjs size={24} />,
    'TypeScript': <SiTypescript size={24} color="#3178C6" />,
    'JavaScript': <SiJavascript size={24} color="#F7DF1E" />,
    'Node.js': <SiNodedotjs size={24} color="#339933" />,
    'NestJS': <SiNestjs size={24} color="#E0234E" />,
    'Spring Boot': <SiSpringboot size={24} color="#6DB33F" />,
    'PostgreSQL': <SiPostgresql size={24} color="#4169E1" />,
    'MongoDB': <SiMongodb size={24} color="#47A248" />,
    'Firebase': <SiFirebase size={24} color="#FFCA28" />,
    'AWS': <FaAws size={24} color="#FF9900" />,
    'Docker': <SiDocker size={24} color="#2496ED" />,
    'Tailwind CSS': <SiTailwindcss size={24} color="#06B6D4" />,
    'Material UI': <SiMui size={24} color="#007FFF" />,
    'Redux': <SiRedux size={24} color="#764ABC" />,
    'GraphQL': <SiGraphql size={24} color="#E10098" />,
    'Git': <SiGit size={24} color="#F05032" />,
  };

  return (
    <motion.section ref={ref} style={{ scale, opacity }} id="skills" className="section tech-section">
      <motion.div className="section-label">02 / Technology ecosystem</motion.div>
      <motion.div className="tech-head">
        <h2>A flexible stack<br />for <span>real products.</span></h2>
        <p>Tools are only valuable when they help you build the right thing. Here&apos;s what I reach for and why.</p>
      </motion.div>
      
      <div className="tech-grid">
        {stack.map(([name, use, desc]) => (
          <div key={name} className="tech-card glass">
            <div className="tech-card-header">
              <span className="tech-icon">{icons[name] || <Code2 size={24} />}</span>
              <div>
                <strong>{name}</strong>
                <small>{use}</small>
              </div>
            </div>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function ProjectPreview({ project }: { project: typeof projects[number] }) {
  const content = {
    teamtrakr: <div style={{ width:'100%', background:'#f0f2f5' }}><img src="/images/teamtrakr.png" alt="TeamTrakr dashboard" style={{ width:'100%', height:'auto', display:'block' }} /></div>,
    teamrex: <div style={{ width:'100%', background:'#f0f2f5' }}><img src="/images/teamrex.png" alt="Teamrex dashboard" style={{ width:'100%', height:'auto', display:'block' }} /></div>,
    jobber: <><div className="hire-head"><b>jobber</b><span>Find candidates</span><span>For recruiters</span></div><div className="hire-main"><small>FIND THE RIGHT</small><strong>People make<br />progress.</strong><div>Search candidates, status or skill <b>→</b></div></div></>,
    zenn: <div style={{ width:'100%', background:'#f0f2f5' }}><img src="/images/zenn.png" alt="Zenn frontend" style={{ width:'100%', height:'auto', display:'block' }} /></div>,
    stdreux: <div style={{ width:'100%', background:'#f0f2f5' }}><img src="/images/stdreux.png" alt="St Dreux platform" style={{ width:'100%', height:'auto', display:'block' }} /></div>,
  } as Record<string, React.ReactNode>;
  const fallback = <div className="event-copy"><small>DIGITAL PLATFORM</small><strong>{project.title}<br /><i>made clear.</i></strong><span className="preview-action">Explore experience</span></div>;
  return <div className={`preview ${project.accent}${['teamtrakr', 'teamrex', 'zenn', 'stdreux'].includes(project.slug) ? ' screenshot-preview' : ''}`}><div className="preview-nav"><i /><span>{project.title.toUpperCase()}</span><b>•••</b></div><div className="preview-body">{content[project.slug] || fallback}</div></div>;
}

function Projects({ onSelect }: { onSelect: (p: typeof projects[number]) => void }) { const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] }); const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]); const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]); return <motion.section ref={ref} style={{ scale, opacity }} id="projects" className="section projects"><motion.div className="projects-top" {...reveal}><div><div className="section-label">03 / Selected work</div><h2>Built for <span>the real world.</span></h2></div><p>Selected platforms where product thinking, interface craft and technical detail come together.</p></motion.div><div className="project-list">{projects.map((p, i) => <motion.article key={p.slug} className="project" {...reveal}><button data-cursor="view" className="project-visual" onClick={() => onSelect(p)}><ProjectPreview project={p} /><span className="view-project">View case study <ArrowUpRight size={17} /></span></button><div className="project-info"><span className="project-number">{p.number}</span><div><p className="eyebrow">{p.eyebrow}</p><h3>{p.title}</h3><p className="project-desc">{p.description}</p><div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div><div style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap',marginTop:'12px'}}><button className="text-link" style={{margin:0}} onClick={() => onSelect(p)}>Explore project <ArrowUpRight size={15} /></button>{(p as any).url && <a href={(p as any).url} target="_blank" rel="noopener noreferrer" className="text-link" style={{margin:0,color:'var(--accent)',border:'1px solid var(--accent)',padding:'6px 10px',borderRadius:'4px',fontSize:'10px',fontWeight:700,display:'flex',alignItems:'center',gap:'6px'}}>Visit Live Site <ArrowUpRight size={13} /></a>}</div></div></div></motion.article>)}</div><Magnetic className="all-projects">View all projects <ArrowDownRight size={16} /></Magnetic></motion.section> }

function Experience() { const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] }); const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]); const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]); const items = [{ year: '2024', title: 'TResource Innovations Pvt Ltd', role: 'Frontend Developer · July 2024 to present', body: 'Building scalable SaaS interfaces for TeamTrakr and Teamrex, from responsive dashboards and component systems to API integration and real-time collaboration surfaces.', tags: ['React', 'Next.js', 'TypeScript', 'REST APIs'] }, { year: '2025', title: 'Client product delivery', role: 'React / Next.js developer', body: 'Delivered recruitment, metro advertising and Australian catering experiences with reusable UI components, responsive workflows and practical API integrations.', tags: ['Redux Toolkit', 'Material UI', 'Bootstrap', 'WebSockets'] }, { year: '2026', title: 'Continuing to build', role: 'Product-minded frontend engineer', body: 'Focused on refining reliable frontend systems, improving performance and translating complex requirements into clear user experiences.', tags: ['React', 'Next.js', 'Git', 'Postman'] }]; return <motion.section ref={ref} style={{ scale, opacity }} id="experience" className="section experience"><motion.div className="section-label" {...reveal}>04 / The journey</motion.div><motion.h2 {...reveal}>A record of<br /><span>making progress.</span></motion.h2><div className="timeline">{items.map((item, i) => <motion.article key={item.year} {...reveal}><div className="time-year">{item.year}<i /></div><div className="time-content"><p className="eyebrow">{item.role}</p><h3>{item.title}</h3><p>{item.body}</p><div className="tags">{item.tags.map(t => <span key={t}>{t}</span>)}</div></div><span className="time-index">0{i + 1}</span></motion.article>)}</div></motion.section> }

function Process() { const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] }); const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]); const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]); const isInView = useInView(ref, { once: false, margin: "-150px" }); const [playKey, setPlayKey] = useState(0); const steps = [['01', 'Understand', 'Listen deeply, frame the actual problem, and identify the outcome worth pursuing.'], ['02', 'Plan', 'Turn uncertainty into a clear execution path before momentum creates expensive rework.'], ['03', 'Design', 'Shape interfaces around people, decisions, and the moments that genuinely matter.'], ['04', 'Build', 'Ship careful, scalable code with performance and accessibility built into the work.'], ['05', 'Launch', 'Test, release, learn — then keep improving what the product needs next.']]; const [active, setActive] = useState(0); return <motion.section ref={ref} style={{ scale, opacity }} className="section process" onMouseEnter={() => setPlayKey(p => p + 1)}><motion.div className="section-label" {...reveal}>05 / How I build</motion.div><motion.div className="process-intro" {...reveal}><h2>Clear thinking.<br /><span>Confident shipping.</span></h2><p>Every useful product follows a rhythm. This is mine.</p></motion.div><div className="process-list" key={playKey}><motion.div className="process-line-active" initial={{ width: "0%" }} animate={isInView ? { width: "calc(100% - 60px)" } : { width: "0%" }} transition={{ duration: 2, ease: "easeInOut" }} />{steps.map(([number, title, body], i) => <motion.button initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }} transition={{ delay: i * 0.4, duration: 0.5, type: 'spring' }} className={active === i ? 'selected' : ''} onClick={() => setActive(i)} key={title}><span>{number}</span><strong>{title}</strong><div>{body}</div><ChevronRight size={18} /></motion.button>)}</div></motion.section> }

function Activity({ light }: { light: boolean }) { 
  const explicitTheme = {
    light: ['#ebedf0', '#c6e4d1', '#85c79c', '#41a864', '#00b8c4'],
    dark: ['#1f2720', '#456427', '#6b9137', '#94be44', '#00f0ff'],
  };
  return <section className="section activity"><motion.div className="activity-card" {...reveal}><div className="activity-top"><div><div className="section-label">06 / Builder&apos;s log</div><h2>Steady craft,<br /><span>visible progress.</span></h2></div><div className="live-dot"><i /> active</div></div><div className="activity-grid"><div className="contributions"><div className="contribution-head" style={{ marginBottom: '15px', alignItems: 'center' }}><span>Contribution rhythm</span><span style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px', background: 'color-mix(in srgb, var(--accent) 15%, transparent)', borderRadius: '4px', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)' }}>Live GitHub data</span></div><div style={{ overflowX: 'auto', paddingBottom: '10px' }}><GitHubCalendar username="Sandeepm33" colorScheme={light ? 'light' : 'dark'} theme={explicitTheme} blockSize={12} blockMargin={4} fontSize={10} /></div></div><div className="activity-stats"><div><strong>6</strong><small>featured products</small></div><div><strong>2.1</strong><small>years experience</small></div><div><strong>4</strong><small>domains explored</small></div></div></div></motion.div></section>;
}

function InteractiveTerminal() { const [command, setCommand] = useState('whoami'); const [copied, setCopied] = useState(false); const output = terminalResponses[command]; return <section className="section terminal-section" style={{ position: 'relative' }}><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '700px', height: '400px', background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 60%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} /><motion.div className="terminal-shell" {...reveal} style={{ position: 'relative', zIndex: 1 }}><div className="terminal-bar"><div className="dots"><i /><i /><i /></div><span><TerminalSquare size={14} /> sandeep@portfolio:~</span><button aria-label="Copy terminal output" onClick={() => { navigator.clipboard?.writeText(output.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>{copied ? <Check size={14} /> : <Copy size={14} />}</button></div><div className="terminal-content"><div><span className="prompt">$</span> <motion.span key={command} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{command}</motion.span></div><AnimatePresence mode="wait"><motion.div key={command} className="terminal-output" initial="hidden" animate="visible" exit="exit" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } }, exit: { opacity: 0, transition: { duration: 0.1 } } }}>{output.map((line, i) => <motion.p key={line + i} variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.3 }}>{line}</motion.p>)}</motion.div></AnimatePresence><div className="terminal-command"><span className="prompt">$</span><motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'inline-block', width: '8px', height: '14px', background: 'var(--accent)', marginLeft: '6px' }} /></div><div className="terminal-commands">{Object.keys(terminalResponses).map(c => <button key={c} className={c === command ? 'active' : ''} onClick={() => setCommand(c)}>{c}</button>)}</div></div></motion.div></section> }

function Contact() { const [form, setForm] = useState({ name: '', email: '', type: '', message: '' }); const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'); const [errors, setErrors] = useState<Record<string, string>>({}); const submit = (e: React.FormEvent) => { e.preventDefault(); const next: Record<string, string> = {}; if (!form.name.trim()) next.name = 'Please add your name.'; if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'; if (!form.type) next.type = 'Choose a project type.'; if (form.message.trim().length < 12) next.message = 'Tell me a little more (12 characters minimum).'; setErrors(next); if (Object.keys(next).length) { setState('error'); return; } setState('loading'); emailjs.send('service_ljeh49e', 'template_saxsbhn', { from_name: form.name, from_email: form.email, project_type: form.type, message: form.message }, 'jjNHbEqnK46HE_ryq').then(() => { setState('success'); setForm({ name: '', email: '', type: '', message: '' }); }, (error) => { setState('error'); setErrors({ submit: 'Failed to send message. Please try again later.' }); console.error(error.text); }); }; return <section id="contact" className="section contact"><motion.div className="contact-copy" {...reveal}><div className="section-label">07 / Start something</div><h2>Have an idea?<br /><span>Let&apos;s build it.</span></h2><p>Whether you&apos;re building a product, improving an existing application, or solving a complex technical problem, let&apos;s create something meaningful.</p><div className="contact-links"><a href="mailto:sandeepbhargavmurarishetti@gmail.com"><Mail size={16} /> sandeepbhargavmurarishetti@gmail.com <ArrowUpRight size={14} /></a></div></motion.div><motion.form onSubmit={submit} noValidate {...reveal}><div className="form-row"><label>Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />{errors.name && <small>{errors.name}</small>}</label><label>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />{errors.email && <small>{errors.email}</small>}</label></div><label>Project type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option value="">Select a project type</option><option>New product</option><option>Existing product improvement</option><option>Frontend development</option><option>Full-stack development</option><option>Something else</option></select>{errors.type && <small>{errors.type}</small>}</label><label>Tell me about it<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="A little context goes a long way..." rows={4} />{errors.message && <small>{errors.message}</small>}</label><button className="button primary submit" disabled={state === 'loading'}>{state === 'loading' ? 'Sending...' : state === 'success' ? 'Message sent — thank you' : 'Start a conversation'} <Send size={15} /></button>{errors.submit && <p className="form-success" style={{color: '#ff8a79'}}>{errors.submit}</p>}{state === 'success' && <p className="form-success"><Check size={14} /> Your message has been sent successfully. I&apos;ll be in touch soon.</p>}</motion.form></section> }

function CaseStudy({ project, close }: { project: typeof projects[number] | null; close: () => void }) { useEffect(() => { const key = (e: KeyboardEvent) => e.key === 'Escape' && close(); window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [close]); return <AnimatePresence>{project && <motion.div className="modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${project.title} case study`} onMouseDown={close}><motion.article className="case-study" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onMouseDown={e => e.stopPropagation()}><button className="case-close" onClick={close} aria-label="Close case study"><X size={20} /></button><p className="eyebrow">CASE STUDY / {project.number}</p><h2>{project.title}</h2><ProjectPreview project={project} /><div className="case-grid"><div><small>THE PROBLEM</small><p>{project.problem}</p></div><div><small>THE SOLUTION</small><p>{project.description}</p></div><div><small>ARCHITECTURE</small><p>{project.architecture}</p></div><div><small>RESULT</small><p>{project.result}</p></div></div><div className="case-footer"><div className="tags">{project.tech.map(t => <span key={t}>{t}</span>)}</div><div style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>{(project as any).url && <a href={(project as any).url} target="_blank" rel="noopener noreferrer" className="button ghost glass" style={{fontSize:'11px',display:'flex',alignItems:'center',gap:'8px'}}>Visit Live Site <ArrowUpRight size={14} /></a>}<button className="button primary" onClick={close}>Back to work <ArrowDownRight size={16} /></button></div></div></motion.article></motion.div>}</AnimatePresence> }

function ResumeSection() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  return (
    <>
      <section className="section" style={{ padding: '60px 0', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>08 / Full History</p>
        <h2 style={{ margin: '0 0 30px' }}>View my <br/><span>full experience.</span></h2>
        <button className="button ghost glass" onClick={() => setOpen(true)} style={{ fontSize: '12px', padding: '16px 24px' }}>
          Preview Resume <ArrowUpRight size={16} />
        </button>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div className="modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} style={{ zIndex: 100 }}>
            <motion.div className="case-study" style={{ padding: '0', height: '90vh', display: 'flex', flexDirection: 'column', width: 'min(900px, 100%)', background: '#222' }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'var(--surface)', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text)' }}>Resume Preview</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <a href="/images/Sandeep%20bhargav%20_resume.pdf" download className="button primary" style={{ padding: '8px 14px', fontSize: '10px', margin: 0 }}>Download PDF</a>
                  <button className="case-close" style={{ position: 'relative', top: 0, right: 0, margin: 0 }} onClick={() => setOpen(false)}><X size={18} /></button>
                </div>
              </div>
              
              <div style={{ flex: 1, display: 'block', overflow: 'hidden', background: '#e5e5e5' }}>
                 <iframe src="/images/Sandeep%20bhargav%20_resume.pdf#toolbar=0" style={{ width: '100%', height: '100%', border: 'none' }} title="Resume Preview" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() { return <footer><a className="brand" href="#home">SANDEEP<span>.DEV</span></a><p>Designed & engineered with intention.</p><span>© {new Date().getFullYear()} Sandeep Bhargav</span></footer> }

export default function Home() { const [light, setLight] = useState(false); const [selected, setSelected] = useState<typeof projects[number] | null>(null); const [hydrated, setHydrated] = useState(false); const reduce = useReducedMotion(); useEffect(() => { setHydrated(true); }, []); useEffect(() => { document.documentElement.dataset.theme = light ? 'light' : 'dark'; }, [light]); return <main className={hydrated && reduce ? 'reduce-motion' : ''}><Cursor /><Navbar light={light} setLight={setLight} /><Hero /><Intro /><TechStack /><Projects onSelect={setSelected} /><Experience /><Process /><Activity light={light} /><InteractiveTerminal /><Contact /><ResumeSection /><Footer /><CaseStudy project={selected} close={() => setSelected(null)} /></main> }
