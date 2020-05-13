export default {
  getCartArray() {
    // Delete localStorage cart if cart cookie flag was cleared
    if (!this.getCookie('cart')) delete localStorage.cart;
    return (localStorage.cart && JSON.parse(localStorage.cart)) || [];
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
  },

  getLoadingSpinner() {
    return `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJtYXJnaW46YXV0bztiYWNrZ3JvdW5kOjAgMCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGRpc3BsYXk9ImJsb2NrIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlM2UzZTMiIHN0cm9rZS13aWR0aD0iNSIgcj0iMzIiIHN0cm9rZS1kYXNoYXJyYXk9IjE1MC43OTY0NDczNzIzMTAwNyA1Mi4yNjU0ODI0NTc0MzY2OSIgdHJhbnNmb3JtPSJyb3RhdGUoMTQ0LjAxIDUwIDUwKSI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIi8+PC9jaXJjbGU+PC9zdmc+`;
  }
}