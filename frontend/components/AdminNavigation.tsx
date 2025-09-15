п»їimport { Home, Trophy, CheckSquare, ShoppingCart, Users, Zap, Gamepad2, Box } from './Icons';

interface AdminNavigationProps {
  currentAdminPage: string;
  onNavigate: (page: string) => void;
}

export function AdminNavigation({ currentAdminPage, onNavigate }: AdminNavigationProps) {
  const adminPages = [
    {
      id: 'dashboard',
      label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ',
      icon: Home
    },
    {
      id: 'workers',
      label: 'Р вЂ™Р С•РЎР‚Р С”Р ВµРЎР‚РЎвЂ№',
      icon: Users
    },
    {
      id: 'battles',
      label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№',
      icon: Zap
    },
    {
      id: 'achievements',
      label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ', 
      icon: Trophy
    },
    {
      id: 'tasks',
      label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘',
      icon: CheckSquare
    },
    {
      id: 'shop',
      label: 'Р СљР В°Р С–Р В°Р В·Р С‘Р Р…',
      icon: ShoppingCart
    },
    {
      id: 'games',
      label: 'Р ВР С–РЎР‚РЎвЂ№',
      icon: Gamepad2
    },
    {
      id: 'cases',
      label: 'Р С™Р ВµР в„–РЎРѓРЎвЂ№',
      icon: Box
    }
  ];

  return (
    <nav className="glass-card border-t border-border/50 backdrop-blur-xl">
      <div className="grid grid-cols-4 p-3">
        {adminPages.slice(0, 4).map((page) => {
          const Icon = page.icon;
          
          return (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className="flex flex-col items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{page.label}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-4 p-3 pt-0">
        {adminPages.slice(4, 8).map((page) => {
          const Icon = page.icon;
          
          return (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className="flex flex-col items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{page.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
