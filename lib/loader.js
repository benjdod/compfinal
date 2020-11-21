const consola = require('consola');

class LoaderCache {
    constructor() {
        this.entries = {}
        this.options = {
            strictDeps: true,   // entries cannot be loaded if one of their dependencies can't be loaded
            name: 'cache',
            errors: 'throw'     // throw | log. Throw throws the error up to the user, while log logs the error and returns a null-esque value
        }
        this.io = {
            log: str => {consola.log(`[${this.options.name}] \` ${str}`);},
            error: console.error,
            info: (str) => {consola.log(`[${this.options.name}] \u0394 ${str}`);}
        }
    }

    // TODO: change this name to set
    /**
     * 
     * @param {string} key the key which will be used to perform operations on the entry
     * @param {number} expiresIn the number of seconds the cache will be valid for
     * @param {*} dependencies an array of keys for data sources in the cache
     * @param {*} loader loads the data in the entry. If dependencies are specified, an object containing the data for the specified keys will be passed.
     */
    add(key, expiresIn, dependencies, loader) {

        const x = expiresIn*1000

        this.entries[key] = {
            data: undefined,
            loader: loader,
            exp: x,
            maxAge: 0,
            deps: dependencies,
        }
    } 

    /**
     * Removes the given key from the cache
     * @param {string} key 
     */
    remove(key) {
        if (this.entries[key])
            this.entries[key] = undefined;
    }

    /**
     * Forces a reload of the data of the given key
     * @param {string} key 
     * @returns {null}
     */
    async reload(key, deps) {

        const k = key;

        if (this.entries[k] !== undefined) {

            const depData = {} 
            this.entries[k].deps.forEach(dep => {
                depData[dep] = this.entries[dep].data;
            })

            try {
                this.entries[k].data = await this.entries[k].loader(depData);
                this.entries[k].maxAge = Date.now() + this.entries[k].exp;
                return this.entries[k].maxAge;
            } catch (e) {
                this.io.error(e);
            }
        }
        
        return 0;
    }

    getMaxAge(key) {
        if (this.entries[key])
            return this.entries[key].maxAge
        else 
            return -1;
    }

    /**
     * Validates the data of the given key, updating if necessary
     * @param {string} key 
     * @returns {number} If the key is validated, the key's expiration time is returned. If the key is not present, -1 is returned. If there's an error, 0 is returned
     */
    async touch(key) {

        const target = this.entries[key];
        if (target === undefined) return -1;

        let i;
        for (i = 0; i < target.deps.length; i++) {
            const depKey = target.deps[i];
            try {
                const depAge = this.getMaxAge(depKey);

                if ((Date.now() > depAge && (this.options.strictDeps && depAge !== -1))) {
                    this.io.info(`[${key}] reloading dependency [${depKey}]`);
                    await this.touch(depKey);
                    target.maxAge = depAge;
                }
            } catch (e) {
                this.io.error(e);
                return 0;
            }
        }

        const delta = target.maxAge - Date.now()
        if (!target.data || delta < 0) {
            this.io.log(`[${key}] loading (${target.data ? `${delta > 0 ? '+' : ''}${delta}ms` : 'init'})`);
            try {
                return await this.reload(key, target.deps);
            } catch (e) {
                this.io.error(e);
                return 0;
            }
        }

        this.io.log(`[${key}] cached (${delta > 0 ? '+' : ''}${delta}ms)`);
        return target.maxAge;
    }

    /**
     * Gets the data for the given key, loading if necessary
     * @param {string} key 
     * @returns {any} the data stored in the key
     */
    async get(key) {
        const exp = await this.touch(key);

        if (exp > 0)
            return this.entries[key].data;
        else 
            return undefined;
    }

    /**
     * Returns all the keys stored in the cache
     * @returns {Array} an array of all keys in the cache
     */
    keys() {
        return Object.keys(this.entries);
    }

    /**
     * Deletes all keys in the cache
     */
    flush() {
        this.entries = {};
    }
}

module.exports = LoaderCache

const a = async () => {
    const c = new LoaderCache();

    c.add('hello', 1, [], () => {
        return 3;
    })

    c.add('goodbye', 2, ['hello'], (deps) => {
        return deps.hello + 5;
    })

    consola.log(await c.get('goodbye'));

    setTimeout(() => {
        c.touch('goodbye');
    }, 2000);

    c.touch('goodbye');
}