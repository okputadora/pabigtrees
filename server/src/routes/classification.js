import { Router } from 'express'
import { authenticateToken } from '../middleware/authorization'
import models from '../models'
import logger from '../logger'

const router = Router()

router.post('/species', authenticateToken, async (req, res) => {
  try {
    const { newSpecies, existingGenusId, newCommonName } = req.body
    const { dataValues: createdSpecies } = await models.species.create({
      id: `SP${Date.now()}`, t_species: newSpecies, t_common: newCommonName, k_genus: existingGenusId,
    })
    res.json({ createdSpecies })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error })
  }
})

router.post('/species-and-genus', authenticateToken, async (req, res) => {
  try {
    const { newSpecies, newGenus, newCommonName } = req.body
    const { dataValues: createdGenus } = await models.genera.create({ id: `GE${Date.now()}`, t_genus: newGenus, t_common: newCommonName })
    const { dataValues: createdSpecies } = await models.species.create({
      id: `SP${Date.now()}`, t_species: newSpecies, t_common: newCommonName, k_genus: createdGenus.Id,
    })
    res.json({ createdSpecies })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error })
  }
})

export default router
