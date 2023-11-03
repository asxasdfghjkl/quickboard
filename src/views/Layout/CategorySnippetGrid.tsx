import * as React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Fab,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

declare interface CategorySnippetGridProps {
  currentCategory: string;
}

function saveCategory(category: string, snippets: string[]) {
  localStorage[`CATE_${category}`] = JSON.stringify(snippets);
}

const CategorySnippetGrid: React.FunctionComponent<
  CategorySnippetGridProps
> = ({ currentCategory }) => {
  const [snippets, setSnippets] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedValue = localStorage[`CATE_${currentCategory}`];
    if (!storedValue) return setSnippets([]);

    setSnippets(JSON.parse(storedValue));
  }, [currentCategory]);

  const handleReadClipboard = () => {
    navigator.clipboard.readText().then((text) => {
      if (text) {
        setSnippets((s) => {
          const newArray = [...s, text];
          saveCategory(currentCategory, newArray);
          return newArray;
        });
      }
    });
  };

  const handleSnippetClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const text = snippets[Number(evt.currentTarget.dataset.index)];
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleContextMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (confirm('確定要刪除這個項目嗎？')) {
      const { index } = evt.currentTarget.dataset;
      if (index) {
        setSnippets((snippets) => {
          const newArray = [...snippets];
          newArray.splice(parseInt(index, 10), 1);
          saveCategory(currentCategory, newArray);
          return newArray;
        });
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        {snippets.map((snippet, index) => {
          return (
            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea
                  data-index={index}
                  onClick={handleSnippetClick}
                  onContextMenu={handleContextMenu}
                >
                  <CardContent>{snippet}</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 4, right: 4 }}
        onClick={handleReadClipboard}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default CategorySnippetGrid;
