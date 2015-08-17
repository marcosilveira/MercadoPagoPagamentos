// ==UserScript==
// @name         MercadoPagoPagamentos
// @namespace    http://your.homepage/
// @version      0.3
// @description  Modificações na página do ML para exibir pagamentos de boletos pendentes
// @author       Marco Silveira
// @website https://github.com/marcosilveira/MercadoPagoPagamentos
// @downloadURL https://raw.githubusercontent.com/marcosilveira/MercadoPagoPagamentos/master/MercadoPagoPagamentos.js
// @updateURL https://raw.githubusercontent.com/marcosilveira/MercadoPagoPagamentos/master/MercadoPagoPagamentos.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @match   https://www.mercadopago.com/mlb/ferramentas/aplicacoes
// @match	https://myaccount.mercadolivre.com.br/summary
// @match	https://myaccount.mercadolivre.com.br/summary/
// @grant        none
// ==/UserScript==

$(document).ready(function(){

    var _texts = {
        "monthsNames": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ],
        "weekdays": [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sab"
        ]
    };
//************************************************************************************************************    
//************************************************************************************************************    
//************************************************************************************************************    
//************************************************************************************************************    
//************************************************************************************************************    
    //  PAGINA DE RESUMO //
    if ( location.href == 'https://myaccount.mercadolivre.com.br/summary' || location.href == 'https://myaccount.mercadolivre.com.br/summary/'  ) {
        insertBotaoMercadoPago();
    }
    //  PAGINA DE RESUMO //

    function insertBotaoMercadoPago(){
        mp_button = '<li id="MOVIMENTOMP" role="presentation" class="ch-bellows"><a href="https://www.mercadopago.com/mlb/ferramentas/aplicacoes" class="ch-bellows-trigger" target="_blank">Movimento MP</a></li>';
        $('#MOVIMENTOMP').remove();
        $('#CONFIG').after(mp_button);
    }
//************************************************************************************************************    
//************************************************************************************************************    
//************************************************************************************************************    
//************************************************************************************************************    
//************************************************************************************************************    
    //  PAGINA DE CREDENCIAIS //
    if ( location.href == 'https://www.mercadopago.com/mlb/ferramentas/aplicacoes' || location.href == 'https://www.mercadopago.com/mlb/ferramentas/aplicacoes/'  ) {
        $('link[rel=stylesheet][href~="/mlb/ferramentas/resource/css?name=chico-mp.css"]').remove();
        var style = '<div id="loading-image" class="loading-gif"></div>';
        style += '<link rel="stylesheet" href="https://static.mlstatic.com/org-img/ch/ui/1.1.1/themes/mp/chico.min-0.0.2.css" />';
        style += '<link rel="stylesheet" href="https://static.mlstatic.com/org-img/ch/mesh/2.2/mesh.min.css">';
        style += '<link href="https://mercadopago.mlstatic.com/static/OvDN8wBCijR4jZa7waEX3xQIn3xOSsXVXn1waETLX8i.css" type="text/css" rel="stylesheet" media="screen, projection" />';
        style += '<link href="https://mercadopago.mlstatic.com/static/vlyjy7jD3WgJNH9jphHiF3Ef2fACzBcVLNNXrbrqxWM.css" type="text/css" rel="stylesheet" media="screen, projection" />';
        style += '<link href="https://mercadopago.mlstatic.com/static/j3b91GWY5sHgAJryzcr947ByRKXh5UEUYiSO5iCzn4S.css" type="text/css" rel="stylesheet" media="screen, projection" />';
        $('#wrap').append(style);
        var itens  = document.getElementById("credentials").getElementsByTagName("td");
        var item_id = itens[1].innerText;
        var item_cred = itens[3].innerText;
        $('#main').remove();
        $pp = JSON.stringify({
            'grant_type': 'client_credentials',
            'client_id': item_id,
            'client_secret': item_cred,
        });
        $.ajax({
            type: "POST",
            url: 'https://api.mercadopago.com/oauth/token',
            data: $pp,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
        })
        .success(function (data) {
            token = data.access_token;
            expira = data.expires_in;
            userId = data.user_id;
            refreshToken = data.refresh_token;
            var urlsearch = "https://api.mercadopago.com/v1/payments/search?access_token="+token+"&status=pending&payment_method_id=bolbradesco";
            $.ajax({
                type: "GET",
                url: urlsearch,
                contentType: 'application/json',
            })
            .success(function (ret) {
                var response = ret;
                var nPag = response.paging.total;
                var nLimite = response.paging.limit;
                var dataAnt = "";
                var fechaDiv = false;
                var pagamentos= [];
                var index = 0;
                var callQtd = 0;
                do
                {
                    if (index<nPag)
                    {
                        var urlsearch = "https://api.mercadopago.com/v1/payments/search?access_token="+token+"&status=pending&payment_method_id=bolbradesco&offset="+index;
                        callQtd++;
                        $.ajax({
                            type: "GET",
                            url: urlsearch,
                            contentType: 'application/json; charset=utf-8',
                        })
                        .success(function (ret) {
                            for (i = 0; i < ret.results.length; i++) {
                                {
                                    pagamentos.push(ret.results[i]);
                                }
                            }
                            callQtd--;
                        })
                        .complete(function () {
                            if (callQtd==0)
                            {
                                if (pagamentos.length>0)
                                {
                                    pagamentos.sort(sort_by('id', true, parseInt));
                                    for (i = 0; i < pagamentos.length; i++) {
                                        var pgId = pagamentos[i].id;
                                        var pgDesc = unescape(JSON.parse('"' + pagamentos[i].description.replace('"', '\\"') + '"'));
                                        var pgStatus = pagamentos[i].status;
                                        var pgCreated = dateFromUTCString(pagamentos[i].date_created);
                                        pgCreated = pgCreated.getDate() + ' de ' + _texts.monthsNames[(pgCreated.getMonth()+1)-1] + ' de ' +  pgCreated.getFullYear();
                                        var pgCredited = pagamentos[i].money_release_date;
                                        if (pgCredited!=null)
                                        {
                                            pgCredited = dateFromUTCString(pgCredited);
                                            pgCredited = pgCredited.getDate() + ' de ' + (pgCredited.getMonth()+1) + ' de ' +  pgCredited.getFullYear();
                                        }
                                        var pgTipo = pagamentos[i].payment_type_id;
                                        var pgMetodo = pagamentos[i].payment_method_id;
                                        var pgStatus = pagamentos[i].status;
                                        var pgValor = pagamentos[i].transaction_amount+pagamentos[i].shipping_cost;
                                        var pgNickname = unescape(JSON.parse('"' + pagamentos[i].payer.nickname.replace('"', '\\"') + '"'));
                                        var pgPayerId = pagamentos[i].payer.id;
                                        var pgEmail = pagamentos[i].payer.email;
                                        var pgValInt = parseInt(pgValor);
                                        var pgValFrac = parseInt((parseFloat(pgValor)-parseInt(pgValor))*100);
                                        var pgValFracS = pgValFrac.toString();
                                        if (pgValFracS.length==1)
                                            pgValFracS = "0" + pgValFracS;
                                        pgValFrac = pgValFracS;
                                        var divItem = "";
                                        if (dataAnt!=pgCreated)
                                        {
                                            if (fechaDiv==true)
                                            {
                                                divItem += '</div>';
                                            }
                                            divItem += '<div class="transaction-groupedby-date">';
                                            divItem += '<time>'+pgCreated+'</time>';
                                            dataAnt = pgCreated;
                                            fechaDiv = true;
                                        }
                                        divItem    += '<ul class="transaction-list">';
                                        divItem    += '<li class="transaction-list__item mp-box-shadow" id="transaction_order-bb1a79987de9bc9ed3c8c8c87808bee0a47ae0d0">';
                                        divItem    += '   <div class="detail__item">';
                                        divItem    += '      <div class="ch-g1-3">';
                                        divItem    += '         <div class="transaction-list__item-price price price-positive">';
                                        divItem    += '            <span class="price-symbol">R$</span> <span class="price-integer">'+pgValInt+'</span>';
                                        divItem    += '            <span class="price-decimal-mark">,</span>';
                                        divItem    += '            <span class="price-decimal">'+pgValFrac+'</span>';
                                        divItem    += '         </div>';
                                        divItem    += '         <h2 class="truncate">'+pgDesc+'</h2>';
                                        divItem    += '         <p class="truncate email-counterpart"><a href="mailto:'+pgEmail+'" target="_blank">'+pgEmail+'</a></p>';
                                        divItem    += '            <span class="badge badge-square badge-small transaction-list__item-image operations-icons payments-to-meli-icon"></span>';
                                        divItem    += '         </div>';
                                        divItem    += '         <div class="ch-g1-2">';
                                        divItem    += '         <div class="transaction-list__item-status nav__link ch-box-icon">';
                                        if (pgStatus=="approved")
                                            divItem    += '            <i class="sprite-icons cobro-ok-ico status-icons"></i><p>Recebido</p>';
                                        else
                                            divItem    += '            <i class="sprite-icons cobro-wait-ico status-icons"></i><p>Pendente</p>';
                                        divItem    += '         </div>';
                                        if (pgStatus=="approved")
                                            divItem    += '         <div class="transaction-list__item__label"><p>Este pagamento já foi efetuado por <a href="http://perfil.mercadolivre.com.br/profile/showProfile?id='+pgPayerId+'&amp;role=buyer" target="_blank">'+pgNickname+'</a>.</p></div>';
                                        else
                                            divItem    += '         <div class="transaction-list__item__label"><p>Estamos aguardando o pagamento de <a href="http://perfil.mercadolivre.com.br/profile/showProfile?id='+pgPayerId+'&amp;role=buyer" target="_blank">'+pgNickname+'</a>.</p></div>';
                                        //divItem    += '         <div class="transaction-list__item-second-status">';
                                        //divItem    += '            <i id="icoShipping" class="sprite-icons delivery-wait-ico status-icons"></i>';
                                        //divItem    += '            <span id="tagShipping"><p>Em trânsito</p></span>';
                                        divItem    += '         </div>';
                                        divItem    += '      </div>';
                                        divItem    += '   </div>';
                                        divItem    += '</li>';
                                        divItem    += '</ul>';
                                        $('#wrap').append(divItem);
                                    }
                                }
                                else
                                {
                                    var divItem = "";
                                    divItem += '<div class="ch-box-help result filters-zrp">';
                                    divItem += '   <h2>Ops, não encontramos nada</h2>';
                                    divItem += '   <ul class="ch-list">';
                                    //divItem += '      <li>Tente com menos palavras ou dados.</li>';
                                    //divItem += '      <li>O que você mais se lembra ou está mais fácil? Podemos encontrar e-mails, números de operações, valores, banco, quase tudo!</li>';
                                    divItem += '   </ul>';
                                    divItem += '</div>';
                                    $('#wrap').append(divItem);
                                }
                            }
                        });
                        index+=nLimite;
                    }
                }while(index<nPag);
                
               
            })
            
            
        })
        .error(function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            console.log(xhr.responseText);
        })
        .complete(function () {
        });
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
        function dateFromUTCString(s) {
            s = s.split(/[-T:Z]/ig);
            return new Date(Date.UTC(s[0], --s[1], s[2], s[3], s[4], s[5]));
        }
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
        var sort_by = function(field, reverse, primer){

            var key = primer ? 
                function(x) {return primer(x[field])} : 
            function(x) {return x[field]};

            reverse = !reverse ? 1 : -1;

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            } 
        }
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
//**************************************************************************************************************************************
        
    }
    //  PAGINA DE CREDENCIAIS //


})