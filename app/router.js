'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,middleware} = app;

  const authMiddleware = middleware.authMiddleware(app)

  router.resources("users","/api/users",authMiddleware,controller.users)
  router.resources("user-message","/api/user-message",authMiddleware,controller.userMessage)
  router.get("/api/user-message/:from_id/:to_id",authMiddleware,controller.userMessage.show)
  router.resources("user-requests","/api/user-requests",authMiddleware,controller.userRequests)

  // check api
  router.get("/api/users/checkEmail/:email",controller.users.checkEmail)
  router.get("/api/users/checkChatId/:chat_id",controller.users.checkChatId)

  // auth api
  router.post("/api/login",controller.auth.login)
  router.post("/api/register",controller.users.create)
  router.get("/api/getUser",authMiddleware,controller.auth.getUser)

  // update image
  router.post("/api/upload/image",authMiddleware,controller.tool.updateImage)
};
