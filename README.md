### Alexa Youtube Music Skill

Alexa does not provide native integration to neither youtube nor youtube music. This skill helps to play music from
youtube on your amazon echo device.

NOTE: The skill will not be published for public use as it can incur charges due to AWS Lambda usage.  Users who
are looking to install this skill on their echo device should have AWS developer account and then use the skill

Anyone is free to publish the skill in their AWS account so that non-tech savvy users can also make use of it. If doing
so make sure that the invocation name is changed from _youtube_ as brand names are not allowed in published skills.

If there are any already publicly available skills that plays youtube music, please feel free to add it here:

NOTE: Work is under progress for directly using youtube music instead of youtube.

#### Setting up the skill
1. Install and setup the [`ask`](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html#prerequisites) CLI.
2. Create a new alexa hosted skill
```shell
akhil@akhil-ThinkPad-L14:~/W/alexa $ ask new
Please follow the wizard to start your Alexa skill project ->
? Choose a modeling stack for your skill:  Interaction Model
  The Interaction Model stack enables you to define the user interactions with a combination of utterances, intents, and slots.
? Choose the programming language you will use to code your skill:  NodeJS
? Choose a method to host your skill's backend resources:  Alexa-hosted skills
  Host your skill code by Alexa (free).
? Choose the default region for your skill:  us-east-1
? Please type in your skill name:  Youtube Music Skill
? Please type in your folder name for the skill project (alphanumeric):  YoutubeMusicSkill

Project directory for Youtube Music Skill created at
        /home/akhil/Work/alexa/YoutubeMusicSkill

Lambda code for Youtube Music Skill created at
	./lambda

Skill schema and interactionModels for Youtube Music Skill created at
	./skill-package

The skill has been enabled.

Hosted skill provisioning finished. Skill-Id: amzn1.ask.skill.abcdef01-2345-6789-abcd-ef0123456789
Please follow the instructions at https://developer.amazon.com/en-US/docs/alexa/hosted-skills/alexa-hosted-skills-ask-cli.html to learn more about the usage of "git" for Hosted skill.
```
3.Generate a [google cloud API](https://cloud.google.com/docs/authentication/api-keys) with `YouTube Data API v3` restriction, and export it as
```shell
export YOUTUBE_API_KEY_ALEXA_SKILL_ENV=<your key>
```
4. Run the initialization script to prepare the dev environment with the skill code
```shell
wget https://gist.githubusercontent.com/akhilerm/db4b9faa5c5ae10cf0400948927406a6/raw/prepare_dev_env.sh
chmod +x prepare_dev_env.sh
./prepare_dev_env.sh <skill root directory> akhilerm/youtube-music-alexa-skill
```
5. Use `make deploy` to deploy the skill to alexa. This will merge the `dev` branch to `master` branch and push
the changes to AWS CodeCommit.

NOTE: While editing interaction models, only the `en-US.json` need to be edited and use `make sync-locale` to sync with
the other locales
