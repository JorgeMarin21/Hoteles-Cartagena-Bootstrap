    <script>
        $(function() {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
            $('.carousel').carousel({
                interval: 3000
            });
            $('#contacto').on('show.bs.modal', function (e){
                console.log('El modal se está mostrando', e);
                $('#contactoBtn').removeClass('btn-primary');
                $('#contactoBtn').addClass('btn-secondary');
                $('#contactoBtn').prop('disabled', true);
            });
            $('#contacto').on('shown.bs.modal', function (e){
                console.log('El modal se mostró', e);
            });
            $('#contacto').on('hide.bs.modal', function (e){
                console.log('El modal se está ocultando', e);
            });
            $('#contacto').on('hidden.bs.modal', function (e){
                console.log('El modal se ocultó', e);
                $('#contactoBtn').removeClass('btn-secondary');
                $('#contactoBtn').addClass('btn-primary');
                $('#contactoBtn').prop('disabled', false);
            });
        });
    </script>