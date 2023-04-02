import { Router } from 'express'
import { getConfigFile, getDataByFileName, getFileNames, postData } from '../controllers/data'
import { adminCheck } from '../middleware/adminCheck'
import { userExtractor } from '../middleware/userExtractor'

export const dataRouter = Router()
dataRouter.post('/:collectionName', userExtractor, adminCheck, postData)
dataRouter.get('/fileNames', getFileNames) // response list of name
dataRouter.get('/configField/:name', getConfigFile)
dataRouter.get('/dataFile/:name', getDataByFileName) // response list configuration
