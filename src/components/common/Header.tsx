import { Text } from '@mantine/core';
import colors from 'tailwindcss/colors';
import { AiOutlineUser } from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useLocalStorage, useWindowScroll } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { uiStateAtom } from '../../../atom/uiState';
import * as React from 'react';
import { Link } from 'gatsby';

const Header = () => {
  const [theme, setTheme] = useLocalStorage({
    key: 'theme',
    defaultValue: 'light',
  });

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const uiState = useRecoilValue(uiStateAtom);

  const [scroll, _] = useWindowScroll();
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    if (scroll.y > 20) {
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  }, [scroll]);

  return (
    <header className={'sticky top-0'}>
      <div
        className={`z-10 flex h-[75px] items-center border-b bg-white bg-opacity-50 px-2 backdrop-blur dark:bg-[#1A1B1E] dark:bg-opacity-80 dark:backdrop-blur md:p-0 ${
          showShadow
            ? 'border-[#e5e5e5]'
            : 'border-transparent dark:border-transparent'
        }`}
      >
        <div className={'mx-auto flex w-[768px] items-center py-3'}>
          <h1 className={'flex-1'}>
            <Link to={'/'}>
              <Text
                variant="gradient"
                gradient={
                  uiState.theme == 'light'
                    ? {
                        from: colors.teal[600],
                        to: colors.violet[600],
                        deg: 100,
                      }
                    : {
                        from: colors.teal[400],
                        to: colors.fuchsia[400],
                        deg: 100,
                      }
                }
                sx={{
                  fontSize: '2rem',
                  width: 'fit-content',
                }}
                fw={700}
              >
                Sowoon
              </Text>
            </Link>
          </h1>

          <div className={'flex items-center gap-x-2 border-l-2 pl-2'}>
            <Link to={'/about'}>
              <button
                className={
                  'rounded-xl border border-teal-500 bg-transparent p-1 active:scale-[0.95]'
                }
              >
                <AiOutlineUser
                  fill={
                    theme == 'light' ? colors.slate[600] : colors.slate[200]
                  }
                  className={'cursor-pointer text-2xl'}
                />
              </button>
            </Link>
            <button
              className={
                'rounded-xl border border-teal-500 bg-transparent p-1 active:scale-[0.95]'
              }
              onClick={toggleTheme}
            >
              {theme == 'light' ? (
                <BiSun
                  fill={
                    theme == 'light' ? colors.slate[600] : colors.slate[200]
                  }
                  className={'cursor-pointer text-2xl'}
                />
              ) : (
                <BiMoon
                  fill={
                    theme == 'light' ? colors.slate[600] : colors.slate[200]
                  }
                  className={'cursor-pointer text-2xl'}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
