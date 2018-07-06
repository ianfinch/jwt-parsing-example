const quote = "Until the philosophy which holds one race superior and another inferior is finally and permanently discredited and abandoned, everywhere is war." +
              "And until there are no longer first-class and second-class citizens of any nation, until the colour of a man's skin is of no more dignificance than the colour of his eyes." +
              "And until the basic human rights are equally guaranteed to all without regard to race, there is war";

console.log(
    quote
        .split("")
        .map(x => x.charCodeAt(0).toString(16))
        .reduce((r, x) => {
            if (r.length % 35 === 0) {
                r = r + "\n";
            }
            return r + " " + x;
        }, "")
        + "\n"
);
