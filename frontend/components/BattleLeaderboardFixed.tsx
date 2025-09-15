п»їimport { useState, useEffect, useRef } from 'react';
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
  weekStart: string; // Р вЂќР В°РЎвЂљР В° Р Р…Р В°РЎвЂЎР В°Р В»Р В° Р Р…Р ВµР Т‘Р ВµР В»Р С‘ (Р Р†Р С•РЎРѓР С”РЎР‚Р ВµРЎРѓР ВµР Р…РЎРЉР Вµ)
  weekEnd: string;   // Р вЂќР В°РЎвЂљР В° Р С”Р С•Р Р…РЎвЂ Р В° Р Р…Р ВµР Т‘Р ВµР В»Р С‘ (РЎРѓРЎС“Р В±Р В±Р С•РЎвЂљР В°) 
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
  
  // Ref Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р С—Р В°Р Т‘Р В°РЎР‹РЎвЂ°Р ВµР С–Р С• Р СР ВµР Р…РЎР‹ Р С”Р С•Р СР В°Р Р…Р Т‘
  const teamFilterRef = useRef<HTMLDivElement>(null);

  // Р СџРЎР‚Р ВµР С•Р В±РЎР‚Р В°Р В·РЎС“Р ВµР С Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р В»Р С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘Р В° Р Р† placeholder РЎвЂћР С•РЎР‚Р СР В°РЎвЂљ Р С‘Р В»Р С‘ Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“Р ВµР С РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р Вµ Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ
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
        // Р СћР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р Вµ Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р Т‘Р ВµР СР С•Р Р…РЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘Р С‘ РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С‘
        { id: 1, name: 'Р С’Р Р…Р Р…Р В° Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°', team: 'Team 1', level: 15, balance: '5400g', achievements: 32, avatar: '' },
        { id: 2, name: 'Р СџР ВµРЎвЂљРЎР‚ Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†', team: 'Team 2', level: 12, balance: '8200g', achievements: 28, avatar: '' },
        { id: 3, name: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†Р В°', team: 'Team 3', level: 18, balance: '3600g', achievements: 45, avatar: '' }
      ];

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р Т‘Р В°РЎвЂљРЎвЂ№ Р Р…Р В°РЎвЂЎР В°Р В»Р В° Р Р…Р ВµР Т‘Р ВµР В»Р С‘ (Р Р†Р С•РЎРѓР С”РЎР‚Р ВµРЎРѓР ВµР Р…РЎРЉР Вµ)
  const getWeekStart = (date: Date = new Date()): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р Т‘Р В°РЎвЂљРЎвЂ№ Р С”Р С•Р Р…РЎвЂ Р В° Р Р…Р ВµР Т‘Р ВµР В»Р С‘ (РЎРѓРЎС“Р В±Р В±Р С•РЎвЂљР В°)
  const getWeekEnd = (weekStart: Date): Date => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
  };

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ РЎвЂћР С•РЎР‚Р СР В°РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ Р Т‘Р В°РЎвЂљРЎвЂ№
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };

  // Р СџР С•Р В»РЎС“РЎвЂЎР В°Р ВµР С РЎвЂљР ВµР С”РЎС“РЎвЂ°РЎС“РЎР‹ Р Р…Р ВµР Т‘Р ВµР В»РЎР‹
  const currentWeekStart = getWeekStart();
  const currentWeekEnd = getWeekEnd(currentWeekStart);

  // Placeholder Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘Р С‘ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р† (Р С—Р С•Р С”Р В° Р С—РЎС“РЎРѓРЎвЂљРЎвЂ№Р Вµ)
  const weeklyHistory: WeeklyHistory = {
    weekStart: formatDate(currentWeekStart),
    weekEnd: formatDate(currentWeekEnd),
    battles: []
  };

  // Placeholder Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘Р С‘ Р В·Р В° Р Р†РЎРѓР Вµ Р Р†РЎР‚Р ВµР СРЎРЏ (Р С—Р С•Р С”Р В° Р С—РЎС“РЎРѓРЎвЂљРЎвЂ№Р Вµ)
  const allTimeHistory: AllTimeHistory = {
    battles: []
  };

  // Mock Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† РЎРѓ Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р СР С‘ (РЎвЂљР С•Р В»РЎРЉР С”Р С• 1-6 Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ Р СР С•Р С–РЎС“РЎвЂљ Р В±Р В°РЎвЂљРЎвЂљР В»Р С‘РЎвЂљРЎРЉРЎРѓРЎРЏ)
  const allEmployees: Employee[] = [
    { id: 1, name: 'Р С’Р Р…Р Р…Р В° Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°', team: 1, avatar: undefined },
    { id: 2, name: 'Р СџР ВµРЎвЂљРЎР‚ Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†', team: 1, avatar: undefined },
    { id: 3, name: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†Р В°', team: 2, avatar: undefined },
    { id: 4, name: 'Р С’Р В»Р ВµР С”РЎРѓР ВµР в„– Р С™Р С•Р В·Р В»Р С•Р Р†', team: 2, avatar: undefined },
    { id: 5, name: 'Р вЂўР В»Р ВµР Р…Р В° Р СљР С•РЎР‚Р С•Р В·Р С•Р Р†Р В°', team: 3, avatar: undefined },
    { id: 6, name: 'Р вЂќР СР С‘РЎвЂљРЎР‚Р С‘Р в„– Р вЂ™Р С•Р В»Р С”Р С•Р Р†', team: 3, avatar: undefined },
    { id: 7, name: 'Р С›Р В»РЎРЉР С–Р В° Р РЋР С•Р С”Р С•Р В»Р С•Р Р†Р В°', team: 4, avatar: undefined },
    { id: 8, name: 'Р РЋР ВµРЎР‚Р С–Р ВµР в„– Р С›РЎР‚Р В»Р С•Р Р†', team: 4, avatar: undefined },
    { id: 9, name: 'Р СљР С‘РЎвЂ¦Р В°Р С‘Р В» Р В РЎвЂ№Р В±Р В°Р С”Р С•Р Р†', team: 5, avatar: undefined },
    { id: 10, name: 'Р СћР В°РЎвЂљРЎРЉРЎРЏР Р…Р В° Р вЂР ВµР В»Р С•Р Р†Р В°', team: 5, avatar: undefined },
    { id: 11, name: 'Р вЂ™Р В»Р В°Р Т‘Р С‘Р СР С‘РЎР‚ Р СњР С•Р Р†Р С‘Р С”Р С•Р Р†', team: 6, avatar: undefined },
    { id: 12, name: 'Р вЂўР С”Р В°РЎвЂљР ВµРЎР‚Р С‘Р Р…Р В° Р СџР С•Р С—Р С•Р Р†Р В°', team: 6, avatar: undefined },
  ];

  // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚Р В°РЎвЂ Р С‘РЎРЏ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р С—Р С• Р С”Р С•Р СР В°Р Р…Р Т‘Р Вµ (РЎвЂљР С•Р В»РЎРЉР С”Р С• Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ 1-6)
  const filteredEmployees = selectedTeamFilter 
    ? allEmployees.filter(emp => emp.team === selectedTeamFilter)
    : allEmployees.filter(emp => emp.team >= 1 && emp.team <= 6);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleSortClick = () => {
    // Р вЂ™Р С‘Р В·РЎС“Р В°Р В»РЎРЉР Р…РЎвЂ№Р в„– РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљ Р Р…Р В°Р В¶Р В°РЎвЂљР С‘РЎРЏ
    setIsButtonClicked(true);
    setTimeout(() => setIsButtonClicked(false), 200);

    // Р СџР ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР ВµР Р…Р С‘Р Вµ РЎвЂљР С‘Р С—Р В° РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С‘ Р С—Р С• Р С”РЎР‚РЎС“Р С–РЎС“
    const sortTypes: SortType[] = ['level', 'achievements', 'balance'];
    const currentIndex = sortTypes.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % sortTypes.length;
    const newSortType = sortTypes[nextIndex];
    setSortType(newSortType);
    
    // Р С›РЎвЂљР В»Р В°Р Т‘Р С”Р В° Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘ РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂ№ Р С”Р Р…Р С•Р С—Р С”Р С‘
    console.log(`Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В° Р С‘Р В·Р СР ВµР Р…Р ВµР Р…Р В° РЎРѓ "${getSortTypeText(sortType)}" Р Р…Р В° "${getSortTypeText(newSortType)}"`);
  };

  const handleDialogSortClick = () => {
    // Р СџР ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР ВµР Р…Р С‘Р Вµ РЎвЂљР С‘Р С—Р В° РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С‘ Р Р† Р Т‘Р С‘Р В°Р В»Р С•Р С–Р Вµ
    const sortTypes: SortType[] = ['level', 'achievements', 'balance'];
    const currentIndex = sortTypes.indexOf(dialogSortType);
    const nextIndex = (currentIndex + 1) % sortTypes.length;
    setDialogSortType(sortTypes[nextIndex]);
  };

  const handleUsersClick = () => {
    setIsUsersDialogOpen(true);
  };

  const handleUserClick = (userId: number) => {
    // Р вЂ™ Р В±РЎС“Р Т‘РЎС“РЎвЂ°Р ВµР С Р В·Р Т‘Р ВµРЎРѓРЎРЉ Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р С•РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘Р Вµ Р С—РЎР‚Р С•РЎвЂћР С‘Р В»РЎРЏ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ
    console.log(`Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р С—РЎР‚Р С•РЎвЂћР С‘Р В»РЎРЉ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ ${userId}`);
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
    if (personalBattles.length > 0) return; // Р вЂР В»Р С•Р С”Р С‘РЎР‚РЎС“Р ВµР С Р ВµРЎРѓР В»Р С‘ РЎС“Р В¶Р Вµ Р ВµРЎРѓРЎвЂљРЎРЉ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В»
    
    setSelectedEmployee(employee);
    setIsBattleConfirmOpen(true);
  };

  const handleConfirmBattle = () => {
    if (selectedEmployee && battleStake.trim() && setPersonalBattles) {
      // Р РЋР С•Р В·Р Т‘Р В°Р ВµР С Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В»
      const newBattle = {
        id: Date.now().toString(),
        challenger: {
          id: 'current-user',
          name: 'Р вЂ™РЎвЂ№',
          team: 1,
          level: 5,
          avatar: null,
          role: 'Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”',
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
          role: 'Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”',
          achievements: Math.floor(Math.random() * 50) + 1,
          completedTasks: Math.floor(Math.random() * 100) + 1
        },
        status: 'active' as const,
        prize: parseInt(battleStake),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 Р Т‘Р Р…Р ВµР в„–
        created: new Date()
      };
      
      // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С Р С” Р С–Р В»Р С•Р В±Р В°Р В»РЎРЉР Р…Р С•Р СРЎС“ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘РЎР‹
      setPersonalBattles([...personalBattles, newBattle]);
      console.log(`Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓР С•Р В·Р Т‘Р В°Р Р… РЎРѓ ${selectedEmployee.name} Р Р…Р В° РЎРѓРЎС“Р СР СРЎС“ ${battleStake} Р С”Р С•Р С‘Р Р…Р С•Р Р†`);
      
      // Р С›РЎвЂЎР С‘РЎвЂ°Р В°Р ВµР С РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ
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
        return 'Р СџР С• РЎС“РЎР‚Р С•Р Р†Р Р…РЎР‹';
      case 'achievements':
        return 'Р СџР С• Р В°РЎвЂЎР С‘Р Р†Р С”Р В°Р С';
      case 'balance':
        return 'Р СџР С• Р В±Р В°Р В»Р В°Р Р…РЎРѓРЎС“';
      default:
        return 'Р СџР С• РЎС“РЎР‚Р С•Р Р†Р Р…РЎР‹';
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
          // Р СџР В°РЎР‚РЎРѓР С‘Р С РЎвЂЎР С‘РЎРѓР В»Р С•Р Р†Р С•Р Вµ Р В·Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘Р Вµ Р С‘Р В· РЎРѓРЎвЂљРЎР‚Р С•Р С”Р С‘ Р В±Р В°Р В»Р В°Р Р…РЎРѓР В° Р Т‘Р В»РЎРЏ Р С—РЎР‚Р В°Р Р†Р С‘Р В»РЎРЉР Р…Р С•Р в„– РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С‘
          const balanceA = parseFloat(a.balance.replace(/[^\d.-]/g, '')) || 0;
          const balanceB = parseFloat(b.balance.replace(/[^\d.-]/g, '')) || 0;
          return balanceB - balanceA;
        default:
          return b.level - a.level;
      }
    });
  };

  const sortedUsers = sortUsers(users, dialogSortType);

  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С” Р С”Р В»Р С‘Р С”Р В° Р Р†Р Р…Р Вµ Р Р†РЎвЂ№Р С—Р В°Р Т‘Р В°РЎР‹РЎвЂ°Р ВµР С–Р С• Р СР ВµР Р…РЎР‹
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
        {/* Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓР ВµР С”РЎвЂ Р С‘РЎРЏ */}
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
              title="Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†"
            >
              <Clock className="w-4 h-4" />
            </button>
            <h3 
              className="font-medium text-center flex-1"
              style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
            >
              Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№
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
              title="Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»"
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
                    Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ {personalBattles[0].opponent.name}
                  </span>
                </div>
                <div 
                  className="text-xs text-center"
                  style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                >
                  Р РЋРЎвЂљР В°Р Р†Р С”Р В°: {personalBattles[0].prize}g
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('VICTORY BUTTON CLICKED!', personalBattles[0]);
                      
                      // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№ Р Р† Р В±Р В°РЎвЂљРЎвЂљР В»Р Вµ
                      if (setPersonalBattles) {
                        const updatedBattles = personalBattles.filter((_, index) => index !== 0);
                        setPersonalBattles(updatedBattles);
                        console.log('Р вЂР В°РЎвЂљРЎвЂљР В» Р В·Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р… Р С—Р С•Р В±Р ВµР Т‘Р С•Р в„–!');
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
                    Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('CANCEL BUTTON CLICKED!', personalBattles[0]);
                      
                      // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С•РЎвЂљР СР ВµР Р…РЎвЂ№ Р В±Р В°РЎвЂљРЎвЂљР В»Р В°
                      if (setPersonalBattles) {
                        const updatedBattles = personalBattles.filter((_, index) => index !== 0);
                        setPersonalBattles(updatedBattles);
                        console.log('Р вЂР В°РЎвЂљРЎвЂљР В» Р С•РЎвЂљР СР ВµР Р…Р ВµР Р…!');
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
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            ) : (
              <p 
                className="text-sm text-center opacity-70"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
              </p>
            )}
            </div>
          </div>
        </div>

        {/* Р вЂєР С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘ РЎРѓР ВµР С”РЎвЂ Р С‘РЎРЏ */}
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
              title={`Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В°: ${getSortTypeText(sortType)} (Р Р…Р В°Р В¶Р СР С‘РЎвЂљР Вµ Р Т‘Р В»РЎРЏ Р С‘Р В·Р СР ВµР Р…Р ВµР Р…Р С‘РЎРЏ)`}
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center">
              <h3 
                className="font-medium"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                Р вЂєР С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘
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
              title="Р вЂ™РЎРѓР Вµ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»Р С‘"
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
                      {sortType === 'level' && `Р Р€РЎР‚.${user.level}`}
                      {sortType === 'achievements' && `${user.achievements}РІВвЂ¦`}
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
                Р РЋР С—Р С‘РЎРѓР С•Р С” Р В»Р С‘Р Т‘Р ВµРЎР‚Р С•Р Р† Р С•РЎвЂљРЎРѓРЎС“РЎвЂљРЎРѓРЎвЂљР Р†РЎС“Р ВµРЎвЂљ
              </p>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р† */}
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
            Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р вЂ™Р В°РЎв‚¬Р С‘ Р С—РЎР‚Р С•РЎв‚¬Р В»РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№ Р В·Р В° РЎРЊРЎвЂљРЎС“ Р Р…Р ВµР Т‘Р ВµР В»РЎР‹ ({weeklyHistory.weekStart} - {weeklyHistory.weekEnd})
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
                  Р СњР В° РЎРЊРЎвЂљР С•Р в„– Р Р…Р ВµР Т‘Р ВµР В»Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р† Р Р…Р Вµ Р В±РЎвЂ№Р В»Р С•
                </p>
                <button 
                  onClick={handleAllTimeHistoryClick}
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  Р СџР С•РЎРѓР СР С•РЎвЂљРЎР‚Р ВµРЎвЂљРЎРЉ Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘РЎР‹ Р В·Р В° Р Р†РЎРѓР Вµ Р Р†РЎР‚Р ВµР СРЎРЏ
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Р РЋР С•Р В·Р Т‘Р В°Р Р…Р С‘Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»Р В° */}
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
            Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р вЂ™РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ РЎРѓР С•Р С—Р ВµРЎР‚Р Р…Р С‘Р С”Р В° Р Т‘Р В»РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р В°
          </DialogDescription>
          
          <div className="space-y-4">
            {/* Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚ Р С—Р С• Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р С */}
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
                {selectedTeamFilter ? `Р С™Р С•Р СР В°Р Р…Р Т‘Р В° ${selectedTeamFilter}` : 'Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№'}
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
                    Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№
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
                      Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {teamId}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
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
                        Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {employee.team}
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
                    {personalBattles.length > 0 ? 'Р вЂР В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С•' : 'Р вЂ™РЎвЂ№Р В·Р Р†Р В°РЎвЂљРЎРЉ'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р В° */}
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
            Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»Р В°
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р вЂ™РЎвЂ№Р В·Р Р†Р В°РЎвЂљРЎРЉ Р Р…Р В° Р В±Р В°РЎвЂљРЎвЂљР В» {selectedEmployee?.name}?
          </DialogDescription>
          
          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                Р РЋРЎвЂљР В°Р Р†Р С”Р В° (Р С”Р С•Р С‘Р Р…РЎвЂ№)
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
                Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р Т‘Р С‘РЎвЂљРЎРЉ
              </button>
              <button
                onClick={handleCancelBattleConfirm}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  background: theme === 'dark' ? '#2A3340' : '#E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р С›РЎвЂљР СР ВµР Р…Р В°
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р вЂ™РЎРѓР Вµ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»Р С‘ */}
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
            Р вЂ™РЎРѓР Вµ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»Р С‘
          </DialogTitle>
          <DialogDescription style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р СџР С•Р В»Р Р…РЎвЂ№Р в„– РЎРѓР С—Р С‘РЎРѓР С•Р С” РЎС“РЎвЂЎР В°РЎРѓРЎвЂљР Р…Р С‘Р С”Р С•Р Р† - {getSortTypeText(dialogSortType)}
          </DialogDescription>
          
          <div className="flex justify-between items-center mb-4">
            <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
              Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В°: {getSortTypeText(dialogSortType)}
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
                  {dialogSortType === 'level' && `Р Р€РЎР‚.${user.level}`}
                  {dialogSortType === 'achievements' && `${user.achievements}РІВвЂ¦`}
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
