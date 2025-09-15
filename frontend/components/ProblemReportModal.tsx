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

  // РћС‡РёСЃС‚РєР° С„РѕСЂРјС‹ РїСЂРё РѕС‚РєСЂС‹С‚РёРё/Р·Р°РєСЂС‹С‚РёРё
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
      // РџСЂРѕРІРµСЂСЏРµРј СЂР°Р·РјРµСЂ С„Р°Р№Р»Р° (РјР°РєСЃРёРјСѓРј 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Р¤Р°Р№Р» СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№. РњР°РєСЃРёРјР°Р»СЊРЅС‹Р№ СЂР°Р·РјРµСЂ: 10MB');
        return;
      }
      
      // РџСЂРѕРІРµСЂСЏРµРј С‚РёРї С„Р°Р№Р»Р° (С‚РѕР»СЊРєРѕ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ Рё РІРёРґРµРѕ)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        alert('РќРµРїРѕРґРґРµСЂР¶РёРІР°РµРјС‹Р№ С‚РёРї С„Р°Р№Р»Р°. Р Р°Р·СЂРµС€РµРЅС‹ С‚РѕР»СЊРєРѕ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ Рё РІРёРґРµРѕ.');
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
      alert('РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕРїРёС€РёС‚Рµ РїСЂРѕР±Р»РµРјСѓ');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        description: description.trim(),
        file: selectedFile || undefined
      });
      
      // Р—Р°РєСЂС‹РІР°РµРј РјРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РїРѕСЃР»Рµ СѓСЃРїРµС€РЅРѕР№ РѕС‚РїСЂР°РІРєРё
      onClose();
    } catch (error) {
      console.error('РћС€РёР±РєР° РїСЂРё РѕС‚РїСЂР°РІРєРµ РѕС‚С‡РµС‚Р°:', error);
      alert('РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё РѕС‚РїСЂР°РІРєРµ РѕС‚С‡РµС‚Р°. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰Рµ СЂР°Р·.');
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
            РЎРѕРѕР±С‰РёС‚СЊ Рѕ РїСЂРѕР±Р»РµРјРµ
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
              placeholder="РћРїРёС€РёС‚Рµ РїСЂРѕР±Р»РµРјСѓ РїРѕРґСЂРѕР±РЅРѕ..."
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
              РџСЂРёРєСЂРµРїРёС‚СЊ С„Р°Р№Р» (РѕРїС†РёРѕРЅР°Р»СЊРЅРѕ)
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
                  Р¤Р°Р№Р» РЅРµ РІС‹Р±СЂР°РЅ
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
              РћС‚РјРµРЅРёС‚СЊ
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
              {isSubmitting ? 'РћС‚РїСЂР°РІРєР°...' : 'РћС‚РїСЂР°РІРёС‚СЊ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
