const handleError = require('../error');
const Video = require('../models/Video');

module.exports = (rule, condition = {}, message = "Access denied!") => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  const { id: authId } = req.user
  let isAllow = false;

  for await(const checkRule of rules) {
    switch (checkRule) {
      case "own":
        if (condition?.source) {
          const databaseId = await (condition.source).findById(req.params[condition.sourceId]).catch(err => console.log(err));
          if (databaseId?.userId === authId) isAllow = true;
          break;
        }
        if (req.params[condition.sourceId] === authId) isAllow = true;
        break;

      case "channelOwner":
        const { videoId } = await (condition.source).findById(req.params[condition.sourceId]).catch(err => console.log(err));
        const { userId: channelOwnerId } = await Video.findById(videoId).catch(err => console.log(err));

        if (authId === channelOwnerId) isAllow = true;
        break;
      default:
        break;
    }
  }

  if (!isAllow) next(handleError(403, message));

  next();
};
