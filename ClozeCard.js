// require fs
var fs = require("fs");

module.exports = ClozeCard;

// constructor for ClozeCard
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, '_____');
    
    this.create = function() {
        var input = {
            text: this.text,
            cloze: this.cloze,
            type: "cloze"
        };

    };
};