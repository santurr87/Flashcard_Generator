// require fs
var fs = require("fs");

module.exports = BasicCard;

// constructor for BasicCard
function BasicCard(front, back) {
    this.front = front;
    this.back = back;
    
    this.create = function() {
        var input = {
            front: this.front,
            back: this.back,
            type: "basic",
        };
	};
};