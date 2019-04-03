/* README
Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/

Stevens code was based on peledies jquery plugin on github:
https://github.com/peledies/google-places

made me think and remix their work into the following lines.

Thank you guys!
*/

(function($) {

  $.fn.googlePlaces = function(options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      // These are the defaults.
      header: "<h3>Google Reviews</h3>",
      footer: '',
      maxRows: 6,
      minRating: 4,
      months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      textBreakLength: "90",
      shortenNames: true,
      placeId: "",
      moreReviewsButtonUrl: '',
      moreReviewsButtonLabel: 'Show More Review',
      writeReviewButtonUrl: '',
      writeReviewButtonLabel: 'Write New Review'
    }, options);

    var targetDiv = this[0];
    var targetDivJquery = this;

    var renderMoreReviewsButton = function() {
      return '<div class="more-reviews"><a href="'+settings.moreReviewsButtonUrl+'" target="_blank">'+settings.moreReviewsButtonLabel+'</a></div>';   
    };

    var renderWriteReviewButton = function() {
      return '<div class="write-review"><a href="'+settings.writeReviewButtonUrl+'" target="_blank">'+settings.writeReviewButtonLabel+'</a></div>';   
    };

    var renderHeader = function(header) {
      var html = "";
      html += header + "<br>";
      targetDivJquery.append(html);
    };

    var renderFooter = function(footer) {
      var html = "";
      var htmlButtons = "";

      if (settings.moreReviewsButtonUrl) {
        htmlButtons += renderMoreReviewsButton();
      }
      if (settings.writeReviewButtonUrl) {
        htmlButtons += renderWriteReviewButton();
      }
      if (htmlButtons != "") {
        html += '<div class="buttons">'+htmlButtons+'</div>';
      }
      
      html += "<br>" + footer + "<br>";
      targetDivJquery.after(html);
    };

    var shortenName = function(name) {
      if (name.split(" ").length > 1) {
        var shortenedName = "";
        shortenedName = name.split(" ");
        return shortenedName[0] + " " + shortenedName[1][0] + ".";
      }
    };

    var renderStars = function(rating) {
      var stars = '<div class="review-stars"><ul>';
      // fill gold stars
      for (var i = 0; i < rating; i++) {
        stars += '<li><i class="star"></i></li>';
      }
      // fill empty stars
      if (rating < 5) {
        for (var i = 0; i < (5 - rating); i++) {
          stars += '<li><i class="star inactive"></i></li>';
        }
      }
      stars += "</ul></div>";
      return stars;
    };

    var convertTime = function(UNIX_timestamp) {
      var newDate = new Date(UNIX_timestamp * 1000);
      var months = settings.months;
      var time = newDate.getDate() + ". " + months[newDate.getMonth()] + " " + newDate.getFullYear();
      return time;
    };

    var filterReviewsByMinRating = function(reviews) {
      if (reviews === void 0) {
        return [];
      } else {
        for (var i = reviews.length - 1; i >= 0; i--) {
          if (reviews[i].rating < settings.minRating) {
            reviews.splice(i, 1);
          }
        }
        return reviews;
      }
    };

    var renderReviews = function(reviews) {
      reviews.reverse();
      var html = "";
      var rowCount = (settings.maxRows > 0) ? settings.maxRows - 1 : reviews.length - 1;
      
      rowCount = (rowCount > reviews.length - 1) ? reviews.length - 1 : rowCount;
      for (var i = rowCount; i >= 0; i--) {
        var stars = renderStars(reviews[i].rating);
        var date = convertTime(reviews[i].time);
        var name = settings.shortenNames ? shortenName(reviews[i].author_name) : reviews[i].author_name;
        var style = (reviews[i].text.length > parseInt(settings.textBreakLength)) ? "review-item-long" : "review-item";
        html = html + "<div class="+ style +"><div class='review-meta'><span class='review-author'>" + name + "</span><span class='review-sep'></span>" + "</div>" + stars + "<p class='review-text'>" + reviews[i].text + "</p></div>";
        // I do not need to display the date... but if you do:
        // +"<br><span class='review-date'>"+date+"</span>"+
      }
      targetDivJquery.append(html);
    };

    // GOOGLE PLACES API CALL STARTS HERE

    // initiate a Google Places Object
    var service = new google.maps.places.PlacesService(targetDiv);
    // set.getDetails takes 2 arguments: request, callback
    // see documentation here:  https://developers.google.com/maps/documentation/javascript/3.exp/reference#PlacesService
    const request = {
      placeId: settings.placeId
    };
    // the callback is what initiates the rendering if Status returns OK
    var callback = function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var filteredReviews = filterReviewsByMinRating(place.reviews);
        if (filteredReviews.length > 0) {
          renderHeader(settings.header);
          renderReviews(filteredReviews);
          renderFooter(settings.footer);
        }
      }
    }

    return this.each(function() {
      // Runs the Plugin
      if (settings.placeId === undefined || settings.placeId === "") {
        console.error("NO PLACE ID DEFINED");
        return
      }
      service.getDetails(request, callback);
    });
  };

}(jQuery));
