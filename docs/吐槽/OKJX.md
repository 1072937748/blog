<script>
const OKJX_BASE_URL = 'https://okjx.cc/?url=';
const playlistInput = document.querySelector('#playlist');
const playBtns = document.querySelector('#play-btns');
const videoFrame = document.querySelector('#videoFrame');
let currentIndex = 0;
let playlist = [];


function playVideo(videourl, index) {
  if(videourl){
    videoFrame.src = OKJX_BASE_URL + videourl;
    return;
  }
  document.querySelectorAll('#play-btns button')[index].click()
}

window.prev = function prev() {
  if(!currentIndex) return;
  currentIndex--;
  playVideo(false, currentIndex);
}
window.next = function next() {
  if(currentIndex === playlist.length) return;
  currentIndex++;
  playVideo(false, currentIndex);
}

window.transPlayBtn = function transPlayBtn() {
  playlist = playlistInput.value.split(',');
  const _f = document.createDocumentFragment();
  playlist.forEach((it, i) => {
    const btnDom = document.createElement('button');
    btnDom.innerText = `第${i+1}集`;
    btnDom.setAttribute('data-index', i);
    btnDom.onclick = function () {
      Array.from(document.querySelectorAll('#play-btns button')).forEach(it=>it.className = '');
      this.className = 'active';
      playVideo(it);
      currentIndex = i;
    }
    _f.appendChild(btnDom);
  })
  playBtns.appendChild(_f);
}

window.fullscreen = function fullscreen(){
  if(videoFrame.className === 'video-fullscreen') {
    videoFrame.className = '';
    return;
  }
  videoFrame.className = 'video-fullscreen';
}

</script>

<input type="text" id="playlist">
<button onclick="transPlayBtn()">获取播放列表</button>
<div class="tools">
  <button class="btn fullscreen" onclick="fullscreen()">全屏</button>
  <button class="btn prev" onclick="prev()">上一集</button>
  <button class="btn next" onclick="next()">下一集</button>
</div>
<div id="play-btns"></div>
<iframe id="videoFrame" width=600 height=400 src="" ></iframe>
<style>
  .tools {
    position: fixed;
    right: 0;
    bottom: 2vh;
    z-index: 9999;
  }
  .btn {
    margin: 2px;
    padding: 2px 4px;
    font-size: 12px;
    color: #fff;
    background: skyblue;
    border: none;
    cursor: pointer;
  }
  .fullscreen {
  }
  .prev {
  }
  .next {
  }
  #videoFrame {
    resize: both;
  }
  #videoFrame.video-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
  }
  #play-btns {
    display: flex;
    flex-wrap: wrap;
  }
  #play-btns button {
    margin: 2px 4px;
    width: 5em;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }
  #play-btns button.active {
    background: skyblue;
  }
</style>
