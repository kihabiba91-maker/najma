
import React from 'react';

export enum ImageStyle {
  NONE = 'None',
  CARTOON = 'Cartoon',
  REALISTIC = 'Realistic',
  PIXAR = '3D Pixar',
  DRAWING = 'Drawing',
}

export enum AspectRatio {
  NONE = 'Original',
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum NumberOfImages {
  ONE = 1,
  TWO = 2,
  FOUR = 4,
}

export enum ImageFormat {
  JPG = 'image/jpeg',
  PNG = 'image/png',
}

export enum VideoResolution {
  HD_720P = '720p',
  HD_1080P = '1080p',
}

export enum VideoDuration {
  FIVE_SECONDS = 5,
  TEN_SECONDS = 10,
}

export enum VideoAspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum VoiceType {
  MAN = 'رجل',
  WOMAN = 'امرأة',
  CHILD = 'طفل',
  ROBOT = 'روبوت',
  // Added CUSTOM for voice cloning
  CUSTOM = 'مخصص',
}

export enum VoiceEmotion {
  HAPPY = 'سعيد',
  SAD = 'حزين',
  ANGRY = 'غاضب',
  EXCITED = 'متحمس',
  NARRATOR = 'روائي',
  SUSPENSE = 'تشويقي',
}

export enum ArabicDialect {
    STANDARD = 'العربية الفصحى',
    SYRIAN = 'السورية',
    EGYPTIAN = 'المصرية',
    SAUDI = 'السعودية',
}

export interface Option<T> {
  label: string;
  value: T;
  imageUrl?: string;
  visual?: React.ReactNode;
}

export interface SavedImage {
    id: string;
    userEmail: string;
    imageUrl: string;
    prompt: string;
    negativePrompt?: string;
    style: ImageStyle;
    aspectRatio: AspectRatio;
    createdAt: string;
}

export type AppView = 'menu' | 'generator' | 'object_remover' | 'enhancer' | 'text_to_speech';
