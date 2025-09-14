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

    // Получаем пользователя из базы данных
    const userData = getUserById(userId);
    
    if (userData) {
      setUser(userData);
      setUserRole(userData.role);
      
      // Если пользователь тимлид, получаем его команду
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

  // Функция проверки прав доступа
  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    return hasPermission(userId, permission);
  };

  // Функция проверки роли
  const checkRole = (role: UserRole): boolean => {
    if (!user) return false;
    return hasRole(userId, role);
  };

  // Проверка доступа к админ панели
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
