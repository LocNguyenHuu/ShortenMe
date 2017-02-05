// import { WebApp } from 'meteor/webapp'
// import ConnectRoute from 'connect-route'

// import { Links } from '../imports/api/links/links'

// const onRoute = (req, res, next) => {
//   const link = Links.findOne({ token: req.params.token })

//   if (link) {
//     Links.update(link, { $inc: { clicks: 1 } })
//     res.writeHead(307, { 'Location': link.url })
//     res.end()
//   } else {
//     next()
//   }
// }

// const middleware = ConnectRoute((router) => {
//   router.get('/:token', onRoute)
// })

// WebApp.connectHandlers.use(middleware)