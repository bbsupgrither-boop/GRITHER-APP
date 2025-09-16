import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { Logo } from './Logo';
import { ProductionModal } from './ProductionModal';
import { 
  Trophy, 
  Eye, 
  Plus, 
  Menu, 
  Check,
  ArrowLeft,
  User,
  Star,
  Zap,
  Target,
  Award,
  TrendingUp,
  Crown,
  Coins,
  Clock,
  Shield,
  Bell
} from 'lucide-react';
import { Achievement } from '../types/achievements';
import { Battle, BattleInvitation, User as UserType } from '../types/battles';
import { Notification } from '../types/notifications';
import { LeaderboardEntry } from '../types/global';
import { getCurrentLevelData } from '../data/levels';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  achievements: Achievement[];
  theme: 'light' | 'dark';
  notifications: Notification[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  battles: Battle[];
  battleInvitations: BattleInvitation[];
  users: UserType[];
  leaderboard: LeaderboardEntry[];
  currentUser?: UserType;
  onCreateBattle?: () => void;
  onAcceptBattleInvitation?: (invitationId: string) => void;
  onDeclineBattleInvitation?: (invitationId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currentPage,
  onOpenSettings,
  achievements,
  theme,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  battles,
  battleInvitations,
  users,
  leaderboard,
  onAcceptBattleInvitation,
  onDeclineBattleInvitation,
  onCreateBattle,
  currentUser
}) => {
  // Mock data for battles
  const activeBattles = [
    { id: '1', opponent: 'Р В РІР‚СћР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р’В° Р В РЎС™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°', status: 'active' }
  ];

  const mockBattleInvitations = [
    { id: '1', challenger: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°', status: 'pending' },
    { id: '2', challenger: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°', status: 'pending' }
  ];

  const mockLeaderboard = [
    { id: '1', name: 'Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ ', level: 18 },
    { id: '2', name: 'Р В РІР‚СћР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р’В° Р В РЎС™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°', level: 16 },
    { id: '3', name: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°', level: 15 }
  ];

  // Get current level data for display
  const userExperience = currentUser?.experience || 0;
  const currentLevelData = getCurrentLevelData(userExperience);

  // Sorting state for leaderboard
  const [leaderboardSort, setLeaderboardSort] = useState<'level' | 'achievements' | 'balance'>('level');
  
  // Achievements modal state
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'level': return 'Р В РЎСџР В РЎвЂў Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР вЂ№';
      case 'achievements': return 'Р В РЎСџР В РЎвЂў Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏР В РЎВ';
      case 'balance': return 'Р В РЎСџР В РЎвЂў Р В Р’В±Р В Р’В°Р В Р’В»Р В Р’В°Р В Р вЂ¦Р РЋР С“Р РЋРЎвЂњ';
      default: return 'Р В РЎСџР В РЎвЂў Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР вЂ№';
    }
  };

  const cycleSort = () => {
    const sorts: Array<'level' | 'achievements' | 'balance'> = ['level', 'achievements', 'balance'];
    const currentIndex = sorts.indexOf(leaderboardSort);
    const nextIndex = (currentIndex + 1) % sorts.length;
    setLeaderboardSort(sorts[nextIndex]);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
        position: 'relative'
      }}
    >
      <BackgroundFX theme={theme} isHomePage={true} />

      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={false}
        onOpenSettings={onOpenSettings}
        theme={theme}
        user={currentUser}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />

      {/* Hero Zone */}
      <div 
        className="relative w-full"
        style={{
          height: 'clamp(160px, 180px, 200px)',
          zIndex: 15
        }}
      >
        <Logo theme={theme} />
      </div>

      {/* Main Content Area */}
      <div 
        style={{
          maxWidth: '448px',
          margin: '0 auto',
          paddingBottom: '128px'
        }}
      >
        {/* AUTOGEN START home-content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '448px',
            margin: '0 auto',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: 'calc(96px + env(safe-area-inset-bottom))'
          }}
        >
          
          {/* Р В РІР‚в„ўР В Р’В°Р РЋРІвЂљВ¬Р В РЎвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ - Р В РЎвЂўР В РўвЂР В Р вЂ¦Р В Р’В° Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰Р В РЎвЂќР В Р’В° Р РЋР С“ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏР В РЎВР В РЎвЂ Р В Р вЂ Р В Р вЂ¦Р РЋРЎвЂњР РЋРІР‚С™Р РЋР вЂљР В РЎвЂ */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В РІР‚в„ўР В Р’В°Р РЋРІвЂљВ¬Р В РЎвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
              </h3>
              
              <button
                onClick={() => setIsAchievementsModalOpen(true)}
                aria-label="Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В»Р В РЎвЂР В Р’В¶Р В Р’В°Р В РІвЂћвЂ“Р РЋРІвЂљВ¬Р В РЎвЂР В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ"
                className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р вЂ Р В Р вЂ¦Р РЋРЎвЂњР РЋРІР‚С™Р РЋР вЂљР В РЎвЂ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰Р В РЎвЂќР В РЎвЂ */}
            <div className="space-y-3">
              {[
                { name: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚РЋР В РЎвЂўР В РЎвЂќ', progress: 50, description: 'Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ“Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 2 Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР РЏ', rarity: 'common' },
                { name: 'Р В РЎС›Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В РЎвЂўР В Р’В»Р РЋР вЂ№Р В Р’В±Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“', progress: 30, description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 10 Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ', rarity: 'rare' },
                { name: 'Р В РЎв„ўР В РЎвЂўР В Р’В»Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋРІР‚В Р В РЎвЂР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋР вЂљ', progress: 20, description: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ 5 Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р В РЎвЂўР В Р вЂ ', rarity: 'epic' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Achievement icon */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor: '#3B82F6'
                    }}
                  >
                    РЎР‚РЎСџРІР‚С”Р Р‹Р С—РЎвЂР РЏ
                  </div>
                  
                  {/* Achievement info */}
                  <div className="flex-1">
                    <div 
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                        marginBottom: '2px'
                      }}
                    >
                      {achievement.name}
                    </div>
                    <div 
                      style={{
                        fontSize: '12px',
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                        marginBottom: '4px'
                      }}
                    >
                      {achievement.description}
                    </div>
                  </div>
                  
                  {/* Progress percentage */}
                  <div 
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#3B82F6'
                    }}
                  >
                    {achievement.progress}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“/XP/Р В Р в‚¬Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР В Р вЂ¦Р РЋР Р‰ */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <span 
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“: {currentLevelData.status}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      // TODO: Implement XP modal functionality
                      console.log('XP modal clicked');
                    }}
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#2B82FF' : '#2B82FF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textDecoration: 'underline'
                    }}
                    aria-label={`Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В Р’ВµР РЋРІР‚С™Р В Р’В°Р В Р’В»Р В РЎвЂ Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В°: ${userExperience} XP`}
                  >
                    XP: {userExperience}
                  </button>
                </div>
                <div>
                  <span 
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Lvl {currentLevelData.level}
                  </span>
                </div>
              </div>
            </div>

            <div 
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„– Р В РЎвЂ Р В Р’В Р В Р’ВµР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂ“ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            
            {/* Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„– */}
            <div 
              className="glass-card p-4"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–
                </h3>
                
                <button
                  aria-label="Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»"
                  className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„– */}
              <div className="mb-4">
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–
                </h4>
                
                {activeBattles.map((battle) => (
                  <div 
                    key={battle.id}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(43, 130, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      marginBottom: '4px'
                    }}
                  >
                    {battle.opponent} vs Р В РІР‚в„ўР РЋРІР‚в„–
                  </div>
                ))}
              </div>

              {/* Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂ“Р В Р’В»Р В Р’В°Р РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
              <div className="mb-4">
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂ“Р В Р’В»Р В Р’В°Р РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
                </h4>
                
                {mockBattleInvitations.map((invitation) => (
                  <div 
                    key={invitation.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    <span 
                      style={{
                        fontSize: '14px',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      {invitation.challenger}
                    </span>
                    <button
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      Р В Р вЂ Р РЋРІР‚в„–Р В Р’В·Р РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР РЋРІР‚С™
                    </button>
                  </div>
                ))}
              </div>

              <div 
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  textAlign: 'center'
                }}
              >
                Р В РІР‚в„ўР РЋР С“Р В Р’ВµР В РЎвЂ“Р В РЎвЂў: 3 Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ 
              </div>
            </div>

            {/* Р В Р’В Р В Р’ВµР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂ“ */}
            <div 
              className="glass-card p-4"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Р В Р’В Р В Р’ВµР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂ“
                </h3>
                
                <button 
                  onClick={cycleSort}
                  aria-label={`Р В Р Р‹Р В РЎВР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР С“Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В РЎвЂќР РЋРЎвЂњ: ${getSortLabel(leaderboardSort)}`}
                  className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
                >
                  <Menu className="w-4 h-4" />
                </button>
              </div>

              <div 
                style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  marginBottom: '12px'
                }}
              >
                {getSortLabel(leaderboardSort)}
              </div>

              <div className="space-y-2">
                {mockLeaderboard.map((player, index) => (
                  <div 
                    key={player.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px'
                    }}
                  >
                    <div 
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                        minWidth: '20px'
                      }}
                    >
                      {index + 1}.
                    </div>
                    <div 
                      style={{
                        flex: 1,
                        fontSize: '14px',
                        fontWeight: '500',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      {player.name}
                    </div>
                    <div 
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      Р В Р в‚¬Р РЋР вЂљ.{player.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Р В РЎвЂ™Р РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В РЎвЂќР В РЎвЂ */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В РЎвЂ™Р РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В РЎвЂќР В РЎвЂ
              </h3>
              
              <button
                onClick={() => onNavigate('achievements')}
                aria-label="Р В РЎСџР В Р’ВµР РЋР вЂљР В Р’ВµР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂ Р В РЎвЂќ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р В Р’Вµ Р В Р’В°Р РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В РЎвЂўР В РЎвЂќ"
                className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {[
                { icon: 'РЎР‚РЎСџР РЏРІР‚В ', rarity: 'legendary', completed: true },
                { icon: 'РЎР‚РЎСџРўС’РІР‚РЋ', rarity: 'epic', completed: true },
                { icon: 'РЎР‚РЎСџРўС’РІвЂљВ¬', rarity: 'rare', completed: true },
                { icon: 'РЎР‚РЎСџРўС’РІР‚В°', rarity: 'common', completed: false },
                { icon: 'РЎР‚РЎСџР вЂ№Р вЂЎ', rarity: 'common', completed: false }
              ].map((achievement, index) => (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: achievement.completed 
                      ? (achievement.rarity === 'legendary' ? '#fbbf24' :
                         achievement.rarity === 'epic' ? '#a855f7' :
                         achievement.rarity === 'rare' ? '#3b82f6' : '#6b7280')
                      : 'transparent',
                    border: achievement.completed 
                      ? `2px solid ${theme === 'dark' ? '#FFFFFF' : '#000000'}`
                      : `2px dashed ${theme === 'dark' ? '#A7B0BD' : '#6B7280'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: achievement.completed ? 'white' : (theme === 'dark' ? '#A7B0BD' : '#6B7280'),
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {achievement.completed ? achievement.icon : '?'}
                  
                  {/* Rarity glow effect for completed achievements */}
                  {achievement.completed && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-2px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${
                          achievement.rarity === 'legendary' ? 'rgba(251, 191, 36, 0.3)' :
                          achievement.rarity === 'epic' ? 'rgba(168, 85, 247, 0.3)' :
                          achievement.rarity === 'rare' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(107, 114, 128, 0.3)'
                        } 0%, transparent 70%)`,
                        zIndex: -1
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* AUTOGEN END home-content */}
      </div>

      {/* Achievements Modal */}
      <ProductionModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        title="Р В РІР‚ВР В Р’В»Р В РЎвЂР В Р’В¶Р В Р’В°Р В РІвЂћвЂ“Р РЋРІвЂљВ¬Р В РЎвЂР В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ"
        modalId="achievements-modal"
      >
        <div className="space-y-4">
          {/* Top 6 closest achievements or all available if less than 6 */}
          {[
            { name: 'Р В РЎСџР В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋРІвЂљВ¬Р В Р’В°Р В РЎвЂ“', progress: 75, rarity: 'common', description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРЎвЂњР РЋР вЂ№ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ' },
            { name: 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р РЋР С“Р РЋРІР‚С™Р В Р вЂ¦Р В РЎвЂР В РЎвЂќ', progress: 45, rarity: 'rare', description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 5 Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ' },
            { name: 'Р В РЎС™Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ ', progress: 90, rarity: 'epic', description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ 3 Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°' },
            { name: 'Р В РЎСџР В РЎвЂўР В РЎвЂќР РЋРЎвЂњР В РЎвЂ”Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰', progress: 30, rarity: 'common', description: 'Р В Р Р‹Р В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 3 Р В РЎвЂ”Р В РЎвЂўР В РЎвЂќР РЋРЎвЂњР В РЎвЂ”Р В РЎвЂќР В РЎвЂ' },
            { name: 'Р В РІР‚в„ўР В РЎвЂўР В РЎвЂР В Р вЂ¦', progress: 60, rarity: 'rare', description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ 2 Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°' },
            { name: 'Р В РЎС›Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В РЎвЂўР В Р’В»Р РЋР вЂ№Р В Р’В±Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“', progress: 20, rarity: 'epic', description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 15 Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ' }
          ].slice(0, 6).map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg" style={{
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
            }}>
              {/* Achievement icon */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{
                  backgroundColor: achievement.rarity === 'common' ? '#6b7280' : 
                                 achievement.rarity === 'rare' ? '#3b82f6' :
                                 achievement.rarity === 'epic' ? '#a855f7' : '#fbbf24'
                }}
              >
                РЎР‚РЎСџР РЏРІР‚В 
              </div>
              
              {/* Achievement info */}
              <div className="flex-1">
                <div 
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '4px'
                  }}
                >
                  {achievement.name}
                </div>
                <div 
                  style={{
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    marginBottom: '6px'
                  }}
                >
                  {achievement.description}
                </div>
                
                {/* Progress bar */}
                <div 
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: theme === 'dark' ? '#2A2F36' : '#E6E9EF',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      width: `${achievement.progress}%`,
                      height: '100%',
                      backgroundColor: theme === 'dark' ? '#2B82FF' : '#2B82FF',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                
                <div 
                  style={{
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    marginTop: '4px'
                  }}
                >
                  {achievement.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>
        </ProductionModal>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage={currentPage}
        onNavigate={onNavigate}
        theme={theme}
        hideWhenModalOpen={true}
      />
    </div>
  );
};