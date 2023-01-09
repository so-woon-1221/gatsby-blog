import {
  AiFillCopyrightCircle,
  AiFillGithub,
  AiFillInstagram,
} from 'react-icons/ai';
import * as React from 'react';

const Footer = () => {
  return (
    <div className={'h-[60px] border-t py-4'}>
      <div className={'mx-auto flex max-w-[768px] flex-row gap-y-2 px-4'}>
        <span className={'flex flex-1 items-center gap-x-2'}>
          <AiFillCopyrightCircle />
          sowoon
        </span>
        <div className={'flex items-center gap-x-2'}>
          <a href={`https://github.com/so-woon-1221`} target={'_blank'}>
            <AiFillGithub />
          </a>
          <a href={`https://instagram.com/sowoon_1221`} target={'_blank'}>
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
