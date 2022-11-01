const Alexa = require('ask-sdk-core');
const ytmusic = require('node-youtube-music');
const ytdl = require('ytdl-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to youtube music';
        const repromptSpeakOutput = 'You can say, play vikram title track, to begin'
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptSpeakOutput)
            .getResponse();
    }
};
const PlaySongIntentHandler = {
    async canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === "PlaySongIntent"
        );
    },
    handle(handlerInput) {
        console.log("Play music");
        const speechText =
            handlerInput.requestEnvelope.request.intent.slots.songQuery.value;
        if (speechText) {
            return controller.search(handlerInput, speechText);
        } else {
            return handlerInput.responseBuilder
                .speak("You can say, play vikram title track, to begin.")
                .getResponse();
        }
    },

};

const controller = {
    async search(handlerInput, query) {
        console.log(query);
        const music = await searchForMusic(query);
        return this.play(handlerInput, music);
    },
    async play(handlerInput, musicInfo) {
        const { responseBuilder } = handlerInput;
        const playBehavior = "REPLACE_ALL";
        console.log("play");
        console.log(musicInfo);
        const audioFormat = await getAudioUrl(musicInfo.youtubeId);
        console.log(audioFormat);
        responseBuilder
            .speak(`Playing  ${musicInfo.title} by ${musicInfo.artists[0].name}`)
            .withShouldEndSession(true)
            .addAudioPlayerPlayDirective(
                playBehavior,
                audioFormat.url,
                musicInfo.youtubeId,
                0,
                null
            );
        return responseBuilder.getResponse();
    },
    async stop(handlerInput, message) {
        return handlerInput.responseBuilder
            .speak(message)
            .addAudioPlayerStopDirective()
            .getResponse();
    },
};

const searchForMusic = async (searchQuery) => {
    musics = await ytmusic.searchMusics(searchQuery);
    return musics[0];

}

const getAudioUrl = async (videoId) => {
    const audioInfo = await ytdl.getInfo(videoId, {});
    const audioFormat = await ytdl.chooseFormat(audioInfo.formats, {
        quality: "140",
    });
    return audioFormat;
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return controller.stop(handlerInput, speakOutput);
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlaySongIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        ) 
    .addErrorHandlers(
        ErrorHandler,
        )
    .lambda();
