export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji?: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  items: LocalCartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'rejected';
  createdAt: string;
  userId: string;
  customerName: string;
  customerTeam: string;
}

export interface LocalCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji?: string;
}