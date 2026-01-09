
import React from 'react';
import { ImageStyle, AspectRatio, Option, NumberOfImages, ImageFormat, VideoResolution, VideoDuration, VideoAspectRatio, VoiceType, VoiceEmotion, ArabicDialect } from './types';

export const STYLE_OPTIONS: Option<ImageStyle>[] = [
  { label: 'النمط الأصلي', value: ImageStyle.NONE },
  { label: 'كرتوني', value: ImageStyle.CARTOON, imageUrl: 'https://storage.googleapis.com/pai-images/2569b360724d4376ac898655e821160a.jpeg' },
  { label: 'واقعي', value: ImageStyle.REALISTIC, imageUrl: 'https://storage.googleapis.com/pai-images/916723232c4443a6c5049526786a3b2b.jpeg' },
  { label: 'ثري دي بيكسار', value: ImageStyle.PIXAR, imageUrl: 'https://storage.googleapis.com/pai-images/9f195d52927e5a08e612347209930983.jpeg' },
  { label: 'رسم', value: ImageStyle.DRAWING, imageUrl: 'https://storage.googleapis.com/pai-images/029c0f916e78077c44d1a3c613143c7b.jpeg' },
];

export const ASPECT_RATIO_OPTIONS: Option<AspectRatio>[] = [
  { label: 'المقاس الأصلي', value: AspectRatio.NONE },
  { label: 'مربع', value: AspectRatio.SQUARE },
  { label: 'A4 عرضي', value: AspectRatio.LANDSCAPE },
  { label: 'A4 طولي', value: AspectRatio.PORTRAIT },
];

export const NUMBER_OF_IMAGES_OPTIONS: Option<NumberOfImages>[] = [
  { label: '1', value: NumberOfImages.ONE },
  { label: '2', value: NumberOfImages.TWO },
  { label: '4', value: NumberOfImages.FOUR },
];

export const IMAGE_FORMAT_OPTIONS: Option<ImageFormat>[] = [
  { label: 'JPG', value: ImageFormat.JPG },
  { label: 'PNG', value: ImageFormat.PNG },
];

export const VOICE_TYPE_OPTIONS: Option<VoiceType>[] = [
    { label: 'صوت رجل', value: VoiceType.MAN },
    { label: 'صوت امرأة', value: VoiceType.WOMAN },
    { label: 'صوت طفل', value: VoiceType.CHILD },
    { label: 'روبوت', value: VoiceType.ROBOT },
];

export const VOICE_EMOTION_OPTIONS: Option<VoiceEmotion>[] = [
    { label: 'سعيد', value: VoiceEmotion.HAPPY },
    { label: 'حزين', value: VoiceEmotion.SAD },
    { label: 'غاضب', value: VoiceEmotion.ANGRY },
    { label: 'متحمس', value: VoiceEmotion.EXCITED },
    { label: 'روائي سينمائي', value: VoiceEmotion.NARRATOR },
    { label: 'تشويقي', value: VoiceEmotion.SUSPENSE },
];

export const ARABIC_DIALECT_OPTIONS: Option<ArabicDialect>[] = [
    { label: 'العربية الفصحى', value: ArabicDialect.STANDARD },
    { label: 'لهجة سورية', value: ArabicDialect.SYRIAN },
    { label: 'لهجة مصرية', value: ArabicDialect.EGYPTIAN },
    { label: 'لهجة سعودية', value: ArabicDialect.SAUDI },
];

export const PRESET_BACKGROUNDS = [
  { label: 'طبيعة', value: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400' },
  { label: 'مدينة', value: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200', imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=400' },
  { label: 'مكتب', value: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
  { label: 'ألوان مائية', value: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400' },
];

export const VIDEO_RESOLUTION_OPTIONS: Option<VideoResolution>[] = [
    { label: '720p', value: VideoResolution.HD_720P },
    { label: '1080p', value: VideoResolution.HD_1080P },
];

export const VIDEO_DURATION_OPTIONS: Option<VideoDuration>[] = [
    { label: '5 ثواني', value: VideoDuration.FIVE_SECONDS },
    { label: '10 ثواني', value: VideoDuration.TEN_SECONDS },
];

export const VIDEO_ASPECT_RATIO_OPTIONS: Option<VideoAspectRatio>[] = [
    { label: 'عرضي (16:9)', value: VideoAspectRatio.LANDSCAPE },
    { label: 'طولي (9:16)', value: VideoAspectRatio.PORTRAIT },
];
