class LoaderCache {
    constructor() {
        this.entries = {}
        this.options = {
            strictDeps: true,   // entries cannot be loaded if one of their dependencies can't be loaded
        }
    }

    // TODO: change this name to set
    add(key, expiresIn, dependencies, loader) {

        const x = expiresIn*1000

        this.entries[key] = {
            data: undefined,
            loader: loader,
            exp: x,
            maxAge: Date.now() + x,
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
    async reload(key) {

        const k = key;

        if (this.entries[k] !== undefined) {
            try {
                this.entries[k].data = await this.entries[k].loader();
                this.entries[k].maxAge = Date.now() + this.entries[k].exp;
                return this.entries[k].maxAge;
            } catch (e) {
                console.error(e);
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
                const depAge = this.getMaxAge(depKey)

                if (Date.now() > depAge && (this.options.strictDeps && depAge !== -1)) {
                    console.log(`[${key}]: reload required for dependency [${depKey}]`);
                    await this.touch(depKey);
                    target.maxAge = depAge;
                }
            } catch (e) {
                console.error(e);
                return 0;
            }
        }

        const delta = target.maxAge - Date.now()
        if (!target.data || delta < 0) {
            console.log(`[${key}]: loading (${target.data ? delta + 's' : 'init'})`);
            try {
                return await this.reload(key);
            } catch (e) {
                console.error(e);
                return 0;
            }
        }

        console.log(`[${key}]: cached (${delta}s)`);
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