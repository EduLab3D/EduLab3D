import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const activeLang = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0];
  const currentLang = languages.find(l => l.code === activeLang) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Google Translate if it hasn't loaded yet
  useEffect(() => {
    const checkGoogleTranslate = () => {
      if ((window as any).google && (window as any).google.translate && (window as any).google.translate.TranslateElement) {
        const element = document.getElementById('google_translate_element');
        if (element && element.innerHTML === '') {
          new (window as any).google.translate.TranslateElement(
            {pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false},
            'google_translate_element'
          );
        }
      }
    };
    
    // Check immediately
    checkGoogleTranslate();
    
    // And check periodically for a few seconds in case script loads late
    const interval = setInterval(checkGoogleTranslate, 1000);
    setTimeout(() => clearInterval(interval), 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="language-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-btn"
        aria-label="Switch Language"
        aria-expanded={isOpen}
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`language-option ${activeLang === lang.code ? 'active' : ''}`}
            >
              <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.3rem 0' }} />
          
          <div style={{ padding: '0 0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.2rem' }}>More languages</span>
            <div 
              id="google_translate_element" 
              style={{ 
                minHeight: '20px'
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
