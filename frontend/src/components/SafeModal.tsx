import React from 'react';

interface SafeModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const SafeModal: React.FC<SafeModalProps> = ({
  isOpen,
  onClose,
  children,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop open" onClick={onClose} />
      <div className={`modal ${className}`}>
        {children}
      </div>
    </>
  );
};
