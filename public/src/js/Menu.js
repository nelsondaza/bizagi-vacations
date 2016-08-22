/**
 * Creates a global menu object
 */

function Menu( user ) {
	var actions = {};
	var $el = null;

	/**
	 * Render the menu
	 * @param container
	 */
	this.render = function( container ) {
		$el = $(container);
		$.get('views/menu.html', function(template) {
			var rendered = Mustache.render(template, {user: user});
			$el.html(rendered);
			hashchange();
		});
		return this;
	};

	/**
	 * Adds callback to menu actions
	 * @param action The executed action (hash)
	 * @param callback The function to call on hashchange to defined action
	 */
	this.on = function( action, callback ) {
		actions[action] = actions[action] || [];
		actions[action].push( callback );
		return this;
	};

	/**
	 * Select the menu option
	 * @param action
	 */
	function selectMenu( action ) {
		$el.find('li.active').removeClass('active');
		$el.find('li a[href="#' + action + '"]').parent().addClass('active');
	}

	/**
	 * Trigger actions
	 * @param action The action to trigger
	 */
	function call( action, params ) {
		selectMenu( action );
		if( actions.hasOwnProperty(action)) {
			for( var c = 0; c < actions[action].length; c ++ )
				actions[action][c]( params );
		}
		else {
			console.warn('Callback "' + action + '" missing.');
		}
	}

	/**
	 * Navigation actions (hash)
	 */
	$(window).on('hashchange', hashchange);
	function hashchange( ){
		var params = window.location.hash.substr(1).split('/');
		switch(window.location.hash) {
			case '#logout':
				call('logout', params);
				break;
			case '#account':
				call('account', params);
				break;
			case '#all':
				call('all', params);
				break;
			case '#approved':
				call('approved', params);
				break;
			case '#denied':
				call('denied', params);
				break;
			case '#pending':
			case '#':
			case '':
				call('pending', params);
				break;
			default:
				call('404', params);
		}
	}


}