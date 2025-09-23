import React from 'react';
import CardNav from './components/CardNav';
import logo from './image/logo.svg';
import ProfileCard from './ProfileCard/ProfileCard';

const developer = {
  name: 'DEVLOG',
  role: 'Frontend Developer',
  bio: '안녕하십니까! EduLab3D 총괄 개발자 DEVLOG입니다! 혹시 버그를 발견하셨다면, support@edulab3d.tech로 알려주시면 바로 수정하겠습니다. 감사합니다!',
  avatar: logo,
  socials: [
    { name: 'GitHub', url: 'https://github.com/logouter024516', icon: '🐙' },
    { name: 'E-mail', url: 'mailto:mhy9203.develop@gmail.com', icon: '💼' },
    { name: 'Twitter', url: 'https://x.com/DLKR0_0', icon: '🐦' },
  ],
};
const developer2 = {
  name: 'waxifyx',
  role: 'Science Experiment Developer',
  bio: '밀랍칠하는중...',
  avatar: logo,
  socials: [
    { name: 'GitHub', url: 'https://github.com/waxifyx', icon: '🐙' },
    { name: 'E-mail', url: 'mailto:support@edulab3d.tech', icon: '💼' },
  ],
};

const Creators = () => {
  const items = [
    {
      label: 'About',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'EduLab3D?', ariaLabel: 'What is EduLab3D?', href: '/#/about' },
        { label: 'Creators', ariaLabel: 'Who are the creators?', href: '/#/creators' },
      ]
    },
    {
      label: 'Experiments',
      bgColor: '#170D27',
      textColor: '#fff',
      links: [
        { label: 'Find by level', ariaLabel: 'experiments finder' },
        { label: 'All experiments', ariaLabel: 'experiments finder' }
      ]
    },
    {
      label: 'Contact',
      bgColor: '#271E37',
      textColor: '#fff',
      links: [
        { label: 'Email', ariaLabel: 'Email us', href: 'mailto:support@edulab3d.tech' },
        { label: 'Github', ariaLabel: 'THIS PROJECT IS OPEN SOURCE!!!!!!!!!!!', href: 'https://github.com/EduLab3D/EduLab3D' },
      ]
    }
  ];

  return (
    <div style={{ background: '#181A20', position: 'relative', minHeight: '100vh' }}>
      <header className="App-header" style={{ margin: 0, padding: 0, minHeight: 0 }}>
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap', paddingTop: '140px' }}>
        {[developer, developer2].map((dev) => (
          <ProfileCard
            key={dev.name}
            name={dev.name}
            title={dev.role}
            handle={(dev.name || '').replace(/\s+/g, '').toLowerCase()}
            status={dev.status || 'Online'}
            contactText="Contact"
            avatarUrl={dev.avatar}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              const email = dev.socials?.find(s => s.name === 'E-mail')?.url;
              if (email) window.location.href = email;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Creators;
