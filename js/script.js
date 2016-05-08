//Geymir gögn frá api
var model = {
    lotto: {},
    vkLotto: {},
    euroJackpot: {},
    currentWeek: 0,
    curretGame:""
};

var octopus = {
    //Sækir gögn frá apis.is og hleður inn í model
    init:function() {
        $.getJSON("json/lotto.json", function (data) {
            model.lotto = data;
        });
        $.getJSON("json/vklotto.json", function (data) {
            model.vkLotto = data;
        });
        $.getJSON("json/eurojackpot.json", function (data) {
            model.euroJackpot = data;
        });
        this.listener();
    },
    //Function sem hlustar eftir click event
    listener:function(){
        //Birtir nýustu lottó tölur
        $(".tolur").click(function(){
            $(".lotto-tolur").removeClass("hide");
            $(".lotto-tolfradi").addClass("hide");
            $(".active").removeClass("active");
            $(".1").addClass("active");
            model.currentWeek = 0;
            viewLotto.render(0);
        });
        //Birti form til að athuga tölur
        $(".tolfradi").click(function(){
            $(".lotto-tolfradi").removeClass("hide");
            $(".lotto-tolur").addClass("hide");
            viewTolfradi.render();
        });
        //Stjjórnar hvaða vika er lesin upp úr áhveðnum leik
        //Setur currentWeek á 0
        $(".1").click(function(){
            $(".active").removeClass("active");
            $(".1").addClass("active");
            model.currentWeek = 0;
            viewLotto.render(0);
        });
        //Setur currentWeek á 1
        $(".2").click(function(){
            $(".active").removeClass("active");
            $(".2").addClass("active");
            model.currentWeek = 1;
            viewLotto.render();
        });
        //Setur currentWeek á 2
        $(".3").click(function(){
            $(".active").removeClass("active");
            $(".3").addClass("active");
            model.currentWeek = 2;
            viewLotto.render();
        });
        //Setur currentWeek á 3
        $(".4").click(function(){
            $(".active").removeClass("active");
            $(".4").addClass("active");
            model.currentWeek = 3;
            viewLotto.render();
        });
        //Stjórnar hvaða leikur er sýndur
        //Sýnir Lottó
        $(".lotto-lotto").click(function() {
            $(".active").removeClass("active");
            $(".lotto-lotto").addClass("active");
            $(".1").addClass("active");
            model.currentGame = "Lottó";
            viewLotto.render();
            viewTolfradi.render();
        });
        //Sýnir Víkinga lottó
        $(".lotto-vklotto").click(function() {
            $(".active").removeClass("active");
            $(".lotto-vklotto").addClass("active");
            $(".1").addClass("active");
            model.currentGame = "Víkinga lottó";
            viewLotto.render();
            viewTolfradi.render();
        });
        //Sýnir EuroJackpot
        $(".lotto-ej").click(function() {
            $(".active").removeClass("active");
            $(".lotto-ej").addClass("active");
            $(".1").addClass("active");
            model.currentGame = "Euro Jackpot";
            viewLotto.render();
            viewTolfradi.render();
        });
        //Tekur inn tölur og ber þær saman við vinnings tölur
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