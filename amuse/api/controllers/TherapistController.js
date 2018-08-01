/**
 * TherapistController
 *
 * @description :: Server-side logic for managing therapists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  associatePatient: async function (inputs, exits) {

    console.log(`received association message ${JSON.stringify(inputs.allParams())} `);

    await Therapist.addToCollection(inputs.allParams().id, 'patients', inputs.allParams().patientId);

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    var therapist = await Therapist.findOne({id: inputs.allParams().id});

    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    if (!therapist) {
      return exits.notFound();
    }

    // Display the welcome view.
    return exits.status(200).send(therapist);
  },

};

