import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from 'react-icons/go';
import GlassSurface from '../GlassSurface/GlassSurface';
import './CardNav.css';

const CardNav = ({
                     logo,
                     logoAlt = 'Logo',
                     items,
                     className = '',
                     ease = 'power3.out',
                     baseColor = '#fff',
                     menuColor,
                     buttonBgColor,
                     buttonTextColor
                 }) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 220;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content');
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                void contentEl.offsetHeight;

                const topBar = 50;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 220;
    };

    const createTimeline = (customDuration) => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: customDuration || 0.4, // 열릴 때 0.4, 닫힐 때 customDuration
            ease
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: customDuration || 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            // 닫힐 때는 timeline 대신 gsap.to로 자연스럽게 빠르게 닫기
            const navEl = navRef.current;
            const cards = cardsRef.current;
            gsap.to(navEl, {
                height: 60,
                duration: 0.2,
                ease,
                onComplete: () => setIsExpanded(false)
            });
            gsap.to(cards, {
                y: 50,
                opacity: 0,
                duration: 0.2,
                ease
            });
        }
    };

    const setCardRef = i => el => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <GlassSurface
                width="100%"
                height="auto"
                borderRadius={48}
                brightness={20}
                opacity={0.7}
                blur={8}
                backgroundOpacity={0.03}
                saturation={1}
                mixBlendMode="normal"
                className="card-nav-glass"
            >
                <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: 'transparent' }}>
                    <div className="card-nav-top">
                        <div
                            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                            onClick={toggleMenu}
                            role="button"
                            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                            tabIndex={0}
                            style={{ color: '#fff' }}
                        >
                            <div className="hamburger-line" />
                            <div className="hamburger-line" />
                        </div>

                        <div className="logo-container" style={{cursor: 'pointer'}} onClick={() => { window.location.hash = '/'; }}>
                            <img src={logo} alt={logoAlt} className="logo" />
                        </div>

                        <button
                            type="button"
                            className="card-nav-cta-button"
                        >
                            <svg className="cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="cta-label">Browse simulations</span>
                        </button>
                    </div>

                    <div className="card-nav-content" aria-hidden={!isExpanded}>
                        {(items || []).slice(0, 3).map((item, idx) => (
                            <div
                                key={`${item.label}-${idx}`}
                                className="nav-card"
                                ref={setCardRef(idx)}
                                style={{ backgroundColor: 'transparent', color: item.textColor }}
                            >
                                <div className="nav-card-label">{item.label}</div>
                                <div className="nav-card-links">
                                    {item.links?.map((lnk, i) => (
                                        <a key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>
                                            <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                                            {lnk.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </nav>
            </GlassSurface>
        </div>
    );
};

export default CardNav;
