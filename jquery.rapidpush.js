/*!
 * jQuery RapidPush Plugin v1.0.1
 * https://github.com/prdatur/jquery-rapidpush
 *
 * Copyright 2013 Christian Ackermann
 * Released under the MIT license
 */
(function($){
	
	$.rapidpush = {
		
		/**
		 * Sends a broadcast notification to a channel.
		 * 
		 * @param array options
		 *   valid required options:
		 *     api_key		- The api key which will be used, multiple seperated by comma
		 *     title		- The notification title
		 *     message		- The notification message
		 *     channel      - The broadcast channel (you must own this channel)
		 *					  
		 *   valid optional options:
		 *     success		- A success callback, the result array will be provided 
		 *					  as the first parameter (default = null)
		 *     error		- An error callback, the result array will be provided 
		 *					  as the first parameter, this will NEVER be called if multiple 
		 *					  api keys were provided, you have to check the results on the success method
		 *					  (default = null)
		 */
		broadcast: function (options) {
			
			var post_params = {};
			var execute_options = {};
			
			// Direct return if we miss mandatory fields.
			if (check_if_empty(options, 'title') || check_if_empty(options, 'message') || check_if_empty(options, 'api_key') || check_if_empty(options, 'channel')) {
				return false;
			}
		
			post_params['title'] = options['title'];
			post_params['message'] = options['message'];
			post_params['channel'] = options['channel'];
			
			// Set success callback.
			if (!check_if_empty(options, 'success') && jQuery.isFunction(options['success'])) {
				execute_options['success'] = options['success'];
			}
		
			// Set error callback.
			if (!check_if_empty(options, 'error') && jQuery.isFunction(options['error'])) {
				execute_options['error'] = options['error'];
			}
		
			// Set api key.
			execute_options['api_key'] = options['api_key'];
			
			// Process api command
			execute_request('broadcast', post_params, execute_options);
		},
			
		/**
		 * Sends a notification.
		 * 
		 * @param array options
		 *   valid required options:
		 *     api_key		- The api key which will be used, multiple seperated by comma
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
		 *					  as the first parameter, this will NEVER be called if multiple 
		 *					  api keys were provided, you have to check the results on the success method
		 *					  (default = null)
		 */
		notify: function (options) {
		
			var execute_options = {};
			var post_params = {};
			
			// Direct return if we miss mandatory fields.
			if (check_if_empty(options, 'title') || check_if_empty(options, 'message') || check_if_empty(options, 'api_key')) {
				return false;
			}
		
			post_params['title'] = options['title'];
			post_params['message'] = options['message'];
		
			// Setup priority.
			if (check_if_empty(options, 'priority')) {
				post_params['priority'] = 2;
			}
			else {
				post_params['priority'] = parseInt(options['priority']);
			}
		
			// Setup category.
			if (check_if_empty(options, 'category')) {
				post_params['category'] = 'default';
			}
		
			// Setup group.
			if (!check_if_empty(options, 'category')) {
				post_params['group'] = options['group'];
			}
		
			// Setup if we want to schedule it or not..
			if (!check_if_empty(options, 'schedule_at') && options['schedule_at'].search(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:00$/) !== -1) {
				post_params['schedule_at'] = options['schedule_at'];
			}
			
			// Set success callback.
			if (!check_if_empty(options, 'success') && jQuery.isFunction(options['success'])) {
				execute_options['success'] = options['success'];
			}
		
			// Set error callback.
			if (!check_if_empty(options, 'error') && jQuery.isFunction(options['error'])) {
				execute_options['error'] = options['error'];
			}
		
			// Set api key.
			execute_options['api_key'] = options['api_key'];
			
			// Process api command
			execute_request('notify', post_params, execute_options);
		},
	
		/**
		 * Get the configurated groups.
		 * 
		 * @param array options
		 *   valid required options:
		 *     api_key		- The api key which will be used, multiple seperated by comma
		 *					  
		 *   valid optional options:
		 *     success		- A success callback, the result array will be provided 
		 *					  as the first parameter (default = null)
		 *     error		- An error callback, the result array will be provided 
		 *					  as the first parameter, this will NEVER be called if multiple 
		 *					  api keys were provided, you have to check the results on the success method
		 *					  (default = null)
		 */
		get_groups: function(options) {
			var execute_options = {};
			
			// Direct return if we miss mandatory fields.
			if (check_if_empty(options, 'api_key')) {
				return false;
			}
		
			// Set success callback.
			if (!check_if_empty(options, 'success') && jQuery.isFunction(options['success'])) {
				execute_options['success'] = options['success'];
			}
		
			// Set error callback.
			if (!check_if_empty(options, 'error') && jQuery.isFunction(options['error'])) {
				execute_options['error'] = options['error'];
			}
		
			// Set api key.
			execute_options['api_key'] = options['api_key'];
			
			// Process api command
			execute_request('get_groups', {}, execute_options);
		}
	};

	/**
	 * Checks if the given key is empty within the given values object.
	 * 
	 * @param object values
	 *   The values where to search.
	 * @param string key
	 *   The key to search for.
	 *   
	 * @returns boolean true if the given key is empty within the given values, else false.
	 */
	var check_if_empty = function(values, key) {
		return values[key] === undefined || values[key] === '' || values[key] === null;
	}

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
