/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as countryController from './countryController'
import countryValidation from './countryValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getCountriesStats
 * GET /items => getCountries
 * GET /items/:id => getCountryById
 * POST /items/ => createCountry
 * PATCH/PUT /items/:id => updateCountry
 * DELETE /items/:id => deleteCountry
 */

// More router
router.get(
	'/init',
	authService.authJwt,
	countryController.initCountries,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.countries
		})
	}
)

// Default Rest router
router
	.get(
		'/stats',
		validate(countryValidation.stats),
		countryController.getCountriesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.countriesStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(countryValidation.index),
		countryController.getCountries,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.countries,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(countryValidation.show),
		countryController.getCountryById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.country
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(countryValidation.create),
		countryController.createCountry,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.country
			})
		}
	)
	.put(
		'/:id',
		validate(countryValidation.update),
		countryController.updateCountry,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.country
			})
		}
	)
	.delete(
		'/:id',
		validate(countryValidation.delete),
		countryController.deleteCountry,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
