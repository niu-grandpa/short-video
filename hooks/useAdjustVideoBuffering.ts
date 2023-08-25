/**
 * 根据网络情况动态调整视频缓冲策略
 */
export const useAdjustVideoBuffering = (video: HTMLVideoElement) => {
  // 动态调整缓冲策略
  const adjust = () => {
    // 获取已缓冲数据
    const buffered = video.buffered;
    const isOnline = navigator.onLine;
    // @ts-ignore 获取网络速度
    const networkSpeed = navigator.connection.downlink;

    if (isOnline) {
      if (buffered.length) {
        const bufferedEnd = buffered.end(buffered.length - 1);

        video.currentTime =
          networkSpeed < 2
            ? // 增加缓冲时间，适应较慢的网络
              bufferedEnd - 10
            : // 减少缓冲时间，提高响应速度
              bufferedEnd - 2;

        console.log('当前缓冲时间：' + video.currentTime);
      }
    } else {
      console.log('视频无网络连接');
    }
  };

  onMounted(() => {
    // 监听网络状态变化事件
    window.addEventListener('online', adjust);
    window.addEventListener('offline', adjust);
  });

  return adjust;
};
