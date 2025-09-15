import { useState, useEffect, useRef } from 'react';
import { Menu, User, ArrowLeft, Clock, Plus, Info, ArrowRight, Calendar, ChevronDown, X, Check, Paperclip, TrendingUp, TrendingDown, Minus } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { LeaderboardEntry, Battle } from '../types/global';

type SortType = 'level' | 'achievements' | 'balance';

interface UserData {
  id: number;
  name: string;
  team: string;
  level: number;
  balance: string;
  achievements: number;
  avatar?: string;
}

interface BattleData {
  id: number;
  challenger: string;
  opponent: string;
  status: 'active' | 'finished';
  winner?: 'challenger' | 'opponent';
}

interface BattleHistoryData {
  id: number;
  challenger: string;
  opponent: string;
  winner: 'challenger' | 'opponent';
  date: string;
  stake: {
    amount: string;
  };
}

interface ActiveBattle {
  id: number;
  challenger: string;
  opponent: string;
  stake: string;
  date: string;
  status: 'pending' | 'accepted' | 'completed';
  challengerEvidence?: string;
  opponentEvidence?: string;
}

interface WeeklyHistory {
  weekStart: string; // Р”Р°С‚Р° РЅР°С‡Р°Р»Р° РЅРµРґРµР»Рё (РІРѕСЃРєСЂРµСЃРµРЅСЊРµ)
  weekEnd: string;   // Р”Р°С‚Р° РєРѕРЅС†Р° РЅРµРґРµР»Рё (СЃСѓР±Р±РѕС‚Р°) 
  battles: BattleHistoryData[];
}

interface AllTimeHistory {
  battles: BattleHistoryData[];
}

interface Employee {
  id: number;
  name: string;
  team: number;
  avatar?: string;
}

interface Team {
  id: number;
  name: string;
}

interface BattleLeaderboardProps {
  leaderboard?: LeaderboardEntry[];
  activeBattles?: Battle[];
  onNavigate?: (page: string) => void;
  personalBattles?: any[];
  setPersonalBattles?: (battles: any[]) => void;
  theme?: 'light' | 'dark';
}

export function BattleLeaderboard({ leaderboard = [], activeBattles = [], onNavigate, personalBattles = [], setPersonalBattles, theme = 'light' }: BattleLeaderboardProps) {
  const [sortType, setSortType] = useState<SortType>('level');
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [dialogSortType, setDialogSortType] = useState<SortType>('level');
  const [isBattleHistoryOpen, setIsBattleHistoryOpen] = useState(false);
  const [isBattleDetailsOpen, setIsBattleDetailsOpen] = useState(false);
  const [isAllTimeHistoryOpen, setIsAllTimeHistoryOpen] = useState(false);
  const [isCreateBattleOpen, setIsCreateBattleOpen] = useState(false);
  const [isBattleConfirmOpen, setIsBattleConfirmOpen] = useState(false);
  const [isTeamFilterOpen, setIsTeamFilterOpen] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState<BattleHistoryData | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<number | null>(null);
  const [createBattleTab, setCreateBattleTab] = useState<'employees' | 'battles'>('employees');
  const [battleStake, setBattleStake] = useState('');
  const [isCancelBattleOpen, setIsCancelBattleOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [evidenceComment, setEvidenceComment] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  
  // Ref РґР»СЏ РІС‹РїР°РґР°СЋС‰РµРіРѕ РјРµРЅСЋ РєРѕРјР°РЅРґ
  const teamFilterRef = useRef<HTMLDivElement>(null);

  // РџСЂРµРѕР±СЂР°Р·СѓРµРј РґР°РЅРЅС‹Рµ Р»РёРґРµСЂР±РѕСЂРґР° РІ placeholder С„РѕСЂРјР°С‚ РёР»Рё РёСЃРїРѕР»СЊР·СѓРµРј С‚РµСЃС‚РѕРІС‹Рµ РґР°РЅРЅС‹Рµ
  const users: UserData[] = leaderboard.length > 0 
    ? leaderboard.map((entry, index) => ({
        id: index + 1,
        name: entry.user.name || 'Placeholder',
        team: `Team ${Math.floor(Math.random() * 6) + 1}`,
        level: entry.score || Math.floor(Math.random() * 20) + 1,
        balance: `${Math.floor(Math.random() * 10000) + 1000}g`,
        achievements: Math.floor(Math.random() * 50) + 1,
        avatar: entry.user.avatar || ''
      }))
    : [
        // РўРµСЃС‚РѕРІС‹Рµ РґР°РЅРЅС‹Рµ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё СЃРѕСЂС‚РёСЂРѕРІРєРё
        { id: 1, name: 'РђРЅРЅР° РРІР°РЅРѕРІР°', team: 'Team 1', level: 15, balance: '5400g', achievements: 32, avatar: '' },
        { id: 2, name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ', team: 'Team 2', level: 12, balance: '8200g', achievements: 28, avatar: '' },
        { id: 3, name: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°', team: 'Team 3', level: 18, balance: '3600g', achievements: 45, avatar: '' }
      ];

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РґР°С‚С‹ РЅР°С‡Р°Р»Р° РЅРµРґРµР»Рё (РІРѕСЃРєСЂРµСЃРµРЅСЊРµ)
  const getWeekStart = (date: Date = new Date()): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РґР°С‚С‹ РєРѕРЅС†Р° РЅРµРґРµР»Рё (СЃСѓР±Р±РѕС‚Р°)
  const getWeekEnd = (weekStart: Date): Date => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
  };

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ С„РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёСЏ РґР°С‚С‹
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };

  // РџРѕР»СѓС‡Р°РµРј С‚РµРєСѓС‰СѓСЋ РЅРµРґРµР»СЋ
  const currentWeekStart = getWeekStart();
  const currentWeekEnd = getWeekEnd(currentWeekStart);

  // Placeholder РґР°РЅРЅС‹Рµ РґР»СЏ РёСЃС‚РѕСЂРёРё Р±Р°С‚С‚Р»РѕРІ (РїРѕРєР° РїСѓСЃС‚С‹Рµ)
  const weeklyHistory: WeeklyHistory = {
    weekStart: formatDate(currentWeekStart),
    weekEnd: formatDate(currentWeekEnd),
    battles: []
  };

  // Placeholder РґР°РЅРЅС‹Рµ РґР»СЏ РёСЃС‚РѕСЂРёРё Р·Р° РІСЃРµ РІСЂРµРјСЏ (РїРѕРєР° РїСѓСЃС‚С‹Рµ)
  const allTimeHistory: AllTimeHistory = {
    battles: []
  };

  // Mock РґР°РЅРЅС‹Рµ СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ СЃ РєРѕРјР°РЅРґР°РјРё (С‚РѕР»СЊРєРѕ 1-6 РєРѕРјР°РЅРґС‹ РјРѕРіСѓС‚ Р±Р°С‚С‚Р»РёС‚СЊСЃСЏ)
  const allEmployees: Employee[] = [
    { id: 1, name: 'РђРЅРЅР° РРІР°РЅРѕРІР°', team: 1, avatar: undefined },
    { id: 2, name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ', team: 1, avatar: undefined },
    { id: 3, name: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°', team: 2, avatar: undefined },
    { id: 4, name: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ', team: 2, avatar: undefined },
    { id: 5, name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', team: 3, avatar: undefined },
    { id: 6, name: 'Р”РјРёС‚СЂРёР№ Р’РѕР»РєРѕРІ', team: 3, avatar: undefined },
    { id: 7, name: 'РћР»СЊРіР° РЎРѕРєРѕР»РѕРІР°', team: 4, avatar: undefined },
    { id: 8, name: 'РЎРµСЂРіРµР№ РћСЂР»РѕРІ', team: 4, avatar: undefined },
    { id: 9, name: 'РњРёС…Р°РёР» Р С‹Р±Р°РєРѕРІ', team: 5, avatar: undefined },
    { id: 10, name: 'РўР°С‚СЊСЏРЅР° Р‘РµР»РѕРІР°', team: 5, avatar: undefined },
    { id: 11, name: 'Р’Р»Р°РґРёРјРёСЂ РќРѕРІРёРєРѕРІ', team: 6, avatar: undefined },
    { id: 12, name: 'Р•РєР°С‚РµСЂРёРЅР° РџРѕРїРѕРІР°', team: 6, avatar: undefined },
  ];

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РїРѕ РєРѕРјР°РЅРґРµ (С‚РѕР»СЊРєРѕ РєРѕРјР°РЅРґС‹ 1-6)
  const filteredEmployees = selectedTeamFilter 
    ? allEmployees.filter(emp => emp.team === selectedTeamFilter)
    : allEmployees.filter(emp => emp.team >= 1 && emp.team <= 6);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleSortClick = () => {
    // Р’РёР·СѓР°Р»СЊРЅС‹Р№ СЌС„С„РµРєС‚ РЅР°Р¶Р°С‚РёСЏ
    setIsButtonClicked(true);
    setTimeout(() => setIsButtonClicked(false), 200);

    // РџРµСЂРµРєР»СЋС‡РµРЅРёРµ С‚РёРїР° СЃРѕСЂС‚РёСЂРѕРІРєРё РїРѕ РєСЂСѓРіСѓ
    const sortTypes: SortType[] = ['level', 'achievements', 'balance'];
    const currentIndex = sortTypes.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % sortTypes.length;
    const newSortType = sortTypes[nextIndex];
    setSortType(newSortType);
    
    // РћС‚Р»Р°РґРєР° РґР»СЏ РїСЂРѕРІРµСЂРєРё СЂР°Р±РѕС‚С‹ РєРЅРѕРїРєРё
    console.log(`РЎРѕСЂС‚РёСЂРѕРІРєР° РёР·РјРµРЅРµРЅР° СЃ "${getSortTypeText(sortType)}" РЅР° "${getSortTypeText(newSortType)}"`);
  };

  const handleDialogSortClick = () => {
    // РџРµСЂРµРєР»СЋС‡РµРЅРёРµ С‚РёРїР° СЃРѕСЂС‚РёСЂРѕРІРєРё РІ РґРёР°Р»РѕРіРµ
    const sortTypes: SortType[] = ['level', 'achievements', 'balance'];
    const currentIndex = sortTypes.indexOf(dialogSortType);
    const nextIndex = (currentIndex + 1) % sortTypes.length;
    setDialogSortType(sortTypes[nextIndex]);
  };

  const handleUsersClick = () => {
    setIsUsersDialogOpen(true);
  };

  const handleUserClick = (userId: number) => {
    // Р’ Р±СѓРґСѓС‰РµРј Р·РґРµСЃСЊ Р±СѓРґРµС‚ РѕС‚РєСЂС‹С‚РёРµ РїСЂРѕС„РёР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
    console.log(`РћС‚РєСЂС‹С‚СЊ РїСЂРѕС„РёР»СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ ${userId}`);
  };

  const handleBattleHistoryClick = () => {
    setIsBattleHistoryOpen(true);
  };

  const handleCreateBattleClick = () => {
    setIsCreateBattleOpen(true);
  };

  const handleBattleDetailsClick = (battle: BattleHistoryData) => {
    setSelectedBattle(battle);
    setIsBattleDetailsOpen(true);
  };

  const handleAllTimeHistoryClick = () => {
    setIsAllTimeHistoryOpen(true);
  };

  const handleEmployeeChallengeClick = (employee: Employee) => {
    if (personalBattles.length > 0) return; // Р‘Р»РѕРєРёСЂСѓРµРј РµСЃР»Рё СѓР¶Рµ РµСЃС‚СЊ Р°РєС‚РёРІРЅС‹Р№ Р±Р°С‚С‚Р»
    
    setSelectedEmployee(employee);
    setIsBattleConfirmOpen(true);
  };

  const handleConfirmBattle = () => {
    if (selectedEmployee && battleStake.trim() && setPersonalBattles) {
      // РЎРѕР·РґР°РµРј Р°РєС‚РёРІРЅС‹Р№ Р±Р°С‚С‚Р»
      const newBattle = {
        id: Date.now().toString(),
        challenger: {
          id: 'current-user',
          name: 'Р’С‹',
          team: 1,
          level: 5,
          avatar: null,
          role: 'РЎРѕС‚СЂСѓРґРЅРёРє',
          achievements: 10,
          completedTasks: 25
        },
        opponent: {
          id: selectedEmployee.id.toString(),
          name: selectedEmployee.name,
          team: selectedEmployee.team,
          level: Math.floor(Math.random() * 20) + 1,
          avatar: null,
          status: 'available' as const,
          role: 'РЎРѕС‚СЂСѓРґРЅРёРє',
          achievements: Math.floor(Math.random() * 50) + 1,
          completedTasks: Math.floor(Math.random() * 100) + 1
        },
        status: 'active' as const,
        prize: parseInt(battleStake),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 РґРЅРµР№
        created: new Date()
      };
      
      // Р”РѕР±Р°РІР»СЏРµРј Рє РіР»РѕР±Р°Р»СЊРЅРѕРјСѓ СЃРѕСЃС‚РѕСЏРЅРёСЋ
      setPersonalBattles([...personalBattles, newBattle]);
      console.log(`Р‘Р°С‚С‚Р» СЃРѕР·РґР°РЅ СЃ ${selectedEmployee.name} РЅР° СЃСѓРјРјСѓ ${battleStake} РєРѕРёРЅРѕРІ`);
      
      // РћС‡РёС‰Р°РµРј СЃРѕСЃС‚РѕСЏРЅРёРµ
      setIsBattleConfirmOpen(false);
      setIsCreateBattleOpen(false);
      setSelectedEmployee(null);
      setBattleStake('');
    }
  };

  const handleTeamFilterClick = (teamId: number | null) => {
    setSelectedTeamFilter(teamId);
    setIsTeamFilterOpen(false);
  };

  const handleCancelBattleConfirm = () => {
    setIsBattleConfirmOpen(false);
    setSelectedEmployee(null);
    setBattleStake('');
  };

  const getSortTypeText = (type: SortType) => {
    switch (type) {
      case 'level':
        return 'РџРѕ СѓСЂРѕРІРЅСЋ';
      case 'achievements':
        return 'РџРѕ Р°С‡РёРІРєР°Рј';
      case 'balance':
        return 'РџРѕ Р±Р°Р»Р°РЅСЃСѓ';
      default:
        return 'РџРѕ СѓСЂРѕРІРЅСЋ';
    }
  };

  const sortUsers = (users: UserData[], sortType: SortType): UserData[] => {
    return [...users].sort((a, b) => {
      switch (sortType) {
        case 'level':
          return b.level - a.level;
        case 'achievements':
          return b.achievements - a.achievements;
        case 'balance':
          // РџР°СЂСЃРёРј С‡РёСЃР»РѕРІРѕРµ Р·РЅР°С‡РµРЅРёРµ РёР· СЃС‚СЂРѕРєРё Р±Р°Р»Р°РЅСЃР° РґР»СЏ РїСЂР°РІРёР»СЊРЅРѕР№ СЃРѕСЂС‚РёСЂРѕРІРєРё
          const balanceA = parseFloat(a.balance.replace(/[^\d.-]/g, '')) || 0;
          const balanceB = parseFloat(b.balance.replace(/[^\d.-]/g, '')) || 0;
          return balanceB - balanceA;
        default:
          return b.level - a.level;
      }
    });
  };

  const sortedUsers = sortUsers(users, dialogSortType);

  // РћР±СЂР°Р±РѕС‚С‡РёРє РєР»РёРєР° РІРЅРµ РІС‹РїР°РґР°СЋС‰РµРіРѕ РјРµРЅСЋ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (teamFilterRef.current && !teamFilterRef.current.contains(event.target as Node)) {
        setIsTeamFilterOpen(false);
      }
    };

    if (isTeamFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTeamFilterOpen]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {/* Р‘Р°С‚С‚Р» СЃРµРєС†РёСЏ */}
        <div 
          className={`${theme === 'dark' ? 'dark' : ''}`}
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '20px',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.06)' 
              : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
              : '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-0">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('HISTORY BUTTON CLICKED!');
                handleBattleHistoryClick();
              }}
              className="p-2 rounded-full transition-all hover:scale-105"
              style={{
                background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: 60,
                cursor: 'pointer'
              }}
              title="РСЃС‚РѕСЂРёСЏ Р±Р°С‚С‚Р»РѕРІ"
            >
              <Clock className="w-4 h-4" />
            </button>
            <h3 
              className="font-medium text-center flex-1"
              style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
            >
              Р‘Р°С‚С‚Р»С‹
            </h3>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('CREATE BATTLE BUTTON CLICKED!');
                handleCreateBattleClick();
              }}
              className="p-2 rounded-full transition-all hover:scale-105"
              style={{
                background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: 60,
                cursor: 'pointer'
              }}
              title="РЎРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 pt-3">
            <div className="flex items-center justify-center min-h-[50px]">
              {personalBattles.length > 0 ? (
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2 justify-center">
                  <span 
                    className="text-xs font-medium truncate"
                    style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                  >
                    Р‘Р°С‚С‚Р» СЃ {personalBattles[0].opponent.name}
                  </span>
                </div>
                <div 
                  className="text-xs text-center"
                  style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                >
                  РЎС‚Р°РІРєР°: {personalBattles[0].prize}g
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('VICTORY BUTTON CLICKED!', personalBattles[0]);
                      
                      // Р›РѕРіРёРєР° РїРѕР±РµРґС‹ РІ Р±Р°С‚С‚Р»Рµ
                      if (setPersonalBattles) {
                        const updatedBattles = personalBattles.filter((_, index) => index !== 0);
                        setPersonalBattles(updatedBattles);
                        console.log('Р‘Р°С‚С‚Р» Р·Р°РІРµСЂС€РµРЅ РїРѕР±РµРґРѕР№!');
                      }
                    }}
                    className="flex-1 py-2 text-xs font-medium hover:scale-[0.98] transition-transform"
                    style={{
                      background: '#34C759',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      height: '28px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 50
                    }}
                  >
                    Р’С‹РёРіСЂР°Р»
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('CANCEL BUTTON CLICKED!', personalBattles[0]);
                      
                      // Р›РѕРіРёРєР° РѕС‚РјРµРЅС‹ Р±Р°С‚С‚Р»Р°
                      if (setPersonalBattles) {
                        const updatedBattles = personalBattles.filter((_, index) => index !== 0);
                        setPersonalBattles(updatedBattles);
                        console.log('Р‘Р°С‚С‚Р» РѕС‚РјРµРЅРµРЅ!');
                      }
                    }}
                    className="py-2 px-3 text-xs font-medium hover:scale-[0.98] transition-transform"
                    style={{
                      background: '#FF3B30',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      height: '28px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 50
                    }}
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                </div>
              </div>
            ) : (
              <p 
                className="text-sm text-center opacity-70"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ
              </p>
            )}
            </div>
          </div>
        </div>

        {/* Р›РёРґРµСЂР±РѕСЂРґ СЃРµРєС†РёСЏ */}
        <div 
          className={`${theme === 'dark' ? 'dark' : ''}`}
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '20px',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.06)' 
              : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
              : '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-0">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('SORT BUTTON CLICKED!');
                handleSortClick();
              }}
              className={`p-2 rounded-full transition-all hover:scale-105 active:scale-95 ${isButtonClicked ? 'animate-pulse' : ''}`}
              style={{
                background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
                animation: isButtonClicked ? 'pulse 0.2s ease-in-out' : 'none',
                position: 'relative',
                zIndex: 60,
                cursor: 'pointer'
              }}
              title={`РЎРѕСЂС‚РёСЂРѕРІРєР°: ${getSortTypeText(sortType)} (РЅР°Р¶РјРёС‚Рµ РґР»СЏ РёР·РјРµРЅРµРЅРёСЏ)`}
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center">
              <h3 
                className="font-medium"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                Р›РёРґРµСЂР±РѕСЂРґ
              </h3>
              <p 
                className="text-xs opacity-60 mt-1"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                {getSortTypeText(sortType)}
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('USERS BUTTON CLICKED!');
                handleUsersClick();
              }}
              className="p-2 rounded-full transition-all hover:scale-105"
              style={{
                background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: 60,
                cursor: 'pointer'
              }}
              title="Р’СЃРµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 pt-3">
            <div className="flex items-center justify-center min-h-[50px]">
              {users.length > 0 ? (
              <div className="w-full space-y-1">
                {sortUsers(users, sortType).slice(0, 3).map((user, index) => (
                  <div 
                    key={`${user.id}-${sortType}`} 
                    className="flex items-center gap-2 text-xs transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      animation: 'fadeIn 0.3s ease-in-out'
                    }}
                  >
                    <span 
                      className="font-medium w-4"
                      style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                    >
                      {index + 1}.
                    </span>
                    <span 
                      className="truncate flex-1"
                      style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                    >
                      {user.name}
                    </span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                    >
                      {sortType === 'level' && `РЈСЂ.${user.level}`}
                      {sortType === 'achievements' && `${user.achievements}в…`}
                      {sortType === 'balance' && user.balance}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p 
                className="text-sm text-center opacity-70"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                РЎРїРёСЃРѕРє Р»РёРґРµСЂРѕРІ РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚
              </p>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* РСЃС‚РѕСЂРёСЏ Р±Р°С‚С‚Р»РѕРІ */}
      <Dialog open={isBattleHistoryOpen} onOpenChange={setIsBattleHistoryOpen}>
        <DialogContent 
          className="sm:max-w-md mx-auto"
          style={{
            background: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 16px 48px rgba(0, 0, 0, 0.6)' 
              : '0 16px 48px rgba(0, 0, 0, 0.12)'
          }}
        >
          <DialogTitle style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РСЃС‚РѕСЂРёСЏ Р±Р°С‚С‚Р»РѕРІ
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р’Р°С€Рё РїСЂРѕС€Р»С‹Рµ Р±Р°С‚С‚Р»С‹ Р·Р° СЌС‚Сѓ РЅРµРґРµР»СЋ ({weeklyHistory.weekStart} - {weeklyHistory.weekEnd})
          </DialogDescription>
          
          <div className="space-y-3">
            {weeklyHistory.battles.length > 0 ? (
              weeklyHistory.battles.map((battle) => (
                <div 
                  key={battle.id}
                  className="p-3 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
                  }}
                  onClick={() => handleBattleDetailsClick(battle)}
                >
                  <div className="flex justify-between items-center">
                    <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      {battle.challenger} vs {battle.opponent}
                    </span>
                    <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                      {battle.date}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  РќР° СЌС‚РѕР№ РЅРµРґРµР»Рµ Р±Р°С‚С‚Р»РѕРІ РЅРµ Р±С‹Р»Рѕ
                </p>
                <button 
                  onClick={handleAllTimeHistoryClick}
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  РџРѕСЃРјРѕС‚СЂРµС‚СЊ РёСЃС‚РѕСЂРёСЋ Р·Р° РІСЃРµ РІСЂРµРјСЏ
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* РЎРѕР·РґР°РЅРёРµ Р±Р°С‚С‚Р»Р° */}
      <Dialog open={isCreateBattleOpen} onOpenChange={setIsCreateBattleOpen}>
        <DialogContent 
          className="sm:max-w-lg mx-auto"
          style={{
            background: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 16px 48px rgba(0, 0, 0, 0.6)' 
              : '0 16px 48px rgba(0, 0, 0, 0.12)'
          }}
        >
          <DialogTitle style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РЎРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р’С‹Р±РµСЂРёС‚Рµ СЃРѕРїРµСЂРЅРёРєР° РґР»СЏ Р±Р°С‚С‚Р»Р°
          </DialogDescription>
          
          <div className="space-y-4">
            {/* Р¤РёР»СЊС‚СЂ РїРѕ РєРѕРјР°РЅРґР°Рј */}
            <div className="relative" ref={teamFilterRef}>
              <button
                onClick={() => setIsTeamFilterOpen(!isTeamFilterOpen)}
                className="w-full p-2 text-left rounded-lg border flex justify-between items-center"
                style={{
                  background: theme === 'dark' ? '#161A22' : '#F8F9FA',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                {selectedTeamFilter ? `РљРѕРјР°РЅРґР° ${selectedTeamFilter}` : 'Р’СЃРµ РєРѕРјР°РЅРґС‹'}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isTeamFilterOpen && (
                <div 
                  className="absolute top-full left-0 right-0 mt-1 border rounded-lg z-50 max-h-48 overflow-y-auto"
                  style={{
                    background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                    boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
                  }}
                >
                  <button
                    onClick={() => handleTeamFilterClick(null)}
                    className="w-full p-2 text-left hover:bg-opacity-50"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      backgroundColor: !selectedTeamFilter ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent'
                    }}
                  >
                    Р’СЃРµ РєРѕРјР°РЅРґС‹
                  </button>
                  {[1, 2, 3, 4, 5, 6].map(teamId => (
                    <button
                      key={teamId}
                      onClick={() => handleTeamFilterClick(teamId)}
                      className="w-full p-2 text-left hover:bg-opacity-50"
                      style={{
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                        backgroundColor: selectedTeamFilter === teamId ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent'
                      }}
                    >
                      РљРѕРјР°РЅРґР° {teamId}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
                  }}
                  onClick={() => handleEmployeeChallengeClick(employee)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback style={{
                        background: theme === 'dark' ? '#2A3340' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}>
                        {employee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                        {employee.name}
                      </div>
                      <div style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} className="text-sm">
                        РљРѕРјР°РЅРґР° {employee.team}
                      </div>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{
                      background: personalBattles.length > 0 ? (theme === 'dark' ? '#2A3340' : '#E6E9EF') : '#2B82FF',
                      color: personalBattles.length > 0 ? (theme === 'dark' ? '#6B7280' : '#9CA3AF') : '#FFFFFF'
                    }}
                    disabled={personalBattles.length > 0}
                  >
                    {personalBattles.length > 0 ? 'Р‘Р»РѕРєРёСЂРѕРІР°РЅРѕ' : 'Р’С‹Р·РІР°С‚СЊ'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РџРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ СЃРѕР·РґР°РЅРёСЏ Р±Р°С‚С‚Р»Р° */}
      <Dialog open={isBattleConfirmOpen} onOpenChange={setIsBattleConfirmOpen}>
        <DialogContent 
          className="sm:max-w-md mx-auto"
          style={{
            background: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 16px 48px rgba(0, 0, 0, 0.6)' 
              : '0 16px 48px rgba(0, 0, 0, 0.12)'
          }}
        >
          <DialogTitle style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РџРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ Р±Р°С‚С‚Р»Р°
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р’С‹Р·РІР°С‚СЊ РЅР° Р±Р°С‚С‚Р» {selectedEmployee?.name}?
          </DialogDescription>
          
          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                РЎС‚Р°РІРєР° (РєРѕРёРЅС‹)
              </label>
              <input
                type="number"
                value={battleStake}
                onChange={(e) => setBattleStake(e.target.value)}
                placeholder="100"
                className="w-full p-2 border rounded-lg"
                style={{
                  background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleConfirmBattle}
                disabled={!battleStake.trim()}
                className="flex-1 py-2 px-4 rounded-lg transition-colors"
                style={{
                  background: !battleStake.trim() ? (theme === 'dark' ? '#2A3340' : '#E6E9EF') : '#2B82FF',
                  color: !battleStake.trim() ? (theme === 'dark' ? '#6B7280' : '#9CA3AF') : '#FFFFFF'
                }}
              >
                РџРѕРґС‚РІРµСЂРґРёС‚СЊ
              </button>
              <button
                onClick={handleCancelBattleConfirm}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  background: theme === 'dark' ? '#2A3340' : '#E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РћС‚РјРµРЅР°
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р’СЃРµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё */}
      <Dialog open={isUsersDialogOpen} onOpenChange={setIsUsersDialogOpen}>
        <DialogContent 
          className="sm:max-w-md mx-auto"
          style={{
            background: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 16px 48px rgba(0, 0, 0, 0.6)' 
              : '0 16px 48px rgba(0, 0, 0, 0.12)'
          }}
        >
          <DialogTitle style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р’СЃРµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            РџРѕР»РЅС‹Р№ СЃРїРёСЃРѕРє СѓС‡Р°СЃС‚РЅРёРєРѕРІ - {getSortTypeText(dialogSortType)}
          </DialogDescription>
          
          <div className="flex justify-between items-center mb-4">
            <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
              РЎРѕСЂС‚РёСЂРѕРІРєР°: {getSortTypeText(dialogSortType)}
            </span>
            <button
              onClick={handleDialogSortClick}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: theme === 'dark' ? '#161A22' : '#F8F9FA',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {sortedUsers.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                style={{
                  background: theme === 'dark' ? '#161A22' : '#F8F9FA',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
                }}
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    #{index + 1}
                  </span>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback style={{
                      background: theme === 'dark' ? '#2A3340' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      {user.name}
                    </div>
                    <div style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} className="text-sm">
                      {user.team}
                    </div>
                  </div>
                </div>
                <div style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  {dialogSortType === 'level' && `РЈСЂ.${user.level}`}
                  {dialogSortType === 'achievements' && `${user.achievements}в…`}
                  {dialogSortType === 'balance' && user.balance}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
