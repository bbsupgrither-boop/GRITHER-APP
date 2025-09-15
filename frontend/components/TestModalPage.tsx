п»їimport { useState } from 'react';
import { Modal } from './Modal';
import { ModalOpaque } from './ModalOpaque';

interface TestModalPageProps {
  theme: 'light' | 'dark';
}

export function TestModalPage({ theme }: TestModalPageProps) {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  return (
    <div className="min-h-screen p-8 space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Р СћР ВµРЎРѓРЎвЂљ Р СР С•Р Т‘Р В°Р В»РЎРЉР Р…РЎвЂ№РЎвЂ¦ Р С•Р С”Р С•Р Р…</h1>
      <p className="text-muted-foreground mb-6">
        Р вЂ™РЎРѓР Вµ Р СР С•Р Т‘Р В°Р В»РЎРЉР Р…РЎвЂ№Р Вµ Р С•Р С”Р Р…Р В° РЎвЂљР ВµР С—Р ВµРЎР‚РЎРЉ Р СР С•Р В¶Р Р…Р С• Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р Р…Р В°Р В¶Р В°РЎвЂљР С‘Р ВµР С Р Р…Р В° Р С•Р В±Р В»Р В°РЎРѓРЎвЂљРЎРЉ Р Р†Р Р…Р Вµ Р СР С•Р Т‘Р В°Р В»Р В° Р С‘Р В»Р С‘ Р С”Р В»Р В°Р Р†Р С‘РЎв‚¬Р ВµР в„– Escape
      </p>

      <button
        onClick={() => setIsModal1Open(true)}
        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors mb-4"
      >
        Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р С•Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В»
      </button>

      <button
        onClick={() => setIsModal2Open(true)}
        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors mb-4"
      >
        Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р Р…Р ВµР С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В»
      </button>

      <button
        onClick={() => setIsModal3Open(true)}
        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors mb-4"
      >
        Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР С•Р Т‘Р В°Р В» Р В±Р ВµР В· Р С”Р Р…Р С•Р С—Р С”Р С‘ Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ
      </button>

      {/* Р С›Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В» */}
      <Modal
        isOpen={isModal1Open}
        onClose={() => setIsModal1Open(false)}
        title="Р С›Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В»"
        theme={theme}
      >
        <div className="space-y-4">
          <p>Р В­РЎвЂљР С•РЎвЂљ Р СР С•Р Т‘Р В°Р В» Р СР С•Р В¶Р Р…Р С• Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Р СњР В°Р В¶Р В°Р Р† Р Р…Р В° Р В·Р В°РЎвЂљР ВµР СР Р…Р ВµР Р…Р Р…РЎС“РЎР‹ Р С•Р В±Р В»Р В°РЎРѓРЎвЂљРЎРЉ Р Р†Р Р…Р Вµ Р СР С•Р Т‘Р В°Р В»Р В°</li>
            <li>Р СњР В°Р В¶Р В°Р Р† Р С”Р В»Р В°Р Р†Р С‘РЎв‚¬РЎС“ Escape</li>
            <li>Р СњР В°Р В¶Р В°Р Р† Р С”Р Р…Р С•Р С—Р С”РЎС“ "Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ" Р Р…Р С‘Р В¶Р Вµ</li>
          </ul>
          <button
            onClick={() => setIsModal1Open(false)}
            className="w-full px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ
          </button>
        </div>
      </Modal>

      {/* Р СњР ВµР С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В» */}
      <ModalOpaque
        isOpen={isModal2Open}
        onClose={() => setIsModal2Open(false)}
        title="Р СњР ВµР С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В»"
        theme={theme}
        actions={
          <button
            onClick={() => setIsModal2Open(false)}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            Р вЂњР С•РЎвЂљР С•Р Р†Р С•
          </button>
        }
      >
        <div className="space-y-4">
          <p>Р В­РЎвЂљР С•РЎвЂљ Р Р…Р ВµР С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…РЎвЂ№Р в„– Р СР С•Р Т‘Р В°Р В» РЎвЂљР В°Р С”Р В¶Р Вµ Р СР С•Р В¶Р Р…Р С• Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Р СњР В°Р В¶Р В°Р Р† Р Р…Р В° Р С•Р В±Р В»Р В°РЎРѓРЎвЂљРЎРЉ Р Р†Р Р…Р Вµ Р СР С•Р Т‘Р В°Р В»Р В°</li>
            <li>Р СњР В°Р В¶Р В°Р Р† Р С”Р В»Р В°Р Р†Р С‘РЎв‚¬РЎС“ Escape</li>
            <li>Р СњР В°Р В¶Р В°Р Р† Р С”Р Р…Р С•Р С—Р С”РЎС“ "Р вЂњР С•РЎвЂљР С•Р Р†Р С•"</li>
          </ul>
        </div>
      </ModalOpaque>

      {/* Р СљР С•Р Т‘Р В°Р В» Р В±Р ВµР В· РЎвЂћРЎС“Р Р…Р С”РЎвЂ Р С‘Р С‘ Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ (РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р С—Р С•Р С”Р В°Р В·Р В°РЎвЂљРЎРЉ, РЎвЂЎРЎвЂљР С• Р С•Р Р… Р Р†РЎРѓР Вµ РЎР‚Р В°Р Р†Р Р…Р С• Р Р…Р Вµ Р В·Р В°Р С”РЎР‚Р С•Р ВµРЎвЂљРЎРѓРЎРЏ) */}
      <Modal
        isOpen={isModal3Open}
        title="Р СљР С•Р Т‘Р В°Р В» Р В±Р ВµР В· Р С”Р Р…Р С•Р С—Р С”Р С‘ Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ"
        theme={theme}
      >
        <div className="space-y-4">
          <p>Р В­РЎвЂљР С•РЎвЂљ Р СР С•Р Т‘Р В°Р В» Р СњР вЂў Р СљР С›Р вЂ“Р вЂўР Сћ Р В±РЎвЂ№РЎвЂљРЎРЉ Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљ Р С—Р С• Р С”Р В»Р С‘Р С”РЎС“ РЎРѓР Р…Р В°РЎР‚РЎС“Р В¶Р С‘, Р С—Р С•РЎвЂљР С•Р СРЎС“ РЎвЂЎРЎвЂљР С• Р Р…Р Вµ Р С—Р ВµРЎР‚Р ВµР Т‘Р В°Р Р…Р В° РЎвЂћРЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ onClose.</p>
          <p className="text-sm text-muted-foreground">
            Р В­РЎвЂљР С• Р Т‘Р ВµР СР С•Р Р…РЎРѓРЎвЂљРЎР‚Р С‘РЎР‚РЎС“Р ВµРЎвЂљ, РЎвЂЎРЎвЂљР С• Р СР С•Р Т‘Р В°Р В»РЎвЂ№ Р СР С•Р С–РЎС“РЎвЂљ Р В±Р В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљР С‘Р Вµ Р С”Р С•Р С–Р Т‘Р В° РЎРЊРЎвЂљР С• Р Р…Р ВµР С•Р В±РЎвЂ¦Р С•Р Т‘Р С‘Р СР С•.
          </p>
          <button
            onClick={() => setIsModal3Open(false)}
            className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Р СџРЎР‚Р С‘Р Р…РЎС“Р Т‘Р С‘РЎвЂљР ВµР В»РЎРЉР Р…Р С• Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ
          </button>
        </div>
      </Modal>
    </div>
  );
}
