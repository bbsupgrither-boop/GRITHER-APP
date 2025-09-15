п»їimport { Package } from './Icons';
import { ModalOpaque } from './ModalOpaque';

interface VipStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  theme?: 'light' | 'dark';
}

export function VipStatusModal({ isOpen, onClose, onApprove, onReject, theme = 'light' }: VipStatusModalProps) {
  return (
    <ModalOpaque
      isOpen={isOpen}
      onClose={onClose}
      title="VIP РЎРѓРЎвЂљР В°РЎвЂљРЎС“РЎРѓ"
      theme={theme}
      actions={
        <div className="flex gap-3">
          <button
            onClick={onReject}
            className="flex-1 transition-colors text-center"
            style={{
              height: '44px',
              borderRadius: '12px',
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.06)' 
                : '1px solid #E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
          </button>
          <button
            onClick={onApprove}
            className="flex-1 transition-colors text-center"
            style={{
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#2B82FF',
              color: '#ffffff',
              border: 'none'
            }}
          >
            Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Р ВР С”Р С•Р Р…Р С”Р В° РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
        <div className="flex justify-center mb-4">
          <div 
            className="flex items-center justify-center"
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
              borderRadius: '16px'
            }}
          >
            <Package style={{ width: '32px', height: '32px', color: '#2B82FF' }} />
          </div>
        </div>

        {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
        <div className="text-center">
          <div 
            className="mb-2 font-medium"
            style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°
          </div>
          <div 
            className="leading-relaxed"
            style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ VIP Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ Р Р…Р В° Р СР ВµРЎРѓРЎРЏРЎвЂ  РІР‚Сћ Р СџРЎР‚Р С‘Р С•РЎР‚Р С‘РЎвЂљР ВµРЎвЂљР Р…Р В°РЎРЏ Р С—Р С•Р Т‘Р Т‘Р ВµРЎР‚Р В¶Р С”Р В° РІР‚Сћ Р РЋР С”Р С‘Р Т‘Р С”Р С‘ Р Р…Р В° Р Р†РЎРѓР Вµ РЎвЂљР С•Р Р†Р В°РЎР‚РЎвЂ№
          </div>
        </div>

        {/* Р В¦Р ВµР Р…Р В° */}
        <div className="text-center">
          <div 
            className="mb-1"
            style={{ 
              fontSize: '14px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Р В¦Р ВµР Р…Р В°:
          </div>
          <div 
            className="font-medium"
            style={{ 
              fontSize: '18px',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            200 XP
          </div>
        </div>
      </div>
    </ModalOpaque>
  );
}
