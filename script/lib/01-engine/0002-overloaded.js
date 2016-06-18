'use strict'; {

xxm.overloaded = (args, specs) => {
    let spec;

    for(let key in specs) {
        if(args.length === parseInt(key)) {
            spec = specs[key];
            break;
        }
    }

    if(!spec) {
        if(specs.default) {
            return specs.default.apply(specs, args);
        }
        else {
            throw new TypeError('Bad function arguments');
        }
    }

    return (() => {
        let ret = {};

        for(var i in spec) {
            ret[spec[i]] = args[i];
        }

        return ret;
    })();
};

}
