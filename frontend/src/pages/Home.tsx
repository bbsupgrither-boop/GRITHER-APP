// src/pages/Home.tsx
import React from "react";
import { HomePage } from "../../components/HomePage";
import { BackgroundFX } from "../../components/BackgroundFX";
import { useTheme } from "../../hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <>
      <BackgroundFX theme={theme} />
      <HomePage 
        onNavigate={() => {}}
        currentPage="home"
        onOpenSettings={() => {}}
        achievements={[]}
        theme={theme}
        notifications={[]}
        onMarkNotificationAsRead={() => {}}
        onMarkAllNotificationsAsRead={() => {}}
        onRemoveNotification={() => {}}
        onClearAllNotifications={() => {}}
        battles={[]}
        battleInvitations={[]}
        users={[]}
        leaderboard={[]}
        currentUser={undefined}
        onCreateBattle={() => {}}
        onAcceptBattleInvitation={() => {}}
        onDeclineBattleInvitation={() => {}}
      />
    </>
  );
}
