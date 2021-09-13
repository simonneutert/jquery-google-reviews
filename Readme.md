# jQuery Plugin to display Google Reviews of a Place on Google Maps

this will get the 5 reviews, google offers you. 

#### But I need more than 5 reviews!

if you need more, let me direct you a bit: https://developers.google.com/my-business/content/review-data#list_all_reviews - but this will be a different project all by its own

## I do not like jQuery!!!1eleven

The NPM Package is [here](https://github.com/simonneutert/google-maps-reviews) - Frontend Devs will know how to webpack :) or simply extract the code and adapt it to your needs, dropping jQuery as a dependency.

## Credits

Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/ or check out [Steven's github](https://github.com/stevenmonson/googleReviews). Steven's code is based on [peledies jquery plugin repo](https://github.com/peledies/google-places). So, I simply remixed their work into this repo. _Thank you guys!_

#### Dear beginners and copy-pasters

:octocat: _For those of you, who are new in programming or can only copy-paste, please make sure, that jQuery, the Google Maps API and the .js-file of this plugin are successfully loaded, before you call this script in your html page._

_./demo/index.html is a working demo, the comments will guide you :wink:_

## Prerequisites

- You must have jQuery in your project: [jQuery](http://jquery.com)

- add the .js and .css of this repo to your project (see ./demo/index.html for inspiration :wink:)

- **_if you do not have a working Google Maps API key already:_** create a Google API Key: [https://console.developers.google.com/apis/](https://console.developers.google.com/apis/) **make sure to set a limit to your payments**

- add the following line with your Google Maps API key with the key param:

  ```html
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=YourApiKeyHere"></script>
  ```

- add an empty **_div_** element in your html template with an unique ID, where the reviews should show up. In this case:

  `<div id="google-reviews"></div>`

## How to get link to “View All Google Reviews” or "Write a review"

Please see the official Documents for this topic:  
https://developers.google.com/my-business/content/review-data#list_all_reviews

- Step 1. Open a browser, but don’t use Chrome. You can use Firefox, or Edge, or even Internet Explorer but not Google Chrome because it alters the URL and your link will not work correctly.

- Step 2. Go to [Google.com](http://www.google.com) and search for your company’s name.

- Step 3. Find the card on the right and click “View All Google Reviews” or "Write a review"

- Step 4. Copy the URL in the address bar.

- Step 5. Now paste the URL as a link on `more_reviews_button_url` or `write_review_button_url` param.

## Call the Plugin

[Grab your place's ID (https://developers.google.com/places/place-id) and call it as **_placeId_** parameter, when calling the plugin. ](https://developers.google.com/places/place-id)

```html
<script>
  jQuery(document).ready(function ($) {
    if ($("#google-reviews").length == 0) {
      return;
    }
    // Find a placeID via https://developers.google.com/places/place-id
    $("#google-reviews").googlePlaceReviews({
      placeId: "ChIJZa6ezJa8j4AR1p1nTSaRtuQ",
      // the following params are optional (default values)
      header: "<h3>Google Reviews</h3>", // html/text over Reviews
      footer: "", // html/text under Reviews block
      maxRows: 5, // max 5 rows of reviews to be displayed
      minRating: 4, // minimum rating of reviews to be displayed
      months: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],
      renderAverage: false, // render average reviews and stars
      renderReviews: true, // render reviews
      textBreakLength: "90", // length before a review box is set to max width
      shortenNames: true, // example: "Max Mustermann" -> "Max M."",
      moreReviewsButtonUrl: "", // url to Google Place reviews popup
      moreReviewsButtonLabel: "Show More Reviews",
      writeReviewButtonUrl: "", // url to Google Place write review popup
      writeReviewButtonLabel: "Write New Review",
      showProfilePicture: true,
    });
  });
</script>
```

## Are Pull Requests welcome?

Yes, of course :octocat:

**You do not need to update the demo folder!** I will do this, when your code was merged.
