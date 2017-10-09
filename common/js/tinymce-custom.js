( function( window, jQuery, _ ) {
	tinymce.PluginManager.add( 'shapeshifter_button', function( editor, url ) {

		editor.on( 'GetContent', function( event ){

			// Escape
			$withWrapper = $( '<div class="tinymce-wrapper"></div>' ).append( event.content )
			event.content = escapeAttsValuesOnHTMLEditor( $withWrapper );

		});

		function escapeAttsValuesOnHTMLEditor( $eventContent ) {

			$eventContent.find( '*' ).each( function( index ) {

				// Data
				var $this = $( this );
				var atts = $this.context.attributes;
				var attsNum = atts.length;

				// Exec
				if( attsNum == 0 )
					return;
				for( var i = 0; i < attsNum; i++ ) {
					$this.attr( atts[ i ].name, _.escape( $this.attr( atts[ i ].name ) ) );
				}

			});

			return $eventContent.html();

		}

	});
}) ( window, jQuery, _ );