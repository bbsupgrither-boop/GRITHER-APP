п»ї        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
        <Dialog open={employeeSelectModalOpen} onOpenChange={setEmployeeSelectModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р†</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р Т‘Р В»РЎРЏ Р Р…Р В°Р В·Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘
            </DialogDescription>
            <div className="p-6">
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”РЎР‚Р ВµРЎРѓРЎвЂљР С‘Р С”Р С•Р С */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Menu className="w-5 h-5 text-foreground/70" />
                  <h3 className="text-lg font-medium text-foreground">Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р†</h3>
                </div>
                <button
                  onClick={() => setEmployeeSelectModalOpen(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
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
                Р вЂњР С•РЎвЂљР С•Р Р†Р С• ({formData.assignedTo.length} Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…Р С•)
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
        <Dialog open={rejectionModalOpen} onOpenChange={setRejectionModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р Р†Р Р†Р С•Р Т‘Р В° Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎвЂ№ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘
            </DialogDescription>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ, РЎвЂЎРЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• Р С‘РЎРѓР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ:
                  </label>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ РЎвЂЎРЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• Р Т‘Р С•РЎР‚Р В°Р В±Р С•РЎвЂљР В°РЎвЂљРЎРЉ Р Р† Р В·Р В°Р Т‘Р В°РЎвЂЎР Вµ..."
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
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={handleConfirmRejection}
                    disabled={!rejectionReason.trim()}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-full text-sm font-medium transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
