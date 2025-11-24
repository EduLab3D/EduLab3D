import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

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
    <div className="language-switcher" style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 500,
          padding: '0.4rem 0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'white',
          transition: 'all 0.2s ease'
        }}
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

      <div style={{
        position: 'absolute',
        top: '120%',
        right: 0,
        background: '#1a1a1a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '0.5rem',
        minWidth: '160px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '0.2rem'
      }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            style={{
              background: activeLang === lang.code ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textAlign: 'left',
              fontSize: '0.9rem',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = activeLang === lang.code ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
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
              // We hide the default google widget styling a bit to make it fit
              minHeight: '20px'
            }} 
          />
        </div>
      </div>
    </div>
  );
}
