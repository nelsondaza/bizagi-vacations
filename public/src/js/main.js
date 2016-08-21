$(function(){

	$.mockjax({
		url: "/api/processes",
		proxy: "/api/inbox.json",
		responseTime: [500, 750]
	});

	$.mockjax({
		url: "/api/cases",
		proxy: "/api/cases.json",
		responseTime: [500, 750]
	});


	$(window).on('hashchange', hashchange);

	function hashchange( ){
		console.debug(window.location.hash);
		switch(window.location.hash) {
			case '#all':
				all();
				break;
			case '#approved':
				approved();
				break;
			case '#denied':
				denied();
				break;
			default:
				pending();
		}
	}

	function selectMenu( hash ) {
		$('.menu li.active').removeClass('active');
		$('.menu li a[href="#' + hash + '"]').parent().addClass('active');
	}

	function pending() {
		console.debug('pending');
		selectMenu('pending');
	}

	function all() {
		console.debug('all');
		selectMenu('all');
	}

	function approved() {
		console.debug('approved');
		selectMenu('approved');
	}

	function denied() {
		console.debug('denied');
		selectMenu('denied');
	}

	hashchange();

});