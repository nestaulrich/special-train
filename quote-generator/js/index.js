$(window).bind("load", function() {
  
  function quote(){
    $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
        type: 'post',
        data: {

        },
        headers: {
            'X-Mashape-Key': 'SshaTo1WqimshZXzeoUfJvNMeCPSp1PAJsOjsnQ8MA0yPSDGuT'
        },
        dataType: 'json',
        success: function(data) {
            //$('body').fadeIn(50);
            $('.quote>span>p').text('"' + data[0].quote + '"');
            $('.author>span>p').text(data[0].author);
           
            $('#twitter').attr("href","https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text="+ '"' + data[0].quote + '"' + " - " + data[0].author );
        }
    });
}

    $('#btn').click(function(e) {
      e.preventDefault();
       quote();


});
  quote();
  
});