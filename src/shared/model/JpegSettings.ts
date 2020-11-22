import { ImageSettings } from './ImageSettings';

export interface JpegSettings extends ImageSettings {
  quality: number;
  minQuality: number;
  maxQuality: number;
}

export const defaultJpegSettings: JpegSettings = {
  name: 'JPEG',
  icon: '',
  quality: 75,
  minQuality: 10,
  maxQuality: 90,
};
