!function(f,b,e,v,n,t,s){
    if(f.fbq) return;
    n = f.fbq = function(){
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    n.queue = [];
    n.loaded = true;
    n.version = '2.0';
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );
  fbq('init', '994272692834568');
  fbq('track', 'PageView');
  