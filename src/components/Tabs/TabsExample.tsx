import React from 'react'
import { useTabs } from './useTabs';
import { Tabs } from './Tabs';

export const TabsExample = () => {
  const { activeTab, selectTab } = useTabs(0);
  const tabs = ['Home', 'Profile', 'Settings'];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={selectTab} />
      <div>
        {activeTab === 0 && <p>Welcome to Home</p>}
        {activeTab === 1 && <p>Profile details here</p>}
        {activeTab === 2 && <p>Settings options here</p>}
      </div>
    </div>
  );
}
