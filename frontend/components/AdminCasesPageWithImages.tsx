Р С—Р’В»РЎвЂ”import { useState } from 'react';
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

  // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋР’ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°
  const [caseForm, setCaseForm] = useState({
    name: '',
    image: 'Р РЋР вЂљР РЋРЎСџР Р†Р вЂљРЎС™Р вЂ™Р’В¦',
    rarity: 'common' as const,
    color: '#94A3B8',
    description: '',
    isActive: true,
    selectedPrizes: [] as string[]
  });

  // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋР’ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°
  const [prizeForm, setPrizeForm] = useState({
    name: '',
    image: 'Р РЋР вЂљР РЋРЎСџР В РІР‚в„–Р В РЎвЂњ',
    rarity: 'common' as const,
    color: '#94A3B8',
    value: 0,
    dropChance: 10,
    description: ''
  });

  // Р В Р’В Р вЂ™Р’В¤Р В Р Р‹Р РЋРІР‚СљР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљР’В Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚В, Р В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РЎвЂњР В Р Р‹Р В Р РЏ Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° URL
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В Р В Р Р‹Р В Р Р‰Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚В
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
      image: 'Р РЋР вЂљР РЋРЎСџР Р†Р вЂљРЎС™Р вЂ™Р’В¦',
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
      image: 'Р РЋР вЂљР РЋРЎСџР В РІР‚в„–Р В РЎвЂњ',
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
      // Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В±Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“, Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р Р‹Р В Р Р‰Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·
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
    // Р В Р’В Р В РІвЂљВ¬Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В· Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В· Р В Р’В Р В РІР‚В Р В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљР’В¦ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В 
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
        <h3 className="text-lg font-semibold">Р В Р’В Р В РІвЂљВ¬Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚В</h3>
        <button
          onClick={handleCreateCase}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњ
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
                        Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В : {caseItem.prizes.length}
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
                <h5 className="font-medium mb-3">Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р В РІР‚В  Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ:</h5>
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
                          Р В Р’В Р В Р С“Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В РЎвЂњ: {prize.dropChance}% Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р вЂ™Р’В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°: {prize.value}
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
        <h3 className="text-lg font-semibold">Р В Р’В Р В РІвЂљВ¬Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚В</h3>
        <button
          onClick={handleCreatePrize}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·
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
                  <span>Р В Р’В Р вЂ™Р’В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°: {prize.value}</span>
                  <span>Р В Р’В Р В Р С“Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В РЎвЂњ: {prize.dropChance}%</span>
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
      title={editingCase ? 'Р В Р’В Р вЂ™Р’В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњ' : 'Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњ'}
      theme={theme}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ</label>
          <input
            type="text"
            value={caseForm.name}
            onChange={(e) => setCaseForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            placeholder="Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р В Р’В Р вЂ™Р’ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ</label>
          <div className="space-y-2">
            <input
              type="text"
              value={caseForm.image}
              onChange={(e) => setCaseForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              placeholder="Р РЋР вЂљР РЋРЎСџР Р†Р вЂљРЎС™Р вЂ™Р’В¦ Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В URL Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ (https://...)"
            />
            <div className="text-xs text-muted-foreground">
              Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В¶Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р Р‹Р В Р Р‰Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚В Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В URL Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ
            </div>
            {/* Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™ */}
            {caseForm.image && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™:</span>
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
          <label className="block text-sm font-medium mb-2">Р В Р’В Р вЂ™Р’В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°</label>
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
          <label className="block text-sm font-medium mb-2">Р В Р’В Р РЋРІР‚С”Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ</label>
          <textarea
            value={caseForm.description}
            onChange={(e) => setCaseForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg resize-none"
            rows={3}
            placeholder="Р В Р’В Р РЋРІР‚С”Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р В РІР‚В  Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ</label>
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
          <label htmlFor="isActive" className="text-sm">Р В Р’В Р РЋРІР‚в„ўР В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦</label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°
          </button>
          <button
            onClick={handleSaveCase}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            {editingCase ? 'Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В±Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°' : 'Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°'}
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderPrizeModal = () => (
    <Modal
      isOpen={isModalOpen && editingPrize !== null}
      onClose={() => setIsModalOpen(false)}
      title={editingPrize ? 'Р В Р’В Р вЂ™Р’В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·' : 'Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·'}
      theme={theme}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ</label>
          <input
            type="text"
            value={prizeForm.name}
            onChange={(e) => setPrizeForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
            placeholder="Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Р В Р’В Р вЂ™Р’ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ</label>
          <div className="space-y-2">
            <input
              type="text"
              value={prizeForm.image}
              onChange={(e) => setPrizeForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              placeholder="Р РЋР вЂљР РЋРЎСџР В РІР‚в„–Р В РЎвЂњ Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В URL Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ (https://...)"
            />
            <div className="text-xs text-muted-foreground">
              Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В¶Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р Р‹Р В Р Р‰Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚В Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В URL Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ
            </div>
            {/* Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™ */}
            {prizeForm.image && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™:</span>
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
          <label className="block text-sm font-medium mb-2">Р В Р’В Р вЂ™Р’В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°</label>
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
            <label className="block text-sm font-medium mb-2">Р В Р’В Р вЂ™Р’В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°</label>
            <input
              type="number"
              value={prizeForm.value}
              onChange={(e) => setPrizeForm(prev => ({ ...prev, value: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Р В Р’В Р В Р С“Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В РЎвЂњ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚вЂќР В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ (%)</label>
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
          <label className="block text-sm font-medium mb-2">Р В Р’В Р РЋРІР‚С”Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ</label>
          <textarea
            value={prizeForm.description}
            onChange={(e) => setPrizeForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 bg-input-background border border-border rounded-lg resize-none"
            rows={3}
            placeholder="Р В Р’В Р РЋРІР‚С”Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 bg-surface-2 text-foreground rounded-lg hover:bg-surface-3 transition-colors"
          >
            Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°
          </button>
          <button
            onClick={handleSavePrize}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-pressed transition-colors"
          >
            {editingPrize ? 'Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В±Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°' : 'Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°'}
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Р В Р’В Р В РІвЂљВ¬Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚В</h2>
        <p className="text-muted-foreground">
          Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚В Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р РЋРІР‚В Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р Р‹Р В РЎвЂњ Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚В
        </p>
      </div>

      {/* Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ */}
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
          Р В Р’В Р РЋРІвЂћСћР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“
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
          Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“
        </button>
      </div>

      {/* Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'cases' && renderCasesTab()}
        {activeTab === 'prizes' && renderPrizesTab()}
      </motion.div>

      {/* Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° */}
      {renderCaseModal()}
      {renderPrizeModal()}
    </div>
  );
}
