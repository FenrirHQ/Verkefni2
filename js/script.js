$(document).ready(function(){
   //Geymir gögn frá api
    var model = {
        lotto: {},
        vkLotto: {},
        euroJackpot: {},
        currentWeek: 0,
        curretGame:"",
        //lottoTemplate:" <label>Tala 1</label><input type='text'> <label>Tala 2</label><input type='text'> <label>Tala 3</label><input type='text'> <label>Tala 4</label><input type='text'> <label>Tala 5</label><input type='text'> ",
        //vklottoTemplate:"<label>Tala 1</label><input type='text'> <label>Tala 2</label><input type='text'> <label>Tala 3</label><input type='text'> <label>Tala 4</label><input type='text'> <label>Tala 5</label><input type='text'><label>Tala 6</label><input type='text'>",
        //ejlottoTemplate:"<label>Tala 1</label><input type='text'> <label>Tala 2</label><input type='text'> <label>Tala 3</label><input type='text'> <label>Tala 4</label><input type='text'> <label>Tala 5</label><input type='text'><label>Stjarna 1</label><input type='text'><label>Stjarna 2</label><input type='text'>",
    };

    var octopus = {
        //Sækir gögn frá apis.is og hleður inn í model
        init:function(){
            $.getJSON("json/lotto.json", function(data){
                model.lotto = data;
                console.log(data);
            }).done(function(){viewLotto.render(0)});
            $.getJSON("json/vklotto.json", function(data){
                model.vkLotto = data;
            }).done(function(){viewLotto.render(0)});
            $.getJSON("json/eurojackpot.json", function(data){
                model.euroJackpot = data;
            }).done(function(){viewLotto.render(0)});
            $(".tolur").click(function(){
                $(".lotto-tolur").removeClass("hide");
                $(".lotto-tolfradi").addClass("hide");
                $(".active").removeClass("active");
                $(".1").addClass("active");
                model.currentWeek = 0;
                viewLotto.render(0);
            });
            $(".tolfradi").click(function(){
                $(".lotto-tolfradi").removeClass("hide");
                $(".lotto-tolur").addClass("hide");
                viewTolfradi.render();
            });
            //hlustar eftir click event
            $(".1").click(function(){
                $(".active").removeClass("active");
                $(".1").addClass("active");
                model.currentWeek = 0;
                viewLotto.render(0);
            });
            //hlustar eftir click event
            $(".2").click(function(){
                $(".active").removeClass("active");
                $(".2").addClass("active");
                model.currentWeek = 1;
                viewLotto.render();
            });
            //hlustar eftir click event
            $(".3").click(function(){
                $(".active").removeClass("active");
                $(".3").addClass("active");
                model.currentWeek = 2;
                viewLotto.render();
            });
            //hlustar eftir click event
            $(".4").click(function(){
                $(".active").removeClass("active");
                $(".4").addClass("active");
                model.currentWeek = 3;
                viewLotto.render();
            });
            $(".lotto-lotto").click(function() {
                $(".active").removeClass("active");
                $(".lotto-lotto").addClass("active");
                $(".1").addClass("active");
                model.currentGame = "Lottó";
                viewLotto.render();
                viewTolfradi.render();
            });
            $(".lotto-vklotto").click(function() {
                $(".active").removeClass("active");
                $(".lotto-vklotto").addClass("active");
                $(".1").addClass("active");
                model.currentGame = "Víkinga lottó";
                viewLotto.render();
                viewTolfradi.render();
            });
            $(".lotto-ej").click(function() {
                $(".active").removeClass("active");
                $(".lotto-ej").addClass("active");
                $(".1").addClass("active");
                model.currentGame = "Euro Jackpot";
                viewLotto.render();
                viewTolfradi.render();
            });
            $(".go").click(function(){
                $(".results").html("WORK IN PROGRESS");
            })
        },
        //Nær í tiltekin gögn frá model
        getData:function(game, num){
            num = model.currentWeek;
            if(game === "Lottó")
            {
                game = model.lotto;
            }
            else if(game === "Víkinga lottó")
            {
                game = model.vkLotto;
            }
            else if (game === "Euro Jackpot")
            {
                game = model.euroJackpot;
            }

            return  game.results[num];
        }
    };

//Birtir Lottó tölur fyrir hvern leik

//Lottó
    var viewLotto = {
        //Kallar á octupus function til að fá nýustu tölur
        render:function(){
            var lottoGogn = octopus.getData(model.currentGame, model.currentWeek);
            $(".lotto-name").html(model.currentGame);
            $(".lotto").html("Tölur: " + lottoGogn.lotto);
            $(".lotto-joker").html("Jóker: " + lottoGogn.joker);
            $(".lotto-prize").html("Pottur: " + lottoGogn.prize);
            $(".lotto-date").html("Dagsettning: " + lottoGogn.date);
        }
    };

    var viewTolfradi = {
        render:function(){
            this.getTemplate(model.currentGame);
        },
        getTemplate:function(game){
            if(game === "Lottó")
            {
                game = "lottoTemplate.html";
            }
            else if(game === "Víkinga lottó")
            {
                game = "vklottoTemplate.html";
            }
            else if (game === "Euro Jackpot")
            {
                game = "ejTemplate.html";
            }
            $(".user-numbers").load(game);
        }
    }

    octopus.init();

});

