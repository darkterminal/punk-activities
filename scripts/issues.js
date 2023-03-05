exports.triggerIssueOpened = async (context) => {
    let issueComment;
    switch (context.payload.action) {
        case 'opened':
            issueComment = context.issue({
                body: "Hello Punk, Thanks for opening this issue!",
            });
            break;
        case 'reopened':
            issueComment = context.issue({
                body: "Hey back! This issue is reopen to other discussion!",
            });
            break;
    }
    const commentCreated = await context.octokit.issues.createComment(issueComment)
    return commentCreated
}
