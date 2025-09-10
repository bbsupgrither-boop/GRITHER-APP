import React, { useRef } from 'react';
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
  placeholder = 'Р’РІРµРґРёС‚Рµ URL РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РёР»Рё Р·Р°РіСЂСѓР·РёС‚Рµ С„Р°Р№Р»',
  defaultEmoji = 'рџ“·',
  className = '',
  acceptEmojiOnly = false
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё, СЏРІР»СЏРµС‚СЃСЏ Р»Рё СЃС‚СЂРѕРєР° URL РёР»Рё base64
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РєРѕРЅРІРµСЂС‚Р°С†РёРё С„Р°Р№Р»Р° РІ base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // РћР±СЂР°Р±РѕС‚РєР° Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р°
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // РџСЂРѕРІРµСЂСЏРµРј С‚РёРї С„Р°Р№Р»Р°
      if (!file.type.startsWith('image/')) {
        alert('РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ С„Р°Р№Р» РёР·РѕР±СЂР°Р¶РµРЅРёСЏ');
        return;
      }
      
      // РџСЂРѕРІРµСЂСЏРµРј СЂР°Р·РјРµСЂ С„Р°Р№Р»Р° (РјР°РєСЃРёРјСѓРј 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Р Р°Р·РјРµСЂ С„Р°Р№Р»Р° РЅРµ РґРѕР»Р¶РµРЅ РїСЂРµРІС‹С€Р°С‚СЊ 5MB');
        return;
      }

      try {
        const base64 = await convertFileToBase64(file);
        onChange(base64);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ С„Р°Р№Р»Р°:', error);
        alert('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ С„Р°Р№Р»Р°');
      }
    }
  };

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РѕС‡РёСЃС‚РєРё РёР·РѕР±СЂР°Р¶РµРЅРёСЏ
  const clearImage = () => {
    onChange(defaultEmoji);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // РљРѕРјРїРѕРЅРµРЅС‚ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РёР»Рё СЌРјРѕРґР·Рё
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
      {/* РљРЅРѕРїРєРё РґР»СЏ РІС‹Р±РѕСЂР° СЃРїРѕСЃРѕР±Р° РґРѕР±Р°РІР»РµРЅРёСЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ */}
      {!acceptEmojiOnly && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Р—Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р»
          </button>
          <button
            type="button"
            onClick={() => {
              const emoji = prompt('Р’РІРµРґРёС‚Рµ СЌРјРѕРґР·Рё:', defaultEmoji);
              if (emoji) {
                onChange(emoji);
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface-2 text-foreground border border-border rounded-lg hover:bg-surface-3 transition-colors"
          >
            <span className="text-lg">рџЂ</span>
            Р­РјРѕРґР·Рё
          </button>
        </div>
      )}

      {/* РЎРєСЂС‹С‚С‹Р№ С„Р°Р№Р»РѕРІС‹Р№ РёРЅРїСѓС‚ */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* РџРѕР»Рµ РґР»СЏ URL/С‚РµРєСЃС‚Р° */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-input-background border border-border rounded-lg"
        placeholder={placeholder}
      />
      
      <div className="text-xs text-muted-foreground">
        {acceptEmojiOnly 
          ? 'РСЃРїРѕР»СЊР·СѓР№С‚Рµ СЌРјРѕРґР·Рё РёР»Рё РІРІРµРґРёС‚Рµ С‚РµРєСЃС‚'
          : 'РњРѕР¶РЅРѕ Р·Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р», РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ СЌРјРѕРґР·Рё РёР»Рё РІСЃС‚Р°РІРёС‚СЊ URL/base64 РёР·РѕР±СЂР°Р¶РµРЅРёСЏ'
        }
      </div>

      {/* РџСЂРµРґРІР°СЂРёС‚РµР»СЊРЅС‹Р№ РїСЂРѕСЃРјРѕС‚СЂ */}
      {value && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ:</span>
          <div className="w-12 h-12 rounded border overflow-hidden relative bg-surface-2">
            <ImageDisplay
              src={value}
              className="w-full h-full"
            />
            {/* РљРЅРѕРїРєР° РѕС‡РёСЃС‚РєРё РґР»СЏ Р·Р°РіСЂСѓР¶РµРЅРЅС‹С… РёР·РѕР±СЂР°Р¶РµРЅРёР№ */}
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
              {value.startsWith('data:') ? 'Р—Р°РіСЂСѓР¶РµРЅРЅС‹Р№ С„Р°Р№Р»' : 'URL РёР·РѕР±СЂР°Р¶РµРЅРёРµ'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
