import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { User as UserIcon, Edit3, Trophy, Calendar, Zap, Coins } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: any;
  setUser: (user: any) => void;
  battles: any[];
  leaderboard: any[];
  theme: 'light' | 'dark';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  user,
  setUser,
  battles,
  leaderboard,
  theme,
}) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
      position: 'relative',
      zIndex: 1000
    }}>
      <BackgroundFX theme={theme} />
      
      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={true}
        onOpenSettings={() => onNavigate('settings')}
        theme={theme}
      />
      
      {/* Основной контент */}
      <div style={{
        maxWidth: '448px',
        margin: '20px auto',
        padding: '16px',
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderRadius: '16px',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
        zIndex: 10,
        position: 'relative'
      }}>
        {/* AUTOGEN START profile-content */}
        <div style={{
          maxWidth: '448px',
          margin: '0 auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: 'calc(96px + env(safe-area-inset-bottom))'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            paddingTop: '20px'
          }}>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              margin: 0
            }}>
              Профиль
            </h1>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              aria-label="Настройки профиля"
            >
              <Edit3 size={20} color={theme === 'dark' ? '#E8ECF2' : '#0F172A'} />
            </button>
          </div>

          {/* Profile Card */}
          <div style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: theme === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#2B82FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Handle file upload logic here
                      console.log('Avatar file selected:', file);
                    }
                  };
                  input.click();
                }}
              >
                <UserIcon size={40} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  margin: '0 0 4px 0'
                }}>
                  {user?.name || 'Пользователь'}
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  margin: '0 0 4px 0'
                }}>
                  Уровень {user?.level || 1}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  margin: 0
                }}>
                  {user?.team || 'Команда не указана'}
                </p>
              </div>
            </div>

            {/* Level Progress */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}>
                  Прогресс уровня
                </span>
                <span style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}>
                  {user?.experience || 0} / {user?.maxExperience || 100} XP
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(((user?.experience || 0) / (user?.maxExperience || 100)) * 100, 100)}%`,
                  height: '100%',
                  backgroundColor: '#2B82FF',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2B82FF',
                  marginBottom: '4px'
                }}>
                  {battles?.filter(b => b.winnerId === user?.id).length || 0}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}>
                  Побед
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2B82FF',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}>
                  {user?.balance || 0}
                  <Coins size={16} color="#FFD700" />
                </div>
                <div style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}>
                  Баланс
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2B82FF',
                  marginBottom: '4px'
                }}>
                  0
                </div>
                <div style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}>
                  Ачивки
                </div>
              </div>
            </div>
          </div>

          {/* My Battles */}
          <div style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: theme === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Trophy size={20} color="#2B82FF" />
              Мои баттлы
            </h3>
            {battles?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {battles.slice(0, 3).map((battle, index) => (
                  <div key={index} style={{
                    padding: '12px',
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                        marginBottom: '4px'
                      }}>
                        {battle.title || `Баттл #${index + 1}`}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}>
                        {battle.status || 'Завершен'}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#2B82FF'
                    }}>
                      {battle.score || 0}
                    </div>
                  </div>
                ))}
                {battles.length > 3 && (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2B82FF',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'dark' ? 'rgba(43, 130, 255, 0.1)' : 'rgba(43, 130, 255, 0.05)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Показать все ({battles.length})
                  </button>
                )}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}>
                <Trophy size={32} color={theme === 'dark' ? '#A7B0BD' : '#6B7280'} style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Пока нет баттлов</p>
              </div>
            )}
          </div>
        </div>
        {/* AUTOGEN END profile-content */}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="profile"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};