import supertest = require('supertest')
import { app } from '../src'

export const api = supertest(app)
