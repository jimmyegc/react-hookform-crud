import React, { useState } from 'react';

export const useTabs = (initialTab: number = 0) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const selectTab = (index: number) => {
    setActiveTab(index);
  };

  return { activeTab, selectTab };
};
