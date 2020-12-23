将视频绘制到 canvas 上

```JS
initCanvas(){
  //获取video
  let TestVideo = document.getElementById('videoPlay');
  let videoW = TestVideo.offsetWidth;
  let videoH = TestVideo.offsetHeight;
  //获取canvas画布
  let TestCanvas = document.getElementById('videoCanvas');
  //设置画布
  let TestCanvas2D = TestCanvas.getContext('2d');
  //设置setinterval定时器
  let TestVideoTimer = null;
  //监听播放
  TestVideo.addEventListener('play', function() {
    TestVideoTimer = setInterval(function() {
      TestCanvas2D.drawImage(TestVideo, 0, 0, 320, 180);
    }, 20);
  }, false);
  //监听暂停
  TestVideo.addEventListener('pause', function() {
    clearInterval(TestVideoTimer);
  }, false);
  //监听结束
  TestVideo.addEventListener('ended',function() {
    clearInterval(TestVideoTimer);
  }, false);
}
```

