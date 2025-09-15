п»їimport { useState } from 'react';
import { ArrowLeft, Plus, ChevronDown, Edit, Trash2, X, Upload, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Gamepad2, Box, RotateCcw, User } from './Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

interface Worker {
  id: string;
  name: string;
  team: string;
  role: string;
  level: number;
  telegramId?: string;
  avatar?: string;
  dateOfBirth?: string;
  position?: string;
  experience?: string;
  teamLead?: string;
  registrationDate?: string;
  isActive: boolean;
  fireReason?: string;
  fireDate?: string;
  fireComment?: string;
}

interface WorkersManagementProps {
  onBack: () => void;
  onNavigateToSection: (section: string) => void;
}

// Mock РЎвЂћРЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р С‘ Р С‘Р В· Telegram
const getTelegramUserAvatar = async (telegramId: string): Promise<string | null> => {
  // Р вЂ™ РЎР‚Р ВµР В°Р В»РЎРЉР Р…Р С•Р С Р С—РЎР‚Р С‘Р В»Р С•Р В¶Р ВµР Р…Р С‘Р С‘ Р В·Р Т‘Р ВµРЎРѓРЎРЉ Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р В·Р В°Р С—РЎР‚Р С•РЎРѓ Р С” Telegram Bot API
  // Р вЂќР В»РЎРЏ Р Т‘Р ВµР СР С•Р Р…РЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘Р С‘ Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“Р ВµР С Р Т‘Р ВµРЎвЂљР ВµРЎР‚Р СР С‘Р Р…Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В· Unsplash
  try {
    // Р РЋР С‘Р СРЎС“Р В»Р С‘РЎР‚РЎС“Р ВµР С Р В·Р В°Р Т‘Р ВµРЎР‚Р В¶Р С”РЎС“ API
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Р СњР В°Р В±Р С•РЎР‚ Р С–Р С•РЎвЂљР С•Р Р†РЎвЂ№РЎвЂ¦ Р С—РЎР‚Р С•РЎвЂћР ВµРЎРѓРЎРѓР С‘Р С•Р Р…Р В°Р В»РЎРЉР Р…РЎвЂ№РЎвЂ¦ Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р С•Р С”
    const avatars = [
      'https://images.unsplash.com/photo-1629507208649-70919ca33793?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=face'
    ];
    
    // Р вЂќР ВµРЎвЂљР ВµРЎР‚Р СР С‘Р Р…Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р Р…РЎвЂ№Р в„– Р Р†РЎвЂ№Р В±Р С•РЎР‚ Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р В° Р Р…Р В° Р С•РЎРѓР Р…Р С•Р Р†Р Вµ Telegram ID
    const avatarIndex = parseInt(telegramId.slice(-3)) % avatars.length;
    const selectedAvatar = avatars[avatarIndex];
    
    console.log(`СЂСџвЂќРЊ Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…Р В° Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р В° Р Т‘Р В»РЎРЏ Telegram ID @${telegramId}:`, selectedAvatar);
    
    return selectedAvatar;
  } catch (error) {
    console.error('Р С›РЎв‚¬Р С‘Р В±Р С”Р В° Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р С‘:', error);
    return null;
  }
};

export function WorkersManagement({ onBack, onNavigateToSection }: WorkersManagementProps) {
  const [selectedTeam, setSelectedTeam] = useState('Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showEditWorker, setShowEditWorker] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showFiredWorkers, setShowFiredWorkers] = useState(false);
  const [showFiredWorkerDetails, setShowFiredWorkerDetails] = useState(false);
  const [firedSortBy, setFiredSortBy] = useState<'date' | 'team' | 'name'>('date');
  const [showFiredSortDropdown, setShowFiredSortDropdown] = useState(false);

  // Р СџРЎС“РЎРѓРЎвЂљРЎвЂ№Р Вµ Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† - Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚РЎвЂ№ Р Т‘Р С•Р В±Р В°Р Р†РЎРЏРЎвЂљ Р С‘РЎвЂ¦ РЎРѓР В°Р СР С•РЎРѓРЎвЂљР С•РЎРЏРЎвЂљР ВµР В»РЎРЉР Р…Р С•
  const [workers, setWorkers] = useState<Worker[]>([]);

  const teams = ['Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№', 'Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Р РЋР В°Р С—Р С—Р С•РЎР‚РЎвЂљ', 'Р В РЎС“Р С”Р С•Р Р†Р С•Р Т‘РЎРѓРЎвЂљР Р†Р С•'];
  
  const roles = ['GRITHER', 'GLEB', 'SUPPORT', 'TEAMLEAD', 'WORKER'];
  
  const teamLeads: string[] = [];
  
  const supports: string[] = [];

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р Р…Р С•Р СР ВµРЎР‚Р В° Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ Р Т‘Р В»РЎРЏ РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С‘
  const getTeamNumber = (team: string) => {
    if (team.startsWith('Team ')) {
      return parseInt(team.split(' ')[1]) || 999;
    }
    return 999; // Р вЂќР В»РЎРЏ Р С”Р С•Р СР В°Р Р…Р Т‘ РЎвЂљР С‘Р С—Р В° "Р РЋР В°Р С—Р С—Р С•РЎР‚РЎвЂљ", "Р В РЎС“Р С”Р С•Р Р†Р С•Р Т‘РЎРѓРЎвЂљР Р†Р С•" Р С‘ Р Т‘РЎР‚.
  };

  // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚Р В°РЎвЂ Р С‘РЎРЏ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р†
  const activeWorkers = workers
    .filter(worker => {
      if (!worker.isActive) return false;
      if (selectedTeam === 'Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№') return true;
      return worker.team === selectedTeam;
    })
    .sort((a, b) => {
      // Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В° Р С—Р С• Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р С: Team 1, Team 2, Team 3, Р С‘ РЎвЂљ.Р Т‘.
      const teamA = getTeamNumber(a.team);
      const teamB = getTeamNumber(b.team);
      return teamA - teamB;
    });

  // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚Р В°РЎвЂ Р С‘РЎРЏ РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† РЎРѓ РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С•Р в„–
  const firedWorkers = workers
    .filter(worker => !worker.isActive)
    .sort((a, b) => {
      switch (firedSortBy) {
        case 'date':
          if (a.fireDate && b.fireDate) {
            return new Date(b.fireDate).getTime() - new Date(a.fireDate).getTime();
          }
          return 0;
        case 'team':
          return a.team.localeCompare(b.team);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleEditWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    if (worker.isActive) {
      setShowEditWorker(true);
    } else {
      setShowFiredWorkerDetails(true);
    }
  };

  const handleRestoreWorker = (worker: Worker) => {
    setWorkers(prev => prev.map(w => 
      w.id === worker.id 
        ? { ...w, isActive: true, fireReason: undefined, fireDate: undefined, fireComment: undefined }
        : w
    ));
    setShowFiredWorkerDetails(false);
    setSelectedWorker(null);
  };

  const navigationItems = [
    { icon: Home, label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ', section: 'dashboard' },
    { icon: Users, label: 'Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С‘', section: 'workers' },
    { icon: Zap, label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№', section: 'battles' },
    { icon: Trophy, label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘', section: 'tasks' },
    { icon: ShoppingBag, label: 'Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№', section: 'shop' },
    { icon: Gamepad2, label: 'Р ВР С–РЎР‚РЎвЂ№', section: 'games' },
    { icon: Box, label: 'Р С™Р ВµР в„–РЎРѓРЎвЂ№', section: 'cases' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ РЎвЂ№ */}
      <div className="p-6 text-center">
        <h1 className="text-lg font-medium text-foreground">Р СџР В°Р Р…Р ВµР В»РЎРЉ РЎС“Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ</h1>
      </div>

      {/* Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAddWorker(true)}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
          >
            Р вЂќР С•Р В±. РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°
          </button>
          <button
            onClick={() => setShowFiredWorkers(true)}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
          >
            Р Р€Р Р†Р С•Р В»Р ВµР Р…РЎвЂ№
          </button>
        </div>
      </div>

      {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ */}
      <div className="p-6 space-y-6 pb-60">
        {/* Р РЋР ВµР С”РЎвЂ Р С‘РЎРЏ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
        <div className="glass-card rounded-2xl apple-shadow p-4">
          {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”Р Р…Р С•Р С—Р С”Р С•Р в„– РЎвЂћР С‘Р В»РЎРЉРЎвЂљРЎР‚Р В° */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground text-center flex-1">Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С‘</h2>
            <div className="relative">
              <button
                onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                title="Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚ Р С—Р С• Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р С"
              >
                <span>РІвЂ№В®</span>
              </button>
              {showTeamDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                  {teams.map((team) => (
                    <button
                      key={team}
                      onClick={() => {
                        setSelectedTeam(team);
                        setShowTeamDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        selectedTeam === team ? 'bg-primary text-primary-foreground' : 'hover:bg-black/5 text-foreground'
                      }`}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
          <div className="space-y-3">
            {activeWorkers.map((worker) => (
              <div key={worker.id} className="flex items-center justify-between p-3 border border-border/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                    {worker.avatar ? (
                      <img 
                        src={worker.avatar} 
                        alt={`Р С’Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р В° ${worker.name}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.style.display = 'block';
                        }}
                      />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                    {worker.avatar && (
                      <User className="w-5 h-5 text-muted-foreground" style={{ display: 'none' }} />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{worker.name}, {worker.team}</div>
                    <div className="text-xs text-muted-foreground">
                      {worker.role} {worker.telegramId && `РІР‚Сћ @${worker.telegramId}`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleEditWorker(worker)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-primary" />
                </button>
              </div>
            ))}
            {activeWorkers.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С‘ Р Р…Р Вµ Р Р…Р В°Р в„–Р Т‘Р ВµР Р…РЎвЂ№
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
      <Dialog open={showFiredWorkers} onOpenChange={setShowFiredWorkers}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">Р РЋР С—Р С‘РЎРѓР С•Р С” РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦</DialogTitle>
          <DialogDescription className="sr-only">
            Р РЋР С—Р С‘РЎРѓР С•Р С” РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† РЎРѓ Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉРЎР‹ Р Р†Р С•РЎРѓРЎРѓРЎвЂљР В°Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ
          </DialogDescription>
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <button
                    onClick={() => setShowFiredSortDropdown(!showFiredSortDropdown)}
                    className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    title="Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В°"
                  >
                    <span>РІвЂ№В®</span>
                  </button>
                  {showFiredSortDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                      {[
                        { key: 'date', label: 'Р СџР С• Р Т‘Р В°РЎвЂљР Вµ РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ' },
                        { key: 'team', label: 'Р СџР С• Р С”Р С•Р СР В°Р Р…Р Т‘Р Вµ' },
                        { key: 'name', label: 'Р СџР С• Р С‘Р СР ВµР Р…Р С‘' }
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => {
                            setFiredSortBy(option.key as 'date' | 'team' | 'name');
                            setShowFiredSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            firedSortBy === option.key ? 'bg-primary text-primary-foreground' : 'hover:bg-black/5 text-foreground'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1"></div>
                <button
                  onClick={() => setShowFiredWorkers(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>
            </DialogHeader>

            {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-3">
              {firedWorkers.map((worker) => (
                <div 
                  key={worker.id} 
                  className="flex items-center justify-between p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => handleEditWorker(worker)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm">СЂСџвЂВ¤</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{worker.name}, {worker.team}</div>
                      <div className="text-xs text-muted-foreground">
                        Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ: РЎС“Р Р†Р С•Р В»Р ВµР Р…
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestoreWorker(worker);
                    }}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    title="Р вЂ™Р С•РЎРѓРЎРѓРЎвЂљР В°Р Р…Р С•Р Р†Р С‘РЎвЂљРЎРЉ"
                  >
                    <RotateCcw className="w-4 h-4 text-primary" />
                  </button>
                </div>
              ))}
              {firedWorkers.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Р Р€Р Р†Р С•Р В»Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р Р…Р ВµРЎвЂљ
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р Р†Р С•РЎР‚Р С”Р ВµРЎР‚Р В° */}
      {showAddWorker && (
        <WorkerModal
          isEdit={false}
          worker={null}
          onClose={() => setShowAddWorker(false)}
          onSave={(workerData) => {
            // Р вЂєР С•Р С–Р С‘Р С”Р В° Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р С–Р С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°
            const newWorker: Worker = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: workerData.name || '',
              telegramId: workerData.telegramId,
              avatar: workerData.avatar,
              team: workerData.team || '',
              role: workerData.role || 'WORKER',
              level: workerData.level || 1,
              dateOfBirth: workerData.dateOfBirth,
              position: workerData.position,
              experience: workerData.experience,
              teamLead: workerData.teamLead,
              registrationDate: workerData.registrationDate || new Date().toISOString().split('T')[0],
              isActive: true
            };
            
            setWorkers(prev => [...prev, newWorker]);
            setShowAddWorker(false);
            console.log('Р вЂќР С•Р В±Р В°Р Р†Р В»Р ВµР Р… Р Р…Р С•Р Р†РЎвЂ№Р в„– РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”:', newWorker);
          }}
          teamLeads={teamLeads}
          supports={supports}
          roles={roles}
          teams={teams.slice(1)} // Р Р€Р В±Р С‘РЎР‚Р В°Р ВµР С "Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№"
        />
      )}

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ Р Р†Р С•РЎР‚Р С”Р ВµРЎР‚Р В° */}
      {showEditWorker && selectedWorker && (
        <WorkerModal
          isEdit={true}
          worker={selectedWorker}
          onClose={() => {
            setShowEditWorker(false);
            setSelectedWorker(null);
          }}
          onSave={(workerData) => {
            // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С•Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°
            if (selectedWorker) {
              setWorkers(prev => prev.map(worker => 
                worker.id === selectedWorker.id 
                  ? { 
                      ...worker,
                      name: workerData.name || worker.name,
                      telegramId: workerData.telegramId || worker.telegramId,
                      avatar: workerData.avatar || worker.avatar,
                      team: workerData.team || worker.team,
                      role: workerData.role || worker.role,
                      level: workerData.level || worker.level,
                      dateOfBirth: workerData.dateOfBirth || worker.dateOfBirth,
                      position: workerData.position || worker.position,
                      experience: workerData.experience || worker.experience,
                      teamLead: workerData.teamLead || worker.teamLead,
                      registrationDate: workerData.registrationDate || worker.registrationDate
                    }
                  : worker
              ));
              console.log('Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р… РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”:', selectedWorker.id, workerData);
            }
            setShowEditWorker(false);
            setSelectedWorker(null);
          }}
          onFire={(reason, comment, file) => {
            // Р вЂєР С•Р С–Р С‘Р С”Р В° РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°
            if (selectedWorker) {
              setWorkers(prev => prev.map(worker => 
                worker.id === selectedWorker.id 
                  ? { 
                      ...worker,
                      isActive: false,
                      fireReason: reason,
                      fireDate: new Date().toISOString().split('T')[0],
                      fireComment: comment
                    }
                  : worker
              ));
              console.log('Р Р€Р Р†Р С•Р В»Р ВµР Р… РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”:', selectedWorker.id, reason, comment);
            }
            setShowEditWorker(false);
            setSelectedWorker(null);
          }}
          teamLeads={teamLeads}
          supports={supports}
          roles={roles}
          teams={teams.slice(1)}
        />
      )}

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р В°Р Р…Р С”Р ВµРЎвЂљРЎвЂ№ РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…Р С•Р С–Р С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В° */}
      <Dialog open={showFiredWorkerDetails && selectedWorker && !selectedWorker.isActive} onOpenChange={(open) => {
        if (!open) {
          setShowFiredWorkerDetails(false);
          setSelectedWorker(null);
        }
      }}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">Р С’Р Р…Р С”Р ВµРЎвЂљР В°</DialogTitle>
          <DialogDescription className="sr-only">
            Р СџР С•Р Т‘РЎР‚Р С•Р В±Р Р…Р В°РЎРЏ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С•Р В± РЎС“Р Р†Р С•Р В»Р ВµР Р…Р Р…Р С•Р С РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р Вµ РЎРѓ Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉРЎР‹ Р Р†Р С•РЎРѓРЎРѓРЎвЂљР В°Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ
          </DialogDescription>
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1"></div>
                <button
                  onClick={() => {
                    setShowFiredWorkerDetails(false);
                    setSelectedWorker(null);
                  }}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              </div>
            </DialogHeader>

            {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-4">
              {selectedWorker && (
                <>
                  {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р Вµ */}
                  <div className="bg-secondary p-4 rounded-2xl apple-shadow space-y-2">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        {selectedWorker.avatar ? (
                          <img 
                            src={selectedWorker.avatar} 
                            alt={`Р С’Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р В° ${selectedWorker.name}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling!.style.display = 'block';
                            }}
                          />
                        ) : (
                          <User className="w-8 h-8 text-muted-foreground" />
                        )}
                        {selectedWorker.avatar && (
                          <User className="w-8 h-8 text-muted-foreground" style={{ display: 'none' }} />
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-foreground">{selectedWorker.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedWorker.team}</p>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Id:</span>
                        <span className="text-foreground">{selectedWorker.id}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р ВР СРЎРЏ:</span>
                        <span className="text-foreground">{selectedWorker.name}</span>
                      </div>
                      {selectedWorker.telegramId && (
                        <div className="flex justify-between border-b border-border/50 pb-1">
                          <span className="text-muted-foreground">Telegram:</span>
                          <span className="text-foreground">@{selectedWorker.telegramId}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р вЂќР В :</span>
                        <span className="text-foreground">{selectedWorker.dateOfBirth || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р вЂќР С•Р В»Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉ:</span>
                        <span className="text-foreground">{selectedWorker.position || selectedWorker.role}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р С™Р С•Р СР В°Р Р…Р Т‘Р В°:</span>
                        <span className="text-foreground">{selectedWorker.team}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р РЋРЎвЂљР В°Р В¶:</span>
                        <span className="text-foreground">{selectedWorker.experience || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р СћР С‘Р СР В»Р С‘Р Т‘:</span>
                        <span className="text-foreground">{selectedWorker.teamLead || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Р В Р ВµР С–Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘РЎРЏ:</span>
                        <span className="text-foreground">{selectedWorker.registrationDate || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Р вЂќР С•Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР ВµР В»РЎРЉР Р…Р В°РЎРЏ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ */}
                  <div className="bg-secondary p-4 rounded-2xl apple-shadow">
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-muted-foreground">Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ:</span>
                        <p className="text-foreground mt-1">{selectedWorker.fireReason || 'Р СњР Вµ РЎС“Р С”Р В°Р В·Р В°Р Р…Р В°'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Р вЂќР В°РЎвЂљР В° РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ:</span>
                        <p className="text-destructive mt-1">{selectedWorker.fireDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„–:</span>
                        <p className="text-foreground mt-1">{selectedWorker.fireComment || 'Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– Р С•РЎвЂљРЎРѓРЎС“РЎвЂљРЎРѓРЎвЂљР Р†РЎС“Р ВµРЎвЂљ'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ */}
            <div className="flex gap-3 pt-4 border-t border-border/20 mt-4">
              <Button
                onClick={() => selectedWorker && handleRestoreWorker(selectedWorker)}
                className="flex-1 bg-primary text-primary-foreground text-sm px-4 py-2"
              >
                Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowFiredWorkerDetails(false);
                  setSelectedWorker(null);
                }}
                className="flex-1 text-sm px-4 py-2"
              >
                Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р Р…Р В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘РЎРЏ */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/20">
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {navigationItems.slice(0, 4).map((item, index) => {
              const Icon = item.icon;
              const isActive = item.section === 'workers';
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={() => item.section === 'dashboard' ? onBack() : onNavigateToSection(item.section)}
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
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={() => onNavigateToSection(item.section)}
                >
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center mb-2 apple-shadow">
                    <Icon className="w-6 h-6 text-foreground/70" />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface WorkerModalProps {
  isEdit: boolean;
  worker: Worker | null;
  onClose: () => void;
  onSave: (workerData: Partial<Worker>) => void;
  onFire?: (reason: string, comment: string, file?: File) => void;
  teamLeads: string[];
  supports: string[];
  roles: string[];
  teams: string[];
}

function WorkerModal({ isEdit, worker, onClose, onSave, onFire, teamLeads, supports, roles, teams }: WorkerModalProps) {
  const [formData, setFormData] = useState({
    id: worker?.id || '',
    name: worker?.name || '',
    telegramId: worker?.telegramId || '',
    avatar: worker?.avatar || '',
    dateOfBirth: worker?.dateOfBirth || '',
    position: worker?.position || '',
    team: worker?.team || '',
    experience: worker?.experience || '',
    teamLead: worker?.teamLead || '',
    registrationDate: worker?.registrationDate || '',
    role: worker?.role || 'WORKER',
    level: worker?.level || 1
  });

  const [comment, setComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFireConfirm, setShowFireConfirm] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTelegramIdChange = async (telegramId: string) => {
    setFormData(prev => ({ ...prev, telegramId }));
    
    // Р вЂўРЎРѓР В»Р С‘ Р Р†Р Р†Р ВµР Т‘Р ВµР Р… Telegram ID, Р С—РЎвЂ№РЎвЂљР В°Р ВµР СРЎРѓРЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘РЎвЂљРЎРЉ Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р С”РЎС“
    if (telegramId.trim() && telegramId.length >= 5) {
      setIsLoadingAvatar(true);
      try {
        const avatar = await getTelegramUserAvatar(telegramId);
        if (avatar) {
          setFormData(prev => ({ ...prev, avatar }));
        }
      } catch (error) {
        console.error('Р С›РЎв‚¬Р С‘Р В±Р С”Р В° Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р В°Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р С‘:', error);
      } finally {
        setIsLoadingAvatar(false);
      }
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleFire = () => {
    if (!comment.trim()) {
      alert('Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– Р С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»Р ВµР Р… Р Т‘Р В»РЎРЏ РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ');
      return;
    }
    onFire?.(comment, comment, selectedFile || undefined);
    setShowFireConfirm(false);
  };

  if (showFireConfirm) {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && setShowFireConfirm(false)}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ</DialogTitle>
          <DialogDescription className="sr-only">
            Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р С—Р С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘РЎРЏ РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В° РЎРѓ РЎС“Р С”Р В°Р В·Р В°Р Р…Р С‘Р ВµР С Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎвЂ№
          </DialogDescription>
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-center text-foreground">Р вЂ™РЎвЂ№ РЎС“Р Р†Р ВµРЎР‚Р ВµР Р…РЎвЂ№, РЎвЂЎРЎвЂљР С• РЎвЂ¦Р С•РЎвЂљР С‘РЎвЂљР Вµ РЎС“Р Р†Р С•Р В»Р С‘РЎвЂљРЎРЉ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°?</p>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ (Р С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…Р С•)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎС“ РЎС“Р Р†Р С•Р В»РЎРЉР Р…Р ВµР Р…Р С‘РЎРЏ..."
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm resize-none min-h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р СџРЎР‚Р С‘Р С”РЎР‚Р ВµР С—Р С‘РЎвЂљРЎРЉ Р Т‘Р С•Р С”РЎС“Р СР ВµР Р…РЎвЂљ (Р Р…Р ВµР С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…Р С•)
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFireConfirm(false)}
                  className="flex-1"
                >
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </Button>
                <Button
                  onClick={handleFire}
                  className="flex-1 bg-destructive text-destructive-foreground"
                  disabled={!comment.trim()}
                >
                  Р Р€Р Р†Р С•Р В»Р С‘РЎвЂљРЎРЉ
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
        <DialogTitle className="text-lg font-medium text-foreground text-center">
          {isEdit ? 'Р С’Р Р…Р С”Р ВµРЎвЂљР В°' : 'Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isEdit ? 'Р В¤Р С•РЎР‚Р СР В° Р Т‘Р В»РЎРЏ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ Р Т‘Р В°Р Р…Р Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°' : 'Р В¤Р С•РЎР‚Р СР В° Р Т‘Р В»РЎРЏ Р Т‘Р С•Р В±Р В°Р Р†РїС—Р…РїС—Р…Р ВµР Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р С–Р С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°'}
        </DialogDescription>
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground/70" />
                </button>
                <div className="flex-1"></div>
              </div>
              {isEdit && (
                <button
                  onClick={() => setShowFireConfirm(true)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              )}
            </div>
          </DialogHeader>

          {/* Р В¤Р С•РЎР‚Р СР В° */}
          <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-4">
            <div className="bg-secondary p-4 rounded-2xl apple-shadow space-y-3 text-sm">
              <div>
                <label className="text-muted-foreground">Id:</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>
              
              <div>
                <label className="text-muted-foreground">Р ВР СРЎРЏ:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Telegram ID:</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={formData.telegramId}
                    onChange={(e) => handleTelegramIdChange(e.target.value)}
                    placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ ID Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ Telegram"
                    className="flex-1 bg-transparent border-none outline-none text-foreground"
                  />
                  {isLoadingAvatar && (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>

              {/* Р С’Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р В° */}
              {formData.avatar && (
                <div>
                  <label className="text-muted-foreground">Р С’Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р В°:</label>
                  <div className="flex items-center gap-3 mt-1">
                    <img 
                      src={formData.avatar} 
                      alt="Р С’Р Р†Р В°РЎвЂљР В°РЎР‚Р С”Р В° Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-sm text-muted-foreground">Р вЂ”Р В°Р С–РЎР‚РЎС“Р В¶Р ВµР Р…Р С• Р С‘Р В· Telegram</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-muted-foreground">Р вЂќР В°РЎвЂљР В° РЎР‚Р С•Р В¶Р Т‘Р ВµР Р…Р С‘РЎРЏ:</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Р вЂќР С•Р В»Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉ:</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Р С™Р С•Р СР В°Р Р…Р Т‘Р В°:</label>
                <select
                  value={formData.team}
                  onChange={(e) => handleInputChange('team', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                >
                  <option value="">Р вЂ™РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎС“</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground">Р РЋРЎвЂљР В°Р В¶:</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Р В Р С•Р В»РЎРЉ:</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-primary text-primary-foreground"
              >
                {isEdit ? 'Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ' : 'Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
