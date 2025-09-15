import { useState } from 'react';
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
      <h1 className="text-2xl font-semibold mb-6">РўРµСЃС‚ РјРѕРґР°Р»СЊРЅС‹С… РѕРєРѕРЅ</h1>
      <p className="text-muted-foreground mb-6">
        Р’СЃРµ РјРѕРґР°Р»СЊРЅС‹Рµ РѕРєРЅР° С‚РµРїРµСЂСЊ РјРѕР¶РЅРѕ Р·Р°РєСЂС‹С‚СЊ РЅР°Р¶Р°С‚РёРµРј РЅР° РѕР±Р»Р°СЃС‚СЊ РІРЅРµ РјРѕРґР°Р»Р° РёР»Рё РєР»Р°РІРёС€РµР№ Escape
      </p>

      <button
        onClick={() => setIsModal1Open(true)}
        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors mb-4"
      >
        РћС‚РєСЂС‹С‚СЊ РѕР±С‹С‡РЅС‹Р№ РјРѕРґР°Р»
      </button>

      <button
        onClick={() => setIsModal2Open(true)}
        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors mb-4"
      >
        РћС‚РєСЂС‹С‚СЊ РЅРµРїСЂРѕР·СЂР°С‡РЅС‹Р№ РјРѕРґР°Р»
      </button>

      <button
        onClick={() => setIsModal3Open(true)}
        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors mb-4"
      >
        РћС‚РєСЂС‹С‚СЊ РјРѕРґР°Р» Р±РµР· РєРЅРѕРїРєРё Р·Р°РєСЂС‹С‚РёСЏ
      </button>

      {/* РћР±С‹С‡РЅС‹Р№ РјРѕРґР°Р» */}
      <Modal
        isOpen={isModal1Open}
        onClose={() => setIsModal1Open(false)}
        title="РћР±С‹С‡РЅС‹Р№ РјРѕРґР°Р»"
        theme={theme}
      >
        <div className="space-y-4">
          <p>Р­С‚РѕС‚ РјРѕРґР°Р» РјРѕР¶РЅРѕ Р·Р°РєСЂС‹С‚СЊ:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>РќР°Р¶Р°РІ РЅР° Р·Р°С‚РµРјРЅРµРЅРЅСѓСЋ РѕР±Р»Р°СЃС‚СЊ РІРЅРµ РјРѕРґР°Р»Р°</li>
            <li>РќР°Р¶Р°РІ РєР»Р°РІРёС€Сѓ Escape</li>
            <li>РќР°Р¶Р°РІ РєРЅРѕРїРєСѓ "Р—Р°РєСЂС‹С‚СЊ" РЅРёР¶Рµ</li>
          </ul>
          <button
            onClick={() => setIsModal1Open(false)}
            className="w-full px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            Р—Р°РєСЂС‹С‚СЊ
          </button>
        </div>
      </Modal>

      {/* РќРµРїСЂРѕР·СЂР°С‡РЅС‹Р№ РјРѕРґР°Р» */}
      <ModalOpaque
        isOpen={isModal2Open}
        onClose={() => setIsModal2Open(false)}
        title="РќРµРїСЂРѕР·СЂР°С‡РЅС‹Р№ РјРѕРґР°Р»"
        theme={theme}
        actions={
          <button
            onClick={() => setIsModal2Open(false)}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            Р“РѕС‚РѕРІРѕ
          </button>
        }
      >
        <div className="space-y-4">
          <p>Р­С‚РѕС‚ РЅРµРїСЂРѕР·СЂР°С‡РЅС‹Р№ РјРѕРґР°Р» С‚Р°РєР¶Рµ РјРѕР¶РЅРѕ Р·Р°РєСЂС‹С‚СЊ:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>РќР°Р¶Р°РІ РЅР° РѕР±Р»Р°СЃС‚СЊ РІРЅРµ РјРѕРґР°Р»Р°</li>
            <li>РќР°Р¶Р°РІ РєР»Р°РІРёС€Сѓ Escape</li>
            <li>РќР°Р¶Р°РІ РєРЅРѕРїРєСѓ "Р“РѕС‚РѕРІРѕ"</li>
          </ul>
        </div>
      </ModalOpaque>

      {/* РњРѕРґР°Р» Р±РµР· С„СѓРЅРєС†РёРё Р·Р°РєСЂС‹С‚РёСЏ (С‡С‚РѕР±С‹ РїРѕРєР°Р·Р°С‚СЊ, С‡С‚Рѕ РѕРЅ РІСЃРµ СЂР°РІРЅРѕ РЅРµ Р·Р°РєСЂРѕРµС‚СЃСЏ) */}
      <Modal
        isOpen={isModal3Open}
        title="РњРѕРґР°Р» Р±РµР· РєРЅРѕРїРєРё Р·Р°РєСЂС‹С‚РёСЏ"
        theme={theme}
      >
        <div className="space-y-4">
          <p>Р­С‚РѕС‚ РјРѕРґР°Р» РќР• РњРћР–Р•Рў Р±С‹С‚СЊ Р·Р°РєСЂС‹С‚ РїРѕ РєР»РёРєСѓ СЃРЅР°СЂСѓР¶Рё, РїРѕС‚РѕРјСѓ С‡С‚Рѕ РЅРµ РїРµСЂРµРґР°РЅР° С„СѓРЅРєС†РёСЏ onClose.</p>
          <p className="text-sm text-muted-foreground">
            Р­С‚Рѕ РґРµРјРѕРЅСЃС‚СЂРёСЂСѓРµС‚, С‡С‚Рѕ РјРѕРґР°Р»С‹ РјРѕРіСѓС‚ Р±Р»РѕРєРёСЂРѕРІР°С‚СЊ Р·Р°РєСЂС‹С‚РёРµ РєРѕРіРґР° СЌС‚Рѕ РЅРµРѕР±С…РѕРґРёРјРѕ.
          </p>
          <button
            onClick={() => setIsModal3Open(false)}
            className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            РџСЂРёРЅСѓРґРёС‚РµР»СЊРЅРѕ Р·Р°РєСЂС‹С‚СЊ
          </button>
        </div>
      </Modal>
    </div>
  );
}
