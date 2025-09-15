п»їimport { useState } from 'react';
import { Plus, Edit, Trash2, Package, DollarSign } from './Icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  available: boolean;
}

export function AdminShop() {
  const [items, setItems] = useState<ShopItem[]>([
    {
      id: '1',
      name: 'Р С’Р Р†Р В°РЎвЂљР В°РЎР‚ "Р вЂ”Р Р†Р ВµР В·Р Т‘Р В°"',
      description: 'Р В­Р С”РЎРѓР С”Р В»РЎР‹Р В·Р С‘Р Р†Р Р…РЎвЂ№Р в„– Р В°Р Р†Р В°РЎвЂљР В°РЎР‚ РЎРѓР С• Р В·Р Р†Р ВµР В·Р Т‘Р Р…РЎвЂ№Р С Р Т‘Р С‘Р В·Р В°Р в„–Р Р…Р С•Р С',
      price: 500,
      category: 'Р С’Р Р†Р В°РЎвЂљР В°РЎР‚РЎвЂ№',
      stock: -1, // -1 Р С•Р В·Р Р…Р В°РЎвЂЎР В°Р ВµРЎвЂљ Р Р…Р ВµР С•Р С–РЎР‚Р В°Р Р…Р С‘РЎвЂЎР ВµР Р…Р Р…РЎвЂ№Р в„– Р В·Р В°Р С—Р В°РЎРѓ
      available: true
    },
    {
      id: '2',
      name: 'Р вЂР ВµР в„–Р Т‘Р В¶ "Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°"',
      description: 'Р С›РЎРѓР С•Р В±РЎвЂ№Р в„– Р В±Р ВµР в„–Р Т‘Р В¶ Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р Т‘Р В°РЎР‹РЎвЂ°Р С‘РЎвЂ¦РЎРѓРЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–',
      price: 1000,
      category: 'Р вЂР ВµР в„–Р Т‘Р В¶Р С‘',
      stock: 50,
      available: true
    },
    {
      id: '3',
      name: 'Р СћР ВµР СР В° "Р С™Р С•РЎРѓР СР С•РЎРѓ"',
      description: 'Р С™Р С•РЎРѓР СР С‘РЎвЂЎР ВµРЎРѓР С”Р В°РЎРЏ РЎвЂљР ВµР СР В° Р С•РЎвЂћР С•РЎР‚Р СР В»Р ВµР Р…Р С‘РЎРЏ Р С—РЎР‚Р С•РЎвЂћР С‘Р В»РЎРЏ',
      price: 750,
      category: 'Р СћР ВµР СРЎвЂ№',
      stock: -1,
      available: false
    }
  ]);
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 100,
    category: '',
    stock: -1,
    imageUrl: '',
    available: true
  });

  const handleCreate = () => {
    const newItem: ShopItem = {
      id: Date.now().toString(),
      ...formData
    };
    setItems([...items, newItem]);
    setCreateModalOpen(false);
    setFormData({ name: '', description: '', price: 100, category: '', stock: -1, imageUrl: '', available: true });
  };

  const handleEdit = () => {
    if (selectedItem) {
      const updatedItems = items.map(item =>
        item.id === selectedItem.id
          ? { ...item, ...formData }
          : item
      );
      setItems(updatedItems);
      setEditModalOpen(false);
      setSelectedItem(null);
      setFormData({ name: '', description: '', price: 100, category: '', stock: -1, imageUrl: '', available: true });
    }
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const openEditModal = (item: ShopItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      stock: item.stock,
      imageUrl: item.imageUrl || '',
      available: item.available
    });
    setEditModalOpen(true);
  };

  const toggleAvailability = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id
        ? { ...item, available: !item.available }
        : item
    );
    setItems(updatedItems);
  };

  return (
    <>
      <div className="p-4 space-y-6">
        {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р С‘ Р С”Р Р…Р С•Р С—Р С”Р В° РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-foreground">Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р СР В°Р С–Р В°Р В·Р С‘Р Р…Р С•Р С</h2>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-primary text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ РЎвЂљР С•Р Р†Р В°РЎР‚
          </Button>
        </div>

        {/* Р РЋРЎвЂљР В°РЎвЂљР С‘РЎРѓРЎвЂљР С‘Р С”Р В° */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Р вЂ™РЎРѓР ВµР С–Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р†</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">{items.length}</div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-medium text-foreground">Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№РЎвЂ¦</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {items.filter(item => item.available).length}
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-foreground">Р СњР ВµР Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№РЎвЂ¦</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {items.filter(item => !item.available).length}
            </div>
          </div>
        </div>

        {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† */}
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="text-muted-foreground">Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ Р С—Р С•Р С”Р В° Р Р…Р Вµ Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…РЎвЂ№</div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="glass-card p-4 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {item.category}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {item.price} Р С•РЎвЂЎР С”Р С•Р Р†
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.available 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {item.available ? 'Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р ВµР Р…' : 'Р СњР ВµР Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р ВµР Р…'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="text-xs text-muted-foreground">
                      Р вЂ”Р В°Р С—Р В°РЎРѓ: {item.stock === -1 ? 'Р СњР ВµР С•Р С–РЎР‚Р В°Р Р…Р С‘РЎвЂЎР ВµР Р…Р Р…РЎвЂ№Р в„–' : `${item.stock} РЎв‚¬РЎвЂљ.`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailability(item.id)}
                      className={item.available ? 'text-red-600' : 'text-green-600'}
                    >
                      {item.available ? 'Р РЋР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ' : 'Р СџР С•Р С”Р В°Р В·Р В°РЎвЂљРЎРЉ'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="glass-card border-none max-w-md p-0 [&>button]:hidden">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-foreground mb-4">
                Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ РЎвЂљР С•Р Р†Р В°РЎР‚
              </DialogTitle>
              <DialogDescription className="sr-only">
                Р В¤Р С•РЎР‚Р СР В° Р Т‘Р В»РЎРЏ Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р С–Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р В° Р Р† Р СР В°Р С–Р В°Р В·Р С‘Р Р…
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"
                  className="bg-input-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"
                  className="bg-input-background min-h-20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р В¦Р ВµР Р…Р В° (Р С•РЎвЂЎР С”Р С‘)
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="bg-input-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р вЂ”Р В°Р С—Р В°РЎРѓ
                  </label>
                  <Input
                    type="number"
                    value={formData.stock === -1 ? '' : formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value === '' ? -1 : parseInt(e.target.value) || 0 })}
                    placeholder="Р СџРЎС“РЎРѓРЎвЂљР С• = РІв‚¬С›"
                    className="bg-input-background"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"
                  className="bg-input-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
                </label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-input-background"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="available" className="text-sm font-medium text-foreground/80">
                  Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р ВµР Р… Р Т‘Р В»РЎРЏ Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1"
                >
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </Button>
                <Button
                  onClick={handleCreate}
                  className="flex-1 bg-primary text-primary-foreground"
                  disabled={!formData.name || !formData.description}
                >
                  Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="glass-card border-none max-w-md p-0 [&>button]:hidden">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-foreground mb-4">
                Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ РЎвЂљР С•Р Р†Р В°РЎР‚
              </DialogTitle>
              <DialogDescription className="sr-only">
                Р В¤Р С•РЎР‚Р СР В° Р Т‘Р В»РЎРЏ РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ РЎРѓРЎС“РЎвЂ°Р ВµРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°Р ВµР С–Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р В°
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"
                  className="bg-input-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"
                  className="bg-input-background min-h-20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р В¦Р ВµР Р…Р В° (Р С•РЎвЂЎР С”Р С‘)
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="bg-input-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р вЂ”Р В°Р С—Р В°РЎРѓ
                  </label>
                  <Input
                    type="number"
                    value={formData.stock === -1 ? '' : formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value === '' ? -1 : parseInt(e.target.value) || 0 })}
                    placeholder="Р СџРЎС“РЎРѓРЎвЂљР С• = РІв‚¬С›"
                    className="bg-input-background"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"
                  className="bg-input-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
                </label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-input-background"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available-edit"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="available-edit" className="text-sm font-medium text-foreground/80">
                  Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р ВµР Р… Р Т‘Р В»РЎРЏ Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1"
                >
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </Button>
                <Button
                  onClick={handleEdit}
                  className="flex-1 bg-primary text-primary-foreground"
                  disabled={!formData.name || !formData.description}
                >
                  Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
