import React, { ComponentType, ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { uiStateAtom } from '../../../atom/uiState';
import { useLocalStorage } from '@mantine/hooks';

interface Props {
  children: (args: { theme: 'dark' | 'light' }) => ReactNode;
}

const RecoilComponent: ComponentType<Props> = ({ children }) => {
  const [uiState, setUiState] = useRecoilState(uiStateAtom);
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>({ key: 'theme' });

  useEffect(() => {
    setUiState((prev) => {
      return {
        ...prev,
        theme: theme,
      };
    });
  }, [setUiState, theme]);

  useEffect(() => {
    if (uiState.theme == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [uiState.theme]);

  return <>{children({ theme: uiState.theme })}</>;
};

export default RecoilComponent;
