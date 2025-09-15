п»їimport { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, X, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Gamepad2, Box, Upload, ArrowUpDown, Package } from './Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShopItem } from '../types/shop';

interface AdminShopPageProps {
  onBack: () => void;
  onNavigateToSection: (section: string) => void;
  onNavigateToModeration?: () => void;
  shopItems: ShopItem[];
  setShopItems: (items: ShopItem[]) => void;
}

export function AdminShopPage({ onBack, onNavigateToSection, onNavigateToModeration, shopItems, setShopItems }: AdminShopPageProps) {
  // Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ РЎвЂљР ВµР С—Р ВµРЎР‚РЎРЉ РЎС“Р С—РЎР‚Р В°Р Р†Р В»РЎРЏРЎР‹РЎвЂљРЎРѓРЎРЏ РЎвЂЎР ВµРЎР‚Р ВµР В· Р С–Р В»Р С•Р В±Р В°Р В»РЎРЉР Р…Р С•Р Вµ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const navigationItems = [
    { icon: Home, label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ', section: 'dashboard' },
    { icon: Users, label: 'Р вЂ™Р С•РЎР‚Р С”Р ВµРЎР‚РЎвЂ№', section: 'workers' },
    { icon: Zap, label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№', section: 'battles' },
    { icon: Trophy, label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘', section: 'tasks' },
    { icon: ShoppingBag, label: 'Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№', section: 'shop' },
    { icon: Gamepad2, label: 'Р ВР С–РЎР‚РЎвЂ№', section: 'games' },
    { icon: Box, label: 'Р С™Р ВµР в„–РЎРѓРЎвЂ№', section: 'cases' }
  ];

  const categories = [
    { value: 'bonus', label: 'Р вЂР С•Р Р…РЎС“РЎРѓ' },
    { value: 'privilege', label: 'Р СџРЎР‚Р С‘Р Р†Р С‘Р В»Р ВµР С–Р С‘РЎРЏ' },
    { value: 'cosmetic', label: 'Р С™Р С•РЎРѓР СР ВµРЎвЂљР С‘Р С”Р В°' },
    { value: 'tool', label: 'Р ВР Р…РЎРѓРЎвЂљРЎР‚РЎС“Р СР ВµР Р…РЎвЂљ' }
  ];

  const sortedItems = [...shopItems].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const handleEditItem = (item: ShopItem) => {
    setSelectedItem(item);
    setShowEditItem(true);
  };

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
    setShowEditItem(true);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteItem = (itemId: string) => {
    setShopItems(prev => prev.filter(item => item.id !== itemId));
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ РЎвЂ№ */}
      <div className="p-6">
        <h1 className="text-lg font-medium text-foreground text-center mb-4">Р СџР В°Р Р…Р ВµР В»РЎРЉ РЎС“Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ</h1>
        
        {/* Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowAddItem(true)}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Р вЂќР С•Р В±. РЎвЂљР С•Р Р†Р В°РЎР‚
          </button>
          
          <button
            onClick={() => onNavigateToModeration?.()}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
          >
            Р С›Р Т‘Р С•Р В±РЎР‚Р С‘РЎвЂљРЎРЉ
          </button>
        </div>
      </div>

      {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ */}
      <div className="px-6 space-y-6 pb-60">
        {/* Р РЋР ВµР С”РЎвЂ Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† */}
        <div className="glass-card rounded-2xl apple-shadow p-4">
          {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”Р Р…Р С•Р С—Р С”Р С•Р в„– РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С‘ */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚РЎвЂ№</h2>
            <button
              onClick={toggleSortOrder}
              className="p-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title={`Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С—Р С• РЎРѓРЎвЂљР С•Р С‘Р СР С•РЎРѓРЎвЂљР С‘ ${sortOrder === 'asc' ? 'Р С—Р С• РЎС“Р В±РЎвЂ№Р Р†Р В°Р Р…Р С‘РЎР‹' : 'Р С—Р С• Р Р†Р С•Р В·РЎР‚Р В°РЎРѓРЎвЂљР В°Р Р…Р С‘РЎР‹'}`}
            >
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>



          {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† */}
          <div className="space-y-3">
            {sortedItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center gap-3">
                  {/* Р С™Р В°РЎР‚РЎвЂљР С‘Р Р…Р С”Р В° РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <ImageWithFallback 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Р РЋРЎвЂљР С•Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ: {item.price}g
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘ Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р В° Р С—Р С•Р В·Р В¶Р Вµ
                  }}
                  className="px-4 py-2 glass-card rounded-lg text-sm font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ
                </button>
              </div>
            ))}
            {sortedItems.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Р СњР ВµРЎвЂљ РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
      {showAddItem && (
        <ShopItemModal
          isEdit={false}
          item={null}
          onClose={() => setShowAddItem(false)}
          onSave={(itemData) => {
            console.log('Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…РЎвЂ№ Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°:', itemData);
            const newItem: ShopItem = {
              id: Date.now().toString(),
              ...itemData,
              isActive: true
            };
            console.log('Р СњР С•Р Р†РЎвЂ№Р в„– РЎвЂљР С•Р Р†Р В°РЎР‚:', newItem);
            setShopItems(prev => {
              const updated = [...prev, newItem];
              console.log('Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р Р…РЎвЂ№Р в„– РЎРѓР С—Р С‘РЎРѓР С•Р С” РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р†:', updated);
              return updated;
            });
            setShowAddItem(false);
          }}
          categories={categories}
        />
      )}

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
      {showEditItem && selectedItem && (
        <ShopItemModal
          isEdit={true}
          item={selectedItem}
          onClose={() => {
            setShowEditItem(false);
            setSelectedItem(null);
          }}
          onSave={(itemData) => {
            console.log('Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…РЎвЂ№ Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°:', itemData);
            console.log('ID РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚РЎС“Р ВµР СР С•Р С–Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р В°:', selectedItem.id);
            setShopItems(prev => {
              const updated = prev.map(item => 
                item.id === selectedItem.id 
                  ? { ...item, ...itemData }
                  : item
              );
              console.log('Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р Р…РЎвЂ№Р в„– РЎРѓР С—Р С‘РЎРѓР С•Р С” РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† Р С—Р С•РЎРѓР В»Р Вµ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ:', updated);
              return updated;
            });
            setShowEditItem(false);
            setSelectedItem(null);
          }}
          onDelete={() => {
            setShopItems(prev => prev.filter(item => item.id !== selectedItem.id));
            setShowEditItem(false);
            setSelectedItem(null);
          }}
          categories={categories}
        />
      )}

      {/* Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р Р…Р В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘РЎРЏ */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/20">
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {navigationItems.slice(0, 4).map((item, index) => {
              const Icon = item.icon;
              const isActive = item.section === 'shop';
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={() => item.section === 'dashboard' ? onBack() : onNavigateToSection(item.section)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                    isActive ? 'bg-primary' : 'glass-card'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isActive ? 'text-white' : 'text-foreground/70'
                    }`} />
                  </div>
                  <span className={`text-xs ${
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {navigationItems.slice(4, 8).map((item, index) => {
              const Icon = item.icon;
              const isActive = item.section === 'shop';
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={() => onNavigateToSection(item.section)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                    isActive ? 'bg-primary' : 'glass-card'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isActive ? 'text-white' : 'text-foreground/70'
                    }`} />
                  </div>
                  <span className={`text-xs ${
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ShopItemModalProps {
  isEdit: boolean;
  item: ShopItem | null;
  onClose: () => void;
  onSave: (itemData: Omit<ShopItem, 'id' | 'isActive'>) => void;
  onDelete?: () => void;
  categories: Array<{ value: string; label: string }>;
}

function ShopItemModal({ isEdit, item, onClose, onSave, onDelete, categories }: ShopItemModalProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    title: item?.name || '', // Р вЂќРЎС“Р В±Р В»Р С‘РЎР‚РЎС“Р ВµР С Р Т‘Р В»РЎРЏ РЎРѓР С•Р Р†Р СР ВµРЎРѓРЎвЂљР С‘Р СР С•РЎРѓРЎвЂљР С‘
    price: item?.price || 0,
    description: item?.description || '',
    category: item?.category || 'bonus' as const,
    image: item?.image || '',
    stock: item?.stock || 0,
    emoji: item?.emoji || 'СЂСџвЂњВ¦'
  });
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  // Р вЂњР В»Р С•Р В±Р В°Р В»РЎРЉР Р…РЎвЂ№Р в„– Р В±Р В»Р С•Р С” HTML5 Р Р†Р В°Р В»Р С‘Р Т‘Р В°РЎвЂ Р С‘Р С‘ Р Т‘Р В»РЎРЏ РЎРЊРЎвЂљР С•Р С–Р С• Р СР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р С–Р С• Р С•Р С”Р Р…Р В°
  useEffect(() => {
    const handleInvalid = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('HTML5 validation blocked');
    };

    document.addEventListener('invalid', handleInvalid, true);
    
    return () => {
      document.removeEventListener('invalid', handleInvalid, true);
    };
  }, []);

  // Р СџРЎР‚Р С•РЎРѓРЎвЂљР В°РЎРЏ Р В±Р В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р С”Р В° Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р С”Р С‘ РЎвЂћР С•РЎР‚Р СРЎвЂ№ Р В±Р ВµР В· Р Р…Р В°РЎР‚РЎС“РЎв‚¬Р ВµР Р…Р С‘РЎРЏ Р С•РЎРѓРЎвЂљР В°Р В»РЎРЉР Р…РЎвЂ№РЎвЂ¦ РЎРѓР С•Р В±РЎвЂ№РЎвЂљР С‘Р в„–
  const preventFormSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Р вЂР С•Р В»Р ВµР Вµ Р СРЎРЏР С–Р С”Р С‘Р Вµ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘ - РЎС“РЎРѓРЎвЂљР В°Р Р…Р В°Р Р†Р В»Р С‘Р Р†Р В°Р ВµР С Р В·Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р С—Р С• РЎС“Р СР С•Р В»РЎвЂЎР В°Р Р…Р С‘РЎР‹ Р Р†Р СР ВµРЎРѓРЎвЂљР С• Р В±Р В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р С”Р С‘
    const finalData = {
      name: formData.name.trim() || formData.title.trim() || 'Р СњР С•Р Р†РЎвЂ№Р в„– РЎвЂљР С•Р Р†Р В°РЎР‚',
      price: formData.price > 0 ? formData.price : 1,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      stock: formData.stock >= 0 ? formData.stock : 0,
      emoji: formData.emoji
    };
    
    console.log('Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°:', finalData);
    onSave(finalData);
  };

  const handleDelete = () => {
    // Р вЂ™РЎР‚Р ВµР СР ВµР Р…Р Р…Р С• РЎС“Р В±Р С‘РЎР‚Р В°Р ВµР С Р С—Р С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ РЎС“Р Т‘Р В°Р В»Р ВµР Р…Р С‘РЎРЏ
    onDelete && onDelete();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <Dialog 
      open={true} 
      onOpenChange={(open) => !open && onClose()}
      modal={true}
    >
      <DialogContent 
        className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl"
        onInvalid={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          onInvalid={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dialog validation blocked');
          }}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dialog submit blocked');
          }}
        >
        <DialogTitle className="sr-only">
          {isEdit ? 'Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°' : 'Р вЂќР С•Р В±Р В°Р Р†Р В»Р ВµРїС—Р…РїС—Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ {isEdit ? 'РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ РЎРѓРЎС“РЎвЂ°Р ВµРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°Р ВµР С–Р С•' : 'Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р С–Р С•'} РЎвЂљР С•Р Р†Р В°РЎР‚Р В° Р Р† Р СР В°Р С–Р В°Р В·Р С‘Р Р… РЎРѓ Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉРЎР‹ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘РЎРЏ, РЎвЂ Р ВµР Р…РЎвЂ№, Р С”Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘Р С‘ Р С‘ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
        </DialogDescription>
        <form 
          className="p-6"
          noValidate
          autoComplete="off"
          onSubmit={preventFormSubmit}
          onInvalid={(e) => e.preventDefault()}
          data-lpignore="true"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground text-center flex-1">
              {isEdit ? item?.name || 'Р СћР С•Р Р†Р В°РЎР‚' : 'Р вЂќР С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              formNoValidate
            >
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-4">
            {/* Р С™Р В°РЎР‚РЎвЂљР С‘Р Р…Р С”Р В° РЎвЂљР С•Р Р†Р В°РЎР‚Р В° Р С‘ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
            <div className="flex gap-4">
              {/* Р С™Р В°РЎР‚РЎвЂљР С‘Р Р…Р С”Р В° */}
              <div className="relative">
                <div 
                  className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {formData.image ? (
                    <ImageWithFallback 
                      src={formData.image} 
                      alt={formData.name || formData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  tabIndex={-1}
                />
              </div>
              
              {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
              <div className="flex-1 glass-card rounded-2xl p-3">
                <div className="text-sm font-medium text-foreground mb-2">Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°</div>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="РІР‚Сћ Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°"
                  className="w-full bg-transparent text-sm text-muted-foreground resize-none border-none outline-none"
                  rows={3}
                  autoComplete="off"
                  data-lpignore="true"
                  onInvalid={(e) => e.preventDefault()}
                />
              </div>
            </div>
            {/* Р ВР В·Р СР ВµР Р…Р ВµР Р…Р С‘Р Вµ РЎвЂ Р ВµР Р…РЎвЂ№ (РЎвЂљР С•Р В»РЎРЉР С”Р С• Р Т‘Р В»РЎРЏ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ) */}
            {isEdit && (
              <div className="text-center">
                {!isEditingPrice ? (
                  <div
                    className="inline-block glass-card rounded-2xl px-4 py-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setIsEditingPrice(true)}
                  >
                    <div className="text-sm text-muted-foreground mb-1">Р В¦Р ВµР Р…Р В°:</div>
                    <div className="font-medium text-foreground">
                      {formData.price}g
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-4">
                    <div className="text-sm font-medium text-foreground/80 mb-3 text-center">
                      Р ВР В·Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ РЎРѓРЎвЂљР С•Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°
                    </div>
                    <div className="flex gap-3 mb-4">
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          handleInputChange('price', parseInt(value) || 0);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                        placeholder="0"
                        className="flex-1 p-3 bg-input-background border border-border rounded-2xl text-sm text-center"
                        autoComplete="off"
                        data-lpignore="true"
                        onInvalid={(e) => e.preventDefault()}
                      />
                      <div className="w-16 p-3 bg-input-background border border-border rounded-2xl text-sm text-center text-muted-foreground">
                        G
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingPrice(false)}
                        className="flex-1"
                        formNoValidate
                      >
                        Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsEditingPrice(false)}
                        className="flex-1 bg-primary text-primary-foreground"
                        formNoValidate
                      >
                        Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isEdit && (
              <>
                {/* Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      handleInputChange('name', e.target.value);
                      handleInputChange('title', e.target.value); // Р РЋР С‘Р Р…РЎвЂ¦РЎР‚Р С•Р Р…Р С‘Р В·Р С‘РЎР‚РЎС“Р ВµР С Р Т‘Р В»РЎРЏ РЎРѓР С•Р Р†Р СР ВµРЎРѓРЎвЂљР С‘Р СР С•РЎРѓРЎвЂљР С‘
                    }}
                    placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°..."
                    className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm"
                    autoComplete="off"
                    data-lpignore="true"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    onInvalid={(e) => e.preventDefault()}
                  />
                </div>

                {/* Р В¦Р ВµР Р…Р В° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р В¦Р ВµР Р…Р В° (G-Р СР С•Р Р…Р ВµРЎвЂљРЎвЂ№)
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      handleInputChange('price', parseInt(value) || 0);
                    }}
                    placeholder="0"
                    className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm"
                    autoComplete="off"
                    data-lpignore="true"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    onInvalid={(e) => e.preventDefault()}
                  />
                </div>

                {/* Р СњР В°Р В»Р С‘РЎвЂЎР С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С• Р Р† Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘
                  </label>
                  <input
                    type="text"
                    value={formData.stock}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      handleInputChange('stock', parseInt(value) || 0);
                    }}
                    placeholder="0"
                    className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm"
                    autoComplete="off"
                    data-lpignore="true"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    onInvalid={(e) => e.preventDefault()}
                  />
                </div>

                {/* Р В­Р СР С•Р Т‘Р В·Р С‘ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р В­Р СР С•Р Т‘Р В·Р С‘ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°
                  </label>
                  <input
                    type="text"
                    value={formData.emoji}
                    onChange={(e) => handleInputChange('emoji', e.target.value)}
                    placeholder="СЂСџвЂњВ¦"
                    className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm"
                    autoComplete="off"
                    data-lpignore="true"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    onInvalid={(e) => e.preventDefault()}
                  />
                </div>

                {/* Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm"
                    autoComplete="off"
                    data-lpignore="true"
                    onInvalid={(e) => e.preventDefault()}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ */}
          <div className={`${isEdit ? 'grid grid-cols-3 gap-3' : 'flex gap-3'} pt-4 border-t border-border/20 mt-4`}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={isEdit ? 'col-span-1' : 'flex-1'}
              formNoValidate
            >
              Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
            </Button>
            {isEdit && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                className="col-span-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                formNoValidate
              >
                Р Р€Р Т‘Р В°Р В»Р С‘РЎвЂљРЎРЉ
              </Button>
            )}
            <Button
              type="button"
              onClick={() => {
                console.log('Р С™Р Р…Р С•Р С—Р С”Р В° РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С‘РЎРЏ Р Р…Р В°Р В¶Р В°РЎвЂљР В°, isEdit:', isEdit);
                console.log('Р СћР ВµР С”РЎС“РЎвЂ°Р С‘Р Вµ Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ РЎвЂћР С•РЎР‚Р СРЎвЂ№:', formData);
                handleSave();
              }}
              className={isEdit ? 'col-span-1 bg-primary text-primary-foreground' : 'flex-1 bg-primary text-primary-foreground'}
              formNoValidate
            >
              {isEdit ? 'Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ' : 'Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ'}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
