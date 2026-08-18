'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, FolderGit2, Sparkles, Sun, Moon, Download, Copy, Check, ArrowRight, CornerDownLeft, Linkedin } from 'lucide-react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

interface Project {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  url?: string;
  description: string;
  role: string;
  tech: string[];
  features: string[];
  accent: string;
  architecture: string;
  problem: string;
  result: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  light: boolean;
  setLight: (light: boolean) => void;
  onSelectProject: (project: Project) => void;
  projects: Project[];
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Projects' | 'Actions';
  icon: React.ReactNode;
  shortcut?: string[];
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  light,
  setLight,
  onSelectProject,
  projects,
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle email copy feedback timeout
  useEffect(() => {
    if (emailCopied) {
      const t = setTimeout(() => setEmailCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [emailCopied]);

  // Define commands list
  const commands = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [
      // Navigation
      {
        id: 'nav-home',
        title: 'Go to Home',
        subtitle: 'Back to the start / Hero section',
        category: 'Navigation',
        icon: <Compass size={18} />,
        shortcut: ['G', 'H'],
        action: () => {
          document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-about',
        title: 'Go to About',
        subtitle: 'Learn more about Sandeep\'s journey & stats',
        category: 'Navigation',
        icon: <Compass size={18} />,
        shortcut: ['G', 'A'],
        action: () => {
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-skills',
        title: 'Go to Skills',
        subtitle: 'Explore technologies and core tools',
        category: 'Navigation',
        icon: <Compass size={18} />,
        shortcut: ['G', 'S'],
        action: () => {
          document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-projects',
        title: 'Go to Projects',
        subtitle: 'Browse selected application portfolio',
        category: 'Navigation',
        icon: <Compass size={18} />,
        shortcut: ['G', 'P'],
        action: () => {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-experience',
        title: 'Go to Experience',
        subtitle: 'Check professional experience timeline',
        category: 'Navigation',
        icon: <Compass size={18} />,
        shortcut: ['G', 'E'],
        action: () => {
          document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-contact',
        title: 'Go to Contact',
        subtitle: 'Get in touch / Start a project discussion',
        category: 'Navigation',
        icon: <Compass size={18} />,
        shortcut: ['G', 'C'],
        action: () => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },

      // Actions
      {
        id: 'action-theme',
        title: `Switch to ${light ? 'Dark' : 'Light'} Mode`,
        subtitle: `Toggle the application color theme to ${light ? 'dark' : 'light'}`,
        category: 'Actions',
        icon: light ? <Moon size={18} /> : <Sun size={18} />,
        shortcut: ['T'],
        action: () => {
          setLight(!light);
        },
      },
      {
        id: 'action-resume',
        title: 'Download Resume',
        subtitle: 'Open the PDF resume in a new tab',
        category: 'Actions',
        icon: <Download size={18} />,
        shortcut: ['R'],
        action: () => {
          window.open('/images/Sandeep%20bhargav%20_resume.pdf', '_blank');
          onClose();
        },
      },
      {
        id: 'action-email',
        title: emailCopied ? 'Email Copied!' : 'Copy Email Address',
        subtitle: emailCopied ? 'Successfully copied' : 'Copy developer contact email to clipboard',
        category: 'Actions',
        icon: emailCopied ? <Check size={18} className="success-icon" /> : <Copy size={18} />,
        shortcut: ['E'],
        action: () => {
          navigator.clipboard.writeText('sandeepbhargavmurarishetti@gmail.com');
          setEmailCopied(true);
        },
      },
      {
        id: 'action-whatsapp',
        title: 'Chat on WhatsApp',
        subtitle: 'Start a direct chat with Sandeep (+91 9963887021)',
        category: 'Actions',
        icon: <FaWhatsapp size={18} />,
        shortcut: ['W'],
        action: () => {
          window.open('https://wa.me/919963887021', '_blank');
          onClose();
        },
      },
      {
        id: 'action-phone',
        title: 'Call Sandeep',
        subtitle: 'Call mobile number +91 9963887021',
        category: 'Actions',
        icon: <FaPhoneAlt size={18} />,
        shortcut: ['P'],
        action: () => {
          window.open('tel:+919963887021', '_self');
          onClose();
        },
      },
      {
        id: 'action-linkedin',
        title: 'Open LinkedIn Profile',
        subtitle: 'Visit Sandeep\'s LinkedIn profile',
        category: 'Actions',
        icon: <Linkedin size={18} />,
        shortcut: ['L'],
        action: () => {
          window.open('https://www.linkedin.com/in/sandeep-bhargav-murarishetty-742ab1205/', '_blank');
          onClose();
        },
      },
    ];

    // Add projects dynamically
    projects.forEach((proj) => {
      list.push({
        id: `project-${proj.slug}`,
        title: `View Project: ${proj.title}`,
        subtitle: proj.eyebrow,
        category: 'Projects',
        icon: <FolderGit2 size={18} />,
        action: () => {
          onSelectProject(proj);
          onClose();
        },
      });
    });

    return list;
  }, [projects, light, setLight, onClose, onSelectProject, emailCopied]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const query = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(query) ||
        cmd.subtitle.toLowerCase().includes(query) ||
        cmd.category.toLowerCase().includes(query)
    );
  }, [commands, search]);

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  // Keyboard navigation & triggering
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex, onClose]);

  // Scroll active item into view inside list container
  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const categories: Record<string, typeof filteredCommands> = {};
    filteredCommands.forEach((cmd, globalIndex) => {
      // Attach the global index to the command object so we can know its correct index when clicked
      const itemWithIndex = { ...cmd, globalIndex };
      if (!categories[cmd.category]) {
        categories[cmd.category] = [];
      }
      categories[cmd.category].push(itemWithIndex as any);
    });
    return categories;
  }, [filteredCommands]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="command-palette-wrapper">
        {/* Backdrop overlay */}
        <motion.div
          className="command-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Command palette modal box */}
        <motion.div
          className="command-palette-dialog glass"
          initial={{ opacity: 0, scale: 0.97, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Search Input */}
          <div className="command-palette-header">
            <Search className="search-icon" size={18} />
            <input
              ref={inputRef}
              type="text"
              className="command-palette-input"
              placeholder="Search sections, projects, and actions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <kbd className="esc-shortcut">ESC</kbd>
          </div>

          {/* List items */}
          <div className="command-palette-body" ref={listRef}>
            {filteredCommands.length === 0 ? (
              <div className="command-palette-empty">
                <Sparkles className="empty-icon" size={24} />
                <p>No results found for &ldquo;{search}&rdquo;</p>
                <small>Try searching for &apos;theme&apos;, &apos;resume&apos;, or a project name.</small>
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="command-palette-group">
                  <div className="command-palette-group-title">{category}</div>
                  <div className="command-palette-group-items">
                    {items.map((item: any) => {
                      const isSelected = activeIndex === item.globalIndex;
                      return (
                        <div
                          key={item.id}
                          className={`command-palette-item ${isSelected ? 'active' : ''}`}
                          data-active={isSelected}
                          onMouseEnter={() => setActiveIndex(item.globalIndex)}
                          onClick={item.action}
                        >
                          <div className="command-palette-item-icon">{item.icon}</div>
                          <div className="command-palette-item-content">
                            <span className="command-palette-item-title">{item.title}</span>
                            <span className="command-palette-item-subtitle">{item.subtitle}</span>
                          </div>
                          {item.shortcut && (
                            <div className="command-palette-item-shortcuts">
                              {item.shortcut.map((key: string) => (
                                <kbd key={key}>{key}</kbd>
                              ))}
                            </div>
                          )}
                          <ArrowRight className="command-palette-item-arrow" size={14} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          <div className="command-palette-footer">
            <div className="footer-shortcut">
              <kbd>↑↓</kbd> <span>to navigate</span>
            </div>
            <div className="footer-shortcut">
              <kbd><CornerDownLeft size={10} /></kbd> <span>to select</span>
            </div>
            <div className="footer-shortcut">
              <kbd>ESC</kbd> <span>to close</span>
            </div>
            <div className="footer-brand">Sandeep.dev</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
