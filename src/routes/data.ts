import { Router } from 'express'
import { deleteFiles, getAxes, getConfigFile, getConfigFileNames, getDataByFileName, getFileNames, postData, updateConfigFile } from '../controllers/data'
import { adminCheck } from '../middleware/adminCheck'
import { userExtractor } from '../middleware/userExtractor'

export const dataRouter = Router()
dataRouter.post('/:collectionName', userExtractor, adminCheck, postData)
dataRouter.get('/fileNames', getFileNames)
dataRouter.get('/configFiles', getConfigFileNames)
dataRouter.get('/configField/:name/:idFlag?', getConfigFile)
dataRouter.get('/configField/:name', getAxes)
dataRouter.get('/dataFile/:name', getDataByFileName)
dataRouter.delete('/dataFile/:name/:id', userExtractor, adminCheck, deleteFiles)
dataRouter.put('/configFiles/:id', userExtractor, adminCheck, updateConfigFile)
