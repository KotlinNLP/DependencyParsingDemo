<!DOCTYPE html>
<?php
    $xml_config = simplexml_load_file("config.xml") or die("Error: Cannot read XML config file");
    $GA_TRACKING_ID = $xml_config->GA_TRACKING_ID;
?>
<html>
    <head>
        <meta charset="utf-8">
        <title>Dependency Parsing</title>
        <meta name="description" content="A demo that shows the results of KotlinNLP modules: NeuralParser, 
        NeuralTokenizer and LanguageDetector. Morpho-syntactic information are represented drawing dependency trees.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" type="text/css" href="css/checkbox.min.css">
        <link rel="stylesheet" type="text/css" href="css/font.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=<?= $GA_TRACKING_ID ?>"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '<?= $GA_TRACKING_ID ?>');
        </script>
    </head>
    <body>

        <div id="main-container">

            <!-- HEADER -->
            <div id="header-section">
                
                <div id="main-logo">
                    <a href="https://github.com/KotlinNLP" target="_blank" title="KotlinNLP on GitHub">
                        <span>Powered by</span>
                        <br>
                        <img src="img/logo.png">
                    </a>
                </div>

                <div id="page-title">
                    <h1>Dependency Parsing Demo</h1>
                </div>

                <div id="description">
                    <p>
                        A demo that shows the results of 
                        <a href="https://github.com/KotlinNLP" target="_blank" title="KotlinNLP on GitHub">
                            <img src="img/logo.png">
                        </a>
                        modules: 
                        <a href="https://github.com/KotlinNLP/NeuralParser" target="_blank" title="NeuralParser on GitHub">NeuralParser</a>,
                        <a href="https://github.com/KotlinNLP/NeuralTokenizer" target="_blank" title="NeuralTokenizer on GitHub">NeuralTokenizer</a> and
                        <a href="https://github.com/KotlinNLP/LanguageDetector" target="_blank" title="LanguageDetector on GitHub">LanguageDetector</a>.
                        <br>
                        Morpho-syntactic information are represented drawing dependency trees.
                    </p>
                </div>

            </div>

            <!-- INPUT -->
            <div id="input-section">
                <div class="background-light"></div>

                <textarea id="text-input" class="border-box" placeholder="Insert here the text to parse."></textarea>

                <div id="chk-realtime-container" class="ui toggle checkbox">
                    <span id="chk-realtime-title">Realtime</span>
                    <input type="checkbox" id="chk-realtime" name="chk-realtime" checked="checked">
                    <label id="chk-realtime-label" for="chk-realtime"></label>
                </div>

                <button id="parse-btn">
                    <span id="parse-btn-label">Parse</span>
				    <img id="loading-img" src="img/loading.gif">
                </button>
                
            </div>

            <!-- RESULTS -->
            <div id="results" class="border-box">
                
                <div id="before-tree">
                    <div id="language">Detected language: <span id="lang-code"></span></div>
                    <div id="language-not-supported">Not supported</div>
                </div>

                <div id="dependency-tree" class="border-box"></div>
            </div>

        </div>

        <script src="js/jquery-3.0.0.min.js"></script>
        <script src="js/raphael.min.js"></script>
        <script src="js/checkbox.min.js"></script>
        <script src="js/dependency-tree.min.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
