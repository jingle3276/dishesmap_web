/**
 * The app's base model class.
 */


goog.provide('wz.dmwa.core.models.Model');


goog.require('wz.dmwa.lib.log');

(function () {

    /**
     * @constructor
     * @extends {Backbone.Model}
     */
    wz.dmwa.core.models.Model = Backbone.Model.extend({


        /**
         * This map represents the states a model object can have.
         */
        STATES : {
            NEW_ : 0,       // Created on the client.
            MODIFIED : 1,   // Modified on the client.
            CLEAN : 2,      // Untouched on the client.
            DELETED : 3    // Deleted on the client.
        },

        /**
         * This map contains the model's attribute names.
         */
        FIELDS : {
            ID: 'id',
            STATE: 'state',     // The models current state.
            CLIENT_CREATE_DATE: 'ccdate',
            CLIENT_MOD_DATE: 'cmddate'
        },


        /**
         * Create a new model with the given attributes.
         * @param attributes: a mapping of field names to attributes.
         * @this {wz.dmwa.core.models.Model}
         */
        initialize : function (attributes) {
            var FIELDS = this.FIELDS;
            var STATES = this.STATES;

            // Generate a client side id that should be unique across page loads.
            this.cid = window.uuid.v1();

            // Add WGen specific fields to the backbone attributes object, so
            // they're persisted in storage.
            var attrs = {};
            if (attributes) {
                // Since we don't do server -> clientId mapping, give the model an id
                // if it doesn't already have one.
                this.id = attributes[FIELDS.ID] || this.cid;

                if (!(FIELDS.STATE in attributes)) {
                    // Give the model a state if it doesn't already have one. Records
                    // without a server id are created on the client, and thus new.
                    attrs[FIELDS.STATE] = (attributes[FIELDS.ID]) ? STATES.CLEAN : STATES.NEW_;
                }
            } else {
                this.id = this.cid;
                attrs[FIELDS.STATE] = STATES.NEW_;
            }

            attrs[FIELDS.ID] = this.id;
            this.set(attrs, {silent: true});
            this._updateTimestamps();

            // Update state and timestamps whenever the model changes.
            this.bind('change', $.proxy(this._onChange, this));

            this._logNamespace = "Model";
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        getId : function () {
            return this.get(this.FIELDS.ID);
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        getState : function () {
            return this.get(this.FIELDS.STATE);
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        setStateClean : function () {
            var attrs = {};
            attrs[this.FIELDS.STATE] = this.STATES.CLEAN;
            this.set(attrs, {silent: true});
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        setStateDeleted : function () {
            var attrs = {};
            attrs[this.FIELDS.STATE] = this.STATES.DELETED;
            this.set(attrs, {silent: true});
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        getClientCreateDate : function () {
            return this.get(this.FIELDS.CLIENT_CREATE_DATE);
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        getClientModDate : function () {
            return this.get(this.FIELDS.CLIENT_MOD_DATE);
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        isNew : function () {
            return this.getState() === this.STATES.NEW_;
        },

        /**
         * Return true if this model has the state clean, false otherwise.
         * @this {wz.dmwa.core.models.Model}
         */
        isClean : function () {
            return this.getState() === this.STATES.CLEAN;
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        isModified : function () {
            return this.getState() === this.STATES.MODIFIED;
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         */
        isDirty : function () {
            var state = this.getState();
            return state !== this.STATES.CLEAN;
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         * @private
         */
        _onChange : function () {
            var STATES = this.STATES;
            if (this.getState() === STATES.CLEAN) {
                this.set(this.FIELDS.STATE, STATES.MODIFIED, {silent: true});
            }
            this._updateTimestamps();
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         * @private
         */
        _updateTimestamps : function () {
            var dateStr = (new Date()).toISOString();
            var attrs = {};
            attrs[this.FIELDS.CLIENT_MOD_DATE] = dateStr;
            if (!this.get(this.FIELDS.CLIENT_CREATE_DATE)) {
                attrs[this.FIELDS.CLIENT_CREATE_DATE] = dateStr;
            }
            this.set(attrs, {silent: true});
        },

        /**
         * @this {wz.dmwa.core.models.Model}
         * @private
         */
        _log : function (msg) {
            wz.dmwa.lib.log(this._logNamespace + ': ' + msg);
        }

    });
}());
