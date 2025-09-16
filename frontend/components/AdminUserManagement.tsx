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

// Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ UserData Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦

interface Team {
  id: number;
  name: string;
  teamLeadId: string;
  teamLeadName: string;
  memberCount: number;
}

const USER_ROLES = [
  { value: 'worker', label: 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В Р вЂ¦Р В РЎвЂР В РЎвЂќ', icon: 'РЎР‚РЎСџРІР‚ВР’В¤', color: 'bg-gray-500' },
  { value: 'team_lead', label: 'Р В РЎС›Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ', icon: 'РЎР‚РЎСџРІР‚ВРІР‚В', color: 'bg-blue-500' },
  { value: 'junior_admin', label: 'Р В РЎС™Р В Р’В»Р В Р’В°Р В РўвЂР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦', icon: 'РЎР‚РЎСџРІР‚С”Р Р‹Р С—РЎвЂР РЏ', color: 'bg-green-500' },
  { value: 'senior_admin', label: 'Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦', icon: 'Р Р†Р’В­РЎвЂ™', color: 'bg-purple-500' },
  { value: 'main_admin', label: 'Р В РІР‚СљР В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦', icon: 'РЎР‚РЎСџРІР‚ВРІР‚В', color: 'bg-orange-500' }
];

const TEAMS = [
  { id: 1, name: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РЎвЂ™', teamLeadId: '1192050960', teamLeadName: 'Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“' },
  { id: 2, name: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚В', teamLeadId: '639897713', teamLeadName: 'Р В РІР‚в„ўР В РЎвЂР В РЎвЂќР В Р’В°' },
  { id: 3, name: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚в„ў', teamLeadId: '1265713870', teamLeadName: 'Р В РЎСљР В РЎвЂР В РЎвЂќР В РЎвЂР РЋРІР‚С™Р В Р’В°' },
  { id: 4, name: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚Сљ', teamLeadId: '484779656', teamLeadName: 'Р В Р Р‹Р В Р’ВµР РЋР вЂљР В РЎвЂ“Р В Р’ВµР В РІвЂћвЂ“' },
  { id: 5, name: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚Сњ', teamLeadId: '285529209', teamLeadName: 'Р В Р’В¤Р В Р’ВµР В РўвЂР РЋР РЏ' }
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

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
  useEffect(() => {
    loadUsers();
  }, []);

  // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ
  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, filterRole, filterTeam, filterStatus, activeTab]);

  const loadUsers = async () => {
    // Mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р вЂ¦Р В Р’В° Р В РЎвЂўР РЋР С“Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’Вµ Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂР В Р’В· userRoles.ts
    const mockUsers: User[] = [
      {
        id: '1',
        telegramId: '918064599',
        name: 'Р В РЎС™Р В РЎвЂР РЋР вЂљР В РЎвЂўР РЋР С“Р В Р’В»Р В Р’В°Р В Р вЂ ',
        role: 'worker',
        teamNumber: 1,
        teamName: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РЎвЂ™',
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
        name: 'Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“',
        role: 'team_lead',
        teamNumber: 1,
        teamName: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РЎвЂ™',
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
        name: 'Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“',
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
        name: 'Р В РІР‚СљР В РЎвЂўР РЋРІвЂљВ¬Р В Р’В°',
        role: 'worker',
        teamNumber: 2,
        teamName: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚В',
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

    // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂў Р РЋРІР‚С™Р В Р’В°Р В Р’В±Р РЋРЎвЂњ
    if (activeTab === 'active') {
      filtered = filtered.filter(user => user.isActive);
    } else if (activeTab === 'dismissed') {
      filtered = filtered.filter(user => !user.isActive);
    }

    // Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.telegramId.includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂў Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂў Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’Вµ
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
    if (window.confirm('Р В РІР‚в„ўР РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р вЂ¦Р РЋРІР‚в„–, Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂў Р РЋРІР‚В¦Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р РЋРЎвЂњР В РўвЂР В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР РЉР РЋРІР‚С™Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ?')) {
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
                Р В Р в‚¬Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР В Р вЂ¦Р РЋР Р‰ {user.level}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1" />
                {user.gCoins} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™
              </span>
              <span className="flex items-center">
                <Activity className="w-3 h-3 mr-1" />
                {user.tasksCompleted} Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ
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
            {user.isActive ? 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р’ВµР В Р вЂ¦' : 'Р В Р в‚¬Р В Р вЂ Р В РЎвЂўР В Р’В»Р В Р’ВµР В Р вЂ¦'}
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
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ Р В РЎвЂ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В Р вЂ¦Р В РЎвЂР В РЎвЂќР В Р’В°Р В РЎВР В РЎвЂ Р В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В Р вЂ¦Р В РЎвЂР В РЎвЂќР В Р’В°
        </button>
      </div>

      {/* Р В РЎС›Р В Р’В°Р В Р’В±Р РЋРІР‚в„– */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'active', label: 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ', icon: Users, count: users.filter(u => u.isActive).length },
          { id: 'dismissed', label: 'Р В Р в‚¬Р В Р вЂ Р В РЎвЂўР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ', icon: UserMinus, count: users.filter(u => !u.isActive).length }
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“..."
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
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ</option>
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
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„–</option>
          {TEAMS.map(team => (
            <option key={team.id} value={team.id.toString()}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ */}
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
              {activeTab === 'active' ? 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ Р В Р вЂ¦Р В Р’ВµР РЋРІР‚С™' : 'Р В Р в‚¬Р В Р вЂ Р В РЎвЂўР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ Р В Р вЂ¦Р В Р’ВµР РЋРІР‚С™'}
            </h3>
            <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
              {activeTab === 'active' 
                ? 'Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ Р В Р’В±Р РЋРІР‚в„–Р В Р’В»Р В РЎвЂ Р РЋРЎвЂњР В Р вЂ Р В РЎвЂўР В Р’В»Р В Р’ВµР В Р вЂ¦Р РЋРІР‚в„– Р В РЎвЂР В Р’В»Р В РЎвЂ Р В Р вЂ¦Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В РІвЂћвЂ“Р В РўвЂР В Р’ВµР В Р вЂ¦Р РЋРІР‚в„– Р В РЎвЂ”Р В РЎвЂў Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В РЎВ Р РЋРІР‚С›Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В РЎВ'
                : 'Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ Р В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–'
              }
            </p>
          </div>
        )}
      </div>

      {/* Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’В°Р В Р’В» Р РЋР С“Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ/Р РЋР вЂљР В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
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
                {editingUser ? 'Р В Р’В Р В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ' : 'Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В Р вЂ¦Р В РЎвЂР В РЎвЂќР В Р’В°'}
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
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Telegram ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В Р’ВР В РЎВР РЋР РЏ *
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
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂР В РЎВР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В Р’В Р В РЎвЂўР В Р’В»Р РЋР Р‰ *
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
                    Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В°
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
                    <option value="">Р В РІР‚ВР В Р’ВµР В Р’В· Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„–</option>
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
                      Р В Р в‚¬Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР В Р вЂ¦Р РЋР Р‰
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
                      Р В РЎвЂєР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™
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
                      Р В РЎС™Р В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™Р РЋРІР‚в„–
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
                Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’В°
              </button>
              <button
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingUser ? 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰' : 'Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
