import React, { useState, useRef } from 'react';
import { Paperclip, X, Send } from 'lucide-react';

interface ProblemReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { description: string; file?: File }) => void;
  theme: 'light' | 'dark';
}

export const ProblemReportModal: React.FC<ProblemReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme
}) => {
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Р В РЎвЂєР РЋРІР‚РЋР В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂќР В Р’В° Р РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР РЋРІР‚в„– Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ/Р В Р’В·Р В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ
  React.useEffect(() => {
    if (isOpen) {
      setDescription('');
      setSelectedFile(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР РЏР В Р’ВµР В РЎВ Р РЋР вЂљР В Р’В°Р В Р’В·Р В РЎВР В Р’ВµР РЋР вЂљ Р РЋРІР‚С›Р В Р’В°Р В РІвЂћвЂ“Р В Р’В»Р В Р’В° (Р В РЎВР В Р’В°Р В РЎвЂќР РЋР С“Р В РЎвЂР В РЎВР РЋРЎвЂњР В РЎВ 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Р В Р’В¤Р В Р’В°Р В РІвЂћвЂ“Р В Р’В» Р РЋР С“Р В Р’В»Р В РЎвЂР РЋРІвЂљВ¬Р В РЎвЂќР В РЎвЂўР В РЎВ Р В Р’В±Р В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋРІвЂљВ¬Р В РЎвЂўР В РІвЂћвЂ“. Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР вЂљР В Р’В°Р В Р’В·Р В РЎВР В Р’ВµР РЋР вЂљ: 10MB');
        return;
      }
      
      // Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР РЏР В Р’ВµР В РЎВ Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ” Р РЋРІР‚С›Р В Р’В°Р В РІвЂћвЂ“Р В Р’В»Р В Р’В° (Р РЋРІР‚С™Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В РЎвЂќР В РЎвЂў Р В РЎвЂР В Р’В·Р В РЎвЂўР В Р’В±Р РЋР вЂљР В Р’В°Р В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ Р В Р вЂ Р В РЎвЂР В РўвЂР В Р’ВµР В РЎвЂў)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        alert('Р В РЎСљР В Р’ВµР В РЎвЂ”Р В РЎвЂўР В РўвЂР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В¶Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВР РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ” Р РЋРІР‚С›Р В Р’В°Р В РІвЂћвЂ“Р В Р’В»Р В Р’В°. Р В Р’В Р В Р’В°Р В Р’В·Р РЋР вЂљР В Р’ВµР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р РЋРІР‚в„– Р РЋРІР‚С™Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В РЎвЂќР В РЎвЂў Р В РЎвЂР В Р’В·Р В РЎвЂўР В Р’В±Р РЋР вЂљР В Р’В°Р В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ Р В Р вЂ Р В РЎвЂР В РўвЂР В Р’ВµР В РЎвЂў.');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      alert('Р В РЎСџР В РЎвЂўР В Р’В¶Р В Р’В°Р В Р’В»Р РЋРЎвЂњР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р’В°, Р В РЎвЂўР В РЎвЂ”Р В РЎвЂР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВР РЋРЎвЂњ');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        description: description.trim(),
        file: selectedFile || undefined
      });
      
      // Р В РІР‚вЂќР В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎВР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р В РЎвЂўР В РЎвЂќР В Р вЂ¦Р В РЎвЂў Р В РЎвЂ”Р В РЎвЂўР РЋР С“Р В Р’В»Р В Р’Вµ Р РЋРЎвЂњР РЋР С“Р В РЎвЂ”Р В Р’ВµР РЋРІвЂљВ¬Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂќР В РЎвЂ
      onClose();
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’Вµ Р В РЎвЂўР РЋРІР‚С™Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™Р В Р’В°:', error);
      alert('Р В РЎСџР РЋР вЂљР В РЎвЂўР В РЎвЂР В Р’В·Р В РЎвЂўР РЋРІвЂљВ¬Р В Р’В»Р В Р’В° Р В РЎвЂўР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’Вµ Р В РЎвЂўР РЋРІР‚С™Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™Р В Р’В°. Р В РЎСџР В РЎвЂўР В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р РЋРЎвЂњР В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ Р В Р’ВµР РЋРІР‚В°Р В Р’Вµ Р РЋР вЂљР В Р’В°Р В Р’В·.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md mx-4 rounded-2xl p-6"
        style={{
          backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E6E9EF',
          boxShadow: theme === 'dark' 
            ? '0 20px 60px rgba(0, 0, 0, 0.8)' 
            : '0 20px 60px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            style={{
              fontSize: '18px',
              fontWeight: '500',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            Р В Р Р‹Р В РЎвЂўР В РЎвЂўР В Р’В±Р РЋРІР‚В°Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВР В Р’Вµ
          </h2>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description Input */}
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Р В РЎвЂєР В РЎвЂ”Р В РЎвЂР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВР РЋРЎвЂњ Р В РЎвЂ”Р В РЎвЂўР В РўвЂР РЋР вЂљР В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂў..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#F3F5F8',
                borderColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : '#E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '12px'
              }}
            />
          </div>

          {/* File Attachment Section */}
          <div>
            <label 
              className="block mb-2"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂќР РЋР вЂљР В Р’ВµР В РЎвЂ”Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋРІР‚С›Р В Р’В°Р В РІвЂћвЂ“Р В Р’В» (Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚В Р В РЎвЂР В РЎвЂўР В Р вЂ¦Р В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂў)
            </label>
            
            {selectedFile ? (
              /* Selected File Display */
              <div 
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#161A22' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : '1px solid #E6E9EF'
                }}
              >
                <div className="flex-1 min-w-0">
                  <p 
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      marginBottom: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {selectedFile.name}
                  </p>
                  <p 
                    style={{
                      fontSize: '10px',
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <X style={{ width: '12px', height: '12px' }} />
                </button>
              </div>
            ) : (
              /* File Selection Button */
              <div className="flex items-center gap-3">
                <div 
                  className="flex-1 px-4 py-3 rounded-xl border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F3F5F8',
                    borderColor: theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : '#E6E9EF',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '12px'
                  }}
                >
                  Р В Р’В¤Р В Р’В°Р В РІвЂћвЂ“Р В Р’В» Р В Р вЂ¦Р В Р’Вµ Р В Р вЂ Р РЋРІР‚в„–Р В Р’В±Р РЋР вЂљР В Р’В°Р В Р вЂ¦
                </div>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: '#2B82FF',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  <Paperclip style={{ width: '14px', height: '14px' }} />
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰
            </button>
            
            <button
              type="submit"
              disabled={!description.trim() || isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{
                backgroundColor: description.trim() ? '#2B82FF' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                color: description.trim() ? '#FFFFFF' : (theme === 'dark' ? '#A7B0BD' : '#6B7280'),
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              <Send style={{ width: '14px', height: '14px' }} />
              {isSubmitting ? 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂќР В Р’В°...' : 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
