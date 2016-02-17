(function(){
  var options = INSTALL_OPTIONS;
  var el = null;
  var updateElement = function(){
    el = Eager.createElement(options.location, el);
    el.className = 'widget-app-source';
  };

  var update = function(){
    updateElement();

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

  INSTALL_SCOPE = {
    setOptions: setOptions
  };

})();
