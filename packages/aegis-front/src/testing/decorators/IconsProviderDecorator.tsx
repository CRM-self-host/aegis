import { type Decorator } from '@storybook/react-vite';
import { IconsProvider } from 'aegis-ui/display';

export const IconsProviderDecorator: Decorator = (Story) => {
  return (
    <IconsProvider>
      <Story />
    </IconsProvider>
  );
};
