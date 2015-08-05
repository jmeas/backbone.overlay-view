import Mn from 'backbone.marionette';

var OverlayView = Mn.ItemView.extend({
  className: 'overlay-view overlay-view-hide',

  // The OverlayView doesn't need a template: it's simply an element
  // that covers up the entirety of the application
  template: false,

  // Convert click DOM events into BB Events
  events: {
    click: '_handleClick'
  },

  // Whether or not the view is currently displaying
  isDisplaying() {
    return this._isDisplaying;
  },

  // Shows the overlay. Then, when it's clicked, close it.
  display() {
    if (this._isDisplaying) { return; }
    this.trigger('before:display');
    this._isDisplaying = true;
    this.$el.removeClass('overlay-view-hide');
    this.trigger('display');
  },

  // Hide the overlay.
  hide() {
    if (!this._isDisplaying) { return; }
    this.trigger('before:hide');
    this._isDisplaying = false;
    this.$el.addClass('overlay-view-hide');
    this.trigger('hide');
  },

  // Whether or not the overlayView is displayed
  _isDisplaying: false,

  // Emit the `click` event if the overlay is clicked directly.
  // Otherwise, emit a `click:child` event.
  _handleClick(e) {
    var clickedSelf = e.target === e.currentTarget;
    var eventName = clickedSelf ? 'click' : 'click:child';
    this.trigger(eventName);

    // Hide the view, if it's being displayed
    if (clickedSelf && this.isDisplaying()) {
      this.hide();
    }
  }
});

Mn.OverlayView = OverlayView;

export default OverlayView;
