# DependencyParsingDemo

DependencyParsingDemo is a web page that shows the results of [KotlinNLP](https://github.com/KotlinNLP "KotlinNLP on GitHub") 
modules: 
[NeuralParser](https://github.com/KotlinNLP/NeuralParser "NeuralParser on GitHub"), 
[NeuralTokenizer](https://github.com/KotlinNLP/NeuralTokenizer "NeuralTokenizer on GitHub") and 
[LanguageDetector](https://github.com/KotlinNLP/LanguageDetector "LanguageDetector on GitHub"). 

Morpho-syntactic information are obtained calling the 
[DependencyTreeServer](https://github.com/KotlinNLP/DependencyTreeServer "DependencyTreeServer on GitHub") backend and
they are represented drawing dependency trees using the 
[DependencyTreeJS](https://github.com/KotlinNLP/DependencyTreeJS "DependencyTreeJS on GitHub") library.


## Requirements

PHP XML
```bash
sudo apt-get install php-xml
```


## Configuration

Create your own configuration file:
```bash
cp config.xml.example config.xml
```

And edit it properly:
```bash
nano config.xml
```


## License

This software is released under the terms of the 
[Mozilla Public License, v. 2.0](https://mozilla.org/MPL/2.0/ "Mozilla Public License, v. 2.0")


## Contributions

We greatly appreciate any bug reports and contributions, which can be made by filing an issue or making a pull 
request through the [github page](https://github.com/KotlinNLP/DependencyParsingDemo "DependencyParsingDemo on GitHub").
