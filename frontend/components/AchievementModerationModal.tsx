import { useState } from 'react';
import { CheckSquare, Paperclip } from './Icons';
import { ModalOpaque } from './ModalOpaque';

interface AchievementSubtask {
  id: string;
  description: string;
  requiresAttachment: boolean;
  completed: boolean;
  hasAttachment: boolean;
  attachments?: string[];
  submissionDate?: string;
}

interface AchievementModeration {
  id: string;
  title: string;
  description: string;
  subtasks: AchievementSubtask[];
  assignedTo: string;
  submittedDate: string;
  reward: {
    type: 'XP' | 'G-coin';
    amount: number;
  };
  status: 'pending' | 'approved' | 'rejected';
  completionPercentage: number;
  rejectionReason?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  achievement: AchievementModeration | null;
  onApprove: (achievementId: string, subtaskId: string) => void;
  onReject: (achievementId: string, reason: string) => void;
  theme?: 'light' | 'dark';
}

export function AchievementModerationModal({ isOpen, onClose, achievement, onApprove, onReject, theme = 'light' }: Props) {
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedSubtaskId, setSelectedSubtaskId] = useState<string | null>(null);
  const [fileViewerOpen, setFileViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!achievement) return null;

  const handleSubtaskApprove = (subtaskId: string) => {
    setSelectedSubtaskId(subtaskId);
    setConfirmModalOpen(true);
  };

  const handleConfirmApprove = () => {
    if (selectedSubtaskId) {
      onApprove(achievement.id, selectedSubtaskId);
      setConfirmModalOpen(false);
      setSelectedSubtaskId(null);
    }
  };

  const handleRejectClick = () => {
    setRejectionModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (rejectionReason.trim()) {
      onReject(achievement.id, rejectionReason);
      setRejectionModalOpen(false);
      setRejectionReason('');
      onClose();
    }
  };

  const handleFileView = (file: string) => {
    setSelectedFile(file);
    setFileViewerOpen(true);
  };

  const calculateProgress = () => {
    const completedTasks = achievement.subtasks.filter(task => task.completed).length;
    return Math.round((completedTasks / achievement.subtasks.length) * 100);
  };

  return (
    <>
      <ModalOpaque
        isOpen={isOpen}
        onClose={onClose}
        title="РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                padding: '0 20px'
              }}
            >
              РћС‚РјРµРЅРёС‚СЊ
            </button>
            <button
              onClick={handleRejectClick}
              className="transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#ff3b30',
                color: '#ffffff',
                border: 'none',
                padding: '0 20px'
              }}
            >
              РћС‚РєР»РѕРЅРёС‚СЊ
            </button>
            <button
              onClick={() => {
                // РћРґРѕР±СЂРёС‚СЊ РІСЃРµ РІС‹РїРѕР»РЅРµРЅРЅС‹Рµ РїРѕРґР·Р°РґР°С‡Рё
                achievement.subtasks.forEach(subtask => {
                  if (subtask.hasAttachment && !subtask.completed) {
                    onApprove(achievement.id, subtask.id);
                  }
                });
                onClose();
              }}
              className="transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#2B82FF',
                color: '#ffffff',
                border: 'none',
                padding: '0 20px'
              }}
            >
              РџСЂРёРјРµРЅРёС‚СЊ
            </button>
          </div>
        }
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>

          <div className="flex gap-4 mb-6">
            {/* РРєРѕРЅРєР° РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                borderRadius: '12px'
              }}
            >
              <span style={{ fontSize: '32px' }}>рџЏ†</span>
            </div>
            
            {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ РґРѕСЃС‚РёР¶РµРЅРёРё */}
            <div className="flex-1">
              <h4 
                className="font-medium mb-2"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                {achievement.title}
              </h4>
              <p 
                className="mb-3"
                style={{ 
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  fontSize: '14px'
                }}
              >
                {achievement.description}
              </p>
              
              {/* РџРѕРґР·Р°РґР°С‡Рё */}
              <div className="space-y-2">
                {achievement.subtasks.map((subtask, index) => (
                  <div key={subtask.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span 
                        style={{ 
                          color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                          fontSize: '14px'
                        }}
                      >
                        вЂў {subtask.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Р“Р°Р»РѕС‡РєР° РґР»СЏ РѕРґРѕР±СЂРµРЅРёСЏ */}
                      <button
                        onClick={() => handleSubtaskApprove(subtask.id)}
                        disabled={!subtask.hasAttachment || subtask.completed}
                        className="p-1 rounded transition-colors"
                        style={{
                          backgroundColor: subtask.completed 
                            ? '#34c759' 
                            : subtask.hasAttachment 
                            ? theme === 'dark' ? '#202734' : '#F3F5F8'
                            : 'transparent',
                          opacity: subtask.hasAttachment || subtask.completed ? 1 : 0.3
                        }}
                      >
                        <CheckSquare 
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            color: subtask.completed ? '#ffffff' : '#34c759'
                          }} 
                        />
                      </button>
                      
                      {/* РЎРєСЂРµРїРєР° РґР»СЏ РїСЂРѕСЃРјРѕС‚СЂР° С„Р°Р№Р»РѕРІ */}
                      <button
                        onClick={() => subtask.attachments?.[0] && handleFileView(subtask.attachments[0])}
                        disabled={!subtask.hasAttachment}
                        className="p-1 rounded transition-colors"
                        style={{
                          backgroundColor: subtask.hasAttachment 
                            ? theme === 'dark' ? '#202734' : '#F3F5F8'
                            : 'transparent',
                          opacity: subtask.hasAttachment ? 1 : 0.3
                        }}
                      >
                        <Paperclip 
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            color: subtask.hasAttachment ? '#2B82FF' : theme === 'dark' ? '#A7B0BD' : '#6B7280'
                          }} 
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* РџСЂРѕРіСЂРµСЃСЃ РІС‹РїРѕР»РЅРµРЅРёСЏ */}
          <div 
            className="mb-6 p-3 rounded-lg"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span 
                style={{ 
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  fontSize: '14px'
                }}
              >
                РџСЂРѕРіСЂРµСЃСЃ РІС‹РїРѕР»РЅРµРЅРёСЏ
              </span>
              <span 
                style={{ 
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  fontSize: '14px'
                }}
              >
                {calculateProgress()}%
              </span>
            </div>
            <div 
              className="w-full rounded-full"
              style={{
                height: '8px',
                backgroundColor: theme === 'dark' ? '#202734' : '#E6E9EF'
              }}
            >
              <div 
                className="rounded-full transition-all duration-300"
                style={{ 
                  width: `${calculateProgress()}%`,
                  height: '8px',
                  backgroundColor: '#2B82FF'
                }}
              />
            </div>
          </div>

          {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ РїРѕРґР°С‡Рµ */}
          <div 
            className="mb-6 space-y-1"
            style={{
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              fontSize: '12px'
            }}
          >
            <div>РЎРѕС‚СЂСѓРґРЅРёРє: {achievement.assignedTo}</div>
            <div>Р”Р°С‚Р° РїРѕРґР°С‡Рё: {new Date(achievement.submittedDate).toLocaleDateString('ru-RU')}</div>
            <div>РќР°РіСЂР°РґР°: {achievement.reward.amount} {achievement.reward.type}</div>
          </div>
        </div>
      </ModalOpaque>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ РѕРґРѕР±СЂРµРЅРёСЏ */}
      <ModalOpaque
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="РџРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ РІС‹РїРѕР»РЅРµРЅРёСЏ"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                padding: '0 20px'
              }}
            >
              РќРµС‚
            </button>
            <button
              onClick={handleConfirmApprove}
              className="transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#2B82FF',
                color: '#ffffff',
                border: 'none',
                padding: '0 20px'
              }}
            >
              Р”Р°
            </button>
          </div>
        }
      >
        <div className="text-center">
          <p 
            style={{ 
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              fontSize: '14px'
            }}
          >
            Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ Р·Р°РґР°РЅРёРµ РІС‹РїРѕР»РЅРµРЅРѕ РІРµСЂРЅРѕ?
          </p>
        </div>
      </ModalOpaque>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕС‚РєР»РѕРЅРµРЅРёСЏ */}
      <ModalOpaque
        isOpen={rejectionModalOpen}
        onClose={() => setRejectionModalOpen(false)}
        title="РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setRejectionModalOpen(false)}
              className="transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                padding: '0 20px'
              }}
            >
              РћС‚РјРµРЅР°
            </button>
            <button
              onClick={handleConfirmReject}
              disabled={!rejectionReason.trim()}
              className="transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: rejectionReason.trim() ? '#ff3b30' : theme === 'dark' ? '#202734' : '#E6E9EF',
                color: '#ffffff',
                border: 'none',
                padding: '0 20px'
              }}
            >
              РћС‚РїСЂР°РІРёС‚СЊ
            </button>
          </div>
        }
      >
        <div>
          <textarea
            placeholder="РЈРєР°Р¶РёС‚Рµ, С‡С‚Рѕ РІС‹РїРѕР»РЅРµРЅРѕ РЅРµРїСЂР°РІРёР»СЊРЅРѕ..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full transition-colors resize-none"
            rows={4}
            style={{
              height: '100px',
              borderRadius: '12px',
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.06)' 
                : '1px solid #E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              padding: '12px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </ModalOpaque>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РїСЂРѕСЃРјРѕС‚СЂР° С„Р°Р№Р»Р° */}
      <ModalOpaque
        isOpen={fileViewerOpen}
        onClose={() => setFileViewerOpen(false)}
        title="РџСЂРѕСЃРјРѕС‚СЂ С„Р°Р№Р»Р°"
        theme={theme}
        actions={
          <button
            onClick={() => setFileViewerOpen(false)}
            className="w-full transition-colors text-center"
            style={{
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#2B82FF',
              color: '#ffffff',
              border: 'none'
            }}
          >
            Р—Р°РєСЂС‹С‚СЊ
          </button>
        }
      >
        <div 
          className="text-center p-8 rounded-lg mb-4"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>рџ“„</div>
          <p 
            className="mb-2"
            style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Р¤Р°Р№Р»: {selectedFile}
          </p>
          <p 
            style={{ 
              fontSize: '12px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            РџСЂРµРґРІР°СЂРёС‚РµР»СЊРЅС‹Р№ РїСЂРѕСЃРјРѕС‚СЂ С„Р°Р№Р»Р°
          </p>
        </div>
      </ModalOpaque>
    </>
  );
}
