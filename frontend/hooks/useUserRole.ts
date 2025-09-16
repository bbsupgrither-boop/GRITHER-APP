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

    // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
    const userData = getUserById(userId);
    
    if (userData) {
      setUser(userData);
      setUserRole(userData.role);
      
      // Р В РІР‚СћР РЋР С“Р В Р’В»Р В РЎвЂ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰ Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ, Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р В Р’ВµР В РЎВ Р В Р’ВµР В РЎвЂ“Р В РЎвЂў Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРЎвЂњ
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

  // Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В РЎвЂ Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ  Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°
  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    return hasPermission(userId, permission);
  };

  // Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ
  const checkRole = (role: UserRole): boolean => {
    if (!user) return false;
    return hasRole(userId, role);
  };

  // Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В Р’В° Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р В РЎвЂќ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р В РЎвЂ
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
