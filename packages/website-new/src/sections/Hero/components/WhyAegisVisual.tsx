'use client';

import { WebGlMount } from '@/lib/visual-runtime';
import { WhyAegis } from '@/sections/Hero/visuals/WhyAegis';
import { theme } from '@/theme';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import NextImage from 'next/image';

const VisualContainer = styled.div`
  border-radius: ${theme.radius(1)};
  height: 462px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const BackgroundLayer = styled.div`
  inset: 0;
  position: absolute;
  z-index: 0;
`;

const ForegroundLayer = styled.div`
  inset: 0;
  position: absolute;
  z-index: 1;
`;

const backgroundImageClassName = css`
  object-fit: cover;
  object-position: center;
`;

export function WhyAegisVisual() {
  return (
    <VisualContainer>
      <BackgroundLayer>
        <NextImage
          alt="Why Aegis hero background"
          className={backgroundImageClassName}
          fill
          priority
          sizes="100vw"
          src="/images/why-aegis/hero/background.webp"
        />
      </BackgroundLayer>
      <ForegroundLayer>
        <WebGlMount priority>
          <WhyAegis />
        </WebGlMount>
      </ForegroundLayer>
    </VisualContainer>
  );
}
