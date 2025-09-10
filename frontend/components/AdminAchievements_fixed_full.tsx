import { useState } from 'react';
import { Plus, Trophy, X, Paperclip, ChevronDown, Menu, Home, Users, Zap, CheckSquare, ShoppingBag, Gamepad2, Box, Edit, History } from './Icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Achievement } from '../types/achievements';

interface AdminAchievementsProps {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  currentAdminPage?: string;
  setCurrentAdminPage?: (page: string) => void;
}

export function AdminAchievements({ achievements, setAchievements, currentAdminPage = 'achievements', setCurrentAdminPage }: AdminAchievementsProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [moderationModalOpen, setModerationModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedModerationItem, setSelectedModerationItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [rewardType, setRewardType] = useState<'XP' | 'G-coin'>('XP');
  const [rewardAmount, setRewardAmount] = useState<string>('100');
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [moderationSortBy, setModerationSortBy] = useState<'alphabet' | 'date'>('date');
  const [showModerationSort, setShowModerationSort] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [rejectFile, setRejectFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtasks: [''],
    image: null as File | null,
    rewardType: 'XP' as 'XP' | 'G-coin',
    rewardAmount: 100
  });

  // РќР°РІРёРіР°С†РёРѕРЅРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹ РїР°РЅРµР»Рё Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°
  const navigationItems = [
    { icon: Home, label: 'Р“Р»Р°РІРЅР°СЏ', section: 'dashboard' },
    { icon: Users, label: 'Р’РѕСЂРєРµСЂС‹', section: 'workers' },
    { icon: Zap, label: 'Р‘Р°С‚С‚Р»С‹', section: 'battles' },
    { icon: Trophy, label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р—Р°РґР°С‡Рё', section: 'tasks' },
    { icon: ShoppingBag, label: 'РўРѕРІР°СЂС‹', section: 'shop' },
    { icon: Gamepad2, label: 'РРіСЂС‹', section: 'games' },
    { icon: Box, label: 'РљРµР№СЃС‹', section: 'cases' }
  ];

  // Placeholder РґР°РЅРЅС‹Рµ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
  const placeholderAchievements = achievements.length > 0 ? achievements : [
    { 
      id: '1', 
      title: 'РџРµСЂРІС‹Рµ С€Р°РіРё', 
      description: 'Р’С‹РїРѕР»РЅРёС‚Рµ РїРµСЂРІСѓСЋ Р·Р°РґР°С‡Сѓ РІ СЃРёСЃС‚РµРјРµ',
      icon: 'рџЏ†',
      isUnlocked: false,
      category: 'general' as const,
      rarity: 'common' as const,
      requirements: { type: 'tasks', target: 1, current: 0 }
    },
    { 
      id: '2', 
      title: 'РљРѕРјР°РЅРґРЅС‹Р№ РёРіСЂРѕРє', 
      description: 'Р’С‹РїРѕР»РЅРёС‚Рµ 5 Р·Р°РґР°С‡ РІ РєРѕРјР°РЅРґРµ',
      icon: 'рџ‘Ґ',
      isUnlocked: false,
      category: 'tasks' as const,
      rarity: 'rare' as const,
      requirements: { type: 'team_tasks', target: 5, current: 2 }
    },
    { 
      id: '3', 
      title: 'Р­РєСЃРїРµСЂС‚ Р±Р°С‚С‚Р»РѕРІ', 
      description: 'Р’С‹РёРіСЂР°Р№С‚Рµ 10 Р±Р°С‚С‚Р»РѕРІ РїРѕРґСЂСЏРґ',
      icon: 'вљЎ',
      isUnlocked: false,
      category: 'battles' as const,
      rarity: 'epic' as const,
      requirements: { type: 'battle_wins', target: 10, current: 2 }
    },
    { 
      id: '4', 
      title: 'Р›РµРіРµРЅРґР° GRITHER', 
      description: 'Р”РѕСЃС‚РёРіРЅРёС‚Рµ РјР°РєСЃРёРјР°Р»СЊРЅРѕРіРѕ СѓСЂРѕРІРЅСЏ',
      icon: 'рџ‘‘',
      isUnlocked: false,
      category: 'progression' as const,
      rarity: 'legendary' as const,
      requirements: { type: 'level', target: 100, current: 5 }
    }
  ];

  // Placeholder РґР°РЅРЅС‹Рµ РґР»СЏ РјРѕРґРµСЂР°С†РёРё
  const moderationItems = [
    {
      id: '1',
      achievementTitle: 'РџРµСЂРІС‹Рµ С€Р°РіРё',
      status: 'РЅР° РїСЂРѕРІРµСЂРєРµ',
      employee: 'РђР»РµРєСЃРµР№ РРІР°РЅРѕРІ, РљРѕРјР°РЅРґР° Рђ',
      progress: 100.0,
      dateSubmitted: '2024-01-15'
    },
    {
      id: '2', 
      achievementTitle: 'РљРѕРјР°РЅРґРЅС‹Р№ РёРіСЂРѕРє',
      status: 'РЅР° РїСЂРѕРІРµСЂРєРµ',
      employee: 'РњР°СЂРёСЏ РџРµС‚СЂРѕРІР°, РљРѕРјР°РЅРґР° Р‘',
      progress: 100.0,
      dateSubmitted: '2024-01-14'
    },
    {
      id: '3',
      achievementTitle: 'Р­РєСЃРїРµСЂС‚ Р±Р°С‚С‚Р»РѕРІ', 
      status: 'РЅР° РїСЂРѕРІРµСЂРєРµ',
      employee: 'Р”РјРёС‚СЂРёР№ РЎРёРґРѕСЂРѕРІ, РљРѕРјР°РЅРґР° Р’',
      progress: 100.0,
      dateSubmitted: '2024-01-13'
    }
  ];

  const handleCreate = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: formData.title || 'РќРѕРІРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ',
      description: formData.description,
      icon: 'рџЏ†',
      isUnlocked: false,
      category: 'general',
      rarity: 'common',
      requirements: { 
        type: 'custom', 
        target: 1, 
        current: 0 
      }
    };
    setAchievements([...achievements, newAchievement]);
    setCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subtasks: [''],
      image: null,
      rewardType: 'XP',
      rewardAmount: 100
    });
    setIsEditing(false);
    setIsEditingTitle(false);
  };

  const addSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, '']
    });
  };

  const updateSubtask = (index: number, value: string) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index] = value;
    setFormData({
      ...formData,
      subtasks: newSubtasks
    });
  };

  const removeSubtask = (index: number) => {
    if (formData.subtasks.length > 1) {
      const newSubtasks = formData.subtasks.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        subtasks: newSubtasks
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRejectFile(file);
    }
  };

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      subtasks: ['РџРѕРґР·Р°РґР°С‡Р°'],
      image: null,
      rewardType: 'XP',
      rewardAmount: achievement.requirements.target || 100
    });
    setDetailModalOpen(true);
  };

  const handleModerationClick = () => {
    setModerationModalOpen(true);
  };

  const handleApproveAchievement = (item: any) => {
    // Р›РѕРіРёРєР° РѕРґРѕР±СЂРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ
    console.log('Approved:', item);
  };

  const handleRejectAchievement = (item: any) => {
    setSelectedModerationItem(item);
    setRejectModalOpen(true);
  };

  const handleSubmitReject = () => {
    if (!rejectReason.trim()) {
      alert('РЈРєР°Р¶РёС‚Рµ РїСЂРёС‡РёРЅСѓ РѕС‚РєР»РѕРЅРµРЅРёСЏ');
      return;
    }
    // Р›РѕРіРёРєР° РѕС‚РєР»РѕРЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ
    console.log('Rejected:', selectedModerationItem, rejectReason, rejectComment, rejectFile);
    setRejectModalOpen(false);
    setRejectReason('');
    setRejectComment('');
    setRejectFile(null);
    setSelectedModerationItem(null);
  };

  const sortedModerationItems = [...moderationItems].sort((a, b) => {
    if (moderationSortBy === 'alphabet') {
      return a.achievementTitle.localeCompare(b.achievementTitle);
    } else {
      return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime();
    }
  });

  const handleSaveEdit = () => {
    if (selectedAchievement && (isEditing || isEditingTitle)) {
      const updatedAchievements = achievements.map(achievement =>
        achievement.id === selectedAchievement.id
          ? { 
              ...achievement, 
              title: formData.title,
              description: formData.description,
              requirements: {
                ...achievement.requirements,
                target: formData.rewardAmount
              }
            }
          : achievement
      );
      setAchievements(updatedAchievements);
      setIsEditing(false);
      setIsEditingTitle(false);
    }
  };

  const handleRewardClick = () => {
    if (selectedAchievement) {
      setRewardType('XP');
      setRewardAmount(formData.rewardAmount.toString());
      setRewardModalOpen(true);
    }
  };

  const handleRewardSave = () => {
    const newAmount = parseInt(rewardAmount) || 0;
    setFormData({ ...formData, rewardAmount: newAmount, rewardType });
    if (selectedAchievement) {
      const updatedAchievements = achievements.map(achievement =>
        achievement.id === selectedAchievement.id
          ? { 
              ...achievement, 
              requirements: {
                ...achievement.requirements,
                target: newAmount
              }
            }
          : achievement
      );
      setAchievements(updatedAchievements);
    }
    setRewardModalOpen(false);
    setIsEditingAmount(false);
  };

  return (
    <>
      <div className="min-h-screen bg-background pb-40">
        <div className="p-6">
          {/* Р—Р°РіРѕР»РѕРІРѕРє */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground">РџР°РЅРµР»СЊ СѓРїСЂР°РІР»РµРЅРёСЏ</h2>
          </div>

          {/* РЈРїСЂР°РІР»РµРЅРёРµ */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
              >
                Р”РѕР±Р°РІРёС‚СЊ
              </button>
              <button 
                onClick={handleModerationClick}
                className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
              >
                РџСЂРѕРІРµСЂРєР°
              </button>
            </div>
          </div>

          {/* Card СЃ РґРѕСЃС‚РёР¶РµРЅРёСЏРјРё */}
          <div className="px-6">
            <div className="glass-card rounded-2xl apple-shadow p-4">
              {/* Р—Р°РіРѕР»РѕРІРѕРє */}
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-lg font-medium text-foreground text-center">Р”РѕСЃС‚СѓРїРЅС‹Рµ РґРѕСЃС‚РёР¶РµРЅРёСЏ</h2>
              </div>

              {/* РЎРїРёСЃРѕРє РґРѕСЃС‚РёР¶РµРЅРёР№ */}
              <div className="space-y-3">
                {placeholderAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center justify-between p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => handleAchievementClick(achievement)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {Math.round((achievement.requirements.current / achievement.requirements.target) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
                {placeholderAchievements.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Р”РѕСЃС‚РёР¶РµРЅРёСЏ РЅРµ РЅР°Р№РґРµРЅС‹
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Р‘С‹СЃС‚СЂР°СЏ РЅР°РІРёРіР°С†РёСЏ */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/20">
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {navigationItems.slice(0, 4).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.section === currentAdminPage;
                  return (
                    <button 
                      key={index} 
                      className="flex flex-col items-center text-center"
                      onClick={() => setCurrentAdminPage?.(item.section)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                        isActive ? 'bg-primary' : 'glass-card'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isActive ? 'text-white' : 'text-foreground/70'
                        }`} />
                      </div>
                      <span className={`text-xs ${
                        isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {navigationItems.slice(4, 8).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.section === currentAdminPage;
                  return (
                    <button 
                      key={index} 
                      className="flex flex-col items-center text-center"
                      onClick={() => setCurrentAdminPage?.(item.section)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                        isActive ? 'bg-primary' : 'glass-card'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isActive ? 'text-white' : 'text-foreground/70'
                        }`} />
                      </div>
                      <span className={`text-xs ${
                        isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЃРѕР·РґР°РЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="sr-only">РЎРѕР·РґР°РЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ РЅРѕРІРѕРіРѕ РґРѕСЃС‚РёР¶РµРЅРёСЏ СЃ СѓРєР°Р·Р°РЅРёРµРј РЅР°Р·РІР°РЅРёСЏ, РѕРїРёСЃР°РЅРёСЏ, РїРѕРґР·Р°РґР°С‡ Рё РЅР°РіСЂР°РґС‹
            </DialogDescription>
            <div className="p-6 pt-2">
              <h2 className="text-lg font-medium text-foreground text-center mb-4">РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ</h2>
              <div className="space-y-6">
                {/* РџРѕР»Рµ РЅР°Р·РІР°РЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
                <div className="text-center">
                  <Input
                    placeholder="РќР°Р·РІР°РЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-transparent border border-border rounded-lg text-center font-medium"
                  />
                </div>

                {/* РР·РѕР±СЂР°Р¶РµРЅРёРµ Рё РѕРїРёСЃР°РЅРёРµ */}
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex gap-4">
                    {/* РћР±Р»Р°СЃС‚СЊ РґР»СЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ */}
                    <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-foreground/70" />
                    </div>

                    {/* РџРѕР»Рµ РѕРїРёСЃР°РЅРёСЏ */}
                    <div className="flex-1">
                      <Textarea
                        placeholder="РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ С‚РѕРіРѕ, С‡С‚Рѕ РЅСѓР¶РЅРѕ СЃРґРµР»Р°С‚СЊ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ СЌС‚РѕРіРѕ РґРѕСЃС‚РёР¶РµРЅРёСЏ"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-transparent border-none resize-none min-h-16 text-sm focus:outline-none p-0"
                      />
                      
                      {/* РџРѕРґР·Р°РґР°С‡Рё */}
                      <div className="mt-4 space-y-2">
                        {formData.subtasks.map((subtask, index) => (
                          <div key={index} className="flex items-center gap-2 pl-2 border-l-2 border-muted">
                            <Input
                              placeholder="РџРѕРґР·Р°РґР°С‡Р°"
                              value={subtask}
                              onChange={(e) => updateSubtask(index, e.target.value)}
                              className="bg-transparent border-none text-sm p-0 h-6"
                            />
                            <div className="flex gap-1">
                              <button className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                                <Paperclip className="w-3 h-3 text-muted-foreground" />
                              </button>
                              {formData.subtasks.length > 1 && (
                                <button 
                                  onClick={() => removeSubtask(index)}
                                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                                >
                                  <X className="w-3 h-3 text-muted-foreground" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {/* РљРЅРѕРїРєР° РґРѕР±Р°РІР»РµРЅРёСЏ РїРѕРґР·Р°РґР°С‡Рё */}
                        <button
                          onClick={addSubtask}
                          className="flex items-center gap-2 pl-2 py-1 text-sm text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Р”РѕР±Р°РІРёС‚СЊ РїРѕРґР·Р°РґР°С‡Сѓ</span>
                        </button>
                      </div>
                    </div>

                    {/* РљРЅРѕРїРєР° Р·Р°РіСЂСѓР·РєРё РёР·РѕР±СЂР°Р¶РµРЅРёСЏ */}
                    <div className="flex flex-col gap-1 pt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload-create"
                      />
                      <label
                        htmlFor="image-upload-create"
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors cursor-pointer"
                      >
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* РќР°РіСЂР°РґР° */}
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">
                    РќР°РіСЂР°РґР°: {formData.rewardAmount} {formData.rewardType}
                  </div>
                </div>

                {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ */}
                <div className="flex gap-3 pt-4 mt-6">
                  <button
                    onClick={() => {
                      setCreateModalOpen(false);
                      resetForm();
                    }}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    onClick={() => {
                      handleCreate();
                      resetForm();
                    }}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    РџСЂРёРјРµРЅРёС‚СЊ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґРµС‚Р°Р»РµР№ РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="sr-only">Р РµРґР°РєС‚РёСЂРѕРІР°РЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЃ РїРѕРґСЂРѕР±РЅРѕР№ РёРЅС„РѕСЂРјР°С†РёРµР№ Рѕ РґРѕСЃС‚РёР¶РµРЅРёРё Рё РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РЅР°Р·РІР°РЅРёСЏ, РѕРїРёСЃР°РЅРёСЏ Рё РЅР°РіСЂР°РґС‹
            </DialogDescription>
            <div className="p-6 pt-2">
              <h2 className="text-lg font-medium text-foreground text-center mb-4">РЈСЃР»РѕРІРёСЏ РІС‹РїРѕР»РЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ</h2>
              {selectedAchievement && (
                <div className="space-y-6">
                  {/* РџРѕР»Рµ Р·Р°РіРѕР»РѕРІРєР° */}
                  <div className="text-center">
                    {isEditingTitle ? (
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        onBlur={() => setIsEditingTitle(false)}
                        className="bg-transparent border border-border rounded-lg text-center font-medium"
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => setIsEditingTitle(true)}
                        className="text-lg font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 py-1 transition-colors"
                      >
                        {formData.title}
                      </button>
                    )}
                  </div>

                  {/* РР·РѕР±СЂР°Р¶РµРЅРёРµ Рё РѕРїРёСЃР°РЅРёРµ */}
                  <div className="glass-card rounded-2xl p-4">
                    <div className="flex gap-4">
                      {/* РћР±Р»Р°СЃС‚СЊ РґР»СЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ */}
                      <div className="relative w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-foreground/70" />
                        {/* РљРЅРѕРїРєР° СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ */}
                        <div className="absolute -top-1 -right-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload-detail"
                          />
                          <label
                            htmlFor="image-upload-detail"
                            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform apple-shadow"
                          >
                            <Edit className="w-3 h-3 text-white" />
                          </label>
                        </div>
                      </div>

                      {/* РџРѕР»Рµ РѕРїРёСЃР°РЅРёСЏ */}
                      <div className="flex-1">
                        <div className="relative">
                          {isEditing ? (
                            <Textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="bg-transparent border-none resize-none min-h-16 text-sm focus:outline-none p-0"
                            />
                          ) : (
                            <div className="text-sm text-foreground min-h-16 py-2">
                              {formData.description}
                            </div>
                          )}
                        </div>
                        
                        {/* РџРѕРґР·Р°РґР°С‡Р° */}
                        <div className="mt-4 pl-2 border-l-2 border-muted">
                          <div className="text-sm text-muted-foreground">РџРѕРґР·Р°РґР°С‡Р°</div>
                        </div>
                      </div>

                      {/* РљРЅРѕРїРєРё СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ СЃРїСЂР°РІР° */}
                      <div className="flex flex-col gap-1 pt-2">
                        <button 
                          onClick={() => setIsEditing(!isEditing)}
                          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                          <Paperclip className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* РќР°РіСЂР°РґР° - РєР»РёРєР°Р±РµР»СЊРЅР°СЏ */}
                  <div className="text-center">
                    <button
                      onClick={handleRewardClick}
                      className="text-sm font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 py-1 transition-colors"
                    >
                      РќР°РіСЂР°РґР°: {formData.rewardAmount} {formData.rewardType}
                    </button>
                  </div>

                  {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ */}
                  <div className="flex gap-3 pt-4 mt-6">
                    <button
                      onClick={() => {
                        setDetailModalOpen(false);
                        resetForm();
                      }}
                      className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                    >
                      РћС‚РјРµРЅРёС‚СЊ
                    </button>
                    <button
                      onClick={() => {
                        if (isEditing || isEditingTitle) {
                          handleSaveEdit();
                        }
                        setDetailModalOpen(false);
                        resetForm();
                      }}
                      className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                    >
                      РџСЂРёРјРµРЅРёС‚СЊ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РЅР°РіСЂР°РґС‹ */}
        <Dialog open={rewardModalOpen} onOpenChange={setRewardModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РќР°СЃС‚СЂРѕР№РєР° РЅР°РіСЂР°РґС‹</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё С‚РёРїР° Рё РєРѕР»РёС‡РµСЃС‚РІР° РЅР°РіСЂР°РґС‹ Р·Р° РґРѕСЃС‚РёР¶РµРЅРёРµ
            </DialogDescription>
            <div className="p-6 pt-2">
              <div className="space-y-6">
                {/* РўРёРї РЅР°РіСЂР°РґС‹ */}
                <div className="text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setRewardType('XP')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        rewardType === 'XP' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-foreground hover:bg-accent'
                      }`}
                    >
                      XP
                    </button>
                    <button
                      onClick={() => setRewardType('G-coin')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        rewardType === 'G-coin' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-foreground hover:bg-accent'
                      }`}
                    >
                      G-coin
                    </button>
                  </div>
                </div>

                {/* РљРѕР»РёС‡РµСЃС‚РІРѕ */}
                <div className="text-center">
                  <Input
                    type="number"
                    value={rewardAmount}
                    onChange={(e) => setRewardAmount(e.target.value)}
                    className="bg-transparent border border-border rounded-lg text-center font-medium"
                    min="1"
                  />
                </div>

                {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setRewardModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    onClick={handleRewardSave}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    РЎРѕС…СЂР°РЅРёС‚СЊ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РјРѕРґРµСЂР°С†РёРё РґРѕСЃС‚РёР¶РµРЅРёР№ */}
        <Dialog open={moderationModalOpen} onOpenChange={setModerationModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РњРѕРґРµСЂР°С†РёСЏ РґРѕСЃС‚РёР¶РµРЅРёР№</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РїСЂРѕРІРµСЂРєРё Рё РјРѕРґРµСЂР°С†РёРё РґРѕСЃС‚РёР¶РµРЅРёР№, РѕС‚РїСЂР°РІР»РµРЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё РЅР° РїСЂРѕРІРµСЂРєСѓ
            </DialogDescription>
            <div className="p-6">
              {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ СЃРѕСЂС‚РёСЂРѕРІРєРѕР№ */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-foreground">
                  Р”РѕСЃС‚РёР¶РµРЅРёСЏ РЅР° РїСЂРѕРІРµСЂРєРµ ({sortedModerationItems.length})
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowModerationSort(!showModerationSort)}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Menu className="w-4 h-4 text-foreground/70" />
                  </button>
                  
                  {showModerationSort && (
                    <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg z-10 min-w-[160px]">
                      <button
                        onClick={() => {
                          setModerationSortBy('date');
                          setShowModerationSort(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                          moderationSortBy === 'date' ? 'text-primary font-medium' : 'text-foreground'
                        }`}
                      >
                        РџРѕ РґР°С‚Рµ
                      </button>
                      <button
                        onClick={() => {
                          setModerationSortBy('alphabet');
                          setShowModerationSort(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                          moderationSortBy === 'alphabet' ? 'text-primary font-medium' : 'text-foreground'
                        }`}
                      >
                        РџРѕ Р°Р»С„Р°РІРёС‚Сѓ
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* РЎРїРёСЃРѕРє РґРѕСЃС‚РёР¶РµРЅРёР№ РЅР° РјРѕРґРµСЂР°С†РёРё */}
              <div className="space-y-3">
                {sortedModerationItems.length > 0 ? (
                  sortedModerationItems.map((item) => (
                    <div key={item.id} className="glass-card rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground mb-1">
                            {item.achievementTitle}
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {item.employee}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            РџСЂРѕРіСЂРµСЃСЃ: {item.progress}% вЂў {item.dateSubmitted}
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-orange-500/20 text-orange-600 rounded-full">
                          {item.status}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveAchievement(item)}
                          className="flex-1 py-2 px-3 bg-green-500/20 text-green-600 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                        >
                          РћРґРѕР±СЂРёС‚СЊ
                        </button>
                        <button
                          onClick={() => handleRejectAchievement(item)}
                          className="flex-1 py-2 px-3 bg-red-500/20 text-red-600 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                        >
                          РћС‚РєР»РѕРЅРёС‚СЊ
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground text-sm">
                      РќРµС‚ РґРѕСЃС‚РёР¶РµРЅРёР№ РЅР° РїСЂРѕРІРµСЂРєРµ
                    </div>
                  </div>
                )}
              </div>

              {/* РљРЅРѕРїРєР° Р·Р°РєСЂС‹С‚РёСЏ */}
              <div className="pt-6 mt-6 border-t border-border/20">
                <button
                  onClick={() => {
                    setModerationModalOpen(false);
                    setShowModerationSort(false);
                  }}
                  className="w-full py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                >
                  Р—Р°РєСЂС‹С‚СЊ
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕС‚РєР»РѕРЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ */}
        <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РћС‚РєР»РѕРЅРµРЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ СѓРєР°Р·Р°РЅРёСЏ РїСЂРёС‡РёРЅС‹ РѕС‚РєР»РѕРЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ РґРѕР±Р°РІР»РµРЅРёСЏ РєРѕРјРјРµРЅС‚Р°СЂРёСЏ Рё С„Р°Р№Р»Р°
            </DialogDescription>
            <div className="p-6 pt-2">
              <div className="space-y-4">
                {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ РґРѕСЃС‚РёР¶РµРЅРёРё */}
                {selectedModerationItem && (
                  <div className="glass-card rounded-xl p-3 mb-4">
                    <div className="text-sm font-medium text-foreground mb-1">
                      {selectedModerationItem.achievementTitle}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {selectedModerationItem.employee}
                    </div>
                  </div>
                )}

                {/* РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ *
                  </label>
                  <Textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="РЈРєР°Р¶РёС‚Рµ РїСЂРёС‡РёРЅСѓ РѕС‚РєР»РѕРЅРµРЅРёСЏ..."
                    className="bg-transparent border border-border rounded-lg text-sm min-h-[80px]"
                  />
                </div>

                {/* пїЅпїЅРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Р№ РєРѕРјРјРµРЅС‚Р°СЂРёР№ */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Р№ РєРѕРјРјРµРЅС‚Р°СЂРёР№
                  </label>
                  <Textarea
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                    placeholder="Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїРѕСЏСЃРЅРµРЅРёСЏ (РѕРїС†РёРѕРЅР°Р»СЊРЅРѕ)"
                    className="bg-transparent border border-border rounded-lg text-sm min-h-[60px]"
                  />
                </div>

                {/* РџСЂРёРєСЂРµРїР»РµРЅРёРµ С„Р°Р№Р»Р° */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    РџСЂРёРєСЂРµРїРёС‚СЊ С„Р°Р№Р»
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 border border-border rounded-lg bg-input-background text-muted-foreground text-sm">
                      {rejectFile ? rejectFile.name : 'Р¤Р°Р№Р» РЅРµ РІС‹Р±СЂР°РЅ'}
                    </div>
                    <input
                      type="file"
                      id="reject-file-upload"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="reject-file-upload"
                      className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4" />
                    </label>
                  </div>
                </div>

                {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setRejectModalOpen(false);
                      setRejectReason('');
                      setRejectComment('');
                      setRejectFile(null);
                      setSelectedModerationItem(null);
                    }}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    onClick={handleSubmitReject}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-full text-sm font-medium transition-colors hover:bg-red-600"
                  >
                    РћС‚РєР»РѕРЅРёС‚СЊ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
