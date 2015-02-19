$(document).ready( function () {
	var $href = $("link[rel=canonical").attr("href");
	if(!$href) { $href = document.URL; }
	$href = encodeURIComponent($href);
	var newWindow = "window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;";

	// Email
	var mailto = "mailto:?",
		subject = "subject=" + encodeURI("Light Share doesn't use a lot of js"),
		body = "body=" + encodeURI("Light Share's only hard dependency is jQuery, but I'm thinking I might make it so just vanilla JS will due.\n\n" +
			"Oh, that's right, the URL you want is: ") + decodeURI($href) + encodeURI(".\n\n-Logan");
	$("#mail").attr("href", mailto + "&" + subject + "&" + body);

	// FB1
	var fb1_api = "https://www.facebook.com/dialog/share?",
		id = "app_id=787311388023796",
		display = "display=popup",
		href = "href=" + $href,
		redirect = "redirect_uri=" + $href;
	$("#fb1").attr("href", fb1_api + id + "&" + display + "&" + href + "&" + redirect).attr("onclick", newWindow);

	// FB2
	var fb2_api = "https://www.facebook.com/sharer/sharer.php";
	$("#fb2").attr("href", fb2_api).attr("onclick", newWindow);

	// Gplus
	var gplus_api = "https://plus.google.com/share?",
		url = "url=" + $href;
	$("#gplus").attr("href", gplus_api + url).attr("onclick", newWindow);

	// Twitter
	var tw_api = "https://twitter.com/share";
	$("#tw").attr("href", tw_api).attr("onclick", newWindow);

	// LinkedIn
	var lin_api = "https://www.linkedin.com/shareArticle?",
		lin_url = "url=" + $href,
		title = "title=" + encodeURI("Light Share lightweight sharing"),
		summary = "summary=" + encodeURI("A minimally intrusive social sharing button group."),
		source = "source=" + $href;
	$("#lin").attr("href", lin_api + lin_url + "&" + title + "&" + summary + "&" + source).attr("onclick", newWindow);

	// LightShare show / hide
	var threshold = 300,
		$ls = $('.lightShare');
	$ls.hide();
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > threshold) {
			$ls.show("slide", { direction : "right"}, 'slow');
		} else {
			$ls.hide("slide", { direction : "right"}, 'slow');
		}
	});
});