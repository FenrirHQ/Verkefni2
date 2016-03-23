$(document).ready(function(){
   //Geymir gögn frá api
    var model = {
        lotto: {},
        vkLotto: {},
        euroJackpot: {},
        currentWeek: 0
    };

    var octopus = {
        //Sækir gögn frá apis.is og hleður inn í model
        init:function(){
            $.getJSON("http://apis.is/lottery", function(data){
                model.lotto = data;
                console.log(data);
            }).done(function(){viewLotto.init()});
            $.getJSON("http://apis.is/lottery/vikingalotto", function(data){
                model.vkLotto = data;
            }).done(function(){viewLotto.init()});
            $.getJSON("http://apis.is/lottery/eurojackpot", function(data){
                model.euroJackpot = data;
            }).done(function(){viewLotto.init()});
            //hlustar eftir click event
            $(".1").click(function(){
                model.currentWeek = 0;
                viewLotto.render(0);
            });
            //hlustar eftir click event
            $(".2").click(function(){
                model.currentWeek = 1;
                viewLotto.render(1);
            });
            //hlustar eftir click event
            $(".3").click(function(){
                model.currentWeek = 2;
                viewLotto.render(2);
            });
            //hlustar eftir click event
            $(".4").click(function(){
                model.currentWeek = 3;
                viewLotto.render(3);
            });

        },
        //Nær í tiltekin gögn frá model
        getData:function(game, num){
            num = model.currentWeek;
            if(game === "lotto")
            {
                game = model.lotto;
            }
            else if(game === "vkLotto")
            {
                game = model.vkLotto;
            }
            else if (game === "euroJackpot")
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
        init:function(){
            var lottoGogn = octopus.getData("lotto",0);
            var vkGogn = octopus.getData("vkLotto",0);
            var ejGogn = octopus.getData("euroJackpot",0);
            $("#lotto").html(lottoGogn.lotto);
            $("#vkLotto").html(vkGogn.lotto);
            $("#euroJackpot").html(ejGogn.lotto);
        },
        //Má hugsanlega sleppa þessu falli en hef það hér ef ég breyti hvernig init virkar
        render:function(num){
            var lottoGogn = octopus.getData("lotto",num);
            var vkGogn = octopus.getData("vkLotto",num);
            var ejGogn = octopus.getData("euroJackpot",num);
            $("#lotto").html(lottoGogn.lotto);
            $("#vkLotto").html(vkGogn.lotto);
            $("#euroJackpot").html(ejGogn.lotto);
        }
    };

    octopus.init();

});

