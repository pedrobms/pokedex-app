$(document).ready(function() {
  $("#pesquisa").on("keyup", function() {
    var searchValue = $(this).val().toLowerCase();
    $('.poke-card').filter(function() {
      $(this).toggle($(this).find('h5').text().toLowerCase().indexOf(searchValue) > -1);
    });
  });
});

/*$('#pesquisa').keyup(function (){
  $('.col-lg-2').removeClass('d-none');
  var filter = $(this).val();
  if (filter && filter.length>0){
      $('.row').find('.col-lg-2 .card-body h5:not(:contains("'+filter+'"))').parentsUntil('.col-lg-4').parent().addClass('d-none');
  }
});*/