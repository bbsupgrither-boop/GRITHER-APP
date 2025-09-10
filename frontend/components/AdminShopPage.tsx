import { useState, useEffect } from 'react';
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
  // РўРѕРІР°СЂС‹ С‚РµРїРµСЂСЊ СѓРїСЂР°РІР»СЏСЋС‚СЃСЏ С‡РµСЂРµР· РіР»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const navigationItems = [
    { icon: Home, label: 'Р“Р»Р°РІРЅР°СЏ', section: 'dashboard' },
    { icon: Users, label: 'Р’РѕСЂРєРµСЂС‹', section: 'workers' },
    { icon: Zap, label: 'Р‘Р°С‚С‚Р»С‹', section: 'battles' },
    { icon: Trophy, label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р—Р°РґР°С‡Рё', section: 'tasks' },
    { icon: ShoppingBag, label: 'РўРѕРІР°СЂС‹', section: 'shop' },
    { icon: Gamepad2, label: 'РРіСЂС‹', section: 'games' },
    { icon: Box, label: 'РљРµР№СЃС‹', section: 'cases' }
  ];

  const categories = [
    { value: 'bonus', label: 'Р‘РѕРЅСѓСЃ' },
    { value: 'privilege', label: 'РџСЂРёРІРёР»РµРіРёСЏ' },
    { value: 'cosmetic', label: 'РљРѕСЃРјРµС‚РёРєР°' },
    { value: 'tool', label: 'РРЅСЃС‚СЂСѓРјРµРЅС‚' }
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
      {/* Р—Р°РіРѕР»РѕРІРѕРє СЃС‚СЂР°РЅРёС†С‹ */}
      <div className="p-6">
        <h1 className="text-lg font-medium text-foreground text-center mb-4">РџР°РЅРµР»СЊ СѓРїСЂР°РІР»РµРЅРёСЏ</h1>
        
        {/* РЈРїСЂР°РІР»РµРЅРёРµ */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowAddItem(true)}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Р”РѕР±. С‚РѕРІР°СЂ
          </button>
          
          <button
            onClick={() => onNavigateToModeration?.()}
            className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
          >
            РћРґРѕР±СЂРёС‚СЊ
          </button>
        </div>
      </div>

      {/* РЎРѕРґРµСЂР¶РёРјРѕРµ */}
      <div className="px-6 space-y-6 pb-60">
        {/* РЎРµРєС†РёСЏ С‚РѕРІР°СЂРѕРІ */}
        <div className="glass-card rounded-2xl apple-shadow p-4">
          {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєРЅРѕРїРєРѕР№ СЃРѕСЂС‚РёСЂРѕРІРєРё */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">Р”РѕСЃС‚СѓРїРЅС‹Рµ С‚РѕРІР°СЂС‹</h2>
            <button
              onClick={toggleSortOrder}
              className="p-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title={`РЎРѕСЂС‚РёСЂРѕРІР°С‚СЊ РїРѕ СЃС‚РѕРёРјРѕСЃС‚Рё ${sortOrder === 'asc' ? 'РїРѕ СѓР±С‹РІР°РЅРёСЋ' : 'РїРѕ РІРѕР·СЂР°СЃС‚Р°РЅРёСЋ'}`}
            >
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>



          {/* РЎРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ */}
          <div className="space-y-3">
            {sortedItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center gap-3">
                  {/* РљР°СЂС‚РёРЅРєР° С‚РѕРІР°СЂР° */}
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
                      РЎС‚РѕРёРјРѕСЃС‚СЊ: {item.price}g
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Р›РѕРіРёРєР° РїРѕРєСѓРїРєРё Р±СѓРґРµС‚ РґРѕР±Р°РІР»РµРЅР° РїРѕР·Р¶Рµ
                  }}
                  className="px-4 py-2 glass-card rounded-lg text-sm font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  РљСѓРїРёС‚СЊ
                </button>
              </div>
            ))}
            {sortedItems.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                РќРµС‚ С‚РѕРІР°СЂРѕРІ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
              </div>
            )}
          </div>
        </div>
      </div>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґРѕР±Р°РІР»РµРЅРёСЏ С‚РѕРІР°СЂР° */}
      {showAddItem && (
        <ShopItemModal
          isEdit={false}
          item={null}
          onClose={() => setShowAddItem(false)}
          onSave={(itemData) => {
            console.log('РџРѕР»СѓС‡РµРЅС‹ РґР°РЅРЅС‹Рµ РґР»СЏ РґРѕР±Р°РІР»РµРЅРёСЏ С‚РѕРІР°СЂР°:', itemData);
            const newItem: ShopItem = {
              id: Date.now().toString(),
              ...itemData,
              isActive: true
            };
            console.log('РќРѕРІС‹Р№ С‚РѕРІР°СЂ:', newItem);
            setShopItems(prev => {
              const updated = [...prev, newItem];
              console.log('РћР±РЅРѕРІР»РµРЅРЅС‹Р№ СЃРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ:', updated);
              return updated;
            });
            setShowAddItem(false);
          }}
          categories={categories}
        />
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ С‚РѕРІР°СЂР° */}
      {showEditItem && selectedItem && (
        <ShopItemModal
          isEdit={true}
          item={selectedItem}
          onClose={() => {
            setShowEditItem(false);
            setSelectedItem(null);
          }}
          onSave={(itemData) => {
            console.log('РџРѕР»СѓС‡РµРЅС‹ РґР°РЅРЅС‹Рµ РґР»СЏ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ С‚РѕРІР°СЂР°:', itemData);
            console.log('ID СЂРµРґР°РєС‚РёСЂСѓРµРјРѕРіРѕ С‚РѕРІР°СЂР°:', selectedItem.id);
            setShopItems(prev => {
              const updated = prev.map(item => 
                item.id === selectedItem.id 
                  ? { ...item, ...itemData }
                  : item
              );
              console.log('РћР±РЅРѕРІР»РµРЅРЅС‹Р№ СЃРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ РїРѕСЃР»Рµ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ:', updated);
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

      {/* Р‘С‹СЃС‚СЂР°СЏ РЅР°РІРёРіР°С†РёСЏ */}
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
    title: item?.name || '', // Р”СѓР±Р»РёСЂСѓРµРј РґР»СЏ СЃРѕРІРјРµСЃС‚РёРјРѕСЃС‚Рё
    price: item?.price || 0,
    description: item?.description || '',
    category: item?.category || 'bonus' as const,
    image: item?.image || '',
    stock: item?.stock || 0,
    emoji: item?.emoji || 'рџ“¦'
  });
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  // Р“Р»РѕР±Р°Р»СЊРЅС‹Р№ Р±Р»РѕРє HTML5 РІР°Р»РёРґР°С†РёРё РґР»СЏ СЌС‚РѕРіРѕ РјРѕРґР°Р»СЊРЅРѕРіРѕ РѕРєРЅР°
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

  // РџСЂРѕСЃС‚Р°СЏ Р±Р»РѕРєРёСЂРѕРІРєР° РѕС‚РїСЂР°РІРєРё С„РѕСЂРјС‹ Р±РµР· РЅР°СЂСѓС€РµРЅРёСЏ РѕСЃС‚Р°Р»СЊРЅС‹С… СЃРѕР±С‹С‚РёР№
  const preventFormSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Р‘РѕР»РµРµ РјСЏРіРєРёРµ РїСЂРѕРІРµСЂРєРё - СѓСЃС‚Р°РЅР°РІР»РёРІР°РµРј Р·РЅР°С‡РµРЅРёСЏ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ РІРјРµСЃС‚Рѕ Р±Р»РѕРєРёСЂРѕРІРєРё
    const finalData = {
      name: formData.name.trim() || formData.title.trim() || 'РќРѕРІС‹Р№ С‚РѕРІР°СЂ',
      price: formData.price > 0 ? formData.price : 1,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      stock: formData.stock >= 0 ? formData.stock : 0,
      emoji: formData.emoji
    };
    
    console.log('РЎРѕС…СЂР°РЅРµРЅРёРµ С‚РѕРІР°СЂР°:', finalData);
    onSave(finalData);
  };

  const handleDelete = () => {
    // Р’СЂРµРјРµРЅРЅРѕ СѓР±РёСЂР°РµРј РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ СѓРґР°Р»РµРЅРёСЏ
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
          {isEdit ? 'Р РµРґР°РєС‚РёСЂРѕРІР°РЅРёРµ С‚РѕРІР°СЂР°' : 'Р”РѕР±Р°РІР»РµпїЅпїЅРёРµ С‚РѕРІР°СЂР°'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ {isEdit ? 'СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ СЃСѓС‰РµСЃС‚РІСѓСЋС‰РµРіРѕ' : 'РґРѕР±Р°РІР»РµРЅРёСЏ РЅРѕРІРѕРіРѕ'} С‚РѕРІР°СЂР° РІ РјР°РіР°Р·РёРЅ СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ РЅР°СЃС‚СЂРѕР№РєРё РЅР°Р·РІР°РЅРёСЏ, С†РµРЅС‹, РєР°С‚РµРіРѕСЂРёРё Рё РёР·РѕР±СЂР°Р¶РµРЅРёСЏ
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
              {isEdit ? item?.name || 'РўРѕРІР°СЂ' : 'Р”РѕР±Р°РІР»РµРЅРёРµ С‚РѕРІР°СЂР°'}
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
            {/* РљР°СЂС‚РёРЅРєР° С‚РѕРІР°СЂР° Рё РѕРїРёСЃР°РЅРёРµ */}
            <div className="flex gap-4">
              {/* РљР°СЂС‚РёРЅРєР° */}
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
              
              {/* РћРїРёСЃР°РЅРёРµ */}
              <div className="flex-1 glass-card rounded-2xl p-3">
                <div className="text-sm font-medium text-foreground mb-2">РћРїРёСЃР°РЅРёРµ С‚РѕРІР°СЂР°</div>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="вЂў РџРѕРґР·Р°РґР°С‡Р°"
                  className="w-full bg-transparent text-sm text-muted-foreground resize-none border-none outline-none"
                  rows={3}
                  autoComplete="off"
                  data-lpignore="true"
                  onInvalid={(e) => e.preventDefault()}
                />
              </div>
            </div>
            {/* РР·РјРµРЅРµРЅРёРµ С†РµРЅС‹ (С‚РѕР»СЊРєРѕ РґР»СЏ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ) */}
            {isEdit && (
              <div className="text-center">
                {!isEditingPrice ? (
                  <div
                    className="inline-block glass-card rounded-2xl px-4 py-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setIsEditingPrice(true)}
                  >
                    <div className="text-sm text-muted-foreground mb-1">Р¦РµРЅР°:</div>
                    <div className="font-medium text-foreground">
                      {formData.price}g
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-4">
                    <div className="text-sm font-medium text-foreground/80 mb-3 text-center">
                      РР·РјРµРЅРёС‚СЊ СЃС‚РѕРёРјРѕСЃС‚СЊ С‚РѕРІР°СЂР°
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
                        РћС‚РјРµРЅРёС‚СЊ
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsEditingPrice(false)}
                        className="flex-1 bg-primary text-primary-foreground"
                        formNoValidate
                      >
                        РџСЂРёРјРµРЅРёС‚СЊ
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isEdit && (
              <>
                {/* РќР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РќР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР°
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      handleInputChange('name', e.target.value);
                      handleInputChange('title', e.target.value); // РЎРёРЅС…СЂРѕРЅРёР·РёСЂСѓРµРј РґР»СЏ СЃРѕРІРјРµСЃС‚РёРјРѕСЃС‚Рё
                    }}
                    placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР°..."
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

                {/* Р¦РµРЅР° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р¦РµРЅР° (G-РјРѕРЅРµС‚С‹)
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

                {/* РќР°Р»РёС‡РёРµ С‚РѕРІР°СЂР° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РљРѕР»РёС‡РµСЃС‚РІРѕ РІ РЅР°Р»РёС‡РёРё
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

                {/* Р­РјРѕРґР·Рё С‚РѕРІР°СЂР° */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р­РјРѕРґР·Рё С‚РѕРІР°СЂР°
                  </label>
                  <input
                    type="text"
                    value={formData.emoji}
                    onChange={(e) => handleInputChange('emoji', e.target.value)}
                    placeholder="рџ“¦"
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

                {/* РљР°С‚РµРіРѕСЂРёСЏ */}
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РљР°С‚РµРіРѕСЂРёСЏ
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

          {/* РљРЅРѕРїРєРё */}
          <div className={`${isEdit ? 'grid grid-cols-3 gap-3' : 'flex gap-3'} pt-4 border-t border-border/20 mt-4`}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={isEdit ? 'col-span-1' : 'flex-1'}
              formNoValidate
            >
              РћС‚РјРµРЅРёС‚СЊ
            </Button>
            {isEdit && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                className="col-span-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                formNoValidate
              >
                РЈРґР°Р»РёС‚СЊ
              </Button>
            )}
            <Button
              type="button"
              onClick={() => {
                console.log('РљРЅРѕРїРєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РЅР°Р¶Р°С‚Р°, isEdit:', isEdit);
                console.log('РўРµРєСѓС‰РёРµ РґР°РЅРЅС‹Рµ С„РѕСЂРјС‹:', formData);
                handleSave();
              }}
              className={isEdit ? 'col-span-1 bg-primary text-primary-foreground' : 'flex-1 bg-primary text-primary-foreground'}
              formNoValidate
            >
              {isEdit ? 'РџСЂРёРјРµРЅРёС‚СЊ' : 'Р”РѕР±Р°РІРёС‚СЊ'}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
