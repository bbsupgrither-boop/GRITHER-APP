import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Menu, X, Paperclip, Trophy } from './Icons';
import { ModalOpaque } from './ModalOpaque';

import { Achievement, SortType } from '../types/achievements';
// РЈР±РёСЂР°РµРј РёРјРїРѕСЂС‚ mockAppState
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
  // РЎРѕР·РґР°РµРј РјРѕРє-РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё
  const currentUser = {
    id: 'user1',
    name: 'РРІР°РЅ РРІР°РЅРѕРІ',
    username: '@iivanov'
  };
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
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
            : 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
          color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
        }}
      >
        {/* Header */}
        <Header onNavigate={onNavigate} currentPage={currentPage} onOpenSettings={onOpenSettings} user={currentUser} profilePhoto={profilePhoto} theme={theme} />
        
        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 pb-32">
          <Panel
            title="Р”РѕСЃС‚СѓРїРЅС‹Рµ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
            theme={theme}
            rightButton={
              <button
                onClick={() => setSortMenuOpen(true)}
                className="apple-button transition-all hover:scale-105"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <Menu style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#1A1A1A' : '#6B7280' }} />
              </button>
            }
          >
            {sortedAchievements.length > 0 ? (
              <div className="space-y-3">
                {sortedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    onClick={() => handleAchievementClick(achievement)}
                    className={`surface-card transition-all hover:scale-[0.98] cursor-pointer flex items-center gap-4 ${
                      achievement.requirements.current === 0 
                        ? 'opacity-50 grayscale' 
                        : ''
                    }`}
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                      borderRadius: '16px',
                      padding: '16px',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                      boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ backgroundColor: 'rgba(43, 130, 255, 0.10)' }}
                    >
                      <Trophy style={{ width: '20px', height: '20px', color: '#2B82FF' }} />
                    </div>
                    
                    <div className="flex-1">
                      <div 
                        className="font-medium text-sm mb-1"
                        style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                      >
                        {achievement.title}
                      </div>
                      <div 
                        className="text-xs mb-2"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      >
                        {achievement.description}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div 
                        className="text-sm font-medium"
                        style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                      >
                        {getProgressPercentage(achievement.requirements.current, achievement.requirements.target)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyCard variant="achievements_empty" theme={theme} />
            )}
          </Panel>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} theme={theme} />
      </div>

      {/* РњРµРЅСЋ СЃРѕСЂС‚РёСЂРѕРІРєРё */}
      <ModalOpaque
        isOpen={sortMenuOpen}
        onClose={() => setSortMenuOpen(false)}
        title="РЎРѕСЂС‚РёСЂРѕРІРєР°"
        theme={theme}
      >
        <div className="space-y-3">
          <button
            onClick={() => handleSort('alphabet')}
            className="w-full transition-all hover:scale-[0.98] text-center"
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: sortType === 'alphabet' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
              border: sortType === 'alphabet' 
                ? '1px solid rgba(43, 130, 255, 0.20)'
                : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
              color: sortType === 'alphabet' 
                ? '#2B82FF' 
                : theme === 'dark' ? '#1A1A1A' : '#0F172A',
              fontSize: '14px',
              fontWeight: '700',
              boxShadow: sortType !== 'alphabet' && theme === 'dark' 
                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                : 'none'
            }}
          >
            РџРѕ Р°Р»С„Р°РІРёС‚Сѓ
          </button>
          <button
            onClick={() => handleSort('progress_asc')}
            className="w-full transition-all hover:scale-[0.98] text-center"
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: sortType === 'progress_asc' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
              border: sortType === 'progress_asc' 
                ? '1px solid rgba(43, 130, 255, 0.20)'
                : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
              color: sortType === 'progress_asc' 
                ? '#2B82FF' 
                : theme === 'dark' ? '#1A1A1A' : '#0F172A',
              fontSize: '14px',
              fontWeight: '700',
              boxShadow: sortType !== 'progress_asc' && theme === 'dark' 
                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                : 'none'
            }}
          >
            РџРѕ РїСЂРѕС†РµРЅС‚Сѓ (РѕС‚ РЅР°РёРјРµРЅСЊС€РµРіРѕ)
          </button>
          <button
            onClick={() => handleSort('progress_desc')}
            className="w-full transition-all hover:scale-[0.98] text-center"
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: sortType === 'progress_desc' 
                ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                : theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
              border: sortType === 'progress_desc' 
                ? '1px solid rgba(43, 130, 255, 0.20)'
                : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
              color: sortType === 'progress_desc' 
                ? '#2B82FF' 
                : theme === 'dark' ? '#1A1A1A' : '#0F172A',
              fontSize: '14px',
              fontWeight: '700',
              boxShadow: sortType !== 'progress_desc' && theme === 'dark' 
                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                : 'none'
            }}
          >
            РџРѕ РїСЂРѕС†РµРЅС‚Сѓ (РѕС‚ РЅР°РёР±РѕР»СЊС€РµРіРѕ)
          </button>
        </div>
      </ModalOpaque>

      {/* Р”РµС‚Р°Р»Рё РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
      <ModalOpaque
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
        theme={theme}
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="flex-1 transition-colors text-center flex items-center justify-center"
              style={{
                height: '50px',
                borderRadius: '12px',
                background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : 'none',
                fontSize: '13px',
                fontWeight: '600',
                padding: '0 20px'
              }}
            >
              РћС‚РјРµРЅРёС‚СЊ
            </button>
            <button
              className="flex-1 transition-colors text-center flex items-center justify-center"
              style={{
                height: '50px',
                borderRadius: '12px',
                background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                color: theme === 'dark' ? '#1A1A1A' : '#ffffff',
                border: 'none',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : 'none',
                fontSize: '13px',
                fontWeight: '600',
                padding: '0 20px'
              }}
            >
              РџСЂРёРјРµРЅРёС‚СЊ
            </button>
          </div>
        }
      >
        {selectedAchievement && (
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {/* РРєРѕРЅРєР° Рё РЅР°Р·РІР°РЅРёРµ */}
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="flex items-center justify-center"
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: theme === 'dark' ? 'rgba(167, 176, 189, 0.3)' : 'rgba(107, 114, 128, 0.3)',
                  borderRadius: '16px'
                }}
              >
                <Trophy style={{ width: '32px', height: '32px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
              </div>
              
              <div className="flex-1">
                <div 
                  className="font-medium mb-1"
                  style={{ 
                    fontSize: '14px',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  {selectedAchievement.title}
                </div>
                <div 
                  style={{ 
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  {selectedAchievement.description}
                </div>
              </div>
            </div>

            {/* РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ */}
            <div 
              className="rounded-xl p-4 mb-4"
              style={{
                backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
              }}
            >
              <div 
                className="font-medium mb-3"
                style={{ 
                  fontSize: '14px',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ
              </div>
              <div className="space-y-2">
                {selectedAchievement.conditions?.length ? (
                  selectedAchievement.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="rounded-full"
                          style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                          }}
                        />
                        <span 
                          style={{ 
                            fontSize: '14px',
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                          }}
                        >
                          {condition}
                        </span>
                      </div>
                      <button
                        onClick={() => setFileUploadOpen(true)}
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: selectedAchievement.userFile
                            ? theme === 'dark' ? '#A7B0BD' : '#6B7280'
                            : 'transparent'
                        }}
                      >
                        <Paperclip style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2">
                    <div 
                      className="rounded-full"
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    />
                    <span 
                      style={{ 
                        fontSize: '14px',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      {selectedAchievement.requirements.type}: {selectedAchievement.requirements.current}/{selectedAchievement.requirements.target}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕС‚ Р°РґРјРёРЅР° */}
            <div 
              className={`rounded-xl p-4 ${!selectedAchievement.adminComment ? 'opacity-50' : ''}`}
              style={{
                backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="font-medium"
                  style={{ 
                    fontSize: '14px',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕС‚ РђРґРјРёРЅР°
                </div>
                {selectedAchievement.adminFile && (
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Paperclip style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                  </button>
                )}
              </div>
              <div 
                style={{ 
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                {selectedAchievement.adminComment || 'РљРѕРјРјРµРЅС‚Р°СЂРёР№ РЅРµ РґРѕР±Р°РІР»РµРЅ'}
              </div>
            </div>
          </div>
        )}
      </ModalOpaque>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р° */}
      <ModalOpaque
        isOpen={fileUploadOpen}
        onClose={() => setFileUploadOpen(false)}
        title="РџСЂРёРєСЂРµРїРёС‚СЊ С„Р°Р№Р»"
        theme={theme}
        actions={
          <button
            onClick={() => setFileUploadOpen(false)}
            className="w-full transition-colors text-center"
            style={{
              height: '44px',
              borderRadius: '12px',
              background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid #E6E9EF',
              color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
              boxShadow: theme === 'dark' 
                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                : 'none'
            }}
          >
            РћС‚РјРµРЅРёС‚СЊ
          </button>
        }
      >
        <div 
          className="rounded-xl p-6 text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
          }}
        >
          <div 
            className="mx-auto mb-4 flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(43, 130, 255, 0.20)',
              borderRadius: '12px'
            }}
          >
            <Paperclip style={{ width: '24px', height: '24px', color: '#2B82FF' }} />
          </div>
          <p 
            className="mb-4"
            style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
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
            className="w-full transition-colors cursor-pointer inline-block text-center"
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
              color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
              fontSize: '14px',
              boxShadow: theme === 'dark' 
                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                : 'none'
            }}
          >
            Р’С‹Р±СЂР°С‚СЊ С„Р°Р№Р»
          </label>
        </div>
      </ModalOpaque>
    </>
  );
}
