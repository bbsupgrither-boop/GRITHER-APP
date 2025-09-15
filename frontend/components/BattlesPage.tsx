п»їimport { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ModalOpaque } from './ModalOpaque';
import { Trophy, Clock, Users, Award, Calendar, User, ArrowRight, Check, Star, Plus, X, ArrowLeft, Paperclip, ChevronDown } from './Icons';

import { mockAppState } from '../data/mockData';

interface BattlesPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  theme?: 'light' | 'dark';
}

export function BattlesPage({ onNavigate, currentPage, onOpenSettings, profilePhoto, theme = 'light' }: BattlesPageProps) {
  const currentUser = mockAppState.currentUser;
  
  // Mock Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† РЎРѓ Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р СР С‘
  const employees = [
    { id: '1', name: 'Р С’Р Р…Р Р…Р В° Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°', team: 1, level: 5, avatar: null, status: 'available' },
    { id: '2', name: 'Р СџР ВµРЎвЂљРЎР‚ Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†', team: 1, level: 7, avatar: null, status: 'in_battle' },
    { id: '3', name: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†Р В°', team: 2, level: 6, avatar: null, status: 'available' },
    { id: '4', name: 'Р С’Р В»Р ВµР С”РЎРѓР ВµР в„– Р С™Р С•Р В·Р В»Р С•Р Р†', team: 2, level: 8, avatar: null, status: 'available' },
    { id: '5', name: 'Р вЂўР В»Р ВµР Р…Р В° Р СљР С•РЎР‚Р С•Р В·Р С•Р Р†Р В°', team: 3, level: 4, avatar: null, status: 'available' },
    { id: '6', name: 'Р вЂќР СР С‘РЎвЂљРЎР‚Р С‘Р в„– Р вЂ™Р С•Р В»Р С”Р С•Р Р†', team: 3, level: 9, avatar: null, status: 'available' },
    { id: '7', name: 'Р С›Р В»РЎРЉР С–Р В° Р РЋР С•Р С”Р С•Р В»Р С•Р Р†Р В°', team: 4, level: 5, avatar: null, status: 'available' },
    { id: '8', name: 'Р РЋР ВµРЎР‚Р С–Р ВµР в„– Р С›РЎР‚Р В»Р С•Р Р†', team: 4, level: 6, avatar: null, status: 'in_battle' },
    { id: '9', name: 'Р СљР С‘РЎвЂ¦Р В°Р С‘Р В» Р В РЎвЂ№Р В±Р В°Р С”Р С•Р Р†', team: 5, level: 7, avatar: null, status: 'available' },
    { id: '10', name: 'Р СћР В°РЎвЂљРЎРЉРЎРЏР Р…Р В° Р вЂР ВµР В»Р С•Р Р†Р В°', team: 5, level: 5, avatar: null, status: 'available' },
    { id: '11', name: 'Р вЂ™Р В»Р В°Р Т‘Р С‘Р СР С‘РЎР‚ Р СњР С•Р Р†Р С‘Р С”Р С•Р Р†', team: 6, level: 8, avatar: null, status: 'available' },
    { id: '12', name: 'Р вЂўР С”Р В°РЎвЂљР ВµРЎР‚Р С‘Р Р…Р В° Р СџР С•Р С—Р С•Р Р†Р В°', team: 6, level: 6, avatar: null, status: 'available' },
  ];
  
  // Mock Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
  const [activeBattles, setActiveBattles] = useState([
    {
      id: '1',
      opponent: employees.find(e => e.id === '2'),
      status: 'active',
      prize: 500,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘РЎРЏ Р СР С•Р Т‘Р В°Р В»РЎРЉР Р…РЎвЂ№РЎвЂ¦ Р С•Р С”Р С•Р Р…
  const [isEmployeeSelectOpen, setIsEmployeeSelectOpen] = useState(false);
  const [isBattleConfirmOpen, setIsBattleConfirmOpen] = useState(false);
  const [isEmployeeDetailOpen, setIsEmployeeDetailOpen] = useState(false);
  const [isCancelBattleOpen, setIsCancelBattleOpen] = useState(false);
  const [isVictorySubmitOpen, setIsVictorySubmitOpen] = useState(false);

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В°
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [isTeamSelectOpen, setIsTeamSelectOpen] = useState(false);

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—Р С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘РЎРЏ Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№
  const [victoryComment, setVictoryComment] = useState('');
  const [victoryFile1, setVictoryFile1] = useState<File | null>(null);
  const [victoryFile2, setVictoryFile2] = useState<File | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<any>(null);

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘РЎРЏ Р Р…Р В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘Р С‘
  const [activeTab, setActiveTab] = useState<'battles' | 'employees'>('battles');

  // Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЏР ВµР С Р ВµРЎРѓРЎвЂљРЎРЉ Р В»Р С‘ РЎС“ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В»
  const hasActiveBattle = activeBattles.length > 0;

  // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚РЎС“Р ВµР С РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р С—Р С• Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…Р Р…Р С•Р в„– Р С”Р С•Р СР В°Р Р…Р Т‘Р Вµ
  const filteredEmployees = selectedTeam 
    ? employees.filter(emp => emp.team === selectedTeam)
    : employees.filter(emp => emp.team >= 1 && emp.team <= 6);

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Р вЂ™РЎР‚Р ВµР СРЎРЏ Р С‘РЎРѓРЎвЂљР ВµР С”Р В»Р С•';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}Р Т‘ ${hours}РЎвЂЎ`;
    } else {
      return `${hours}РЎвЂЎ`;
    }
  };

  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С”Р С‘
  const handleEmployeeSelect = (employee: any) => {
    if (hasActiveBattle || employee.status === 'in_battle') return;
    setSelectedEmployee(employee);
    setIsBattleConfirmOpen(true);
  };

  const handleBattleConfirm = () => {
    if (!selectedEmployee) return;
    
    const newBattle = {
      id: Date.now().toString(),
      opponent: selectedEmployee,
      status: 'active',
      prize: 500,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      created: new Date()
    };

    setActiveBattles([...activeBattles, newBattle]);
    setIsBattleConfirmOpen(false);
    setIsEmployeeSelectOpen(false);
    setSelectedEmployee(null);
  };

  const handleCancelBattle = (battle: any) => {
    setSelectedBattle(battle);
    setIsCancelBattleOpen(true);
  };

  const confirmCancelBattle = () => {
    if (!selectedBattle) return;
    setActiveBattles(activeBattles.filter(b => b.id !== selectedBattle.id));
    setIsCancelBattleOpen(false);
    setSelectedBattle(null);
  };

  const handleEmployeeDetail = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEmployeeDetailOpen(true);
  };

  const handleVictorySubmit = (battle: any) => {
    setSelectedBattle(battle);
    setIsVictorySubmitOpen(true);
  };

  const submitVictoryProof = () => {
    if (!victoryFile1 || !victoryFile2) return;
    
    console.log('Р вЂќР С•Р С”Р В°Р В·Р В°РЎвЂљР ВµР В»РЎРЉРЎРѓРЎвЂљР Р†Р В° Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…РЎвЂ№:', {
      battle: selectedBattle.id,
      comment: victoryComment,
      file1: victoryFile1.name,
      file2: victoryFile2.name
    });

    // Р РЋР В±РЎР‚Р С•РЎРѓ РЎвЂћР С•РЎР‚Р СРЎвЂ№
    setVictoryComment('');
    setVictoryFile1(null);
    setVictoryFile2(null);
    setIsVictorySubmitOpen(false);
    setSelectedBattle(null);
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

  return (
    <>
      <div 
        className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
            : 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
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
        <div className="max-w-md mx-auto pt-20 px-4 pb-24">
          <div 
            className="glass-card rounded-2xl flex flex-col apple-shadow" 
            style={{ minHeight: '500px' }}
          >
            {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
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
                Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№
              </h2>
              <button
                onClick={() => setIsEmployeeSelectOpen(true)}
                disabled={hasActiveBattle}
                className={`transition-all ${hasActiveBattle ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid #2A2F36' 
                    : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark'
                    ? '0 2px 8px rgba(0, 0, 0, 0.8)'
                    : '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <Plus 
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    color: hasActiveBattle 
                      ? (theme === 'dark' ? '#4A5568' : '#9CA3AF')
                      : (theme === 'dark' ? '#A7B0BD' : '#6B7280')
                  }} 
                />
              </button>
            </div>

            {/* Р вЂ™Р С”Р В»Р В°Р Т‘Р С”Р С‘ */}
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
                  onClick={() => setActiveTab('battles')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                    activeTab === 'battles'
                      ? (theme === 'dark' 
                          ? 'bg-white text-black' 
                          : 'bg-black text-white')
                      : (theme === 'dark' 
                          ? 'text-white hover:text-white' 
                          : 'text-gray-600 hover:text-black')
                  }`}
                  style={{
                    boxShadow: activeTab === 'battles' 
                      ? (theme === 'dark'
                          ? '0 2px 8px rgba(0, 0, 0, 0.8)'
                          : '0 2px 8px rgba(0, 0, 0, 0.06)')
                      : 'none'
                  }}
                >
                  Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№ ({activeBattles.length})
                </button>
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                    activeTab === 'employees'
                      ? (theme === 'dark' 
                          ? 'bg-white text-black' 
                          : 'bg-black text-white')
                      : (theme === 'dark' 
                          ? 'text-white hover:text-white' 
                          : 'text-gray-600 hover:text-black')
                  }`}
                  style={{
                    boxShadow: activeTab === 'employees' 
                      ? (theme === 'dark'
                          ? '0 2px 8px rgba(0, 0, 0, 0.8)'
                          : '0 2px 8px rgba(0, 0, 0, 0.06)')
                      : 'none'
                  }}
                >
                  Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С‘
                </button>
              </div>
            </div>
            
            {/* Р С™Р С•Р Р…РЎвЂљР ВµР Р…РЎвЂљ */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {activeTab === 'battles' ? (
                // Р РЋР С—Р С‘РЎРѓР С•Р С” Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
                activeBattles.length > 0 ? (
                  <div className="space-y-4">
                    {activeBattles.map((battle) => (
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
                              Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {battle.opponent?.team} РІР‚Сћ Р Р€РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ {battle.opponent?.level}
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
                            onClick={() => handleVictorySubmit(battle)}
                            className="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all"
                            style={{
                              backgroundColor: '#2B82FF',
                              color: '#FFFFFF'
                            }}
                          >
                            Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р Т‘Р С‘РЎвЂљРЎРЉ Р С—Р С•Р В±Р ВµР Т‘РЎС“
                          </button>
                          <button
                            onClick={() => handleCancelBattle(battle)}
                            className="py-2 px-4 rounded-xl text-sm font-medium transition-all"
                            style={{
                              backgroundColor: theme === 'dark' ? '#3A2A2A' : '#FEF2F2',
                              color: '#EF4444',
                              border: '1px solid #EF4444'
                            }}
                          >
                            Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                          </button>
                        </div>
                      </div>
                    ))}
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
                        className="text-sm opacity-70"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      >
                        Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
                      </p>
                    </div>
                  </div>
                )
              ) : (
                // Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р†
                <div className="space-y-4">
                  {/* Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚ Р С—Р С• Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р С */}
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
                        {selectedTeam ? `Р С™Р С•Р СР В°Р Р…Р Т‘Р В° ${selectedTeam}` : 'Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ (1-6)'}
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
                          Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ (1-6)
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
                            Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {team}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
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
                            Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {employee.team} РІР‚Сћ Р Р€РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ {employee.level}
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
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} theme={theme} />
      </div>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В° */}
      <ModalOpaque
        isOpen={isEmployeeSelectOpen}
        onClose={() => setIsEmployeeSelectOpen(false)}
        title="Р вЂ™РЎвЂ№Р В±РЎР‚Р В°РЎвЂљРЎРЉ РЎРѓР С•Р С—Р ВµРЎР‚Р Р…Р С‘Р С”Р В°"
        theme={theme}
      >
        <div className="space-y-4">
          {/* Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚ Р С—Р С• Р С”Р С•Р СР В°Р Р…Р Т‘Р В°Р С */}
          <div className="relative">
            <button
              onClick={() => setIsTeamSelectOpen(!isTeamSelectOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              <span>
                {selectedTeam ? `Р С™Р С•Р СР В°Р Р…Р Т‘Р В° ${selectedTeam}` : 'Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ (1-6)'}
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
                  Р вЂ™РЎРѓР Вµ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№ (1-6)
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
                    Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {team}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:scale-[0.98]"
                style={{
                  backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                  opacity: employee.status === 'in_battle' ? 0.5 : 1
                }}
                onClick={() => employee.status !== 'in_battle' && handleEmployeeSelect(employee)}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: theme === 'dark' ? '#0F1116' : '#F3F5F8',
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
                    Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {employee.team} РІР‚Сћ Р Р€РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ {employee.level}
                  </div>
                  {employee.status === 'in_battle' && (
                    <div 
                      className="text-xs mt-1"
                      style={{ color: '#EF4444' }}
                    >
                      Р Р€РЎвЂЎР В°РЎРѓРЎвЂљР Р†РЎС“Р ВµРЎвЂљ Р Р† Р В±Р В°РЎвЂљРЎвЂљР В»Р Вµ
                    </div>
                  )}
                </div>
                {employee.status !== 'in_battle' && (
                  <ArrowRight 
                    className="w-5 h-5"
                    style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </ModalOpaque>

      {/* Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ Р Р†РЎвЂ№Р В·Р С•Р Р†Р В° Р Р…Р В° Р В±Р В°РЎвЂљРЎвЂљР В» */}
      <ModalOpaque
        isOpen={isBattleConfirmOpen}
        onClose={() => setIsBattleConfirmOpen(false)}
        title="Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р Т‘Р С‘РЎвЂљРЎРЉ Р Р†РЎвЂ№Р В·Р С•Р Р†"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setIsBattleConfirmOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
            </button>
            <button
              onClick={handleBattleConfirm}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors"
              style={{
                backgroundColor: '#2B82FF'
              }}
            >
              Р вЂР В°РЎвЂљРЎвЂљР В»!
            </button>
          </div>
        }
      >
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)',
            }}
          >
            <Trophy className="w-8 h-8" style={{ color: '#2B82FF' }} />
          </div>
          <div>
            <p 
              className="font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р вЂ™РЎвЂ№Р В·Р Р†Р В°РЎвЂљРЎРЉ Р Р…Р В° Р В±Р В°РЎвЂљРЎвЂљР В»?
            </p>
            <p 
              className="text-sm"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              {selectedEmployee?.name}
            </p>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.06)' 
                : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-4 h-4" style={{ color: '#FFD700' }} />
              <span 
                className="font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: 500g
              </span>
            </div>
            <p 
              className="text-xs"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р вЂ™РЎР‚Р ВµР СРЎРЏ Р Р…Р В° Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘Р Вµ: 7 Р Т‘Р Р…Р ВµР в„–
            </p>
          </div>
        </div>
      </ModalOpaque>

      {/* Р вЂќР ВµРЎвЂљР В°Р В»Р С‘ РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В° */}
      <ModalOpaque
        isOpen={isEmployeeDetailOpen}
        onClose={() => setIsEmployeeDetailOpen(false)}
        title="Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р Вµ"
        theme={theme}
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid #2A2F36' 
                    : '1px solid #E6E9EF'
                }}
              >
                <span className="text-2xl">{selectedEmployee.name.charAt(0)}</span>
              </div>
              <h3 
                className="font-medium mb-2"
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
                Р С™Р С•Р СР В°Р Р…Р Т‘Р В° {selectedEmployee.team} РІР‚Сћ Р Р€РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ {selectedEmployee.level}
              </p>
            </div>

            <div 
              className="p-4 rounded-xl"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF'
              }}
            >
              <h4 
                className="font-medium mb-2"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р РЋРЎвЂљР В°РЎвЂљР С‘РЎРѓРЎвЂљР С‘Р С”Р В°
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div 
                    className="font-medium"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    12
                  </div>
                  <div 
                    style={{
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Р СџР С•Р В±Р ВµР Т‘
                  </div>
                </div>
                <div>
                  <div 
                    className="font-medium"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    3
                  </div>
                  <div 
                    style={{
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Р СџР С•РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р в„–
                  </div>
                </div>
              </div>
            </div>

            {!hasActiveBattle && selectedEmployee.status !== 'in_battle' && (
              <button
                onClick={() => {
                  setIsEmployeeDetailOpen(false);
                  handleEmployeeSelect(selectedEmployee);
                }}
                className="w-full py-3 px-4 rounded-xl font-medium text-white transition-colors"
                style={{
                  backgroundColor: '#2B82FF'
                }}
              >
                Р вЂ™РЎвЂ№Р В·Р Р†Р В°РЎвЂљРЎРЉ Р Р…Р В° Р В±Р В°РЎвЂљРЎвЂљР В»
              </button>
            )}
          </div>
        )}
      </ModalOpaque>

      {/* Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ Р С•РЎвЂљР СР ВµР Р…РЎвЂ№ Р В±Р В°РЎвЂљРЎвЂљР В»Р В° */}
      <ModalOpaque
        isOpen={isCancelBattleOpen}
        onClose={() => setIsCancelBattleOpen(false)}
        title="Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setIsCancelBattleOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р СњР ВµРЎвЂљ
            </button>
            <button
              onClick={confirmCancelBattle}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors"
              style={{
                backgroundColor: '#EF4444'
              }}
            >
              Р вЂќР В°, Р С•РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
            </button>
          </div>
        }
      >
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.10)',
            }}
          >
            <X className="w-8 h-8" style={{ color: '#EF4444' }} />
          </div>
          <div>
            <p 
              className="font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р вЂ™РЎвЂ№ РЎС“Р Р†Р ВµРЎР‚Р ВµР Р…РЎвЂ№, РЎвЂЎРЎвЂљР С• РЎвЂ¦Р С•РЎвЂљР С‘РЎвЂљР Вµ Р С•РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»?
            </p>
            <p 
              className="text-sm"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ {selectedBattle?.opponent?.name} Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р С•РЎвЂљР СР ВµР Р…Р ВµР Р…
            </p>
          </div>
        </div>
      </ModalOpaque>

      {/* Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№ */}
      <ModalOpaque
        isOpen={isVictorySubmitOpen}
        onClose={() => {
          setIsVictorySubmitOpen(false);
          setVictoryComment('');
          setVictoryFile1(null);
          setVictoryFile2(null);
        }}
        title="Р СџР С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р Т‘Р С‘РЎвЂљРЎРЉ Р С—Р С•Р В±Р ВµР Т‘РЎС“"
        theme={theme}
        actions={
          <button
            onClick={submitVictoryProof}
            disabled={!victoryFile1 || !victoryFile2}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
              victoryFile1 && victoryFile2
                ? 'text-white'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: victoryFile1 && victoryFile2 
                ? '#2B82FF' 
                : (theme === 'dark' ? '#4A5568' : '#9CA3AF')
            }}
          >
            Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р Р…Р В° Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”РЎС“
          </button>
        }
      >
        <div className="space-y-4">
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.10)',
              }}
            >
              <Trophy className="w-8 h-8" style={{ color: '#22C55E' }} />
            </div>
            <p 
              className="font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ {selectedBattle?.opponent?.name}
            </p>
            <p 
              className="text-sm"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р СџРЎР‚Р С‘Р С”РЎР‚Р ВµР С—Р С‘РЎвЂљР Вµ Р Т‘Р С•Р С”Р В°Р В·Р В°РЎвЂљР ВµР В»РЎРЉРЎРѓРЎвЂљР Р†Р В° Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№ Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘ Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р С•Р С
            </p>
          </div>

          {/* Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– */}
          <div>
            <label 
              className="block mb-2 font-medium"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„–
            </label>
            <textarea
              value={victoryComment}
              onChange={(e) => setVictoryComment(e.target.value)}
              placeholder="Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ РЎР‚Р ВµР В·РЎС“Р В»РЎРЉРЎвЂљР В°РЎвЂљРЎвЂ№ Р В±Р В°РЎвЂљРЎвЂљР В»Р В°..."
              rows={3}
              className="w-full p-3 rounded-xl transition-colors resize-none"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                outline: 'none'
              }}
            />
          </div>

          {/* Р В¤Р В°Р в„–Р В»РЎвЂ№ */}
          <div className="space-y-3">
            <div>
              <label 
                className="block mb-2 font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р С›РЎвЂљРЎвЂЎР ВµРЎвЂљ Р С—Р ВµРЎР‚Р Р†Р С•Р С–Р С• РЎС“РЎвЂЎР В°РЎРѓРЎвЂљР Р…Р С‘Р С”Р В° *
              </label>
              <div className="flex items-center gap-2">
                <div 
                  className="flex-1 p-3 rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  <span className="block truncate text-sm">
                    {victoryFile1 ? victoryFile1.name : 'Р В¤Р В°Р в„–Р В» Р Р…Р Вµ Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload(1)}
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="p-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: '#2B82FF',
                      color: '#FFFFFF'
                    }}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label 
                className="block mb-2 font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р С›РЎвЂљРЎвЂЎР ВµРЎвЂљ Р Р†РЎвЂљР С•РЎР‚Р С•Р С–Р С• РЎС“РЎвЂЎР В°РЎРѓРЎвЂљР Р…Р С‘Р С”Р В° *
              </label>
              <div className="flex items-center gap-2">
                <div 
                  className="flex-1 p-3 rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  <span className="block truncate text-sm">
                    {victoryFile2 ? victoryFile2.name : 'Р В¤Р В°Р в„–Р В» Р Р…Р Вµ Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload(2)}
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="p-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: '#2B82FF',
                      color: '#FFFFFF'
                    }}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p 
            className="text-xs text-center"
            style={{
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            * Р С›Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…Р С• Р С—РЎР‚Р С‘Р В»Р С•Р В¶Р С‘РЎвЂљРЎРЉ Р С•РЎвЂљРЎвЂЎР ВµРЎвЂљРЎвЂ№ Р С•Р В±Р С•Р С‘РЎвЂ¦ РЎС“РЎвЂЎР В°РЎРѓРЎвЂљР Р…Р С‘Р С”Р С•Р Р† Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘
          </p>
        </div>
      </ModalOpaque>
    </>
  );
}
