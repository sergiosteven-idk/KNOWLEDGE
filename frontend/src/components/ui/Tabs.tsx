import React, { useState } from 'react';

/**
 * Accessible Tabs Component
 * WCAG 2.1 AA compliant
 */
interface Tab {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex((t) => t.id === tabId);
    let newIndex = currentIndex;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    }

    if (newIndex !== currentIndex) {
      setActiveTab(tabs[newIndex].id);
    }
  };

  return (
    <div className="w-full">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="Pestañas de contenido"
        className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            className={`px-4 py-3 font-medium transition-all duration-200 flex items-center gap-2
              ${
                activeTab === tab.id
                  ? 'text-knowledge-purple border-b-2 border-knowledge-purple'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          className={`py-6 ${activeTab === tab.id ? 'block animate-fade-in' : 'hidden'}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
