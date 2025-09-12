import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { 
  User, 
  Camera, 
  Edit3, 
  Trophy, 
  Calendar, 
  Star, 
  TrendingUp,
  Settings,
  Award,
  Target,
  Clock,
  Coins,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  Zap
} from 'lucide-react';
import { User as UserType, Battle, LeaderboardEntry } from '../types/global';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: UserType;
  setUser: (user: UserType) => void;
  battles: Battle[];
  leaderboard: LeaderboardEntry[];
  theme: 'light' | 'dark';
}

type TabType = 'overview' | 'battles' | 'achievements';

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  user,
  setUser,
  battles,
  leaderboard,
  theme,
}) => {
  console.log('ProfilePage rendering with:', { user, battles, leaderboard, theme });
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);
  const [isBattleHistoryOpen, setIsBattleHistoryOpen] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(user.avatar || null);

  // Подсчитываем статистику пользователя
  const userWins = battles.filter(battle => 
    battle.status === 'completed' && battle.winnerId === user.id
  ).length;

  const userBalance = user.balance || 0;
  const userAchievements = 0; // Placeholder

  // Создаем профиль пользователя согласно спецификации
  const userProfile = {
    id: user.id || 'current-user',
    name: user.name || 'Вы',
    birthDate: '—', // Из админки
    position: '—', // Из админки
    team: '—', // Из админки
    experience: '—', // Из админки
    teamLead: '—', // Из админки
    registrationDate: '—', // Из админки
    level: user.level || 1,
    experience_points: user.experience || 0,
    max_experience: user.maxExperience || 100,
    wins: userWins,
    balance: userBalance.toString(),
    achievements: userAchievements,
    avatar: profilePhoto
  };

  // Объединяем баттлы пользователя
  const userBattles = battles.filter(battle => 
    battle.challengerId === user.id || battle.opponentId === user.id
  ).map(battle => ({
    id: battle.id,
    opponent: {
      name: battle.challengerId === user.id ? battle.opponentName : battle.challengerName,
      team: 'Team 1', // placeholder
      avatar: undefined
    },
    reward: battle.stake,
    status: battle.status === 'completed' ? 'completed' : 
            battle.status === 'active' ? 'active' : 'waiting',
    dateCreated: battle.createdAt?.toISOString() || new Date().toISOString(),
    result: battle.status === 'completed' ? 
      (battle.winnerId === user.id ? 'won' : 'lost') : 
      undefined
  }));

  // Функции для статусов баттлов
  const getStatusColor = (status: string, result?: string) => {
    switch (status) {
      case 'active': return 'text-blue-500';
      case 'waiting': return 'text-orange-500';
      case 'completed':
        return result === 'won' ? 'text-green-500' : 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string, result?: string) => {
    switch (status) {
      case 'active': return 'В процессе';
      case 'waiting': return 'Ожидание';
      case 'completed': return result === 'won' ? 'Победа' : 'Поражение';
      default: return status;
    }
  };

  const getStatusIcon = (status: string, result?: string) => {
    switch (status) {
      case 'active': return <Zap size={16} className="text-blue-500" />;
      case 'waiting': return <Calendar size={16} className="text-orange-500" />;
      case 'completed': return <Trophy size={16} className={result === 'won' ? 'text-green-500' : 'text-red-500'} />;
      default: return null;
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        setUser({
          ...user,
          avatar: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
      setIsPhotoUploadOpen(false);
    }
  };

  const handleOpenSettings = () => {
    onNavigate('home'); // Возвращаемся на главную для открытия настроек
    setTimeout(() => {
      // Здесь должен быть вызов onOpenSettings, но пока просто возвращаемся на главную
    }, 100);
  };

  console.log('ProfilePage render start');

  try {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA' }}>
      <BackgroundFX theme={theme} />
      
      {/* Header без иконки пользователя */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={true}
        onOpenSettings={handleOpenSettings}
        theme={theme}
      />
      
      {/* Отладочный заголовок */}
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        border: '2px solid red',
        margin: '10px'
      }}>
        <h1 style={{ color: 'red', fontSize: '24px' }}>PROFILE PAGE DEBUG</h1>
        <p style={{ color: 'red' }}>User: {user?.name || 'No user'}</p>
        <p style={{ color: 'red' }}>Battles: {battles?.length || 0}</p>
        <p style={{ color: 'red' }}>Theme: {theme}</p>
      </div>
      
      {/* Основной контейнер */}
      <div className="max-w-md mx-auto px-4 pb-24">
        
        {/* Блок фото и базовой информации */}
        <div className="flex gap-4 mb-6">
          
          {/* Левая колонка - Фото пользователя */}
          <div className="flex flex-col items-center gap-2">
            <div 
              className="rounded-3xl p-3 w-32 h-32 flex items-center justify-center relative"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Кнопка редактирования */}
              <button 
                onClick={() => setIsPhotoUploadOpen(true)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Edit3 style={{ width: '12px', height: '12px', color: 'white' }} />
              </button>

              {/* Аватар или заглушка */}
              {profilePhoto ? (
                <img 
                  src={profilePhoto} 
                  alt="Профиль" 
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '16px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div 
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '16px',
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <User style={{ 
                    width: '40px', 
                    height: '40px', 
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' 
                  }} />
                </div>
              )}
            </div>
            
            {/* Никнейм */}
            <div 
              style={{
                fontSize: '14px',
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                textAlign: 'center',
                opacity: 0.5
              }}
            >
              @user
            </div>
          </div>

          {/* Правая колонка - Информационная карточка */}
          <div 
            className="flex-1 rounded-3xl p-4"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              {/* Каждая строка информации */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Id:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.id || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Имя:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.name || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>ДР:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.birthDate || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Должность:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.position || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Команда:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.team || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Стаж:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.experience || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Тимлид:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.teamLead || '—'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  width: '80px'
                }}>Регистрация:</span>
                <span style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '4px'
                }}>
                  {userProfile.registrationDate || '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Блок "Мои баттлы" */}
        <div 
          className="rounded-3xl p-4 mb-6"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Заголовок с кнопкой */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', position: 'relative' }}>
            <div style={{ flex: 1 }}></div>
            <h3 style={{ 
              fontWeight: '500',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '16px'
            }}>Мои баттлы</h3>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsBattleHistoryOpen(true)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Eye style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }} />
              </button>
            </div>
          </div>

          {/* Список баттлов */}
          {userBattles.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {userBattles.slice(0, 3).map((battle) => (
                <div 
                  key={battle.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Левая часть - информация о сопернике */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <User size={16} style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                        {battle.opponent.name || 'Соперник'}
                      </div>
                      <div style={{ fontSize: '12px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
                        {battle.opponent.team}
                      </div>
                    </div>
                  </div>
                  
                  {/* Правая часть - статус и награда */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      {getStatusIcon(battle.status, battle.result)}
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: '500',
                        color: getStatusColor(battle.status, battle.result)
                      }}>
                        {getStatusText(battle.status, battle.result)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
                        {battle.reward}
                      </span>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#FCD34D',
                        borderRadius: '50%'
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
              <p style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                fontSize: '14px',
                textAlign: 'center',
                opacity: 0.7
              }}>
                История баттлов отсутствует
              </p>
            </div>
          )}
        </div>

        {/* Полоска прогресса уровня */}
        <div 
          className="rounded-3xl p-4 mb-6"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
            }}>Статус: Новичок</span>
            <span style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
            }}>XP: {userProfile.experience_points}</span>
            <span style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
            }}>lvl {userProfile.level}</span>
          </div>
          <div 
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                width: `${(userProfile.experience_points / userProfile.max_experience) * 100}%`,
                height: '100%',
                backgroundColor: '#3B82F6',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Блок статистики (3 колонки) */}
        <div 
          className="rounded-3xl p-4"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            
            {/* 1. Количество побед */}
            <div 
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '12px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '4px'
              }}>Побед</div>
              <div style={{ 
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '16px'
              }}>{userProfile.wins}</div>
            </div>
            
            {/* 2. Баланс коинов */}
            <div 
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '12px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '4px'
              }}>Баланс</div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '4px'
              }}>
                <span style={{ 
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  fontSize: '16px'
                }}>{userProfile.balance}</span>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  backgroundColor: '#FCD34D',
                  borderRadius: '50%'
                }} />
              </div>
            </div>
            
            {/* 3. Достижения */}
            <div 
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '12px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '4px'
              }}>Ачивки</div>
              <div style={{ 
                fontWeight: '500',
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                fontSize: '16px',
                opacity: 0.5
              }}>—</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="profile"
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Модал загрузки фото */}
      {isPhotoUploadOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div 
            style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '320px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: '600',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                marginBottom: '8px'
              }}>Фото профиля</h3>
              <p style={{ 
                fontSize: '14px',
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                textAlign: 'center'
              }}>Выберите фото для профиля</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ cursor: 'pointer' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  style={{ display: 'none' }} 
                />
                <div 
                  style={{
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Загрузить фото
                </div>
              </label>
              
              <button 
                onClick={() => setIsPhotoUploadOpen(false)}
                style={{
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '12px',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  cursor: 'pointer'
                }}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модал всех баттлов */}
      {isBattleHistoryOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div 
            style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '60vh',
              overflow: 'auto'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: '600',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}>Все мои баттлы</h3>
              <button 
                onClick={() => setIsBattleHistoryOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X style={{ width: '20px', height: '20px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {userBattles.length > 0 ? (
                userBattles.map((battle) => (
                  <div 
                    key={battle.id} 
                    style={{
                      padding: '12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '12px',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <User size={18} style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                            {battle.opponent.name || 'Соперник'}
                          </div>
                          <div style={{ fontSize: '12px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
                            {battle.opponent.team}
                          </div>
                          <div style={{ fontSize: '12px', marginTop: '4px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}>
                            {new Date(battle.dateCreated).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                          {getStatusIcon(battle.status, battle.result)}
                          <span style={{ 
                            fontSize: '14px', 
                            fontWeight: '500',
                            color: getStatusColor(battle.status, battle.result)
                          }}>
                            {getStatusText(battle.status, battle.result)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                          <span style={{ fontSize: '14px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
                            {battle.reward}
                          </span>
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            backgroundColor: '#FCD34D',
                            borderRadius: '50%'
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                  <p style={{ 
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                    fontSize: '14px',
                    textAlign: 'center',
                    opacity: 0.7
                  }}>
                    История баттлов отсутствует
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  } catch (error) {
    console.error('ProfilePage render error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Ошибка загрузки профиля</h2>
          <p className="text-gray-600 mb-4">Произошла ошибка при загрузке страницы профиля</p>
          <button 
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }
};