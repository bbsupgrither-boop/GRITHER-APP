п»їimport { useState } from 'react';
import { Clock, Plus, ChevronLeft, ChevronRight, ArrowRight } from './Icons';
import { LeaderboardEntry, Battle } from '../types/global';

type ActivityTab = 'battles' | 'leaderboard' | 'history';

interface ActivityCardProps {
  leaderboard?: LeaderboardEntry[];
  activeBattles?: Battle[];
  onNavigate?: (page: string) => void;
}

interface BattleEntry {
  id: number;
  participantA: string;
  participantB: string;
  status: 'active' | 'completed' | 'cancelled';
  date?: string;
}

interface HistoryEntry extends BattleEntry {
  date: string;
}

export function ActivityCard({ leaderboard = [], activeBattles = [], onNavigate }: ActivityCardProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>('battles');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Р СџРЎР‚Р ВµР С•Р В±РЎР‚Р В°Р В·РЎС“Р ВµР С Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№ Р Р† Р Р…РЎС“Р В¶Р Р…РЎвЂ№Р в„– РЎвЂћР С•РЎР‚Р СР В°РЎвЂљ
  const transformedBattles: BattleEntry[] = activeBattles.map(battle => ({
    id: parseInt(battle.id),
    participantA: battle.participants.length > 0 ? battle.participants[0].user.name : 'Р Р€РЎвЂЎР В°РЎРѓРЎвЂљР Р…Р С‘Р С” Р С’',
    participantB: battle.participants.length > 1 ? battle.participants[1].user.name : 'Р Р€РЎвЂЎР В°РЎРѓРЎвЂљР Р…Р С‘Р С” Р вЂ',
    status: battle.status === 'active' ? 'active' as const : 'completed' as const
  }));

  // Mock Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р Т‘Р ВµР СР С•Р Р…РЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘Р С‘ (Р ВµРЎРѓР В»Р С‘ Р Р…Р ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†)
  const mockBattles: BattleEntry[] = transformedBattles.length > 0 ? transformedBattles : [
    { id: 1, participantA: 'Р С’Р В»Р ВµР С”РЎРѓР ВµР в„–', participantB: 'Р СљР В°РЎР‚Р С‘РЎРЏ', status: 'active' },
    { id: 2, participantA: 'Р вЂќР СР С‘РЎвЂљРЎР‚Р С‘Р в„–', participantB: 'Р С’Р Р…Р Р…Р В°', status: 'completed' },
    { id: 3, participantA: 'Р РЋР ВµРЎР‚Р С–Р ВµР в„–', participantB: 'Р вЂўР В»Р ВµР Р…Р В°', status: 'cancelled' },
  ];

  const mockHistory: HistoryEntry[] = [
    { id: 1, participantA: 'Р ВР Р†Р В°Р Р…', participantB: 'Р СџР ВµРЎвЂљРЎР‚', status: 'completed', date: '11.09' },
    { id: 2, participantA: 'Р С›Р В»РЎРЉР С–Р В°', participantB: 'Р С™Р В°РЎвЂљРЎРЏ', status: 'completed', date: '10.09' },
    { id: 3, participantA: 'Р С’Р Р…РЎвЂљР С•Р Р…', participantB: 'Р СџР В°Р Р†Р ВµР В»', status: 'cancelled', date: '09.09' },
  ];

  const tabs = [
    { id: 'battles' as const, label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№' },
    { id: 'leaderboard' as const, label: 'Р вЂєР С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘' },
    { id: 'history' as const, label: 'Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ' }
  ];

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return 'Р РЋР ВµР С–Р С•Р Т‘Р Р…РЎРЏ';
    }
    
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Р ВР Т‘Р ВµРЎвЂљ';
      case 'completed':
        return 'Р вЂњР С•РЎвЂљР С•Р Р†Р С•';
      case 'cancelled':
        return 'Р С›РЎвЂљР СР ВµР Р…Р ВµР Р…';
      default:
        return status;
    }
  };

  const renderBattlesContent = () => {
    const battles = mockBattles.length > 0 ? mockBattles : [];
    
    if (battles.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-center text-sm">
            Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {battles.map((battle, index) => (
          <div key={battle.id} className="flex items-center gap-1 sm:gap-2 min-h-[48px] p-1 sm:p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <span className="text-foreground font-medium text-xs sm:text-sm w-4 sm:w-5 flex-shrink-0">
              {index + 1}.
            </span>
            
            <div className="px-1 sm:px-2 py-1 bg-secondary rounded-full text-xs font-medium flex-1 text-center truncate min-w-0">
              {battle.participantA}
            </div>
            
            <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            
            <div className="px-1 sm:px-2 py-1 bg-secondary rounded-full text-xs font-medium flex-1 text-center truncate min-w-0">
              {battle.participantB}
            </div>
            
            <div className={`px-1 sm:px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 whitespace-nowrap ${getStatusColor(battle.status)}`}>
              {getStatusText(battle.status)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderLeaderboardContent = () => {
    if (leaderboard.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-center text-sm">
            Р РЋР С—Р С‘РЎРѓР С•Р С” Р В»Р С‘Р Т‘Р ВµРЎР‚Р С•Р Р† Р С•РЎвЂљРЎРѓРЎС“РЎвЂљРЎРѓРЎвЂљР Р†РЎС“Р ВµРЎвЂљ
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {leaderboard.slice(0, 10).map((entry, index) => (
          <div 
            key={entry.user.id} 
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
              index === 0 
                ? 'bg-primary/10 border border-primary/20 hover:bg-primary/15' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {entry.user.name}
              </div>
            </div>
            
            <div className="text-sm font-medium text-primary flex-shrink-0">
              {entry.user.rating}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHistoryContent = () => {
    const history = mockHistory.length > 0 ? mockHistory : [];
    
    if (history.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-center text-sm">
            Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р С•РЎвЂљРЎРѓРЎС“РЎвЂљРЎРѓРЎвЂљР Р†РЎС“Р ВµРЎвЂљ
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {history.map((battle, index) => (
          <div key={battle.id} className="flex items-center gap-1 sm:gap-2 min-h-[48px] p-1 sm:p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <span className="text-foreground font-medium text-xs sm:text-sm w-4 sm:w-5 flex-shrink-0">
              {index + 1}.
            </span>
            
            <div className="px-1 sm:px-2 py-1 bg-secondary rounded-full text-xs font-medium flex-1 text-center truncate min-w-0">
              {battle.participantA}
            </div>
            
            <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            
            <div className="px-1 sm:px-2 py-1 bg-secondary rounded-full text-xs font-medium flex-1 text-center truncate min-w-0">
              {battle.participantB}
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                {battle.date}
              </span>
              <div className={`px-1 sm:px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(battle.status)}`}>
                {getStatusText(battle.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'battles':
        return renderBattlesContent();
      case 'leaderboard':
        return renderLeaderboardContent();
      case 'history':
        return renderHistoryContent();
      default:
        return null;
    }
  };

  const handleHistoryClick = () => {
    // Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘РЎР‹ Р В·Р В° Р Р†РЎРѓР Вµ Р Т‘Р Р…Р С‘
    console.log('Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р С—Р С•Р В»Р Р…РЎС“РЎР‹ Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘РЎР‹');
  };

  const handleCreateBattleClick = () => {
    onNavigate?.('battles');
  };

  return (
    <div className="glass-card rounded-2xl p-4 apple-shadow">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
      <div className="relative flex items-center justify-center mb-4">
        <button 
          onClick={handleHistoryClick}
          className="absolute left-0 apple-button p-2 rounded-full hover:scale-105 transition-transform"
          title="Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ"
        >
          <Clock className="w-4 h-4 text-foreground/70" />
        </button>
        
        <h2 className="font-medium text-foreground">Р С’Р С”РЎвЂљР С‘Р Р†Р Р…Р С•РЎРѓРЎвЂљРЎРЉ Р Т‘Р Р…РЎРЏ</h2>
        
        <button 
          onClick={handleCreateBattleClick}
          className="absolute right-0 apple-button p-2 rounded-full hover:scale-105 transition-transform"
          title="Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»"
        >
          <Plus className="w-4 h-4 text-foreground/70" />
        </button>
      </div>

      {/* Р РЋР ВµР С–Р СР ВµР Р…РЎвЂљР Р…РЎвЂ№Р в„– Р С—Р ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР В°РЎвЂљР ВµР В»РЎРЉ */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass-card text-foreground hover:scale-[0.98]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Р СџР ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР В°РЎвЂљР ВµР В»РЎРЉ Р Т‘Р Р…РЎРЏ */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevDay}
          className="apple-button p-2 rounded-full hover:scale-105 transition-transform"
        >
          <ChevronLeft className="w-4 h-4 text-foreground/70" />
        </button>
        
        <div className="px-3 py-1 bg-secondary rounded-full text-sm font-medium text-foreground">
          {formatDate(currentDate)}
        </div>
        
        <button
          onClick={handleNextDay}
          className="apple-button p-2 rounded-full hover:scale-105 transition-transform"
        >
          <ChevronRight className="w-4 h-4 text-foreground/70" />
        </button>
      </div>

      {/* Р С™Р С•Р Р…РЎвЂљР ВµР Р…РЎвЂљ */}
      <div className="overflow-y-auto max-h-[240px] sm:max-h-[280px] -mx-1 px-1">
        {renderContent()}
      </div>
    </div>
  );
}
