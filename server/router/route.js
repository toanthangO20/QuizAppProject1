import { Router } from "express";
const router = Router();

/** import controllers */
import * as controller from "../controllers/controller.js";

/** Question Routes API */
router.get('/questions', controller.getQuestions)
router.post('/questions', controller.insertQuestions)

router.route('/questions')
    .get(controller.getQuestions) /** GET Request */
    .post(controller.insertQuestions) /** POST Request */
    .delete(controller.dropQuestions) /** DELETE Request */

router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.dropResult)

export default router;