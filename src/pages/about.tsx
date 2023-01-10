import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { ComponentType } from 'react';
import { MdEmail } from 'react-icons/md';
import { AiOutlineLink, AiFillInstagram, AiFillGithub } from 'react-icons/ai';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';

const AboutPage: ComponentType<PageProps> = () => {
  return (
    <Layout>
      <div className={'flex w-full flex-col gap-y-8'}>
        <div className={'flex w-full flex-col gap-x-4 md:flex-row'}>
          {/* <StaticImage
            src={`../images/profile.JPG`}
            alt={'프로필 이미지'}
            width={300}
            height={300}
            style={{ objectFit: 'cover', objectPosition: '10% 10%' }}
            className={'hidden rounded-full shadow-lg md:block'}
          /> */}
          <div
            // className={
            // 'flex flex-1 flex-col gap-y-4 md:items-end md:justify-end'
            // }
            className="flex flex-col flex-1 pb-8 border-b gap-y-4"
          >
            <div>
              <h1 className={'text-3xl font-bold'}>전지훈</h1>
              <h1
                className={
                  'text-lg font-bold text-slate-600 dark:text-slate-400'
                }
              >
                Sowoon
              </h1>
            </div>
            <h1 className={'text-xl font-bold'}>Frontend Developer</h1>
            <h1 className={'text-xl font-bold'}>편하고 쉽게</h1>
          </div>
        </div>

        <div className={'flex flex-col gap-y-4 border-b pb-8'}>
          <h2 className={'text-lg'}>편하고 쉬운것을 추구하는 개발자입니다.</h2>
          <a
            href="https://pitch-age-142.notion.site/Sowoon-216c8d29765d416683ce11b354f1edc7"
            target="_blank"
          >
            <span className={`flex items-center gap-x-2`}>
              <AiOutlineLink />
              <span>Profile</span>
            </span>
          </a>
        </div>

        <div className={'flex flex-col gap-y-4 border-b pb-8'}>
          <span className={'font-extrabold'}>Now</span>
          <span>제로투원파트너스 Developer</span>
        </div>

        <div className={'flex flex-col gap-y-4'}>
          <span className={'font-extrabold'}>Contact</span>
          <div className={'flex items-center gap-x-2'}>
            <MdEmail className={'text-2xl'} />
            <span>sowoon1221@gmail.com</span>
          </div>
          <a href={`https://github.com/so-woon-1221`} target={'_blank'}>
            <div className={'flex items-center gap-x-2'}>
              <AiFillGithub className={'text-2xl'} />
              <span>so-woon-1221</span>
            </div>
          </a>
          <a href={`https://instagram.com/sowoon_1221`} target={'_blank'}>
            <div className={'flex items-center gap-x-2'}>
              <AiFillInstagram className={'text-2xl'} />
              <span>sowoon_1221</span>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About</title>;
