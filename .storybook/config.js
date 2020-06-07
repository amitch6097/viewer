
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { create } from '@storybook/theming';

const theme = create({
    base: 'light',
  });

  // Customize the UI a bit
addParameters({
    options: {
      theme,
      panelPosition: 'bottom',
    },
    docs: {
      container: DocsContainer,
      page: DocsPage
    }
  });


  
  // Add all our decorators
addDecorator(withKnobs);
addDecorator(themeDecorator);


// // automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /.stories.(tsx|mdx)$/);

function loadStories() {
    req.keys().forEach(req);
}
  
  configure(loadStories, module);