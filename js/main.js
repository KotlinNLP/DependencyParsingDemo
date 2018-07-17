
(function($) {

    var DEBUG = false, // save last analyzed text in cookies and log the response
        KEYPRESS_MIN_INTERVAL = 300, // in milliseconds
        BACKEND_URL =
            BACKEND_CONFIG['protocol'] + "://" +
            BACKEND_CONFIG['host'] + ":" +
            BACKEND_CONFIG['port'] +
            BACKEND_CONFIG['path'],
        NLS_BACKEND_URL =
            NLS_BACKEND_CONFIG['protocol'] + "://" +
            NLS_BACKEND_CONFIG['host'] + ":" +
            NLS_BACKEND_CONFIG['port'] +
            NLS_BACKEND_CONFIG['path'],
        isLoading = false,
        keypressTimeout = null,
        DT = null;
    
    $("#text-input").on("input paste", startTimeout);
    $("#chk-realtime").change(disableTimeout);
    $("#analyze-btn").click(onAnalyzeButtonClick);

    $(document).ready(onReady);

    // --------------------------------------------

    function onReady() {

        initDT();
        inputFocus();

        if (DEBUG) {
            restoreText();
            analyzeText();
        }
    }

    function initDT() {
        DT = $("#dependency-tree").dependencyTree(DT_OPTIONS);
    }

    function inputFocus() {
        $("#text-input").focus();
    }

    function startTimeout() {

        if ($("#chk-realtime").is(':checked')) {

            disableTimeout();

            if (!isLoading) {
                keypressTimeout = setTimeout(analyzeText, KEYPRESS_MIN_INTERVAL)
            }
        }
    }

    function onAnalyzeButtonClick() {

        disableTimeout();

        if (!isLoading) {
            analyzeText();
        }
    }

    function disableTimeout() {

        if (keypressTimeout != null) {
            clearTimeout(keypressTimeout);
        }        
    }

    function analyzeText() {

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
                "url": BACKEND_URL,
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

    function analyzeTextWithNLS() {

        $.ajax({
            "url": NLS_BACKEND_URL,
            "method": "POST",
            "data": JSON.stringify({
                "text": $("#text-input").val()
            }),
            "contentType": "text/plain",
            "dataType": "json",
            "success": onSuccessNLS,
            "error": onError,
            "complete": endLoading
        });
    }

    function onSuccessNLS(data) {

        var converted_data = {
            "lang": data['languages'][0]['iso_a2'],
            "sentences": data['parsed_sentences'].map(convertNLSSentence)
        };

        onSuccess(converted_data);
    }

    function convertNLSSentence(sentence, sentenceID) {

        return {
            "id": sentenceID,
            "atoms": sentence['atoms'].map(convertNLSAtom)
        }
    }

    function convertNLSAtom(atom) {

        return {
            "id": atom['syn']['id'],
            "head": atom['syn']['head'],
            "form": atom['surface']['form'] || "Ø",
            "pos": atom['syn']['edges'][0]['pos'],
            "deprel": atom['syn']['edges'][0]['deprel'],
            "sem": atom['sem'].length > 0 ? atom['sem'] : null,
            "corefs": atom['corefs'].length > 0 ? atom['corefs'].map(convertNLSCoref) : null
        }
    }

    function convertNLSCoref(coref) {

        return {
            "atomId": coref['id'],
            "sentenceId": coref['sent_index']
        }
    }

    function onSuccess(data) {

        if ("error" in data) {

            if (data.error.type == "NOT_SUPPORTED_LANGUAGE") {

                analyzeTextWithNLS();

            } else {
                clearResults();
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

    function clearResults() {

        DT.clear();
        
        $("#language").hide();
        
    }

    function startLoading() {

        isLoading = true;

        $("#analyze-btn").attr("disabled", "disabled");
        $("#analyze-btn-label").hide();
        $("#language-not-supported").hide();
        $("#loading-img").show();
    }

    function endLoading() {

        isLoading = false;

        $("#analyze-btn").removeAttr("disabled");
        $("#loading-img").hide();
        $("#analyze-btn-label").show();
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
