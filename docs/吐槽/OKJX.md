<script>
const OKJX_BASE_URL = 'https://okjx.cc/?url=';
const playlistInput = document.querySelector('#playlist');
const playBtns = document.querySelector('#play-btns');

function playVideo(videourl) {
  const videoFrame = document.querySelector('#videoFrame');
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

</script>

<input type="text" id="playlist">
<button onclick="transPlayBtn()">获取播放列表</button>
<div id="play-btns"></div>
<iframe id="videoFrame" width=600 height=400 src="" ></iframe>
<style>
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