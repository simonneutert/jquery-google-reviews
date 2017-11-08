# jQuery Plugin to display Google Reviews of a (Maps) Place

## Credits
Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/
[Steven's github](https://github.com/stevenmonson/googleReviews)

I found out, that Stevens code was based on peledies jquery plugin repo:
https://github.com/peledies/google-places

So I simply remixed their work into this repo.
*Thank you guys!*

## How this works

Download the repo and open the `index.html`, but make sure to add a working Google Maps/Places API key.
``` html
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=YourApiKeyHere"></script>
```

When calling the plugin, you can set a proper place-id, of course :)

these are the optional params for the plugin:
```
jQuery(document).ready(function($) {
  if ($("#google-reviews").length == 0) {
    return
  }
  //Find a placeID via https://developers.google.com/places/place-id
  $("#google-reviews").googlePlaces({
    placeId: 'ChIJZa6ezJa8j4AR1p1nTSaRtuQ',
    // the following params are optional (default values)
    header: "<h3>Google Reviews</h3>", // html/text over Reviews
    footer: '', // html/text under Reviews block
    max_rows: 6, // max rows of reviews to be displayed
    min_rating: 4, // minimum rating of reviews to be displayed
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    text_break_length: "90", // length before a review box is set to max width
    shorten_names: true, // example: "Max Mustermann" -> "Max M.""
  });
});
```
