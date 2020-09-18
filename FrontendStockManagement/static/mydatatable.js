$('.dataex-html5-selectors').DataTable( {
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'copyHtml5',
            exportOptions: {
                columns: [ 0, ':visible' ]
            }
        },
        {
            extend: 'pdfHtml5',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            text: 'JSON',
            action: function ( e, dt, button, config ) {
                var data = dt.buttons.exportData();

                $.fn.dataTable.fileSave(
                    new Blob( [ JSON.stringify( data ) ] ),
                    'Export.json'
                );
            }
        },
        {
            extend: 'print',
            exportOptions: {
                columns: ':visible'
            }
        }
    ]
});