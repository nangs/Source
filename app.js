(function(){
  var Eager;  
  var options = INSTALL_OPTIONS;
  var el = null;
  var prevEl = null;
  var updateElement = function(){
    // We keep track of the last element to allow us to restore the removed element
    // when we do live updating of the preview.  Details:
    // https://eager.io/developer/docs/install-json/preview#dealing-with-element-fields
    if (el && el.parentNode){
      if (prevEl){
        el.parentNode.replaceChild(prevEl, el);
        prevEl = null;
      } else {
        el.parentNode.removeChild(el);
      }
    } else {
      if (options.location.method === 'replace')
        prevEl = document.querySelector(options.location.selector);

      // why is it Eager. can it be something else without breaking it? 
      el = Eager.createElement(options.location);
      el.className = 'widget-app-source';
    }
  };

  var update = function(){
    updateElement();

  //  el.innerHTML = '<div>' + viewCount + '</div>';
  };

  var setOptions = function(opts){
    options = opts;

    update();
  };

  // Since we're adding an element to the body, we need to wait until the DOM is
  // ready before inserting our widget.
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', update);
  else
    update();

  // This is used by the preview to enable live updating of the app while previewing.
  // See the preview.handlers section of the install.json file to see where it's used.
  window.EagerSourceWidget = {
    setOptions: setOptions
  };

})();
