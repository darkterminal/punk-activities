const { triggerIssueOpened } = require('./scripts/issues');

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on(["issues.opened", "issues.reopened"], triggerIssueOpened);
  app.on("issues.closed", async (context) => {
    const { repository, issue } = context.payload
    const lables = await context.octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/labels', {
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: issue.number
    })
    app.log.info(lables.data.length > 0 ? lables.data : 'No labels')
  })
};
