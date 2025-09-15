        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РІС‹Р±РѕСЂР° СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
        <Dialog open={employeeSelectModalOpen} onOpenChange={setEmployeeSelectModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РІС‹Р±РѕСЂР° СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РґР»СЏ РЅР°Р·РЅР°С‡РµРЅРёСЏ Р·Р°РґР°С‡Рё
            </DialogDescription>
            <div className="p-6">
              {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєСЂРµСЃС‚РёРєРѕРј */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Menu className="w-5 h-5 text-foreground/70" />
                  <h3 className="text-lg font-medium text-foreground">РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ</h3>
                </div>
                <button
                  onClick={() => setEmployeeSelectModalOpen(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
              <div className="space-y-3 max-h-[calc(80vh-200px)] overflow-y-auto">
                {employees.map((employee) => (
                  <div 
                    key={employee.id} 
                    className="flex items-center justify-between p-3 border border-border/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.team}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEmployeeToggle(employee.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isEmployeeSelected(employee.id) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-accent'
                      }`}
                    >
                      {isEmployeeSelected(employee.id) ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4 text-foreground/70" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setEmployeeSelectModalOpen(false)}
                className="w-full mt-6 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Р“РѕС‚РѕРІРѕ ({formData.assignedTo.length} РІС‹Р±СЂР°РЅРѕ)
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕС‚РєР»РѕРЅРµРЅРёСЏ Р·Р°РґР°С‡Рё */}
        <Dialog open={rejectionModalOpen} onOpenChange={setRejectionModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РІРІРѕРґР° РїСЂРёС‡РёРЅС‹ РѕС‚РєР»РѕРЅРµРЅРёСЏ Р·Р°РґР°С‡Рё
            </DialogDescription>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РЈРєР°Р¶РёС‚Рµ, С‡С‚Рѕ РЅСѓР¶РЅРѕ РёСЃРїСЂР°РІРёС‚СЊ:
                  </label>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="РћРїРёС€РёС‚Рµ С‡С‚Рѕ РЅСѓР¶РЅРѕ РґРѕСЂР°Р±РѕС‚Р°С‚СЊ РІ Р·Р°РґР°С‡Рµ..."
                    className="bg-input-background min-h-24 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setRejectionModalOpen(false);
                      setRejectionReason('');
                    }}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    onClick={handleConfirmRejection}
                    disabled={!rejectionReason.trim()}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-full text-sm font-medium transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    РћС‚РєР»РѕРЅРёС‚СЊ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
