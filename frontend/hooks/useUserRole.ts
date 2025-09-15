import { useState, useEffect } from 'react';
import { 
  UserWithRole, 
  UserRole, 
  getUserById, 
  hasPermission, 
  hasRole, 
  getTeamMembers,
  getTeamByTeamLeadId 
} from '../types/userRoles';

interface UseUserRoleReturn {
  user: UserWithRole | null;
  userRole: UserRole | null;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  canAccessAdminPanel: boolean;
  teamMembers: UserWithRole[];
  isLoading: boolean;
}

export const useUserRole = (userId: string): UseUserRoleReturn => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [teamMembers, setTeamMembers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    // РџРѕР»СѓС‡Р°РµРј РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РёР· Р±Р°Р·С‹ РґР°РЅРЅС‹С…
    const userData = getUserById(userId);
    
    if (userData) {
      setUser(userData);
      setUserRole(userData.role);
      
      // Р•СЃР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ С‚РёРјР»РёРґ, РїРѕР»СѓС‡Р°РµРј РµРіРѕ РєРѕРјР°РЅРґСѓ
      if (userData.role === 'team_lead') {
        const team = getTeamByTeamLeadId(userId);
        if (team) {
          setTeamMembers([team.teamLead, ...team.workers]);
        }
      }
    } else {
      setUser(null);
      setUserRole(null);
      setTeamMembers([]);
    }
    
    setIsLoading(false);
  }, [userId]);

  // Р¤СѓРЅРєС†РёСЏ РїСЂРѕРІРµСЂРєРё РїСЂР°РІ РґРѕСЃС‚СѓРїР°
  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    return hasPermission(userId, permission);
  };

  // Р¤СѓРЅРєС†РёСЏ РїСЂРѕРІРµСЂРєРё СЂРѕР»Рё
  const checkRole = (role: UserRole): boolean => {
    if (!user) return false;
    return hasRole(userId, role);
  };

  // РџСЂРѕРІРµСЂРєР° РґРѕСЃС‚СѓРїР° Рє Р°РґРјРёРЅ РїР°РЅРµР»Рё
  const canAccessAdminPanel = userRole !== null && 
    ['team_lead', 'junior_admin', 'senior_admin', 'main_admin'].includes(userRole);

  return {
    user,
    userRole,
    hasPermission: checkPermission,
    hasRole: checkRole,
    canAccessAdminPanel,
    teamMembers,
    isLoading
  };
};
