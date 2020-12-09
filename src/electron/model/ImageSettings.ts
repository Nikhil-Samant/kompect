export interface ImageSettings {
  name: string;
  icon: string;
  quality: number;
  minQuality: number;
  maxQuality: number;
}

export const defaultJpegSettings: ImageSettings = {
  name: 'JPEG',
  icon: '',
  quality: 75,
  minQuality: 10,
  maxQuality: 90,
};

export const defaultPngSettings: ImageSettings = {
  name: 'PNG',
  icon: '',
  quality: 75,
  minQuality: 30,
  maxQuality: 90,
};
