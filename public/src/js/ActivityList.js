/**
 * Creates an activity list
 */

function ActivityList( ) {
	var activities = [];
	var actions = [];
	var cases = {};
	var activitiesIndex = {};

	/**
	 * Render the list
	 * @param status
	 * @param container
	 */
	this.render = function( status, container ) {
		if( activities.length > 0 ) {
			var list = filterByStatus( status );
			$.get('views/activities_list.html', function(template) {
				var rendered = Mustache.render(template, {activities: list});
				$(container).html(rendered);
				setActions($(container));
			});
		}
		else {
			var self = this;
			this.load( function(){
				self.render( status, container );
			} );
		}
		return this;
	};

	/**
	 * Create DOM actions listener
	 * @param $container
	 */
	function setActions( $container ) {
		$container.find('.activity').click(function (event) {
			call($(this).data('id'));
		});
	}

	/**
	 * Render Activity
	 * @param id
	 * @param container
	 * @returns {ActivityList}
	 */
	this.renderActivity = function( id, container ) {
		if( activities.length > 0 ) {
			$.get('views/activity.html', function(template) {
				var rendered = Mustache.render(template, {activity: activitiesIndex[id]});
				$(container).html(rendered);
				setActivityActions($(container), id);
			});
		}
		else {
			var self = this;
			this.load( function(){
				self.renderActivity( id, container );
			} );
		}
		return this;
	};

	/**
	 * Create DOM actions listener and change status of activity
	 * @param $container
	 * @param id
	 */
	function setActivityActions( $container, id ) {
		$container.find('.button.approved').click(function (event) {
			$container.find('.activity').removeClass().addClass('activity approved');
			$container.find('.footer').text('approved');
			activitiesIndex[id].case.approved = 'approved';

		});
		$container.find('.button.denied').click(function (event) {
			$container.find('.activity').removeClass().addClass('activity denied');
			$container.find('.footer').text('denied');
			activitiesIndex[id].case.approved = 'denied';
		});
		$container.find('.button.pending').click(function (event) {
			$container.find('.activity').removeClass().addClass('activity pending');
			$container.find('.footer').text('pending');
			activitiesIndex[id].case.approved = 'pending';
		});
	}

	/**
	 * Returns a filtered list of activities
	 * @param status
	 * @returns {Array}
	 */
	function filterByStatus(status) {
		var list = [];
		activities.map(function(activity){
			if( activity.case.approved == status || status == 'all' )
				list.push( activity );
		});
		return list;
	}

	/**
	 * Adds callback to the selection of an activity
	 * @param callback The function to call on
	 */
	this.onSelect = function( callback ) {
		actions.push( callback );
		return this;
	};

	/**
	 * Trigger actions
	 */
	function call( activity ) {
		actions.map(function( action ){
			action( activity );
		});
	}

	/**
	 * Retrieve data
	 * @param callback
	 */
	this.load = function( callback ) {
		$.getJSON('/api/cases', function(data) {
			data.map(function(dCase){
				dCase.beginDate = toISO(dCase.beginDate);
				dCase.endDate = toISO(dCase.endDate);
				dCase.lastVacationOn = toISO(dCase.lastVacationOn);

				// Some random data
				dCase.image = faker.image.avatar();
				dCase.approved = (['pending','denied','approved'])[Math.floor(Math.random()*3)];

				cases[dCase.caseId] = dCase;
			});
			$.getJSON('/api/processes', function(data) {
				data.map(function(dProcess){
					dProcess.requestDate = toISO(dProcess.requestDate);

					// Related case
					dProcess.case = cases[dProcess.caseId];
					activities.push( dProcess );
					activitiesIndex[dProcess.caseId] = dProcess;
				});
				if( callback )
					callback( activities );
			});
		});
	};

	/**
	 * Simply way to change from dd/mm/yyyy to yyyy-mm-dd
	 * @param date
	 * @returns {string}
	 */
	function toISO( date ) {
		return date.split('/').reverse().join('-');
	}

}