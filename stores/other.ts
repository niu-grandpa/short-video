import { StoreDefinition, defineStore } from 'pinia';
import { IVideo } from '~/services/types/video_api';

export const useOtherStore: StoreDefinition<
  'other',
  {
    videoSwiperData: IVideo[];
  }
> = defineStore('other', {
  state: () => ({
    videoSwiperData: [],
  }),
});
