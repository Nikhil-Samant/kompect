import { ImageSettings } from './ImageSettings';

export interface ImageRequest {
  source: string[];
  destination: string;
  isLosslessCompressionReq: boolean;
  imageSettings: {
    jpegSetting: ImageSettings;
    pngSetting: ImageSettings;
  };
}
