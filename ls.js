$(document).ready( function () {

	var shareLabel = ["mail", "facebook", "google plus", "twitter", "linkedin"];

	/*
		a.setAttribute("data-label", shareLabel[i]);
		addListener(a, 'click', function () {
			ga('send', 'event', 'social', 'light share', this.getAttribute("data-label"));
		});
*/

	var $href = $("link[rel=canonical").attr("href");
	if(!$href) { $href = document.URL; }
	$href = encodeURIComponent($href);
	var newWindow = "window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;";

	// Email

	// TODO - integrate into various email clients

	// Facebook with App_ID
	var fb1_api = "https://www.facebook.com/dialog/share?",
		id = "app_id=787311388023796",
		display = "display=popup",
		href = "href=" + $href,
		redirect = "redirect_uri=" + $href;
	$("#ls1").attr("href", fb1_api + id + "&" + display + "&" + href + "&" + redirect).attr("target", "_blank");

	// FB2
	var fb2_api = "https://www.facebook.com/sharer/sharer.php";
	$("#ls2").attr("href", fb2_api).attr("target", "_blank");

	// Gplus
	var gplus_api = "https://plus.google.com/share?",
		url = "url=" + $href;
	$("#ls3").attr("href", gplus_api + url).attr("target", "_blank");

	// Twitter
	var tw_api = "https://twitter.com/share";
	$("#ls4").attr("href", tw_api).attr("target", "_blank");

	// LinkedIn
	var lin_api = "https://www.linkedin.com/shareArticle?",
		lin_url = "url=" + $href,
		title = "title=" + encodeURI("Light Share lightweight sharing"),
		summary = "summary=" + encodeURI("A minimally intrusive social sharing button group."),
		source = "source=" + $href;
	$("#ls5").attr("href", lin_api + lin_url + "&" + title + "&" + summary + "&" + source).attr("target", "_blank");

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

	// Google analytics binding
 function addListener(element, type, callback) {
			if (element.addEventListener) element.addEventListener(type, callback);
			else if (element.attachEvent) element.attachEvent('on' + type, callback);
	}
});