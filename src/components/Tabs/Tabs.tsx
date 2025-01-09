import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => (
  <div>
    <ul>
      {tabs.map((tab, index) => (
        <li
          key={index}
          style={{
            cursor: 'pointer',
            fontWeight: activeTab === index ? 'bold' : 'normal',
          }}
          onClick={() => onTabClick(index)}
        >
          {tab}
        </li>
      ))}
    </ul>
  </div>
);
