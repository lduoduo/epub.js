EPUBJS.Paginate = function(book, options) {

  EPUBJS.Continuous.apply(this, arguments);

  this.settings = EPUBJS.core.extend(this.settings || {}, {
    width: 600,
    height: 400,
    axis: "horizontal",
    forceSingle: false,
    minSpreadWidth: 800, //-- overridden by spread: none (never) / both (always)
    gap: "auto", //-- "auto" or int
    overflow: "hidden",
    infinite: false
  });

  EPUBJS.core.extend(this.settings, options);

  this.isForcedSingle = false;

  this.viewSettings = {
    axis: this.settings.axis
  };
  
  this.start();
};

EPUBJS.Paginate.prototype = Object.create(EPUBJS.Continuous.prototype);
EPUBJS.Paginate.prototype.constructor = EPUBJS.Paginate;


EPUBJS.Paginate.prototype.determineSpreads = function(cutoff){
  if(this.isForcedSingle || !cutoff || this.bounds().width < cutoff) {
    return 1; //-- Single Page
  }else{
    return 2; //-- Double Page
  }
};

EPUBJS.Paginate.prototype.forceSingle = function(bool){
  if(bool) {
    this.isForcedSingle = true;
    // this.spreads = false;
  } else {
    this.isForcedSingle = false;
    // this.spreads = this.determineSpreads(this.minSpreadWidth);
  }
};

/**
* Uses the settings to determine which Layout Method is needed
* Triggers events based on the method choosen
* Takes: Layout settings object
* Returns: String of appropriate for EPUBJS.Layout function
*/
EPUBJS.Paginate.prototype.determineLayout = function(settings){
  // Default is layout: reflowable & spread: auto
  var spreads = this.determineSpreads(this.settings.minSpreadWidth);
  console.log("spreads", spreads, this.settings.minSpreadWidth)
  var layoutMethod = spreads ? "ReflowableSpreads" : "Reflowable";
  var scroll = false;

  if(settings.layout === "pre-paginated") {
    layoutMethod = "Fixed";
    scroll = true;
    spreads = false;
  }

  if(settings.layout === "reflowable" && settings.spread === "none") {
    layoutMethod = "Reflowable";
    scroll = false;
    spreads = false;
  }

  if(settings.layout === "reflowable" && settings.spread === "both") {
    layoutMethod = "ReflowableSpreads";
    scroll = false;
    spreads = true;
  }

  this.spreads = spreads;

  return layoutMethod;
};

EPUBJS.Paginate.prototype.start = function(){  
  // On display
  // this.layoutSettings = this.reconcileLayoutSettings(globalLayout, chapter.properties);
  // this.layoutMethod = this.determineLayout(this.layoutSettings);
  // this.layout = new EPUBJS.Layout[this.layoutMethod]();
  //this.hooks.display.register(this.registerLayoutMethod.bind(this));

  this.currentPage = 0;

};

// EPUBJS.Rendition.prototype.createView = function(section) {
//   var view = new EPUBJS.View(section, this.viewSettings);


//   return view;
// };

EPUBJS.Paginate.prototype.layoutMethod = function() {
  //var task = new RSVP.defer();

  this.spreads = this.determineSpreads(this.settings.minSpreadWidth);

  this.layout = new EPUBJS.Layout.Reflowable(
    this.stage.width, 
    this.stage.height, 
    this.settings.gap,
    this.spreads
  );

  // Set the look ahead offset for what is visible
  this.settings.offset = this.layout.spread;  

  // this.hooks.layout.register(this.layout.format.bind(this));

  //task.resolve();
  //return task.promise;
  // return layout;
};

EPUBJS.Paginate.prototype.page = function(pg){
  
  // this.currentPage = pg;
  // this.renderer.infinite.scrollTo(this.currentPage * this.formated.pageWidth, 0);
  //-- Return false if page is greater than the total
  // return false;
};

EPUBJS.Paginate.prototype.next = function(){

  this.q.enqueue(function(){
    this.scrollBy(this.layout.spread, 0);
    return this.check();
  });

  // return this.page(this.currentPage + 1);
};

EPUBJS.Paginate.prototype.prev = function(){

  this.q.enqueue(function(){
    this.scrollBy(-this.layout.spread, 0);
    return this.check();
  });
  // return this.page(this.currentPage - 1);
};

// EPUBJS.Paginate.prototype.display = function(what){
//   return this.display(what);
// };