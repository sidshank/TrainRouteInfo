const Utils = {
    isLoggingEnabled: false,

    outputCount: 0,

    debuglog: function(arg) {
        if (this.isLoggingEnabled) {
            console.log(arg);
        }
    },

    resultlog: function(description, value) {
        console.log("");
        console.log("=============================");
        console.log("Output #" + (++this.outputCount) + ": " + description);
        console.log("=============================");
        if (value !== undefined) {
            console.log(value);
        }
        console.log("");
    }
};

module.exports.Utils = Utils;