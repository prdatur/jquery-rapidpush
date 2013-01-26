/*!
 * jQuery RapidPush Plugin v1.0.0
 * https://github.com/prdatur/jquery-rapidpush
 *
 * Copyright 2013 Christian Ackermann
 * Released under the MIT license
 */
(function($){
	
	$.rapidpush = {
		
		/**
		 * Sends a notification.
		 * 
		 * @param array options
		 *   valid required options:
		 *     api_key		- The api key which will be used.
		 *     title		- The notification title
		 *     message		- The notification message
		 *					  
		 *   valid optional options:
		 *     priority		- The priority (default = 2)
		 *     category		- The category (default = 'default')
		 *     group		- The group (default = '')
		 *     schedule_at	- The scheduling time, if provided the message will be
		 *					  scheduled, else it will be send directly.
		 *					  The date must be formated Y-m-d H:i:00 example: 2013-01-10 16:30:00.
		 *					  Ending 0's needs to be present.
		 *					  The Datetime NEEDS to be in GMT (default = '')            
		 *     success		- A success callback, the result array will be provided 
		 *					  as the first parameter (default = null)
		 *     error		- An error callback, the result array will be provided 
		 *					  as the first parameter (default = null)
		 */
		notify: function (options) {			
			
			var post_params = {};
			
			// Direct return if we miss mandatory fields.
			if (options['title'] === undefined || options['title'] === '' || options['title'] === null || options['message'] === undefined || options['message'] === '' || options['message'] === null) {
				return false;
			}
		
			post_params['title'] = options['title'];
			post_params['message'] = options['message'];
		
			// Setup priority.
			if (options['priority'] === undefined || options['priority'] === null || options['priority'] === '') {
				post_params['priority'] = 2;
			}
			else {
				post_params['priority'] = parseInt(options['priority']);
			}
		
			// Setup category.
			if (options['category'] === undefined || options['category'] === null || options['category'] === '') {
				post_params['category'] = 'default';
			}
		
			// Setup group.
			if (options['group'] !== undefined && options['group'] !== null && options['group'] !== '') {
				post_params['group'] = options['group'];
			}
		
			// Setup if we want to schedule it or not..
			if (options['schedule_at'] !== undefined && options['schedule_at'] !== null && options['schedule_at'] !== '' && options['schedule_at'].search(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:00$/) !== -1) {
				post_params['schedule_at'] = options['schedule_at'];
			}
		
			var execute_options = {};
			
			// Set success callback.
			if (options['success'] !== undefined && options['success'] !== null && jQuery.isFunction(options['success'])) {
				execute_options['success'] = options['success'];
			}
		
			// Set error callback.
			if (options['error'] !== undefined && options['error'] !== null && jQuery.isFunction(options['error'])) {
				execute_options['error'] = options['error'];
			}
		
			// Set custom api key.
			if (options['api_key'] !== undefined && options['api_key'] !== null && options['api_key'] !== '') {
				execute_options['api_key'] = options['api_key'];
			}
			
			execute_request('notify', post_params, execute_options);
		},
	
		/**
		 * Get the configurated groups.
		 * 
		 * @param array options
		 *   valid required options:
		 *     api_key		- The api key which will be used.
		 *					  
		 *   valid optional options:
		 *     success		- A success callback, the result array will be provided 
		 *					  as the first parameter (default = null)
		 *     error		- An error callback, the result array will be provided 
		 *					  as the first parameter (default = null)
		 */
		get_groups: function(options) {
			var execute_options = {};
			
			// Set success callback.
			if (options['success'] !== undefined && options['success'] !== null && jQuery.isFunction(options['success'])) {
				execute_options['success'] = options['success'];
			}
		
			// Set error callback.
			if (options['error'] !== undefined && options['error'] !== null && jQuery.isFunction(options['error'])) {
				execute_options['error'] = options['error'];
			}
		
			// Set custom api key.
			if (options['api_key'] !== undefined && options['api_key'] !== null && options['api_key'] !== '') {
				execute_options['api_key'] = options['api_key'];
			}
			
			execute_request('get_groups', {}, execute_options);
		}
	};

	/**
	 * Executes a API-Request.
	 */
	var execute_request = function(command, params, options) {

	   params['header_errors'] = 1;

	   $.ajax({
		   type: 'POST',
		   dataType: 'json',
		   url: 'https://rapidpush.net/api',
		   async: true,
		   data: {
			   apikey: options['api_key'],
			   command: command,
			   data: JSON.stringify(params)
		   },
		   error: function(result) {
			   result.code = result.status;
			   this.success(result);
		   },
		   success: function(result) {
			   switch (result.code) {
				   case 200:
					   // Call success-callback if we have one.
					   if (options['success'] !== undefined) {
						   options['success'](result);
					   }
					   return;
				   default:
					   // Call error-callback if we have one.
					   if (options['error'] !== undefined) {
						   options['error'](result);
					   }
					   break;
			   }
		   }
	   });
	};

})(jQuery);