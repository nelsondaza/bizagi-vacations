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

	/**
	 * Creates a menu with a fake user
	 */
	var menu = new Menu({
		name: faker.name.findName(),
		image:faker.image.avatar()
	});

	var activityList = new ActivityList();

	menu.on('pending',function(){
			activityList.render('pending', $('section.body-section'));
		})
		.on('all',function(){
			activityList.render('all', $('section.body-section'));
		})
		.on('approved',function(){
			activityList.render('approved', $('section.body-section'));
		})
		.on('denied',function(){
			activityList.render('denied', $('section.body-section'));
		})
		.on('logout',function(){
			document.location.href = '?';
		})
		.on('404',function( params ){
			if( params[0] == 'activity' ) {
				activityList.renderActivity( params[1], $('section.body-section') );
			}
		})
		.render($('aside.body-aside:first'));


	activityList.onSelect(function(activity){
		document.location.href = '#activity/' + activity;
	});
});

