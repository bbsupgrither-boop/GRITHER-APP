п»їimport { useState } from 'react';
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
      alert('Р СњР ВµР С•Р В±РЎвЂ¦Р С•Р Т‘Р С‘Р СР С• Р В·Р В°Р С—Р С•Р В»Р Р…Р С‘РЎвЂљРЎРЉ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎР‹ Р Т‘Р В»РЎРЏ Р С•РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘РЎРЏ');
      return;
    }
    onApprove(order!.id, trackingInfo);
    onClose();
    setTrackingInfo('');
    setShowApprovalForm(false);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Р СњР ВµР С•Р В±РЎвЂ¦Р С•Р Т‘Р С‘Р СР С• РЎС“Р С”Р В°Р В·Р В°РЎвЂљРЎРЉ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎС“ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ');
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
              Р СћР С•Р Р†Р В°РЎР‚
            </DialogTitle>
            <DialogDescription className="sr-only">
              Р вЂќР ВµРЎвЂљР В°Р В»Р С‘ Р В·Р В°Р С”Р В°Р В·Р В° РЎвЂљР С•Р Р†Р В°РЎР‚Р В° Р Т‘Р В»РЎРЏ Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘
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
            {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р В·Р В°Р С”Р В°Р В·Р Вµ */}
            <div className="glass-card rounded-2xl p-4">
              <div className="text-sm font-medium text-foreground mb-3">
                Р вЂ”Р В°Р С”Р В°Р В· #{order.id}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                Р вЂќР В°РЎвЂљР В° Р В·Р В°Р С”Р В°Р В·Р В°: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Р С›Р В±РЎвЂ°Р В°РЎРЏ РЎРѓРЎвЂљР С•Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ: {order.total} Р С”Р С•Р С‘Р Р…Р С•Р Р†
              </div>
            </div>

            {/* Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ Р Р† Р В·Р В°Р С”Р В°Р В·Р Вµ */}
            <div className="glass-card rounded-2xl p-4">
              <div className="text-sm font-medium text-foreground mb-3">Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ Р Р† Р В·Р В°Р С”Р В°Р В·Р Вµ:</div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.price} Р С”Р С•Р С‘Р Р…Р С•Р Р† x {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.price * item.quantity} Р С”Р С•Р С‘Р Р…Р С•Р Р†
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р Вµ */}
            <div className="glass-card rounded-2xl p-4">
              <div className="text-sm font-medium text-foreground mb-2">
                Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”: {order.customerName || 'Р СњР ВµР С‘Р В·Р Р†Р ВµРЎРѓРЎвЂљР ВµР Р…'}
              </div>
              <div className="text-xs text-muted-foreground">
                Р С™Р С•Р СР В°Р Р…Р Т‘Р В°: {order.customerTeam || 'Р СњР Вµ РЎС“Р С”Р В°Р В·Р В°Р Р…Р В°'}
              </div>
            </div>

            {/* Р В¤Р С•РЎР‚Р СРЎвЂ№ Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ/Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ */}
            {showApprovalForm && (
              <div className="glass-card rounded-2xl p-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С•РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘РЎРЏ *
                </div>
                <textarea
                  value={trackingInfo}
                  onChange={(e) => setTrackingInfo(e.target.value)}
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ РЎвЂљРЎР‚Р ВµР С”-Р Р…Р С•Р СР ВµРЎР‚, РЎРѓРЎРѓРЎвЂ№Р В»Р С”РЎС“ Р Р…Р В° РЎРѓР ВµРЎР‚РЎвЂљР С‘РЎвЂћР С‘Р С”Р В°РЎвЂљ Р С‘Р В»Р С‘ Р Т‘РЎР‚РЎС“Р С–РЎС“РЎР‹ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎР‹ Р Т‘Р В»РЎРЏ Р С•РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘РЎРЏ..."
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowApprovalForm(false)}
                    className="flex-1"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </Button>
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    Р С›Р Т‘Р С•Р В±РЎР‚Р С‘РЎвЂљРЎРЉ
                  </Button>
                </div>
              </div>
            )}

            {showRejectionForm && (
              <div className="glass-card rounded-2xl p-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ *
                </div>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎС“ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р С”Р В°Р В·Р В°..."
                  className="w-full p-3 bg-input-background border border-border rounded-2xl text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectionForm(false)}
                    className="flex-1"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </Button>
                  <Button
                    onClick={handleReject}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
                  </Button>
                </div>
              </div>
            )}

            {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘Р в„– */}
            {!showApprovalForm && !showRejectionForm && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRejectionForm(true)}
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
                </Button>
                <Button
                  onClick={() => setShowApprovalForm(true)}
                  className="flex-1 bg-primary text-primary-foreground"
                >
                  Р С›Р Т‘Р С•Р В±РЎР‚Р С‘РЎвЂљРЎРЉ
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
  // Р вЂ”Р В°Р С”Р В°Р В·РЎвЂ№ РЎвЂљР ВµР С—Р ВµРЎР‚РЎРЉ РЎС“Р С—РЎР‚Р В°Р Р†Р В»РЎРЏРЎР‹РЎвЂљРЎРѓРЎРЏ РЎвЂЎР ВµРЎР‚Р ВµР В· Р С–Р В»Р С•Р В±Р В°Р В»РЎРЉР Р…Р С•Р Вµ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ

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
    console.log(`Р вЂ”Р В°Р С”Р В°Р В· ${orderId} Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р… Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р С•Р С РЎРѓ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘Р ВµР в„– Р Т‘Р В»РЎРЏ Р С•РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘РЎРЏ: ${trackingInfo}`);
  };

  const handleRejectOrder = (orderId: string, reason: string) => {
    const rejectedOrder = orders.find(order => order.id === orderId);
    
    // Р вЂ™Р С•Р В·Р Р†РЎР‚Р В°РЎвЂ°Р В°Р ВµР С Р Т‘Р ВµР Р…РЎРЉР С–Р С‘ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎР‹ Р С—РЎР‚РїС—Р…РїС—Р… Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘Р С‘ Р В·Р В°Р С”Р В°Р В·Р В°
    if (rejectedOrder && onUpdateUserBalance) {
      onUpdateUserBalance(rejectedOrder.userId, rejectedOrder.total);
      console.log(`Р вЂ™Р С•Р В·Р Р†РЎР‚Р В°РЎвЂ°Р ВµР Р…Р С• ${rejectedOrder.total} Р С”Р С•Р С‘Р Р…Р С•Р Р† Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎР‹ ${rejectedOrder.userId} Р В·Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р Р…РЎвЂ№Р в„– Р В·Р В°Р С”Р В°Р В·`);
    }
    
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'rejected' as const, rejectionReason: reason }
        : order
    ));
    console.log(`Р вЂ”Р В°Р С”Р В°Р В· ${orderId} Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р… Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р С•Р С РЎРѓ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…Р С•Р в„–: ${reason}`);
  };

  const pendingOrdersList = orders.filter(order => order.status === 'pending');

  return (
    <div className="min-h-screen bg-background">
      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ РЎвЂ№ */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground/70" />
          </button>
          <h1 className="text-lg font-medium text-foreground">Р СљР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р†</h1>
        </div>
      </div>

      {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ */}
      <div className="px-6 space-y-4 pb-20">
        {pendingOrdersList.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-foreground font-medium mb-2">Р СњР ВµРЎвЂљ Р В·Р В°Р С”Р В°Р В·Р С•Р Р† Р Р…Р В° Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘</div>
            <div className="text-sm text-muted-foreground">
              Р вЂ™РЎРѓР Вµ Р В·Р В°Р С”Р В°Р В·РЎвЂ№ Р С•Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р Р…РЎвЂ№
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
                      Р вЂ”Р В°Р С”Р В°Р В· #{order.id}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.items.length} РЎвЂљР С•Р Р†Р В°РЎР‚(Р С•Р Р†) РІР‚Сћ {order.total} Р С”Р С•Р С‘Р Р…Р С•Р Р†
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.customerName || 'Р СњР ВµР С‘Р В·Р Р†Р ВµРЎРѓРЎвЂљР Р…РЎвЂ№Р в„– Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЉ'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRejectOrder(order.id, 'Р С›РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С• Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р С•Р С Р В±Р ВµР В· РЎС“Р С”Р В°Р В·Р В°Р Р…Р С‘РЎРЏ Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎвЂ№');
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-red-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApproveOrder(order.id, 'Р С›Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С• Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р С•Р С Р В±Р ВµР В· Р Т‘Р С•Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР ВµР В»РЎРЉР Р…Р С•Р в„– Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘Р С‘');
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

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„– Р В·Р В°Р С”Р В°Р В·Р В° */}
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
