import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  User, 
  Users,
  Shield,
  Crown,
  Star,
  DollarSign,
  Calendar,
  Activity,
  Ban,
  CheckCircle,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  UserPlus,
  UserMinus,
  Settings
} from 'lucide-react';
import { databaseService, UserData } from '../services/database';
import { useAdminDatabase } from '../hooks/useAdminDatabase';

interface AdminUserManagementProps {
  theme: 'light' | 'dark';
}

// РСЃРїРѕР»СЊР·СѓРµРј UserData РёР· Р±Р°Р·С‹ РґР°РЅРЅС‹С…

interface Team {
  id: number;
  name: string;
  teamLeadId: string;
  teamLeadName: string;
  memberCount: number;
}

const USER_ROLES = [
  { value: 'worker', label: 'РЎРѕС‚СЂСѓРґРЅРёРє', icon: 'рџ‘¤', color: 'bg-gray-500' },
  { value: 'team_lead', label: 'РўРёРјР»РёРґ', icon: 'рџ‘‘', color: 'bg-blue-500' },
  { value: 'junior_admin', label: 'РњР»Р°РґС€РёР№ РђРґРјРёРЅ', icon: 'рџ›ЎпёЏ', color: 'bg-green-500' },
  { value: 'senior_admin', label: 'РЎС‚Р°СЂС€РёР№ РђРґРјРёРЅ', icon: 'в­ђ', color: 'bg-purple-500' },
  { value: 'main_admin', label: 'Р“Р»Р°РІРЅС‹Р№ РђРґРјРёРЅ', icon: 'рџ‘‘', color: 'bg-orange-500' }
];

const TEAMS = [
  { id: 1, name: 'РљРѕРјР°РЅРґР° Рђ', teamLeadId: '1192050960', teamLeadName: 'РњР°РєСЃ' },
  { id: 2, name: 'РљРѕРјР°РЅРґР° Р‘', teamLeadId: '639897713', teamLeadName: 'Р’РёРєР°' },
  { id: 3, name: 'РљРѕРјР°РЅРґР° Р’', teamLeadId: '1265713870', teamLeadName: 'РќРёРєРёС‚Р°' },
  { id: 4, name: 'РљРѕРјР°РЅРґР° Р“', teamLeadId: '484779656', teamLeadName: 'РЎРµСЂРіРµР№' },
  { id: 5, name: 'РљРѕРјР°РЅРґР° Р”', teamLeadId: '285529209', teamLeadName: 'Р¤РµРґСЏ' }
];

export const AdminUserManagement: React.FC<AdminUserManagementProps> = ({ theme }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'active' | 'dismissed'>('active');

  // Р—Р°РіСЂСѓР·РєР° РґР°РЅРЅС‹С…
  useEffect(() => {
    loadUsers();
  }, []);

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ
  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, filterRole, filterTeam, filterStatus, activeTab]);

  const loadUsers = async () => {
    // Mock РґР°РЅРЅС‹Рµ РЅР° РѕСЃРЅРѕРІРµ Р±Р°Р·С‹ РґР°РЅРЅС‹С… РёР· userRoles.ts
    const mockUsers: User[] = [
      {
        id: '1',
        telegramId: '918064599',
        name: 'РњРёСЂРѕСЃР»Р°РІ',
        role: 'worker',
        teamNumber: 1,
        teamName: 'РљРѕРјР°РЅРґР° Рђ',
        level: 5,
        experience: 1250,
        gCoins: 500,
        isActive: true,
        lastActive: '2024-01-21T10:30:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        achievementsCount: 8,
        tasksCompleted: 15,
        totalSpent: 200
      },
      {
        id: '2',
        telegramId: '1192050960',
        name: 'РњР°РєСЃ',
        role: 'team_lead',
        teamNumber: 1,
        teamName: 'РљРѕРјР°РЅРґР° Рђ',
        level: 12,
        experience: 3200,
        gCoins: 1200,
        isActive: true,
        lastActive: '2024-01-21T14:15:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        achievementsCount: 25,
        tasksCompleted: 45,
        totalSpent: 800
      },
      {
        id: '3',
        telegramId: '1900528628',
        name: 'РњР°РєСЃ',
        role: 'main_admin',
        level: 20,
        experience: 5000,
        gCoins: 2500,
        isActive: true,
        lastActive: '2024-01-21T16:45:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        achievementsCount: 50,
        tasksCompleted: 100,
        totalSpent: 1500
      },
      {
        id: '4',
        telegramId: '1765172620',
        name: 'Р“РѕС€Р°',
        role: 'worker',
        teamNumber: 2,
        teamName: 'РљРѕРјР°РЅРґР° Р‘',
        level: 3,
        experience: 800,
        gCoins: 300,
        isActive: false,
        lastActive: '2024-01-15T09:20:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        achievementsCount: 5,
        tasksCompleted: 8,
        totalSpent: 150
      }
    ];

    setUsers(mockUsers);
  };

  const filterUsers = () => {
    let filtered = users;

    // Р¤РёР»СЊС‚СЂ РїРѕ С‚Р°Р±Сѓ
    if (activeTab === 'active') {
      filtered = filtered.filter(user => user.isActive);
    } else if (activeTab === 'dismissed') {
      filtered = filtered.filter(user => !user.isActive);
    }

    // РџРѕРёСЃРє
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.telegramId.includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Р¤РёР»СЊС‚СЂ РїРѕ СЂРѕР»Рё
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Р¤РёР»СЊС‚СЂ РїРѕ РєРѕРјР°РЅРґРµ
    if (filterTeam !== 'all') {
      filtered = filtered.filter(user => user.teamNumber?.toString() === filterTeam);
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = async () => {
    const newUser: User = {
      id: Date.now().toString(),
      telegramId: formData.telegramId,
      name: formData.name,
      role: formData.role,
      teamNumber: formData.teamNumber ? parseInt(formData.teamNumber) : undefined,
      teamName: formData.teamNumber ? TEAMS.find(t => t.id === parseInt(formData.teamNumber))?.name : undefined,
      level: 1,
      experience: 0,
      gCoins: 100,
      isActive: true,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      achievementsCount: 0,
      tasksCompleted: 0,
      totalSpent: 0
    };

    setUsers(prev => [newUser, ...prev]);
    setShowCreateForm(false);
    resetForm();
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      telegramId: user.telegramId,
      name: user.name,
      role: user.role,
      teamNumber: user.teamNumber?.toString() || '',
      level: user.level,
      experience: user.experience,
      gCoins: user.gCoins
    });
    setShowCreateForm(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    const updatedUser: User = {
      ...editingUser,
      telegramId: formData.telegramId,
      name: formData.name,
      role: formData.role,
      teamNumber: formData.teamNumber ? parseInt(formData.teamNumber) : undefined,
      teamName: formData.teamNumber ? TEAMS.find(t => t.id === parseInt(formData.teamNumber))?.name : undefined,
      level: formData.level,
      experience: formData.experience,
      gCoins: formData.gCoins
    };

    setUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u));
    setShowCreateForm(false);
    setEditingUser(null);
    resetForm();
  };

  const handleToggleUserStatus = async (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ СЌС‚РѕРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const resetForm = () => {
    setFormData({
      telegramId: '',
      name: '',
      role: 'worker',
      teamNumber: '',
      level: 1,
      experience: 0,
      gCoins: 100
    });
  };

  const getRoleInfo = (role: string) => {
    return USER_ROLES.find(r => r.value === role) || USER_ROLES[0];
  };

  const getTeamInfo = (teamNumber?: number) => {
    return TEAMS.find(t => t.id === teamNumber);
  };

  const renderUserCard = (user: User) => (
    <div
      key={user.id}
      className="p-4 rounded-xl"
      style={{
        backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
        opacity: user.isActive ? 1 : 0.6
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-blue-500 bg-opacity-20">
            <User className="w-6 h-6 text-blue-500" />
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                {user.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getRoleInfo(user.role).color} text-white`}>
                {getRoleInfo(user.role).icon} {getRoleInfo(user.role).label}
              </span>
              {user.teamName && (
                <span className="px-2 py-1 rounded-full text-xs bg-indigo-500 bg-opacity-20 text-indigo-500">
                  {user.teamName}
                </span>
              )}
            </div>
            <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
              ID: {user.telegramId}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
              <span className="flex items-center">
                <Star className="w-3 h-3 mr-1" />
                РЈСЂРѕРІРµРЅСЊ {user.level}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1" />
                {user.gCoins} РјРѕРЅРµС‚
              </span>
              <span className="flex items-center">
                <Activity className="w-3 h-3 mr-1" />
                {user.tasksCompleted} Р·Р°РґР°С‡
              </span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(user.lastActive).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleToggleUserStatus(user.id)}
            className={`px-3 py-1 rounded-lg text-xs ${
              user.isActive 
                ? 'bg-green-500 bg-opacity-20 text-green-500' 
                : 'bg-red-500 bg-opacity-20 text-red-500'
            }`}
          >
            {user.isActive ? 'РђРєС‚РёРІРµРЅ' : 'РЈРІРѕР»РµРЅ'}
          </button>
          
          <button
            onClick={() => handleEditUser(user)}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="p-2 rounded-lg hover:bg-opacity-10 text-red-500"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(255,59,48,0.1)' : 'rgba(255,59,48,0.1)' }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Р—Р°РіРѕР»РѕРІРѕРє Рё РґРµР№СЃС‚РІРёСЏ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РЈРїСЂР°РІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            РЈРїСЂР°РІР»РµРЅРёРµ СЃРѕС‚СЂСѓРґРЅРёРєР°РјРё Рё СЂРѕР»СЏРјРё
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Р”РѕР±Р°РІРёС‚СЊ СЃРѕС‚СЂСѓРґРЅРёРєР°
        </button>
      </div>

      {/* РўР°Р±С‹ */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'active', label: 'РђРєС‚РёРІРЅС‹Рµ', icon: Users, count: users.filter(u => u.isActive).length },
          { id: 'dismissed', label: 'РЈРІРѕР»РµРЅРЅС‹Рµ', icon: UserMinus, count: users.filter(u => !u.isActive).length }
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

      {/* Р¤РёР»СЊС‚СЂС‹ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="РџРѕРёСЃРє РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№..."
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
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р’СЃРµ СЂРѕР»Рё</option>
          {USER_ROLES.map(role => (
            <option key={role.value} value={role.value}>
              {role.icon} {role.label}
            </option>
          ))}
        </select>

        <select
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р’СЃРµ РєРѕРјР°РЅРґС‹</option>
          {TEAMS.map(team => (
            <option key={team.id} value={team.id.toString()}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {/* РЎРїРёСЃРѕРє РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(renderUserCard)
        ) : (
          <div 
            className="p-8 rounded-xl text-center"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
            }}
          >
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
            <h3 className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
              {activeTab === 'active' ? 'РђРєС‚РёРІРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РЅРµС‚' : 'РЈРІРѕР»РµРЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РЅРµС‚'}
            </h3>
            <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
              {activeTab === 'active' 
                ? 'Р’СЃРµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё Р±С‹Р»Рё СѓРІРѕР»РµРЅС‹ РёР»Рё РЅРµ РЅР°Р№РґРµРЅС‹ РїРѕ Р·Р°РґР°РЅРЅС‹Рј С„РёР»СЊС‚СЂР°Рј'
                : 'Р’СЃРµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё Р°РєС‚РёРІРЅС‹'
              }
            </p>
          </div>
        )}
      </div>

      {/* РњРѕРґР°Р» СЃРѕР·РґР°РЅРёСЏ/СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                {editingUser ? 'Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ' : 'Р”РѕР±Р°РІРёС‚СЊ СЃРѕС‚СЂСѓРґРЅРёРєР°'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingUser(null);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-opacity-10"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Telegram ID *
                </label>
                <input
                  type="text"
                  value={formData.telegramId}
                  onChange={(e) => setFormData(prev => ({ ...prev, telegramId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Р’РІРµРґРёС‚Рµ Telegram ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РРјСЏ *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Р’РІРµРґРёС‚Рµ РёРјСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р РѕР»СЊ *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {USER_ROLES.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.icon} {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    РљРѕРјР°РЅРґР°
                  </label>
                  <select
                    value={formData.teamNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, teamNumber: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    <option value="">Р‘РµР· РєРѕРјР°РЅРґС‹</option>
                    {TEAMS.map(team => (
                      <option key={team.id} value={team.id.toString()}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {editingUser && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      РЈСЂРѕРІРµРЅСЊ
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.level}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      РћРїС‹С‚
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      РњРѕРЅРµС‚С‹
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.gCoins}
                      onChange={(e) => setFormData(prev => ({ ...prev, gCoins: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingUser(null);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme === 'dark' ? 'transparent' : '#F8F9FA',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РћС‚РјРµРЅР°
              </button>
              <button
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingUser ? 'РЎРѕС…СЂР°РЅРёС‚СЊ' : 'Р”РѕР±Р°РІРёС‚СЊ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
