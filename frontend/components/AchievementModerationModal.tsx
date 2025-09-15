п»їimport { useState } from 'react';
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
        title="Р Р€РЎРѓР В»Р С•Р Р†Р С‘РЎРЏ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ"
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
              Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
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
              Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
            </button>
            <button
              onClick={() => {
                // Р С›Р Т‘Р С•Р В±РЎР‚Р С‘РЎвЂљРЎРЉ Р Р†РЎРѓР Вµ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№Р Вµ Р С—Р С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘
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
              Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
            </button>
          </div>
        }
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>

          <div className="flex gap-4 mb-6">
            {/* Р ВР С”Р С•Р Р…Р С”Р В° Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ */}
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                borderRadius: '12px'
              }}
            >
              <span style={{ fontSize: '32px' }}>СЂСџРЏвЂ </span>
            </div>
            
            {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р С‘ */}
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
              
              {/* Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
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
                        РІР‚Сћ {subtask.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Р вЂњР В°Р В»Р С•РЎвЂЎР С”Р В° Р Т‘Р В»РЎРЏ Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ */}
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
                      
                      {/* Р РЋР С”РЎР‚Р ВµР С—Р С”Р В° Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚Р В° РЎвЂћР В°Р в„–Р В»Р С•Р Р† */}
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

          {/* Р СџРЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ */}
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
                Р СџРЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ
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

          {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р С—Р С•Р Т‘Р В°РЎвЂЎР Вµ */}
          <div 
            className="mb-6 space-y-1"
            style={{
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              fontSize: '12px'
            }}
          >
            <div>Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”: {achievement.assignedTo}</div>
            <div>Р вЂќР В°РЎвЂљР В° Р С—Р С•Р Т‘Р В°РЎвЂЎР С‘: {new Date(achievement.submittedDate).toLocaleDateString('ru-RU')}</div>
            <div>Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: {achievement.reward.amount} {achievement.reward.type}</div>
          </div>
        </div>
      </ModalOpaque>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С—Р С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘РЎРЏ Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ */}
      <ModalOpaque
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ"
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
              Р СњР ВµРЎвЂљ
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
              Р вЂќР В°
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
            Р вЂ™РЎвЂ№ РЎС“Р Р†Р ВµРЎР‚Р ВµР Р…РЎвЂ№, РЎвЂЎРЎвЂљР С• Р В·Р В°Р Т‘Р В°Р Р…Р С‘Р Вµ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С• Р Р†Р ВµРЎР‚Р Р…Р С•?
          </p>
        </div>
      </ModalOpaque>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ */}
      <ModalOpaque
        isOpen={rejectionModalOpen}
        onClose={() => setRejectionModalOpen(false)}
        title="Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ"
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
              Р С›РЎвЂљР СР ВµР Р…Р В°
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
              Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ
            </button>
          </div>
        }
      >
        <div>
          <textarea
            placeholder="Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ, РЎвЂЎРЎвЂљР С• Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С• Р Р…Р ВµР С—РЎР‚Р В°Р Р†Р С‘Р В»РЎРЉР Р…Р С•..."
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

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚Р В° РЎвЂћР В°Р в„–Р В»Р В° */}
      <ModalOpaque
        isOpen={fileViewerOpen}
        onClose={() => setFileViewerOpen(false)}
        title="Р СџРЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ РЎвЂћР В°Р в„–Р В»Р В°"
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
            Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ
          </button>
        }
      >
        <div 
          className="text-center p-8 rounded-lg mb-4"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>СЂСџвЂњвЂћ</div>
          <p 
            className="mb-2"
            style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Р В¤Р В°Р в„–Р В»: {selectedFile}
          </p>
          <p 
            style={{ 
              fontSize: '12px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Р СџРЎР‚Р ВµР Т‘Р Р†Р В°РЎР‚Р С‘РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р в„– Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ РЎвЂћР В°Р в„–Р В»Р В°
          </p>
        </div>
      </ModalOpaque>
    </>
  );
}
