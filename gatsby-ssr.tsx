import React from 'react';
import { RecoilRoot } from 'recoil';
import RecoilComponent from './src/components/hoc/RecoilComponent';
import { MantineProvider } from '@mantine/core';
import colors from 'tailwindcss/colors';

export const wrapPageElement = ({ element }) => {
  return (
    <RecoilRoot>
      <RecoilComponent>
        {({ theme }) => (
          <MantineProvider
            withNormalizeCSS
            withGlobalStyles
            theme={{
              colorScheme: theme,
              colors: {
                primary: [
                  colors.teal[50],
                  colors.teal[100],
                  colors.teal[200],
                  colors.teal[300],
                  colors.teal[400],
                  colors.teal[500],
                  colors.teal[600],
                  colors.teal[700],
                  colors.teal[800],
                  colors.teal[900],
                ],
              },
              primaryColor: 'primary',
              // primaryShade: theme == 'light' ? 6 : 4,
            }}
          >
            {element}
          </MantineProvider>
        )}
      </RecoilComponent>
    </RecoilRoot>
  );
};
