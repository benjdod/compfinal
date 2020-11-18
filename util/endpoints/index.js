exports.listRoutes = (router) => {

    return (req,res) => {
        const routes = router.stack
            .filter((middleware) => middleware.route)
            .filter(middleware => middleware.route.path !== '*')
            .map((middleware) => `${Object.keys(middleware.route.methods).join(', ').toUpperCase()} -> ${middleware.route.path}`)

        let out = `Routes for <strong>${req.baseUrl}</strong>:\n\n`;

        routes.forEach(route => {
            out += `${route}\n`;
        })

        res.send(`<pre>${out}</pre>`)
    }
}
