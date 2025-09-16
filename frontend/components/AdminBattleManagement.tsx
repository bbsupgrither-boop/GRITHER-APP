import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Crown,
  X,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Ban,
  RefreshCw,
  Trophy,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';
import { databaseService, BattleData } from '../services/database';
import { useAdminDatabase } from '../hooks/useAdminDatabase';

interface AdminBattleManagementProps {
  theme: 'light' | 'dark';
}

// Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ BattleData Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦

interface BattleStats {
  totalBattles: number;
  activeBattles: number;
  completedBattles: number;
  disputedBattles: number;
  totalVolume: number;
  averageStake: number;
  topPlayers: Array<{
    name: string;
    wins: number;
    totalWinnings: number;
  }>;
}

const BATTLE_STATUS = {
  active: { label: 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: 'bg-yellow-500' },
  completed: { label: 'Р В РІР‚вЂќР В Р’В°Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦', color: 'bg-green-500' },
  cancelled: { label: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’ВµР В Р вЂ¦', color: 'bg-red-500' },
  disputed: { label: 'Р В Р Р‹Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: 'bg-orange-500' }
};

export const AdminBattleManagement: React.FC<AdminBattleManagementProps> = ({ theme }) => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [filteredBattles, setFilteredBattles] = useState<Battle[]>([]);
  const [stats, setStats] = useState<BattleStats>({
    totalBattles: 0,
    activeBattles: 0,
    completedBattles: 0,
    disputedBattles: 0,
    totalVolume: 0,
    averageStake: 0,
    topPlayers: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'disputes'>('active');
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
  useEffect(() => {
    loadBattles();
  }, []);

  // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ
  useEffect(() => {
    filterBattles();
  }, [battles, searchQuery, filterStatus, activeTab]);

  const loadBattles = async () => {
    // Mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ
    const mockBattles: Battle[] = [
      {
        id: '1',
        player1: {
          id: 'user1',
          name: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ',
          team: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РЎвЂ™',
          balance: 1000
        },
        player2: {
          id: 'user2',
          name: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°',
          team: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚В',
          balance: 750
        },
        stake: 250,
        status: 'active',
        createdAt: '2024-01-21T14:30:00Z'
      },
      {
        id: '2',
        player1: {
          id: 'user3',
          name: 'Р В РІР‚СњР В РЎВР В РЎвЂР РЋРІР‚С™Р РЋР вЂљР В РЎвЂР В РІвЂћвЂ“ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ ',
          team: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚в„ў',
          balance: 500
        },
        player2: {
          id: 'user4',
          name: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В РЎв„ўР В РЎвЂўР В Р’В·Р В Р’В»Р В РЎвЂўР В Р вЂ Р В Р’В°',
          team: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚Сљ',
          balance: 1200
        },
        stake: 300,
        status: 'completed',
        winner: 'user4',
        createdAt: '2024-01-20T16:45:00Z',
        completedAt: '2024-01-20T17:15:00Z'
      },
      {
        id: '3',
        player1: {
          id: 'user5',
          name: 'Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ ',
          team: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚Сњ',
          balance: 800
        },
        player2: {
          id: 'user6',
          name: 'Р В РІР‚СћР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р’В° Р В РЎС™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°',
          team: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚Сћ',
          balance: 600
        },
        stake: 200,
        status: 'disputed',
        disputeReason: 'Р В РЎСџР В РЎвЂўР В РўвЂР В РЎвЂўР В Р’В·Р РЋР вЂљР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р вЂ¦Р В Р’В° Р РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋРІР‚в„–',
        proof: ['proof1.jpg', 'proof2.jpg'],
        createdAt: '2024-01-19T10:20:00Z'
      }
    ];

    setBattles(mockBattles);

    // Р В Р’В Р В Р’В°Р РЋР С“Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В РЎвЂ
    const totalBattles = mockBattles.length;
    const activeBattles = mockBattles.filter(b => b.status === 'active').length;
    const completedBattles = mockBattles.filter(b => b.status === 'completed').length;
    const disputedBattles = mockBattles.filter(b => b.status === 'disputed').length;
    const totalVolume = mockBattles.reduce((sum, b) => sum + b.stake, 0);
    const averageStake = totalVolume / totalBattles;

    setStats({
      totalBattles,
      activeBattles,
      completedBattles,
      disputedBattles,
      totalVolume,
      averageStake,
      topPlayers: [
        { name: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В РЎв„ўР В РЎвЂўР В Р’В·Р В Р’В»Р В РЎвЂўР В Р вЂ Р В Р’В°', wins: 5, totalWinnings: 1500 },
        { name: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ', wins: 4, totalWinnings: 1200 },
        { name: 'Р В РІР‚СњР В РЎВР В РЎвЂР РЋРІР‚С™Р РЋР вЂљР В РЎвЂР В РІвЂћвЂ“ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ ', wins: 3, totalWinnings: 900 }
      ]
    });
  };

  const filterBattles = () => {
    let filtered = battles;

    // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂў Р РЋРІР‚С™Р В Р’В°Р В Р’В±Р РЋРЎвЂњ
    if (activeTab === 'active') {
      filtered = filtered.filter(b => b.status === 'active');
    } else if (activeTab === 'history') {
      filtered = filtered.filter(b => b.status === 'completed');
    } else if (activeTab === 'disputes') {
      filtered = filtered.filter(b => b.status === 'disputed');
    }

    // Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ
    if (searchQuery) {
      filtered = filtered.filter(battle =>
        battle.player1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.player2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂў Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“Р РЋРЎвЂњ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(battle => battle.status === filterStatus);
    }

    setFilteredBattles(filtered);
  };

  const handleBattleAction = async (battleId: string, action: string, winnerId?: string) => {
    const battle = battles.find(b => b.id === battleId);
    if (!battle) return;

    let updatedBattle: Battle;

    switch (action) {
      case 'complete':
        if (!winnerId) return;
        updatedBattle = {
          ...battle,
          status: 'completed' as const,
          winner: winnerId,
          completedAt: new Date().toISOString()
        };
        break;
      case 'cancel':
        updatedBattle = {
          ...battle,
          status: 'cancelled' as const,
          completedAt: new Date().toISOString()
        };
        break;
      case 'resolve_dispute':
        updatedBattle = {
          ...battle,
          status: 'completed' as const,
          winner: winnerId,
          completedAt: new Date().toISOString()
        };
        break;
      default:
        return;
    }

    setBattles(prev => prev.map(b => b.id === battleId ? updatedBattle : b));
    setSelectedBattle(null);
  };

  const getStatusColor = (status: string) => {
    return BATTLE_STATUS[status as keyof typeof BATTLE_STATUS]?.color || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    return BATTLE_STATUS[status as keyof typeof BATTLE_STATUS]?.label || status;
  };

  const renderActiveBattles = () => (
    <div className="space-y-4">
      {filteredBattles.map((battle) => (
        <div
          key={battle.id}
          className="p-4 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="p-3 rounded-lg bg-blue-500 bg-opacity-20 mb-2">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  {battle.player1.name}
                </div>
                <div className="text-xs opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  {battle.player1.team}
                </div>
                <div className="text-xs opacity-60">
                  РЎР‚РЎСџРІР‚в„ўР’В° {battle.player1.balance}
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  VS
                </div>
                <div className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’В°: {battle.stake} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™
                </div>
                <div className="text-xs opacity-60">
                  РЎР‚РЎСџРІР‚СљРІР‚В¦ {new Date(battle.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="text-center">
                <div className="p-3 rounded-lg bg-red-500 bg-opacity-20 mb-2">
                  <Users className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  {battle.player2.name}
                </div>
                <div className="text-xs opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  {battle.player2.team}
                </div>
                <div className="text-xs opacity-60">
                  РЎР‚РЎСџРІР‚в„ўР’В° {battle.player2.balance}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBattleAction(battle.id, 'complete', battle.player1.id)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30 text-sm"
              >
                <Crown className="w-4 h-4" />
                <span>{battle.player1.name}</span>
              </button>
              <button
                onClick={() => handleBattleAction(battle.id, 'complete', battle.player2.id)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30 text-sm"
              >
                <Crown className="w-4 h-4" />
                <span>{battle.player2.name}</span>
              </button>
              <button
                onClick={() => handleBattleAction(battle.id, 'cancel')}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-red-500 bg-opacity-20 text-red-500 hover:bg-opacity-30 text-sm"
              >
                <X className="w-4 h-4" />
                <span>Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBattleHistory = () => (
    <div className="space-y-4">
      {filteredBattles.map((battle) => (
        <div
          key={battle.id}
          className="p-4 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`p-3 rounded-lg mb-2 ${
                  battle.winner === battle.player1.id ? 'bg-green-500 bg-opacity-20' : 'bg-gray-500 bg-opacity-20'
                }`}>
                  <Users className={`w-6 h-6 ${
                    battle.winner === battle.player1.id ? 'text-green-500' : 'text-gray-500'
                  }`} />
                </div>
                <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  {battle.player1.name}
                </div>
                <div className="text-xs opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  {battle.player1.team}
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  VS
                </div>
                <div className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’В°: {battle.stake} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™
                </div>
                <div className="text-xs opacity-60">
                  РЎР‚РЎСџРІР‚СљРІР‚В¦ {new Date(battle.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="text-center">
                <div className={`p-3 rounded-lg mb-2 ${
                  battle.winner === battle.player2.id ? 'bg-green-500 bg-opacity-20' : 'bg-gray-500 bg-opacity-20'
                }`}>
                  <Users className={`w-6 h-6 ${
                    battle.winner === battle.player2.id ? 'text-green-500' : 'text-gray-500'
                  }`} />
                </div>
                <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  {battle.player2.name}
                </div>
                <div className="text-xs opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  {battle.player2.team}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(battle.status)} text-white`}>
                {getStatusLabel(battle.status)}
              </span>
              {battle.winner && (
                <div className="flex items-center space-x-1 text-sm text-green-500">
                  <Trophy className="w-4 h-4" />
                  <span>
                    {battle.winner === battle.player1.id ? battle.player1.name : battle.player2.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDisputes = () => (
    <div className="space-y-4">
      {filteredBattles.map((battle) => (
        <div
          key={battle.id}
          className="p-4 rounded-xl border-l-4 border-orange-500"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-500 bg-opacity-20">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
              </div>
              
              <div>
                <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В» #{battle.id}
                </h3>
                <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  {battle.player1.name} vs {battle.player2.name}
                </p>
                <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В РЎСџР РЋР вЂљР В РЎвЂР РЋРІР‚РЋР В РЎвЂР В Р вЂ¦Р В Р’В°: {battle.disputeReason}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                  <span>РЎР‚РЎСџРІР‚в„ўР’В° Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’В°: {battle.stake} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
                  <span>РЎР‚РЎСџРІР‚СљРІР‚В¦ {new Date(battle.createdAt).toLocaleString()}</span>
                  {battle.proof && (
                    <span>РЎР‚РЎСџРІР‚СљР вЂ№ Р В РІР‚СњР В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В Р’В°: {battle.proof.length}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBattleAction(battle.id, 'resolve_dispute', battle.player1.id)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30 text-sm"
              >
                <Crown className="w-4 h-4" />
                <span>{battle.player1.name}</span>
              </button>
              <button
                onClick={() => handleBattleAction(battle.id, 'resolve_dispute', battle.player2.id)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30 text-sm"
              >
                <Crown className="w-4 h-4" />
                <span>{battle.player2.name}</span>
              </button>
              <button
                onClick={() => setSelectedBattle(battle)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-blue-500 bg-opacity-20 text-blue-500 hover:bg-opacity-30 text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Р В РЎСџР В РЎвЂўР В РўвЂР РЋР вЂљР В РЎвЂўР В Р’В±Р В Р вЂ¦Р В Р’ВµР В Р’Вµ</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°Р В РЎВР В РЎвЂ
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’ВµР В РўвЂР В РЎвЂР В Р вЂ¦Р В РЎвЂќР В РЎвЂўР В Р вЂ  Р В РЎвЂ Р РЋР вЂљР В Р’ВµР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ 
          </p>
        </div>
      </div>

      {/* Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-blue-500">{stats.totalBattles}</div>
          <div className="text-sm opacity-70">Р В РІР‚в„ўР РЋР С“Р В Р’ВµР В РЎвЂ“Р В РЎвЂў</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-yellow-500">{stats.activeBattles}</div>
          <div className="text-sm opacity-70">Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-green-500">{stats.completedBattles}</div>
          <div className="text-sm opacity-70">Р В РІР‚вЂќР В Р’В°Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂў</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-orange-500">{stats.disputedBattles}</div>
          <div className="text-sm opacity-70">Р В Р Р‹Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-purple-500">{stats.totalVolume}</div>
          <div className="text-sm opacity-70">Р В РЎвЂєР В Р’В±Р РЋР вЂ°Р В Р’ВµР В РЎВ</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-indigo-500">{Math.round(stats.averageStake)}</div>
          <div className="text-sm opacity-70">Р В Р Р‹Р РЋР вЂљР В Р’ВµР В РўвЂР В Р вЂ¦Р РЋР РЏР РЋР РЏ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’В°</div>
        </div>
      </div>

      {/* Р В РЎС›Р В Р’В°Р В Р’В±Р РЋРІР‚в„– */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'active', label: 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ', icon: Activity, count: stats.activeBattles },
          { id: 'history', label: 'Р В Р’ВР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР РЋР РЏ', icon: Clock, count: stats.completedBattles },
          { id: 'disputes', label: 'Р В Р Р‹Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚в„–', icon: AlertTriangle, count: stats.disputedBattles }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
            style={{
              color: activeTab === tab.id ? '#3B82F6' : theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
            {tab.count > 0 && (
              <span className="px-2 py-1 rounded-full text-xs bg-blue-500 bg-opacity-20 text-blue-500">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“Р РЋРІР‚в„–</option>
          {Object.entries(BATTLE_STATUS).map(([value, status]) => (
            <option key={value} value={value}>{status.label}</option>
          ))}
        </select>
      </div>

      {/* Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™ */}
      {activeTab === 'active' && renderActiveBattles()}
      {activeTab === 'history' && renderBattleHistory()}
      {activeTab === 'disputes' && renderDisputes()}
    </div>
  );
};
