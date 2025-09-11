import { useState } from 'react';
import { motion } from 'framer-motion';
import { CaseType, Prize } from '../types/cases';
import { mockCaseTypes, mockPrizes } from '../data/mockData';
import { Plus, Edit2, Trash2, Package, Gift, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';
import { Modal } from './Modal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ImageUploader } from './ImageUploader';

interface AdminCasesPageProps {
  theme: 'light' | 'dark';
  cases: CaseType[];
  setCases: (cases: CaseType[]) => void;
}

export function AdminCasesPage({ theme, cases, setCases }: AdminCasesPageProps) {
  const [activeTab, setActiveTab] = useState<'cases' | 'prizes'>('cases');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseType | null>(null);
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>(mockPrizes);
  


  // РЎРѕСЃС‚РѕСЏРЅРёРµ С„РѕСЂРјС‹ РєРµР№СЃР°
  const [caseForm, setCaseForm] = useState({
    name: '',
    image: 'рџ“¦',
    rarity: 'common' as const,
    color: '#94A3B8',
    description: '',
    isActive: true,
    selectedPrizes: [] as string[],
    glowColor: '#94A3B8',
    glowIntensity: 'low' as const
  });

  // РЎРѕСЃС‚РѕСЏРЅРёРµ С„РѕСЂРјС‹ РїСЂРёР·Р°
  const [prizeForm, setPrizeForm] = useState({
    name: '',
    image: 'рџЋЃ',
    rarity: 'common' as const,
    color: '#94A3B8',
    value: 0,
    dropChance: 10,
    description: ''
  });

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё, СЏРІР»СЏРµС‚СЃСЏ Р»Рё СЃС‚СЂРѕРєР° URL РёР»Рё base64
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };



  // РљРѕРјРїРѕРЅРµРЅС‚ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РёР»Рё СЌРјРѕРґР·Рё
  const ImageOrEmoji = ({ src, className = '', style = {} }: { src: string; className?: string; style?: React.CSSProperties }) => {
    if (isImageUrl(src)) {
      return (
        <ImageWithFallback
          src={src}
          alt="Image"
          className={`${className} object-cover`}
          style={style}
        />
      );
    }
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-xl">{src}</span>
      </div>
    );
  };

  const rarityColors = {
    common: '#94A3B8',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B',
    mythic: '#EF4444'
  };

  const handleCreateCase = () => {
    setEditingCase(null);
    setCaseForm({
      name: '',
      image: 'рџ“¦',
      rarity: 'common',
      color: '#94A3B8',
      description: '',
      isActive: true,
      selectedPrizes: [],
      glowColor: '#94A3B8',
      glowIntensity: 'low'
    });
    setIsModalOpen(true);
  };

  const handleEditCase = (caseItem: CaseType) => {
    setEditingCase(caseItem);
    setCaseForm({
      name: caseItem.name,
      image: caseItem.image,
      rarity: caseItem.rarity,
      color: caseItem.color,
      description: caseItem.description,
      isActive: caseItem.isActive,
      selectedPrizes: caseItem.prizes.map(p => p.id),
      glowColor: caseItem.glowColor || caseItem.color,
      glowIntensity: caseItem.glowIntensity || 'low'
    });
    setIsModalOpen(true);
  };

  const handleCreatePrize = () => {
    setEditingPrize(null);
    setPrizeForm({
      name: '',
      image: 'рџЋЃ',
      rarity: 'common',
      color: '#94A3B8',
      value: 0,
      dropChance: 10,
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleEditPrize = (prize: Prize) => {
    setEditingPrize(prize);
    setPrizeForm({
      name: prize.name,
      image: prize.image,
      rarity: prize.rarity,
      color: prize.color,
      value: prize.value,
      dropChance: prize.dropChance,
      description: prize.description
    });
    setIsModalOpen(true);
  };

  const handleSaveCase = () => {
    const selectedPrizeObjects = prizes.filter(p => caseForm.selectedPrizes.includes(p.id));
    
    const newCase: CaseType = {
      id: editingCase?.id || `case_${Date.now()}`,
      name: caseForm.name,
      image: caseForm.image,
      rarity: caseForm.rarity,
      color: caseForm.color,
      description: caseForm.description,
      contents: selectedPrizeObjects.map(p => p.name),
      prizes: selectedPrizeObjects,
      isActive: caseForm.isActive,
      glowColor: caseForm.glowColor,
      glowIntensity: caseForm.glowIntensity
    };

    if (editingCase) {
      setCases(cases.map(c => c.id === editingCase.id ? newCase : c));
    } else {
      setCases([...cases, newCase]);
    }

    setIsModalOpen(false);
    setEditingCase(null);
  };

  const handleSavePrize = () => {
    const newPrize: Prize = {
      id: editingPrize?.id || `prize_${Date.now()}`,
      name: prizeForm.name,
      image: prizeForm.image,
      rarity: prizeForm.rarity,
      color: prizeForm.color,
      value: prizeForm.value,
      dropChance: prizeForm.dropChance,
      description: prizeForm.description
    };

    if (editingPrize) {
      setPrizes(prizes.map(p => p.id === editingPrize.id ? newPrize : p));
      // РћР±РЅРѕРІР»СЏРµРј РєРµР№СЃС‹, РєРѕС‚РѕСЂС‹Рµ СЃРѕРґРµСЂР¶Р°С‚ СЌС‚РѕС‚ РїСЂРёР·
      setCases(cases.map(c => ({
        ...c,
        prizes: c.prizes.map(p => p.id === newPrize.id ? newPrize : p)
      })));
    } else {
      setPrizes([...prizes, newPrize]);
    }

    setIsModalOpen(false);
    setEditingPrize(null);
  };

  const handleDeleteCase = (caseId: string) => {
    setCases(cases.filter(c => c.id !== caseId));
  };

  const handleDeletePrize = (prizeId: string) => {
    setPrizes(prizes.filter(p => p.id !== prizeId));
    // РЈРґР°Р»СЏРµРј РїСЂРёР· РёР· РІСЃРµС… РєРµР№СЃРѕРІ
    setCases(cases.map(c => ({
      ...c,
      prizes: c.prizes.filter(p => p.id !== prizeId)
    })));
  };

  const handleToggleCaseActive = (caseId: string) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const renderCasesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">РЈРїСЂР°РІР»РµРЅРёРµ РєРµР№СЃР°РјРё</h3>
        <button
          onClick={handleCreateCase}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
        >
          <Plus className="w-4 h-4" />
          РЎРѕР·РґР°С‚СЊ РєРµР№СЃ
        </button>
      </div>

      <div className="space-y-3">
        {cases.map((caseItem) => (
          <div key={caseItem.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-lg border-2 overflow-hidden"
                  style={{ 
                    backgroundColor: caseItem.color + '20',
                    borderColor: caseItem.color
                  }}
                >
                  <ImageOrEmoji
                    src={caseItem.image}
                    className="w-full h-full"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{caseItem.name}</h4>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: caseItem.color + '20',
                        color: caseItem.color 
                      }}
                    >
                      {caseItem.rarity}
                    </span>
                    {!caseItem.isActive && (
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        РќРµР°РєС‚РёРІРµРЅ
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    РџСЂРёР·РѕРІ: {caseItem.prizes.length}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                  className="p-2 hover:bg-surface-2 rounded-lg transition-colors"
                >
                  {expandedCase === caseItem.id ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleCaseActive(caseItem.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    caseItem.isActive 
                      ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                      : 'bg-surface-2 text-muted-foreground hover:bg-surface-3'
                  }`}
                >
                  {caseItem.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleEditCase(caseItem)}
                  className="p-2 bg-surface-2 hover:bg-surface-3 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCase(caseItem.id)}
                  className="p-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedCase === caseItem.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <h5 className="font-medium mb-3">РџСЂРёР·С‹ РІ РєРµР№СЃРµ:</h5>
                <div className="grid grid-cols-1 gap-2">
                  {caseItem.prizes.map((prize) => (
                    <div key={prize.id} className="flex items-center gap-3 p-2 bg-surface-2 rounded-lg">
                      <div 
                        className="w-8 h-8 rounded overflow-hidden"
                        style={{ 
                          backgroundColor: prize.color + '20',
                          borderColor: prize.color
                        }}
                      >
                        <ImageOrEmoji
                          src={prize.image}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{prize.name}</div>
                        <div className="text-xs text-muted-foreground">
                          РЁР°РЅСЃ: {prize.dropChance}% вЂў Р¦РµРЅРЅРѕСЃС‚СЊ: {prize.value}
                        </div>
                      </div>
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: prize.color + '20',
                          color: prize.color 
                        }}
                      >
                        {prize.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrizesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">РЈРїСЂР°РІР»РµРЅРёРµ РїСЂРёР·Р°РјРё</h3>
        <button
          onClick={handleCreatePrize}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
        >
          <Plus className="w-4 h-4" />
          РЎРѕР·РґР°С‚СЊ РїСЂРёР·
        </button>
      </div>

      <div className="grid gap-3">
        {prizes.map((prize) => (
          <div key={prize.id} className="glass-card p-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg border-2 overflow-hidden"
                style={{ 
                  backgroundColor: prize.color + '20',
                  borderColor: prize.color
                }}
              >
                <ImageOrEmoji
                  src={prize.image}
                  className="w-full h-full"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{prize.name}</h4>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: prize.color + '20',
                      color: prize.color 
                    }}
                  >
                    {prize.rarity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {prize.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Р¦пїЅпїЅРЅРЅРѕСЃС‚СЊ: {prize.value}</span>
                  <span>РЁР°РЅСЃ: {prize.dropChance}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditPrize(prize)}
                  className="p-2 bg-surface-2 hover:bg-surface-3 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePrize(prize.id)}
                  className="p-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCaseModal = () => (
    <Modal
      isOpen={isModalOpen && (editingCase !== null || (!editingCase && !editingPrize))}
      onClose={() => setIsModalOpen(false)}
      title={editingCase ? 'Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РєРµР№СЃ' : 'РЎРѕР·РґР°С‚СЊ РєРµР№СЃ'}
      theme={theme}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">РќР°Р·РІР°РЅРёРµ</label>
          <input
            type="text"
            value={caseForm.name}
            onChange={(e) => setCaseForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ РєРµР№СЃР°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">РР·РѕР±СЂР°Р¶РµРЅРёРµ</label>
          <ImageUploader
            value={caseForm.image}
            onChange={(value) => setCaseForm(prev => ({ ...prev, image: value }))}
            placeholder="рџ“¦ РёР»Рё URL РёР·РѕР±СЂР°Р¶РµРЅРёСЏ (https://...) РёР»Рё РІСЃС‚Р°РІСЊС‚Рµ base64"
            defaultEmoji="рџ“¦"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р РµРґРєРѕСЃС‚СЊ</label>
          <select
            value={caseForm.rarity}
            onChange={(e) => {
              const rarity = e.target.value as keyof typeof rarityColors;
              setCaseForm(prev => ({ 
                ...prev, 
                rarity,
                color: rarityColors[rarity]
              }));
            }}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">РћРїРёСЃР°РЅРёРµ</label>
          <textarea
            value={caseForm.description}
            onChange={(e) => setCaseForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg resize-none"
            rows={3}
            placeholder="РћРїРёСЃР°РЅРёРµ РєРµР№СЃР°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">РџСЂРёР·С‹ РІ РєРµР№СЃРµ</label>
          <div className="max-h-40 overflow-y-auto space-y-2 border border-border rounded-lg p-2">
            {prizes.map((prize) => (
              <label key={prize.id} className="flex items-center gap-3 p-2 hover:bg-surface-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseForm.selectedPrizes.includes(prize.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCaseForm(prev => ({ 
                        ...prev, 
                        selectedPrizes: [...prev.selectedPrizes, prize.id] 
                      }));
                    } else {
                      setCaseForm(prev => ({ 
                        ...prev, 
                        selectedPrizes: prev.selectedPrizes.filter(id => id !== prize.id) 
                      }));
                    }
                  }}
                  className="rounded"
                />
                <div 
                  className="w-6 h-6 rounded overflow-hidden"
                  style={{ 
                    backgroundColor: prize.color + '20',
                    borderColor: prize.color
                  }}
                >
                  <ImageOrEmoji
                    src={prize.image}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm">{prize.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{prize.dropChance}%</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={caseForm.isActive}
            onChange={(e) => setCaseForm(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="isActive" className="text-sm">РђРєС‚РёРІРµРЅ</label>
        </div>

        {/* РЎРµРєС†РёСЏ РЅРµРѕРЅРѕРІРѕР№ РѕР±РІРѕРґРєРё */}
        <div className="border-t border-border pt-4 space-y-4">
          <h4 className="font-medium text-sm" 
              style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            вњЁ РќРµРѕРЅРѕРІР°СЏ РѕР±РІРѕРґРєР°
          </h4>
          
          <div>
            <label className="block text-sm font-medium mb-2">Р¦РІРµС‚ СЃРІРµС‡РµРЅРёСЏ</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={caseForm.glowColor}
                onChange={(e) => setCaseForm(prev => ({ ...prev, glowColor: e.target.value }))}
                className="w-12 h-10 border border-border rounded-lg cursor-pointer"
                style={{ backgroundColor: caseForm.glowColor }}
              />
              <input
                type="text"
                value={caseForm.glowColor}
                onChange={(e) => setCaseForm(prev => ({ ...prev, glowColor: e.target.value }))}
                className="flex-1 px-3 py-2 bg-input-background border border-border rounded-lg font-mono text-sm"
                placeholder="#FF0000"
                pattern="#[0-9A-Fa-f]{6}"
              />
              <button
                type="button"
                onClick={() => setCaseForm(prev => ({ ...prev, glowColor: caseForm.color }))}
                className="px-3 py-2 text-xs bg-surface-2 hover:bg-surface-3 rounded-lg transition-colors"
              >
                РљР°Рє РѕСЃРЅРѕРІРЅРѕР№
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">РРЅС‚РµРЅСЃРёРІРЅРѕСЃС‚СЊ СЃРІРµС‡РµРЅРёСЏ</label>
            <select
              value={caseForm.glowIntensity}
              onChange={(e) => setCaseForm(prev => ({ ...prev, glowIntensity: e.target.value as 'low' | 'medium' | 'high' }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            >
              <option value="low">РЎР»Р°Р±РѕРµ (Low)</option>
              <option value="medium">РЎСЂРµРґРЅРµРµ (Medium)</option>
              <option value="high">РЇСЂРєРѕРµ (High)</option>
            </select>
          </div>

          {/* РџСЂРµРІСЊСЋ РЅРµРѕРЅРѕРІРѕРіРѕ СЃРІРµС‡РµРЅРёСЏ */}
          <div className="p-4 bg-surface-2 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">РџСЂРµРІСЊСЋ СЌС„С„РµРєС‚Р°:</p>
            <div 
              className="w-20 h-20 mx-auto rounded-xl transition-all duration-300"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                border: `2px solid ${caseForm.glowColor}`,
                boxShadow: caseForm.glowIntensity === 'low' 
                  ? `0 0 10px ${caseForm.glowColor}40`
                  : caseForm.glowIntensity === 'medium'
                  ? `0 0 20px ${caseForm.glowColor}60, 0 0 40px ${caseForm.glowColor}20`
                  : `0 0 30px ${caseForm.glowColor}80, 0 0 60px ${caseForm.glowColor}40, 0 0 90px ${caseForm.glowColor}20`
              }}
            >
              <ImageOrEmoji
                src={caseForm.image}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            РћС‚РјРµРЅР°
          </button>
          <button
            onClick={handleSaveCase}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            {editingCase ? 'РћР±РЅРѕРІРёС‚СЊ' : 'РЎРѕР·РґР°С‚СЊ'}
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderPrizeModal = () => (
    <Modal
      isOpen={isModalOpen && editingPrize !== null}
      onClose={() => setIsModalOpen(false)}
      title={editingPrize ? 'Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РїСЂРёР·' : 'РЎРѕР·РґР°С‚СЊ РїСЂРёР·'}
      theme={theme}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">РќР°Р·РІР°РЅРёРµ</label>
          <input
            type="text"
            value={prizeForm.name}
            onChange={(e) => setPrizeForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ РїСЂРёР·Р°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">РР·РѕР±СЂР°Р¶РµРЅРёРµ</label>
          <ImageUploader
            value={prizeForm.image}
            onChange={(value) => setPrizeForm(prev => ({ ...prev, image: value }))}
            placeholder="рџЋЃ РёР»Рё URL РёР·РѕР±СЂР°Р¶РµРЅРёСЏ (https://...) РёР»Рё РІСЃС‚Р°РІСЊС‚Рµ base64"
            defaultEmoji="рџЋЃ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р РµРґРєРѕСЃС‚СЊ</label>
          <select
            value={prizeForm.rarity}
            onChange={(e) => {
              const rarity = e.target.value as keyof typeof rarityColors;
              setPrizeForm(prev => ({ 
                ...prev, 
                rarity,
                color: rarityColors[rarity]
              }));
            }}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Р¦РµРЅРЅРѕСЃС‚СЊ</label>
            <input
              type="number"
              value={prizeForm.value}
              onChange={(e) => setPrizeForm(prev => ({ ...prev, value: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">РЁР°РЅСЃ РІС‹РїР°РґРµРЅРёСЏ (%)</label>
            <input
              type="number"
              value={prizeForm.dropChance}
              onChange={(e) => setPrizeForm(prev => ({ ...prev, dropChance: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              min="0.1"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">РћРїРёСЃР°РЅРёРµ</label>
          <textarea
            value={prizeForm.description}
            onChange={(e) => setPrizeForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg resize-none"
            rows={3}
            placeholder="РћРїРёСЃР°РЅРёРµ РїСЂРёР·Р°"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            РћС‚РјРµРЅР°
          </button>
          <button
            onClick={handleSavePrize}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            {editingPrize ? 'РћР±РЅРѕРІРёС‚СЊ' : 'РЎРѕР·РґР°С‚СЊ'}
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">РЈРїСЂР°РІР»РµРЅРёРµ РєРµР№СЃР°РјРё</h2>
        <p className="text-muted-foreground">
          РЎРѕР·РґР°РІР°Р№С‚Рµ Рё РЅР°СЃС‚СЂР°РёРІР°Р№С‚Рµ РєРµР№СЃС‹ Рё РїСЂРёР·С‹ СЃ РёР·РѕР±СЂР°Р¶РµРЅРёСЏРјРё
        </p>
      </div>

      {/* РўР°Р±С‹ */}
      <div className="flex rounded-xl bg-surface-2 p-1">
        <button
          onClick={() => setActiveTab('cases')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'cases'
              ? 'bg-surface text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Package className="w-4 h-4" />
          РљРµР№СЃС‹
        </button>
        <button
          onClick={() => setActiveTab('prizes')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'prizes'
              ? 'bg-surface text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Gift className="w-4 h-4" />
          РџСЂРёР·С‹
        </button>
      </div>

      {/* РљРѕРЅС‚РµРЅС‚ С‚Р°Р±РѕРІ */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'cases' && renderCasesTab()}
        {activeTab === 'prizes' && renderPrizesTab()}
      </motion.div>

      {/* РњРѕРґР°Р»СЊРЅС‹Рµ РѕРєРЅР° */}
      {renderCaseModal()}
      {renderPrizeModal()}
    </div>
  );
}
