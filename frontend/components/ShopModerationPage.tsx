import { useState } from 'react';
import { ArrowLeft, X, Package, CheckCircle, XCircle } from './Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Order } from '../types/shop';

interface ShopModerationPageProps {
  onBack: () => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  onUpdateUserBalance?: (userId: string, amount: number) => void;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (orderId: string, trackingInfo: string) => void;
  onReject: (orderId: string, reason: string) => void;
}

function OrderDetailsModal({ order, isOpen, onClose, onApprove, onReject }: OrderDetailsModalProps) {
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = () => {
    if (!trackingInfo.trim()) {
      alert('РќРµРѕР±С…РѕРґРёРјРѕ Р·Р°РїРѕР»РЅРёС‚СЊ РёРЅС„РѕСЂРјР°С†РёСЋ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ');
      return;
    }
    onApprove(order!.id, trackingInfo);
    onClose();
    setTrackingInfo('');
    setShowApprovalForm(false);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('РќРµРѕР±С…РѕРґРёРјРѕ СѓРєР°Р·Р°С‚СЊ РїСЂРёС‡РёРЅСѓ РѕС‚РєР»РѕРЅРµРЅРёСЏ');
      return;
    }
    onReject(order!.id, rejectionReason);
    onClose();
    setRejectionReason('');
    setShowRejectionForm(false);
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-foreground text-center mb-4">
              РўРѕРІР°СЂ
            </DialogTitle>
            <DialogDescription className="sr-only">
              Р”РµС‚Р°Р»Рё Р·Р°РєР°Р·Р° С‚РѕРІР°СЂР° РґР»СЏ РјРѕРґРµСЂР°С†РёРё
            </DialogDescription>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1"></div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ Р·Р°РєР°Р·Рµ */}
            <div className="glass-card rounded-2xl p-4">
              <div className="text-sm font-medium text-foreground mb-3">
                Р—Р°РєР°Р· #{order.id}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                Р”Р°С‚Р° Р·Р°РєР°Р·Р°: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-muted-foreground">
                РћР±С‰Р°СЏ СЃС‚РѕРёРјРѕСЃС‚СЊ: {order.total} РєРѕРёРЅРѕРІ
              </div>
            </div>

            {/* РўРѕРІР°СЂС‹ РІ Р·Р°РєР°Р·Рµ */}
            <div className="glass-card rounded-2xl p-4">
              <div className="text-sm font-medium text-foreground mb-3">РўРѕРІР°СЂС‹ РІ Р·Р°РєР°Р·Рµ:</div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.price} РєРѕРёРЅРѕРІ x {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.price * item.quantity} РєРѕРёРЅРѕРІ
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ СЃРѕС‚СЂСѓРґРЅРёРєРµ */}
            <div className="glass-card rounded-2xl p-4">
              <div className="text-sm font-medium text-foreground mb-2">
                РЎРѕС‚СЂСѓРґРЅРёРє: {order.customerName || 'РќРµРёР·РІРµСЃС‚РµРЅ'}
              </div>
              <div className="text-xs text-muted-foreground">
                РљРѕРјР°РЅРґР°: {order.customerTeam || 'РќРµ СѓРєР°Р·Р°РЅР°'}
              </div>
            </div>

            {/* Р¤РѕСЂРјС‹ РѕРґРѕР±СЂРµРЅРёСЏ/РѕС‚РєР»РѕРЅРµРЅРёСЏ */}
            {showApprovalForm && (
              <div className="glass-card rounded-2xl p-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  РРЅС„РѕСЂРјР°С†РёСЏ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ *
                </div>
                <textarea
                  value={trackingInfo}
                  onChange={(e) => setTrackingInfo(e.target.value)}
                  placeholder="Р’РІРµРґРёС‚Рµ С‚СЂРµРє-РЅРѕРјРµСЂ, СЃСЃС‹Р»РєСѓ РЅР° СЃРµСЂС‚РёС„РёРєР°С‚ РёР»Рё РґСЂСѓРіСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ..."
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowApprovalForm(false)}
                    className="flex-1"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </Button>
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    РћРґРѕР±СЂРёС‚СЊ
                  </Button>
                </div>
              </div>
            )}

            {showRejectionForm && (
              <div className="glass-card rounded-2xl p-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ *
                </div>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="РЈРєР°Р¶РёС‚Рµ РїСЂРёС‡РёРЅСѓ РѕС‚РєР»РѕРЅРµРЅРёСЏ Р·Р°РєР°Р·Р°..."
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectionForm(false)}
                    className="flex-1"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </Button>
                  <Button
                    onClick={handleReject}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    РћС‚РєР»РѕРЅРёС‚СЊ
                  </Button>
                </div>
              </div>
            )}

            {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ */}
            {!showApprovalForm && !showRejectionForm && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRejectionForm(true)}
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  РћС‚РєР»РѕРЅРёС‚СЊ
                </Button>
                <Button
                  onClick={() => setShowApprovalForm(true)}
                  className="flex-1 bg-primary text-primary-foreground"
                >
                  РћРґРѕР±СЂРёС‚СЊ
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ShopModerationPage({ onBack, orders, setOrders, onUpdateUserBalance }: ShopModerationPageProps) {
  // Р—Р°РєР°Р·С‹ С‚РµРїРµСЂСЊ СѓРїСЂР°РІР»СЏСЋС‚СЃСЏ С‡РµСЂРµР· РіР»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleApproveOrder = (orderId: string, trackingInfo: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'active' as const, trackingInfo }
        : order
    ));
    console.log(`Р—Р°РєР°Р· ${orderId} РѕРґРѕР±СЂРµРЅ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРј СЃ РёРЅС„РѕСЂРјР°С†РёРµР№ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ: ${trackingInfo}`);
  };

  const handleRejectOrder = (orderId: string, reason: string) => {
    const rejectedOrder = orders.find(order => order.id === orderId);
    
    // Р’РѕР·РІСЂР°С‰Р°РµРј РґРµРЅСЊРіРё РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ РїСЂпїЅпїЅ РѕС‚РєР»РѕРЅРµРЅРёРё Р·Р°РєР°Р·Р°
    if (rejectedOrder && onUpdateUserBalance) {
      onUpdateUserBalance(rejectedOrder.userId, rejectedOrder.total);
      console.log(`Р’РѕР·РІСЂР°С‰РµРЅРѕ ${rejectedOrder.total} РєРѕРёРЅРѕРІ РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ ${rejectedOrder.userId} Р·Р° РѕС‚РєР»РѕРЅРµРЅРЅС‹Р№ Р·Р°РєР°Р·`);
    }
    
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'rejected' as const, rejectionReason: reason }
        : order
    ));
    console.log(`Р—Р°РєР°Р· ${orderId} РѕС‚РєР»РѕРЅРµРЅ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРј СЃ РїСЂРёС‡РёРЅРѕР№: ${reason}`);
  };

  const pendingOrdersList = orders.filter(order => order.status === 'pending');

  return (
    <div className="min-h-screen bg-background">
      {/* Р—Р°РіРѕР»РѕРІРѕРє СЃС‚СЂР°РЅРёС†С‹ */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground/70" />
          </button>
          <h1 className="text-lg font-medium text-foreground">РњРѕРґРµСЂР°С†РёСЏ С‚РѕРІР°СЂРѕРІ</h1>
        </div>
      </div>

      {/* РЎРѕРґРµСЂР¶РёРјРѕРµ */}
      <div className="px-6 space-y-4 pb-20">
        {pendingOrdersList.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-foreground font-medium mb-2">РќРµС‚ Р·Р°РєР°Р·РѕРІ РЅР° РјРѕРґРµСЂР°С†РёРё</div>
            <div className="text-sm text-muted-foreground">
              Р’СЃРµ Р·Р°РєР°Р·С‹ РѕР±СЂР°Р±РѕС‚Р°РЅС‹
            </div>
          </div>
        ) : (
          pendingOrdersList.map((order) => (
            <div 
              key={order.id}
              className="glass-card rounded-2xl p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    {order.items[0]?.emoji ? (
                      <span className="text-lg">{order.items[0].emoji}</span>
                    ) : (
                      <Package className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Р—Р°РєР°Р· #{order.id}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.items.length} С‚РѕРІР°СЂ(РѕРІ) вЂў {order.total} РєРѕРёРЅРѕРІ
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.customerName || 'РќРµРёР·РІРµСЃС‚РЅС‹Р№ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRejectOrder(order.id, 'РћС‚РєР»РѕРЅРµРЅРѕ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРј Р±РµР· СѓРєР°Р·Р°РЅРёСЏ РїСЂРёС‡РёРЅС‹');
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-red-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApproveOrder(order.id, 'РћРґРѕР±СЂРµРЅРѕ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРј Р±РµР· РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕР№ РёРЅС„РѕСЂРјР°С†РёРё');
                    }}
                    className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґРµС‚Р°Р»РµР№ Р·Р°РєР°Р·Р° */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showOrderDetails}
        onClose={() => {
          setShowOrderDetails(false);
          setSelectedOrder(null);
        }}
        onApprove={handleApproveOrder}
        onReject={handleRejectOrder}
      />
    </div>
  );
}
