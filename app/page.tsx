'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Code2, Copy, Download, Github, Linkedin, Mail, Menu, Moon, Search, Send, Sun, TerminalSquare, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { GitHubCalendar } from 'react-github-calendar';
import CommandPalette from './components/CommandPalette';
import Preloader from './components/Preloader';
const stack = [
  { name: 'React', category: 'frontend', use: 'Interface systems', desc: 'Composing product-grade UI with deliberate state and motion.' },
  { name: 'Next.js', category: 'frontend', use: 'Web products', desc: 'Fast, search-friendly applications with modern routing.' },
  { name: 'TypeScript', category: 'frontend', use: 'Reliable scale', desc: 'Type-safe contracts that keep teams moving quickly.' },
  { name: 'JavaScript', category: 'frontend', use: 'Core craft', desc: 'The flexible layer underneath every polished interaction.' },
  { name: 'HTML5', category: 'frontend', use: 'Web markup', desc: 'Semantic structure for accessible, modern web interfaces.' },
  { name: 'Node.js', category: 'backend', use: 'Product APIs', desc: 'Eventful server-side systems that meet frontend needs.' },
  { name: 'NestJS', category: 'backend', use: 'Backend architecture', desc: 'Structured services designed to grow without friction.' },
  { name: 'Spring Boot', category: 'backend', use: 'Enterprise systems', desc: 'Reliable Java services and production integrations.' },
  { name: 'PostgreSQL', category: 'database', use: 'Data integrity', desc: 'Thoughtful relational modelling and query performance.' },
  { name: 'MongoDB', category: 'database', use: 'Flexible data', desc: 'Document models for fast-moving product requirements.' },
  { name: 'Firebase', category: 'database', use: 'Rapid shipping', desc: 'Authentication, realtime data and streamlined deployment.' },
  { name: 'AWS', category: 'tools', use: 'Cloud delivery', desc: 'Pragmatic cloud infrastructure and release workflows.' },
  { name: 'Docker', category: 'tools', use: 'Reproducible builds', desc: 'Same environment from local development to production.' },
  { name: 'Tailwind CSS', category: 'frontend', use: 'Design velocity', desc: 'Consistent interfaces without CSS drift.' },
  { name: 'Material UI', category: 'frontend', use: 'Product foundations', desc: 'Accessible primitives shaped into bespoke experiences.' },
  { name: 'Redux', category: 'frontend', use: 'State clarity', desc: 'Predictable app state for complex user flows.' },
  { name: 'GraphQL', category: 'backend', use: 'Connected data', desc: 'Precise client data requirements with scalable APIs.' },
  { name: 'Git', category: 'tools', use: 'Team flow', desc: 'Versioned collaboration and confident iteration.' },
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
  contact: ['Open to meaningful product challenges.', 'Email: sandeepbhargavmurarishetti@gmail.com', 'Phone/WhatsApp: +91 9963887021'],
};

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } as const;

const headingContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    }
  }
} as const;

const headingLine = {
  initial: { y: '100%', opacity: 0 },
  whileInView: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  }
} as const;

function Magnetic({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0); const sx = useSpring(x, { stiffness: 220, damping: 16 }); const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return <motion.button onClick={onClick} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * .16); y.set((e.clientY - b.top - b.height / 2) * .16); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }} className={className}>{children}</motion.button>;
}

function Cursor() { const x = useMotionValue(-50); const y = useMotionValue(-50); const sx = useSpring(x, { stiffness: 400, damping: 30 }); const sy = useSpring(y, { stiffness: 400, damping: 30 }); const [mode, setMode] = useState(''); useEffect(() => { const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); const t = e.target as HTMLElement; setMode(t.closest('[data-cursor]')?.getAttribute('data-cursor') || ''); }; window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move); }, [x, y]); return <><motion.div className="cursor-spotlight" style={{ x: sx, y: sy }} /><motion.div className={`cursor ${mode}`} style={{ x: sx, y: sy }}>{mode === 'view' && <span>VIEW</span>}</motion.div></>; }

function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent || ''));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav-wrap ${isScrolled ? 'is-scrolled' : ''}`}>
      <motion.nav
        className="nav glass dynamic-pill"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
      >
        {/* Scroll Progress Line */}
        <motion.div
          className="nav-progress-indicator"
          style={{ scaleX: progressScale }}
        />

        {/* Brand Logo with Live Status Indicator */}
        <a className="brand-link" href="#home" onClick={(e) => scrollToSection(e, 'home')}>
          <span className="brand-status-dot" title="Available for opportunities">
            <span className="status-ping" />
          </span>
          <span className="brand-name">
            SANDEEP BHARGAV <span className="brand-last">MURARISHETTY</span>
          </span>
        </a>

        {/* Dynamic Floating Links */}
        <div className="nav-links" onMouseLeave={() => setHoveredLink(null)}>
          {links.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredLink === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
              >
                {(isActive || isHovered) && (
                  <motion.span
                    layoutId="activeNavPill"
                    className={`nav-pill-bg ${isActive ? 'is-active-pill' : 'is-hover-pill'}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="nav-link-text">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Actions (Search, Resume & Mobile Menu) */}
        <div className="nav-actions">
          <button
            onClick={onOpenSearch}
            className="search-trigger-btn"
            aria-label="Open Command Palette"
          >
            <Search size={14} className="search-icon-nav" />
            <span className="search-text">Search</span>
            <kbd className="search-kbd">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
          </button>

          <a
            className="resume-pill-btn"
            href="/images/Sandeep%20bhargav%20_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={14} /> <span>Resume</span>
          </a>

          <button
            aria-label="Toggle menu"
            className="icon-button mobile-menu-btn"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Animated Overlay Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="mobile-nav-card glass"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-nav-header">
                <div className="mobile-status-badge">
                  <span className="status-ping" /> Available for opportunities
                </div>
                <button
                  className="mobile-close-btn"
                  onClick={() => setOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mobile-links-list">
                {links.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`mobile-link-item ${activeSection === link.id ? 'active' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.05 }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="mobile-link-arrow" />
                  </motion.a>
                ))}
              </div>

              <div className="mobile-nav-actions">
                <button
                  onClick={() => { setOpen(false); onOpenSearch(); }}
                  className="mobile-action-btn search"
                >
                  <Search size={15} /> Search portfolio <kbd>{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
                </button>
                <a
                  className="mobile-action-btn resume"
                  href="/images/Sandeep%20bhargav%20_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={15} /> Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CodePanel() { return <div className="workspace-wrap"><div className="workspace"><div className="editor-top"><div className="dots"><i /><i /><i /></div><span>sandeep.ts</span><Code2 size={15} /></div><pre><code><span className="purple">const</span> <span className="blue">developer</span> = {'{'}{`\n`}  <span className="aqua">name</span>: <span className="yellow">&quot;Sandeep&quot;</span>,{`\n`}  <span className="aqua">stack</span>: [<span className="yellow">&quot;React&quot;</span>, <span className="yellow">&quot;Next.js&quot;</span>, <span className="yellow">&quot;Node.js&quot;</span>],{`\n`}  <span className="aqua">passion</span>: <span className="yellow">&quot;Building products&quot;</span>,{`\n`}  <span className="aqua">approach</span>: <span className="yellow">&quot;Intentional&quot;</span>{`\n`}{'}'};</code></pre><div className="editor-status"><span><b /> system online</span><span>TypeScript</span></div></div><motion.div className="terminal-float" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="float-title"><TerminalSquare size={13} /> terminal <span>•••</span></div><p>$ npm run build</p><p className="muted">$ deploying...</p><p className="success">$ success <Check size={12} /></p></motion.div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div> }

import { Rocket, Users, ArrowRight } from 'lucide-react';

const heroRoles = [
  { accent: 'React Full Stack', text: 'Developer' },
  { accent: 'Next.js & Node.js', text: 'Specialist' },
  { accent: 'Scalable SaaS', text: 'Architect' },
  { accent: 'AI-Accelerated', text: 'Engineer' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 150]);
  const scalePortrait = useTransform(scrollY, [0, 800], [1, 1.05]);
  const yPortrait = useTransform(scrollY, [0, 800], [0, 100]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-section hero-section-wrap section-bg-hero">
      <div className="hero-bg-overlay">
        <svg className="hero-bg-svg" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none">
          <path d="M1440 0H640C1000 250 800 650 1440 900V0Z" fill="var(--accent)" opacity="0.95" />
          <path d="M1440 0H800C1100 350 900 750 1440 900V0Z" fill="color-mix(in srgb, var(--accent) 70%, #000)" />
          <path d="M-100 900L-100 600C250 500 350 800 600 900Z" fill="#d1f0e0" opacity="0.6" />
        </svg>
        <div className="hero-bg-dots-left" />
        <div className="hero-bg-dots-right" />
      </div>

      <div className="section hero-grid-container">
        <motion.div style={{ y: yText }} className="hero-text-col">
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-badge"
          >
            <span className="hero-badge-dot" /> Available for opportunities
          </motion.div>

          <h1 className="hero-title" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0 0.28em' }}>
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ display: 'inline-block' }}
            >
              Sandeep
            </motion.span>{' '}
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="accent-text text-shimmer"
              style={{ display: 'inline-block' }}
            >
              Bhargav
            </motion.span>
          </h1>

          <div className="hero-subtitle-wrapper">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="hero-subtitle"
              >
                <span className="accent-text">{heroRoles[roleIndex].accent}</span>{' '}
                <span>{heroRoles[roleIndex].text}</span>
              </motion.h2>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="hero-desc"
          >
            React Full Stack Developer with 2.1+ years of experience building scalable, production web applications using React, Next.js, Node.js, and TypeScript. Delivers user-centric platforms across SaaS collaboration, recruitment, and e-commerce domains for clients in Australia and India. AI-accelerated engineering using Claude (via Google Antigravity).
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="hero-tech-icons"
          >
            <div className="hero-tech-icon react-icon">
              <svg width="26" height="26" viewBox="-10.5 -9.45 21 18.9" fill="none"><circle cx="0" cy="0" r="2" fill="#0ea5e9"></circle><g stroke="#0ea5e9" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
            </div>
            <div className="hero-tech-icon node-icon">
              <SiNodedotjs size={24} color="#339933" />
            </div>
            <div className="hero-tech-icon ts-icon">
              <div className="ts-box">TS</div>
            </div>
            <div className="hero-tech-icon next-icon">
              <SiNextdotjs size={22} color="#ffffff" />
            </div>
            <div className="hero-tech-icon tailwind-icon">
              <svg width="22" height="22" viewBox="0 0 54 33" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06b6d4" /></svg>
            </div>
            <div className="hero-tech-icon db-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
            </div>
          </motion.div>

          <style dangerouslySetInnerHTML={{
            __html: `
              .magnetic-clear { background: none; border: none; padding: 0; margin: 0; cursor: pointer; outline: none; border-radius: 10px; display: inline-flex; }
            `}} />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="hero-cta-buttons"
          >
            <Magnetic className="magnetic-clear" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="hero-btn-primary">
                <Rocket size={18} fill="#fff" /> View My Work <ArrowRight size={18} />
              </span>
            </Magnetic>
            <Magnetic className="magnetic-clear" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="hero-btn-secondary">
                <Users size={18} /> Let's Work Together <ArrowRight size={18} />
              </span>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero-portrait-col">
          <motion.div style={{ scale: scalePortrait, y: yPortrait }} className="hero-portrait-motion">
            <div className="hero-portrait-circle">
              <Image src="/images/sandeep3.png" alt="Sandeep Bhargav" fill style={{ objectFit: 'contain', objectPosition: 'center bottom' }} priority />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
    <section id="about" className="section-wrapper section-bg-about">
      <motion.section ref={ref} style={{ y, opacity }} className="section intro">
        <div className="intro-eyebrow"><span>01 / Behind the code</span></div>
        <div className="intro-headline">
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.2 }}
            variants={headingContainer}
          >
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                I don&apos;t just
              </motion.div>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} className="outline-text" variants={headingLine}>
                write code.
              </motion.div>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                I build <span className="accent-word">experiences.</span>
              </motion.div>
            </div>
          </motion.h2>
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
    </section>
  );
}

import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiNodedotjs, SiNestjs, SiSpringboot, SiPostgresql, SiMongodb, SiFirebase, SiDocker, SiTailwindcss, SiMui, SiRedux, SiGraphql, SiGit } from 'react-icons/si';
import { FaAws, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

function TechStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tools'>('all');

  const icons: Record<string, React.ReactNode> = {
    'React': <SiReact size={32} color="#61DAFB" />,
    'Next.js': <SiNextdotjs size={32} />,
    'TypeScript': <SiTypescript size={32} color="#3178C6" />,
    'JavaScript': <SiJavascript size={32} color="#F7DF1E" />,
    'HTML5': <SiHtml5 size={32} color="#E34F26" />,
    'Node.js': <SiNodedotjs size={32} color="#339933" />,
    'NestJS': <SiNestjs size={32} color="#E0234E" />,
    'Spring Boot': <SiSpringboot size={32} color="#6DB33F" />,
    'PostgreSQL': <SiPostgresql size={32} color="#4169E1" />,
    'MongoDB': <SiMongodb size={32} color="#47A248" />,
    'Firebase': <SiFirebase size={32} color="#FFCA28" />,
    'AWS': <FaAws size={32} color="#FF9900" />,
    'Docker': <SiDocker size={32} color="#2496ED" />,
    'Tailwind CSS': <SiTailwindcss size={32} color="#06B6D4" />,
    'Material UI': <SiMui size={32} color="#007FFF" />,
    'Redux': <SiRedux size={32} color="#764ABC" />,
    'GraphQL': <SiGraphql size={32} color="#E10098" />,
    'Git': <SiGit size={32} color="#F05032" />,
  };

  const filteredStack = activeTab === 'all'
    ? stack
    : stack.filter(item => item.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'DB' },
    { id: 'tools', label: 'Tools' },
  ] as const;

  return (
    <section id="skills" className="section-wrapper section-bg-tech">
      <motion.section ref={ref} style={{ scale, opacity }} className="section tech-section">
        <motion.div className="section-label">02 / Technology ecosystem</motion.div>
        <motion.div className="tech-head">
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.2 }}
            variants={headingContainer}
          >
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                A flexible stack
              </motion.div>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                for <span>real products.</span>
              </motion.div>
            </div>
          </motion.h2>
          <p>Tools are only valuable when they help you build the right thing. Here&apos;s what I reach for and why.</p>
        </motion.div>

        {/* Categories Tabs */}
        <div className="tech-tabs-wrapper">
          <div className="tech-tabs glass">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tech-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTechTab"
                    className="tech-tab-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="tech-badges-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredStack.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25 }}
                key={item.name}
                className="glass tech-card-box"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
                  {icons[item.name] || <Code2 size={32} />}
                </div>
                <strong style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginTop: '12px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {item.name}
                </strong>
                <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', marginTop: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {item.category === 'database' ? 'DATABASE' : item.category.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </section>
  );
}

function ProjectPreview({ project }: { project: typeof projects[number] }) {
  const content = {
    teamtrakr: <div style={{ width: '100%', background: '#f0f2f5' }}><img src="/images/teamtrakr.png" alt="TeamTrakr dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} /></div>,
    teamrex: <div style={{ width: '100%', background: '#f0f2f5' }}><img src="/images/teamrex.png" alt="Teamrex dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} /></div>,
    jobber: <><div className="hire-head"><b>jobber</b><span>Find candidates</span><span>For recruiters</span></div><div className="hire-main"><small>FIND THE RIGHT</small><strong>People make<br />progress.</strong><div>Search candidates, status or skill <b>→</b></div></div></>,
    zenn: <div style={{ width: '100%', background: '#f0f2f5' }}><img src="/images/zenn.png" alt="Zenn frontend" style={{ width: '100%', height: 'auto', display: 'block' }} /></div>,
    stdreux: <div style={{ width: '100%', background: '#f0f2f5' }}><img src="/images/stdreux.png" alt="St Dreux platform" style={{ width: '100%', height: 'auto', display: 'block' }} /></div>,
  } as Record<string, React.ReactNode>;
  const fallback = <div className="event-copy"><small>DIGITAL PLATFORM</small><strong>{project.title}<br /><i>made clear.</i></strong><span className="preview-action">Explore experience</span></div>;
  return (
    <div className={`preview ${project.accent}${['teamtrakr', 'teamrex', 'zenn', 'stdreux'].includes(project.slug) ? ' screenshot-preview' : ''}`}>
      <div className="preview-nav">
        <div className="preview-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="preview-title">{project.title.toUpperCase()}</span>
        <b className="preview-more">•••</b>
      </div>
      <div className="preview-body">{content[project.slug] || fallback}</div>
    </div>
  );
}

function Projects({ onSelect }: { onSelect: (p: typeof projects[number]) => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const getBentoClass = (index: number) => {
    if (index === 0) return 'bento-hero';
    if (index === 1 || index === 2) return 'bento-mid';
    return 'bento-compact';
  };

  return (
    <section id="projects" className="section-wrapper section-bg-projects">
      <motion.section ref={ref} style={{ scale, opacity }} className="section projects">
        <motion.div className="projects-top" {...reveal}>
          <div>
            <div className="section-label">03 / Selected work</div>
            <motion.h2
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: false, amount: 0.2 }}
              variants={headingContainer}
            >
              <div style={{ display: 'block', overflow: 'hidden' }}>
                <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                  Built for
                </motion.div>
              </div>
              <div style={{ display: 'block', overflow: 'hidden' }}>
                <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                  <span>the real world.</span>
                </motion.div>
              </div>
            </motion.h2>
          </div>
          <p>Selected platforms where product thinking, interface craft and technical detail come together.</p>
        </motion.div>

        <div className="bento-grid">
          {projects.map((p, i) => (
            <motion.article key={p.slug} className={`project ${getBentoClass(i)}`} {...reveal}>
              <button data-cursor="view" className="project-visual" onClick={() => onSelect(p)}>
                <ProjectPreview project={p} />
                <span className="view-project">
                  View case study <ArrowUpRight size={17} />
                </span>
              </button>
              <div className="project-info">
                <div className="project-header-meta">
                  <span className="project-number">{p.number}</span>
                  {i === 0 && <span className="bento-featured-badge"><span className="pulse-dot" /> FEATURED SAAS</span>}
                </div>
                <div>
                  <p className="eyebrow">{p.eyebrow}</p>
                  <h3>{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  <div className="tags">
                    {p.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                  <div className="project-actions">
                    <button className="text-link" style={{ margin: 0 }} onClick={() => onSelect(p)}>
                      Explore project <ArrowUpRight size={15} />
                    </button>
                    {(p as any).url && (
                      <a
                        href={(p as any).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link live-site-btn"
                      >
                        Visit Live Site <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <Magnetic className="all-projects">View all projects <ArrowDownRight size={16} /></Magnetic>
      </motion.section>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const journeyItems = [
    {
      year: '2024 - Till Now',
      title: 'Full Stack Developer',
      company: 'TResources Innovations Pvt Ltd',
      body: 'Driving the end-to-end development of dynamic, scalable web products. Architecting reliable backend systems with seamless integrations to React and Next.js interfaces, turning complex requirements into polished, high-performance product experiences.',
    },
    {
      year: '2018 - 2022',
      title: 'B.Tech in Civil Engineering',
      company: 'Ace Engineering College',
      body: 'Developed a rigorous foundation in strategic planning, analytical thinking, and complex structural problem-solving. This foundational logic smoothly transitioned into building robust, scalable architectures in software and full-stack environments.',
    }
  ];

  return (
    <section id="experience" className="section-wrapper section-bg-experience">
      <motion.section
        ref={ref}
        className="section experience"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="section-label" {...reveal}>04 / My Journey</motion.div>
        <motion.h2 initial="initial" whileInView="whileInView" viewport={{ once: false, amount: 0.2 }} variants={headingContainer}>
          <div style={{ display: 'block', overflow: 'hidden' }}>
            <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
              My journey.
            </motion.div>
          </div>
        </motion.h2>

        <div className="journey-timeline-wrap">
          {/* Animated Background Line */}
          <div className="journey-line">
            <motion.div style={{ width: '100%', height: '100%', background: '#0f756d', scaleY: pathLength, transformOrigin: 'top center' }} />
          </div>

          {journeyItems.map((item, i) => (
            <motion.div key={i} className="journey-item" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.1 }}>
              {/* Floating Node */}
              <div className="journey-node">
                <div className="journey-node-dot" />
              </div>

              <div className="journey-card">
                {/* Card Background Glow */}
                <div className="journey-card-glow" />

                <div className="journey-year">
                  {item.year}
                </div>
                <h3 className="journey-title">{item.title}</h3>
                <div className="journey-company">{item.company}</div>
                <p className="journey-body">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const isInView = useInView(ref, { once: false, margin: "-150px" });
  const [playKey, setPlayKey] = useState(0);
  const steps = [['01', 'Understand', 'Listen deeply, frame the actual problem, and identify the outcome worth pursuing.'], ['02', 'Plan', 'Turn uncertainty into a clear execution path before momentum creates expensive rework.'], ['03', 'Design', 'Shape interfaces around people, decisions, and the moments that genuinely matter.'], ['04', 'Build', 'Ship careful, scalable code with performance and accessibility built into the work.'], ['05', 'Launch', 'Test, release, learn — then keep improving what the product needs next.']];
  const [active, setActive] = useState(0);
  return (
    <section className="section-wrapper section-bg-process">
      <motion.section ref={ref} style={{ scale, opacity }} className="section process" onMouseEnter={() => setPlayKey(p => p + 1)}>
        <motion.div className="section-label" {...reveal}>05 / How I build</motion.div>
        <motion.div className="process-intro" {...reveal}>
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.2 }}
            variants={headingContainer}
          >
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                Clear thinking.
              </motion.div>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                <span>Confident shipping.</span>
              </motion.div>
            </div>
          </motion.h2>
          <p>Every useful product follows a rhythm. This is mine.</p>
        </motion.div>
        <div className="process-list" key={playKey}><motion.div className="process-line-active" initial={{ width: "0%" }} animate={isInView ? { width: "calc(100% - 60px)" } : { width: "0%" }} transition={{ duration: 2, ease: "easeInOut" }} />{steps.map(([number, title, body], i) => <motion.button initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }} transition={{ delay: i * 0.4, duration: 0.5, type: 'spring' }} className={active === i ? 'selected' : ''} onClick={() => setActive(i)} key={title}><span>{number}</span><strong>{title}</strong><div>{body}</div><ChevronRight size={18} /></motion.button>)}</div>
      </motion.section>
    </section>
  );
}

function Activity() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const explicitTheme = {
    light: ['#e7e2d9', '#c4dac5', '#9abf9c', '#6a9b6d', '#0f766e'],
    dark: ['#e7e2d9', '#c4dac5', '#9abf9c', '#6a9b6d', '#0f766e'],
  };
  return (
    <section className="section-wrapper section-bg-activity">
      <div className="section activity">
        <motion.div className="activity-card" {...reveal}>
          <div className="activity-top">
            <div>
              <div className="section-label">06 / Builder&apos;s log</div>
              <motion.h2
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: false, amount: 0.2 }}
                variants={headingContainer}
              >
                <div style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                    Steady craft,
                  </motion.div>
                </div>
                <div style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                    <span>visible progress.</span>
                  </motion.div>
                </div>
              </motion.h2>
            </div>
            <div className="live-dot"><i /> active</div>
          </div>
          <div className="activity-grid">
            <div className="contributions">
              <div className="contribution-head" style={{ marginBottom: '15px', alignItems: 'center' }}>
                <span>Contribution rhythm</span>
                <span style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px', background: 'color-mix(in srgb, var(--accent) 15%, transparent)', borderRadius: '4px', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)' }}>Live GitHub data</span>
              </div>
              <div style={{ overflowX: 'auto', paddingBottom: '10px', minHeight: '135px' }}>
                {mounted ? (
                  <GitHubCalendar username="Sandeepm33" theme={explicitTheme} blockSize={12} blockMargin={4} fontSize={10} />
                ) : (
                  <div style={{ height: '125px', width: '100%' }} />
                )}
              </div>
            </div>
            <div className="activity-stats">
              <div><strong>6</strong><small>featured products</small></div>
              <div><strong>2.1</strong><small>years experience</small></div>
              <div><strong>4</strong><small>domains explored</small></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '⚡ New Product', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const projectTypes = [
    { id: '⚡ New Product', label: '⚡ New Product' },
    { id: '🎨 Frontend UI/UX', label: '🎨 Frontend UI/UX' },
    { id: '🚀 Full-Stack App', label: '🚀 Full-Stack App' },
    { id: '🛠️ Improvement', label: '🛠️ Improvement' },
    { id: '💡 Other Concept', label: '💡 Other Concept' },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.type) next.type = 'Choose a project category.';
    if (form.message.trim().length < 12) next.message = 'Tell me a little more (12 characters minimum).';
    setErrors(next);
    if (Object.keys(next).length) { setState('error'); return; }
    setState('loading');
    emailjs.send(
      'service_ljeh49e',
      'template_saxsbhn',
      { from_name: form.name, from_email: form.email, project_type: form.type, message: form.message },
      'jjNHbEqnK46HE_ryq'
    ).then(() => {
      setState('success');
      setForm({ name: '', email: '', type: '⚡ New Product', message: '' });
    }, (error) => {
      setState('error');
      setErrors({ submit: 'Failed to send message. Please try again later.' });
      console.error(error.text);
    });
  };

  return (
    <section id="contact" className="section-wrapper section-bg-contact">
      <div className="section contact-innovative-wrap">
        {/* Left Side Info & One-click Cards */}
        <motion.div className="contact-info-col" {...reveal}>
          <div className="section-label">07 / Start something</div>
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.2 }}
            variants={headingContainer}
            className="contact-headline"
          >
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                Have an idea?
              </motion.div>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                <span>Let&apos;s build it.</span>
              </motion.div>
            </div>
          </motion.h2>

          <p className="contact-subtitle">
            Whether you&apos;re launching a new product, upgrading an existing application, or needing high-impact full-stack engineering—let&apos;s collaborate.
          </p>

          {/* Quick Contact Action Cards */}
          <div className="contact-action-cards">
            {/* Direct Email Card */}
            <a href="mailto:sandeepbhargavmurarishetti@gmail.com" className="contact-card glass-card">
              <div className="card-icon-wrap email">
                <Mail size={18} />
              </div>
              <div className="card-content">
                <span className="card-label">Email Address</span>
                <span className="card-value">sandeepbhargavmurarishetti@gmail.com</span>
              </div>
              <ArrowUpRight size={16} className="card-arrow" />
            </a>

            {/* Direct WhatsApp Card */}
            <a href="https://wa.me/919963887021" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
              <div className="card-icon-wrap whatsapp">
                <FaWhatsapp size={18} />
              </div>
              <div className="card-content">
                <span className="card-label">Instant Chat</span>
                <span className="card-value">+91 9963887021</span>
              </div>
              <ArrowUpRight size={16} className="card-arrow" />
            </a>

            {/* LinkedIn Card */}
            <a href="https://www.linkedin.com/in/sandeep-bhargav-murarishetty-742ab1205/" target="_blank" rel="noopener noreferrer" className="contact-card glass-card">
              <div className="card-icon-wrap linkedin">
                <Linkedin size={18} />
              </div>
              <div className="card-content">
                <span className="card-label">Professional Profile</span>
                <span className="card-value">LinkedIn / Sandeep Bhargav</span>
              </div>
              <ArrowUpRight size={16} className="card-arrow" />
            </a>
          </div>

          {/* Response Speed Guarantee */}
          <div className="reply-guarantee-badge">
            <span className="ping-dot" /> Typical response time: <strong>under 2 hours</strong>
          </div>
        </motion.div>

        {/* Right Side Innovative Form Card */}
        <motion.div className="contact-form-col" {...reveal}>
          <div className="form-card-glow-bg" />
          <form onSubmit={submit} noValidate className="innovative-contact-form glass-card">

            {/* Input Row */}
            <div className="form-inputs-grid">
              <div className="form-field-group">
                <label className="field-label">Your Name</label>
                <div className="input-wrap">
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Sandeep Bhargav"
                    className={errors.name ? 'has-error' : ''}
                  />
                </div>
                {errors.name && <span className="field-error-msg">{errors.name}</span>}
              </div>

              <div className="form-field-group">
                <label className="field-label">Your Email</label>
                <div className="input-wrap">
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className={errors.email ? 'has-error' : ''}
                  />
                </div>
                {errors.email && <span className="field-error-msg">{errors.email}</span>}
              </div>
            </div>

            {/* Interactive Project Type Chip Selector */}
            <div className="form-field-group">
              <label className="field-label">Project Category</label>
              <div className="project-chips-grid">
                {projectTypes.map((type) => {
                  const isSelected = form.type === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setForm({ ...form, type: type.id })}
                      className={`project-chip-btn ${isSelected ? 'active' : ''}`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="selectedChipBg"
                          className="chip-active-bg"
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}
                      <span className="chip-text">{type.label}</span>
                    </button>
                  );
                })}
              </div>
              {errors.type && <span className="field-error-msg">{errors.type}</span>}
            </div>

            {/* Message Area */}
            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-label">Tell me about your project</label>
                <span className="char-count">{form.message.length} chars</span>
              </div>
              <div className="input-wrap">
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Share details on your goal, timeline, tech stack, or scope..."
                  rows={4}
                  className={errors.message ? 'has-error' : ''}
                />
              </div>
              {errors.message && <span className="field-error-msg">{errors.message}</span>}
            </div>

            {/* Submit Button & Feedback */}
            <div className="form-submit-row">
              <button
                type="submit"
                className={`innovative-submit-btn ${state === 'loading' ? 'is-loading' : ''} ${state === 'success' ? 'is-success' : ''}`}
                disabled={state === 'loading'}
              >
                <span className="btn-content">
                  {state === 'loading' ? (
                    <>Sending message...</>
                  ) : state === 'success' ? (
                    <><Check size={18} /> Message Sent!</>
                  ) : (
                    <>Start a conversation <Send size={16} className="send-icon" /></>
                  )}
                </span>
              </button>

              {errors.submit && <p className="form-submit-error">{errors.submit}</p>}
              {state === 'success' && (
                <p className="form-submit-success">
                  <Check size={15} /> Thank you! Your message was sent successfully. I will get back to you shortly.
                </p>
              )}
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudy({ project, close }: { project: typeof projects[number] | null; close: () => void }) { useEffect(() => { const key = (e: KeyboardEvent) => e.key === 'Escape' && close(); window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [close]); return <AnimatePresence>{project && <motion.div className="modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${project.title} case study`} onMouseDown={close}><motion.article className="case-study" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onMouseDown={e => e.stopPropagation()}><button className="case-close" onClick={close} aria-label="Close case study"><X size={20} /></button><p className="eyebrow">CASE STUDY / {project.number}</p><h2>{project.title}</h2><ProjectPreview project={project} /><div className="case-grid"><div><small>THE PROBLEM</small><p>{project.problem}</p></div><div><small>THE SOLUTION</small><p>{project.description}</p></div><div><small>ARCHITECTURE</small><p>{project.architecture}</p></div><div><small>RESULT</small><p>{project.result}</p></div></div><div className="case-footer"><div className="tags">{project.tech.map(t => <span key={t}>{t}</span>)}</div><div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>{(project as any).url && <a href={(project as any).url} target="_blank" rel="noopener noreferrer" className="button ghost glass" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>Visit Live Site <ArrowUpRight size={14} /></a>}<button className="button primary" onClick={close}>Back to work <ArrowDownRight size={16} /></button></div></div></motion.article></motion.div>}</AnimatePresence> }

function ResumeSection() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  return (
    <>
      <section className="section-wrapper section-bg-resume">
        <div className="section resume-section-inner" style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>08 / Full History</p>
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.2 }}
            variants={headingContainer}
            style={{ margin: '0 0 30px' }}
          >
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                View my
              </motion.div>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <motion.div style={{ display: 'inline-block' }} variants={headingLine}>
                <span>full experience.</span>
              </motion.div>
            </div>
          </motion.h2>
          <button className="button ghost glass" onClick={() => setOpen(true)} style={{ fontSize: '12px', padding: '16px 24px' }}>
            Preview Resume <ArrowUpRight size={16} />
          </button>
        </div>
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

function Footer() {
  return (
    <footer className="section-wrapper section-bg-footer">
      <div className="footer-inner">
        <a className="brand" href="#home">SANDEEP<span>.DEV</span></a>
        <p>Designed & engineered with intention.</p>
        <span>© {new Date().getFullYear()} Sandeep Bhargav</span>
      </div>
    </footer>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<typeof projects[number] | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setHydrated(true);
  }, []);



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className={hydrated && reduce ? 'reduce-motion' : ''}>
      <Preloader />
      <Cursor />
      <Navbar
        onOpenSearch={() => setCommandPaletteOpen(true)}
      />
      <Hero />
      <Intro />
      <TechStack />
      <Projects onSelect={setSelected} />
      <Experience />
      <Process />
      <Activity />
      <Contact />
      <ResumeSection />
      <Footer />

      <CaseStudy
        project={selected}
        close={() => setSelected(null)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={setSelected}
        projects={projects}
      />
      <FloatingContact />
    </main>
  );
}

function FloatingContact() {
  return (
    <div className="floating-contact-wrap">
      <a
        href="https://www.linkedin.com/in/sandeep-bhargav-murarishetty-742ab1205/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn linkedin"
        aria-label="LinkedIn Profile"
        data-tooltip="LinkedIn Profile"
      >
        <Linkedin size={18} />
      </a>
      <a
        href="https://wa.me/919963887021"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="Chat on WhatsApp"
        data-tooltip="Chat on WhatsApp"
      >
        <FaWhatsapp size={20} />
      </a>
      <a
        href="tel:+919963887021"
        className="floating-btn phone"
        aria-label="Call Sandeep"
        data-tooltip="Call Sandeep"
      >
        <FaPhoneAlt size={18} />
      </a>
    </div>
  );
}

