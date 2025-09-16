РїВ»С—import { Star } from './Icons';
import coinImage from '../assets/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png';
import { getCurrentLevelData, getNextLevelData, getProgressToNextLevel } from '../data/levels';

interface ModalXPProps {
  isOpen: boolean;
  onClose: () => void;
  level?: number;
  experience?: number;
  maxExperience?: number;
  theme?: 'light' | 'dark';
}

export function ModalXP({ 
  isOpen, 
  onClose, 
  level = 0, 
  experience = 0, 
  maxExperience = 100,
  theme = 'light'
}: ModalXPProps) {
  if (!isOpen) return null;

  // Use the new level system
  const currentLevelData = getCurrentLevelData(experience);
  const nextLevelData = getNextLevelData(experience);
  const progressData = getProgressToNextLevel(experience);
  
  // For display purposes, use the provided level if it's higher than calculated
  const displayLevel = level > currentLevelData.level ? level : currentLevelData.level;
  const displayExperience = experience;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      data-modal="true"
      style={{
        background: theme === 'dark' 
          ? 'rgba(0, 0, 0, 0.45)' 
          : 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div 
        className="mx-4"
        style={{
          width: 'auto',
          minWidth: '320px',
          maxWidth: '360px',
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
          opacity: 1
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - 40px Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р Р†РІР‚С›РІР‚вЂњ */}
        <div 
          className="flex items-center justify-center"
          style={{ 
            height: '40px',
            minHeight: '40px'
          }}
        >
          {/* Р В Р’В Р Р†Р вЂљРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚Сњ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р Р†Р вЂљР’В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚Сљ */}
          <h2 
            className="font-semibold text-center"
            style={{ 
              fontSize: '18px',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†РІР‚С™Р’В¬ Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚СњР В Р Р‹Р РЋРІР‚СљР В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљРЎв„ў
          </h2>
        </div>

        {/* Body */}
        <div 
          className="flex flex-col"
          style={{ gap: '12px' }}
        >
          {/* a) ProgressSection */}
          <div 
            style={{ 
              height: '48px',
              position: 'relative',
              overflow: 'visible' // Clip content Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В РІР‚в„–Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦
            }}
          >
            {/* Р В Р’В Р Р†Р вЂљРІР‚СњР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р РЏ - absolute Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљР’В Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ */}
            <div 
              style={{
                position: 'absolute',
                left: '-12px',
                top: '35%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Star 
                  className="w-8 h-8 fill-current" 
                  style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                />
                <span 
                  className="absolute font-bold"
                  style={{ 
                    fontSize: '12px',
                    color: '#FFFFFF'
                  }}
                >
                  {displayLevel}
                </span>
              </div>
            </div>

            {/* Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р В РЎвЂњ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р Р†РІР‚С™Р’В¬Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ 100%, Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В° 16, Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РЎвЂњ 12 */}
            <div 
              style={{
                width: '100%',
                height: '16px',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#ECEFF3',
                borderRadius: '12px',
                border: `1px solid ${theme === 'dark' ? '#2A2F36' : '#E6E9EF'}`,
                position: 'relative',
                top: '8px' // Р В Р’В Р вЂ™Р’В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р’В Р В РІР‚В  Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’Вµ 48px
              }}
            >
              <div 
                className="transition-all duration-500"
                style={{ 
                  width: `${progressData.percentage}%`,
                  height: '16px',
                  background: theme === 'dark' 
                    ? '#2B82FF'
                    : 'linear-gradient(90deg, #2B82FF 0%, #62A6FF 100%)',
                  borderRadius: '12px'
                }}
              />
            </div>

            {/* Р В Р’В Р В Р вЂ№Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚В Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р Р†РІР‚С›РІР‚вЂњ */}
            <div 
              className="text-center"
              style={{ 
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0'
              }}
            >
              <span 
                className="font-semibold"
                style={{ 
                  fontSize: '14px',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  whiteSpace: 'nowrap'
                }}
              >
                {progressData.current.toLocaleString()}/{progressData.needed.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Next Level Status and Reward */}
          {nextLevelData && (
            <div className="space-y-3">
              <div className="text-center">
                <div 
                  style={{ 
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '4px'
                  }}
                >
                  Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’В° Р В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РІР‚в„–Р В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ:
                </div>
                <div 
                  style={{ 
                    fontSize: '14px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  Р В Р’В Р В Р вЂ№Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РЎвЂњ: {nextLevelData.status}
                </div>
              </div>

              {/* Reward Section */}
              <div className="flex justify-center">
                <div 
                  className="flex items-center"
                  style={{
                    height: '40px',
                    borderRadius: '999px',
                    padding: '0 16px',
                    gap: '8px',
                    backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'}`
                  }}
                >
                  <span 
                    className="font-semibold"
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°:
                  </span>

                  <span 
                    className="font-semibold"
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {nextLevelData.reward}
                    <img 
                      src={coinImage} 
                      alt="G-coin" 
                      style={{ width: '14px', height: '14px' }}
                    />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Max Level Message */}
          {!nextLevelData && (
            <div className="text-center">
              <div 
                style={{ 
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  marginBottom: '4px'
                }}
              >
                Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В!
              </div>
              <div 
                style={{ 
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В Р В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚ВР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р РЏ
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
