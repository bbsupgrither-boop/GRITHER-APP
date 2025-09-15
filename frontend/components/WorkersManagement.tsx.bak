import { useState } from 'react';
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

// Mock С„СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ Р°РІР°С‚Р°СЂРєРё РёР· Telegram
const getTelegramUserAvatar = async (telegramId: string): Promise<string | null> => {
  // Р’ СЂРµР°Р»СЊРЅРѕРј РїСЂРёР»РѕР¶РµРЅРёРё Р·РґРµСЃСЊ Р±СѓРґРµС‚ Р·Р°РїСЂРѕСЃ Рє Telegram Bot API
  // Р”Р»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё РёСЃРїРѕР»СЊР·СѓРµРј РґРµС‚РµСЂРјРёРЅРёСЂРѕРІР°РЅРЅС‹Рµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РёР· Unsplash
  try {
    // РЎРёРјСѓР»РёСЂСѓРµРј Р·Р°РґРµСЂР¶РєСѓ API
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // РќР°Р±РѕСЂ РіРѕС‚РѕРІС‹С… РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹С… Р°РІР°С‚Р°СЂРѕРє
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
    
    // Р”РµС‚РµСЂРјРёРЅРёСЂРѕРІР°РЅРЅС‹Р№ РІС‹Р±РѕСЂ Р°РІР°С‚Р°СЂР° РЅР° РѕСЃРЅРѕРІРµ Telegram ID
    const avatarIndex = parseInt(telegramId.slice(-3)) % avatars.length;
    const selectedAvatar = avatars[avatarIndex];
    
    console.log(`рџ”Ќ РџРѕР»СѓС‡РµРЅР° Р°РІР°С‚Р°СЂРєР° РґР»СЏ Telegram ID @${telegramId}:`, selectedAvatar);
    
    return selectedAvatar;
  } catch (error) {
    console.error('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ Р°РІР°С‚Р°СЂРєРё:', error);
    return null;
  }
};

export function WorkersManagement({ onBack, onNavigateToSection }: WorkersManagementProps) {
  const [selectedTeam, setSelectedTeam] = useState('Р’СЃРµ РєРѕРјР°РЅРґС‹');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showEditWorker, setShowEditWorker] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showFiredWorkers, setShowFiredWorkers] = useState(false);
  const [showFiredWorkerDetails, setShowFiredWorkerDetails] = useState(false);
  const [firedSortBy, setFiredSortBy] = useState<'date' | 'team' | 'name'>('date');
  const [showFiredSortDropdown, setShowFiredSortDropdown] = useState(false);

  // РџСѓСЃС‚С‹Рµ РґР°РЅРЅС‹Рµ СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ - Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂС‹ РґРѕР±Р°РІСЏС‚ РёС… СЃР°РјРѕСЃС‚РѕСЏС‚РµР»СЊРЅРѕ
  const [workers, setWorkers] = useState<Worker[]>([]);

  const teams = ['Р’СЃРµ РєРѕРјР°РЅРґС‹', 'Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'РЎР°РїРїРѕСЂС‚', 'Р СѓРєРѕРІРѕРґСЃС‚РІРѕ'];
  
  const roles = ['GRITHER', 'GLEB', 'SUPPORT', 'TEAMLEAD', 'WORKER'];
  
  const teamLeads: string[] = [];
  
  const supports: string[] = [];

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РЅРѕРјРµСЂР° РєРѕРјР°РЅРґС‹ РґР»СЏ СЃРѕСЂС‚РёСЂРѕРІРєРё
  const getTeamNumber = (team: string) => {
    if (team.startsWith('Team ')) {
      return parseInt(team.split(' ')[1]) || 999;
    }
    return 999; // Р”Р»СЏ РєРѕРјР°РЅРґ С‚РёРїР° "РЎР°РїРїРѕСЂС‚", "Р СѓРєРѕРІРѕРґСЃС‚РІРѕ" Рё РґСЂ.
  };

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ Р°РєС‚РёРІРЅС‹С… СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ
  const activeWorkers = workers
    .filter(worker => {
      if (!worker.isActive) return false;
      if (selectedTeam === 'Р’СЃРµ РєРѕРјР°РЅРґС‹') return true;
      return worker.team === selectedTeam;
    })
    .sort((a, b) => {
      // РЎРѕСЂС‚РёСЂРѕРІРєР° РїРѕ РєРѕРјР°РЅРґР°Рј: Team 1, Team 2, Team 3, Рё С‚.Рґ.
      const teamA = getTeamNumber(a.team);
      const teamB = getTeamNumber(b.team);
      return teamA - teamB;
    });

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ СѓРІРѕР»РµРЅРЅС‹С… СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ СЃ СЃРѕСЂС‚РёСЂРѕРІРєРѕР№
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
    { icon: Home, label: 'Р“Р»Р°РІРЅР°СЏ', section: 'dashboard' },
    { icon: Users, label: 'РЎРѕС‚СЂСѓРґРЅРёРєРё', section: 'workers' },
    { icon: Zap, label: 'Р‘Р°С‚С‚Р»С‹', section: 'battles' },
    { icon: Trophy, label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р—Р°РґР°С‡Рё', section: 'tasks' },
    { icon: ShoppingBag, label: 'РўРѕРІР°СЂС‹', section: 'shop' },
    { icon: Gamepad2, label: 'РРіСЂС‹', section: 'games' },
    { icon: Box, label: 'РљРµР№СЃС‹', section: 'cases' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Р—Р°РіРѕР»РѕРІРѕРє СЃС‚СЂР°РЅРёС†С‹ */}
      <div className="p-6 text-center">
        <h1 className="text-lg font-medium text-foreground">РџР°РЅРµР»СЊ СѓРїСЂР°РІР»РµРЅРёСЏ</h1>
      </div>

      {/* РЈРїСЂР°РІР»РµРЅРёРµ */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAddWorker(true)}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
          >
            Р”РѕР±. СЃРѕС‚СЂСѓРґРЅРёРєР°
          </button>
          <button
            onClick={() => setShowFiredWorkers(true)}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
          >
            РЈРІРѕР»РµРЅС‹
          </button>
        </div>
      </div>

      {/* РЎРѕРґРµСЂР¶РёРјРѕРµ */}
      <div className="p-6 space-y-6 pb-60">
        {/* РЎРµРєС†РёСЏ СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
        <div className="glass-card rounded-2xl apple-shadow p-4">
          {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєРЅРѕРїРєРѕР№ С„РёР»СЊС‚СЂР° */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground text-center flex-1">РЎРѕС‚СЂСѓРґРЅРёРєРё</h2>
            <div className="relative">
              <button
                onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                title="Р¤РёР»СЊС‚СЂ РїРѕ РєРѕРјР°РЅРґР°Рј"
              >
                <span>в‹®</span>
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

          {/* РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
          <div className="space-y-3">
            {activeWorkers.map((worker) => (
              <div key={worker.id} className="flex items-center justify-between p-3 border border-border/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                    {worker.avatar ? (
                      <img 
                        src={worker.avatar} 
                        alt={`РђРІР°С‚Р°СЂРєР° ${worker.name}`} 
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
                      {worker.role} {worker.telegramId && `вЂў @${worker.telegramId}`}
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
                РЎРѕС‚СЂСѓРґРЅРёРєРё РЅРµ РЅР°Р№РґРµРЅС‹
              </div>
            )}
          </div>
        </div>
      </div>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СѓРІРѕР»РµРЅРЅС‹С… СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
      <Dialog open={showFiredWorkers} onOpenChange={setShowFiredWorkers}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">РЎРїРёСЃРѕРє СѓРІРѕР»РµРЅРЅС‹С…</DialogTitle>
          <DialogDescription className="sr-only">
            РЎРїРёСЃРѕРє СѓРІРѕР»РµРЅРЅС‹С… СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ РІРѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёСЏ
          </DialogDescription>
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <button
                    onClick={() => setShowFiredSortDropdown(!showFiredSortDropdown)}
                    className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    title="РЎРѕСЂС‚РёСЂРѕРІРєР°"
                  >
                    <span>в‹®</span>
                  </button>
                  {showFiredSortDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                      {[
                        { key: 'date', label: 'РџРѕ РґР°С‚Рµ СѓРІРѕР»СЊРЅРµРЅРёСЏ' },
                        { key: 'team', label: 'РџРѕ РєРѕРјР°РЅРґРµ' },
                        { key: 'name', label: 'РџРѕ РёРјРµРЅРё' }
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

            {/* РЎРїРёСЃРѕРє СѓРІРѕР»РµРЅРЅС‹С… */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-3">
              {firedWorkers.map((worker) => (
                <div 
                  key={worker.id} 
                  className="flex items-center justify-between p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => handleEditWorker(worker)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm">рџ‘¤</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{worker.name}, {worker.team}</div>
                      <div className="text-xs text-muted-foreground">
                        РЎС‚Р°С‚СѓСЃ: СѓРІРѕР»РµРЅ
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestoreWorker(worker);
                    }}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    title="Р’РѕСЃСЃС‚Р°РЅРѕРІРёС‚СЊ"
                  >
                    <RotateCcw className="w-4 h-4 text-primary" />
                  </button>
                </div>
              ))}
              {firedWorkers.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  РЈРІРѕР»РµРЅРЅС‹С… СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РЅРµС‚
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґРѕР±Р°РІР»РµРЅРёСЏ РІРѕСЂРєРµСЂР° */}
      {showAddWorker && (
        <WorkerModal
          isEdit={false}
          worker={null}
          onClose={() => setShowAddWorker(false)}
          onSave={(workerData) => {
            // Р›РѕРіРёРєР° РґРѕР±Р°РІР»РµРЅРёСЏ РЅРѕРІРѕРіРѕ СЃРѕС‚СЂСѓРґРЅРёРєР°
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
            console.log('Р”РѕР±Р°РІР»РµРЅ РЅРѕРІС‹Р№ СЃРѕС‚СЂСѓРґРЅРёРє:', newWorker);
          }}
          teamLeads={teamLeads}
          supports={supports}
          roles={roles}
          teams={teams.slice(1)} // РЈР±РёСЂР°РµРј "Р’СЃРµ РєРѕРјР°РЅРґС‹"
        />
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РІРѕСЂРєРµСЂР° */}
      {showEditWorker && selectedWorker && (
        <WorkerModal
          isEdit={true}
          worker={selectedWorker}
          onClose={() => {
            setShowEditWorker(false);
            setSelectedWorker(null);
          }}
          onSave={(workerData) => {
            // Р›РѕРіРёРєР° РѕР±РЅРѕРІР»РµРЅРёСЏ СЃРѕС‚СЂСѓРґРЅРёРєР°
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
              console.log('РћР±РЅРѕРІР»РµРЅ СЃРѕС‚СЂСѓРґРЅРёРє:', selectedWorker.id, workerData);
            }
            setShowEditWorker(false);
            setSelectedWorker(null);
          }}
          onFire={(reason, comment, file) => {
            // Р›РѕРіРёРєР° СѓРІРѕР»СЊРЅРµРЅРёСЏ СЃРѕС‚СЂСѓРґРЅРёРєР°
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
              console.log('РЈРІРѕР»РµРЅ СЃРѕС‚СЂСѓРґРЅРёРє:', selectedWorker.id, reason, comment);
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

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ Р°РЅРєРµС‚С‹ СѓРІРѕР»РµРЅРЅРѕРіРѕ СЃРѕС‚СЂСѓРґРЅРёРєР° */}
      <Dialog open={showFiredWorkerDetails && selectedWorker && !selectedWorker.isActive} onOpenChange={(open) => {
        if (!open) {
          setShowFiredWorkerDetails(false);
          setSelectedWorker(null);
        }
      }}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">РђРЅРєРµС‚Р°</DialogTitle>
          <DialogDescription className="sr-only">
            РџРѕРґСЂРѕР±РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ РѕР± СѓРІРѕР»РµРЅРЅРѕРј СЃРѕС‚СЂСѓРґРЅРёРєРµ СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ РІРѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёСЏ
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

            {/* РЎРѕРґРµСЂР¶РёРјРѕРµ */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-4">
              {selectedWorker && (
                <>
                  {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ СЃРѕС‚СЂСѓРґРЅРёРєРµ */}
                  <div className="bg-secondary p-4 rounded-2xl apple-shadow space-y-2">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        {selectedWorker.avatar ? (
                          <img 
                            src={selectedWorker.avatar} 
                            alt={`РђРІР°С‚Р°СЂРєР° ${selectedWorker.name}`} 
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
                        <span className="text-muted-foreground">РРјСЏ:</span>
                        <span className="text-foreground">{selectedWorker.name}</span>
                      </div>
                      {selectedWorker.telegramId && (
                        <div className="flex justify-between border-b border-border/50 pb-1">
                          <span className="text-muted-foreground">Telegram:</span>
                          <span className="text-foreground">@{selectedWorker.telegramId}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р”Р :</span>
                        <span className="text-foreground">{selectedWorker.dateOfBirth || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Р”РѕР»Р¶РЅРѕСЃС‚СЊ:</span>
                        <span className="text-foreground">{selectedWorker.position || selectedWorker.role}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">РљРѕРјР°РЅРґР°:</span>
                        <span className="text-foreground">{selectedWorker.team}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">РЎС‚Р°Р¶:</span>
                        <span className="text-foreground">{selectedWorker.experience || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">РўРёРјР»РёРґ:</span>
                        <span className="text-foreground">{selectedWorker.teamLead || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Р РµРіРёСЃС‚СЂР°С†РёСЏ:</span>
                        <span className="text-foreground">{selectedWorker.registrationDate || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ */}
                  <div className="bg-secondary p-4 rounded-2xl apple-shadow">
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-muted-foreground">РџСЂРёС‡РёРЅР° СѓРІРѕР»СЊРЅРµРЅРёСЏ:</span>
                        <p className="text-foreground mt-1">{selectedWorker.fireReason || 'РќРµ СѓРєР°Р·Р°РЅР°'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Р”Р°С‚Р° СѓРІРѕР»СЊРЅРµРЅРёСЏ:</span>
                        <p className="text-destructive mt-1">{selectedWorker.fireDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">РљРѕРјРјРµРЅС‚Р°СЂРёР№:</span>
                        <p className="text-foreground mt-1">{selectedWorker.fireComment || 'РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* РљРЅРѕРїРєРё */}
            <div className="flex gap-3 pt-4 border-t border-border/20 mt-4">
              <Button
                onClick={() => selectedWorker && handleRestoreWorker(selectedWorker)}
                className="flex-1 bg-primary text-primary-foreground text-sm px-4 py-2"
              >
                РћС‚РјРµРЅРёС‚СЊ
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowFiredWorkerDetails(false);
                  setSelectedWorker(null);
                }}
                className="flex-1 text-sm px-4 py-2"
              >
                РџСЂРёРјРµРЅРёС‚СЊ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р‘С‹СЃС‚СЂР°СЏ РЅР°РІРёРіР°С†РёСЏ */}
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
    
    // Р•СЃР»Рё РІРІРµРґРµРЅ Telegram ID, РїС‹С‚Р°РµРјСЃСЏ РїРѕР»СѓС‡РёС‚СЊ Р°РІР°С‚Р°СЂРєСѓ
    if (telegramId.trim() && telegramId.length >= 5) {
      setIsLoadingAvatar(true);
      try {
        const avatar = await getTelegramUserAvatar(telegramId);
        if (avatar) {
          setFormData(prev => ({ ...prev, avatar }));
        }
      } catch (error) {
        console.error('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ Р°РІР°С‚Р°СЂРєРё:', error);
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
      alert('РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕР±СЏР·Р°С‚РµР»РµРЅ РґР»СЏ СѓРІРѕР»СЊРЅРµРЅРёСЏ');
      return;
    }
    onFire?.(comment, comment, selectedFile || undefined);
    setShowFireConfirm(false);
  };

  if (showFireConfirm) {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && setShowFireConfirm(false)}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">РџРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ СѓРІРѕР»СЊРЅРµРЅРёСЏ</DialogTitle>
          <DialogDescription className="sr-only">
            РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ СѓРІРѕР»СЊРЅРµРЅРёСЏ СЃРѕС‚СЂСѓРґРЅРёРєР° СЃ СѓРєР°Р·Р°РЅРёРµРј РїСЂРёС‡РёРЅС‹
          </DialogDescription>
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-center text-foreground">Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ С…РѕС‚РёС‚Рµ СѓРІРѕР»РёС‚СЊ СЃРѕС‚СЂСѓРґРЅРёРєР°?</p>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  РџСЂРёС‡РёРЅР° СѓРІРѕР»СЊРЅРµРЅРёСЏ (РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="РЈРєР°Р¶РёС‚Рµ РїСЂРёС‡РёРЅСѓ СѓРІРѕР»СЊРЅРµРЅРёСЏ..."
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm resize-none min-h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  РџСЂРёРєСЂРµРїРёС‚СЊ РґРѕРєСѓРјРµРЅС‚ (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)
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
                  РћС‚РјРµРЅРёС‚СЊ
                </Button>
                <Button
                  onClick={handleFire}
                  className="flex-1 bg-destructive text-destructive-foreground"
                  disabled={!comment.trim()}
                >
                  РЈРІРѕР»РёС‚СЊ
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
          {isEdit ? 'РђРЅРєРµС‚Р°' : 'Р”РѕР±Р°РІРёС‚СЊ СЃРѕС‚СЂСѓРґРЅРёРєР°'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isEdit ? 'Р¤РѕСЂРјР° РґР»СЏ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РґР°РЅРЅС‹С… СЃРѕС‚СЂСѓРґРЅРёРєР°' : 'Р¤РѕСЂРјР° РґР»СЏ РґРѕР±Р°РІпїЅпїЅРµРЅРёСЏ РЅРѕРІРѕРіРѕ СЃРѕС‚СЂСѓРґРЅРёРєР°'}
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

          {/* Р¤РѕСЂРјР° */}
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
                <label className="text-muted-foreground">РРјСЏ:</label>
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
                    placeholder="Р’РІРµРґРёС‚Рµ ID РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ Telegram"
                    className="flex-1 bg-transparent border-none outline-none text-foreground"
                  />
                  {isLoadingAvatar && (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>

              {/* РђРІР°С‚Р°СЂРєР° */}
              {formData.avatar && (
                <div>
                  <label className="text-muted-foreground">РђРІР°С‚Р°СЂРєР°:</label>
                  <div className="flex items-center gap-3 mt-1">
                    <img 
                      src={formData.avatar} 
                      alt="РђРІР°С‚Р°СЂРєР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-sm text-muted-foreground">Р—Р°РіСЂСѓР¶РµРЅРѕ РёР· Telegram</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-muted-foreground">Р”Р°С‚Р° СЂРѕР¶РґРµРЅРёСЏ:</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Р”РѕР»Р¶РЅРѕСЃС‚СЊ:</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">РљРѕРјР°РЅРґР°:</label>
                <select
                  value={formData.team}
                  onChange={(e) => handleInputChange('team', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                >
                  <option value="">Р’С‹Р±РµСЂРёС‚Рµ РєРѕРјР°РЅРґСѓ</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground">РЎС‚Р°Р¶:</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full mt-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Р РѕР»СЊ:</label>
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
                РћС‚РјРµРЅРёС‚СЊ
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-primary text-primary-foreground"
              >
                {isEdit ? 'РЎРѕС…СЂР°РЅРёС‚СЊ' : 'Р”РѕР±Р°РІРёС‚СЊ'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
