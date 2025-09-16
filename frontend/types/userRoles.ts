// Р В РЎС›Р В РЎвЂР В РЎвЂ”Р РЋРІР‚в„– Р РЋР вЂљР В РЎвЂўР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“
export type UserRole = 'worker' | 'team_lead' | 'junior_admin' | 'senior_admin' | 'main_admin';

// Р В Р’ВР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљР РЋРІР‚С›Р В Р’ВµР В РІвЂћвЂ“Р РЋР С“ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ Р РЋР С“ Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋР вЂ№
export interface UserWithRole {
  id: string;
  name: string;
  teamNumber?: number;
  role: UserRole;
  permissions: string[];
}

// Р В Р’ВР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљР РЋРІР‚С›Р В Р’ВµР В РІвЂћвЂ“Р РЋР С“ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„–
export interface Team {
  teamNumber: number;
  teamName: string;
  teamLead: UserWithRole;
  workers: UserWithRole[];
}

// Р В РЎСџР РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В° Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂќР В Р’В°Р В Р’В¶Р В РўвЂР В РЎвЂўР В РІвЂћвЂ“ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ
export const ROLE_PERMISSIONS = {
  worker: [
    'view_profile',
    'view_tasks',
    'complete_tasks'
  ],
  team_lead: [
    'view_profile',
    'view_tasks',
    'complete_tasks',
    'assign_tasks',
    'view_team',
    'manage_team_tasks',
    'view_team_statistics'
  ],
  junior_admin: [
    'view_profile',
    'view_tasks',
    'complete_tasks',
    'assign_tasks',
    'view_team',
    'manage_team_tasks',
    'view_team_statistics',
    'view_all_users',
    'moderate_content',
    'view_statistics',
    'manage_cases'
  ],
  senior_admin: [
    'view_profile',
    'view_tasks',
    'complete_tasks',
    'assign_tasks',
    'view_team',
    'manage_team_tasks',
    'view_team_statistics',
    'view_all_users',
    'moderate_content',
    'view_statistics',
    'manage_cases',
    'manage_users',
    'manage_content',
    'view_admin_panel'
  ],
  main_admin: [
    'view_profile',
    'view_tasks',
    'complete_tasks',
    'assign_tasks',
    'view_team',
    'manage_team_tasks',
    'view_team_statistics',
    'view_all_users',
    'moderate_content',
    'view_statistics',
    'manage_cases',
    'manage_users',
    'manage_content',
    'view_admin_panel',
    'assign_roles',
    'manage_system',
    'view_all_statistics',
    'manage_teams'
  ]
};

// Р В РІР‚ВР В Р’В°Р В Р’В·Р В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ Р РЋР С“ Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ
export const USERS_DATABASE: UserWithRole[] = [
  // РЎР‚РЎСџР РЏРІР‚В  Р В РІР‚СљР В РІР‚С”Р В РЎвЂ™Р В РІР‚в„ўР В РЎСљР В Р’В«Р В РІР‚Сћ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В Р’В« (Р В Р вЂ Р РЋРІР‚в„–Р РЋР С“Р РЋРІвЂљВ¬Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В°)
  { id: '123456789', name: 'Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ ', role: 'main_admin', permissions: ROLE_PERMISSIONS.main_admin },
  { id: '987654321', name: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°', role: 'main_admin', permissions: ROLE_PERMISSIONS.main_admin },
  
  // РЎР‚РЎСџРўС’РІР‚РЋ Р В Р Р‹Р В РЎС›Р В РЎвЂ™Р В Р’В Р В Р РѓР В Р’ВР В РІР‚Сћ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В Р’В«
  { id: '111222333', name: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В РЎв„ўР В РЎвЂўР В Р’В·Р В Р’В»Р В РЎвЂўР В Р вЂ ', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  { id: '444555666', name: 'Р В РІР‚СћР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р’В° Р В РЎС™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  { id: '1609556178', name: 'Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  
  // РЎР‚РЎСџРўС’РІвЂљВ¬ Р В РЎС™Р В РІР‚С”Р В РЎвЂ™Р В РІР‚СњР В Р РѓР В Р’ВР В РІР‚Сћ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В Р’В«
  { id: '777888999', name: 'Р В РІР‚СњР В РЎВР В РЎвЂР РЋРІР‚С™Р РЋР вЂљР В РЎвЂР В РІвЂћвЂ“ Р В РІР‚в„ўР В РЎвЂўР В Р’В»Р В РЎвЂќР В РЎвЂўР В Р вЂ ', role: 'junior_admin', permissions: ROLE_PERMISSIONS.junior_admin },
  { id: '000111222', name: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В РІР‚С”Р В Р’ВµР В Р’В±Р В Р’ВµР В РўвЂР В Р’ВµР В Р вЂ Р В Р’В°', role: 'junior_admin', permissions: ROLE_PERMISSIONS.junior_admin },
  
  // РЎР‚РЎСџРІР‚ВРўС’ Р В РЎС›Р В Р’ВР В РЎС™Р В РІР‚С”Р В Р’ВР В РІР‚СњР В Р’В«
  { id: '333444555', name: 'Р В Р Р‹Р В Р’ВµР РЋР вЂљР В РЎвЂ“Р В Р’ВµР В РІвЂћвЂ“ Р В РЎвЂєР РЋР вЂљР В Р’В»Р В РЎвЂўР В Р вЂ ', teamNumber: 1, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  { id: '666777888', name: 'Р В РЎвЂєР В Р’В»Р РЋР Р‰Р В РЎвЂ“Р В Р’В° Р В Р Р‹Р В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В Р’В°', teamNumber: 2, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  { id: '999000111', name: 'Р В РЎС™Р В РЎвЂР РЋРІР‚В¦Р В Р’В°Р В РЎвЂР В Р’В» Р В Р’В Р РЋРІР‚в„–Р В Р’В±Р В Р’В°Р В РЎвЂќР В РЎвЂўР В Р вЂ ', teamNumber: 3, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  
  // РЎР‚РЎСџРІР‚ВР’В· Р В РІР‚в„ўР В РЎвЂєР В Р’В Р В РЎв„ўР В РІР‚СћР В Р’В Р В Р’В«
  { id: '111222333', name: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’В°Р В Р вЂ¦Р В РўвЂР РЋР вЂљ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ', teamNumber: 1, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '222333444', name: 'Р В РІР‚СћР В РЎвЂќР В Р’В°Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљР В РЎвЂР В Р вЂ¦Р В Р’В° Р В Р Р‹Р В РЎВР В РЎвЂР РЋР вЂљР В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°', teamNumber: 1, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '333444555', name: 'Р В РІР‚в„ўР В Р’В»Р В Р’В°Р В РўвЂР В РЎвЂР В РЎВР В РЎвЂР РЋР вЂљ Р В РЎв„ўР В РЎвЂўР В Р’В·Р В Р’В»Р В РЎвЂўР В Р вЂ ', teamNumber: 2, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '444555666', name: 'Р В РЎСљР В Р’В°Р РЋРІР‚С™Р В Р’В°Р В Р’В»Р РЋР Р‰Р РЋР РЏ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°', teamNumber: 2, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '555666777', name: 'Р В РЎвЂ™Р В Р вЂ¦Р В РўвЂР РЋР вЂљР В Р’ВµР В РІвЂћвЂ“ Р В Р Р‹Р В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ ', teamNumber: 3, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '666777888', name: 'Р В РЎС›Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰Р РЋР РЏР В Р вЂ¦Р В Р’В° Р В РІР‚в„ўР В РЎвЂўР В Р’В»Р В РЎвЂќР В РЎвЂўР В Р вЂ Р В Р’В°', teamNumber: 3, role: 'worker', permissions: ROLE_PERMISSIONS.worker }
];

// Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„–
export const TEAMS_DATABASE: Team[] = [
  {
    teamNumber: 1,
    teamName: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РЎвЂ™Р В Р’В»Р РЋР Р‰Р РЋРІР‚С›Р В Р’В°',
    teamLead: USERS_DATABASE.find(u => u.id === '333444555')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 1 && u.role === 'worker')
  },
  {
    teamNumber: 2,
    teamName: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚ВР В Р’ВµР РЋРІР‚С™Р В Р’В°',
    teamLead: USERS_DATABASE.find(u => u.id === '666777888')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 2 && u.role === 'worker')
  },
  {
    teamNumber: 3,
    teamName: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В° Р В РІР‚СљР В Р’В°Р В РЎВР В РЎВР В Р’В°',
    teamLead: USERS_DATABASE.find(u => u.id === '999000111')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 3 && u.role === 'worker')
  }
];

// Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂў ID
export const getUserById = (id: string): UserWithRole | null => {
  return USERS_DATABASE.find(user => user.id === id) || null;
};

// Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„– Р В РЎвЂ”Р В РЎвЂў Р В Р вЂ¦Р В РЎвЂўР В РЎВР В Р’ВµР РЋР вЂљР РЋРЎвЂњ
export const getTeamByNumber = (teamNumber: number): Team | null => {
  return TEAMS_DATABASE.find(team => team.teamNumber === teamNumber) || null;
};

// Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„– Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂР В Р’В°
export const getTeamByTeamLeadId = (teamLeadId: string): Team | null => {
  return TEAMS_DATABASE.find(team => team.teamLead.id === teamLeadId) || null;
};

// Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В РЎвЂ Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ  Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°
export const hasPermission = (userId: string, permission: string): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  
  return user.permissions.includes(permission);
};

// Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ
export const hasRole = (userId: string, role: UserRole): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  
  return user.role === role;
};

// Р В Р’В¤Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р вЂ Р РЋР С“Р В Р’ВµР РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„–
export const getTeamMembers = (teamLeadId: string): UserWithRole[] => {
  const team = getTeamByTeamLeadId(teamLeadId);
  if (!team) return [];
  
  return [team.teamLead, ...team.workers];
};
