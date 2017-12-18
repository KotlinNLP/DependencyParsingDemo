
(function($) {

    var DEBUG = false, // save last parsed text in cookies and log the response
        KEYPRESS_MIN_INTERVAL = 300, // in milliseconds
        isLoading = false,
        keypressTimeout = null,
        normalColor = "#A3ADC7",
        hoverColor = "#FF9C2F",
        clickColor = "#5496DC",
        DT = null;
    
    $("#text-input").on("input paste", startTimeout);
    $("#chk-realtime").change(disableTimeout);
    $("#parse-btn").click(onParseButtonClick);

    $(document).ready(onReady);

    // --------------------------------------------

    function onReady() {

        initDT();

        $("#text-input").focus();

        if (DEBUG) {
            restoreText();
            parseText();
        }
    }

    function initDT() {

        var options = {
                "styles": {
                    "atom": {
                        "rect": {
                            "normal": {
                                "stroke": normalColor
                            },
                            "hover": {
                                "stroke": hoverColor,
                                "stroke-width": 2,
                                "fill": ""
                            },
                            "click": {
                                "stroke": clickColor,
                                "stroke-width": 2,
                                "fill": ""
                            }
                        },
                        "form": {
                            "normal": {
                                "fill": "#EAEAEA",
                                "font": "1em proxima-nova"
                            },
                            "hover": {
                                "fill": "#EAEAEA",
                                "font": "1em proxima-nova"
                            },
                            "click": {
                                "fill": "#EAEAEA",
                                "font": "1em proxima-nova"
                            }
                        },
                        "pos": {
                            "spacing": 5,
                            "normal": {
                                "fill": "#A09DE9",
                                "font-weight": "bold",
                                "font": "0.9em proxima-nova"
                            },
                            "hover": {
                                "fill": hoverColor,
                                "font-weight": "bold",
                                "font": "0.9em proxima-nova"
                            },
                            "click": {
                                "fill": clickColor,
                                "font-weight": "bold",
                                "font": "0.9em proxima-nova"
                            }
                        }
                    },
                    "deprel": {
                        "normal": {
                            "fill": normalColor,
                            "font": "1em proxima-nova",
                            "font-weight": "bold"
                        },
                        "hover": {
                            "fill": hoverColor,
                            "font": "1em proxima-nova",
                            "font-weight": "bold"
                        },
                        "click": {
                            "fill": clickColor,
                            "font": "1em proxima-nova",
                            "font-weight": "bold"
                        },
                        "path": {
                            "spacing": 14,
                            "normal": {
                                "stroke": normalColor
                            },
                            "hover": {
                                "stroke": hoverColor
                            },
                            "click": {
                                "stroke": clickColor
                            }
                        },
                        "padding": {
                          "horizontal": 15
                        },
                        "spacing": 5
                    }
                }
            };
    
        DT = $("#dependency-tree").dependencyTree(options);
    }

    function startTimeout() {

        if ($("#chk-realtime").is(':checked')) {

            disableTimeout();

            if (!isLoading) {
                keypressTimeout = setTimeout(parseText, KEYPRESS_MIN_INTERVAL)
            }
        }
    }

    function onParseButtonClick() {

        disableTimeout();

        if (!isLoading) {
            parseText();
        }
    }

    function disableTimeout() {

        if (keypressTimeout != null) {
            clearTimeout(keypressTimeout);
        }        
    }

    function parseText() {

        startLoading();

        var text = $("#text-input").val();

        if (DEBUG) {
            saveText(text);
        }
    	
        if ($.trim(text) === "") {

            clearResults();

            endLoading();

        } else {

            $.ajax({
                "url": "http://dependencyparsing.com:30000/parse",
                "method": "POST",
                "data": {
                    "text": text
                },
                "dataType": "json",
                "success": onSuccess,
                "error": onError,
                "complete": endLoading
            });
        }
    }

    function onSuccess(data) {

        if ("error" in data) {
                
            clearResults();

            if (data.error.type == "NOT_SUPPORTED_LANGUAGE") {
                
                notSupportedLanguage(data.error.data.lang);

            } else {
                console.error("NLP Server error: " + data.error.type);
            }
            
        } else {

            if (DEBUG) {
                console.log(data);
            }

            DT.draw(data['sentences']);
            setLanguage(data['lang']);
        }
    }

    function onError(jqXHR) {
        
        console.error("NLP Server error: [" + jqXHR.status + "] " + jqXHR.statusText);

        clearResults();
    }

    function notSupportedLanguage(isoCode) {

        $("#language-not-supported").show();

        setLanguage(isoCode, false);
    }

    function clearResults() {

        DT.clear();
        
        $("#language").hide();
        
    }

    function startLoading() {

        isLoading = true;

        $("#parse-btn").attr("disabled", "disabled");
        $("#parse-btn-label").hide();
        $("#language-not-supported").hide();
        $("#loading-img").show();
    }

    function endLoading() {

        isLoading = false;

        $("#parse-btn").removeAttr("disabled");
        $("#loading-img").hide();
        $("#parse-btn-label").show();
    }

    function setLanguage(isoCode, supported) {

        supported = typeof supported !== 'undefined' ? supported : true; // default = true

        var languageDiv = $("#language");

        if (supported) {
            languageDiv.removeClass("not-supported");
        } else {
            languageDiv.addClass("not-supported");
        }
        
        languageDiv.show();
        $("#lang-code").text(isoCode.toUpperCase());
    }

    function saveText(text) {
        setCookie("last-input-text", text);
    }

    function restoreText() {

        var prevText = getCookie("last-input-text");

        if (prevText != "" && !isLoading) {
            $("#text-input").val(prevText);
        }
    }

    function setCookie(cname, cvalue, exdays) {

        exdays = typeof exdays !== 'undefined' ? exdays : 1; // default = 1

        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));

        var expires = "expires="+ d.toUTCString();

        document.cookie = cname + "=" + encodeURI(cvalue) + ";" + expires + ";path=/";
    }

    function getCookie(cname) {

        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return decodeURI(c.substring(name.length, c.length));
            }
        }

        return "";
    }

})(jQuery);
