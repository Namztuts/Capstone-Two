'use strict';

/** Routes for users. */

const jsonschema = require('jsonschema');

const express = require('express');
// const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

// router.post('/', ensureAdmin, async function (req, res, next) {
router.post('/', async function (req, res, next) {
   //NOTE: probably won't use this route cause don't need admins? also would maybe move register route here instead??
   try {
      const validator = jsonschema.validate(req.body, userNewSchema);
      if (!validator.valid) {
         const errs = validator.errors.map((e) => e.stack);
         throw new BadRequestError(errs);
      }

      const user = await User.register(req.body);
      const token = createToken(user);
      return res.status(201).json({ user, token });
   } catch (err) {
      return next(err);
   }
});

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

// router.get('/', ensureAdmin, async function (req, res, next) {
router.get('/', async function (req, res, next) {
   //FIN: route works
   try {
      const users = await User.findAll();
      return res.json({ users });
   } catch (err) {
      return next(err);
   }
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:username
 **/

// router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
router.get('/:username', async function (req, res, next) {
   //TODO: add middleware to ensure that the correct person is accessing
   //FIN: route works
   try {
      const user = await User.get(req.params.username);
      return res.json({ user });
   } catch (err) {
      return next(err);
   }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { username, firstName, lastName, password, email, isAdmin }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

// router.patch('/:username', ensureCorrectUserOrAdmin, async function (req, res, next) {
//FIN: works as intended
router.patch('/:username', async function (req, res, next) {
   try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
         const errs = validator.errors.map((e) => e.stack);
         throw new BadRequestError(errs);
      }

      const user = await User.update(req.params.username, req.body);
      const token = createToken(user); //issue a new token

      return res.json({ user, token });
   } catch (err) {
      return next(err);
   }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

// router.delete('/:username', ensureCorrectUserOrAdmin, async function (req, res, next) {
//FIN: works
router.delete('/:username', async function (req, res, next) {
   try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
   } catch (err) {
      return next(err);
   }
});

module.exports = router;
