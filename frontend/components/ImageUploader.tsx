п»їimport React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultEmoji?: string;
  className?: string;
  acceptEmojiOnly?: boolean;
}

export function ImageUploader({ 
  value, 
  onChange, 
  placeholder = 'Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В»Р С‘ Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С‘РЎвЂљР Вµ РЎвЂћР В°Р в„–Р В»',
  defaultEmoji = 'СЂСџвЂњВ·',
  className = '',
  acceptEmojiOnly = false
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘, РЎРЏР Р†Р В»РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р В»Р С‘ РЎРѓРЎвЂљРЎР‚Р С•Р С”Р В° URL Р С‘Р В»Р С‘ base64
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С”Р С•Р Р…Р Р†Р ВµРЎР‚РЎвЂљР В°РЎвЂ Р С‘Р С‘ РЎвЂћР В°Р в„–Р В»Р В° Р Р† base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р В° Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С”Р С‘ РЎвЂћР В°Р в„–Р В»Р В°
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЏР ВµР С РЎвЂљР С‘Р С— РЎвЂћР В°Р в„–Р В»Р В°
      if (!file.type.startsWith('image/')) {
        alert('Р СџР С•Р В¶Р В°Р В»РЎС“Р в„–РЎРѓРЎвЂљР В°, Р Р†РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ РЎвЂћР В°Р в„–Р В» Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ');
        return;
      }
      
      // Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЏР ВµР С РЎР‚Р В°Р В·Р СР ВµРЎР‚ РЎвЂћР В°Р в„–Р В»Р В° (Р СР В°Р С”РЎРѓР С‘Р СРЎС“Р С 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Р В Р В°Р В·Р СР ВµРЎР‚ РЎвЂћР В°Р в„–Р В»Р В° Р Р…Р Вµ Р Т‘Р С•Р В»Р В¶Р ВµР Р… Р С—РЎР‚Р ВµР Р†РЎвЂ№РЎв‚¬Р В°РЎвЂљРЎРЉ 5MB');
        return;
      }

      try {
        const base64 = await convertFileToBase64(file);
        onChange(base64);
      } catch (error) {
        console.error('Р С›РЎв‚¬Р С‘Р В±Р С”Р В° Р С—РЎР‚Р С‘ Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С”Р Вµ РЎвЂћР В°Р в„–Р В»Р В°:', error);
        alert('Р С›РЎв‚¬Р С‘Р В±Р С”Р В° Р С—РЎР‚Р С‘ Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С”Р Вµ РЎвЂћР В°Р в„–Р В»Р В°');
      }
    }
  };

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С•РЎвЂЎР С‘РЎРѓРЎвЂљР С”Р С‘ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
  const clearImage = () => {
    onChange(defaultEmoji);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Р С™Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В»Р С‘ РЎРЊР СР С•Р Т‘Р В·Р С‘
  const ImageDisplay = ({ src, className = '', style = {} }: { src: string; className?: string; style?: React.CSSProperties }) => {
    if (isImageUrl(src)) {
      return (
        <ImageWithFallback
          src={src}
          alt="Uploaded image"
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

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С—Р С•РЎРѓР С•Р В±Р В° Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ */}
      {!acceptEmojiOnly && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Р вЂ”Р В°Р С–РЎР‚РЎС“Р В·Р С‘РЎвЂљРЎРЉ РЎвЂћР В°Р в„–Р В»
          </button>
          <button
            type="button"
            onClick={() => {
              const emoji = prompt('Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ РЎРЊР СР С•Р Т‘Р В·Р С‘:', defaultEmoji);
              if (emoji) {
                onChange(emoji);
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface-2 text-foreground border border-border rounded-lg hover:bg-surface-3 transition-colors"
          >
            <span className="text-lg">СЂСџВР‚</span>
            Р В­Р СР С•Р Т‘Р В·Р С‘
          </button>
        </div>
      )}

      {/* Р РЋР С”РЎР‚РЎвЂ№РЎвЂљРЎвЂ№Р в„– РЎвЂћР В°Р в„–Р В»Р С•Р Р†РЎвЂ№Р в„– Р С‘Р Р…Р С—РЎС“РЎвЂљ */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Р СџР С•Р В»Р Вµ Р Т‘Р В»РЎРЏ URL/РЎвЂљР ВµР С”РЎРѓРЎвЂљР В° */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
        placeholder={placeholder}
      />
      
      <div className="text-xs text-muted-foreground">
        {acceptEmojiOnly 
          ? 'Р ВРЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“Р в„–РЎвЂљР Вµ РЎРЊР СР С•Р Т‘Р В·Р С‘ Р С‘Р В»Р С‘ Р Р†Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ РЎвЂљР ВµР С”РЎРѓРЎвЂљ'
          : 'Р СљР С•Р В¶Р Р…Р С• Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С‘РЎвЂљРЎРЉ РЎвЂћР В°Р в„–Р В», Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ РЎРЊР СР С•Р Т‘Р В·Р С‘ Р С‘Р В»Р С‘ Р Р†РЎРѓРЎвЂљР В°Р Р†Р С‘РЎвЂљРЎРЉ URL/base64 Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ'
        }
      </div>

      {/* Р СџРЎР‚Р ВµР Т‘Р Р†Р В°РЎР‚Р С‘РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р в„– Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ */}
      {value && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚:</span>
          <div className="w-12 h-12 rounded border overflow-hidden relative bg-surface-2">
            <ImageDisplay
              src={value}
              className="w-full h-full"
            />
            {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р С•РЎвЂЎР С‘РЎРѓРЎвЂљР С”Р С‘ Р Т‘Р В»РЎРЏ Р В·Р В°Р С–РЎР‚РЎС“Р В¶Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р в„– */}
            {isImageUrl(value) && (
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          {isImageUrl(value) && (
            <div className="text-xs text-muted-foreground">
              {value.startsWith('data:') ? 'Р вЂ”Р В°Р С–РЎР‚РЎС“Р В¶Р ВµР Р…Р Р…РЎвЂ№Р в„– РЎвЂћР В°Р в„–Р В»' : 'URL Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
