gsap.registerPlugin(ScrollTrigger);

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    document.getElementById('progress').style.width = pct + '%';
  });

  gsap.to('.hero-eyebrow', { opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out' });
  gsap.to('.hero-name span', { y: '0%', duration: 1.2, stagger: 0.14, delay: 0.6, ease: 'power4.out' });
  gsap.to('.hero-tagline', { opacity: 1, duration: 1, delay: 1.3, ease: 'power3.out' });
  gsap.to('.hero-stats', { opacity: 1, duration: 1, delay: 1.6, ease: 'power3.out' });
  gsap.to('.scroll-cue', { opacity: 1, duration: 1, delay: 2, ease: 'power3.out' });
  gsap.to('.cowboy-hat-badge', { opacity: 1, duration: 1, delay: 1.8, ease: 'back.out(1.4)' });

  /* ═══ All scroll-triggered animations below now REVERSE on scroll-up ═══ */
  const onEnter = (el, vars) => gsap.to(el, {
    ...vars,
    scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play reverse play reverse' }
  });

  document.querySelectorAll('.tl-item').forEach((el, i) => {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.8, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' } });
  });
  onEnter('.photo-frame', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

  ScrollTrigger.create({
    trigger: '.record-section', start: 'top 60%',
    onEnter: () => {
      gsap.to('#recFill', { width: '100%', duration: 1.6, ease: 'power3.inOut' });
      gsap.to('.record-desc', { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    },
    onLeaveBack: () => {
      gsap.to('#recFill', { width: '0%', duration: 1, ease: 'power3.inOut' });
      gsap.to('.record-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
    }
  });

  document.querySelectorAll('.achieve-item').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play reverse play reverse' } });
  });
  document.querySelectorAll('.love-photo').forEach((el, i) => {
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'back.out(1.2)', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play reverse play reverse' } });
  });
  onEnter('.love-quote', { opacity: 1, duration: 1, ease: 'power3.out' });
  document.querySelectorAll('.step').forEach((el, i) => {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.8, delay: i * 0.14, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' } });
  });
  document.querySelectorAll('.cb-stat').forEach((el, i) => {
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.7, delay: i * 0.12, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play reverse play reverse' } });
  });
  document.querySelectorAll('.of').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.olympic-facts', start: 'top 80%', toggleActions: 'play reverse play reverse' } });
  });
  document.querySelectorAll('.celeb-photo, .video-cell').forEach((el, i) => {
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.8, delay: i * 0.12, ease: 'back.out(1.2)', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play reverse play reverse' } });
  });
  document.querySelectorAll('.impact-card').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play reverse play reverse' } });
  });
  onEnter('.closing-quote', { opacity: 1, duration: 1.2, ease: 'power3.out' });
  gsap.to('.closing-attr',  { opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.closing', start: 'top 70%', toggleActions: 'play reverse play reverse' } });
  gsap.to('.closing-final', { opacity: 1, duration: 1, delay: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.closing', start: 'top 70%', toggleActions: 'play reverse play reverse' } });
  ScrollTrigger.refresh();

  /* ═══════════════════════════════════════
     CUSTOM VIDEO PLAYER (reusable)
     - Starts muted (browser autoplay policy)
     - Click cell to play / pause
     - Only control: mute/unmute button
  ═══════════════════════════════════════ */
  function initVideoPlayer({ videoId, cellId, thumbId, playBtnId, muteBtnId, iconMutedId, iconSoundId }) {
    const video   = document.getElementById(videoId);
    const cell    = document.getElementById(cellId);
    const thumb   = document.getElementById(thumbId);
    const playBtn = document.getElementById(playBtnId);
    const muteBtn = document.getElementById(muteBtnId);
    const iMuted  = document.getElementById(iconMutedId);
    const iSound  = document.getElementById(iconSoundId);

    let started = false;

    cell.addEventListener('click', (e) => {
      if (e.target.closest(`#${muteBtnId}`)) return;

      if (!started) {
        started = true;
        video.play().catch(() => {});
        thumb.style.transition = 'opacity 0.4s ease';
        thumb.style.opacity = '0';
        setTimeout(() => { thumb.style.pointerEvents = 'none'; }, 400);
        playBtn.style.opacity = '0';
        playBtn.style.pointerEvents = 'none';
      } else {
        if (video.paused) {
          video.play();
          playBtn.style.opacity = '0';
        } else {
          video.pause();
          playBtn.style.opacity = '1';
        }
      }
    });

    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      iMuted.style.display = video.muted ? 'block' : 'none';
      iSound.style.display = video.muted ? 'none'  : 'block';
      muteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
      muteBtn.setAttribute('title',      video.muted ? 'Unmute'        : 'Mute');
    });

    video.addEventListener('error', () => {
      video.style.display = 'none';
      thumb.style.opacity = '1';
      thumb.style.pointerEvents = 'auto';
      playBtn.style.display = 'none';
      muteBtn.style.display = 'none';
    });
  }

  initVideoPlayer({
    videoId: 'celebVideo', cellId: 'videoCell', thumbId: 'videoThumb',
    playBtnId: 'videoPlayBtn', muteBtnId: 'videoMuteBtn',
    iconMutedId: 'iconMuted', iconSoundId: 'iconSound'
  });

  initVideoPlayer({
    videoId: 'celebVideo2', cellId: 'videoCell2', thumbId: 'videoThumb2',
    playBtnId: 'videoPlayBtn2', muteBtnId: 'videoMuteBtn2',
    iconMutedId: 'iconMuted2', iconSoundId: 'iconSound2'
  });