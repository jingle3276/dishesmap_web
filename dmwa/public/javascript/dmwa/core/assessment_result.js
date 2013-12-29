//
// The assessment result model.
//


goog.provide('wgen.assess.dibels.models.AssessmentResult');


goog.require('wgen.assess.common.models.Model');
goog.require('wgen.assess.core.models.Motivation');
goog.require('wgen.assess.core.models.ObservationResult');


(function () {

    var Model = wgen.assess.common.models.Model;
    var Motivation = wgen.assess.core.models.Motivation;
    var ObservationResult = wgen.assess.core.models.ObservationResult;

    /**
     * Create an Assessment Result object.
     * @param attributes {{
     *     studentId: String,
     *     staffId: String,
     *     grade: String,
     *     period: String,
     *     probeResultIds: Array.<Number>,
     *     instId: String,
     *     year: String,
     *     motivation: {wgen.assess.core.models.Motivation},
     *     obsvResult: {wgen.assess.core.models.ObservationResult}
     *   }}
     *   A generic parameter object.
     *   - studentId
     *   - staffId
     *   - grade A two-digit string for a grade, e.g. 'PK' or '03'.
     *   - period For now, 'BOY'|'MOY'|'EOY'.
     *   - probeResultIds The set of results that are part of this assessment.
     *       Using the AssessmentResult 'measure' and these IDs, the
     *       ProbeResult is extracted from the appropriate repository.
     * @constructor
     * @extends {wgen.assess.common.models.Model}
     */
    wgen.assess.dibels.models.AssessmentResult = Model.extend({

        //
        // Class variables.
        //

        /*
            make sure this stays consistent with the websync:
            websync/lib/plugins/dibels_results.py
        */
        FIELDS : _.extend({}, wgen.assess.common.models.Model.prototype.FIELDS,
                        { STUDENT_ID : 'studentId',
                          RESULT_ID : 'resultId',
                          STAFF_ID : 'staffId',
                          GRADE : 'grade',
                          PERIOD : 'period',
                          MEASURE : 'measure',
                          EDITION_ID : 'editionId',
                          PROBE_RESULT_IDS: 'itemResultIds',
                          INST_ID: 'instId',
                          SCHOOL_YEAR: 'school_year',
                          MOTIVATION: 'motivation',
                          OBSERVATION_RESULT: 'obsvResult',
                          SOURCE_CREATE_DATE: 'scdate',
                          SOURCE_MOD_DATE: 'smdate',
                          IS_OFFICIAL: 'isOfficial',
                          OFFICIALNESS_RANK: 'officialnessRank',
                          NOTE: "textNote"}),

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        initialize : function (options) {
            Model.prototype.initialize.call(this, options);

            // if this is a new AssmtResult, set the source create date
            // (and source mod date)
            if (!this.get(this.FIELDS.SOURCE_CREATE_DATE)) {
                var attrs = {};
                var now = this.getClientCreateDate();
                attrs[this.FIELDS.SOURCE_CREATE_DATE] = now;
                attrs[this.FIELDS.SOURCE_MOD_DATE] = now;
                this.set(attrs, {silent: true});
            }
            this._logNamespace = "AssessmentResult";
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         * @private
         */
        _onChange : function () {
            Model.prototype._onChange.call(this);

            // source mod date is the same as client mod date
            // except that it doesn't get set on initialize
            var attrs = {};
            var now = this.getClientModDate();
            attrs[this.FIELDS.SOURCE_MOD_DATE] = now;
            this.set(attrs, {silent: true});

        },

        //
        // Instance methods.
        //
        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getAssessmentResultId : function () {
            return this.get(this.FIELDS.RESULT_ID);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getStudentId : function () {
            return this.get(this.FIELDS.STUDENT_ID);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getStaffId : function () {
            return this.get(this.FIELDS.STAFF_ID);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getMeasure : function () {
            return this.get(this.FIELDS.MEASURE);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getGrade : function () {
            return this.get(this.FIELDS.GRADE);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getPeriod : function () {
            return this.get(this.FIELDS.PERIOD);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getInstitutionId : function () {
            return this.get(this.FIELDS.INST_ID);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getProbeResultIds : function () {
            return this.get(this.FIELDS.PROBE_RESULT_IDS);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        setProbeResultIds : function (ids) {
            this.set(this.FIELDS.PROBE_RESULT_IDS, ids);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getSchoolYear : function () {
            return this.get(this.FIELDS.SCHOOL_YEAR);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getSourceCreateDate : function () {
            return this.get(this.FIELDS.SOURCE_CREATE_DATE);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getSourceModDate : function () {
            return this.get(this.FIELDS.SOURCE_MOD_DATE);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getMotivation : function () {
            var motivation = this.get(this.FIELDS.MOTIVATION);
            return motivation instanceof Motivation ? motivation : new Motivation(motivation);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        setMotivation : function (motivation) {
            this.set(this.FIELDS.MOTIVATION, motivation);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getObservationResult : function () {
            var observation = this.get(this.FIELDS.OBSERVATION_RESULT);
            return observation instanceof ObservationResult ? observation : new ObservationResult(observation);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        setObservationResult : function (observation) {
            this.set(this.FIELDS.OBSERVATION_RESULT, observation);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        setObservationId : function (observationId) {
            this.set(this.FIELDS.OBSERVATION_ID, observationId);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        isOfficial : function () {
            return this.get(this.FIELDS.IS_OFFICIAL);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getOfficialnessRank : function () {
            return this.get(this.FIELDS.OFFICIALNESS_RANK);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getEditionId : function () {
            return this.get(this.FIELDS.EDITION_ID);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        getNote : function () {
            return this.get(this.FIELDS.NOTE);
        },

        /**
         * @this {wgen.assess.dibels.models.AssessmentResult}
         */
        setNote : function (note) {
            this.set(this.FIELDS.NOTE, note);
        }

    });

}());
