
(function() {

    var TEXT_COLOR = "#EAEAEA",
        LINE_NORMAL_COLOR = "#A3ADC7",
        LINE_HOVER_COLOR = "#FF9C2F",
        LINE_CLICK_COLOR = "#5496DC";

    window.DT_OPTIONS = {
        "styles": {
            "atom": {
                "rect": {
                    "normal": {
                        "stroke": LINE_NORMAL_COLOR
                    },
                    "hover": {
                        "stroke": LINE_HOVER_COLOR,
                        "stroke-width": 2,
                        "fill": ""
                    },
                    "click": {
                        "stroke": LINE_CLICK_COLOR,
                        "stroke-width": 2,
                        "fill": ""
                    }
                },
                "form": {
                    "normal": {
                        "fill": TEXT_COLOR,
                        "font": "1em proxima-nova"
                    },
                    "hover": {
                        "fill": TEXT_COLOR,
                        "font": "1em proxima-nova"
                    },
                    "click": {
                        "fill": TEXT_COLOR,
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
                        "fill": LINE_HOVER_COLOR,
                        "font-weight": "bold",
                        "font": "0.9em proxima-nova"
                    },
                    "click": {
                        "fill": LINE_CLICK_COLOR,
                        "font-weight": "bold",
                        "font": "0.9em proxima-nova"
                    }
                }
            },
            "deprel": {
                "normal": {
                    "fill": LINE_NORMAL_COLOR,
                    "font": "1em proxima-nova",
                    "font-weight": "bold"
                },
                "hover": {
                    "fill": LINE_HOVER_COLOR,
                    "font": "1em proxima-nova",
                    "font-weight": "bold"
                },
                "click": {
                    "fill": LINE_CLICK_COLOR,
                    "font": "1em proxima-nova",
                    "font-weight": "bold"
                },
                "path": {
                    "spacing": 14,
                    "normal": {
                        "stroke": LINE_NORMAL_COLOR
                    },
                    "hover": {
                        "stroke": LINE_HOVER_COLOR
                    },
                    "click": {
                        "stroke": LINE_CLICK_COLOR
                    }
                },
                "padding": {
                  "horizontal": 15
                },
                "spacing": 5
            }
        }
    };
})();
