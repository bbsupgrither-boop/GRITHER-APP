п»їimport { useState } from 'react';
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

  // Р СњР В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘Р С•Р Р…Р Р…РЎвЂ№Р Вµ РЎРЊР В»Р ВµР СР ВµР Р…РЎвЂљРЎвЂ№ Р С—Р В°Р Р…Р ВµР В»Р С‘ Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р В°
  const navigationItems = [
    { icon: Home, label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ', section: 'dashboard' },
    { icon: Users, label: 'Р вЂ™Р С•РЎР‚Р С”Р ВµРЎР‚РЎвЂ№', section: 'workers' },
    { icon: Zap, label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№', section: 'battles' },
    { icon: Trophy, label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘', section: 'tasks' },
    { icon: ShoppingBag, label: 'Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№', section: 'shop' },
    { icon: Gamepad2, label: 'Р ВР С–РЎР‚РЎвЂ№', section: 'games' },
    { icon: Box, label: 'Р С™Р ВµР в„–РЎРѓРЎвЂ№', section: 'cases' }
  ];

  // Placeholder Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
  const placeholderAchievements = achievements.length > 0 ? achievements : [
    { 
      id: '1', 
      title: 'Р СџР ВµРЎР‚Р Р†РЎвЂ№Р Вµ РЎв‚¬Р В°Р С–Р С‘', 
      description: 'Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ Р С—Р ВµРЎР‚Р Р†РЎС“РЎР‹ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“ Р Р† РЎРѓР С‘РЎРѓРЎвЂљР ВµР СР Вµ',
      type: 'bronze',
      points: 100,
      unlocked: false,
      progress: 0.75
    },
    { 
      id: '2', 
      title: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р Р…РЎвЂ№Р в„– Р С‘Р С–РЎР‚Р С•Р С”', 
      description: 'Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ 5 Р В·Р В°Р Т‘Р В°РЎвЂЎ Р Р† Р С”Р С•Р СР В°Р Р…Р Т‘Р Вµ',
      type: 'silver',
      points: 200,
      unlocked: false,
      progress: 0.4
    },
    { 
      id: '3', 
      title: 'Р В­Р С”РЎРѓР С—Р ВµРЎР‚РЎвЂљ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†', 
      description: 'Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р в„–РЎвЂљР Вµ 10 Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р† Р С—Р С•Р Т‘РЎР‚РЎРЏР Т‘',
      type: 'gold',
      points: 300,
      unlocked: false,
      progress: 0.2
    },
    { 
      id: '4', 
      title: 'Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В° GRITHER', 
      description: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р С–Р Р…Р С‘РЎвЂљР Вµ Р СР В°Р С”РЎРѓР С‘Р СР В°Р В»РЎРЉР Р…Р С•Р С–Р С• РЎС“РЎР‚Р С•Р Р†Р Р…РЎРЏ',
      type: 'platinum',
      points: 500,
      unlocked: false,
      progress: 0.05
    }
  ];

  // Placeholder Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘
  const moderationItems = [
    {
      id: '1',
      achievementTitle: 'Р СџР ВµРЎР‚Р Р†РЎвЂ№Р Вµ РЎв‚¬Р В°Р С–Р С‘',
      status: 'Р Р…Р В° Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р Вµ',
      employee: 'Р С’Р В»Р ВµР С”РЎРѓР ВµР в„– Р ВР Р†Р В°Р Р…Р С•Р Р†, Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р С’',
      progress: 100.0,
      dateSubmitted: '2024-01-15'
    },
    {
      id: '2', 
      achievementTitle: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р Р…РЎвЂ№Р в„– Р С‘Р С–РЎР‚Р С•Р С”',
      status: 'Р Р…Р В° Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р Вµ',
      employee: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†Р В°, Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р вЂ',
      progress: 100.0,
      dateSubmitted: '2024-01-14'
    },
    {
      id: '3',
      achievementTitle: 'Р В­Р С”РЎРѓР С—Р ВµРЎР‚РЎвЂљ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†', 
      status: 'Р Р…Р В° Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р Вµ',
      employee: 'Р вЂќР СР С‘РЎвЂљРЎР‚Р С‘Р в„– Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†, Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р вЂ™',
      progress: 100.0,
      dateSubmitted: '2024-01-13'
    }
  ];

  const handleCreate = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: formData.title || 'Р СњР С•Р Р†Р С•Р Вµ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р Вµ',
      description: formData.description,
      type: 'bronze',
      points: formData.rewardAmount,
      unlocked: false
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
      subtasks: ['Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°'],
      image: null,
      rewardType: 'XP',
      rewardAmount: achievement.points
    });
    setDetailModalOpen(true);
  };

  const handleModerationClick = () => {
    setModerationModalOpen(true);
  };

  const handleApproveAchievement = (item: any) => {
    // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ
    console.log('Approved:', item);
  };

  const handleRejectAchievement = (item: any) => {
    setSelectedModerationItem(item);
    setRejectModalOpen(true);
  };

  const handleSubmitReject = () => {
    if (!rejectReason.trim()) {
      alert('Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎС“ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ');
      return;
    }
    // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ
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
              points: formData.rewardAmount
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
          ? { ...achievement, points: newAmount }
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
          {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground">Р СџР В°Р Р…Р ВµР В»РЎРЉ РЎС“Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ</h2>
          </div>

          {/* Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
              >
                Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ
              </button>
              <button 
                onClick={handleModerationClick}
                className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
              >
                Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р В°
              </button>
            </div>
          </div>

          {/* Card РЎРѓ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏР СР С‘ */}
          <div className="px-6">
            <div className="glass-card rounded-2xl apple-shadow p-4">
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-lg font-medium text-foreground text-center">Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№Р Вµ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</h2>
              </div>

              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„– */}
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
                        {(achievement.progress * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
                {placeholderAchievements.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ Р Р…Р Вµ Р Р…Р В°Р в„–Р Т‘Р ВµР Р…РЎвЂ№
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р Р…Р В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘РЎРЏ */}
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

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р Р€РЎРѓР В»Р С•Р Р†Р С‘РЎРЏ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р С–Р С• Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ РЎРѓ РЎС“Р С”Р В°Р В·Р В°Р Р…Р С‘Р ВµР С Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘РЎРЏ, Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘РЎРЏ, Р С—Р С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎ Р С‘ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№
            </DialogDescription>
            <div className="p-6 pt-2">
              <div className="space-y-6">
                {/* Р СџР С•Р В»Р Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ */}
                <div className="text-center">
                  <Input
                    placeholder="Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-transparent border border-border rounded-lg text-center font-medium"
                  />
                </div>

                {/* Р ВР В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ Р С‘ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex gap-4">
                    {/* Р С›Р В±Р В»Р В°РЎРѓРЎвЂљРЎРЉ Р Т‘Р В»РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ */}
                    <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-foreground/70" />
                    </div>

                    {/* Р СџР С•Р В»Р Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘РЎРЏ */}
                    <div className="flex-1">
                      <Textarea
                        placeholder="Р С™РЎР‚Р В°РЎвЂљР С”Р С•Р Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р С–Р С•, РЎвЂЎРЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• РЎРѓР Т‘Р ВµР В»Р В°РЎвЂљРЎРЉ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ РЎРЊРЎвЂљР С•Р С–Р С• Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-transparent border-none resize-none min-h-16 text-sm focus:outline-none p-0"
                      />
                      
                      {/* Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
                      <div className="mt-4 space-y-2">
                        {formData.subtasks.map((subtask, index) => (
                          <div key={index} className="flex items-center gap-2 pl-2 border-l-2 border-muted">
                            <Input
                              placeholder="Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°"
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
                        
                        {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р С—Р С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
                        <button
                          onClick={addSubtask}
                          className="flex items-center gap-2 pl-2 py-1 text-sm text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р С—Р С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“</span>
                        </button>
                      </div>
                    </div>

                    {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С”Р С‘ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ */}
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

                {/* Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° */}
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">
                    Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: {formData.rewardAmount} {formData.rewardType}
                  </div>
                </div>

                {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘Р в„– */}
                <div className="flex gap-3 pt-4 mt-6">
                  <button
                    onClick={() => {
                      setCreateModalOpen(false);
                      resetForm();
                    }}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={() => {
                      handleCreate();
                      resetForm();
                    }}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„– Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ */}
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р Р€РЎРѓР В»Р С•Р Р†Р С‘РЎРЏ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎРѓ Р С—Р С•Р Т‘РЎР‚Р С•Р В±Р Р…Р С•Р в„– Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘Р ВµР в„– Р С• Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р С‘ Р С‘ Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉРЎР‹ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ
            </DialogDescription>
            <div className="p-6 pt-2">
              {selectedAchievement && (
                <div className="space-y-6">
                  {/* Р СџР С•Р В»Р Вµ Р В·Р В°Р С–Р С•Р В»Р С•Р Р†Р С”Р В° */}
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

                  {/* Р ВР В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ Р С‘ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
                  <div className="glass-card rounded-2xl p-4">
                    <div className="flex gap-4">
                      {/* Р С›Р В±Р В»Р В°РЎРѓРЎвЂљРЎРЉ Р Т‘Р В»РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ */}
                      <div className="relative w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-foreground/70" />
                        {/* Р С™Р Р…Р С•Р С—Р С”Р В° РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ */}
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

                      {/* Р СџР С•Р В»Р Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘РЎРЏ */}
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
                        
                        {/* Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В° */}
                        <div className="mt-4 pl-2 border-l-2 border-muted">
                          <div className="text-sm text-muted-foreground">Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°</div>
                        </div>
                      </div>

                      {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ РЎРѓР С—РЎР‚Р В°Р Р†Р В° */}
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

                  {/* Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° - Р С”Р В»Р С‘Р С”Р В°Р В±Р ВµР В»РЎРЉР Р…Р В°РЎРЏ */}
                  <div className="text-center">
                    <button
                      onClick={handleRewardClick}
                      className="text-sm font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 py-1 transition-colors"
                    >
                      Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: {formData.rewardAmount} {formData.rewardType}
                    </button>
                  </div>

                  {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘Р в„– */}
                  <div className="flex gap-3 pt-4 mt-6">
                    <button
                      onClick={() => {
                        setDetailModalOpen(false);
                        resetForm();
                      }}
                      className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
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
                      Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„– */}
        <Dialog open={moderationModalOpen} onOpenChange={setModerationModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р СљР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘ Р С‘ Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–, Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏР СР С‘ Р Р…Р В° Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”РЎС“
            </DialogDescription>
            <div className="p-6">
              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„– Р Р…Р В° Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘ */}
              <div className="space-y-3">
                {sortedModerationItems.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-4 apple-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-foreground/70" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{item.achievementTitle}</div>
                          <div className="text-xs text-muted-foreground">{item.employee}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-medium">{item.progress}%</div>
                        <div className="text-xs text-muted-foreground">{item.dateSubmitted}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveAchievement(item)}
                        className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Р С›Р Т‘Р С•Р В±РЎР‚Р С‘РЎвЂљРЎРЉ
                      </button>
                      <button
                        onClick={() => handleRejectAchievement(item)}
                        className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
                      </button>
                    </div>
                  </div>
                ))}
                
                {sortedModerationItems.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Р СњР ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„– Р Р…Р В° Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ */}
        <Dialog open={rewardModalOpen} onOpenChange={setRewardModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р В° Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ РЎвЂљР С‘Р С—Р В° Р С‘ РЎР‚Р В°Р В·Р СР ВµРЎР‚Р В° Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р В·Р В° Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р Вµ
            </DialogDescription>
            <div className="p-6 pt-2">
              <div className="space-y-6">
                {/* Р СћР С‘Р С— Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground text-center">
                    Р СћР С‘Р С— Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRewardType('XP')}
                      className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${ 
                        rewardType === 'XP' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'glass-card text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      XP
                    </button>
                    <button
                      onClick={() => setRewardType('G-coin')}
                      className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${
                        rewardType === 'G-coin'
                          ? 'bg-primary text-primary-foreground'
                          : 'glass-card text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      G-coin
                    </button>
                  </div>
                </div>

                {/* Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С• */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground text-center">
                    Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С•
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    {isEditingAmount ? (
                      <Input
                        type="number"
                        value={rewardAmount}
                        onChange={(e) => setRewardAmount(e.target.value)}
                        onBlur={() => setIsEditingAmount(false)}
                        className="bg-transparent border-none text-center text-lg font-medium p-0 focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => setIsEditingAmount(true)}
                        className="w-full text-lg font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded p-2 transition-colors"
                      >
                        {rewardAmount}
                      </button>
                    )}
                  </div>
                </div>

                {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setRewardModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={handleRewardSave}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ */}
        <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р Вµ</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ РЎРѓ РЎС“Р С”Р В°Р В·Р В°Р Р…Р С‘Р ВµР С Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎвЂ№ Р С‘ Р С”Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘РЎРЏ
            </DialogDescription>
            <div className="p-6 pt-2">
              <div className="space-y-6">
                {/* Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">
                    Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ *
                  </div>
                  <Input
                    placeholder="Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎС“ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="bg-transparent border border-border rounded-lg"
                  />
                </div>

                {/* Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">
                    Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– (Р Р…Р ВµР С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…Р С•)
                  </div>
                  <Textarea
                    placeholder="Р вЂќР С•Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ Р С”Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р С‘..."
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                    className="bg-transparent border border-border rounded-lg resize-none min-h-20"
                  />
                </div>

                {/* Р В¤Р В°Р в„–Р В» */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">
                    Р СџРЎР‚Р С‘Р С”РЎР‚Р ВµР С—Р С‘РЎвЂљРЎРЉ РЎвЂћР В°Р в„–Р В» (Р Р…Р ВµР С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…Р С•)
                  </div>
                  <div className="glass-card rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="reject-file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="reject-file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Paperclip className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {rejectFile ? rejectFile.name : 'Р вЂ™РЎвЂ№Р В±РЎР‚Р В°РЎвЂљРЎРЉ РЎвЂћР В°Р в„–Р В»'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setRejectModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={handleSubmitReject}
                    className="flex-1 py-3 px-4 bg-destructive text-destructive-foreground rounded-full text-sm font-medium transition-colors hover:bg-destructive/90"
                  >
                    Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
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
