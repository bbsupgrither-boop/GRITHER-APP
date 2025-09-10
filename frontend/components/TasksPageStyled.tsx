import { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Target, CheckCircle, Clock, AlertTriangle, Coins, Star, Calendar, Timer, User, Search } from './Icons';
import { Task } from '../types/tasks';
import { mockAppState } from '../data/mockData';

interface TasksPageStyledProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  tasks: any[];
  setTasks: (tasks: any[]) => void;
}

export function TasksPageStyled({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto, 
  tasks: globalTasks, 
  setTasks: setGlobalTasks 
}: TasksPageStyledProps) {
  const { currentUser } = mockAppState;
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'review' | 'overdue'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const tabs = [
    { id: 'active' as const, label: 'РђРєС‚РёРІРЅС‹Рµ', icon: Target },
    { id: 'review' as const, label: 'РќР° РїСЂРѕРІРµСЂРєРµ', icon: Clock },
    { id: 'completed' as const, label: 'Р’С‹РїРѕР»РЅРµРЅРЅС‹Рµ', icon: CheckCircle },
    { id: 'overdue' as const, label: 'РџСЂРѕСЃСЂРѕС‡РµРЅРЅС‹Рµ', icon: AlertTriangle }
  ];

  // РџСЂРµРѕР±СЂР°Р·СѓРµРј Р·Р°РґР°С‡Рё РёР· РіР»РѕР±Р°Р»СЊРЅРѕРіРѕ СЃРѕСЃС‚РѕСЏРЅРёСЏ
  const convertGlobalTasksToTasks = (globalTasks: any[]) => {
    return globalTasks
      .filter(task => task.isPublished)
      .map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        reward: task.reward,
        rewardType: task.rewardType,
        deadline: task.deadline,
        createdAt: task.createdAt,
        status: task.status,
        priority: task.priority || 'medium',
        assignedTo: currentUser.name,
        completedAt: task.completedAt,
        category: task.category || 'general'
      }));
  };

  const convertedTasks = convertGlobalTasksToTasks(globalTasks);

  // РћР±РЅРѕРІР»СЏРµРј РІСЂРµРјСЏ РєР°Р¶РґСѓСЋ СЃРµРєСѓРЅРґСѓ РґР»СЏ С‚Р°Р№РјРµСЂР°
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // РџСЂРѕРІРµСЂСЏРµРј РїСЂРѕСЃСЂРѕС‡РµРЅРЅС‹Рµ Р·Р°РґР°С‡Рё
  const isTaskOverdue = (deadline: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    return currentTime > deadlineDate && activeTab === 'active';
  };

  // РџРѕР»СѓС‡Р°РµРј РІСЂРµРјСЏ РґРѕ РґРµРґР»Р°Р№РЅР°
  const getTimeRemaining = (deadline: string) => {
    if (!deadline) return 'Р‘пїЅпїЅР· РґРµРґР»Р°Р№РЅР°';
    
    const deadlineDate = new Date(deadline);
    const difference = deadlineDate.getTime() - currentTime.getTime();

    if (difference <= 0) return 'РџСЂРѕСЃСЂРѕС‡РµРЅРѕ';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    if (days > 0) return `${days}Рґ ${hours}С‡`;
    if (hours > 0) return `${hours}С‡ ${minutes}Рј`;
    return `${minutes}Рј`;
  };

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ Р·Р°РґР°С‡
  const getFilteredTasks = () => {
    let filtered = convertedTasks;

    // Р¤РёР»СЊС‚СЂ РїРѕ РїРѕРёСЃРєСѓ
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Р¤РёР»СЊС‚СЂ РїРѕ С‚Р°Р±Р°Рј
    switch (activeTab) {
      case 'active':
        return filtered.filter(task => task.status === 'active' && !isTaskOverdue(task.deadline));
      case 'review':
        return filtered.filter(task => task.status === 'review');
      case 'completed':
        return filtered.filter(task => task.status === 'completed');
      case 'overdue':
        return filtered.filter(task => task.status === 'active' && isTaskOverdue(task.deadline));
      default:
        return filtered;
    }
  };

  const filteredTasks = getFilteredTasks();
  const activeCount = convertedTasks.filter(task => task.status === 'active' && !isTaskOverdue(task.deadline)).length;
  const reviewCount = convertedTasks.filter(task => task.status === 'review').length;
  const completedCount = convertedTasks.filter(task => task.status === 'completed').length;
  const overdueCount = convertedTasks.filter(task => task.status === 'active' && isTaskOverdue(task.deadline)).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleTaskAction = (task: any, action: 'start' | 'complete' | 'review') => {
    const updatedTasks = globalTasks.map(t => {
      if (t.id === task.id) {
        switch (action) {
          case 'start':
            return { ...t, status: 'active' };
          case 'review':
            return { ...t, status: 'review' };
          case 'complete':
            return { ...t, status: 'completed', completedAt: new Date().toISOString() };
          default:
            return t;
        }
      }
      return t;
    });
    setGlobalTasks(updatedTasks);
  };

  const renderTaskCard = (task: any) => (
    <div key={task.id} className="glass-card rounded-2xl p-4 apple-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          task.status === 'completed' 
            ? 'bg-gradient-to-br from-green-400 to-green-600' 
            : task.status === 'review'
            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
            : isTaskOverdue(task.deadline)
            ? 'bg-gradient-to-br from-red-400 to-red-600'
            : 'bg-gradient-to-br from-blue-400 to-blue-600'
        }`}>
          {task.status === 'completed' ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : task.status === 'review' ? (
            <Clock className="w-6 h-6 text-white" />
          ) : isTaskOverdue(task.deadline) ? (
            <AlertTriangle className="w-6 h-6 text-white" />
          ) : (
            <Target className="w-6 h-6 text-white" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-medium text-foreground">{task.title}</div>
              <div className="text-sm text-muted-foreground">{task.description}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority === 'high' ? 'Р’С‹СЃРѕРєРёР№' : 
                 task.priority === 'medium' ? 'РЎСЂРµРґРЅРёР№' : 'РќРёР·РєРёР№'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Coins className="w-3 h-3" />
                <span>{task.reward} {task.rewardType === 'coins' ? 'РјРѕРЅРµС‚' : 'XP'}</span>
              </div>
              {task.deadline && (
                <div className={`flex items-center gap-1 ${
                  isTaskOverdue(task.deadline) ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  <Timer className="w-3 h-3" />
                  <span>{getTimeRemaining(task.deadline)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{task.assignedTo}</span>
            </div>
            
            <div className="flex gap-2">
              {task.status === 'active' && !isTaskOverdue(task.deadline) && (
                <button
                  onClick={() => handleTaskAction(task, 'review')}
                  className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs hover:scale-[0.98] transition-transform"
                >
                  Р’С‹РїРѕР»РЅРёС‚СЊ
                </button>
              )}
              {task.status === 'review' && (
                <div className="bg-yellow-100 text-yellow-600 px-3 py-1.5 rounded-lg text-xs">
                  РќР° РїСЂРѕРІРµСЂРєРµ
                </div>
              )}
              {task.status === 'completed' && (
                <div className="bg-green-100 text-green-600 px-3 py-1.5 rounded-lg text-xs">
                  Р’С‹РїРѕР»РЅРµРЅРѕ
                </div>
              )}
              {isTaskOverdue(task.deadline) && task.status === 'active' && (
                <div className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs">
                  РџСЂРѕСЃСЂРѕС‡РµРЅРѕ
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Р—Р°РґР°С‡Рё" 
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
        user={currentUser}
      />
      
      <div className="pt-20 pb-20 p-6">
        {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="glass-card p-3 rounded-2xl apple-shadow text-center">
            <div className="text-xl font-medium text-blue-600 mb-1">
              {activeCount}
            </div>
            <div className="text-xs text-muted-foreground">
              РђРєС‚РёРІРЅС‹Рµ
            </div>
          </div>
          <div className="glass-card p-3 rounded-2xl apple-shadow text-center">
            <div className="text-xl font-medium text-yellow-600 mb-1">
              {reviewCount}
            </div>
            <div className="text-xs text-muted-foreground">
              РќР° РїСЂРѕРІРµСЂРєРµ
            </div>
          </div>
          <div className="glass-card p-3 rounded-2xl apple-shadow text-center">
            <div className="text-xl font-medium text-green-600 mb-1">
              {completedCount}
            </div>
            <div className="text-xs text-muted-foreground">
              Р’С‹РїРѕР»РЅРµРЅРѕ
            </div>
          </div>
          <div className="glass-card p-3 rounded-2xl apple-shadow text-center">
            <div className="text-xl font-medium text-red-600 mb-1">
              {overdueCount}
            </div>
            <div className="text-xs text-muted-foreground">
              РџСЂРѕСЃСЂРѕС‡РµРЅРѕ
            </div>
          </div>
        </div>

        {/* РџРѕРёСЃРє */}
        <div className="glass-card rounded-2xl p-4 mb-6 apple-shadow">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="РџРѕРёСЃРє Р·Р°РґР°С‡..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                вњ•
              </button>
            )}
          </div>
        </div>

        {/* РўР°Р±С‹ */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card text-foreground hover:scale-[0.98]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* РЎРїРёСЃРѕРє Р·Р°РґР°С‡ */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(renderTaskCard)
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ' : 'РќРµС‚ Р·Р°РґР°С‡'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery 
                  ? 'РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ РїРѕРёСЃРєРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ'
                  : activeTab === 'active'
                  ? 'РЈ РІР°СЃ РЅРµС‚ Р°РєС‚РёРІРЅС‹С… Р·Р°РґР°С‡'
                  : activeTab === 'completed'
                  ? 'РЈ РІР°СЃ РЅРµС‚ РІС‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡'
                  : activeTab === 'review'
                  ? 'РќРµС‚ Р·Р°РґР°С‡ РЅР° РїСЂРѕРІРµСЂРєРµ'
                  : 'РЈ РІР°СЃ РЅРµС‚ РїСЂРѕСЃСЂРѕС‡РµРЅРЅС‹С… Р·Р°РґР°С‡'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform"
                >
                  РћС‡РёСЃС‚РёС‚СЊ РїРѕРёСЃРє
                </button>
              )}
            </div>
          )}
        </div>

        {/* РњРѕС‚РёРІР°С†РёРѕРЅРЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ */}
        {convertedTasks.length > 0 && !searchQuery && (
          <div className="glass-card rounded-2xl p-4 mt-6 apple-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">РЎРѕРІРµС‚ РґРЅСЏ</div>
                <div className="text-sm text-muted-foreground">
                  {activeTab === 'active' 
                    ? 'Р’С‹РїРѕР»РЅСЏР№С‚Рµ Р·Р°РґР°С‡Рё РІРѕРІСЂРµРјСЏ, С‡С‚РѕР±С‹ РїРѕР»СѓС‡РёС‚СЊ РїРѕР»РЅСѓСЋ РЅР°РіСЂР°РґСѓ!'
                    : activeTab === 'completed'
                    ? `РћС‚Р»РёС‡РЅРѕ! Р’С‹ РІС‹РїРѕР»РЅРёР»Рё ${completedCount} Р·Р°РґР°С‡. РџСЂРѕРґРѕР»Р¶Р°Р№С‚Рµ РІ С‚РѕРј Р¶Рµ РґСѓС…Рµ!`
                    : activeTab === 'overdue'
                    ? 'РџРѕСЃС‚Р°СЂР°Р№С‚РµСЃСЊ РІС‹РїРѕР»РЅРёС‚СЊ РїСЂРѕСЃСЂРѕС‡РµРЅРЅС‹Рµ Р·Р°РґР°С‡Рё РєР°Рє РјРѕР¶РЅРѕ СЃРєРѕСЂРµРµ.'
                    : 'Р”РѕР¶РґРёС‚РµСЃСЊ РїСЂРѕРІРµСЂРєРё РІР°С€РёС… Р·Р°РґР°С‡ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРј.'
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}
