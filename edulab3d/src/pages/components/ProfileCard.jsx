import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <img className="profile-avatar" src={profile.avatar} alt={`${profile.name} avatar`} />
      <h3 className="profile-name">{profile.name}</h3>
      <div className="profile-role">{profile.role}</div>
      <p className="profile-bio">{profile.bio}</p>
      <div className="profile-socials">
        {profile.socials?.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="profile-social">
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
