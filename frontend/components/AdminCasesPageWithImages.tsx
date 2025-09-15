п»їimport { useState } from 'react';
import { motion } from 'framer-motion';
import { CaseType, Prize } from '../types/cases';
import { mockCaseTypes, mockPrizes } from '../data/mockData';
import { Plus, Edit2, Trash2, Package, Gift, Percent, Eye, EyeOff, ChevronDown, ChevronRight, Upload, Image as ImageIcon } from 'lucide-react';
import { Modal } from './Modal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdminCasesPageProps {
  theme: 'light' | 'dark';
  cases: CaseType[];
  setCases: (cases: CaseType[]) => void;
}

export function AdminCasesPageWithImages({ theme, cases, setCases }: AdminCasesPageProps) {
  const [activeTab, setActiveTab] = useState<'cases' | 'prizes'>('cases');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseType | null>(null);
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>(mockPrizes);

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ РЎвЂћР С•РЎР‚Р СРЎвЂ№ Р С”Р ВµР в„–РЎРѓР В°
  const [caseForm, setCaseForm] = useState({
    name: '',
    image: 'СЂСџвЂњВ¦',
    rarity: 'common' as const,
    color: '#94A3B8',
    description: '',
    isActive: true,
    selectedPrizes: [] as string[]
  });

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ РЎвЂћР С•РЎР‚Р СРЎвЂ№ Р С—РЎР‚Р С‘Р В·Р В°
  const [prizeForm, setPrizeForm] = useState({
    name: '',
    image: 'СЂСџР‹Рѓ',
    rarity: 'common' as const,
    color: '#94A3B8',
    value: 0,
    dropChance: 10,
    description: ''
  });

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘, РЎРЏР Р†Р В»РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р В»Р С‘ РЎРѓРЎвЂљРЎР‚Р С•Р С”Р В° URL
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // Р С™Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В»Р С‘ РЎРЊР СР С•Р Т‘Р В·Р С‘
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
      image: 'СЂСџвЂњВ¦',
      rarity: 'common',
      color: '#94A3B8',
      description: '',
      isActive: true,
      selectedPrizes: []
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
      selectedPrizes: caseItem.prizes.map(p => p.id)
    });
    setIsModalOpen(true);
  };

  const handleCreatePrize = () => {
    setEditingPrize(null);
    setPrizeForm({
      name: '',
      image: 'СЂСџР‹Рѓ',
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
      isActive: caseForm.isActive
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
      // Р С›Р В±Р Р…Р С•Р Р†Р В»РЎРЏР ВµР С Р С”Р ВµР в„–РЎРѓРЎвЂ№, Р С”Р С•РЎвЂљР С•РЎР‚РЎвЂ№Р Вµ РЎРѓР С•Р Т‘Р ВµРЎР‚Р В¶Р В°РЎвЂљ РЎРЊРЎвЂљР С•РЎвЂљ Р С—РЎР‚Р С‘Р В·
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
    // Р Р€Р Т‘Р В°Р В»РЎРЏР ВµР С Р С—РЎР‚Р С‘Р В· Р С‘Р В· Р Р†РЎРѓР ВµРЎвЂ¦ Р С”Р ВµР в„–РЎРѓР С•Р Р†
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
        <h3 className="text-lg font-semibold">Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В°Р СР С‘</h3>
        <button
          onClick={handleCreateCase}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С”Р ВµР в„–РЎРѓ
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
                        Р СњР ВµР В°Р С”РЎвЂљР С‘Р Р†Р ВµР Р…
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Р СџРЎР‚Р С‘Р В·Р С•Р Р†: {caseItem.prizes.length}
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
                <h5 className="font-medium mb-3">Р СџРЎР‚Р С‘Р В·РЎвЂ№ Р Р† Р С”Р ВµР в„–РЎРѓР Вµ:</h5>
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
                          Р РЃР В°Р Р…РЎРѓ: {prize.dropChance}% РІР‚Сћ Р В¦Р ВµР Р…Р Р…Р С•РЎРѓРЎвЂљРЎРЉ: {prize.value}
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
        <h3 className="text-lg font-semibold">Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р С—РЎР‚Р С‘Р В·Р В°Р СР С‘</h3>
        <button
          onClick={handleCreatePrize}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С—РЎР‚Р С‘Р В·
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
                  <span>Р В¦Р ВµР Р…Р Р…Р С•РЎРѓРЎвЂљРЎРЉ: {prize.value}</span>
                  <span>Р РЃР В°Р Р…РЎРѓ: {prize.dropChance}%</span>
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
      title={editingCase ? 'Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С”Р ВµР в„–РЎРѓ' : 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С”Р ВµР в„–РЎРѓ'}
      theme={theme}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ</label>
          <input
            type="text"
            value={caseForm.name}
            onChange={(e) => setCaseForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р ВР В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ</label>
          <div className="space-y-2">
            <input
              type="text"
              value={caseForm.image}
              onChange={(e) => setCaseForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              placeholder="СЂСџвЂњВ¦ Р С‘Р В»Р С‘ URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ (https://...)"
            />
            <div className="text-xs text-muted-foreground">
              Р СљР С•Р В¶Р Р…Р С• Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ РЎРЊР СР С•Р Т‘Р В·Р С‘ Р С‘Р В»Р С‘ URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
            </div>
            {/* Р СџРЎР‚Р ВµР Т‘Р Р†Р В°РЎР‚Р С‘РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р в„– Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ */}
            {caseForm.image && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚:</span>
                <div 
                  className="w-8 h-8 rounded border overflow-hidden"
                  style={{ 
                    backgroundColor: caseForm.color + '20',
                    borderColor: caseForm.color
                  }}
                >
                  <ImageOrEmoji
                    src={caseForm.image}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р В Р ВµР Т‘Р С”Р С•РЎРѓРЎвЂљРЎРЉ</label>
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
          <label className="block text-sm font-medium mb-2">Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ</label>
          <textarea
            value={caseForm.description}
            onChange={(e) => setCaseForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg resize-none"
            rows={3}
            placeholder="Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р СџРЎР‚Р С‘Р В·РЎвЂ№ Р Р† Р С”Р ВµР в„–РЎРѓР Вµ</label>
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
          <label htmlFor="isActive" className="text-sm">Р С’Р С”РЎвЂљР С‘Р Р†Р ВµР Р…</label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            Р С›РЎвЂљР СР ВµР Р…Р В°
          </button>
          <button
            onClick={handleSaveCase}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            {editingCase ? 'Р С›Р В±Р Р…Р С•Р Р†Р С‘РЎвЂљРЎРЉ' : 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ'}
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderPrizeModal = () => (
    <Modal
      isOpen={isModalOpen && editingPrize !== null}
      onClose={() => setIsModalOpen(false)}
      title={editingPrize ? 'Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С—РЎР‚Р С‘Р В·' : 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С—РЎР‚Р С‘Р В·'}
      theme={theme}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ</label>
          <input
            type="text"
            value={prizeForm.name}
            onChange={(e) => setPrizeForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С—РЎР‚Р С‘Р В·Р В°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р ВР В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ</label>
          <div className="space-y-2">
            <input
              type="text"
              value={prizeForm.image}
              onChange={(e) => setPrizeForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              placeholder="СЂСџР‹Рѓ Р С‘Р В»Р С‘ URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ (https://...)"
            />
            <div className="text-xs text-muted-foreground">
              Р СљР С•Р В¶Р Р…Р С• Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ РЎРЊР СР С•Р Т‘Р В·Р С‘ Р С‘Р В»Р С‘ URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
            </div>
            {/* Р СџРЎР‚Р ВµР Т‘Р Р†Р В°РЎР‚Р С‘РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р в„– Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ */}
            {prizeForm.image && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚:</span>
                <div 
                  className="w-8 h-8 rounded border overflow-hidden"
                  style={{ 
                    backgroundColor: prizeForm.color + '20',
                    borderColor: prizeForm.color
                  }}
                >
                  <ImageOrEmoji
                    src={prizeForm.image}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р В Р ВµР Т‘Р С”Р С•РЎРѓРЎвЂљРЎРЉ</label>
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
            <label className="block text-sm font-medium mb-2">Р В¦Р ВµР Р…Р Р…Р С•РЎРѓРЎвЂљРЎРЉ</label>
            <input
              type="number"
              value={prizeForm.value}
              onChange={(e) => setPrizeForm(prev => ({ ...prev, value: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Р РЃР В°Р Р…РЎРѓ Р Р†РЎвЂ№Р С—Р В°Р Т‘Р ВµР Р…Р С‘РЎРЏ (%)</label>
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
          <label className="block text-sm font-medium mb-2">Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ</label>
          <textarea
            value={prizeForm.description}
            onChange={(e) => setPrizeForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg resize-none"
            rows={3}
            placeholder="Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С—РЎР‚Р С‘Р В·Р В°"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            Р С›РЎвЂљР СР ВµР Р…Р В°
          </button>
          <button
            onClick={handleSavePrize}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            {editingPrize ? 'Р С›Р В±Р Р…Р С•Р Р†Р С‘РЎвЂљРЎРЉ' : 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ'}
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В°Р СР С‘</h2>
        <p className="text-muted-foreground">
          Р РЋР С•Р В·Р Т‘Р В°Р Р†Р В°Р в„–РЎвЂљР Вµ Р С‘ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р В°Р С‘Р Р†Р В°Р в„–РЎвЂљР Вµ Р С”Р ВµР в„–РЎРѓРЎвЂ№ Р С‘ Р С—РЎР‚Р С‘Р В·РЎвЂ№ РЎРѓ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏР СР С‘
        </p>
      </div>

      {/* Р СћР В°Р В±РЎвЂ№ */}
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
          Р С™Р ВµР в„–РЎРѓРЎвЂ№
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
          Р СџРЎР‚Р С‘Р В·РЎвЂ№
        </button>
      </div>

      {/* Р С™Р С•Р Р…РЎвЂљР ВµР Р…РЎвЂљ РЎвЂљР В°Р В±Р С•Р Р† */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'cases' && renderCasesTab()}
        {activeTab === 'prizes' && renderPrizesTab()}
      </motion.div>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…РЎвЂ№Р Вµ Р С•Р С”Р Р…Р В° */}
      {renderCaseModal()}
      {renderPrizeModal()}
    </div>
  );
}
