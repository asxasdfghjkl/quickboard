import { Add as AddIcon } from '@mui/icons-material';
import { AppBar, IconButton, Tab, Tabs, Toolbar } from '@mui/material';
import * as React from 'react';

declare interface CateogryTabsProps {
  currentCategory?: string;
  onCategoryChange: (category: string) => void;
}

const CateogryTabs: React.FunctionComponent<CateogryTabsProps> = ({
  currentCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = React.useState(() => {
    const allCates: string[] = [];

    for (const key in localStorage) {
      if (key.startsWith('CATE_')) {
        allCates.push(key.substring(5));
      }
    }

    if (allCates.length === 0) {
      allCates.push('Main');
    }

    setTimeout(() => onCategoryChange(allCates[0]), 0);
    return allCates;
  });

  const handleAddCategory = () => {
    const input = prompt('請輸入新的分類名稱：');
    if (input) {
      setCategories((c) => [...c, input]);
    }
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar variant="dense">
        <Tabs
          style={{ flexGrow: 1 }}
          value={currentCategory || categories[0]}
          onChange={(_, tab) => onCategoryChange?.(tab)}
        >
          {categories.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
        <IconButton onClick={handleAddCategory}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CateogryTabs;
