import { Router } from 'express'
import { deleteFiles, getAxes, getConfigFile, getConfigFileNames, getDataByFileName, getDescription, getFileNames, getWeighing, postData, updateCollectionName, updateConfigFile, updateWeighing, weighing } from '../controllers/data'
import { adminCheck } from '../middleware/adminCheck'
import { userExtractor } from '../middleware/userExtractor'

export const dataRouter = Router()
dataRouter.post('/:collectionName', userExtractor, adminCheck, postData)
dataRouter.post('/weighing/data', userExtractor, adminCheck, weighing)
dataRouter.get('/weighing', getWeighing)
dataRouter.get('/fileNames', getFileNames)
dataRouter.get('/configFiles', getConfigFileNames)
dataRouter.get('/configField/:name/:idFlag?', getConfigFile)
dataRouter.get('/axes/:name', getAxes)
dataRouter.get('/dataFile/:name', getDataByFileName)
dataRouter.get('/description/:id', getDescription)
dataRouter.delete('/dataFile/:name/:id', userExtractor, adminCheck, deleteFiles)
dataRouter.put('/configFiles/:id', userExtractor, adminCheck, updateConfigFile)
dataRouter.put('/weighing', userExtractor, adminCheck, updateWeighing)
dataRouter.put('/collectionName/:name/:id/:newName', userExtractor, adminCheck, updateCollectionName)
