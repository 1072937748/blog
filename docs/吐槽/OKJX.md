<script>
const OKJX_BASE_URL = 'https://okjx.cc/?url=';
const playlistInput = document.querySelector('#playlist');
const playBtns = document.querySelector('#play-btns');
const videoFrame = document.querySelector('#videoFrame');

function playVideo(videourl) {
  videoFrame.src = OKJX_BASE_URL + videourl;
}

function transPlayBtn() {
  const playlist = playlistInput.value.split(',');
  const _f = document.createDocumentFragment();
  playlist.forEach((it, i) => {
    const btnDom = document.createElement('button');
    btnDom.innerText = `第${i+1}集`;
    btnDom.onclick = function () {
      Array.from(document.querySelectorAll('#play-btns button')).forEach(it=>it.className = '');
      this.className = 'active';
      playVideo(it)
    }
    _f.appendChild(btnDom);
  })
  playBtns.appendChild(_f);
}
window.transPlayBtn = transPlayBtn;

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
<button class="fullscreen" onclick="fullscreen()">全屏</button>
<div id="play-btns"></div>
<iframe id="videoFrame" width=600 height=400 src="" ></iframe>
<style>
  .fullscreen {
    position: fixed;
    right: 0;
    bottom: 2vh;
    padding: 2px 4px;
    font-size: 18px;
    color: #fff;
    z-index: 9999;
    background: skyblue;
    border: none;
    cursor: pointer;
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
