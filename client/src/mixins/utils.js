export default {
  getCartArray() {
    return (this.getCookie('cart') && JSON.parse(this.getCookie('cart'))) || [];
  },

  getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
  
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
  
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
  
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  
    return null;
  },

  setCookie(name, value, minutes) {
    let expirationFragment = '';

    if (minutes) {
      const date = new Date();
      const ms = minutes * 60 * 1000;
      const expiration = date.getTime() + ms;

      date.setTime(expiration);
      expirationFragment = `; expires=${date.toGMTString()}`;
    }

    document.cookie = `${name}=${value}${expirationFragment}; path=/`;
  },

  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },

  loadScript(url, optCallback) {
    const scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.async = true;
    scriptEl.src = url;
    if (typeof optCallback === 'function') {
      scriptEl.onload = optCallback;
    }
    document.head.insertAdjacentElement('beforeend', scriptEl);
  },

  slugify(text) {
    return text.replace(/([a-z\d][A-Z])/g, g => { 
      return `${g[0]}-${g[1].toLowerCase()}` ;
    });
  }
}