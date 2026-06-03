  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  function loadGA(){
    if(window._gaLoaded)return;
    window._gaLoaded=true;
    var s=document.createElement('script');
    s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-NGXKXV7EGM';
    document.head.appendChild(s);
    gtag('js',new Date());gtag('config','G-NGXKXV7EGM',{anonymize_ip:true});
  }
  function denyGA(){window._gaDenied=true;gtag('consent','default',{analytics_storage:'denied'});}
  // Check stored preference
  var cp=localStorage.getItem('cookie_consent');
  if(cp==='accepted'){loadGA();}
  else if(cp==='denied'){denyGA();}
  else{gtag('consent','default',{analytics_storage:'denied'});}