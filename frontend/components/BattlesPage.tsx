Р С—Р’В»РЎвЂ”import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ModalOpaque } from './ModalOpaque';
import { Trophy, Clock, Users, Award, Calendar, User, ArrowRight, Check, Star, Plus, X, ArrowLeft, Paperclip, ChevronDown } from './Icons';

import { mockAppState } from '../data/mockData';

interface BattlesPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  theme?: 'light' | 'dark';
}

export function BattlesPage({ onNavigate, currentPage, onOpenSettings, profilePhoto, theme = 'light' }: BattlesPageProps) {
  const currentUser = mockAppState.currentUser;
  
  // Mock Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  Р В Р Р‹Р В РЎвЂњ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚В
  const employees = [
    { id: '1', name: 'Р В Р’В Р РЋРІР‚в„ўР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', team: 1, level: 5, avatar: null, status: 'available' },
    { id: '2', name: 'Р В Р’В Р РЋРЎСџР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™ Р В Р’В Р РЋРЎСџР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', team: 1, level: 7, avatar: null, status: 'in_battle' },
    { id: '3', name: 'Р В Р’В Р РЋРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚ВР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', team: 2, level: 6, avatar: null, status: 'available' },
    { id: '4', name: 'Р В Р’В Р РЋРІР‚в„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚СњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', team: 2, level: 8, avatar: null, status: 'available' },
    { id: '5', name: 'Р В Р’В Р Р†Р вЂљРЎС›Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', team: 3, level: 4, avatar: null, status: 'available' },
    { id: '6', name: 'Р В Р’В Р Р†Р вЂљРЎСљР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', team: 3, level: 9, avatar: null, status: 'available' },
    { id: '7', name: 'Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В° Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', team: 4, level: 5, avatar: null, status: 'available' },
    { id: '8', name: 'Р В Р’В Р В Р вЂ№Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', team: 4, level: 6, avatar: null, status: 'in_battle' },
    { id: '9', name: 'Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљР’В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В» Р В Р’В Р вЂ™Р’В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', team: 5, level: 7, avatar: null, status: 'available' },
    { id: '10', name: 'Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°Р В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', team: 5, level: 5, avatar: null, status: 'available' },
    { id: '11', name: 'Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™ Р В Р’В Р РЋРЎС™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', team: 6, level: 8, avatar: null, status: 'available' },
    { id: '12', name: 'Р В Р’В Р Р†Р вЂљРЎС›Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', team: 6, level: 6, avatar: null, status: 'available' },
  ];
  
  // Mock Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљР’В¦ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В 
  const [activeBattles, setActiveBattles] = useState([
    {
      id: '1',
      opponent: employees.find(e => e.id === '2'),
      status: 'active',
      prize: 500,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљР’В¦ Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В¦
  const [isEmployeeSelectOpen, setIsEmployeeSelectOpen] = useState(false);
  const [isBattleConfirmOpen, setIsBattleConfirmOpen] = useState(false);
  const [isEmployeeDetailOpen, setIsEmployeeDetailOpen] = useState(false);
  const [isCancelBattleOpen, setIsCancelBattleOpen] = useState(false);
  const [isVictorySubmitOpen, setIsVictorySubmitOpen] = useState(false);

  // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В° Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [isTeamSelectOpen, setIsTeamSelectOpen] = useState(false);

  // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В¶Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“
  const [victoryComment, setVictoryComment] = useState('');
  const [victoryFile1, setVictoryFile1] = useState<File | null>(null);
  const [victoryFile2, setVictoryFile2] = useState<File | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<any>(null);

  // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР’В Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚В
  const [activeTab, setActiveTab] = useState<'battles' | 'employees'>('battles');

  // Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р Р‹Р В Р РЏР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В Р В Р Р‹Р РЋРІР‚Сљ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»
  const hasActiveBattle = activeBattles.length > 0;

  // Р В Р’В Р вЂ™Р’В¤Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚Сћ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’Вµ
  const filteredEmployees = selectedTeam 
    ? employees.filter(emp => emp.team === selectedTeam)
    : employees.filter(emp => emp.team >= 1 && emp.team <= 6);

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚Сћ';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}Р В Р’В Р СћРІР‚В ${hours}Р В Р Р‹Р Р†Р вЂљР Р‹`;
    } else {
      return `${hours}Р В Р Р‹Р Р†Р вЂљР Р‹`;
    }
  };

  // Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚В
  const handleEmployeeSelect = (employee: any) => {
    if (hasActiveBattle || employee.status === 'in_battle') return;
    setSelectedEmployee(employee);
    setIsBattleConfirmOpen(true);
  };

  const handleBattleConfirm = () => {
    if (!selectedEmployee) return;
    
    const newBattle = {
      id: Date.now().toString(),
      opponent: selectedEmployee,
      status: 'active',
      prize: 500,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      created: new Date()
    };

    setActiveBattles([...activeBattles, newBattle]);
    setIsBattleConfirmOpen(false);
    setIsEmployeeSelectOpen(false);
    setSelectedEmployee(null);
  };

  const handleCancelBattle = (battle: any) => {
    setSelectedBattle(battle);
    setIsCancelBattleOpen(true);
  };

  const confirmCancelBattle = () => {
    if (!selectedBattle) return;
    setActiveBattles(activeBattles.filter(b => b.id !== selectedBattle.id));
    setIsCancelBattleOpen(false);
    setSelectedBattle(null);
  };

  const handleEmployeeDetail = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEmployeeDetailOpen(true);
  };

  const handleVictorySubmit = (battle: any) => {
    setSelectedBattle(battle);
    setIsVictorySubmitOpen(true);
  };

  const submitVictoryProof = () => {
    if (!victoryFile1 || !victoryFile2) return;
    
    console.log('Р В Р’В Р Р†Р вЂљРЎСљР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“:', {
      battle: selectedBattle.id,
      comment: victoryComment,
      file1: victoryFile1.name,
      file2: victoryFile2.name
    });

    // Р В Р’В Р В Р вЂ№Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњ Р В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋР’ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“
    setVictoryComment('');
    setVictoryFile1(null);
    setVictoryFile2(null);
    setIsVictorySubmitOpen(false);
    setSelectedBattle(null);
  };

  const handleFileUpload = (fileNumber: 1 | 2) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileNumber === 1) {
        setVictoryFile1(file);
      } else {
        setVictoryFile2(file);
      }
    }
  };

  return (
    <>
      <div 
        className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
            : 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
          color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
        }}
      >
        {/* Header */}
        <Header 
          onNavigate={onNavigate} 
          currentPage={currentPage} 
          onOpenSettings={onOpenSettings}
          user={currentUser}
          profilePhoto={profilePhoto}
          theme={theme}
        />
        
        {/* Main Content */}
        <div className="max-w-md mx-auto pt-20 px-4 pb-24">
          <div 
            className="glass-card rounded-2xl flex flex-col apple-shadow" 
            style={{ minHeight: '500px' }}
          >
            {/* Р В Р’В Р Р†Р вЂљРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚Сњ */}
            <div 
              className="flex items-center justify-between p-6"
              style={{
                borderBottom: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF'
              }}
            >
              <div className="w-8"></div>
              <h2 
                className="text-lg font-medium flex-1 text-center"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“
              </h2>
              <button
                onClick={() => setIsEmployeeSelectOpen(true)}
                disabled={hasActiveBattle}
                className={`transition-all ${hasActiveBattle ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid #2A2F36' 
                    : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark'
                    ? '0 2px 8px rgba(0, 0, 0, 0.8)'
                    : '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <Plus 
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    color: hasActiveBattle 
                      ? (theme === 'dark' ? '#4A5568' : '#9CA3AF')
                      : (theme === 'dark' ? '#A7B0BD' : '#6B7280')
                  }} 
                />
              </button>
            </div>

            {/* Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚В */}
            <div className="px-6 py-4">
              <div 
                className="flex gap-2 p-1 rounded-2xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <button
                  onClick={() => setActiveTab('battles')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                    activeTab === 'battles'
                      ? (theme === 'dark' 
                          ? 'bg-white text-black' 
                          : 'bg-black text-white')
                      : (theme === 'dark' 
                          ? 'text-white hover:text-white' 
                          : 'text-gray-600 hover:text-black')
                  }`}
                  style={{
                    boxShadow: activeTab === 'battles' 
                      ? (theme === 'dark'
                          ? '0 2px 8px rgba(0, 0, 0, 0.8)'
                          : '0 2px 8px rgba(0, 0, 0, 0.06)')
                      : 'none'
                  }}
                >
                  Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ ({activeBattles.length})
                </button>
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                    activeTab === 'employees'
                      ? (theme === 'dark' 
                          ? 'bg-white text-black' 
                          : 'bg-black text-white')
                      : (theme === 'dark' 
                          ? 'text-white hover:text-white' 
                          : 'text-gray-600 hover:text-black')
                  }`}
                  style={{
                    boxShadow: activeTab === 'employees' 
                      ? (theme === 'dark'
                          ? '0 2px 8px rgba(0, 0, 0, 0.8)'
                          : '0 2px 8px rgba(0, 0, 0, 0.06)')
                      : 'none'
                  }}
                >
                  Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚В
                </button>
              </div>
            </div>
            
            {/* Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ў */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {activeTab === 'battles' ? (
                // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚Сњ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В 
                activeBattles.length > 0 ? (
                  <div className="space-y-4">
                    {activeBattles.map((battle) => (
                      <div
                        key={battle.id}
                        className="rounded-2xl p-4 transition-all"
                        style={{
                          backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                              border: theme === 'dark' 
                                ? '1px solid #2A2F36' 
                                : '1px solid #E6E9EF'
                            }}
                          >
                            <span className="text-xl">{battle.opponent?.name?.charAt(0) || '?'}</span>
                          </div>
                          <div className="flex-1">
                            <div 
                              className="font-medium"
                              style={{
                                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                              }}
                            >
                              {battle.opponent?.name}
                            </div>
                            <div 
                              className="text-sm"
                              style={{
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}
                            >
                              Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {battle.opponent?.team} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р вЂ° {battle.opponent?.level}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-4 h-4" style={{ color: '#FFD700' }} />
                              <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                                {battle.prize}g
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                              <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                                {formatTimeRemaining(battle.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleVictorySubmit(battle)}
                            className="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all"
                            style={{
                              backgroundColor: '#2B82FF',
                              color: '#FFFFFF'
                            }}
                          >
                            Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р РЋРІР‚Сљ
                          </button>
                          <button
                            onClick={() => handleCancelBattle(battle)}
                            className="py-2 px-4 rounded-xl text-sm font-medium transition-all"
                            style={{
                              backgroundColor: theme === 'dark' ? '#3A2A2A' : '#FEF2F2',
                              color: '#EF4444',
                              border: '1px solid #EF4444'
                            }}
                          >
                            Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-[200px]">
                    <div 
                      className="rounded-xl p-6 text-center"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <Trophy 
                        className="w-12 h-12 mx-auto mb-4"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      />
                      <p 
                        className="text-sm opacity-70"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      >
                        Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљР’В¦ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В 
                      </p>
                    </div>
                  </div>
                )
              ) : (
                // Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚Сњ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В 
                <div className="space-y-4">
                  {/* Р В Р’В Р вЂ™Р’В¤Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋР’В */}
                  <div className="relative">
                    <button
                      onClick={() => setIsTeamSelectOpen(!isTeamSelectOpen)}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-sm"
                      style={{
                        backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                        border: theme === 'dark' 
                          ? '1px solid rgba(255, 255, 255, 0.06)' 
                          : '1px solid #E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      <span>
                        {selectedTeam ? `Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° ${selectedTeam}` : 'Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ (1-6)'}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isTeamSelectOpen && (
                      <div 
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg z-10"
                        style={{
                          backgroundColor: theme === 'dark' ? '#202734' : '#FFFFFF',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <button
                          onClick={() => {
                            setSelectedTeam(null);
                            setIsTeamSelectOpen(false);
                          }}
                          className="w-full text-left p-3 text-sm hover:bg-opacity-50 transition-colors"
                          style={{
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                          }}
                        >
                          Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ (1-6)
                        </button>
                        {[1, 2, 3, 4, 5, 6].map(team => (
                          <button
                            key={team}
                            onClick={() => {
                              setSelectedTeam(team);
                              setIsTeamSelectOpen(false);
                            }}
                            className="w-full text-left p-3 text-sm hover:bg-opacity-50 transition-colors"
                            style={{
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                            }}
                          >
                            Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {team}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚Сњ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  */}
                  <div className="space-y-3">
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                        onClick={() => handleEmployeeDetail(employee)}
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                            border: theme === 'dark' 
                              ? '1px solid #2A2F36' 
                              : '1px solid #E6E9EF'
                          }}
                        >
                          <span className="text-lg">{employee.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div 
                            className="font-medium"
                            style={{
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                            }}
                          >
                            {employee.name}
                          </div>
                          <div 
                            className="text-sm"
                            style={{
                              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                            }}
                          >
                            Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {employee.team} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р вЂ° {employee.level}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmployeeSelect(employee);
                          }}
                          disabled={hasActiveBattle || employee.status === 'in_battle'}
                          className={`transition-all ${
                            hasActiveBattle || employee.status === 'in_battle' 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:scale-105'
                          }`}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: hasActiveBattle || employee.status === 'in_battle'
                              ? (theme === 'dark' ? '#4A5568' : '#9CA3AF')
                              : '#2B82FF',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Plus 
                            style={{ 
                              width: '16px', 
                              height: '16px', 
                              color: '#FFFFFF'
                            }} 
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} theme={theme} />
      </div>

      {/* Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚Сћ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В° Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° */}
      <ModalOpaque
        isOpen={isEmployeeSelectOpen}
        onClose={() => setIsEmployeeSelectOpen(false)}
        title="Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂќР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°"
        theme={theme}
      >
        <div className="space-y-4">
          {/* Р В Р’В Р вЂ™Р’В¤Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋР’В */}
          <div className="relative">
            <button
              onClick={() => setIsTeamSelectOpen(!isTeamSelectOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              <span>
                {selectedTeam ? `Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° ${selectedTeam}` : 'Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ (1-6)'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isTeamSelectOpen && (
              <div 
                className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg z-10"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <button
                  onClick={() => {
                    setSelectedTeam(null);
                    setIsTeamSelectOpen(false);
                  }}
                  className="w-full text-left p-3 text-sm hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ (1-6)
                </button>
                {[1, 2, 3, 4, 5, 6].map(team => (
                  <button
                    key={team}
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsTeamSelectOpen(false);
                    }}
                    className="w-full text-left p-3 text-sm hover:bg-opacity-50 transition-colors"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {team}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚Сњ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:scale-[0.98]"
                style={{
                  backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                  opacity: employee.status === 'in_battle' ? 0.5 : 1
                }}
                onClick={() => employee.status !== 'in_battle' && handleEmployeeSelect(employee)}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: theme === 'dark' ? '#0F1116' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid #2A2F36' 
                      : '1px solid #E6E9EF'
                  }}
                >
                  <span className="text-lg">{employee.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div 
                    className="font-medium"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {employee.name}
                  </div>
                  <div 
                    className="text-sm"
                    style={{
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {employee.team} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р вЂ° {employee.level}
                  </div>
                  {employee.status === 'in_battle' && (
                    <div 
                      className="text-xs mt-1"
                      style={{ color: '#EF4444' }}
                    >
                      Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р Р‹Р РЋРІР‚СљР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р В РІР‚В  Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’Вµ
                    </div>
                  )}
                </div>
                {employee.status !== 'in_battle' && (
                  <ArrowRight 
                    className="w-5 h-5"
                    style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </ModalOpaque>

      {/* Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В¶Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В° Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В» */}
      <ModalOpaque
        isOpen={isBattleConfirmOpen}
        onClose={() => setIsBattleConfirmOpen(false)}
        title="Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В "
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setIsBattleConfirmOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°
            </button>
            <button
              onClick={handleBattleConfirm}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors"
              style={{
                backgroundColor: '#2B82FF'
              }}
            >
              Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»!
            </button>
          </div>
        }
      >
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)',
            }}
          >
            <Trophy className="w-8 h-8" style={{ color: '#2B82FF' }} />
          </div>
          <div>
            <p 
              className="font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»?
            </p>
            <p 
              className="text-sm"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              {selectedEmployee?.name}
            </p>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.06)' 
                : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-4 h-4" style={{ color: '#FFD700' }} />
              <span 
                className="font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°: 500g
              </span>
            </div>
            <p 
              className="text-xs"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’ВР В Р Р‹Р В Р РЏ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ: 7 Р В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњ
            </p>
          </div>
        </div>
      </ModalOpaque>

      {/* Р В Р’В Р Р†Р вЂљРЎСљР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚В Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° */}
      <ModalOpaque
        isOpen={isEmployeeDetailOpen}
        onClose={() => setIsEmployeeDetailOpen(false)}
        title="Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР’В Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’Вµ"
        theme={theme}
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid #2A2F36' 
                    : '1px solid #E6E9EF'
                }}
              >
                <span className="text-2xl">{selectedEmployee.name.charAt(0)}</span>
              </div>
              <h3 
                className="font-medium mb-2"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                {selectedEmployee.name}
              </h3>
              <p 
                className="text-sm"
                style={{
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {selectedEmployee.team} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р вЂ° {selectedEmployee.level}
              </p>
            </div>

            <div 
              className="p-4 rounded-xl"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF'
              }}
            >
              <h4 
                className="font-medium mb-2"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В Р’В Р В Р вЂ№Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div 
                    className="font-medium"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    12
                  </div>
                  <div 
                    style={{
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚В
                  </div>
                </div>
                <div>
                  <div 
                    className="font-medium"
                    style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    3
                  </div>
                  <div 
                    style={{
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ
                  </div>
                </div>
              </div>
            </div>

            {!hasActiveBattle && selectedEmployee.status !== 'in_battle' && (
              <button
                onClick={() => {
                  setIsEmployeeDetailOpen(false);
                  handleEmployeeSelect(selectedEmployee);
                }}
                className="w-full py-3 px-4 rounded-xl font-medium text-white transition-colors"
                style={{
                  backgroundColor: '#2B82FF'
                }}
              >
                Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»
              </button>
            )}
          </div>
        )}
      </ModalOpaque>

      {/* Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В¶Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В° */}
      <ModalOpaque
        isOpen={isCancelBattleOpen}
        onClose={() => setIsCancelBattleOpen(false)}
        title="Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setIsCancelBattleOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў
            </button>
            <button
              onClick={confirmCancelBattle}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors"
              style={{
                backgroundColor: '#EF4444'
              }}
            >
              Р В Р’В Р Р†Р вЂљРЎСљР В Р’В Р вЂ™Р’В°, Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°
            </button>
          </div>
        }
      >
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.10)',
            }}
          >
            <X className="w-8 h-8" style={{ color: '#EF4444' }} />
          </div>
          <div>
            <p 
              className="font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р Р‹Р РЋРІР‚СљР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“, Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р Р†Р вЂљР’В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»?
            </p>
            <p 
              className="text-sm"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В» Р В Р Р‹Р В РЎвЂњ {selectedBattle?.opponent?.name} Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р РЋРІР‚СљР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦
            </p>
          </div>
        </div>
      </ModalOpaque>

      {/* Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В¶Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ */}
      <ModalOpaque
        isOpen={isVictorySubmitOpen}
        onClose={() => {
          setIsVictorySubmitOpen(false);
          setVictoryComment('');
          setVictoryFile1(null);
          setVictoryFile2(null);
        }}
        title="Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р РЋРІР‚Сљ"
        theme={theme}
        actions={
          <button
            onClick={submitVictoryProof}
            disabled={!victoryFile1 || !victoryFile2}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
              victoryFile1 && victoryFile2
                ? 'text-white'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: victoryFile1 && victoryFile2 
                ? '#2B82FF' 
                : (theme === 'dark' ? '#4A5568' : '#9CA3AF')
            }}
          >
            Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СњР В Р Р‹Р РЋРІР‚Сљ
          </button>
        }
      >
        <div className="space-y-4">
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.10)',
              }}
            >
              <Trophy className="w-8 h-8" style={{ color: '#22C55E' }} />
            </div>
            <p 
              className="font-medium mb-2"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В» Р В Р Р‹Р В РЎвЂњ {selectedBattle?.opponent?.name}
            </p>
            <p 
              className="text-sm"
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}
            >
              Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’В
            </p>
          </div>

          {/* Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ */}
          <div>
            <label 
              className="block mb-2 font-medium"
              style={{
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ
            </label>
            <textarea
              value={victoryComment}
              onChange={(e) => setVictoryComment(e.target.value)}
              placeholder="Р В Р’В Р РЋРІР‚С”Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†РІР‚С™Р’В¬Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В·Р В Р Р‹Р РЋРІР‚СљР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В°..."
              rows={3}
              className="w-full p-3 rounded-xl transition-colors resize-none"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                outline: 'none'
              }}
            />
          </div>

          {/* Р В Р’В Р вЂ™Р’В¤Р В Р’В Р вЂ™Р’В°Р В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р’В Р вЂ™Р’В»Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ */}
          <div className="space-y-3">
            <div>
              <label 
                className="block mb-2 font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р РЋРІР‚вЂќР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° *
              </label>
              <div className="flex items-center gap-2">
                <div 
                  className="flex-1 p-3 rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  <span className="block truncate text-sm">
                    {victoryFile1 ? victoryFile1.name : 'Р В Р’В Р вЂ™Р’В¤Р В Р’В Р вЂ™Р’В°Р В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р’В Р вЂ™Р’В» Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload(1)}
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="p-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: '#2B82FF',
                      color: '#FFFFFF'
                    }}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label 
                className="block mb-2 font-medium"
                style={{
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° *
              </label>
              <div className="flex items-center gap-2">
                <div 
                  className="flex-1 p-3 rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  <span className="block truncate text-sm">
                    {victoryFile2 ? victoryFile2.name : 'Р В Р’В Р вЂ™Р’В¤Р В Р’В Р вЂ™Р’В°Р В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р’В Р вЂ™Р’В» Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload(2)}
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="p-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: '#2B82FF',
                      color: '#FFFFFF'
                    }}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p 
            className="text-xs text-center"
            style={{
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            * Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В Р РЏР В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В¶Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљР’В¦ Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚В
          </p>
        </div>
      </ModalOpaque>
    </>
  );
}
