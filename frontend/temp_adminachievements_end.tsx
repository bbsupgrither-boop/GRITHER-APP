/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РЅР°РіСЂР°РґС‹ */
      <Dialog open={rewardModalOpen} onOpenChange={setRewardModalOpen}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">РќР°СЃС‚СЂРѕР№РєР° РЅР°РіСЂР°РґС‹</DialogTitle>
          <DialogDescription className="sr-only">
            РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё С‚РёРїР° Рё СЂР°Р·РјРµСЂР° РЅР°РіСЂР°РґС‹ Р·Р° РґРѕСЃС‚РёР¶РµРЅРёРµ
          </DialogDescription>
          <div className="p-6 pt-2">
            <div className="space-y-6">
              {/* РўРёРї РЅР°РіСЂР°РґС‹ */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground text-center">
                  РўРёРї РЅР°РіСЂР°РґС‹
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRewardType('XP')}
                    className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${ 
                      rewardType === 'XP' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'glass-card text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    XP
                  </button>
                  <button
                    onClick={() => setRewardType('G-coin')}
                    className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${
                      rewardType === 'G-coin'
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-card text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    G-coin
                  </button>
                </div>
              </div>

              {/* РљРѕР»РёС‡РµСЃС‚РІРѕ */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground text-center">
                  РљРѕР»РёС‡РµСЃС‚РІРѕ
                </div>
                <div className="glass-card rounded-lg p-3">
                  {isEditingAmount ? (
                    <Input
                      type="number"
                      value={rewardAmount}
                      onChange={(e) => setRewardAmount(e.target.value)}
                      onBlur={() => setIsEditingAmount(false)}
                      className="bg-transparent border-none text-center text-lg font-medium p-0 focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => setIsEditingAmount(true)}
                      className="w-full text-lg font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded p-2 transition-colors"
                    >
                      {rewardAmount}
                    </button>
                  )}
                </div>
              </div>

              {/* РљРЅРѕРїРєРё */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setRewardModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                >
                  РћС‚РјРµРЅРёС‚СЊ
                </button>
                <button
                  onClick={handleRewardSave}
                  className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                >
                  РЎРѕС…СЂР°РЅРёС‚СЊ
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕС‚РєР»РѕРЅРµРЅРёСЏ */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
          <DialogTitle className="text-lg font-medium text-foreground text-center">РћС‚РєР»РѕРЅРёС‚СЊ РґРѕСЃС‚РёР¶РµРЅРёРµ</DialogTitle>
          <DialogDescription className="sr-only">
            РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РѕС‚РєР»РѕРЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ СЃ СѓРєР°Р·Р°РЅРёРµРј РїСЂРёС‡РёРЅС‹ Рё РєРѕРјРјРµРЅС‚Р°СЂРёСЏ
          </DialogDescription>
          <div className="p-6 pt-2">
            <div className="space-y-6">
              {/* РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">
                  РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ *
                </div>
                <Input
                  placeholder="РЈРєР°Р¶РёС‚Рµ РїСЂРёС‡РёРЅСѓ РѕС‚РєР»РѕРЅРµРЅРёСЏ"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="bg-transparent border border-border rounded-lg"
                />
              </div>

              {/* РљРѕРјРјРµРЅС‚Р°СЂРёР№ */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">
                  РљРѕРјРјРµРЅС‚Р°СЂРёР№ (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)
                </div>
                <Textarea
                  placeholder="Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РєРѕРјРјРµРЅС‚Р°СЂРёРё..."
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  className="bg-transparent border border-border rounded-lg resize-none min-h-20"
                />
              </div>

              {/* Р¤Р°Р№Р» */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">
                  РџСЂРёРєСЂРµРїРёС‚СЊ С„Р°Р№Р» (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)
                </div>
                <div className="glass-card rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="reject-file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="reject-file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Paperclip className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {rejectFile ? rejectFile.name : 'Р’С‹Р±СЂР°С‚СЊ С„Р°Р№Р»'}
                    </span>
                  </label>
                </div>
              </div>

              {/* РљРЅРѕРїРєРё */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setRejectModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                >
                  РћС‚РјРµРЅРёС‚СЊ
                </button>
                <button
                  onClick={handleSubmitReject}
                  className="flex-1 py-3 px-4 bg-destructive text-destructive-foreground rounded-full text-sm font-medium transition-colors hover:bg-destructive/90"
                >
                  РћС‚РєР»РѕРЅРёС‚СЊ
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
