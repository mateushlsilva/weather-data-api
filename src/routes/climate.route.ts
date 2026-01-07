import { Router } from "express";
import { ClimateController } from "../controllers";

const routes = Router()

/**
 * @swagger
 * tags:
 *   name: Climate
 *   description: Endpoints relacionados a dados climáticos
 */

/**
 * @swagger
 * /climate/find/{city}:
 *   get:
 *     summary: Busca o clima atual de uma cidade
 *     description: |
 *       Retorna o clima atual de uma cidade.
 *       Caso não exista cache, busca na API externa, salva no banco e armazena no Redis.
 *     tags: [Climate]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: Nome da cidade
 *         schema:
 *           type: string
 *           example: London
 *     responses:
 *       200:
 *         description: Clima atual retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Climate'
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/find/:city', ClimateController.getCurrentClimate)

/**
 * @swagger
 * /climate/history/{city}:
 *   get:
 *     summary: Consulta histórico climático de uma cidade
 *     description: |
 *       Retorna o histórico climático armazenado no banco de dados,
 *       com suporte a paginação.
 *     tags: [Climate]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: Nome da cidade
 *         schema:
 *           type: string
 *           example: London
 *       - in: query
 *         name: page
 *         required: false
 *         description: Página da listagem
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Quantidade de registros por página
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Histórico climático retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClimatePagination'
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/history/:city', ClimateController.getClimateHistory)

export default routes