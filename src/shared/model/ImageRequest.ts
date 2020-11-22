import { JpegSettings } from './JpegSettings';

export interface ImageRequest {
  source?: string;
  destination?: string;
  imageSettings: {
    jpegSetting: JpegSettings;
  };
}
