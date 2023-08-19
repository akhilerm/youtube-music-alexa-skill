## DEPRECATED : Self hosted skill is now deprecated in favour of the alexa hosted skill

### Alexa Youtube Music Skill

Alexa does not provide native integration to neither youtube nor youtube music. This skill helps to play music from
youtube music on your amazon echo device

NOTE: The skill will not be published for public use as it can incur charges due to AWS Lambda usage.  Users who
are looking to install this skill on their echo device should have AWS developer account and then use the skill

Anyone is free to publish the skill in their AWS account so that non-tech savvy users can also make use of it. If there
is some skill that is available please raise a PR so that, the link to the skill can be added here

#### Setting up the skill
1. setup aws developer account
2. Setup aws cli and configure, node js is also required
3. Install ask cli and configure
4. `ask deploy` will create lambda functions and deploy
5. Generate a google cloud API with `YouTube Data API v3` restriction, and add it to the lambda function created 
above as `YOUTUBE_API_KEY`
