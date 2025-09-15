п»їimport { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { CaseRoulette } from './CaseRoulette';
import { PrizeRoulette } from './PrizeRoulette';
import { Modal } from './Modal';
import { CaseType, UserCase, CaseShopItem, RouletteResult, PrizeRouletteResult, Prize } from '../types/cases';
import { mockCaseTypes, mockUserCases, mockCaseShopItems } from '../data/mockData';
import { Gift, ShoppingBag, Clock, Coins, Gem } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import coinImage from 'figma:asset/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png';

interface CasesPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  profilePhoto: string | null;
  theme: 'light' | 'dark';
  cases: CaseType[];
  setCases: (cases: CaseType[]) => void;
  userCases: UserCase[];
  setUserCases: (userCases: UserCase[]) => void;
  currentUser?: {
    id: string;
    name: string;
    balance: number;
    level?: number;
    experience?: number;
  };
  onUpdateUserBalance?: (userId: string, amount: number) => void;
  onUpdateUserExperience?: (userId: string, amount: number) => void;
}

export function CasesPage({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto,
  theme,
  cases,
  setCases,
  userCases,
  setUserCases,
  currentUser,
  onUpdateUserBalance,
  onUpdateUserExperience
}: CasesPageProps) {
  const [activeTab, setActiveTab] = useState<'free' | 'shop' | 'inventory'>('free');
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [isPrizeRouletteOpen, setIsPrizeRouletteOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [canSpin, setCanSpin] = useState(false);
  const [wonCase, setWonCase] = useState<CaseType | null>(null);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [openingCase, setOpeningCase] = useState<UserCase | null>(null);
  const [caseDetailsOpen, setCaseDetailsOpen] = useState(false);
  const [selectedCaseForDetails, setSelectedCaseForDetails] = useState<CaseType | null>(null);
  const [selectedShopItem, setSelectedShopItem] = useState<CaseShopItem | null>(null);
  // Р Р€Р Т‘Р В°Р В»Р ВµР Р…Р С• Р В»Р С•Р С”Р В°Р В»РЎРЉР Р…Р С•Р Вµ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ - РЎвЂљР ВµР С—Р ВµРЎР‚РЎРЉ Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“Р ВµР С Р С—РЎР‚Р С•Р С—РЎРѓРЎвЂ№
  const [lastFreeCase, setLastFreeCase] = useState<Date | null>(null);

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘, РЎРЏР Р†Р В»РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р В»Р С‘ РЎРѓРЎвЂљРЎР‚Р С•Р С”Р В° URL
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // Р С™Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В»Р С‘ РЎРЊР СР С•Р Т‘Р В·Р С‘
  const ImageOrEmoji = ({ src, className = '', style = {} }: { src: string; className?: string; style?: React.CSSProperties }) => {
    if (isImageUrl(src)) {
      return (
        <ImageWithFallback
          src={src}
          alt="Image"
          className={`${className} object-cover`}
          style={style}
        />
      );
    }
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-xl">{src}</span>
      </div>
    );
  };

  // Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЏР ВµР С Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р С•РЎРѓРЎвЂљРЎРЉ Р В±Р ВµРЎРѓР С—Р В»Р В°РЎвЂљР Р…Р С•Р С–Р С• Р С”Р ВµР в„–РЎРѓР В° (Р Т‘Р В»РЎРЏ РЎвЂљР ВµРЎРѓРЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ Р Р†РЎРѓР ВµР С–Р Т‘Р В° Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р ВµР Р…)
  const isFreeAvailable = true; // Р вЂ™ Р В±РЎС“Р Т‘РЎС“РЎвЂ°Р ВµР С: !lastFreeCase || Date.now() - lastFreeCase.getTime() > 24 * 60 * 60 * 1000;

  const handleFreeCaseOpen = () => {
    if (isFreeAvailable) {
      setIsRouletteOpen(true);
      setCanSpin(true);
      setHasSpun(false);
      setWonCase(null);
    }
  };

  const handleStartSpin = () => {
    if (canSpin) {
      setIsSpinning(true);
      setCanSpin(false);
    }
  };

  const handleRouletteResult = (result: RouletteResult) => {
    console.log('Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р… Р С”Р ВµР в„–РЎРѓ:', result.selectedCase);
    setWonCase(result.selectedCase);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    setHasSpun(true);
  };

  const handleClaimCase = () => {
    if (wonCase) {
      // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С Р С”Р ВµР в„–РЎРѓ Р Р† Р С‘Р Р…Р Р†Р ВµР Р…РЎвЂљР В°РЎР‚РЎРЉ
      const newCase: UserCase = {
        id: `user_case_${Date.now()}`,
        caseTypeId: wonCase.id,
        obtainedAt: new Date(),
        isOpened: false
      };
      
      setUserCases(prev => [...prev, newCase]);
      setLastFreeCase(new Date());
    }
    
    // Р вЂ”Р В°Р С”РЎР‚РЎвЂ№Р Р†Р В°Р ВµР С Р СР С•Р Т‘Р В°Р В» Р С‘ РЎРѓР В±РЎР‚Р В°РЎРѓРЎвЂ№Р Р†Р В°Р ВµР С РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ
    setIsRouletteOpen(false);
    setIsSpinning(false);
    setHasSpun(false);
    setCanSpin(false);
    setWonCase(null);
  };

  const handleCloseCaseRoulette = () => {
    // Р СљР С•Р В¶Р Р…Р С• Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ РЎвЂљР С•Р В»РЎРЉР С”Р С• Р ВµРЎРѓР В»Р С‘ Р Р…Р Вµ Р С‘Р Т‘Р ВµРЎвЂљ Р Р†РЎР‚Р В°РЎвЂ°Р ВµР Р…Р С‘Р Вµ Р С‘ Р СР С•Р В¶Р Р…Р С• Р В·Р В°Р В±РЎР‚Р В°РЎвЂљРЎРЉ РЎР‚Р ВµР В·РЎС“Р В»РЎРЉРЎвЂљР В°РЎвЂљ
    if (!isSpinning && (!canSpin || hasSpun)) {
      if (hasSpun && wonCase) {
        handleClaimCase();
      } else {
        setIsRouletteOpen(false);
        setIsSpinning(false);
        setHasSpun(false);
        setCanSpin(false);
        setWonCase(null);
      }
    }
  };

  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С”Р С‘ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ Р С”Р ВµР в„–РЎРѓР С•Р Р†
  const handleOpenCase = (userCase: UserCase) => {
    const caseType = cases.find(c => c.id === userCase.caseTypeId);
    if (!caseType) return;

    setOpeningCase(userCase);
    setIsPrizeRouletteOpen(true);
    setCanSpin(true);
    setHasSpun(false);
    setWonPrize(null);
  };

  const handleStartPrizeSpin = () => {
    if (canSpin) {
      setIsSpinning(true);
      setCanSpin(false);
    }
  };

  const handlePrizeRouletteResult = (result: PrizeRouletteResult) => {
    console.log('Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р… Р С—РЎР‚Р С‘Р В·:', result.selectedPrize);
    setWonPrize(result.selectedPrize);
  };

  const handlePrizeSpinComplete = () => {
    setIsSpinning(false);
    setHasSpun(true);
  };

  const handleClaimPrize = () => {
    if (wonPrize && openingCase && currentUser) {
      // Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЏР ВµР С РЎвЂљР С‘Р С— Р С—РЎР‚Р С‘Р В·Р В° Р С‘ Р В·Р В°РЎвЂЎР С‘РЎРѓР В»РЎРЏР ВµР С РЎРѓР С•Р С•РЎвЂљР Р†Р ВµРЎвЂљРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°РЎС“РЎР‹ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎС“
      if (wonPrize.type === 'coins' && onUpdateUserBalance) {
        onUpdateUserBalance(currentUser.id, wonPrize.value);
        console.log(`Р вЂ”Р В°РЎвЂЎР С‘РЎРѓР В»Р ВµР Р…Р С• ${wonPrize.value} Р СР С•Р Р…Р ВµРЎвЂљ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎР‹ ${currentUser.name}`);
      } else if (wonPrize.type === 'experience' && onUpdateUserExperience) {
        onUpdateUserExperience(currentUser.id, wonPrize.value);
        console.log(`Р вЂ”Р В°РЎвЂЎР С‘РЎРѓР В»Р ВµР Р…Р С• ${wonPrize.value} Р С•Р С—РЎвЂ№РЎвЂљР В° Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎР‹ ${currentUser.name}`);
      } else if (!wonPrize.type) {
        // Р вЂўРЎРѓР В»Р С‘ РЎвЂљР С‘Р С— Р Р…Р Вµ РЎС“Р С”Р В°Р В·Р В°Р Р…, Р С•Р С—РЎР‚Р ВµР Т‘Р ВµР В»РЎРЏР ВµР С Р С—Р С• Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘РЎР‹ Р С—РЎР‚Р С‘Р В·Р В°
        if (wonPrize.name.toLowerCase().includes('Р СР С•Р Р…Р ВµРЎвЂљ') || wonPrize.name.toLowerCase().includes('coins') || wonPrize.name.toLowerCase().includes('g-coin')) {
          if (onUpdateUserBalance) {
            onUpdateUserBalance(currentUser.id, wonPrize.value);
            console.log(`Р вЂ”Р В°РЎвЂЎР С‘РЎРѓР В»Р ВµР Р…Р С• ${wonPrize.value} Р СР С•Р Р…Р ВµРЎвЂљ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎР‹ ${currentUser.name} (Р С•Р С—РЎР‚Р ВµР Т‘Р ВµР В»Р ВµР Р…Р С• Р С—Р С• Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘РЎР‹)`);
          }
        } else if (wonPrize.name.toLowerCase().includes('Р С•Р С—РЎвЂ№РЎвЂљ') || wonPrize.name.toLowerCase().includes('exp') || wonPrize.name.toLowerCase().includes('experience')) {
          if (onUpdateUserExperience) {
            onUpdateUserExperience(currentUser.id, wonPrize.value);
            console.log(`Р вЂ”Р В°РЎвЂЎР С‘РЎРѓР В»Р ВµР Р…Р С• ${wonPrize.value} Р С•Р С—РЎвЂ№РЎвЂљР В° Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎР‹ ${currentUser.name} (Р С•Р С—РЎР‚Р ВµР Т‘Р ВµР В»Р ВµР Р…Р С• Р С—Р С• Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘РЎР‹)`);
          }
        }
      }
      
      // Р Р€Р Т‘Р В°Р В»РЎРЏР ВµР С Р С”Р ВµР в„–РЎРѓ Р С‘Р В· Р С‘Р Р…Р Р†Р ВµР Р…РЎвЂљР В°РЎР‚РЎРЏ Р С—Р С•РЎРѓР В»Р Вµ Р С•РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ
      setUserCases(prev => prev.filter(uc => uc.id !== openingCase.id));
    }
    
    // Р вЂ”Р В°Р С”РЎР‚РЎвЂ№Р Р†Р В°Р ВµР С Р СР С•Р Т‘Р В°Р В» Р С‘ РЎРѓР В±РЎР‚Р В°РЎРѓРЎвЂ№Р Р†Р В°Р ВµР С РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ
    setIsPrizeRouletteOpen(false);
    setIsSpinning(false);
    setHasSpun(false);
    setCanSpin(false);
    setWonPrize(null);
    setOpeningCase(null);
  };

  const handleClosePrizeRoulette = () => {
    // Р СљР С•Р В¶Р Р…Р С• Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ РЎвЂљР С•Р В»РЎРЉР С”Р С• Р ВµРЎРѓР В»Р С‘ Р Р…Р Вµ Р С‘Р Т‘Р ВµРЎвЂљ Р Р†РЎР‚Р В°РЎвЂ°Р ВµР Р…Р С‘Р Вµ Р С‘ Р СР С•Р В¶Р Р…Р С• Р В·Р В°Р В±РЎР‚Р В°РЎвЂљРЎРЉ РЎР‚Р ВµР В·РЎС“Р В»РЎРЉРЎвЂљР В°РЎвЂљ
    if (!isSpinning && (!canSpin || hasSpun)) {
      if (hasSpun && wonPrize) {
        handleClaimPrize();
      } else {
        setIsPrizeRouletteOpen(false);
        setIsSpinning(false);
        setHasSpun(false);
        setCanSpin(false);
        setWonPrize(null);
        setOpeningCase(null);
      }
    }
  };

  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С” Р С—Р С•Р С”Р В°Р В·Р В° Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„– Р С”Р ВµР в„–РЎРѓР В°
  const handleShowCaseDetails = (caseType: CaseType, shopItem: CaseShopItem) => {
    setSelectedCaseForDetails(caseType);
    setSelectedShopItem(shopItem);
    setCaseDetailsOpen(true);
  };

  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С” Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘ Р С”Р ВµР в„–РЎРѓР В°
  const handleBuyCase = (shopItem: CaseShopItem) => {
    const caseType = mockCaseTypes.find(c => c.id === shopItem.caseTypeId);
    if (!caseType) return;

    // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С Р С”РЎС“Р С—Р В»Р ВµР Р…Р Р…РЎвЂ№Р в„– Р С”Р ВµР в„–РЎРѓ Р Р† Р С‘Р Р…Р Р†Р ВµР Р…РЎвЂљР В°РЎР‚РЎРЉ
    const newCase: UserCase = {
      id: `user_case_${Date.now()}`,
      caseTypeId: caseType.id,
      obtainedAt: new Date(),
      isOpened: false
    };
    
    setUserCases(prev => [...prev, newCase]);
    
    // Р вЂ”Р В°Р С”РЎР‚РЎвЂ№Р Р†Р В°Р ВµР С Р СР С•Р Т‘Р В°Р В» Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„– Р ВµРЎРѓР В»Р С‘ Р С•Р Р… Р С•РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљ
    setCaseDetailsOpen(false);
    
    // Р СџР ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР В°Р ВµР СРЎРѓРЎРЏ Р Р…Р В° Р Р†Р С”Р В»Р В°Р Т‘Р С”РЎС“ "Р СљР С•Р С‘ Р С”Р ВµР в„–РЎРѓРЎвЂ№"
    setActiveTab('inventory');
  };

  const renderFreeCase = () => (
    <div className="space-y-6">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р Т‘Р В»РЎРЏ Р В±Р ВµРЎРѓР С—Р В»Р В°РЎвЂљР Р…Р С•Р С–Р С• Р С”Р ВµР в„–РЎРѓР В° */}
      <div className="text-center">
        <h3 
          className="text-2xl font-bold mb-2"
          style={{
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          Р вЂР вЂўР РЋР СџР вЂєР С’Р СћР СњР В«Р в„ў Р С™Р вЂўР в„ўР РЋ
        </h3>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
      </div>

      <div 
        className="rounded-2xl p-6 border"
        style={{
          background: theme === 'dark' 
            ? `linear-gradient(145deg, rgba(16, 20, 28, 0.95) 0%, rgba(22, 26, 34, 0.95) 100%)`
            : `linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)`,
          border: theme === 'dark' 
            ? '1px solid rgba(34, 197, 94, 0.4)'
            : '1px solid rgba(34, 197, 94, 0.3)',
          boxShadow: theme === 'dark' 
            ? `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
            : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
        }}
      >
        <div className="text-center space-y-6">
          <div 
            className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(145deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))`,
              boxShadow: `0 0 30px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(34, 197, 94, 0.2)`
            }}
          >
            <Gift className="w-16 h-16 text-green-400" style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))' }} />
          </div>
          
          <div>
            <h4 
              className="text-xl font-bold mb-3" 
              style={{ 
                color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
                textShadow: theme === 'dark' ? '0 0 10px rgba(34, 197, 94, 0.8)' : '0 0 5px rgba(34, 197, 94, 0.3)'
              }}
            >
              Р вЂР вЂўР РЋР СџР вЂєР С’Р СћР СњР В«Р в„ў Р С™Р вЂўР в„ўР РЋ GRITHER
            </h4>
            <p 
              className="text-sm opacity-80"
              style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}
            >
              Р СџР С•Р В»РЎС“РЎвЂЎР С‘РЎвЂљР Вµ РЎРѓР В»РЎС“РЎвЂЎР В°РїС—Р…РїС—Р…Р Р…РЎвЂ№Р в„– Р С”Р ВµР в„–РЎРѓ РЎРѓР С•Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…Р С• Р В±Р ВµРЎРѓР С—Р В»Р В°РЎвЂљР Р…Р С• Р С”Р В°Р В¶Р Т‘РЎвЂ№Р Вµ 24 РЎвЂЎР В°РЎРѓР В°!
            </p>
          </div>
          
          {isFreeAvailable ? (
            <button
              onClick={handleFreeCaseOpen}
              className="w-full py-4 px-6 rounded-xl font-bold tracking-wide transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center text-center"
              style={{
                background: `linear-gradient(145deg, #22C55E, #16A34A)`,
                color: '#FFFFFF',
                boxShadow: `0 4px 20px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Р С›Р СћР С™Р В Р В«Р СћР В¬ Р вЂР вЂўР РЋР СџР вЂєР С’Р СћР СњР В«Р в„ў Р С™Р вЂўР в„ўР РЋ
            </button>
          ) : (
            <div className="space-y-4">
              <div 
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg"
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Р РЋР В»Р ВµР Т‘РЎС“РЎР‹РЎвЂ°Р С‘Р в„– Р С”Р ВµР в„–РЎРѓ РЎвЂЎР ВµРЎР‚Р ВµР В·: 18:45:23</span>
              </div>
              <button
                disabled
                className="w-full py-4 px-6 rounded-xl font-bold tracking-wide cursor-not-allowed opacity-50"
                style={{
                  background: `linear-gradient(145deg, #666666, #444444)`,
                  color: '#CCCCCC',
                  boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2)`
                }}
              >
                Р С›Р вЂ“Р ВР вЂќР С’Р СњР ВР вЂў...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="space-y-6">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” GRITHER */}
      <div className="text-center">
        <h3 
          className="text-2xl font-bold mb-2"
          style={{
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          GRITHER CASES
        </h3>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {mockCaseShopItems.map((shopItem) => {
          const caseType = cases.find(c => c.id === shopItem.caseTypeId);
          if (!caseType) return null;

          const discountPrice = shopItem.discount 
            ? shopItem.price * (1 - shopItem.discount / 100)
            : shopItem.price;

          // Р В¤Р С•РЎР‚Р СР В°РЎвЂљР С‘РЎР‚РЎС“Р ВµР С РЎвЂ Р ВµР Р…РЎС“ Р Р† РЎРѓРЎвЂљР С‘Р В»Р Вµ G-COIN
          const formattedPrice = (Math.floor(discountPrice) / 1000).toFixed(3).replace('.', '.');

          return (
            <div 
              key={shopItem.id} 
              className="relative rounded-2xl p-3 border transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: theme === 'dark' 
                  ? `linear-gradient(145deg, rgba(16, 20, 28, 0.95) 0%, rgba(22, 26, 34, 0.95) 100%)`
                  : `linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)`,
                border: `1px solid ${caseType.color}${theme === 'dark' ? '40' : '30'}`,
                boxShadow: theme === 'dark' 
                  ? `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                  : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
              }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Р вЂР С•Р В»РЎРЉРЎв‚¬Р С•Р Вµ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В° РЎРѓ Р Р…Р ВµР С•Р Р…Р С•Р Р†РЎвЂ№Р С РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљР С•Р С */}
                <div 
                  className="relative w-full h-28 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(145deg, ${caseType.glowColor || caseType.color}15, ${caseType.glowColor || caseType.color}05)`,
                    boxShadow: (() => {
                      const glowColor = caseType.glowColor || caseType.color;
                      const intensity = caseType.glowIntensity || 'low';
                      
                      switch (intensity) {
                        case 'low':
                          return `0 0 15px ${glowColor}40, inset 0 0 10px ${glowColor}20`;
                        case 'medium':
                          return `0 0 30px ${glowColor}50, 0 0 60px ${glowColor}20, inset 0 0 20px ${glowColor}30`;
                        case 'high':
                          return `0 0 40px ${glowColor}80, 0 0 80px ${glowColor}40, 0 0 120px ${glowColor}20, inset 0 0 30px ${glowColor}40`;
                        default:
                          return `0 0 30px ${glowColor}40, inset 0 0 20px ${glowColor}20`;
                      }
                    })()
                  }}
                  onClick={() => handleShowCaseDetails(caseType, shopItem)}
                >
                  <ImageOrEmoji
                    src={caseType.image}
                    className="w-full h-full object-cover"
                  />
                  {/* Р СњР ВµР С•Р Р…Р С•Р Р†Р В°РЎРЏ РЎР‚Р В°Р СР С”Р В° */}
                  <div 
                    className="absolute inset-0 rounded-xl border-2 opacity-60"
                    style={{ 
                      border: `2px solid ${caseType.glowColor || caseType.color}`,
                      boxShadow: (() => {
                        const glowColor = caseType.glowColor || caseType.color;
                        const intensity = caseType.glowIntensity || 'low';
                        
                        switch (intensity) {
                          case 'low':
                            return `inset 0 0 15px ${glowColor}30`;
                          case 'medium':
                            return `inset 0 0 25px ${glowColor}40, inset 0 0 50px ${glowColor}20`;
                          case 'high':
                            return `inset 0 0 35px ${glowColor}50, inset 0 0 70px ${glowColor}30, inset 0 0 100px ${glowColor}10`;
                          default:
                            return `inset 0 0 20px ${glowColor}30`;
                        }
                      })()
                    }}
                  />
                  {/* GRITHER Р В»Р С•Р С–Р С•РЎвЂљР С‘Р С— Р Р…Р В° Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р С‘ */}
                  <div 
                    className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold"
                    style={{
                      background: `linear-gradient(90deg, ${caseType.color}80, ${caseType.color}60)`,
                      color: '#FFFFFF',
                      textShadow: '0 0 8px rgba(0,0,0,0.8)'
                    }}
                  >
                    GRITHER
                  </div>
                </div>
                
                {/* Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В° */}
                <h4 
                  className="text-lg font-bold tracking-wider"
                  style={{ 
                    color: theme === 'dark' ? '#FFFFFF' : '#0F172A', 
                    textShadow: theme === 'dark' 
                      ? `0 0 10px ${caseType.color}80` 
                      : `0 0 5px ${caseType.color}40`
                  }}
                >
                  {caseType.name}
                </h4>
                
                {/* Р В¦Р ВµР Р…Р В° Р Р† G-COIN РЎвЂћР С•РЎР‚Р СР В°РЎвЂљР Вµ */}
                <div className="space-y-2">
                  <div 
                    className="px-3 py-1 rounded-lg text-sm font-medium"
                    style={{ 
                      background: `linear-gradient(90deg, ${caseType.color}${theme === 'dark' ? '20' : '15'}, transparent)`,
                      border: `1px solid ${caseType.color}${theme === 'dark' ? '40' : '30'}`,
                      color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    {formattedPrice}
                    <img 
                      src={coinImage} 
                      alt="G-coin" 
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
                
                {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘ Р Р† РЎРѓРЎвЂљР С‘Р В»Р Вµ GRITHER */}
                <button
                  onClick={() => handleBuyCase(shopItem)}
                  className="w-full py-2 px-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-center"
                  style={{
                    background: shopItem.isAvailable 
                      ? `linear-gradient(145deg, #FFFFFF, #E0E0E0)` 
                      : `linear-gradient(145deg, #666666, #444444)`,
                    color: shopItem.isAvailable ? '#1A1A1A' : '#CCCCCC',
                    boxShadow: shopItem.isAvailable 
                      ? `0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)` 
                      : `0 4px 15px rgba(0, 0, 0, 0.2)`,
                    textShadow: shopItem.isAvailable ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                  disabled={!shopItem.isAvailable}
                >
                  {shopItem.isAvailable ? 'Р С™Р Р€Р СџР ВР СћР В¬' : 'Р СњР вЂўР вЂќР С›Р РЋР СћР Р€Р СџР СњР С›'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р Т‘Р В»РЎРЏ Р С‘Р Р…Р Р†Р ВµР Р…РЎвЂљР В°РЎР‚РЎРЏ */}
      <div className="text-center">
        <h3 
          className="text-2xl font-bold mb-2"
          style={{
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          Р СљР С›Р В Р С™Р вЂўР в„ўР РЋР В«
        </h3>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
      </div>
      
      {userCases.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-2 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-2">Р СџРЎС“РЎРѓРЎвЂљР С•</h4>
          <p className="text-sm text-muted-foreground opacity-60">
            Р вЂ”Р Т‘Р ВµРЎРѓРЎРЉ Р С—Р С•РЎРЏР Р†РЎРЏРЎвЂљРЎРѓРЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р Р…РЎвЂ№Р Вµ Р С”Р ВµР в„–РЎРѓРЎвЂ№
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {userCases.map((userCase) => {
            const caseType = cases.find(c => c.id === userCase.caseTypeId);
            if (!caseType) return null;

            return (
              <div 
                key={userCase.id} 
                className="relative rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(145deg, rgba(16, 20, 28, 0.95) 0%, rgba(22, 26, 34, 0.95) 100%)`
                    : `linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)`,
                  border: `1px solid ${caseType.color}${theme === 'dark' ? '40' : '30'}`,
                  boxShadow: theme === 'dark' 
                    ? `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                    : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Р вЂР С•Р В»РЎРЉРЎв‚¬Р С•Р Вµ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В° РЎРѓ Р Р…Р ВµР С•Р Р…Р С•Р Р†РЎвЂ№Р С РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљР С•Р С */}
                  <div 
                    className="relative w-full h-24 rounded-xl overflow-hidden transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(145deg, ${caseType.glowColor || caseType.color}15, ${caseType.glowColor || caseType.color}05)`,
                      boxShadow: (() => {
                        const glowColor = caseType.glowColor || caseType.color;
                        const intensity = caseType.glowIntensity || 'low';
                        
                        switch (intensity) {
                          case 'low':
                            return `0 0 15px ${glowColor}40, inset 0 0 10px ${glowColor}20`;
                          case 'medium':
                            return `0 0 25px ${glowColor}50, 0 0 50px ${glowColor}20, inset 0 0 15px ${glowColor}30`;
                          case 'high':
                            return `0 0 35px ${glowColor}80, 0 0 70px ${glowColor}40, 0 0 100px ${glowColor}20, inset 0 0 25px ${glowColor}40`;
                          default:
                            return `0 0 25px ${glowColor}40, inset 0 0 15px ${glowColor}20`;
                        }
                      })()
                    }}
                  >
                    <ImageOrEmoji
                      src={caseType.image}
                      className="w-full h-full object-cover"
                    />
                    {/* Р СњР ВµР С•Р Р…Р С•Р Р†Р В°РЎРЏ РЎР‚Р В°Р СР С”Р В° */}
                    <div 
                      className="absolute inset-0 rounded-xl border-2 opacity-60"
                      style={{ 
                        border: `2px solid ${caseType.glowColor || caseType.color}`,
                        boxShadow: (() => {
                          const glowColor = caseType.glowColor || caseType.color;
                          const intensity = caseType.glowIntensity || 'low';
                          
                          switch (intensity) {
                            case 'low':
                              return `inset 0 0 15px ${glowColor}30`;
                            case 'medium':
                              return `inset 0 0 20px ${glowColor}40, inset 0 0 40px ${glowColor}20`;
                            case 'high':
                              return `inset 0 0 30px ${glowColor}50, inset 0 0 60px ${glowColor}30, inset 0 0 90px ${glowColor}10`;
                            default:
                              return `inset 0 0 15px ${glowColor}30`;
                          }
                        })()
                      }}
                    />
                    {/* GRITHER Р В»Р С•Р С–Р С•РЎвЂљР С‘Р С— */}
                    <div 
                      className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-xs font-bold"
                      style={{
                        background: `linear-gradient(90deg, ${caseType.glowColor || caseType.color}80, ${caseType.glowColor || caseType.color}60)`,
                        color: '#FFFFFF',
                        textShadow: '0 0 6px rgba(0,0,0,0.8)'
                      }}
                    >
                      GRITHER
                    </div>
                  </div>
                  
                  {/* Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В° */}
                  <h4 
                    className="text-lg font-bold tracking-wider"
                    style={{ 
                      color: theme === 'dark' ? '#FFFFFF' : '#0F172A', 
                      textShadow: theme === 'dark' 
                        ? `0 0 8px ${caseType.color}80` 
                        : `0 0 4px ${caseType.color}40`
                    }}
                  >
                    {caseType.name}
                  </h4>
                  
                  {/* Р вЂќР В°РЎвЂљР В° Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ */}
                  <p 
                    className="text-xs opacity-70"
                    style={{ color: theme === 'dark' ? '#FFFFFF' : '#6B7280' }}
                  >
                    {userCase.obtainedAt.toLocaleDateString()}
                  </p>
                  
                  {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р С•РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ Р Р† РЎРѓРЎвЂљР С‘Р В»Р Вµ GRITHER */}
                  <button
                    onClick={() => handleOpenCase(userCase)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center text-center"
                    style={{
                      background: `linear-gradient(145deg, #FFFFFF, #E0E0E0)`,
                      color: '#1A1A1A',
                      boxShadow: `0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                    }}
                  >
                    Р С›Р СћР С™Р В Р В«Р СћР В¬
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div 
      className="min-h-screen"
      style={{
        background: theme === 'dark' 
          ? `radial-gradient(circle at center top, rgba(16, 20, 28, 1) 0%, rgba(8, 10, 14, 1) 100%)`
          : `linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)`,
        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
      }}
    >
      <Header 
        profilePhoto={profilePhoto} 
        onOpenSettings={onOpenSettings}
        theme={theme}
      />

      <div className="px-4 pb-24">
        <div className="space-y-6">
          {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎС“Р В±РЎР‚Р В°Р Р… - РЎвЂљР ВµР С—Р ВµРЎР‚РЎРЉ Р С•Р Р… Р Р†Р Р…РЎС“РЎвЂљРЎР‚Р С‘ renderShop */}

          {/* Р СћР В°Р В±РЎвЂ№ Р Р† РЎРѓРЎвЂљР С‘Р В»Р Вµ GRITHER */}
          <div 
            className="flex rounded-xl p-1 border"
            style={{
              background: theme === 'dark' 
                ? `linear-gradient(145deg, rgba(8, 10, 14, 0.95) 0%, rgba(16, 20, 28, 0.95) 100%)`
                : `linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)`,
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: theme === 'dark'
                ? '0 8px 24px rgba(0, 0, 0, 0.6)'
                : '0 8px 24px rgba(0, 0, 0, 0.10)'
            }}
          >
            <button
              onClick={() => setActiveTab('free')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 text-center text-sm tracking-wide`}
              style={activeTab === 'free' ? {
                background: theme === 'dark' 
                  ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)'
                  : 'linear-gradient(145deg, #0F172A15, #0F172A08)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
              } : {
                color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                background: 'transparent'
              }}
            >
              РїС—Р…РїС—Р…Р вЂўР РЋР СџР вЂєР С’Р СћР СњР В«Р в„ў
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 text-center text-sm tracking-wide`}
              style={activeTab === 'shop' ? {
                background: theme === 'dark' 
                  ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)'
                  : 'linear-gradient(145deg, #0F172A15, #0F172A08)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
              } : {
                color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                background: 'transparent'
              }}
            >
              Р СљР С’Р вЂњР С’Р вЂ”Р ВР Сњ
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 text-center text-sm tracking-wide`}
              style={activeTab === 'inventory' ? {
                background: theme === 'dark' 
                  ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)'
                  : 'linear-gradient(145deg, #0F172A15, #0F172A08)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
              } : {
                color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                background: 'transparent'
              }}
            >
              Р СљР С›Р В Р С™Р вЂўР в„ўР РЋР В«
            </button>
          </div>

          {/* Р С™Р С•Р Р…РЎвЂљР ВµР Р…РЎвЂљ РЎвЂљР В°Р В±Р С•Р Р† */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'free' && renderFreeCase()}
            {activeTab === 'shop' && renderShop()}
            {activeTab === 'inventory' && renderInventory()}
          </motion.div>
        </div>
      </div>

      <BottomNavigation 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Р СљР С•Р Т‘Р В°Р В» РЎР‚РЎС“Р В»Р ВµРЎвЂљР С”Р С‘ Р С”Р ВµР в„–РЎРѓР С•Р Р† */}
      <Modal
        isOpen={isRouletteOpen}
        onClose={handleCloseCaseRoulette}
        title="Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В°"
        theme={theme}
      >
        <div className="space-y-6">
          {canSpin && (
            <p className="text-center text-muted-foreground">
              Р СњР В°Р В¶Р СР С‘РЎвЂљР Вµ Р С”Р Р…Р С•Р С—Р С”РЎС“, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р В·Р В°Р С—РЎС“РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ РЎР‚РЎС“Р В»Р ВµРЎвЂљР С”РЎС“
            </p>
          )}
          
          {isSpinning && (
            <p className="text-center text-muted-foreground">
              Р С›Р С—РЎР‚Р ВµР Т‘Р ВµР В»РЎРЏР ВµР С Р Р†Р В°РЎв‚¬ Р С”Р ВµР в„–РЎРѓ...
            </p>
          )}
          
          {hasSpun && !isSpinning && wonCase && (
            <div className="text-center space-y-2">
              <p className="text-primary font-semibold">Р СџР С•Р В·Р Т‘РЎР‚Р В°Р Р†Р В»РЎРЏР ВµР С!</p>
              <p className="text-muted-foreground">
                Р вЂ™РЎвЂ№ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘Р В»Р С‘: <span className="font-medium text-foreground">{wonCase.name}</span>
              </p>
            </div>
          )}
          
          <CaseRoulette
            cases={cases}
            onResult={handleRouletteResult}
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
            hasSpun={hasSpun}
          />
          
          <div className="text-center">
            {canSpin && (
              <button
                onClick={handleStartSpin}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-pressed transition-colors"
              >
                Р С™РЎР‚РЎС“РЎвЂљР С‘РЎвЂљРЎРЉ
              </button>
            )}
            
            {hasSpun && !isSpinning && (
              <button
                onClick={handleClaimCase}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-pressed transition-colors"
              >
                Р вЂ”Р В°Р В±РЎР‚Р В°РЎвЂљРЎРЉ Р С”Р ВµР в„–РЎРѓ
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* Р СљР С•Р Т‘Р В°Р В» РЎР‚РЎС“Р В»Р ВµРЎвЂљР С”Р С‘ Р С—РЎР‚Р С‘Р В·Р С•Р Р† */}
      <Modal
        isOpen={isPrizeRouletteOpen}
        onClose={handleClosePrizeRoulette}
        title={openingCase ? `РїС—Р…РїС—Р…РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘Р Вµ: ${cases.find(c => c.id === openingCase.caseTypeId)?.name}` : "Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В°"}
        theme={theme}
      >
        <div className="space-y-6">
          {canSpin && (
            <p className="text-center text-muted-foreground">
              Р СњР В°Р В¶Р СР С‘РЎвЂљР Вµ Р С”Р Р…Р С•Р С—Р С”РЎС“, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р В·Р В°Р С—РЎС“РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ РЎР‚РЎС“Р В»Р ВµРЎвЂљР С”РЎС“ Р С—РЎР‚Р С‘Р В·РїС—Р…РїС—Р…Р Р†
            </p>
          )}
          
          {isSpinning && (
            <p className="text-center text-muted-foreground">
              Р С›Р С—РЎР‚Р ВµР Т‘Р ВµР В»РЎРЏР ВµР С Р Р†Р В°РЎв‚¬ Р С—РЎР‚Р С‘Р В·...
            </p>
          )}
          
          {hasSpun && !isSpinning && wonPrize && (
            <div className="text-center space-y-2">
              <p className="text-primary font-semibold">Р СџР С•Р В·Р Т‘РЎР‚Р В°Р Р†Р В»РЎРЏР ВµР С!</p>
              <p className="text-muted-foreground">
                Р вЂ™РЎвЂ№ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘Р В»Р С‘: <span className="font-medium text-foreground">{wonPrize.name}</span>
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded overflow-hidden">
                  <ImageOrEmoji
                    src={wonPrize.image}
                    className="w-full h-full"
                  />
                </div>
                <span 
                  className="text-sm px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: wonPrize.color + '20',
                    color: wonPrize.color 
                  }}
                >
                  {wonPrize.rarity}
                </span>
              </div>
            </div>
          )}
          
          {openingCase && (
            <PrizeRoulette
              prizes={cases.find(c => c.id === openingCase.caseTypeId)?.prizes || []}
              onResult={handlePrizeRouletteResult}
              isSpinning={isSpinning}
              onSpinComplete={handlePrizeSpinComplete}
              hasSpun={hasSpun}
            />
          )}
          
          <div className="text-center">
            {canSpin && (
              <button
                onClick={handleStartPrizeSpin}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-pressed transition-colors"
              >
                Р С™РЎР‚РЎС“РЎвЂљР С‘РЎвЂљРЎРЉ
              </button>
            )}
            
            {hasSpun && !isSpinning && (
              <button
                onClick={handleClaimPrize}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-pressed transition-colors"
              >
                Р вЂ”Р В°Р В±РЎР‚Р В°РЎвЂљРЎРЉ Р С—РЎР‚Р С‘Р В·
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* Р СљР С•Р Т‘Р В°Р В» Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„– Р С”Р ВµР в„–РЎРѓР В° */}
      <Modal
        isOpen={caseDetailsOpen}
        onClose={() => setCaseDetailsOpen(false)}
        title={selectedCaseForDetails ? `Р вЂќР ВµРЎвЂљР В°Р В»Р С‘: ${selectedCaseForDetails.name}` : "Р вЂќР ВµРЎвЂљР В°Р В»Р С‘ Р С”Р ВµР в„–РЎРѓР В°"}
        theme={theme}
      >
        {selectedCaseForDetails && selectedShopItem && (
          <div className="space-y-6">
            {/* Р ВР В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ Р С”Р ВµР в„–РЎРѓР В° */}
            <div className="flex justify-center">
              <div 
                className="w-32 h-32 rounded-2xl border-2 overflow-hidden shadow-lg"
                style={{ 
                  backgroundColor: selectedCaseForDetails.color + '20',
                  border: `2px solid ${selectedCaseForDetails.color}`,
                  boxShadow: `0 12px 24px ${selectedCaseForDetails.color}40`
                }}
              >
                <ImageOrEmoji
                  src={selectedCaseForDetails.image}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С‘ РЎР‚Р ВµР Т‘Р С”Р С•РЎРѓРЎвЂљРЎРЉ */}
            <div className="text-center space-y-3">
              <div 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: selectedCaseForDetails.color + '20',
                  color: selectedCaseForDetails.color
                }}
              >
                {selectedCaseForDetails.rarity === 'common' && 'Р С›Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р в„–'}
                {selectedCaseForDetails.rarity === 'rare' && 'Р В Р ВµР Т‘Р С”Р С‘Р в„–'}
                {selectedCaseForDetails.rarity === 'epic' && 'Р В­Р С—Р С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„–'}
                {selectedCaseForDetails.rarity === 'legendary' && 'Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°РЎР‚Р Р…РЎвЂ№Р в„–'}
                {selectedCaseForDetails.rarity === 'mythic' && 'Р СљР С‘РЎвЂћР С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„–'}
              </div>
              <p className="text-muted-foreground">
                {selectedCaseForDetails.description}
              </p>
            </div>

            {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ Р С”Р ВµР в„–РЎРѓР В° */}
            <div className="space-y-3">
              <h4 className="font-semibold">Р вЂ™Р С•Р В·Р СР С•Р В¶Р Р…РЎвЂ№Р Вµ Р С—РЎР‚Р С‘Р В·РЎвЂ№:</h4>
              <div className="grid gap-2">
                {selectedCaseForDetails.prizes.slice(0, 6).map((prize) => (
                  <div key={prize.id} className="flex items-center gap-3 p-3 glass-card">
                    <div className="w-8 h-8 rounded overflow-hidden">
                      <ImageOrEmoji
                        src={prize.image}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{prize.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Р РЃР В°Р Р…РЎРѓ: {prize.dropChance}%
                      </div>
                    </div>
                    <div 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: prize.color + '20',
                        color: prize.color 
                      }}
                    >
                      {prize.rarity === 'common' && 'Р С›Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р в„–'}
                      {prize.rarity === 'rare' && 'Р В Р ВµР Т‘Р С”Р С‘Р в„–'}
                      {prize.rarity === 'epic' && 'Р В­Р С—Р С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„–'}
                      {prize.rarity === 'legendary' && 'Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°РЎР‚Р Р…РЎвЂ№Р в„–'}
                      {prize.rarity === 'mythic' && 'Р СљР С‘РЎвЂћР С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„–'}
                    </div>
                  </div>
                ))}
                {selectedCaseForDetails.prizes.length > 6 && (
                  <div className="text-center text-sm text-muted-foreground">
                    Р С‘ Р ВµРЎвЂ°РЎвЂ {selectedCaseForDetails.prizes.length - 6} Р С—РЎР‚Р С‘Р В·Р С•Р Р†...
                  </div>
                )}
              </div>
            </div>

            {/* Р В¦Р ВµР Р…Р В° Р С‘ Р С”Р Р…Р С•Р С—Р С”Р В° Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘ */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 p-4 glass-card">
                {selectedShopItem.discount && (
                  <span className="text-sm text-muted-foreground line-through">
                    {selectedShopItem.price} {selectedShopItem.currency === 'coins' ? 'СЂСџР„в„ў' : 'СЂСџвЂ™Р‹'}
                  </span>
                )}
                <span className="text-xl font-semibold flex items-center gap-2">
                  {Math.floor(selectedShopItem.discount 
                    ? selectedShopItem.price * (1 - selectedShopItem.discount / 100)
                    : selectedShopItem.price
                  )}
                  {selectedShopItem.currency === 'coins' ? <Coins className="w-5 h-5" /> : <Gem className="w-5 h-5" />}
                </span>
                {selectedShopItem.discount && (
                  <span className="text-sm bg-destructive text-destructive-foreground px-3 py-1 rounded-full font-medium">
                    -{selectedShopItem.discount}% РЎРѓР С”Р С‘Р Т‘Р С”Р В°
                  </span>
                )}
              </div>
              
              <button
                onClick={() => handleBuyCase(selectedShopItem)}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-pressed transition-colors text-center"
                disabled={!selectedShopItem.isAvailable}
              >
                {selectedShopItem.isAvailable ? 'Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ Р С”Р ВµР в„–РЎРѓ' : 'Р СњР ВµР Т‘Р С•РїС—Р…РїС—Р…РЎвЂљРЎС“Р С—Р Р…Р С•'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
