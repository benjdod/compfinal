class LoaderCache {
    constructor() {
        this.entries = {}
    }

    add(key, expiresIn, loader) {

        const x = expiresIn*1000

        this.entries[key] = {
            data: undefined,
            loader: loader,
            exp: x,
            maxAge: Date.now() + x
        }
    } 

    remove(key) {
        if (this.entries[key])
            this.entries[key] = undefined;
    }

    async reload() {
        let i;
        for (i = 0; i < arguments.length; i++) {
            const k = arguments[i];
            if (this.entries[k] !== undefined) {
                try {
                    this.entries[k].data = await this.entries[k].loader();
                    this.entries[k].maxAge = Date.now() + this.entries[k].exp;
                } catch (e) {
                    console.error(e);
                }
            }
        }

        return null;
        
    }

    async get(key) {
        if (this.entries[key] === undefined) return undefined

        const target = this.entries[key];

        if (!target.data || Date.now() > target.maxAge) {
            console.log(`serving new copy of data in key '${key}'`);
            try {
                await this.reload(key);
                return target.data;
            } catch (e) {
                console.error(e);
                return null;
            }
        }

        console.log(`serving cached copy of data in key '${key}'`);

        return target.data;
    }

    keys() {
        return Object.keys(this.entries);
    }

    flush() {
        this.entries = {};
    }
}

module.exports = LoaderCache