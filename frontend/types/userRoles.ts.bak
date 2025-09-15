// Типы ролей пользователей
export type UserRole = 'worker' | 'team_lead' | 'junior_admin' | 'senior_admin' | 'main_admin';

// Интерфейс пользователя с ролью
export interface UserWithRole {
  id: string;
  name: string;
  teamNumber?: number;
  role: UserRole;
  permissions: string[];
}

// Интерфейс команды
export interface Team {
  teamNumber: number;
  teamName: string;
  teamLead: UserWithRole;
  workers: UserWithRole[];
}

// Права доступа для каждой роли
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

// База данных пользователей с ролями
export const USERS_DATABASE: UserWithRole[] = [
  // 🏆 ГЛАВНЫЕ АДМИНЫ (высшие права)
  { id: '123456789', name: 'Иван Петров', role: 'main_admin', permissions: ROLE_PERMISSIONS.main_admin },
  { id: '987654321', name: 'Мария Сидорова', role: 'main_admin', permissions: ROLE_PERMISSIONS.main_admin },
  
  // 🥇 СТАРШИЕ АДМИНЫ
  { id: '111222333', name: 'Алексей Козлов', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  { id: '444555666', name: 'Елена Морозова', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  { id: '1609556178', name: 'Админ Старший', role: 'senior_admin', permissions: ROLE_PERMISSIONS.senior_admin },
  
  // 🥈 МЛАДШИЕ АДМИНЫ
  { id: '777888999', name: 'Дмитрий Волков', role: 'junior_admin', permissions: ROLE_PERMISSIONS.junior_admin },
  { id: '000111222', name: 'Анна Лебедева', role: 'junior_admin', permissions: ROLE_PERMISSIONS.junior_admin },
  
  // 👥 ТИМЛИДЫ
  { id: '333444555', name: 'Сергей Орлов', teamNumber: 1, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  { id: '666777888', name: 'Ольга Соколова', teamNumber: 2, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  { id: '999000111', name: 'Михаил Рыбаков', teamNumber: 3, role: 'team_lead', permissions: ROLE_PERMISSIONS.team_lead },
  
  // 👷 ВОРКЕРЫ
  { id: '111222333', name: 'Александр Иванов', teamNumber: 1, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '222333444', name: 'Екатерина Смирнова', teamNumber: 1, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '333444555', name: 'Владимир Козлов', teamNumber: 2, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '444555666', name: 'Наталья Петрова', teamNumber: 2, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '555666777', name: 'Андрей Соколов', teamNumber: 3, role: 'worker', permissions: ROLE_PERMISSIONS.worker },
  { id: '666777888', name: 'Татьяна Волкова', teamNumber: 3, role: 'worker', permissions: ROLE_PERMISSIONS.worker }
];

// Команды
export const TEAMS_DATABASE: Team[] = [
  {
    teamNumber: 1,
    teamName: 'Команда Альфа',
    teamLead: USERS_DATABASE.find(u => u.id === '333444555')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 1 && u.role === 'worker')
  },
  {
    teamNumber: 2,
    teamName: 'Команда Бета',
    teamLead: USERS_DATABASE.find(u => u.id === '666777888')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 2 && u.role === 'worker')
  },
  {
    teamNumber: 3,
    teamName: 'Команда Гамма',
    teamLead: USERS_DATABASE.find(u => u.id === '999000111')!,
    workers: USERS_DATABASE.filter(u => u.teamNumber === 3 && u.role === 'worker')
  }
];

// Функция для получения пользователя по ID
export const getUserById = (id: string): UserWithRole | null => {
  return USERS_DATABASE.find(user => user.id === id) || null;
};

// Функция для получения команды по номеру
export const getTeamByNumber = (teamNumber: number): Team | null => {
  return TEAMS_DATABASE.find(team => team.teamNumber === teamNumber) || null;
};

// Функция для получения команды тимлида
export const getTeamByTeamLeadId = (teamLeadId: string): Team | null => {
  return TEAMS_DATABASE.find(team => team.teamLead.id === teamLeadId) || null;
};

// Функция для проверки прав доступа
export const hasPermission = (userId: string, permission: string): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  
  return user.permissions.includes(permission);
};

// Функция для проверки роли
export const hasRole = (userId: string, role: UserRole): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  
  return user.role === role;
};

// Функция для получения всех пользователей команды
export const getTeamMembers = (teamLeadId: string): UserWithRole[] => {
  const team = getTeamByTeamLeadId(teamLeadId);
  if (!team) return [];
  
  return [team.teamLead, ...team.workers];
};
