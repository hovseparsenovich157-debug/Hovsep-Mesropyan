// VIDEO LIST
const videos = ["skoro.mp4","video1.mp4","chto budet.mp4","grustno.mp4"];
let mainPlayer=document.getElementById("mainPlayer");
let currentVideo=0;
mainPlayer.src=videos[currentVideo];
mainPlayer.play();

// CONTROLS
document.getElementById("mainPlay").addEventListener("click",()=>{
  mainPlayer.paused?mainPlayer.play():mainPlayer.pause();
});
document.getElementById("mainMute").addEventListener("click",()=>{
  mainPlayer.muted=!mainPlayer.muted;
});
document.getElementById("rewind").addEventListener("click",()=>{mainPlayer.currentTime-=15;});
document.getElementById("forward").addEventListener("click",()=>{mainPlayer.currentTime+=5;});
document.getElementById("mainFS").addEventListener("click",()=>{
  mainPlayer.requestFullscreen();
});
mainPlayer.addEventListener("ended",()=>{
  currentVideo=(currentVideo+1)%videos.length;
  mainPlayer.src=videos[currentVideo];
  mainPlayer.play();
});

// PROGRESS BAR
const progressBar=document.getElementById("progressBar");
const progressFilled=document.getElementById("progressFilled");
mainPlayer.addEventListener("timeupdate",()=>{
  const percent=(mainPlayer.currentTime/mainPlayer.duration)*100;
  progressFilled.style.width=percent+"%";
});
progressBar.addEventListener("click",(e)=>{
  const pos=(e.offsetX/progressBar.offsetWidth)*mainPlayer.duration;
  mainPlayer.currentTime=pos;
});

// CAROUSEL
const carousel=document.querySelector(".carousel");
let index=0;
setInterval(()=>{index=(index+1)%3;carousel.style.transform=`translateX(-${index*100}%)`;},2000);
document.querySelector(".prev").addEventListener("click",()=>{index=(index+2)%3;carousel.style.transform=`translateX(-${index*100}%)`;});
document.querySelector(".next").addEventListener("click",()=>{index=(index+1)%3;carousel.style.transform=`translateX(-${index*100}%)`;});

// PAROVOZIK
document.querySelectorAll(".poster").forEach(p=>{
  p.addEventListener("click",()=>{
    const overlay=document.getElementById("playerOverlay");
    const overlayVideo=document.getElementById("overlayVideo");
    overlayVideo.src=p.dataset.video;
    overlay.classList.add("active");
    overlayVideo.play();
  });
});
document.getElementById("closeOverlay").addEventListener("click",()=>{
  const overlay=document.getElementById("playerOverlay");
  const overlayVideo=document.getElementById("overlayVideo");
  overlayVideo.pause();
  overlay.classList.remove("active");
});

// COUNTDOWN
let countdownDate=new Date("Apr 24, 2026 00:00:00").getTime();
setInterval(()=>{
  let now=new Date().getTime();
  let dist=countdownDate-now;
  document.getElementById("days").innerText=Math.floor(dist/(1000*60*60*24));
  document.getElementById("hours").innerText=Math.floor((dist%(1000*60*60*24))/(1000*60*60));
  document.getElementById("minutes").innerText=Math.floor((dist%(1000*60*60))/(1000*60));
  document.getElementById("seconds").innerText=Math.floor((dist%(1000*60))/1000);
},1000);

// LANGUAGE SWITCH
const langBtn=document.getElementById("langToggle");
langBtn.addEventListener("click",()=>{
  document.querySelectorAll("[data-lang-en]").forEach(el=>el.style.display=el.style.display==="none"?"block":"none");
  document.querySelectorAll("[data-lang-ru]").forEach(el=>el.style.display=el.style.display==="none"?"block":"none");
});

// THEME SWITCH
const themeBtn=document.getElementById("themeToggle");
themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});
