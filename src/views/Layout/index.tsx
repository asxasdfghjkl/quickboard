import { Container } from '@mui/material';
import * as React from 'react';
import CategorySnippetGrid from './CategorySnippetGrid';
import CateogryTabs from './CategoryTabs';

declare interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = ({}) => {
  const [currentCategory, setCurrentCategory] = React.useState<string>();
  return (
    <>
      <CateogryTabs
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
      />
      <Container>
        <CategorySnippetGrid currentCategory={currentCategory!} />
      </Container>
    </>
  );
};

export default Layout;
