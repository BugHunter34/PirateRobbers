function Redirecter() {
  // Query for video server
  const videoElement = document.getElementById('content_video_html5_api');
  const videoUrl = videoElement ? videoElement.getAttribute('src') : '';
  const titleHeading = document.querySelector('h1.h2.title.margin-bottom-0.word-break');

  // if the element isn't there (HomePage or button exists) -> Stop
  if (!videoElement || document.querySelector('#redir-btn')) {
    return;
  }

  //Regex to find subtitles (didn't use this for video since there is many .mp4 urls for each quality)
  let subtitleUrls = [];
  const scripts = document.querySelectorAll('script');
  
  for (const script of scripts) {
    // the "g" at the end mean to find it global (all matches)
    const regex = /file:\s*"(https:\/\/[^"]+\.vtt[^"]*)"/g;
    let match;
    
    while ((match = regex.exec(script.textContent)) !== null) {
      // prevent dupes
      if (!subtitleUrls.includes(match[1])) {
        subtitleUrls.push(match[1]);
      }
    }
  }

  // btn UI
  const btn = document.createElement('button');
  btn.id = 'redir-btn';
  btn.innerText = 'Injected Redirecter';
  
  // Basic inline CSS for the button
  btn.style.alignItems = 'center';
  btn.style.webkitAppearance = 'none';
  btn.style.backgroundColor = '#d82381';
  btn.style.backgroundImage = 'linear-gradient(180deg, #e24d52, #c22026)';
  btn.style.backgroundPosition = '0 10%';
  btn.style.backgroundSize = '200% 200%';
  btn.style.border = '.125rem solid transparent';
  btn.style.borderRadius = '.25rem';
  btn.style.color = '#ffffff'; 
  btn.style.cursor = 'pointer';
  btn.style.display = 'inline-flex';
  btn.style.fontSize = '1.25rem';
  btn.style.fontWeight = '700';
  btn.style.justifyContent = 'center';
  btn.style.lineHeight = '1.375rem';
  btn.style.margin = '0 0 0 .75rem';
  btn.style.padding = '.625rem 1.25rem';
  btn.style.textAlign = 'center';
  btn.style.transition = 'background-color .25s ease-out, color .25s ease-out';
  btn.style.verticalAlign = 'middle';

  // click Listener
  btn.addEventListener('click', () => {
  // encodeURIComponent prevents '?' and '&' in CDN tokens from breaking the URL
  const encodedVideo = encodeURIComponent(videoUrl);
  let targetUrl = `https://player.andhyy.com/?watch=${encodedVideo}`;

    // loop and append all
  subtitleUrls.forEach((url, index) => {
      const paramName = index === 0 ? 'subtitles' : `subtitles${index + 1}`;
      targetUrl += `&${paramName}=${encodeURIComponent(url)}`;
  });

  // The Redirect
  window.location.href = targetUrl;
  });

  titleHeading.appendChild(btn);
}

// waits 2s for the page to load
setTimeout(Redirecter, 2000);