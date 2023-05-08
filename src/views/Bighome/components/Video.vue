<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'

const myPlayer = ref()
onMounted(() => {
  myPlayer.value = videojs(
    'my-video1',
    {
      bigPlayButton: false,
      textTrackDisplay: false,
      posterImage: false,
      errorDisplay: false,
      controlBar: true // ...其他配置参数
    },
    function (this: any) {
      this.play()
    }
  )
})
onUnmounted(() => {
  if (myPlayer.value) {
    myPlayer.value.dispose()
  }
})
</script>

<template lang="">
  <div class="w-full h-full">
    <video
      ref="video"
      id="my-video1"
      class="w-full h-full video-js vjs-default-skin"
      autoplay
      muted
      preload="auto"
      width="100%"
      poster="@/assets/imgs/AlarmCountBg.png"
    >
      <source
        src="https://hls01open.ys7.com/openlive/4d4a5ff6f97f4e9cb299bb830140757e.m3u8"
        style="width: 100%"
      />
    </video>
  </div>
</template>
<style lang="less" scoped>
#my-video1 {
  // width: 605px;
  height: 500px;
}
</style>
