import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Menu, X, Paperclip, Trophy } from './Icons';
import { Modal } from './Modal';
import { Achievement, SortType } from '../types/achievements';
import { mockAppState } from '../data/mockData';
import { EmptyCard } from './EmptyCard';
import { Panel } from './Panel';

interface AchievementsPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  profilePhoto?: string | null;
  theme?: 'light' | 'dark';
}

export function AchievementsPage({ onNavigate, currentPage, onOpenSettings, achievements, setAchievements, profilePhoto, theme = 'light' }: AchievementsPageProps) {
  const { currentUser } = mockAppState;
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>('progress_desc');
  const [fileUploadOpen, setFileUploadOpen] = useState(false);

  const handleSort = (type: SortType) => {
    setSortType(type);
    setSortMenuOpen(false);
  };

  const sortedAchievements = [...achievements].sort((a, b) => {
    switch (sortType) {
      case 'alphabet':
        return a.title.localeCompare(b.title);
      case 'progress_asc':
        const percentA = (a.requirements.current / a.requirements.target) * 100;
        const percentB = (b.requirements.current / b.requirements.target) * 100;
        return percentA - percentB;
      case 'progress_desc':
        const percentDescA = (a.requirements.current / a.requirements.target) * 100;
        const percentDescB = (b.requirements.current / b.requirements.target) * 100;
        // РЎРЅР°С‡Р°Р»Р° РґРѕСЃС‚РёР¶РµРЅРёСЏ СЃ РїСЂРѕРіСЂРµСЃСЃРѕРј, РїРѕС‚РѕРј Р±РµР· РїСЂРѕРіСЂРµСЃСЃР°
        if (percentDescA > 0 && percentDescB === 0) return -1;
        if (percentDescA === 0 && percentDescB > 0) return 1;
        return percentDescB - percentDescA;

      default:
        return 0;
    }
  });

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailOpen(true);
  };

  const handleFileSelected = () => {
    if (selectedAchievement) {
      setAchievements(prevAchievements =>
        prevAchievements.map(achievement =>
          achievement.id === selectedAchievement.id
            ? { ...achievement, userFile: 'user_file.pdf' }
            : achievement
        )
      );
      
      setSelectedAchievement(prev => 
        prev ? { ...prev, userFile: 'user_file.pdf' } : null
      );
    }
    setFileUploadOpen(false);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  return (
    <>
      <div 
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
          color: '#0F172A'
        }}
      >
        {/* Header */}
        <Header onNavigate={onNavigate} currentPage={currentPage} onOpenSettings={onOpenSettings} user={currentUser} profilePhoto={profilePhoto} />
        
        {/* Main Content */}
        <div className="max-w-md mx-auto pt-20 px-4 pb-32">
          {/* AUTOGEN START achievements-content */}
          <div
            style={{
              maxWidth: '448px',
              margin: '0 auto',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingBottom: 'calc(96px + env(safe-area-inset-bottom))'
            }}
          >
            {/* Header with title and sort button */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                paddingTop: '20px'
              }}
            >
              <h1 
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  margin: 0
                }}
              >
                Достижения
              </h1>
              
              <button
                onClick={() => setSortMenuOpen(true)}
                aria-label="Открыть меню сортировки"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: theme === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.background = theme === 'dark' ? '#2C2C2E' : '#E6E9EF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = theme === 'dark' ? '#1C2029' : '#F3F5F8';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Menu style={{ width: '20px', height: '20px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
              </button>
            </div>

            {/* Achievements list */}
            {sortedAchievements.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedAchievements.map((achievement) => {
                  const progress = getProgressPercentage(achievement.requirements.current, achievement.requirements.target);
                  const rarityColor = theme === 'dark' 
                    ? (achievement.rarity === 'common' ? '#A7B0BD' :
                       achievement.rarity === 'rare' ? '#3B82F6' :
                       achievement.rarity === 'epic' ? '#8B5CF6' :
                       achievement.rarity === 'legendary' ? '#F59E0B' : '#EF4444')
                    : (achievement.rarity === 'common' ? '#6B7280' :
                       achievement.rarity === 'rare' ? '#3B82F6' :
                       achievement.rarity === 'epic' ? '#8B5CF6' :
                       achievement.rarity === 'legendary' ? '#F59E0B' : '#EF4444');
                  
                  return (
                    <div
                      key={achievement.id}
                      onClick={() => handleAchievementClick(achievement)}
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                        borderRadius: '16px',
                        padding: '16px',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                        boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        opacity: achievement.requirements.current === 0 ? 0.5 : 1,
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (achievement.requirements.current > 0) {
                          e.currentTarget.style.transform = 'scale(0.98)';
                          e.currentTarget.style.boxShadow = theme === 'dark' 
                            ? '0 12px 32px rgba(0, 0, 0, 0.8)' 
                            : '0 12px 32px rgba(0, 0, 0, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = theme === 'dark' 
                          ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
                          : '0 8px 24px rgba(0, 0, 0, 0.10)';
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.96)';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)';
                      }}
                    >
                      {/* Rarity glow effect */}
                      {achievement.requirements.current > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: `linear-gradient(90deg, ${rarityColor}40, ${rarityColor}80, ${rarityColor}40)`,
                            borderRadius: '16px 16px 0 0'
                          }}
                        />
                      )}
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Achievement icon */}
                        <div 
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: achievement.requirements.current > 0 
                              ? `${rarityColor}20` 
                              : theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `2px solid ${achievement.requirements.current > 0 ? rarityColor : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')}`,
                            position: 'relative'
                          }}
                        >
                          <Trophy 
                            style={{ 
                              width: '24px', 
                              height: '24px', 
                              color: achievement.requirements.current > 0 ? rarityColor : (theme === 'dark' ? '#A7B0BD' : '#6B7280')
                            }} 
                          />
                          
                          {/* Progress indicator */}
                          {achievement.requirements.current > 0 && (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: '-2px',
                                right: '-2px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                                border: `2px solid ${rarityColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                                fontWeight: 'bold',
                                color: rarityColor
                              }}
                            >
                              {progress}%
                            </div>
                          )}
                        </div>
                        
                        {/* Achievement info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div 
                            style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                              marginBottom: '4px',
                              lineHeight: '1.4'
                            }}
                          >
                            {achievement.title}
                          </div>
                          <div 
                            style={{
                              fontSize: '12px',
                              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                              marginBottom: '8px',
                              lineHeight: '1.4'
                            }}
                          >
                            {achievement.description}
                          </div>
                          
                          {/* Progress bar */}
                          <div 
                            style={{
                              width: '100%',
                              height: '6px',
                              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                              borderRadius: '3px',
                              overflow: 'hidden'
                            }}
                          >
                            <div 
                              style={{
                                width: `${progress}%`,
                                height: '100%',
                                background: achievement.requirements.current > 0 ? rarityColor : (theme === 'dark' ? '#A7B0BD' : '#6B7280'),
                                borderRadius: '3px',
                                transition: 'width 300ms ease'
                              }}
                            />
                          </div>
                          
                          {/* Progress text */}
                          <div 
                            style={{
                              fontSize: '10px',
                              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                              marginTop: '4px',
                              textAlign: 'right'
                            }}
                          >
                            {achievement.requirements.current}/{achievement.requirements.target}
                          </div>
                        </div>
                        
                        {/* Status indicator */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          {achievement.requirements.current >= achievement.requirements.target ? (
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: '#22C55E',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px'
                              }}
                            >
                              ✓
                            </div>
                          ) : (
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                                fontSize: '12px'
                              }}
                            >
                              {progress}%
                            </div>
                          )}
                          
                          {/* Rarity badge */}
                          <div
                            style={{
                              fontSize: '8px',
                              fontWeight: 'bold',
                              color: rarityColor,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {achievement.rarity}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                  borderRadius: '16px',
                  padding: '48px 16px',
                  textAlign: 'center',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Trophy style={{ width: '32px', height: '32px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                </div>
                <h3 
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Нет достижений
                </h3>
                <p 
                  style={{
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    lineHeight: '1.4'
                  }}
                >
                  Выполняйте задачи и участвуйте в баттлах, чтобы получить достижения
                </p>
              </div>
            )}
          </div>
          {/* AUTOGEN END achievements-content */}
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} />
      </div>

      {/* Sort Menu Modal */}
      <Modal
        isOpen={sortMenuOpen}
        onClose={() => setSortMenuOpen(false)}
        title="Сортировка достижений"
        theme={theme}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => handleSort('alphabet')}
            aria-label="Сортировать по алфавиту"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: sortType === 'alphabet' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? '#1C2029' : '#F3F5F8',
              border: sortType === 'alphabet' 
                ? '1px solid rgba(43, 130, 255, 0.20)'
                : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
              color: sortType === 'alphabet' 
                ? '#2B82FF' 
                : theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (sortType !== 'alphabet') {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2C2C2E' : '#E6E9EF';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = sortType === 'alphabet' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? '#1C2029' : '#F3F5F8';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
          >
            По алфавиту
          </button>
          <button
            onClick={() => handleSort('progress_asc')}
            aria-label="Сортировать по проценту выполнения (от меньшего)"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: sortType === 'progress_asc' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? '#1C2029' : '#F3F5F8',
              border: sortType === 'progress_asc' 
                ? '1px solid rgba(43, 130, 255, 0.20)'
                : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
              color: sortType === 'progress_asc' 
                ? '#2B82FF' 
                : theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (sortType !== 'progress_asc') {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2C2C2E' : '#E6E9EF';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = sortType === 'progress_asc' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? '#1C2029' : '#F3F5F8';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
          >
            По проценту (от меньшего)
          </button>
          <button
            onClick={() => handleSort('progress_desc')}
            aria-label="Сортировать по проценту выполнения (от большего)"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: sortType === 'progress_desc' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? '#1C2029' : '#F3F5F8',
              border: sortType === 'progress_desc' 
                ? '1px solid rgba(43, 130, 255, 0.20)'
                : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
              color: sortType === 'progress_desc' 
                ? '#2B82FF' 
                : theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (sortType !== 'progress_desc') {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2C2C2E' : '#E6E9EF';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = sortType === 'progress_desc' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? '#1C2029' : '#F3F5F8';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
          >
            По проценту (от большего)
          </button>
        </div>
      </Modal>

      {/* Р”РµС‚Р°Р»Рё РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[calc(100vw-16px)] max-w-md p-0 max-h-[85vh] flex flex-col [&>button]:hidden"
          aria-describedby="achievement-detail-description"
        >
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            {/* Р—Р°РіРѕР»РѕРІРѕРє */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-6 sm:w-8"></div>
              
              <DialogTitle className="text-sm sm:text-lg font-medium text-foreground text-center flex-1 px-2">
                РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ
              </DialogTitle>
              
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-1 sm:p-2 hover:bg-black/5 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription id="achievement-detail-description" className="sr-only">
              Р”РµС‚Р°Р»СЊРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ РґРѕСЃС‚РёР¶РµРЅРёРё
            </DialogDescription>

            {selectedAchievement && (
              <div className="flex-1 overflow-y-auto space-y-4">
                {/* РРєРѕРЅРєР° Рё РЅР°Р·РІР°РЅРёРµ */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-1">
                      {selectedAchievement.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {selectedAchievement.description}
                    </div>
                  </div>
                </div>

                {/* РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ */}
                <div className="glass-card rounded-2xl p-4">
                  <div className="text-sm font-medium text-foreground mb-3">
                    РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ
                  </div>
                  <div className="space-y-2">
                    {selectedAchievement.conditions?.length ? (
                      selectedAchievement.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            <span className="text-sm text-foreground">{condition}</span>
                          </div>
                          <button
                            onClick={() => setFileUploadOpen(true)}
                            className={`p-2 rounded-lg transition-colors ${
                              selectedAchievement.userFile
                                ? 'bg-muted text-muted-foreground'
                                : 'hover:bg-black/5 text-muted-foreground'
                            }`}
                          >
                            <Paperclip className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span className="text-sm text-foreground">
                          {selectedAchievement.requirements.type}: {selectedAchievement.requirements.current}/{selectedAchievement.requirements.target}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕС‚ Р°РґРјРёРЅР° */}
                <div className={`glass-card rounded-2xl p-4 ${
                  !selectedAchievement.adminComment ? 'opacity-50' : ''
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-foreground">
                      РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕС‚ РђРґРјРёРЅР°
                    </div>
                    {selectedAchievement.adminFile && (
                      <button
                        className="p-2 rounded-lg hover:bg-black/5 transition-colors text-muted-foreground"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedAchievement.adminComment || 'РљРѕРјРјРµРЅС‚Р°СЂРёР№ РЅРµ РґРѕР±Р°РІР»РµРЅ'}
                  </div>
                </div>

                {/* РљРЅРѕРїРєРё */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="w-full sm:flex-1 glass-card rounded-2xl p-2 sm:p-3 text-xs sm:text-sm font-medium text-foreground hover:scale-[0.98] transition-transform text-center"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    className="w-full sm:flex-1 bg-primary text-primary-foreground rounded-2xl p-2 sm:p-3 text-xs sm:text-sm font-medium hover:scale-[0.98] transition-transform text-center"
                  >
                    РџСЂРёРјРµРЅРёС‚СЊ
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р° */}
      <Dialog open={fileUploadOpen} onOpenChange={setFileUploadOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[calc(100vw-16px)] max-w-sm p-4 sm:p-6 [&>button]:hidden"
          aria-describedby="file-upload-description"
        >
          <DialogTitle className="text-lg font-medium text-foreground text-center mb-6">
            РџСЂРёРєСЂРµРїРёС‚СЊ С„Р°Р№Р»
          </DialogTitle>
          
          <DialogDescription id="file-upload-description" className="sr-only">
            Р’С‹Р±РµСЂРёС‚Рµ С„Р°Р№Р» РґР»СЏ РїСЂРёРєСЂРµРїР»РµРЅРёСЏ Рє РґРѕСЃС‚РёР¶РµРЅРёСЋ
          </DialogDescription>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
                <Paperclip className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Р’С‹Р±РµСЂРёС‚Рµ С„Р°Р№Р» РґР»СЏ Р·Р°РіСЂСѓР·РєРё
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelected}
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="w-full glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform cursor-pointer inline-block"
              >
                Р’С‹Р±СЂР°С‚СЊ С„Р°Р№Р»
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setFileUploadOpen(false)}
                className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform text-center"
              >
                РћС‚РјРµРЅРёС‚СЊ
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
