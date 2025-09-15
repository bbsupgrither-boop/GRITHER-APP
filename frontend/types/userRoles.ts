// РўРёРїС‹ СЂРѕР»РµР№ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
export type UserRole = 'worker' | 'team_lead' | 'junior_admin' | 'senior_admin' | 'main_admin';

// РРЅС‚РµСЂС„РµР№СЃ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ СЃ СЂРѕР»СЊСЋ
export interface UserWithRole {
  id: string;
  name: string;
  teamNumber?: number;
  role: UserRole;
  permissions: string[];
}

// РРЅС‚РµСЂС„РµР№СЃ РєРѕРјР°РЅРґС‹
export interface Team {
  teamNumber: number;
  teamName: string;
  teamLead: UserWithRole;
  workers: UserWithRole[];
}

// РџСЂР°РІР° РґРѕСЃС‚СѓРїР° РґР»СЏ РєР°Р¶РґРѕР№ СЂРѕР»Рё
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

// Р‘Р°Р·Р° РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ СЃ СЂРѕР»СЏРјРё
export const USERS_DATABASE: UserWithRole[] = [
  // рџЏ† Р“Р›РђР’РќР«Р• РђР”РњРРќР« (РІС‹СЃС€РёРµ РїСЂР°РІР°)
  { id: '123456789', name: 'РРІР°РЅ РџРµС‚СЂРѕРІ', role: 'main_admin', permissions: ROLE_PERMISSIONS.main_admin },
  { id: '987654321', name: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°', role: 'main_admin', permissions: ROLE_PERMISSIONS.main_admin },
  
  // рџҐ‡ РЎРўРђР РЁРР• РђР”РњРРќР«
  { id: '111222333', name: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  { id: '444555666', name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  { id: '1609556178', name: 'РђРґРјРёРЅ РЎС‚Р°СЂС€РёР№', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  
  // рџҐ€ РњР›РђР”РЁРР• РђР”РњРРќР«
  { id: '777888999', name: 'Р”РјРёС‚СЂРёР№ Р’РѕР»РєРѕРІ', role: 'junior_admin', permissions: ROLE_PERMISSIONS.junior_admin },
  { id: '000111222', name: 'РђРЅРЅР° Р›РµР±РµРґРµРІР°', role: 'junior_admin', permissions: ROLE_PERMISSIONS.junior_admin },
  
  // рџ‘Ґ РўРРњР›РР”Р«
  { id: '333444555', name: 'РЎРµСЂРіРµР№ РћСЂР»РѕРІ', teamNumber: 1, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  { id: '666777888', name: 'РћР»СЊРіР° РЎРѕРєРѕР»РѕРІР°', teamNumber: 2, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  { id: '999000111', name: 'РњРёС…Р°РёР» Р С‹Р±Р°РєРѕРІ', teamNumber: 3, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  
  // рџ‘· Р’РћР РљР•Р Р«
  { id: '111222333', name: 'РђР»РµРєСЃР°РЅРґСЂ РРІР°РЅРѕРІ', teamNumber: 1, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '222333444', name: 'Р•РєР°С‚РµСЂРёРЅР° РЎРјРёСЂРЅРѕРІР°', teamNumber: 1, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '333444555', name: 'Р’Р»Р°РґРёРјРёСЂ РљРѕР·Р»РѕРІ', teamNumber: 2, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '444555666', name: 'РќР°С‚Р°Р»СЊСЏ РџРµС‚СЂРѕРІР°', teamNumber: 2, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '555666777', name: 'РђРЅРґСЂРµР№ РЎРѕРєРѕР»РѕРІ', teamNumber: 3, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '666777888', name: 'РўР°С‚СЊСЏРЅР° Р’РѕР»РєРѕРІР°', teamNumber: 3, role: 'worker', permissions: ROLE_PERMISSIONS.worker }
];

// РљРѕРјР°РЅРґС‹
export const TEAMS_DATABASE: Team[] = [
  {
    teamNumber: 1,
    teamName: 'РљРѕРјР°РЅРґР° РђР»СЊС„Р°',
    teamLead: USERS_DATABASE.find(u => u.id === '333444555')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 1 && u.role === 'worker')
  },
  {
    teamNumber: 2,
    teamName: 'РљРѕРјР°РЅРґР° Р‘РµС‚Р°',
    teamLead: USERS_DATABASE.find(u => u.id === '666777888')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 2 && u.role === 'worker')
  },
  {
    teamNumber: 3,
    teamName: 'РљРѕРјР°РЅРґР° Р“Р°РјРјР°',
    teamLead: USERS_DATABASE.find(u => u.id === '999000111')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 3 && u.role === 'worker')
  }
];

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РїРѕ ID
export const getUserById = (id: string): UserWithRole | null => {
  return USERS_DATABASE.find(user => user.id === id) || null;
};

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РєРѕРјР°РЅРґС‹ РїРѕ РЅРѕРјРµСЂСѓ
export const getTeamByNumber = (teamNumber: number): Team | null => {
  return TEAMS_DATABASE.find(team => team.teamNumber === teamNumber) || null;
};

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РєРѕРјР°РЅРґС‹ С‚РёРјР»РёРґР°
export const getTeamByTeamLeadId = (teamLeadId: string): Team | null => {
  return TEAMS_DATABASE.find(team => team.teamLead.id === teamLeadId) || null;
};

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё РїСЂР°РІ РґРѕСЃС‚СѓРїР°
export const hasPermission = (userId: string, permission: string): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  
  return user.permissions.includes(permission);
};

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё СЂРѕР»Рё
export const hasRole = (userId: string, role: UserRole): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  
  return user.role === role;
};

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РІСЃРµС… РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РєРѕРјР°РЅРґС‹
export const getTeamMembers = (teamLeadId: string): UserWithRole[] => {
  const team = getTeamByTeamLeadId(teamLeadId);
  if (!team) return [];
  
  return [team.teamLead, ...team.workers];
};
