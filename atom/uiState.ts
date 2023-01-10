import { atom } from 'recoil';

export const uiStateAtom = atom<{ theme: 'light' | 'dark' }>({
  key: 'uiStateAtom',
  default: {
    theme: 'light',
  },
});
