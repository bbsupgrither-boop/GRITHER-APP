import { useState, useRef } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ModalOpaque } from './ModalOpaque';
import { Trophy, Clock, Users, Award, Calendar, User, ArrowRight, Check, Star, Plus, X, ArrowLeft, Paperclip, ChevronDown } from './Icons';

interface BattlesPageExtendedProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  personalBattles?: any[];
  setPersonalBattles?: (battles: any[]) => void;
  theme?: 'light' | 'dark';
}

interface Employee {
  id: string;
  name: string;
  team: number;
  level: number;
  avatar: string | null;
  status: 'available' | 'in_battle';
  role: string;
  achievements: number;
  completedTasks: number;
}

interface Battle {
  id: string;
  challenger?: {
    id: string;
    name: string;
    team: number;
    level: number;
    avatar: string | null;
    role: string;
    achievements: number;
    completedTasks: number;
  };
  opponent: Employee;
  status: 'active' | 'pending' | 'completed';
  prize: number;
  endDate: Date;
  created: Date;
}

export function BattlesPageExtended({ onNavigate, currentPage, onOpenSettings, profilePhoto, personalBattles = [], setPersonalBattles, theme = 'light' }: BattlesPageExtendedProps) {
  // РћС‚Р»Р°РґРѕС‡РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ
  console.log('BattlesPageExtended rendered with personalBattles:', personalBattles);
  console.log('setPersonalBattles function:', setPersonalBattles);
  
  // РЎРѕР·РґР°РµРј РјРѕРє-РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё
  const currentUser = {
    id: 'user1',
    name: 'РРІР°РЅ РРІР°РЅРѕРІ',
    username: '@iivanov'
  };
  
  // Mock РґР°РЅРЅС‹Рµ СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ СЃ РєРѕРјР°РЅРґР°РјРё (С‚РѕР»СЊРєРѕ 1-6 РєРѕРјР°РЅРґС‹ РјРѕРіСѓС‚ Р±Р°С‚С‚Р»РёС‚СЊСЃСЏ)
  const employees: Employee[] = [
    { id: '1', name: 'РђРЅРЅР° РРІР°РЅРѕРІР°', team: 1, level: 5, avatar: null, status: 'available', role: 'Р”РёР·Р°Р№РЅРµСЂ', achievements: 12, completedTasks: 48 },
    { id: '2', name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ', team: 1, level: 7, avatar: null, status: 'in_battle', role: 'Р Р°Р·СЂР°Р±РѕС‚С‡РёРє', achievements: 18, completedTasks: 67 },
    { id: '3', name: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°', team: 2, level: 6, avatar: null, status: 'available', role: 'РђРЅР°Р»РёС‚РёРє', achievements: 15, completedTasks: 52 },
    { id: '4', name: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ', team: 2, level: 8, avatar: null, status: 'available', role: 'РўРёРјР»РёРґ', achievements: 22, completedTasks: 78 },
    { id: '5', name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', team: 3, level: 4, avatar: null, status: 'available', role: 'РњР°СЂРєРµС‚РѕР»РѕРі', achievements: 9, completedTasks: 34 },
    { id: '6', name: 'Р”РјРёС‚СЂРёР№ Р’РѕР»РєРѕРІ', team: 3, level: 9, avatar: null, status: 'available', role: 'РђСЂС…РёС‚РµРєС‚РѕСЂ', achievements: 25, completedTasks: 89 },
    { id: '7', name: 'РћР»СЊРіР° РЎРѕРєРѕР»РѕРІР°', team: 4, level: 5, avatar: null, status: 'available', role: 'UX/UI', achievements: 14, completedTasks: 41 },
    { id: '8', name: 'РЎРµСЂРіРµР№ РћСЂР»РѕРІ', team: 4, level: 6, avatar: null, status: 'in_battle', role: 'DevOps', achievements: 16, completedTasks: 55 },
    { id: '9', name: 'РњРёС…Р°РёР» Р С‹Р±Р°РєРѕРІ', team: 5, level: 7, avatar: null, status: 'available', role: 'QA', achievements: 19, completedTasks: 63 },
    { id: '10', name: 'РўР°С‚СЊСЏРЅР° Р‘РµР»РѕРІР°', team: 5, level: 5, avatar: null, status: 'available', role: 'РњРµРЅРµРґР¶РµСЂ', achievements: 11, completedTasks: 45 },
    { id: '11', name: 'Р’Р»Р°РґРёРјРёСЂ РќРѕРІРёРєРѕРІ', team: 6, level: 8, avatar: null, status: 'available', role: 'Backend', achievements: 21, completedTasks: 72 },
    { id: '12', name: 'Р•РєР°С‚РµСЂРёРЅР° РџРѕРїРѕРІР°', team: 6, level: 6, avatar: null, status: 'available', role: 'Frontend', achievements: 17, completedTasks: 58 },
  ];
  
  // РЎРѕСЃС‚РѕСЏРЅРёСЏ РјРѕРґР°Р»СЊРЅС‹С… РѕРєРѕРЅ
  const [isEmployeeSelectOpen, setIsEmployeeSelectOpen] = useState(false);
  const [isBattleConfirmOpen, setIsBattleConfirmOpen] = useState(false);
  const [isEmployeeDetailOpen, setIsEmployeeDetailOpen] = useState(false);
  const [isCancelBattleOpen, setIsCancelBattleOpen] = useState(false);
  const [isVictorySubmitOpen, setIsVictorySubmitOpen] = useState(false);

  // РЎРѕСЃС‚РѕСЏРЅРёСЏ РґР»СЏ РІС‹Р±РѕСЂР° СЃРѕС‚СЂСѓРґРЅРёРєР°
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [isTeamSelectOpen, setIsTeamSelectOpen] = useState(false);

  // РЎРѕСЃС‚РѕСЏРЅРёСЏ РґР»СЏ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ РїРѕР±РµРґС‹
  const [victoryComment, setVictoryComment] = useState('');
  const [victoryFile1, setVictoryFile1] = useState<File | null>(null);
  const [victoryFile2, setVictoryFile2] = useState<File | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<any | null>(null);

  // РЎРѕСЃС‚РѕСЏРЅРёСЏ РЅР°РІРёРіР°С†РёРё
  const [activeTab, setActiveTab] = useState<'battles' | 'employees'>('employees');

  // Refs РґР»СЏ С„Р°Р№Р»РѕРІ
  const file1InputRef = useRef<HTMLInputElement>(null);
  const file2InputRef = useRef<HTMLInputElement>(null);

  // РџСЂРѕРІРµСЂСЏРµРј РµСЃС‚СЊ Р»Рё Сѓ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ Р°РєС‚РёРІРЅС‹Р№ Р±Р°С‚С‚Р»
  const hasActiveBattle = personalBattles.length > 0;

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ С‚РµСЃС‚РѕРІРѕРіРѕ Р±Р°С‚С‚Р»Р°
  const createTestBattle = () => {
    if (!setPersonalBattles) return;
    
    const testBattle = {
      id: 'test-' + Date.now().toString(),
      challenger: {
        id: 'current-user',
        name: 'РРІР°РЅ РРІР°РЅРѕРІ',
        team: 1,
        level: 5,
        avatar: null,
        role: 'РЎРѕС‚СЂСѓРґРЅРёРє',
        achievements: 10,
        completedTasks: 25
      },
      opponent: {
        id: 'test-opponent',
        name: 'РўРµСЃС‚ РћРїРїРѕРЅРµРЅС‚',
        team: 2,
        level: 7,
        avatar: null,
        status: 'available' as const,
        role: 'РўРµСЃС‚РµСЂ',
        achievements: 15,
        completedTasks: 30
      },
      status: 'active' as const,
      prize: 1000,
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 РґРµРЅСЊ
      created: new Date()
    };
    
    console.log('Creating test battle:', testBattle);
    setPersonalBattles([...personalBattles, testBattle]);
  };

  // Р¤РёР»СЊС‚СЂСѓРµРј СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РїРѕ РІС‹Р±СЂР°РЅРЅРѕР№ РєРѕРјР°РЅРґРµ (С‚РѕР»СЊРєРѕ РєРѕРјР°РЅРґС‹ 1-6)
  const filteredEmployees = selectedTeam 
    ? employees.filter(emp => emp.team === selectedTeam)
    : employees.filter(emp => emp.team >= 1 && emp.team <= 6);

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Р’СЂРµРјСЏ РёСЃС‚РµРєР»Рѕ';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}Рґ ${hours}С‡`;
    } else {
      return `${hours}С‡`;
    }
  };

  // РћР±СЂР°Р±РѕС‚С‡РёРєРё
  const handleEmployeeSelect = (employee: Employee) => {
    if (hasActiveBattle || employee.status === 'in_battle') return;
    setSelectedEmployee(employee);
    setIsBattleConfirmOpen(true);
    setIsEmployeeSelectOpen(false);
  };

  const handleBattleConfirm = () => {
    if (!selectedEmployee || !setPersonalBattles) return;
    
    const newBattle = {
      id: Date.now().toString(),
      challenger: {
        id: 'current-user',
        name: 'РРІР°РЅ РРІР°РЅРѕРІ',
        team: 1,
        level: 5,
        avatar: null,
        role: 'РЎРѕС‚СЂСѓРґРЅРёРє',
        achievements: 10,
        completedTasks: 25
      },
      opponent: selectedEmployee,
      status: 'active',
      prize: 500,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      created: new Date()
    };

    setPersonalBattles([...personalBattles, newBattle]);
    setIsBattleConfirmOpen(false);
    setSelectedEmployee(null);
  };

  const handleBattleCancel = () => {
    setIsBattleConfirmOpen(false);
    setSelectedEmployee(null);
  };

  const handleCancelBattle = (battle: any) => {
    console.log('Cancel battle clicked for battle:', battle);
    setSelectedBattle(battle);
    setIsCancelBattleOpen(true);
  };

  const confirmCancelBattle = () => {
    if (!selectedBattle || !setPersonalBattles) return;
    console.log('Confirming battle cancellation for:', selectedBattle);
    setPersonalBattles(personalBattles.filter(b => b.id !== selectedBattle.id));
    setIsCancelBattleOpen(false);
    setSelectedBattle(null);
  };

  const handleEmployeeDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeDetailOpen(true);
  };

  const handleVictorySubmit = (battle: any) => {
    console.log('Victory submit clicked for battle:', battle);
    setSelectedBattle(battle);
    setIsVictorySubmitOpen(true);
  };

  const submitVictoryProof = () => {
    if (!victoryFile1 || !victoryFile2 || !selectedBattle) return;
    
    console.log('Р”РѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІР° РїРѕР±РµРґС‹ РѕС‚РїСЂР°РІР»РµРЅС‹ РЅР° РїСЂРѕРІРµСЂРєСѓ Р°РґРјРёРЅР°Рј:', {
      battleId: selectedBattle.id,
      opponent: selectedBattle.opponent.name,
      comment: victoryComment,
      file1: victoryFile1.name,
      file2: victoryFile2.name,
      submittedAt: new Date().toISOString()
    });

    // РЎР±СЂРѕСЃ С„РѕСЂРјС‹
    setVictoryComment('');
    setVictoryFile1(null);
    setVictoryFile2(null);
    setIsVictorySubmitOpen(false);
    setSelectedBattle(null);

    // Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ toast СѓРІРµРґРѕРјР»РµРЅРёРµ РѕР± РѕС‚РїСЂР°РІРєРµ
    alert('Р”РѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІР° РѕС‚РїСЂР°РІР»РµРЅС‹ РЅР° РїСЂРѕРІРµСЂРєСѓ Р°РґРјРёРЅР°Рј!');
  };

  const handleFileUpload = (fileNumber: 1 | 2) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileNumber === 1) {
        setVictoryFile1(file);
      } else {
        setVictoryFile2(file);
      }
    }
  };

  const canSubmitVictory = victoryFile1 && victoryFile2;

  return (
    <>
      <div 
        className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          background: 'transparent',
          color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
        }}
      >
        {/* Header */}
        <Header 
          onNavigate={onNavigate} 
          currentPage={currentPage} 
          onOpenSettings={onOpenSettings}
          user={currentUser}
          profilePhoto={profilePhoto}
          theme={theme}
        />
        
        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 pb-24">
          <div 
            className="glass-card rounded-2xl flex flex-col apple-shadow" 
            style={{ minHeight: '500px' }}
          >
            {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєРЅРѕРїРєРѕР№ + */}
            <div 
              className="flex items-center justify-between p-6"
              style={{
                borderBottom: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF'
              }}
            >
              <div className="w-8"></div>
              <h2 
                className="text-lg font-medium flex-1 text-center"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р‘Р°С‚С‚Р»С‹
              </h2>
              <button
                onClick={() => setIsEmployeeSelectOpen(true)}
                disabled={false}
                className="transition-all hover:scale-105"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark'
                    ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <Plus 
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    color: theme === 'dark' ? '#1A1A1A' : '#6B7280'
                  }} 
                />
              </button>
            </div>

            {/* Р’РєР»Р°РґРєРё */}
            <div className="px-6 py-4">
              <div 
                className="flex gap-2 p-1 rounded-2xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <button
                  onClick={() => setActiveTab('employees')}
                  className="px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all"
                  style={activeTab === 'employees' ? {
                    background: theme === 'dark' 
                      ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)'
                      : '#000000',
                    color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                    boxShadow: theme === 'dark'
                      ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.06)'
                  } : {
                    background: 'transparent',
                    color: theme === 'dark' ? '#FFFFFF' : '#6B7280'
                  }}
                >
                  РЎРѕС‚СЂСѓРґРЅРёРєРё
                </button>
                <button
                  onClick={() => setActiveTab('battles')}
                  className="px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all"
                  style={activeTab === 'battles' ? {
                    background: theme === 'dark' 
                      ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)'
                      : '#000000',
                    color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                    boxShadow: theme === 'dark'
                      ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.06)'
                  } : {
                    background: 'transparent',
                    color: theme === 'dark' ? '#FFFFFF' : '#6B7280'
                  }}
                >
                  Р‘Р°С‚С‚Р»С‹ ({personalBattles.length})
                </button>
              </div>
            </div>
            
            {/* РљРѕРЅС‚РµРЅС‚ */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {activeTab === 'employees' ? (
                // РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ
                <div className="space-y-4">
                  {/* Р¤РёР»СЊС‚СЂ РїРѕ РєРѕРјР°РЅРґР°Рј */}
                  <div className="relative">
                    <button
                      onClick={() => setIsTeamSelectOpen(!isTeamSelectOpen)}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-sm"
                      style={{
                        backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                        border: theme === 'dark' 
                          ? '1px solid rgba(255, 255, 255, 0.06)' 
                          : '1px solid #E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      <span>
                        {selectedTeam ? `РљРѕРјР°РЅРґР° ${selectedTeam}` : 'Р’СЃРµ РєРѕРјР°РЅРґС‹ (1-6)'}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isTeamSelectOpen && (
                      <div 
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg z-10"
                        style={{
                          backgroundColor: theme === 'dark' ? '#202734' : '#FFFFFF',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <button
                          onClick={() => {
                            setSelectedTeam(null);
                            setIsTeamSelectOpen(false);
                          }}
                          className="w-full text-left p-3 text-sm hover:bg-opacity-50 transition-colors"
                          style={{
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                          }}
                        >
                          Р’СЃРµ РєРѕРјР°РЅРґС‹ (1-6)
                        </button>
                        {[1, 2, 3, 4, 5, 6].map(team => (
                          <button
                            key={team}
                            onClick={() => {
                              setSelectedTeam(team);
                              setIsTeamSelectOpen(false);
                            }}
                            className="w-full text-left p-3 text-sm hover:bg-opacity-50 transition-colors"
                            style={{
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                            }}
                          >
                            РљРѕРјР°РЅРґР° {team}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ СЃ РїРѕСЏСЃРЅРµРЅРёРµРј */}
                  {filteredEmployees.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div 
                        className="rounded-xl p-6 text-center"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <Users 
                          className="w-12 h-12 mx-auto mb-4"
                          style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                        />
                        <p 
                          className="text-sm opacity-70"
                          style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                        >
                          РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredEmployees.map((employee) => (
                        <div
                          key={employee.id}
                          className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                          style={{
                            backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                            border: theme === 'dark' 
                              ? '1px solid rgba(255, 255, 255, 0.06)' 
                              : '1px solid #E6E9EF'
                          }}
                          onClick={() => handleEmployeeDetail(employee)}
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                              border: theme === 'dark' 
                                ? '1px solid #2A2F36' 
                                : '1px solid #E6E9EF'
                            }}
                          >
                            <span className="text-lg">{employee.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div 
                              className="font-medium"
                              style={{
                                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                              }}
                            >
                              {employee.name}
                            </div>
                            <div 
                              className="text-sm"
                              style={{
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}
                            >
                              РљРѕРјР°РЅРґР° {employee.team} вЂў РЈСЂРѕРІРµРЅСЊ {employee.level}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmployeeSelect(employee);
                            }}
                            disabled={hasActiveBattle || employee.status === 'in_battle'}
                            className={`transition-all ${
                              hasActiveBattle || employee.status === 'in_battle' 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:scale-105'
                            }`}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: hasActiveBattle || employee.status === 'in_battle'
                                ? (theme === 'dark' ? '#4A5568' : '#9CA3AF')
                                : '#2B82FF',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Plus 
                              style={{ 
                                width: '16px', 
                                height: '16px', 
                                color: '#FFFFFF'
                              }} 
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // РЎРїРёСЃРѕРє Р±Р°С‚С‚Р»РѕРІ
                personalBattles && personalBattles.length > 0 ? (
                  <div className="space-y-4">
                    {personalBattles.map((battle, index) => {
                      console.log(`Rendering battle ${index}:`, battle);
                      return (
                      <div
                        key={battle.id}
                        className="rounded-2xl p-4 transition-all"
                        style={{
                          backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                              border: theme === 'dark' 
                                ? '1px solid #2A2F36' 
                                : '1px solid #E6E9EF'
                            }}
                          >
                            <span className="text-xl">{battle.opponent?.name?.charAt(0) || '?'}</span>
                          </div>
                          <div className="flex-1">
                            <div 
                              className="font-medium"
                              style={{
                                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                              }}
                            >
                              {battle.opponent?.name}
                            </div>
                            <div 
                              className="text-sm"
                              style={{
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}
                            >
                              РљРѕРјР°РЅРґР° {battle.opponent?.team} вЂў РЈСЂРѕРІРµРЅСЊ {battle.opponent?.level}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-4 h-4" style={{ color: '#FFD700' }} />
                              <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                                {battle.prize}g
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                              <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                                {formatTimeRemaining(battle.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Victory button clicked!', battle);
                              handleVictorySubmit(battle);
                            }}
                            className="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                            style={{
                              background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                              color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                              boxShadow: theme === 'dark' 
                                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                                : 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Р’С‹РёРіСЂР°Р» РЅР° Р±Р°С‚С‚Р»
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Cancel button clicked!', battle);
                              handleCancelBattle(battle);
                            }}
                            className="py-2 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                            style={{
                              background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#FEF2F2',
                              color: theme === 'dark' ? '#EF4444' : '#EF4444',
                              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #EF4444',
                              boxShadow: theme === 'dark' 
                                ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                                : 'none',
                              cursor: 'pointer'
                            }}
                          >
                            РћС‚РјРµРЅРёС‚СЊ
                          </button>
                        </div>
                      </div>
                    );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-[200px]">
                    <div 
                      className="rounded-xl p-6 text-center"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <Trophy 
                        className="w-12 h-12 mx-auto mb-4"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      />
                      <p 
                        className="text-sm opacity-70 mb-4"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      >
                        РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ
                      </p>
                      <button
                        onClick={createTestBattle}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                        style={{
                          background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                          color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                          boxShadow: theme === 'dark' 
                            ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                            : 'none'
                        }}
                      >
                        РЎРѕР·РґР°С‚СЊ С‚РµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р»
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} theme={theme} />
      </div>

      {/* РњРѕРґР°Р»СЊРЅС‹Рµ РѕРєРЅР° */}
      
      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РІС‹Р±РѕСЂР° СЃРѕС‚СЂСѓРґРЅРёРєР° */}
      {isEmployeeSelectOpen && (
        <ModalOpaque 
          isOpen={isEmployeeSelectOpen}
          onClose={() => setIsEmployeeSelectOpen(false)}
          theme={theme}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsEmployeeSelectOpen(false)}
                className="p-2 rounded-full transition-colors"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 
                className="text-lg font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р’С‹Р±СЂР°С‚СЊ РїСЂРѕС‚РёРІРЅРёРєР°
              </h2>
              <div className="w-10"></div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee)}
                  disabled={employee.status === 'in_battle'}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    employee.status === 'in_battle' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[0.98]'
                  }`}
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                      border: theme === 'dark' 
                        ? '1px solid #2A2F36' 
                        : '1px solid #E6E9EF'
                    }}
                  >
                    <span className="text-lg">{employee.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="font-medium"
                      style={{
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      {employee.name}
                    </div>
                    <div 
                      className="text-sm"
                      style={{
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      {employee.role} вЂў РљРѕРјР°РЅРґР° {employee.team} вЂў РЈСЂРѕРІРµРЅСЊ {employee.level}
                    </div>
                    {employee.status === 'in_battle' && (
                      <div 
                        className="text-xs mt-1"
                        style={{
                          color: theme === 'dark' ? '#FF6B6B' : '#EF4444'
                        }}
                      >
                        РЈР¶Рµ РІ Р±Р°С‚С‚Р»Рµ
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div 
                      className="flex items-center gap-1"
                      style={{
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      <Award className="w-4 h-4" />
                      <span>{employee.achievements}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ModalOpaque>
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ Р±Р°С‚С‚Р»Р° */}
      {isBattleConfirmOpen && selectedEmployee && (
        <ModalOpaque 
          isOpen={isBattleConfirmOpen}
          onClose={() => setIsBattleConfirmOpen(false)}
          theme={theme}
        >
          <div className="p-6 text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' 
                  ? '2px solid #2A2F36' 
                  : '2px solid #E6E9EF'
              }}
            >
              <span className="text-2xl">{selectedEmployee.name.charAt(0)}</span>
            </div>
            
            <h3 
              className="text-lg font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р’С‹Р·РІР°С‚СЊ РЅР° Р±Р°С‚С‚Р»?
            </h3>
            
            <p 
              className="text-sm mb-6"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              {selectedEmployee.name} РёР· РєРѕРјР°РЅРґС‹ {selectedEmployee.team}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleBattleCancel}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                style={{
                  backgroundColor: theme === 'dark' ? '#2A2F36' : '#F3F5F8',
                  color: theme === 'dark' ? '#E8ECF2' : '#6B7280',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                РћС‚РјРµРЅР°
              </button>
              <button
                onClick={handleBattleConfirm}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                style={{
                  background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                  color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : 'none'
                }}
              >
                Р’С‹Р·РІР°С‚СЊ
              </button>
            </div>
          </div>
        </ModalOpaque>
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґРµС‚Р°Р»РµР№ СЃРѕС‚СЂСѓРґРЅРёРєР° */}
      {isEmployeeDetailOpen && selectedEmployee && (
        <ModalOpaque 
          isOpen={isEmployeeDetailOpen}
          onClose={() => setIsEmployeeDetailOpen(false)}
          theme={theme}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsEmployeeDetailOpen(false)}
                className="p-2 rounded-full transition-colors"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 
                className="text-lg font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РџСЂРѕС„РёР»СЊ СЃРѕС‚СЂСѓРґРЅРёРєР°
              </h2>
              <div className="w-10"></div>
            </div>

            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '2px solid #2A2F36' 
                    : '2px solid #E6E9EF'
                }}
              >
                <span className="text-3xl">{selectedEmployee.name.charAt(0)}</span>
              </div>
              
              <h3 
                className="text-xl font-medium mb-1"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                {selectedEmployee.name}
              </h3>
              
              <p 
                className="text-sm"
                style={{
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                {selectedEmployee.role}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div 
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <span 
                  style={{
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  РљРѕРјР°РЅРґР°
                </span>
                <span 
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  {selectedEmployee.team}
                </span>
              </div>
              
              <div 
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <span 
                  style={{
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  РЈСЂРѕРІРµРЅСЊ
                </span>
                <span 
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  {selectedEmployee.level}
                </span>
              </div>
              
              <div 
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <span 
                  style={{
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  Р”РѕСЃС‚РёР¶РµРЅРёСЏ
                </span>
                <span 
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  {selectedEmployee.achievements}
                </span>
              </div>
              
              <div 
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <span 
                  style={{
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  Р’С‹РїРѕР»РЅРµРЅРЅС‹Рµ Р·Р°РґР°С‡Рё
                </span>
                <span 
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  {selectedEmployee.completedTasks}
                </span>
              </div>
            </div>

            {!hasActiveBattle && selectedEmployee.status === 'available' && (
              <button
                onClick={() => {
                  setIsEmployeeDetailOpen(false);
                  handleEmployeeSelect(selectedEmployee);
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                style={{
                  background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                  color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : 'none'
                }}
              >
                Р’С‹Р·РІР°С‚СЊ РЅР° Р±Р°С‚С‚Р»
              </button>
            )}
          </div>
        </ModalOpaque>
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕС‚РјРµРЅС‹ Р±Р°С‚С‚Р»Р° */}
      {isCancelBattleOpen && selectedBattle && (
        <ModalOpaque 
          isOpen={isCancelBattleOpen}
          onClose={() => setIsCancelBattleOpen(false)}
          theme={theme}
        >
          <div className="p-6 text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                backgroundColor: theme === 'dark' ? '#FF6B6B20' : '#FEF2F2',
                border: theme === 'dark' 
                  ? '2px solid #FF6B6B40' 
                  : '2px solid #FECACA'
              }}
            >
              <X className="w-8 h-8" style={{ color: '#EF4444' }} />
            </div>
            
            <h3 
              className="text-lg font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              РћС‚РјРµРЅРёС‚СЊ Р±Р°С‚С‚Р»?
            </h3>
            
            <p 
              className="text-sm mb-6"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р‘Р°С‚С‚Р» СЃ {selectedBattle.opponent?.name} Р±СѓРґРµС‚ РѕС‚РјРµРЅС‘РЅ
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsCancelBattleOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                style={{
                  backgroundColor: theme === 'dark' ? '#2A2F36' : '#F3F5F8',
                  color: theme === 'dark' ? '#E8ECF2' : '#6B7280',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                РћС‚РјРµРЅР°
              </button>
              <button
                onClick={confirmCancelBattle}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[0.98]"
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  border: 'none'
                }}
              >
                РћС‚РјРµРЅРёС‚СЊ Р±Р°С‚С‚Р»
              </button>
            </div>
          </div>
        </ModalOpaque>
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ РїРѕР±РµРґС‹ */}
      {isVictorySubmitOpen && selectedBattle && (
        <ModalOpaque 
          isOpen={isVictorySubmitOpen}
          onClose={() => setIsVictorySubmitOpen(false)}
          theme={theme}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsVictorySubmitOpen(false)}
                className="p-2 rounded-full transition-colors"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 
                className="text-lg font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РџРѕРґС‚РІРµСЂРґРёС‚СЊ РїРѕР±РµРґСѓ
              </h2>
              <div className="w-10"></div>
            </div>

            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: theme === 'dark' ? '#34C75920' : '#F0F9F0',
                  border: theme === 'dark' 
                    ? '2px solid #34C75940' 
                    : '2px solid #BBF7D0'
                }}
              >
                <Trophy className="w-8 h-8" style={{ color: '#FFD700' }} />
              </div>
              
              <h3 
                className="text-lg font-medium mb-1"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РџРѕР±РµРґР° РЅР°Рґ {selectedBattle.opponent?.name}
              </h3>
              
              <p 
                className="text-sm"
                style={{
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                РџСЂРёР»РѕР¶РёС‚Рµ 2 С„Р°Р№Р»Р° РІ РєР°С‡РµСЃС‚РІРµ РґРѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІР°
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  РљРѕРјРјРµРЅС‚Р°СЂРёР№ (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)
                </label>
                <textarea
                  value={victoryComment}
                  onChange={(e) => setVictoryComment(e.target.value)}
                  placeholder="РћРїРёСЃР°РЅРёРµ РїРѕР±РµРґС‹..."
                  className="w-full p-3 rounded-xl text-sm resize-none"
                  rows={3}
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                />
              </div>
              
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Р¤Р°Р№Р» 1 *
                </label>
                <div
                  onClick={() => file1InputRef.current?.click()}
                  className="flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all hover:scale-[0.98] min-h-[60px]"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? `2px dashed ${victoryFile1 ? '#34C759' : 'rgba(255, 255, 255, 0.06)'}` 
                      : `2px dashed ${victoryFile1 ? '#34C759' : '#E6E9EF'}`
                  }}
                >
                  {victoryFile1 ? (
                    <div className="text-center">
                      <Check className="w-6 h-6 mx-auto mb-1" style={{ color: '#34C759' }} />
                      <p 
                        className="text-sm font-medium"
                        style={{ color: '#34C759' }}
                      >
                        {victoryFile1.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Paperclip className="w-6 h-6 mx-auto mb-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                      <p 
                        className="text-sm"
                        style={{
                          color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                        }}
                      >
                        Р’С‹Р±РµСЂРёС‚Рµ С„Р°Р№Р»
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={file1InputRef}
                  type="file"
                  onChange={handleFileUpload(1)}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
              </div>
              
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Р¤Р°Р№Р» 2 *
                </label>
                <div
                  onClick={() => file2InputRef.current?.click()}
                  className="flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all hover:scale-[0.98] min-h-[60px]"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? `2px dashed ${victoryFile2 ? '#34C759' : 'rgba(255, 255, 255, 0.06)'}` 
                      : `2px dashed ${victoryFile2 ? '#34C759' : '#E6E9EF'}`
                  }}
                >
                  {victoryFile2 ? (
                    <div className="text-center">
                      <Check className="w-6 h-6 mx-auto mb-1" style={{ color: '#34C759' }} />
                      <p 
                        className="text-sm font-medium"
                        style={{ color: '#34C759' }}
                      >
                        {victoryFile2.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Paperclip className="w-6 h-6 mx-auto mb-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                      <p 
                        className="text-sm"
                        style={{
                          color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                        }}
                      >
                        Р’С‹Р±РµСЂРёС‚Рµ С„Р°Р№Р»
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={file2InputRef}
                  type="file"
                  onChange={handleFileUpload(2)}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
              </div>
            </div>

            <button
              onClick={submitVictoryProof}
              disabled={!canSubmitVictory}
              className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                canSubmitVictory ? 'hover:scale-[0.98]' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{
                background: canSubmitVictory 
                  ? (theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF')
                  : (theme === 'dark' ? '#4A5568' : '#9CA3AF'),
                color: canSubmitVictory 
                  ? (theme === 'dark' ? '#1A1A1A' : '#FFFFFF')
                  : '#FFFFFF',
                border: theme === 'dark' && canSubmitVictory ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                boxShadow: theme === 'dark' && canSubmitVictory
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : 'none'
              }}
            >
              РћС‚РїСЂР°РІРёС‚СЊ РЅР° РїСЂРѕРІРµСЂРєСѓ
            </button>
          </div>
        </ModalOpaque>
      )}
    </>
  );
}
