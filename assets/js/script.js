jQuery( function($) {
	var $body = $('body');
	$body.data('section-count', $('section.feed').length ).data('section-loaded', 0);

	NProgress.configure({
		callback: function() {
			$body.addClass('loaded');
		}
	}).start();

	$('section.feed').each( function() {
		var $feed = $(this),
			url = $feed.data('feed'),
			count = $feed.data('feed-count');

		$.ajax({
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + count + '&callback=?&q=' + encodeURIComponent(url),
			dataType: 'json',
			success: function(data) {
				var $ul = $('<ul />'),
					feed = data.responseData.feed,
					loadedCount = $body.data('section-loaded')+1,
					loadedRatio = loadedCount / $body.data('section-count');

				$body.data('section-loaded', loadedCount );

				NProgress.set( loadedRatio );

				$('<a />').attr('href', feed.link ).text( feed.title ).appendTo( $feed ).wrap('<h2 />');
				$ul.appendTo( $feed );

				feed.entries.forEach( function(post) {
					$('<a />').text( post.title ).attr('href', post.link ).appendTo( $ul ).wrap('<li />');
				});
			}
		});
	});
});
