Р С—Р’В»РЎвЂ”import { Home, Trophy, CheckSquare, ShoppingCart, Users, Zap, Gamepad2, Box } from './Icons';

interface AdminNavigationProps {
  currentAdminPage: string;
  onNavigate: (page: string) => void;
}

export function AdminNavigation({ currentAdminPage, onNavigate }: AdminNavigationProps) {
  const adminPages = [
    {
      id: 'dashboard',
      label: 'Р В Р’В Р Р†Р вЂљРЎС™Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В Р РЏ',
      icon: Home
    },
    {
      id: 'workers',
      label: 'Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“',
      icon: Users
    },
    {
      id: 'battles',
      label: 'Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“',
      icon: Zap
    },
    {
      id: 'achievements',
      label: 'Р В Р’В Р Р†Р вЂљРЎСљР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ', 
      icon: Trophy
    },
    {
      id: 'tasks',
      label: 'Р В Р’В Р Р†Р вЂљРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р РЋРІР‚В',
      icon: CheckSquare
    },
    {
      id: 'shop',
      label: 'Р В Р’В Р РЋРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В¦',
      icon: ShoppingCart
    },
    {
      id: 'games',
      label: 'Р В Р’В Р вЂ™Р’ВР В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“',
      icon: Gamepad2
    },
    {
      id: 'cases',
      label: 'Р В Р’В Р РЋРІвЂћСћР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“',
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
