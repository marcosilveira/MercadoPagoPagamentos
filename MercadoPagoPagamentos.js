// ==UserScript==
// @name         MercadoPagoPagamentos
// @namespace    http://your.homepage/
// @version      0.5
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
        style += '<link rel="stylesheet" href="https://static.mlstatic.com/org-img/ch/mesh/2.2/mesh.min.css">';
        style += '<link rel="stylesheet" href="https://static.mlstatic.com/org-img/ch/ui/1.1.1/themes/mp/chico.min-0.0.2.css" />';

        var css = '<style type="text/css">';
        css += ' *, *:before, *:after {-webkit-box-sizing: border-box;box-sizing: border-box; } html, body {font-size: 14px;height: 100%;margin: 0 auto;max-width: 100%;min-width: 320px;padding: 0;background-color: #f1f1f1; } p {color: #666; }';
        css += '.transaction-list {background-color: #f1f1f1;}';
        css += ' .transaction-list h2 {position: relative; } .transaction-list__item {min-height: 80px;position: relative;line-height: 20px; } .transaction-list__item-price {padding-bottom: 3px;padding-top: 7px; } .transaction-list__item-image {display: block;right: 10px;opacity: 1;position: absolute;text-align: center;';
        css += ' top: 15px;line-height: 55px;overflow: hidden; } .transaction-list__item-image img {vertical-align: middle; } .transaction-list__item-label a, .transaction-list__item-label a:link, .transaction-list__item-label a:active, .transaction-list__item-label a:hover, .transaction-list__item-label a:visited,';
        css += ' .transaction-list__item-label a:focus, .transaction-list__item-status a, .transaction-list__item-status a:link, .transaction-list__item-status a:active, .transaction-list__item-status a:hover, .transaction-list__item-status a:visited, .transaction-list__item-status a:focus, .transaction-list__item-second-status a,';
        css += ' .transaction-list__item-second-status a:link, .transaction-list__item-second-status a:active, .transaction-list__item-second-status a:hover, .transaction-list__item-second-status a:visited, .transaction-list__item-second-status a:focus { font-weight: bold;color: #666 !important; }';
        css += ' .transaction-list__item-label a:hover, .transaction-list__item-label a:visited, .transaction-list__item-status a:hover, .transaction-list__item-status a:visited, .transaction-list__item-second-status a:hover, .transaction-list__item-second-status a:visited {text-decoration: underline !important; }';
        css += ' .transaction-list__item-label, .transaction-list__item-tag {font-size: 13px;margin-bottom: 0;margin-left: 36px;margin-top: 0;padding-top: 5px;color: #666; } .transaction-list__item-label {display: none; } .transaction-list__item-tag {border-radius: 4px;padding: 5px;line-height: 14px;';
        css += ' margin-bottom: 8px;margin-top: 8px;display: table;width: auto; } .transaction-list__item-tag.tag-archived {background-color: #E4F2F9; } .transaction-list__item-tag.tag-delivery-done, .transaction-list__item-tag.tag-on-way {background: #FFF3C8;color: #aa8749; } .transaction-list__item-status,';
        css += ' .transaction-list__item-second-status {color: #666;border-radius: 0;display: block;font-size: 13px;line-height: 18px;margin-bottom: 0;padding-bottom: 5px;padding-right: 10px;width: 100%; } .transaction-list__item-status p, .transaction-list__item-second-status p {display: inline-block;';
        css += ' vertical-align: text-top;width: 85%; } .transaction-list__item-status {margin-top: 10px;padding-left: 5px;padding-top: 10px; }  money-request-tabs .transaction-list__item-second-status {margin-left: 0;margin-top: 0;padding-left: 3px;padding-top: 0; } money-request-tabs .transaction-list__item-second-status span {';
        css += ' display: inline-block;margin-right: 10px;width: auto; } money-request-tabs .transaction-list__item-second-status span p {width: 100%; } money-request-tabs .transaction-list__item-second-status span:last-child {margin-right: 0; } .transaction-list__item-reference {border-top: 1px dotted #ccc;';
        css += ' color: #666;display: block;font-size: 12px;margin-left: 40px;padding-bottom: 0px;padding-left: 0;padding-right: 25px;padding-top: 10px;width: auto;margin-top: 10px; } .transaction-list__item-actions {display: none; } .transaction-list__item-all-actions-content {background: url("../images/icons-filters.png") no-repeat;';
        css += ' background-position: 0 -50px;display: block;height: 18px;margin-top: 6px;overflow: hidden;text-indent: 99999px;width: 15px; } .transaction-list li {background-color: #fff;border: 1px solid #fff;margin: 1px 0; } .transaction-list a:visited, a:visited .transaction-list__item-actions-detail {color: #880099; }';
        css += ' .transaction-list__item-actions-detail {font-size: 13px;position: absolute;right: 70px;top: 18px; } .transaction-list .ch-pagination li a {background-color: #fff;border: 1px solid #ccc;border-radius: 3px; } .transaction-list .ch-pagination li {background-color: inherit;border: none;margin: 0 5px; }';
        css += ' .transaction-list .ch-pagination li a:hover {background-color: #0099e3;border-color: #fff;color: #fff; } .transaction-list .ch-pagination .ch-pagination-current a {background-color: #ccc; } .transaction-list .transaction-groupedby-date {margin: 20px 0; } .transaction-list .transaction-groupedby-date time {';
        css += ' margin-left: 10px;margin-bottom: 5px;display: block;font-size: 13px;color: #999; }';
        css += ' .detail__item {padding: 5px 10px 0 0;position: relative;width: 100%;} .detail__item h2, .detail__item p.email-counterpart, .detail__item p.name-counterpart {color: #666;font-family: Arial, sans-serif;font-size: 13px;margin-bottom: 0;margin-left: 36px;margin-top: 0;min-height: 25px;line-height: 23px;padding-bottom: 0;';
        css += ' padding-top: 0; } .detail__item .email-counterpart a, .detail__item .email-counterpart a:active, .detail__item .email-counterpart a:visited, .detail__item .email-counterpart a:focus {color: #999; }';
        css += ' .detail__item .ch-icon-ok-sign, .detail__item .ch-icon-remove-sign, .detail__item .ch-icon-time, .detail__item .ch-icon-undo, .detail__item .ch-icon-warning-sign {margin: 5px 0;left: 0;}';
        css += ' .detail .price-symbol, .detail__item .price-symbol {text-align: right;width: 30px; } .detail .price-symbol.mlv, .detail__item .price-symbol.mlv {width: 35px; } .detail .price-small .price-symbol, .detail__item .price-small .price-symbol {width: 15px; } .detail .price-small .price-symbol.mlv, .detail__item .price-small .price-symbol.mlv {width: 30px; }';
        css += ' @media screen and (min-width: 768px) { .detail { } .detail__item { min-height: 110px; padding: 15px 10px 10px 90px; overflow: hidden; } .detail__item email a, .detail__item .counterpart {display: block;font-weight: bold;margin-left: 36px;color: #666;font-size: 13px; } .detail__payment,';
        css += ' .detail__operation, .detail__shipping {max-width: 420px; } .detail__print {display: inline-block; } .detail .transaction-list__item-status {margin-top: 0;padding-bottom: 0; } }';
        css += ' @media screen and (min-width: 1024px) { .detail__item {padding: 15px 10px 10px 110px; } }';
        css += ' @media screen and (min-width: 768px) { .transaction-list__item-price {font-size: 24px;left: auto;line-height: 30px;padding-top: 0px;right: 35%; } .transaction-list__item-status, .transaction-list__item-second-status {border-top: none;display: inline-block;margin-bottom: 0;margin-top: 5px;';
        css += ' padding-bottom: 0;padding-right: 0;padding-top: 0;vertical-align: middle; } .transaction-list__item-status p, .transaction-list__item-second-status p {width: auto; } .transaction-list__item-second-status {padding-top: 0; } .transaction-list__item-reference {width: 85%; } .transaction-list__item-actions {';
        css += ' display: block;position: absolute;right: 15px;text-align: right;top: 10px; } .transaction-list__item-actions .ch-dropdown-trigger:before {background: url("https://mercadopago.mlstatic.com/images/icons.png") no-repeat;background-position: 3px -42px;content: " ";display: inline-block;height: 25px;position: relative;width: 20px; }';
        css += ' .transaction-list .nav__link:after {display: none; } .transaction-list__item-image {left: 20px; } a .transaction-list__item-actions-detail:visited {color: #880099; } a .transaction-list__item-actions-detail {text-decoration: underline; } .transaction-list__item { } .transaction-list__item-label {';
        css += ' display: inline-block; } .all-transaction-link {float: inherit;margin-left: 10px;margin-right: 0;margin-top: 0; } .transaction-list__item .no-wrap-text {white-space: nowrap;display: block;padding-left: 37px; } .money-request-tabs .transaction-list__item-status {margin-top: 5px; } .bookmark-brand.mshop:after,';
        css += ' .bookmark-brand.mlibre:after {left: 36px;top: 62px; } }';
        css += ' .price {color: #333;font-family: Lato, sans-serif;font-size: 24px;font-weight: 300;vertical-align: middle;} .price-symbol, .price-decimal {font-size: 14px;font-weight: 400; } .price-symbol {display: inline-block;line-height: 24px;vertical-align: text-top; } .price-decimal {line-height: 22px;margin-left: 1px;';
        css += ' vertical-align: text-top; } .price-decimal-mark {display: inline-block;overflow: hidden;vertical-align: top;width: 1px; } .price-neutral {color: #999; } .price-neutral .price-symbol:before {content: " ";padding-left: 10px; } .price-positive {color: #00b200; } .price-positive .price-symbol:before {content: "+"; }';
        css += ' .price-negative {color: #950500; } .price-negative .price-symbol:before {content: "-"; } .price-small {font-family: Arial, sans-serif;font-size: 14px;font-weight: 400; } .price-small .price-decimal, .price-small .price-symbol {font-size: 11px;line-height: 14px; } .price-large {font-size: 40px;line-height: 40px;';
        css += ' vertical-align: text-top; } .price-large .price-symbol, .price-large .price-decimal {font-size: 20px;font-weight: 300;line-height: 37px; } .price-large .price-integer {line-height: 40px;letter-spacing: -2px; }';
        css += ' .operations-icons {background: url("https://mercadopago.mlstatic.com/images/operation-type-icons.png") no-repeat #f4f4f4;display: block;text-indent: 99999px; } .operations-icons.withdraw-icon {background-position: 12px 8px; } .operations-icons.regular-payments-icon {background-position: 11px -87px; } .operations-icons.recurring-payments-icon {';
        css += ' background-position: 10px -188px; } .operations-icons.cellphone-fund-icon {background-position: 10px -290px; } .operations-icons.payments-to-meli-icon {background-position: 15px -389px; } .operations-icons.account-fund-icon {background-position: 6px -487px; } .operations-icons.person-icon {background-position: 12px -589px; }';
        css += ' .operations-icons.point-icon {background-position: 12px -687px; }';
        css += ' @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) { .operations-icons {background: url("https://mercadopago.mlstatic.com/images/operation-type-icons@2x.png") no-repeat #f4f4f4;background-size: 62px 748px;display: block;text-indent: 99999px; } }';
        css += ' @media screen and (min-width: 1024px) { .operations-icons.withdraw-icon {background-position: 19px 16px; } .operations-icons.regular-payments-icon {background-position: 18px -80px; } .operations-icons.recurring-payments-icon {background-position: 17px -180px; } .operations-icons.cellphone-fund-icon {background-position: 17px -282px; } .operations-icons.payments-to-meli-icon {';
        css += ' background-position: 23px -380px; } .operations-icons.account-fund-icon {background-position: 15px -478px; } .operations-icons.person-icon {background-position: 20px -582px; } .operations-icons.point-icon {background-position: 19px -680px; } .transaction-list__item-image {line-height: 72px; } .transaction-list__item .no-wrap-text {';
        css += ' white-space: nowrap;display: inline;padding-left: 0; } .bookmark-brand.mshop:after, .bookmark-brand.mlibre:after {left: 44px;top: 78px; } }';
        css += ' .sprite-icons {background-image: url("https://mercadopago.mlstatic.com/images/status-icons.png");background-repeat: no-repeat;display: inline-block;vertical-align: middle; } .cobro-ico, .cobro-ok-ico, .cobro-wait-ico, .cobro-error-ico, .cobro-warning-ico, .cobro-info-ico, .cobro-refund-ico, .delivery-ico, .delivery-ok-ico, .delivery-wait-ico, .delivery-error-ico, .delivery-warning-ico,';
        css += ' .delivery-user-ico, .delivery-user-ok-ico, .ok-ico, .error-ico, .time-ico, .reclamos-ico, .reclamos-close-ico, .archived-operation, .delivery-prepared {width: 30px;height: 30px; } .cobro-wait-ico {background-position: -60px -33px; }';
        css += ' .nav {background-color: #fff;margin-bottom: 5px;} .nav__box {border: 1px solid #ccc;border-radius: 4px;background-color: #fff;margin-bottom: 5px;} .nav__box.no-border {border: none;border-radius: 0;margin-bottom: 0;} .nav__box .nav__checks .nav__item {border-bottom: none;} .nav__box .nav__item {border-bottom: 1px dotted #ccc;}';
        css += ' .nav__box .nav__item:last-child {border-bottom: none;} .nav__item {border-top: none;} .nav__item:last-child {border-bottom: none;} .nav__link {font-size: 14px;text-decoration: none;display: block;min-height: 30px;padding: 12px 25px 12px 12px;position: relative;z-index: 1;} .nav__link-center {text-align: center;}';
        css += ' .nav__link.nav__link-center:after { display: none; } .nav__link:after {color: #ccc;content: \'\f054\';line-height: 26px;font-size: 14px;font-family: icons;display: block;position: absolute;right: 5px;top: 14px; } .nav__checks .nav__item {display: block;line-height: 20px;padding: 12px 10px 12px 20px;position: relative;';
        css += ' text-decoration: none;border-top: 1px dotted #ccc;} .nav__checks .nav__item:last-child {border-bottom: none; } .nav__checks .nav__item input + label {font-size: 14px;} .nav__checks .nav__item .expadable-approved {display: inline-block; }';
        css += ' @media screen and (min-width: 768px) { .transaction-list .nav__link:after {display: none; } }';
        css += '</style>';
        
        $('#wrap').append(style);
        $('#wrap').append(css);
        
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
                                            divItem    += '         <div class="transaction-list__item-label"><p>Este pagamento já foi efetuado por <a href="http://perfil.mercadolivre.com.br/profile/showProfile?id='+pgPayerId+'&amp;role=buyer" target="_blank">'+pgNickname+'</a>.</p></div>';
                                        else
                                            divItem    += '         <div class="transaction-list__item-label"><p>Estamos aguardando o pagamento de <a href="http://perfil.mercadolivre.com.br/profile/showProfile?id='+pgPayerId+'&amp;role=buyer" target="_blank">'+pgNickname+'</a>.</p></div>';
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