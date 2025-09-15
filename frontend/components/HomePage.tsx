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
    { id: '1', opponent: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', status: 'active' }
  ];

  const mockBattleInvitations = [
    { id: '1', challenger: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°', status: 'pending' },
    { id: '2', challenger: 'РђРЅРЅР° РРІР°РЅРѕРІР°', status: 'pending' }
  ];

  const mockLeaderboard = [
    { id: '1', name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ', level: 18 },
    { id: '2', name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', level: 16 },
    { id: '3', name: 'РђРЅРЅР° РРІР°РЅРѕРІР°', level: 15 }
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
      case 'level': return 'РџРѕ СѓСЂРѕРІРЅСЋ';
      case 'achievements': return 'РџРѕ РґРѕСЃС‚РёР¶РµРЅРёСЏРј';
      case 'balance': return 'РџРѕ Р±Р°Р»Р°РЅСЃСѓ';
      default: return 'РџРѕ СѓСЂРѕРІРЅСЋ';
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
          
          {/* Р’Р°С€Рё РґРѕСЃС‚РёР¶РµРЅРёСЏ - РѕРґРЅР° РїР°РЅРµР»СЊРєР° СЃ РґРѕСЃС‚РёР¶РµРЅРёСЏРјРё РІРЅСѓС‚СЂРё */}
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
                Р’Р°С€Рё РґРѕСЃС‚РёР¶РµРЅРёСЏ
              </h3>
              
              <button
                onClick={() => setIsAchievementsModalOpen(true)}
                aria-label="РћС‚РєСЂС‹С‚СЊ Р±Р»РёР¶Р°Р№С€РёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
                className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Р”РѕСЃС‚РёР¶РµРЅРёСЏ РІРЅСѓС‚СЂРё РїР°РЅРµР»СЊРєРё */}
            <div className="space-y-3">
              {[
                { name: 'РќРѕРІРёС‡РѕРє', progress: 50, description: 'Р”РѕСЃС‚РёРіРЅРёС‚Рµ 2 СѓСЂРѕРІРЅСЏ', rarity: 'common' },
                { name: 'РўСЂСѓРґРѕР»СЋР±РёРІС‹Р№', progress: 30, description: 'Р’С‹РїРѕР»РЅРёС‚Рµ 10 Р·Р°РґР°С‡', rarity: 'rare' },
                { name: 'РљРѕР»Р»РµРєС†РёРѕРЅРµСЂ', progress: 20, description: 'РћС‚РєСЂРѕР№С‚Рµ 5 РєРµР№СЃРѕРІ', rarity: 'epic' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Achievement icon */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor: '#3B82F6'
                    }}
                  >
                    рџ›ЎпёЏ
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

          {/* РЎС‚Р°С‚СѓСЃ/XP/РЈСЂРѕРІРµРЅСЊ */}
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
                    РЎС‚Р°С‚СѓСЃ: {currentLevelData.status}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      // TODO: Open XP modal
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
                    aria-label={`РћС‚РєСЂС‹С‚СЊ РґРµС‚Р°Р»Рё РѕРїС‹С‚Р°: ${userExperience} XP`}
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

          {/* Р‘Р°С‚С‚Р»С‹ Рё Р РµР№С‚РёРЅРі */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            
            {/* Р‘Р°С‚С‚Р»С‹ */}
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
                  Р‘Р°С‚С‚Р»С‹
                </h3>
                
                <button
                  aria-label="РЎРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»"
                  className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹ */}
              <div className="mb-4">
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹
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
                    {battle.opponent} vs Р’С‹
                  </div>
                ))}
              </div>

              {/* РџСЂРёРіР»Р°С€РµРЅРёСЏ */}
              <div className="mb-4">
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  РџСЂРёРіР»Р°С€РµРЅРёСЏ
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
                      РІС‹Р·С‹РІР°РµС‚
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
                Р’СЃРµРіРѕ: 3 Р±Р°С‚С‚Р»РѕРІ
              </div>
            </div>

            {/* Р РµР№С‚РёРЅРі */}
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
                  Р РµР№С‚РёРЅРі
                </h3>
                
                <button 
                  onClick={cycleSort}
                  aria-label={`РЎРјРµРЅРёС‚СЊ СЃРѕСЂС‚РёСЂРѕРІРєСѓ: ${getSortLabel(leaderboardSort)}`}
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
                      РЈСЂ.{player.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* РђС‡РёРІРєРё */}
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
                РђС‡РёРІРєРё
              </h3>
              
              <button
                onClick={() => onNavigate('achievements')}
                aria-label="РџРµСЂРµР№С‚Рё Рє СЃС‚СЂР°РЅРёС†Рµ Р°С‡РёРІРѕРє"
                className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {[
                { icon: 'рџЏ†', rarity: 'legendary', completed: true },
                { icon: 'рџҐ‡', rarity: 'epic', completed: true },
                { icon: 'рџҐ€', rarity: 'rare', completed: true },
                { icon: 'рџҐ‰', rarity: 'common', completed: false },
                { icon: 'рџЋЇ', rarity: 'common', completed: false }
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
        title="Р‘Р»РёР¶Р°Р№С€РёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
        modalId="achievements-modal"
      >
        <div className="space-y-4">
          {/* Top 6 closest achievements or all available if less than 6 */}
          {[
            { name: 'РџРµСЂРІС‹Р№ С€Р°Рі', progress: 75, rarity: 'common', description: 'Р’С‹РїРѕР»РЅРёС‚Рµ РїРµСЂРІСѓСЋ Р·Р°РґР°С‡Сѓ' },
            { name: 'РђРєС‚РёРІРЅС‹Р№ СѓС‡Р°СЃС‚РЅРёРє', progress: 45, rarity: 'rare', description: 'Р’С‹РїРѕР»РЅРёС‚Рµ 5 Р·Р°РґР°С‡' },
            { name: 'РњР°СЃС‚РµСЂ Р±Р°С‚С‚Р»РѕРІ', progress: 90, rarity: 'epic', description: 'Р’С‹РёРіСЂР°Р№С‚Рµ 3 Р±Р°С‚С‚Р»Р°' },
            { name: 'РџРѕРєСѓРїР°С‚РµР»СЊ', progress: 30, rarity: 'common', description: 'РЎРѕРІРµСЂС€РёС‚Рµ 3 РїРѕРєСѓРїРєРё' },
            { name: 'Р’РѕРёРЅ', progress: 60, rarity: 'rare', description: 'Р’С‹РёРіСЂР°Р№С‚Рµ 2 Р±Р°С‚С‚Р»Р°' },
            { name: 'РўСЂСѓРґРѕР»СЋР±РёРІС‹Р№', progress: 20, rarity: 'epic', description: 'Р’С‹РїРѕР»РЅРёС‚Рµ 15 Р·Р°РґР°С‡' }
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
                рџЏ†
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